var jsonPath = xXpath + '/js/';
//////////////////////////////////////////////////////////////////////
// Build Primary Navigation with Json
//////////////////////////////////////////////////////////////////////
var Jdata;
var id0, id1, id2, id3, id4;
//Path to JSON file
$j.ajaxSetup({
	cache: true
});

function handleData(Jnav) {
	Jdata = Jnav;
	$j.each(Jnav.nav, function (i, z) {
		if (this.url == null) {
			urlX = " ";
		} else {
			urlX = "href=" + this.url + "";
		}
		if (i > 7) {
			cls = "class=\"nbtm\"";
		} else {
			cls = " ";
		}
		if (i > 8) {
		    if (this.url == null) {
				tar = "target=\"new_window\" class=\"noactive\"";
		    } else {
				tar = "class=\"noactive\"";
		    }
		} else {
			tar = " ";
		}
		$j('ul#id0').append('<li ' + cls + '><a ' + urlX + ' id="' + i + '" ' + tar + '>' + this.ui + '</a></li>');
	});
}

function handleUnifiedNavData(Jnav) {
	Jdata = Jnav;
	$j.each(Jnav.nav, function (i, z) {
        
		if (this.url == null) {
			urlX = " ";
		} else {
			urlX = "href=" + this.url + "";
		}
        
        var liClass = "";
        if (i >= 6) {
            liClass += "class=\"nbtm\"";
        }
        
        if (this.ui == "") {
            if(liClass != "") {
                liClass = liClass.substring(0, liClass.length - 1);
                liClass += " mock\"";
            } else {
                liClass = "class=\"mock\"";
            }
            $j('ul#id0').append('<li ' + liClass + '><p id="' + i + '" /p></li>');
        } else {
            var aClass = '';
            if(typeof(pageName) !== 'undefined' && pageName!='undefined' && this.ui==pageName){
                aClass='navigated';
            }
            $j('ul#id0').append('<li ' + liClass + '><a class="' + aClass + '"' + urlX + ' id="' + i + '" >' + this.ui + '</a></li>');
        }
	});
}

var jnavPath = 'jnav.min.js';

if (unifiedHeaderEnabled) {
    jnavPath = jsonPath + 'unified_header_nav.json';
} else {
    if(staticServer!=""){
        var current_protocol=window.location.protocol;
	    jnavPath = current_protocol + '//' + staticServer + '/' + jnavPath;
    }else{
	    jnavPath = jsonPath + jnavPath;
    }   
}

function  temp(){}

if (unifiedHeaderEnabled) {
    $j.ajax({
        url: jnavPath,
        dataType: "json",
        cache: true,
        success: function (json) {
            handleUnifiedNavData(json);
        }
    });
} else {
    $j.ajax({
        url: jnavPath,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        jsonpCallback: "temp",
        cache: true,
        success: function (json) {
            handleData(json);
        }
    });
}

var id = 0;

//////////////////////////////////////////////////////////////////////
// Nav on click action
//////////////////////////////////////////////////////////////////////
$j('.nav ul li a').live('click', function () {
	lID = $j(this).closest('ul').attr('id');
	$j('ul#' + lID + ' li a').removeClass('active');
	$j(this).addClass('active');
	if (lID == 'id0') {
		id0 = $j(this).attr('id');
		id1 = 0;
		if (Jdata.nav[id0].url) {} else {
			$j('#overlay').show();
			$j('.nav-block').hide();
			populateNav();
		}
	} else if (lID == 'id1') {
		id1 = $j(this).attr('id');
		dID = Jdata.nav[id0].sub[id1];
		pID = Jdata.nav[id0].sub[id1].sub;
//		SDN-15864
//		if (pID.length >= 11) {
//			columnNav();
//		}
		$j('.nav-block').hide();
		populateNav();
	} else if (lID == 'id2') {
		id2 = $j(this).attr('id');
		dID = Jdata.nav[id0].sub[id1].sub[id2];
		pID = Jdata.nav[id0].sub[id1].sub[id2].sub;
		populateNavX();
	} else if (lID == 'id3') {
		id3 = $j(this).attr('id');
		dID = Jdata.nav[id0].sub[id1].sub[id2].sub[id3];
		pID = Jdata.nav[id0].sub[id1].sub[id2].sub[id3].sub;
		populateNavX();
	} else if (lID == 'id4') {
		id4 = $j(this).attr('id');
		dID = Jdata.nav[id0].sub[id1].sub[id2].sub[id3].sub[id4];
		pID = Jdata.nav[id0].sub[id1].sub[id2].sub[id3].sub[id4].sub;
		populateNavX();
	}
});

//////////////////////////////////////////////////////////////////////
// Populate Nav teir 1 - 3
//////////////////////////////////////////////////////////////////////
function populateNav() {
	if (lID == 'id0') {
		$j('#overlay').html('<div class="tabs nav"><ul id="id1" class="id0-pop nav"></ul><a href="#" class="close" id="btn-close"></a></div>	<div class="nav-block-first"></div><div id="overlay-box"><div id="overlay-block"><div id="overlay-teir"></div><div id="overlay-bg"></div></div></div>');
	}
	$j('#overlay-teir').html(' ');
	var items = [];
	$j.each(Jdata.nav[id0].sub, function (i, y) {
		items.push('<li><a id="' + i + '">' + y.ui + '</a></li>');
	});
	if (id1 == null) {
		id1 = 0;
	}
	$j('.' + lID + '-pop').html(items.join(' '));
	$j('.' + lID + '-pop li a').first().addClass('active');
	var itemsS = [];
	if (lID == 'id0' || 'id1') {
		$j('.id1-h').show();
		$j('#overlay-box').removeClass('smlr_s');
		if (Jdata.nav[id0].sub[id1].ui && Jdata.nav[id0].sub[id1].url) {
			tname = '<a href="' + Jdata.nav[id0].sub[id1].url + '">' + Jdata.nav[id0].sub[id1].ui + '</a>';
		} else {
			tname = Jdata.nav[id0].sub[id1].ui;
		}

		itemsS.push('<div class="nav-block id1-h nav"><h2>' + tname + '</h2><ul id="id2" class="id1-pop nav">');
		// SDN-16003: show 1st block in one column if no exists sub in it. 
		var columnNav = true;
		$j.each(Jdata.nav[id0].sub[id1].sub, function (i, x) {
			if (this.url == null || this.url != null && this.sub != null) {
				urlX = " ";
				urlarrow = "&#0187;";
				columnNav = false;
			} else {
				urlarrow = " ";
				urlX = "href=" + this.url + "";
			}
			
			if (i == 10 && Jdata.nav[id0].sub[id1].sub.length >= 13 && columnNav) {
//				SDN-15864
//				$j('#overlay-teir').hide();
				$j('#overlay-box').addClass('smlr_s');
				itemsS.push('</ul></div><div class="nav-block sec nav"><ul>');
			}
			
			itemsS.push('<li><a ' + urlX + ' id="' + i + '"><span class="text">' + x.ui + '</span><span class="chev">' + urlarrow + '</span></a></li>');
		});
		itemsS.push('</ul></div>');
		$j('.nav-block-first').html(itemsS.join(' '));
		if ($j.browser.msie) {
			roundcornersTabs();
		}
	}
}

//////////////////////////////////////////////////////////////////////
// Populate Nav teir 3 - 6
//////////////////////////////////////////////////////////////////////
function populateNavX() {
	if (dID.url && !dID.sub) {
		return false;
	}
	$j('.' + lID + '-h').show();
	if (lID == 'id2') {
		$j('#overlay-teir').html('<div class="nav-block id2-h nav"><h2></h2><p></p><ul id="id3" class="id2-pop"></ul></div>');
	} else if (lID == 'id3') {
		$j('.id3-h, .id4-h').remove();
		$j('#overlay-teir').append('<div class="nav-block id3-h nav"><h2></h2><p></p><ul id="id4" class="id3-pop"></ul></div>');
	} else if (lID == 'id4') {
		$j('.id4-h').remove();
		$j('#overlay-teir').append('<div class="nav-block id4-h nav"><h2></h2><p></p><ul id="id5" class="id4-pop"></ul></div>');
	}
	var itemX = [];
	if (dID.url) {
		dIDurl = "<a href=" + dID.url + ">" + dID.ui + "</a>";
	} else {
		dIDurl = dID.ui;
	}
	$j('.' + lID + '-h h2').html(dIDurl);
	$j.each(pID, function (i, x) {
		if (this.url == null || this.url && this.sub) {
			urlX = " ";
			urlarrow = "&#0187;";
		} else {
			urlX = "href=" + this.url + "";
			urlarrow = "";
		}
		itemX.push('<li><a ' + urlX + ' id="' + i + '"><span class="text">' + x.ui + '</span><span class="chev">' + urlarrow + '</span></a></li>');
	});
	$j('.' + lID + '-pop').html(itemX.join(' '));
}

//////////////////////////////////////////////////////////////////////
// IE conditional round corners
//////////////////////////////////////////////////////////////////////
function roundcornersTabs() {
	$j('.tabs li a').corner('round 5px tl tr');
}

//////////////////////////////////////////////////////////////////////
// Close overlay
//////////////////////////////////////////////////////////////////////
$j('#overlay .close').live('click', function () {
	$j('#overlay').fadeOut();
	$j('ul#id0 li a').removeClass('active');
});

//////////////////////////////////////////////////////////////////////
//search selected community
//add options for seach action below
//first option is to remain the local query for jive.
//////////////////////////////////////////////////////////////////////
$j(document).ready(function(){
	// placeholder attribute of input tag is not supported by IE6-9. However IE 10 supports it.
	var isInputPlaceholderSupported = 'placeholder' in document.createElement('input');
	$j.getJSON(jsonPath + 'sselector.js', function(selections){
		$j.each(selections.searchSelector, function(i,y){
			$j('#select-options-pop').append('<li><a href="#" id="'+y.url+'" rel="'+y.fieldname+'" title="'+y.value+'" >'+y.name+'</a></li>');
		});
		
		// Remove Search SAP url depend on environment
		if (curr_environment !== "Prod") {
			$j('#select-options-pop li:nth-child(3)').remove();
			$j('#select-options-pop li:nth-child(1)').remove();
		} else {
			$j('#select-options-pop li:nth-child(4)').remove();
			$j('#select-options-pop li:nth-child(2)').remove();
		}
		
		var squery;
		var sname;
		var sbind;
		
		if (curr_environment !== "Prod") {
		//populate selector
			$j("#jive-userbar-search-form").attr("action", selections.searchSelector[1].url);
			$j(".search-field").attr("name", selections.searchSelector[1].fieldname);
			$j(".search-field").attr("placeholder", selections.searchSelector[1].value);
			squery = selections.searchSelector[1].url;
			sbind = '&';
			sname = selections.searchSelector[1].fieldname;
		}else{
			$j("#jive-userbar-search-form").attr("action", selections.searchSelector[0].url);
			$j(".search-field").attr("name", selections.searchSelector[0].fieldname);
			$j(".search-field").attr("placeholder", selections.searchSelector[0].value);
			squery = selections.searchSelector[0].url;
			sbind = '&';
			sname = selections.searchSelector[0].fieldname;
		}
		
		if (!isInputPlaceholderSupported) {
			$j(".search-field").attr("value", $j(".search-field").attr("placeholder"));
			$j(".search-field").focus(function() {
				var input = $j(this);
				if (input.val() == input.attr("placeholder")) {
					input.val("");
				}
			}).blur(function() {
			var input = $j(this);
				if (input.val() == "") {
					input.val(input.attr("placeholder"));
				}
			});
		}
		
		//Form Change Actions
		$j('#select-options li a').live('click', function(){
			$j("#jive-userbar-search-form").attr("action", $j(this).attr('id'));
			// WARNING: Hard coded strings below. This needs to be optimized.
			if (!isInputPlaceholderSupported && ($j(".search-field").attr("value") == "" || $j(".search-field").attr("value") == "Search All of SAP" || $j(".search-field").attr("value") == "Search the Community")) {
				$j(".search-field").attr("value", $j(this).attr('title'));
			}
			$j(".search-field").attr("placeholder", $j(this).attr('title'));
			$j(".search-field").attr("name", $j(this).attr('rel'));
			squery =  $j(this).attr('id');
			sbind = '&';
			sname = $j(this).attr('rel');
			$j("#select-options").fadeOut();
		});
		
		//Dropdown navigation
		$j(".btn-blu-dwn").live('hover', function() {
			$j(this).parent().find("#select-options").fadeIn();  
			$j(this).parent().hover(function() {  
			}, function(){  
				$j(this).parent().find("#select-options").fadeOut();  
			});  
		});

		//Submit form on enter
		$j('#jive-query').live('keypress',function(e) {
			if (e.which == 13) {
				var svalue = $j('.search-field').val();
				window.open(squery + sbind + sname +'=' + svalue);
				return false;
			}
		});

		$j("#search-submit").click(function(){
			var svalue = $j('.search-field').val();
			window.open(squery + sbind + sname +'=' + svalue);
		});
	});
});

var mouse_is_inside = false;
$j('#overlay, .nav').hover(function(){ 
        mouse_is_inside=true; 
}, function(){ 
    mouse_is_inside=false; 
});

$j("body").mouseup(function(){ 
    if(! mouse_is_inside) $j('#overlay').fadeOut();
    $j('ul#id0 li a').removeClass('active');
});

//////////////////////////////////////////////////////////////////////
// Populate user name, points & avatar
//////////////////////////////////////////////////////////////////////
$j(document).ready(function () {
	var i18n;
	$j.getJSON(jsonPath + 'i18n.js', function (lang) {
		i18n = lang;
		$j.each(lang, function (key, value) {
			$j('.' + key).html(value);
		});
		if (window._jive_current_user === undefined) {
			$j.getJSON('js/user.json', function (jusers) {
				users = jusers;
				$j('#user-name').html('<a href="' + users.url + '">' + users.name + '</a>');
				if (users.img) {
					$j('#user-img').html('<img src="' + users.img + '"/>');
				}
				if (users.points) {
					$j('#user-points').html(users.points + ' ' + i18n.sappoints);
				} else {
					$j('#user-points').html(i18n.sappoints);
				}
				//////////////////////////////////////////////////////////////////////
				//User dropdown id variable for user preferences
				//////////////////////////////////////////////////////////////////////
				userIDs = 2004;
				var user_dd = [{
					'name': 'Change photo &amp; avatar',
					'url': '/edit-profile-avatar!input.jspa?targetUser=' + userIDs
				}, {
					'name': 'Edit profile &amp; privacy',
					'url': '/edit-profile!input.jspa?targetUser=' + userIDs
				}, {
					'name': 'Preference',
					'url': '/user-preferences!input.jspa'
				}, {
					'name': 'Change password',
					'url': '/change-password!input.jspa'
				}, {
					'name': 'Log out',
					'url': '/logout.jspa'
				}];

				$j.each(user_dd, function () {
					$j('#user-options-pop').append('<li><a href="' + this.url + '" title="' + this.name + '">' + this.name + '</a></li>');
				});
				
				//////////////////////////////////////////////////////////////////////
				//Dropdown navigation
				//////////////////////////////////////////////////////////////////////
				$j(".dd").live('hover', function () {
					$j(this).parent().find(".ddoption").fadeIn();
					$j(this).addClass("hover");
					$j(this).parent().hover(function () {}, function () {
						$j(this).parent().find(".ddoption").fadeOut();
						$j(".dd").removeClass("hover");
					});
				});

			 });
		} else {
			// COMM-818 [Restore the Jive standard on points]
			if (window._jive_current_user.points !== undefined) {
				$j('#user-points').html(window._jive_current_user.points + ' ' + i18n.sappoints);
			}
		}
	});
});


//////////////////////////////////////////////////////////////////////
// populate header / footer navigation 
//////////////////////////////////////////////////////////////////////
$j(document).ready(function(){
	$j.getJSON(jsonPath + 'tfnav.js', function(items){
		$j.each(items.nav[0].top, function(i,v){
			$j('#j-search nav ul').append('<li><a href="'+v.url+'" title="'+v.name+'">'+v.name+'</a></li>');
		});
		$j.each(items.nav[1].footer, function(i,z){
			if(i < 3) {
				$j('.j-footer-nav .bold').append('<li><a href="'+z.url+'" title="'+z.name+'">'+z.name+'</a></li>');
			} else {
				$j('.j-footer-nav .normal').append('<li><a href="'+z.url+'" title="'+z.name+'">'+z.name+'</a></li>');
			}
		});
	});
});

//////////////////////////////////////////////////////////////////////
// Equal Height
//////////////////////////////////////////////////////////////////////
function equalHeight(group) {
	var tallest = 0;
	var lastRowHeight = $j('.jive-body-layout-s1 .jive-widget-container .jive-widget:last-child').height();
	group.each(function() {
		var thisHeight = $j(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
	$j('.jive-body-layout-s1 .jive-widget-container .jive-widget:last-child, .jive-body-layout-s2 .jive-widget-container .jive-widget:last-child, .jive-body-layout-s3 .jive-widget-container .jive-widget:last-child').height(lastRowHeight);
}

//////////////////////////////////////////////////////////////////////
// Equal Height By Rows
//////////////////////////////////////////////////////////////////////
function equalWidgetsHeightByRows() {
	var maxCol = 3;
	var maxRow = 0;
	var wMatrix = new Array();

	for (var j=0; j<maxCol; j++) {
		var sj = $j('.jive-body-layout-s' + (j+1) + ' .jive-widget-container .jive-widget');
		wMatrix[j] = new Array();
		sj.each(function(){
			wMatrix[j].push($j(this));
		});
		if (wMatrix[j].length > maxRow) {
			maxRow = wMatrix[j].length;
		}
	}

	for (var i=0; i<maxRow-1; i++) {
		var maxHi = 0;
		for (var j=0; j<maxCol; j++) {
			if (wMatrix[j][i] != undefined && wMatrix[j][i].length) {
				var thisHeight = wMatrix[j][i].height();
				if (thisHeight > maxHi) {
					maxHi = thisHeight;
				}
			}
		}
		for (var j=0; j<maxCol; j++) {
			if (wMatrix[j][i] != undefined && wMatrix[j][i].length) {
				wMatrix[j][i].height(maxHi);
			}
		}
	}
}
