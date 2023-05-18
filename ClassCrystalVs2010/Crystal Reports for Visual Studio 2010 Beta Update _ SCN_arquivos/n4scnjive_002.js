$j(document).ready(function() {
    
    if ($j('#jive-nitro-reputation-tab').hasClass('active')) {
        
        function getNavLinkTitle(page) {
            var title = "";
            switch (page) {
            case "missions":
                title = 'Mission Completion Status';
                break;
            case "places":
                title = 'Expertise in Spaces Where User Participated';
                break;
            case "leaders":
                title = 'Site-wide and Connection Ranking';
                break;
            case "history":
                title = 'Mission and Points History';
                break;
             }
             return title;
        };

        function getIds() {
            var ids = '';
            $j("ul img", "#nitro4x_me_in_three_list").each(function(i,e) {
                ids += $j(e).data('id') + '|';
            });
            // Strip off the last |
            if (ids !== '') ids = ids.slice(0, -1);
            return ids;
        };

        function addToMeInThree(el) {
            var currentIds = getIds();
            var myThreePieces = currentIds.split('|');
            var dataId=$j("img", el).attr("data-id");
            myThreePieces.push(dataId);
            currentIds = myThreePieces.join("|");
            return currentIds;
        }

        function removeFromMeInThree(el) {
            var currentDataId=$j("img", el).attr("data-id");
            var currentIds = getIds();
            var myThreePiecesInput = currentIds.split('|');
            var myThreePiecesOutput = [];

            for (var i = 0; i < myThreePiecesInput.length; i++) {
                if (myThreePiecesInput[i] != currentDataId) {
                    myThreePiecesOutput.push(myThreePiecesInput[i])
                }
            }
            return myThreePiecesOutput.join("|");
        }

        function performMeInThreeUpdate(currentIds) {
            $j.getJSON('update-me-in-three.jspa?value=' + currentIds, function(data) {
                // Don't care about the response
            });
        }
        
        // hack for Reputation Tab layout
        $j('.j-column-s').addClass('n4-scn-reputation-layout-s').css('width', '146px');
        $j('.j-column-l').addClass('n4-scn-reputation-layout-l').css('margin-left', '135px');

        $j('.js-select-link').attr('title', function () {
            return getNavLinkTitle($j(this).parent().attr("data-filter-id"));
        });

        var lifetime_points_text = 'Lifetime Points';
        
        $j('div[class=nitro4x_header_rank_box]').live("mouseenter", function(e) {
            $j('span.nitro4x_add_comma_header').html(function(e) {
              return $j(this).html().replace('Points', lifetime_points_text);
            });
            return $j(this).addClass('live');
        });

        $j('div[class=info_box]').live("hover", function(e) {
            var new_points_text = ' ' + lifetime_points_text;
            $j('div.info_box').attr('title', function() {
                var points = $j(this).children('span.units.nitro4x_add_comma').html();
                return "" + points + new_points_text;
            }).addClass('live');
            return $j(this).addClass('live');
        });

        $j('.nitro4x_reputation .nitro4x_front_side div[class=nitro4x_points]').live("hover", function(e) { 
            $j('.nitro4x_reputation .nitro4x_front_side div.nitro4x_points').attr("title", function(e) {
              return $j(this).html().replace('Points', lifetime_points_text);
              }).addClass('live');
            return $j(this).addClass('live');
        });
    }

    // meInThree custom implementation
    $j("#nitro4x_badge_list:not(.live)").live("hover", function(e) {

        $j("#nitro4x_me_in_three_list").live("drop", function( event, ui ) {
            // execute back-end action
            var currentIds = addToMeInThree(ui.draggable);
            performMeInThreeUpdate(currentIds);
        });

        $j("#nitro4x_me_in_three_list ul > li").live("click", function(event){
            var el = $j(this);
            var target = $j(event.target);
            if(target.hasClass("delete_badge_button")){
                // execute back-end action
                var currentIds = removeFromMeInThree(el);
                performMeInThreeUpdate(currentIds);
            }
        });

        $j("#nitro4x_badge_list").live("drop", function(event, ui){
            // execute back-end action
            var currentIds = removeFromMeInThree(ui.draggable);
            performMeInThreeUpdate(currentIds);
        });
        
        $j(this).addClass("live");
    });

});
