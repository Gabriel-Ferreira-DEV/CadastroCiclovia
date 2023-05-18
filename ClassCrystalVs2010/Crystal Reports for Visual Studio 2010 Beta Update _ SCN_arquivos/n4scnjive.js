// Replace n4jive.hover variable, patch for Me In Three issue
(function($){
      n4jive.hover = function(nitro, options){
            var self = this;
            //setup some basic object properties
            self.data = {
                user: {}
            };
            self.options = options || null;
            self.nitro = nitro;
            self.serverUrl = null;

            /**
             * n4jive.hover.init()
             * initializes the application when nitro has successfully come back with a session key
             */    
            this.init = function(){
                var self = this;
                    self.serverUrl = self.nitro.connectionParams.server + '?sessionKey=' + self.getSessionKey() + '&jsCallback=?';
                    self.getNitroData();
            };


            /**
             * n4jive.hover.getSessionKey()
             * convenience function to return our sessionKey
             * @return - a nitro session key for the passed-in nitro object
             */    
            this.getSessionKey = function(){
                return this.nitro.connectionParams.sessionKey;            
            },
            
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
            },
            
            /**
             * n4jive.hover.getNitroData()
             * fetches data from nitro for this app
             */    
            this.getNitroData = function(){
                var self = this; 
                //start building our method string
                var methodString = '[';
                        //get points
                        methodString += '"method=user.getPointsBalance&pointCategory='+self.getPointCategory()+'&userId='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
                        //get level
                        methodString += '"method=user.getLevel&userId='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
                        //get challenge progress
                        methodString += '"method=site.getRecentChallenges&trophiesOnly=true&returnCount=8&userIds='+self.options.ownerId+'&sessionKey='+self.getSessionKey()+'",';
                        //me in 3
                        methodString += '"method=user.getPreference&userId='+self.options.ownerId+'&name=meInThree&sessionKey='+self.getSessionKey()+'",';
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
                
                //check for errors first
                if(typeof res.Nitro.Error != "undefined"){
                    console.log('error: ' + res.Nitro.Error.Code + ":" + res.Nitro.Error.Message);
                    //bail!
                    return false;
                }
        
                if(res.Nitro.method == "batch.run"){
                    //loop through each returned method, using 'zzz' to avoid clobbering "i" in any for loops that get called from here...
                    for(var zzz=0;zzz<res.Nitro.Nitro.length;zzz++){
                        if(typeof res.Nitro.Nitro[zzz].method != "undefined"){
                            var data = res.Nitro.Nitro[zzz];
                            var method = data.method; 
                            switch(method){
                                //send the data to the appropriate method
                                case "user.getPointsBalance": self.parsePointsBalance(data); break;
                                case "user.getLevel": self.parseLevel(data); break;        
                                case "user.getPreference": self.parseMeInThree(data); break;
                            }
                        }
                    }
                }
            };
            
            
            /**
             * n4jive.hover.parsePointsBalance()
             * parses the response from user.getPointsBalance
             * @param responseObj - the response object from our data controller
             */    
            this.parsePointsBalance = function(responseObj){
                var self = this;
                var points = responseObj.Balance.pointCategories.PointCategory;
                $("#n4jive_hover #n4jive_hover_points p").html(n4jive.addCommas(points.points));    
            };
            
            /**
             * n4jive.hover.parseLevel()
             * parses the response from user.getLevel
             * @param responseObj - the response object from our data controller
             */    
            this.parseLevel = function(responseObj){
                var self = this;
                var level = responseObj.users.User.SiteLevel;
                
                $("#n4jive_hover #n4jive_hover_level p").html(level.name);    
                $("#n4jive_hover #n4jive_hover_level").prepend("<img src='"+level.iconUrl+"' />");    
            };
            
            this.parseMeInThree = function(responseObj) {
                var self = this;
                
                if (responseObj.userPreferences && responseObj.userPreferences.UserPreference) {
                    var preference = responseObj.userPreferences.UserPreference;
                    
                    if (preference.value && preference.value.length > 0) {
                        var nitro = new jive.nitro.Nitro({
                            apiKey: self.nitro.connectionParams.apiKey,
                            timeStamp: self.nitro.connectionParams.timeStamp,
                            signature: self.nitro.connectionParams.signature,
                            server: self.nitro.connectionParams.server,
                            userID: self.nitro.connectionParams.userId
                        });
                        
                        var challengeNames = preference.value.split("|");
                        for (var j=0; j < challengeNames.length; j++) {
                            if (challengeNames[j] && challengeNames[j].trim().length > 0) {
                                nitro.addMethod('user.getChallengeProgress', {
                                    userId: self.options.ownerId,
                                    challengeName: challengeNames[j]
                                });
                            }
                        }
                        
                        nitro.execute(function(res, promise) {
                            self.handleMeInThreeResponse(res);
                        });
                        
                        return;
                    }
                }
                
                this.parseRecentChallenges({
                    challenges: true
                });
            };
            
            this.handleMeInThreeResponse = function(res) {
                var nitro = res.Nitro;
                var challenges = [];
                
                $j.each(nitro.Nitro, function(i, method) {
                    if (method.method === "user.getChallengeProgress") {
                        $j.each($j.makeArray(method.challenges.Challenge), function(j, challenge) {
                            challenges.push(challenge);
                        });
                    }
                });
                
                this.parseRecentChallenges({
                    challenges: {
                        Challenge: challenges
                    }
                });
            };
            
            /**
             * n4jive.hover.parseRecentChallenges()
             * parses the response from site.getRecentChallenges
             * @param responseObj - the response object from our data controller
             */    
            this.parseRecentChallenges = function(responseObj){
                var self = this;
                var challenges = [];
                //check for no one first...
                if(responseObj.challenges === true){
                    $("#n4jive_hover_recent_challenges div:first").empty().html(this.options.emptyChallengesText);
                    return;
                }
                
                //organize challenges...
                //single challenge
                if(typeof responseObj.challenges.Challenge.length == "undefined"){
                    challenges.push(responseObj.challenges.Challenge);            
                }
                //multiple challenges
                else{
                    var uniqueChallenges = [];
                    
                    for(i=0;i<responseObj.challenges.Challenge.length;i++){
                        var challenge = responseObj.challenges.Challenge[i];
                        
                        //only show unique challenges...not repeats of previously earned
                        if( $.inArray(challenge.name, uniqueChallenges) ){
                            uniqueChallenges.push(challenge.name);
                            challenges.push(challenge);
                        }
                    }
                }
                
                var el = $("#n4jive_hover_recent_challenges div:first");
                    el.empty();
                for(var i=0;i<challenges.length;i++){
                    el.append(self.getRecentlyCompletedItemHTML(challenges[i]));
                }
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