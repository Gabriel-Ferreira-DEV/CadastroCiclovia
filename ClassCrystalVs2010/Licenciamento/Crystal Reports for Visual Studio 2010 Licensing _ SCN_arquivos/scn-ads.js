// populate map with ads meta info
	var google_ads = $j("meta[name*='ga_']");
	var adsMap = {};
	
	for (var i=0; i < google_ads.length; i++) {
	    var ga = $j(google_ads[i]);
		var ga_name = ga.attr("name").substring(3);
		var ga_values = ga.attr("content").split(',');
		
		if (ga_values.length == 1) {
    		adsMap[ga_name] = ga_values[0];
    	} else {
    		for (var j=0; j < ga_values.length; j++) {
    			if (ga_values[j] != "") {
    				adsMap[ga_name + (j+1)] = ga_values[j];
    			}
    		}
    	}
	}
	
	var _gs_googleAddAdSenseService = "ca-pub-8150866038032941";

	var adslots = $j("meta[name='adslots']");
	if (adslots.length) {
		adslots = adslots.attr("content").split(',');
	}