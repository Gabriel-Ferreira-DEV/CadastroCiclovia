/**
 * @depends template=jive.ps.nitro.profile.renderPointsText
 */
(function($){
    n4jive.bio = function(nitro, options){
        var self = this;
            //setup some basic object properties
            self.data = {
                user: {},
                toolTipChallengeParsed: false,
                toolTipRecentChallengeParsed: false
            };

        this.defaults = {
            pointCategory:"Points", //the point category to pull in, should a different point category need to be used (optional)
            challengeDisplay:"all" //all || recent -- all displays all challenges, and greys out un-earned ones.  recent shows recently completed
        };

        self.options = $.extend({}, self.defaults, options);
        self.serverUrl = nitro.connectionParams.server + '?sessionKey=' + nitro.connectionParams.sessionKey + '&jsCallback=?';
        self.profileService = self.options.profileService;
        self.nitro = nitro;
        self.serverUrl = null;
        self.recentCompleters = [];

        /**
         * n4jive.bio.init()
         * initializes the application when nitro has successfully come back with a session key
         */ 
       this.init = function(){
            this.serverUrl = self.nitro.connectionParams.server + '?sessionKey=' + self.getSessionKey() + '&jsCallback=?';
            this.annualPoints = 0;
            this.lifetimePoints = 0;
            
            this.getNitroData();
        };
        
        // We need to request the annual points in date chunks because it only supports 90 days at a time.
        this.getDateBlocks = function() {
            var year = new Date().getUTCFullYear();
            
            var dates = {
                b1: {
                    start: (Date.UTC(year, 0, 1, 0, 0, 0, 0) / 1000),
                    end: (Date.UTC(year, 2, 0, 23, 59, 59, 0) / 1000)
                },
                b2: {
                    start: (Date.UTC(year, 2, 1, 0, 0, 0, 0) / 1000),
                    end: (Date.UTC(year, 4, 0, 23, 59, 59, 0) / 1000)
                },
                b3: {
                    start: (Date.UTC(year, 4, 1, 0, 0, 0, 0) / 1000),
                    end: (Date.UTC(year, 6, 0, 23, 59, 59, 0) / 1000)
                },
                b4: {
                    start: (Date.UTC(year, 6, 1, 0, 0, 0, 0) / 1000),
                    end: (Date.UTC(year, 8, 0, 23, 59, 59, 0) / 1000)
                },
                b5: {
                    start: (Date.UTC(year, 8, 1, 0, 0, 0, 0) / 1000),
                    end: (Date.UTC(year, 10, 0, 23, 59, 59, 0) / 1000)
                },
                b6: {
                    start: (Date.UTC(year, 10, 1, 0, 0, 0, 0) / 1000),
                    end: (Date.UTC(year, 11, 31, 23, 59, 59, 0) / 1000)
                }
            };
            
            return dates;
        };

        
        /**
         * n4jive.hover.getNitroData()
         * fetches data from nitro for this app
         */ 
        this.getNitroData = function(){
            var self = this; 
            //show loading spinners in a few places
            n4jive.showLoadingSpinners($("#n4jive_bio_points td:last"), $(".n4jive_bio_level_name",$("#n4jive_bio_level")), $("#n4jive_bio_recent_challenges td:last"));
            
            var dateBlocks = this.getDateBlocks();
            
            //start building our method string
            var methodString = '[';
                    //get points
                    methodString += '"method=user.getPointsBalance&criteria=CREDITS&asyncToken=lifetime&pointCategory='+self.getPointCategory()+'&userId='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
                    
                    $j.each(dateBlocks, function(id, block) {
                        methodString += '"method=user.getPointsBalance&criteria=CREDITS&asyncToken='+id+'&start='+block.start+'&end='+block.end+'&pointCategory='+self.getPointCategory()+'&userId='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
                    });
                   
                    //get level
                    methodString += '"method=user.getLevel&userId='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
                    //get next level
                    methodString += '"method=user.getNextLevel&userId='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
    
                    if (self.options.challengeDisplay == "all") {
                        //get all challenges
                        methodString += '"method=user.getChallengeProgress&asyncToken=allbadges&trophiesOnly=true&userId='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
                    } else {
                        //get recent challenges
                        methodString += '"method=site.getRecentChallenges&asyncToken=earnedBadges&trophiesOnly=true&returnCount=8&userIds='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
                    }
                methodString += ']';
                
                $.getJSON(self.serverUrl + '&method=batch.run&methodFeed=' + escape(methodString), function(res) {
                    self.dataController(res);
                });
                
        };
        
        /**
         * n4jive.hover.getNitroData()
         * fetches data from nitro for this app
         */ 
        this.dataController = function(res){
            var self = this;
            
            n4jive.destroyLoadingSpinners();
            
            //check for errors first
            if(typeof res.Nitro.Error != "undefined"){
                console.log('error: ' + res.Nitro.Error.Code + ":" + res.Nitro.Error.Message);
                //bail!
                return false;
            }
    
            if(res.Nitro.method == "batch.run"){
                //loop through each returned method, using 'zzz' to avoid clobbering "i" in any for loops that get called from here...
                $j.each($j.makeArray(res.Nitro.Nitro), function(_, data) {
                    if (data.res === "ok") {
                        switch(data.method){
                            //send the data to the appropriate method
                            case "user.getPointsBalance": self.parsePointsBalance(data); break;
                            case "user.getLevel": self.parseLevel(data); break;     
                            case "user.getNextLevel": self.parseNextLevel(data); break;     
                            case "site.getRecentChallenges": 
                                switch(data.asyncToken){
                                    case 'earnedBadges': self.parseRecentChallenges(data); break;
                                    case 'tooltip': self.parseRecentChallengesForTooltip(data); break;
                                }
                            break;      
                            case "user.getChallengeProgress": 
                                switch(data.asyncToken){
                                    case 'allbadges': self.parseRecentChallenges(data); break;
                                    case 'tooltip': self.parseChallengeProgressForTooltip(data); break;
                                }
                        }
                    }
                });
                
                this.showPoints();
            }
        };
        
        
        /**
         * n4jive.hover.parsePointsBalance()
         * parses the response from user.getPointsBalance
         * @param responseObj - the response object from our data controller
         */ 
        this.parsePointsBalance = function(data){
            if (data.asyncToken == 'lifetime') {
                this.lifetimePoints =  data.Balance.pointCategories.PointCategory.points;
            } else {
                this.annualPoints += parseInt(data.Balance.points, 10);
            }
        };
        
        this.showPoints = function() {
            $("#n4jive_bio_points td:last").html(jive.ps.nitro.profile.renderPointsText({
                lifetimePoints: n4jive.addCommas(this.lifetimePoints),
                annualPoints: n4jive.addCommas(this.annualPoints)
            }).toString());
        };
        
        
        /**
         * n4jive.hover.parseLevel()
         * parses the response from user.getLevel
         * @param responseObj - the response object from our data controller
         */ 
        this.parseLevel = function(responseObj){
            var self = this;
            self.data.level = responseObj.users.User.SiteLevel;
            
            $("#n4jive_bio_level span").html(self.getLevel().name); 
            $("#n4jive_bio_level img").attr("src", self.getLevel().iconUrl);    
        };
        
        /**
         * n4jive.hover.parseNextLevel()
         * parses the response from user.getLevel
         * @param responseObj - the response object from our data controller
         */ 
        this.parseNextLevel = function(responseObj){
            var self = this;
            
            if(typeof responseObj.users.User.SiteLevel != 'undefined'){
                var nextLevel = responseObj.users.User.SiteLevel;
                self.data.nextLevel = nextLevel;
                
                //calculate points until next level
                var untilNextLevel = nextLevel.points - self.getPoints();
                $("#n4jive_bio_level .n4jive_progress_label").text(n4jive.addCommas(untilNextLevel) + " " + self.options.i18n.pointsText + " until " + nextLevel.name);
                
                var progressBarPercentage = n4jive.getIntPercentage(self.getPoints(), nextLevel.points);
                $("#n4jive_bio_level_progress div").animate({width:progressBarPercentage+"%"});
            }else{
                self.data.nextLevel = false;
                $("#n4jive_bio_level_progress").remove();
                //at the last level, so hide the "points until" label
                $("#n4jive_bio_level .n4jive_progress_label").remove();
            }
        };
        
        
        /**
         * n4jive.hover.parseRecentChallenges()
         * parses the response from site.getRecentChallenges
         * @param responseObj - the response object from our data controller
         */ 
        this.parseRecentChallenges = function(responseObj){
            var self = this;
                        
            var challenges = n4jive.getSanitizeChallengesResponse(responseObj);

            for(var i=0;i<challenges.length;i++){
                var challenge = challenges[i];
                if(responseObj.asyncToken == "allbadges"){
                    $("#n4jive_bio_recent_challenges_images").append(self.getRecentChallengeItemHTML(challenge));
                    if(challenge.completionCount === "0"){
                        $("#n4jive_bio_recent_challenges_images img:last").css('opacity', 0.15);
                    }
                }else{
                    $("#n4jive_bio_recent_challenges_images").append(self.getRecentChallengeItemHTML(challenge));
                }
            }
            
        };
        
        this.parseChallengeProgressForTooltip = function(responseObj){
            var self = this;
            
            var challenges = n4jive.getSanitizeChallengesResponse(responseObj);
            var html = '';

            if(challenges.length > 0){
                html = self.getToolTipChallengeHTML(challenges[0]);
            }
            
            self.data.toolTipChallengeHtml = html;
            self.data.toolTipChallengeParsed = true;
            if(self.data.toolTipChallengeParsed && self.data.toolTipRecentChallengeParsed){
                self.writeRecentChallengeTooltipHTML();
            }
        };

        this.parseRecentChallengesForTooltip = function(responseObj){
            var self = this;
            var html = '<!--no recent completers-->';
            
            if(responseObj.res == "ok"){
                var challenges = n4jive.getSanitizeChallengesResponse(responseObj);
                
                self.recentCompleters = [];
                if(challenges.length > 0){
                    html = "<div class='n4jive_bio_challenge_tooltip_recent_completers'><p>Recently Completed By:</p>";
                    $j.each(challenges, function(i, challenge) {
                        if ($j.inArray(challenge.userId, self.recentCompleters) === -1) {
                            html += "<span class='recent-completers jiveChallengeCompleter"+challenge.userId+"'></span>";                   
                            self.recentCompleters.push( challenge.userId );
                        }
                    });
                    html += "</div>";
                }
                
                self.data.toolTipRecentChallengeHtml = html;
                self.data.toolTipRecentChallengeParsed = true;
                if(self.data.toolTipChallengeParsed && self.data.toolTipRecentChallengeParsed){
                    self.writeRecentChallengeTooltipHTML();
                }
    
                //go fetch the info from jive to populate the images...
                self.getJiveUsersInfo();
            }else{
                console.log('error loading recent tooltip data. ', responseObj);
            }
        };
        
        this.writeRecentChallengeTooltipHTML = function(){
            var self = this;
            
            self.data.toolTipChallengeParsed = true;
            self.data.toolTipRecentChallengeParsed = false;
            
            var html = self.data.toolTipChallengeHtml;
                html += self.data.toolTipRecentChallengeHtml;
            
            var h = n4jive.getJiveHoverTipHTML(html,false);
                $("#n4jive_bio_recent_challenges_images img").qtip('option', 'content.text',h);
        };
    
        this.getToolTipChallengeHTML = function(challenge){
            var h = "<img src='"+challenge.fullUrl+"' class='n4jive_bio_challenge_tooltip_image' />";
                h += "<h5>" + unescape(challenge.name) + "</h5>";
                h += "<p>" + challenge.description + "</p>";
            return h;
        };
        
        this.getRecentChallengeItemHTML = function(challenge){
            //return '<a href="#" class="nitro-challenge-link" data-challenge-name='+challenge.name+'> <img src='+challenge.fullUrl+' title='+escape(challenge.name)+' alt='+escape(challenge.name)+' /></a>';
            return jive.nitro.challenges.challengeIcon({
                name: challenge.name,
                fullUrl: challenge.fullUrl
            });
        };
        
        
        this.writeRecentChallengeTooltipContent = function(){
        };
        
        /**
         * n4jive.hover.getRecentlyCompletedItemHTML()
         * returns an html string for the different earned bages
         * @param challenge - an individual challenge json object
         * @return - returns html for a badge.
         */ 
        this.getRecentlyCompletedItemHTML = function(challenge){
            return '<img src="'+challenge.thumbUrl+'" title="'+challenge.name+'" />';
        };
        
        this.getJiveUsersInfo = function(){
            var self = this;
            if(self.recentCompleters.length > 0){
                try{
                    self.profileService.getProfileInfo({
                        userId:self.recentCompleters,
                        success: function(res) {
                            self.parseJiveUsersInfo(res);
                        },
                        error: function(res) {
    
                        }
                    });
                }catch(e){
    
                }
            }
        };
        
        this.parseJiveUsersInfo = function(res){
            $j.each(res.Users, function(i, u) {
                //find each user photo on the page with this userId and write it out!
                var el = $(".jiveChallengeCompleter" + u.userId);
                var usrSettings = {
                    anonymous: false,
                    enabled: true,
                    username: u.username,
                    id: u.jiveUserID,
                    displayName: u.displayName,
                    avatarID: u.avatarId,
                    size: 30
                };
                
                try{
                    var avatar = jive.shared.displayutil.avatar(usrSettings);
                    el.html(avatar);
                }catch(e){
                    var avatar = '';
                    el.remove();
                }
            });
        };
        
        
        // Convenience methods...
        this.getPoints = function(){
            return self.lifetimePoints;    
        };
        this.getLevel = function(){
            return self.data.level; 
        };
        this.getNextLevel = function(){
            return self.data.nextLevel; 
        };
        /**
         * n4jive.hover.getSessionKey()
         * convenience function to return our sessionKey
         * @return - a nitro session key for the passed-in nitro object
         */ 
        this.getSessionKey = function(){
            return this.nitro.connectionParams.sessionKey;          
        };
        
        /**
         * n4jive.hover.getPointCategory()
         * convenience function to return the passed in point Category
         * @return - the provided point category || "Points"
         */ 
        this.getPointCategory = function(){
            if(typeof options.pointCategory != 'undefined'){
                return options.pointCategory;
            }
            return "Points";
        };
        

        /*******************************************************************
         WAIT FOR NITRO TO COME BACK WITH A SESSION KEY BEFORE INITIALIZING
        *******************************************************************/
        //if we havent gotten a session key, keep waiting for awhile to make sure the user.login call has come back ok
        if(typeof(nitro) == "undefined" || nitro.connectionParams.sessionKey === null){
            var initialize = setInterval(function(){
                if(typeof(nitro) != "undefined" && nitro.connectionParams.sessionKey !== null){
                    clearInterval(initialize);
                    self.init(nitro);
                }                   
            },500);
        }else{
            //initialize
            self.init();
        }
        
    };
})(jQuery);
