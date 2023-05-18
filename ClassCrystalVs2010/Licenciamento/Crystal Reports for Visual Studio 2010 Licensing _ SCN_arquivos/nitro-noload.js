var nitroProtocol = "http";
if( document.location.toString().indexOf( 'https://' ) != -1 ) {
	nitroProtocol = "https";
}
if (typeof nitroLibsVersion == "undefined") {
	nitroLibsVersion = "current";	
}	


if (typeof Nitro=="undefined") {
	
	function Nitro(connectionParams) {

		if (typeof Nitro.counter == "undefined") {
			Nitro.counter = 0;			
		}
		if (typeof Nitro.instances == "undefined") {
			Nitro.instances = new Array();			
		}
		if (typeof Nitro.divCounter == "undefined") {
			Nitro.divCounter = 0;	
		}
		
		this.counterId = Nitro.counter ++;
		var twitterEnabled = null;	
		var twitterLoginUrl = null;
		var facebookEnabled = null;
		var facebookLoginUrl = null;
		var paymentOptions = null;
		var paymentMethods = null;
		
		Nitro.instances.push(this);
		
		this.connectionParams = connectionParams;
		if (typeof this.connectionParams.debug == "undefined") {
			this.connectionParams.debug = false;
		}
		Nitro.debug = this.connectionParams.debug;
		this.jsConnector = new NitroJSConnector(connectionParams);
		
		//asynchronous since this object doesn't exist until the closing bracket
		var thisObj = this;
		setTimeout(function() {thisObj.handleRedirects();}, 250);
		
		this.getUserId = function (callback) {
			return NitroCookies.getUserId(this.connectionParams.apiKey, callback);
		}
		
		Nitro.getUserId = function (apiKey, callback) {
			return NitroCookies.getUserId(apiKey, callback);	
		}
		
		this.setUserId = function (value) {
			NitroCookies.setUserId(this.connectionParams.apiKey, value, true, false);
		}
		
		this.showPendingNotifications = function(callback, asyncToken, returnCount) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.showPendingNotifications(this.connectionParams, callback, asyncToken, returnCount);
		}
		Nitro.showPendingNotificationsNoCallback = function(callback, asyncToken) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
			return instance.showPendingNotifications();
		}		
		this.showNotificationsByName = function(notificationNames, callback, asyncToken, previewMode) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.showNotificationsByName(this.connectionParams, notificationNames, callback, asyncToken, previewMode);
		}
		this.getNotificationsFeed = function(callback, asyncToken, userIds, returnCount) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.getNotificationsFeed(this.connectionParams, callback, asyncToken, userIds, returnCount);
		}
		this.callAPI = function (params, callback, asyncToken, addUserId, noSessionKey) {
			return this.jsConnector.callAPI(params, callback, asyncToken, addUserId, noSessionKey);
		}	
		Nitro.callAPI = function (params, callback, asyncToken, addUserId, noSessionKey) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
			return instance.callAPI(params, callback, asyncToken, addUserId, noSessionKey);
		}
		this.logAction = function (tags, value) {
		  	this.jsConnector.callAPI("method=user.logAction&tags="+tags+(value ? '&value='+value : ''), "Nitro.processLogAction", this.counterId, true);
		}
		Nitro.logAction = function (tags, value, target, asyncToken) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
		  	instance.jsConnector.callAPI("method=user.logAction&tags="+tags+(value ? '&value='+value : '')+(target ? '&target='+target : ''), "Nitro.processLogAction", this.counterId, true);
		}
		
		Nitro.getInstanceForResponse = function(data, counterId) {
			if (data == null) {
				if (Nitro.debug) {
					alert ('Error');
				}
				return;
			}
			if (data.Nitro.res == "err") {
				if (Nitro.debug) {
					alert (data.Nitro.Error.Message);
				}
				return;
			}
			
			return Nitro.getInstanceForCounter(counterId);
		}
		
		Nitro.getInstanceForCounter = function(counterId) {
			for (var i = 0; i < Nitro.instances.length; i++) {
				if (Nitro.instances[i].counterId == counterId) {
					return Nitro.instances[i];
				}
			}
			return null;
		}		
		
		Nitro.processLogAction = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);
			// copy over session key to avoid extra login
			instance.connectionParams.sessionKey = instance.jsConnector.connectionParams.sessionKey;	
			NitroNotifier.jsConnector = this.jsConnector;
			NitroNotifier.showPendingNotifications(instance.connectionParams);
		}
		
		this.embedWidget = function(embedNames,divId,owner) {
			if (owner == null) {
				owner = "";	
			}
			if (this.jsConnector.connectionParams.userId == null) {
				var _self = this;
				setTimeout(function(){
					_self.embedWidget(embedNames,owner);
				}, this.retryEmbedInterval);
				return;			 
			}

			this.callAPI("method=user.getWidgetEmbeds&embedNames=" + embedNames, "Nitro.processGetWidgetEmbeds", this.counterId + "|" + divId + "|" + owner);
		}
		
		Nitro.processGetWidgetEmbeds = function(data, token) {
			var cId = token.split("|")[0];
			var instance = Nitro.getInstanceForResponse(data,cId);			
			instance.embedWidgetWithParams(data, token.split("|")[1], token.split("|")[2]);
		}
		
		this.embedWidgetWithParams = function(data, divId, owner) {
			var viewerId = this.jsConnector.connectionParams.userId;
			var ownerId = this.jsConnector.connectionParams.userId;		
			if (owner != null && owner != "") {
				ownerId = owner;	
			}
			var server = this.connectionParams.server.replace("/json", "/xml");
			
			var embedsArray = this.makeArray(data.Nitro.widgetEmbeds.WidgetEmbed);
			if (typeof embedsArray == "undefined") {
				return;	
			}
			
			for (var i=0; i < embedsArray.length; i++) {
				var embed = embedsArray[i];
				var type = embed.type;
				
				if(this.args && this.args[divId]) {
					var args = this.args[divId];
				}else  {
					var args = {};
				}
				args.apiKey=this.connectionParams.apiKey;
				args.server=server;
				args.ownerId=ownerId;
				args.viewerId=viewerId;
				args.divId=divId;
				args.nitroInstanceId=this.counterId;
					
				if (typeof this.connectionParams.timeStamp != "undefined") {
					args.timeStamp = this.connectionParams.timeStamp;
					args.signature = this.connectionParams.signature;
				}
				if (typeof this.connectionParams.sessionKey != "undefined") {
					args.sessionKey = this.connectionParams.sessionKey;				
				}

				var div = document.getElementById(divId);
				var attrs = div.attributes;

				/* precedence of params is
					1) Specified already in the args param
					2) Specified in the element tag via NML
					3) Specified in Nitro via the AdminUI
				*/
				var paramsArray = this.makeArray(embed.embedParams.WidgetEmbedParam);
				if (typeof paramsArray != "undefined") {
					for (var j=0; j < paramsArray.length; j++) {
						var param = paramsArray[j];
						//if the flashVar is not already set
						if(typeof args[param.name] == 'undefined') {
							//sets flashVars that came down from Nitro 
							if (param.value != null && param.value != "") {
								args[param.name] = param.value;
							}
							//overwrites those flashVars if they are specified via NML
							for(var k=attrs.length-1; k>=0; k--) {
								if (attrs[k].value == null || attrs[k].value == "null") {
									continue;
								}
								if (attrs[k].name.toLowerCase() == param.name.toLowerCase()) {
									args[param.name] = attrs[k].value;	
								}
							}
						}
					}
				}
				
				nitroWidget.embed(type, args);
			}
		}
		this.makeArray = function(obj) {
			if (typeof obj != "undefined" && typeof obj.length == "undefined") {
				return [obj];
			}
			return obj;
		}
		Nitro.isString = function() {
			if (typeof arguments[0] == 'string') 
				return true;
			if (typeof arguments[0] == 'object') {  
				var criterion = arguments[0].constructor.toString().match(/string/i); 
				return (criterion != null);  
			}
			return false;
		}		
		this.getElementForClass = function(className) {
			var all = document.all ? document.all :
			document.getElementsByTagName('*');
			var elements = new Array();
			for (var e = 0; e < all.length; e++)
				if (all[e].className.indexOf(className) != -1)
					elements[elements.length] = all[e];
			return elements;
		}
						
		this.addClass = function(elem, clazz) {
			if(!elem.className)
				elem.className = "";
			if(elem.className.indexOf(clazz) == -1) {
				elem.className+= " " + clazz;
			}
		}	
						
		this.removeClass = function(elem, clazz) {
			elem.className = elem.className ? elem.className.replace(clazz,'') : '';
		}		

		this.retryEmbedInterval = 10;
		
		this.refreshNML = function(primaryNMLThread) {
			if (this.jsConnector.connectionParams.sessionKey == null) {
				var _self = this;
				setTimeout(function(){
					_self.refreshNML();
				}, this.retryEmbedInterval);
				return;			 
			}
			
     		var items = document.getElementsByTagName("*");
		    var i=items.length;
			var elem;
			
			// look for tests first
			var testsToReplace = new Array();
			var testGroup = this.jsConnector.connectionParams.abTestGroup;
			if (typeof testGroup == "undefined" || testGroup == null || testGroup == "") {
				testGroup = "content";	
			}
			while (i > 0) {
				i--;
				elem = items[i];
				if (this.isNitroNode(elem, "block")) {
					var children = elem.getElementsByTagName("*");
					var childToUse = null;
					for (var j = 0; j < children.length; j++) {  
						var child = children[j];
						if (this.isNitroNode(child, testGroup)) {
							childToUse = child;
							break;
						}
					}					
					if (childToUse != null) {
						testsToReplace.push({child : child, elem : elem});						
					}					
				}
			}
			
			for (i = 0; i < testsToReplace.length; i++) {
				var testNode = testsToReplace[i].elem;
				var groupNode = testsToReplace[i].child;
				while (groupNode.firstChild) {
					testNode.parentNode.insertBefore(groupNode.firstChild, testNode);
				}
				testNode.parentNode.removeChild(testNode);
			}
			
			var nodeWasUpdated = false;
			items = document.getElementsByTagName("*");
		    i=items.length;
			while (i > 0) {
				i--;
				elem = items[i];
				if(elem && elem.id && elem.id.indexOf('nitro_elem_') == 0)	{
					//replacement in progress
					continue;
				}
				var params = "";
				var addUserId = false;
				var newElem = null;
				if (this.isNitroNode(elem, "request")) {
					var attrs = elem.attributes;
					for(var j=attrs.length-1; j>=0; j--) {
						if (attrs[j].name.toLowerCase() == "adduserid") {
							addUserId = true;
						}
						else if (this.isNitroParameter(attrs[j])) {
							var val = attrs[j].value;
							if(val.indexOf('eval(') != -1) {
								val = val.substring(6);
								val = val.substring(0,val.length-2);
								val = eval(val);
							}
							params += "&" + attrs[j].name + "=" + val;
						}
					}
					elem.id = "nitro_elem_" + Nitro.divCounter;
					this.callAPI(params, "Nitro.processNMLCall", this.counterId + "|" + elem.id, addUserId);	
					Nitro.divCounter++;
					nodeWasUpdated = true;
				}
				else if (this.isNitroNode(elem, "widget")) {
					var ownerId = this.getElemAttribute(elem,"ownerId");
					var name = elem.getAttribute("name");
					if (name == null || name == "") {
	  					continue;
					}
					if (ownerId == "") {
						ownerId = null;
					}
					elem.id = "nitro_elem_" + Nitro.divCounter;
					Nitro.divCounter++;

					if(!this.args)
						this.args = [];
					this.args[elem.id] = {};
					
					for(var i = 0; i < elem.attributes.length; i++) {
						var a = elem.attributes.item(i);
						if(a.name)
							eval("this.args[elem.id]['"+a.name+"']='"+a.value+"'");
					}					

					if(!this.args[elem.id].userId) 
						this.args[elem.id].userId = this.args[elem.id].userid ? this.args[elem.id].userid : this.jsConnector.connectionParams.userId;
						
					this.embedWidget(name, elem.id, ownerId);
					nodeWasUpdated = true;
				}
				else if (this.isNitroNode(elem, "avatar-full") || this.isNitroNode(elem, "avatar-thumb")) {
					var userId = this.jsConnector.connectionParams.userId;
					var ownerId = this.getElemAttribute(elem,"ownerId");
					if (ownerId != "" && ownerId != null) {
						userId = ownerId;
					}					
					var size = elem.getAttribute("size");
					var catalog = elem.getAttribute("catalog");
					var src = nitroProtocol + "://dynamic.bunchball.net/assets/avatar/" + this.connectionParams.apiKey + "/" + userId + "/";
					if (this.isNitroNode(elem, "avatar-full")) {
						src = src + "full.png";
					}
					else {
						src = src + "thumb.png";	
					}
					src = src + "?ts=" + (new Date()).getTime();
					if (size != null) {
						src = src + "&size=" + size;	
					}
					if (catalog != null) {
						src = src + "&catalog=" + catalog;	
					}
					this.replaceWithImage(src, elem);
					nodeWasUpdated = true;
				}	
				else if (this.isNitroNode(elem, "canvas-flat")) {
					var userId = this.jsConnector.connectionParams.userId;
					var ownerId = this.getElemAttribute(elem,"ownerId");
					if (ownerId != "" && ownerId != null) {
						userId = ownerId;
					}										
					var size = elem.getAttribute("size");
					var catalog = elem.getAttribute("catalog");
					var src = nitroProtocol + "://dynamic.bunchball.net/assets/canvas/" + this.connectionParams.apiKey + "/" + userId + ".jpg";
					src = src + "?ts=" + (new Date()).getTime();
					if (size != null) {
						src = src + "&size=" + size;	
					}
					if (catalog != null) {
						src = src + "&catalog=" + catalog;	
					}
					this.replaceWithImage(src, elem);
					nodeWasUpdated = true;
				}	
				else if (this.isNitroNode(elem, "notifications-feed")) {
					var returnCount = this.getElemAttribute(elem, "returnCount");
					var userIds = this.getElemAttribute(elem, "userIds");
					elem.id = "nitro_elem_" + Nitro.divCounter;
					Nitro.divCounter++;			
					NitroNotifier.jsConnector = this.jsConnector;
					NitroNotifier.getNotificationsFeed(connectionParams, "Nitro.processNotificationsFeedNMLCall", this.counterId + "|" + elem.id, userIds, returnCount);
					nodeWasUpdated = true;
				}
			}
			if(primaryNMLThread || !this.primaryNMLThreadStarted) {
				this.primaryNMLThreadStarted = true;
				var _self = this;
				if(!this.nmlRefreshTimeout)
					this.nmlRefreshTimeout = 500;			
				if(nodeWasUpdated)
					this.nmlRefreshTimeout = 500;
				else
					this.nmlRefreshTimeout*= 3;
				if(this.nmlRefreshTimeout > 120000)
					this.nmlRefreshTimeout = 120000;				

				setTimeout(function(){
					_self.refreshNML(true);
				}, this.nmlRefreshTimeout);
			}
		}

		Nitro.updateTwitterSettingsAndHideNotification = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);					
			instance.twitterEnabled = null;
			Nitro.updateTwitterSettings(data, token);
		}

		Nitro.updateTwitterSettings = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);					
			
			//first timers
			if(data.Nitro.Twitter.requiresLogin) {
				twitterLoginUrl = data.Nitro.Twitter.requiresLogin				
			}
					
			var twitterSlider = document.getElementById('nitro_statusUpdater_twitter');
					
			if(data.Nitro.Twitter.enabled == "false") {
				twitterSlider.style.backgroundPosition = "-40px 0px";
				CurrentTwitterNitroInstanceId = instance.counterId;
				instance.twitterEnabled = false;
				if(twitterLoginUrl != null)
					twitterSlider.onclick = function(){window.open(twitterLoginUrl);CurrentTwitterStatusRefreshCounter = 0;Nitro.checkTwitterStatus();};
				else
					twitterSlider.onclick = function(){Nitro.callAPI('method=user.twitter.enable','Nitro.updateTwitterSettings',instance.counterId)};
			}else {
				twitterSlider.style.backgroundPosition = "0px 0px";					
				twitterSlider.onclick = function(){Nitro.callAPI('method=user.twitter.disable','Nitro.updateTwitterSettings',instance.counterId)};
				instance.twitterEnabled = true;
				CurrentTwitterNitroInstanceId = null;
				twitterLoginUrl = null;
			}
		}	

		Nitro.updateFacebookSettings = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);
			
			//first timers
			if(data.Nitro.Facebook.requiresLogin) {
				facebookLoginUrl = data.Nitro.Facebook.requiresLogin
			}
					
			var facebookSlider = document.getElementById('nitro_statusUpdater_facebook');
					
			if(data.Nitro.Facebook.enabled == "false") {
				facebookSlider.style.backgroundPosition = "-40px 0px";
				CurrentFacebookNitroInstanceId = instance.counterId;
				instance.facebookEnabled = false;
				if(facebookLoginUrl != null)
					facebookSlider.onclick = function(){window.open(facebookLoginUrl);CurrentFacebookStatusRefreshCounter = 0;Nitro.checkFacebookStatus();};
				else
					Nitro.callAPI('method=user.facebook.status','Nitro.updateFacebookSettings',instance.counterId);				
			}else {
				facebookSlider.style.backgroundPosition = "0px 0px";					
				facebookSlider.onclick = function(){Nitro.callAPI('method=user.facebook.disable','Nitro.updateFacebookSettings',instance.counterId)};
				instance.facebookEnabled = true;
				CurrentFacebookNitroInstanceId = null;
			}
		}

		var CurrentFacebookNitroInstanceId = null;
		var CurrentFacebookStatusRefreshCounter = 0;
		Nitro.checkFacebookStatus = function() {
			if(CurrentFacebookNitroInstanceId != null && CurrentFacebookStatusRefreshCounter < 50) {
				Nitro.callAPI('method=user.facebook.status','Nitro.updateFacebookSettings',CurrentFacebookNitroInstanceId);
				setTimeout("Nitro.checkFacebookStatus()", 2500);
				CurrentFacebookStatusRefreshCounter++;
			}
		}
		var CurrentTwitterNitroInstanceId = null;
		var CurrentTwitterStatusRefreshCounter = 0;
		Nitro.checkTwitterStatus = function() {
			if(CurrentTwitterNitroInstanceId != null && CurrentTwitterStatusRefreshCounter < 50) {
				Nitro.callAPI('method=user.twitter.status','Nitro.updateTwitterSettings',CurrentTwitterNitroInstanceId);
				setTimeout("Nitro.checkTwitterStatus()", 2500);
				CurrentTwitterStatusRefreshCounter++;
			}
		}		
		
		Nitro.processNotificationsFeedNMLCall = function(notifications, token) {
			var cId = token.split("|")[0];
			var instance = null;
			for (var i = 0; i < Nitro.instances.length; i++) {
				if (Nitro.instances[i].counterId == cId) {
					instance = Nitro.instances[i];
				}
			}
			instance.replaceNML(null, token.split("|")[1], notifications);
		}

		Nitro.processNMLCall = function(data, token) {
			var cId = token.split("|")[0];
			var instance = Nitro.getInstanceForResponse(data,cId);			
			instance.replaceNML(data, token.split("|")[1]);
		}
				
		this.replaceNML = function(data, divId, notifications) {
			var elem = document.getElementById(divId);
			var textReplacements = new Array();
			var imgReplacements = new Array();
			var htmlDivReplacements = new Array();
			var htmlSpanReplacements = new Array();			
			
			var children = elem.getElementsByTagName("*");
			var childToRepeat = null;
			for (var i = 0; i < children.length; i++) {  
				var child = children[i];
				if (child.getAttribute("nitro_repeat") != null) {
					childToRepeat = child;
					break;
				}
			}
			
			if (childToRepeat != null) {
				var numRows = this.getElemAttribute(elem, "returnCount");
				if (numRows == null) {
					numRows = 10;
				}
				for (var r=0; r < numRows;r++) {
					var clone = childToRepeat.cloneNode(true);									
					var cloneChildren = clone.getElementsByTagName("*");
					for (var c=0; c < cloneChildren.length; c++) {
						var setRank = false;
						if (this.isNitroNode(cloneChildren[c], "response") || this.isNitroNode(cloneChildren[c], "notification")) {
							cloneChildren[c].setAttribute("rank", r);
						}
					}
					childToRepeat.parentNode.insertBefore(clone, childToRepeat);
				}
				childToRepeat.parentNode.removeChild(childToRepeat);
			}
			
			for (var i = 0; i < children.length; i++) {  
				var child = children[i];
				if (this.isNitroNode(child, "notification")) {			
					var rank = child.getAttribute("rank");  
					if (rank == null) { 
						rank = 0; 
					}
					if (typeof (notifications[rank]) == "undefined") {
						continue;
					}
					this.addNodeReplacement(htmlDivReplacements, child, notifications[rank].html);
				}				
				else if (this.isNitroNode(child, "response")) {
					var accessor = child.getAttribute("data");
					if (accessor == "rank") {
						var rank = child.getAttribute("rank");  
						if (rank == null) { 
							rank = 0; 
						}
						this.addNodeReplacement(textReplacements, child, parseInt(rank) + 1);
						continue;
					}
					accessor = accessor.split(".");
					var value = data.Nitro;
					for (var a = 0; a < accessor.length; a++) {
						var curr = accessor[a];
						var arrI = curr.indexOf("[%]");
						if (arrI > -1) {
							var rank = child.getAttribute("rank");  
							if (rank == null) { 
								rank = 0; 
							}
							value = value[curr.substring(0, arrI)];
							if (typeof value == "undefined") {break;}
							value = this.makeArray(value);
							value = value[rank];
						}
						else {
							value = value[curr];
						}
						if (typeof value == "undefined") {break;}
					}
					if (typeof value == "undefined") {continue;}
					
					var postProcess = this.getElemAttribute(child, "postProcess");
					if (postProcess != null) {
						value = eval( postProcess + "(value)" );
					}
					
					if (child.getAttribute("type") != null && child.getAttribute("type") == "date") {
						var date = new Date(parseInt(value) * 1000);
						this.addNodeReplacement(textReplacements, child, date.toLocaleString());	
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "img") {
						this.addNodeReplacement(imgReplacements, child, value);
					}
					else if (child.getAttribute("type") != null && (child.getAttribute("type") == "avatar-full" || child.getAttribute("type") == "avatar-thumb")) {
					    var src = nitroProtocol + "://dynamic.bunchball.net/assets/avatar/" + this.connectionParams.apiKey + "/" + value + "/";
						if (child.getAttribute("type") == "avatar-full") {
							src = src + "full.png";
						}
						else {
							src = src + "thumb.png";	
						}	
						this.addNodeReplacement(imgReplacements, child, src);
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "canvas-flat") {
					    var src = nitroProtocol + "://dynamic.bunchball.net/assets/canvas/" + this.connectionParams.apiKey + "/" + value + ".jpg";
						this.addNodeReplacement(imgReplacements, child, src);
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "html") {
						this.addNodeReplacement(htmlSpanReplacements, child, value);
					}
					else {
						this.addNodeReplacement(textReplacements, child, value);								
					}
				}
			}		
			
			for (var i = 0; i < textReplacements.length; i++) {
				this.replaceWithText(textReplacements[i].value, textReplacements[i].elem);
			}
			for (var i = 0; i < htmlDivReplacements.length; i++) {
				this.replaceWithHtml(htmlDivReplacements[i].value, htmlDivReplacements[i].elem, "div");
			}
			for (var i = 0; i < htmlSpanReplacements.length; i++) {
				this.replaceWithHtml(htmlSpanReplacements[i].value, htmlSpanReplacements[i].elem, "span");
			}
			for (var i = 0; i < imgReplacements.length; i++) {
				this.replaceWithImage(imgReplacements[i].value, imgReplacements[i].elem);
			}
			
			while (elem.firstChild)
			{
				elem.parentNode.insertBefore(elem.firstChild, elem);
			}	
			elem.parentNode.removeChild(elem);				
		}
		
		this.isNitroNode = function(elem, type){
			if (!elem || !elem.nodeName) {
				return false;	
			}
			return (elem.nodeName.toUpperCase() == "NITRO:" + type.toUpperCase() || elem.nodeName.toUpperCase() == type.toUpperCase());
		}
		this.isNitroParameter = function(attr) {
			if (attr.value != null && attr.value != "null" && attr.value != "") {
				if (attr.name in {'id':'', 'tabIndex':'','disabled':'', 'contentEditable':'', 'hideFocus':''}) {
					return false;
				}
				if (attr.name.indexOf("nml_") == 0) {
					return false;
				}
				return true;
			}	
		}
		this.getElemAttribute = function(elem, attr) {
			if (elem.getAttribute(attr) != null) {
				return elem.getAttribute(attr);					
			}
			if (elem.getAttribute(attr.toLowerCase()) != null) {
				return elem.getAttribute(attr.toLowerCase());					
			}			
			return null;
		}
		this.addNodeReplacement = function(replacementsArr, elem, value) {
			if (typeof value == "undefined") {
				value = "";
			}
			replacementsArr.push({value : value, elem : elem});
		}
		this.replaceWithText = function(text, elem) {
			if (text != null && typeof text != "undefined") {
				var newNode = document.createTextNode(text);
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		this.replaceWithImage = function(url, elem) {
			if (url != null && typeof url != "undefined") {
				var newNode = document.createElement('img');
				newNode.setAttribute("src", url);
				
				var attrs = elem.attributes;
				for(var j=attrs.length-1; j>=0; j--) {
					newNode.setAttribute(attrs[j].name, attrs[j].value);
				}
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		this.replaceWithHtml = function(html, elem, divOrSpan) {
			if (html != null && typeof html != "undefined") {
				var newNode = document.createElement(divOrSpan);
				newNode.innerHTML = html;
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		Nitro.onBuyPointsClick = function(pointCategory) {
		
			if (typeof Nitro_Overlay != "undefined") {
				nitroOverlay.reset();
			}
		
			var nitro = Nitro.getInstanceForCounter(0);
			if(nitro != null) {
				var params = new Object();
				params.pointCategory = pointCategory;
				nitro.showPaymentDialog(params);
			}
		}
		this.showPaymentDialog = function(params) {
			if (params.pointCategory == null) {
				return;	
			}
			if (params.useDefaultStyle == null) {
				params.useDefaultStyle = true;
			}
			if (params.paymentWindowTarget == null) {
				params.paymentWindowTarget = "_blank";
			}
			if(typeof nitroToolbar != "undefined")
				nitroToolbar.reset();
			this.paymentDialogParams = params;
			this.jsConnector.callAPI("method=site.getPaymentOptions&verifyPointCategory=true&pointCategory=" + this.paymentDialogParams.pointCategory, "Nitro.processPaymentOptions", this.counterId, true);
		}
		
		Nitro.processPointsBalance = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data, token);		
			instance.updatePaymentDialogPointsBalance(data);
		}
		Nitro.processPaymentOptions = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data, token);			
			instance.showPaymentDialogWithOptions(data);
		}
		Nitro.reloadWidgets = function() {
			var isIE = navigator.appName.indexOf("Microsoft") != -1;
			for(var i in nitroWidget.embedNames) {
				var flashName = nitroWidget.embedNames[i];
				if(Nitro.isString(flashName) && flashName.toLowerCase().indexOf('cookie') >= 0)
					continue;
				if(Nitro.isString(flashName) && flashName.toLowerCase().indexOf('poker') >= 0)
					continue;					
				var flashObject = swfobject.getObjectById(flashName);
				if(flashObject) {
					var prevNode = flashObject.prevSibling;
					var parentNode = flashObject.parentNode;
					parentNode.removeChild(flashObject);
					if(prevNode == null) {
						parentNode.appendChild(flashObject);
					}else {
						parentNode.insertBefore(flashObject,prevNode.nextSibling);
					}
					if(isIE && document.getElementById('nitroAvatar')) {
						setTimeout("document.getElementById('nitroAvatar').focus()",2500);					
					}else {
						//document.getElementById(flashName).focus();
					}
				}
			}
		}
		this.updatePaymentDialogPointsBalance = function(data) {
			var balance = data.Nitro.Balance.pointCategories.PointCategory.points;
			var iconUrl = data.Nitro.Balance.pointCategories.PointCategory.iconUrl;
			var balanceDiv = document.getElementById('nitro_payment_dialog_points_balance');
			var iconImg = document.getElementById('nitro_payment_dialog_points_balance_pc');//!!! nitro_payment_dialog_points_icon
			balanceDiv.innerHTML = this.addCommas(balance);
			if (iconUrl && iconUrl.length > 0) {
				if(iconUrl.indexOf("swf") != -1) {
	
					var params = {
						base:				iconUrl.substr(0,iconUrl.lastIndexOf('/')),
						wmode:				"transparent",
						allowscriptaccess:	"always",
						allownetworking:	"all"	
					};
					
					var attributes = {
						id:					"nitro_payment_dialog_points_icon_swf",
						name:				"nitro_payment_dialog_points_icon_swf",
						style:				"background:#F0F0F0"
					};
					iconImg.innerHTML = "";
					nitroWidget.embedSWF(iconUrl, "nitro_payment_dialog_points_balance_pc", 20, 20, {}, params, attributes);
				}else {
					iconImg.innerHTML = "<img src='" + iconUrl + "' width='20' height='20' vertical-align='bottom'>";
				}
			}
		}
		this.showConfirmPaymentFrame = function() {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			this.addClass(backgroundFrame,'nitro_payment_dialog_container_small');			
			backgroundFrame.innerHTML = "<div style='margin-top:50px;width:100%;text-align:center'>Welcome back! Click \"Continue\" once you've finished.</div>";
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_cancel_button" href="#" onclick="nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_cancel_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_cancel_button_hover\')" ></a>';			
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_continue_button" href="#" onclick="Nitro.reloadWidgets();nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_continue_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_continue_button_hover\')" ></a>';
			this.toggleBackgroundFrame(true);
			if(!backgroundFrame.innerHTML) {
				//fix for chrome
				setTimeout("nitro.showConfirmPaymentFrame()",500);
				return;
			}			
		}		
		this.closePaymentDialog = function() {
			if(this.checkPaymentsDialogStatusTimer != null) {	
				clearTimeout(this.checkPaymentsDialogStatusTimer);
				this.checkPaymentsDialogStatusTimer = null;
			}
			if(document.getElementById("nitro_payment_dialog_container")) {
				document.body.removeChild(document.getElementById("nitro_payment_dialog_container"));
				document.body.removeChild(document.getElementById("nitro_payment_dialog_background_frame"));
				var mask = document.getElementById("nitro_payment_dialog_mask");
				if (mask != null) {
					document.body.removeChild(mask);
				}
				if(typeof nitroToolbar != "undefined") {
					nitroToolbar.reset();
					nitroToolbar.drawerOpen['nitroToolbar_drawer_payments'] = false;				
				}
			}	
		}
		this.onPaymentClicked = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				this.removeClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				if (document.nitroPaymentOptions.po[i].checked) {
					// paypal/credit card
					if(document.nitroPaypalForm) {
						document.nitroPaypalForm.amount.value = document.nitroPaymentOptions.po[i].value.split("|")[1];	
						document.nitroPaypalForm.item_name.value = document.nitroPaymentOptions.po[i].value.split("|")[0] + ' ' + this.paymentDialogParams.pointCategory;
					}					
					this.addClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				}
			}
			this.removeClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');				
			this.removeClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');
		}
		this.resetPaymentOptions = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				document.nitroPaymentOptions.po[i].checked = false;
				this.removeClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				document.getElementById('nitro_tr_po_'+i).style.visibility = 'visible';
				if(this.hidablePaymentOptions['nitro_tr_po_'+i] && this.selectedPaymentMethod=='boku') {
					document.getElementById('nitro_tr_po_'+i).style.visibility = 'hidden';
				}
			}
		}
		this.getBokuFrame = function(img, price, desc) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<br><br><br><center><h3>Loading...</h3></center>";

			params = "method=user.payments.status&image=" + escape(img) + "&description=" + escape(desc) + "&price=" + price + "&forceNewBuyButton=true" + (typeof nitroToolbar != "undefined" && nitroToolbar.args.siteId ? '&toolbarSiteId='+nitroToolbar.args.siteId+'&affl='+nitroToolbar.args.siteId : '');
			this.callAPI(params,'nitro.setBokuFrame');
		}
		this.setBokuFrame = function(data, token) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<iframe id='nitro_payment_dialog_background_iframe' src='" + data.Nitro.paymentMethods.Boku.buyButton + "'></iframe>";
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_back_button" href="#" onclick="nitro.toggleBackgroundFrame()" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_back_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_back_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_terms_message">By clicking "Purchase" you agree to the <a href="'+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml" target="_blank">Bunchball Virtual Goods Terms of Service</a></p> \
										<div onclick="window.open(\''+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml\')" class="nitro_payment_dialog_poweredby">&nbsp;</div>';
		}
		Nitro.closeNotification = function(elem) {
			if(elem == null) return;
			if(elem.parentNode.className == 'nitro_notices')
				elem.parentNode.removeChild(elem);
			else
				Nitro.closeNotification(elem.parentNode);
		}
		
		var checkPaymentsDialogStatusTimer = null;
		Nitro.checkPaymentsDialogStatus = function(data, token) {

			var instance = Nitro.getInstanceForCounter(0);			
			if(data == null) {
				if(instance.checkPaymentsDialogStatusTimer == null) 
					instance.checkPaymentsDialogStatusTimer = setTimeout("Nitro.callAPI('method=user.payments.status','Nitro.checkPaymentsDialogStatus',0)",2500);
				return;
			}

			if(data.Nitro.paymentMethods.Boku.status == 'success') {
				instance.showConfirmPaymentFrame();
			}else if(data.Nitro.paymentMethods.Boku.status == 'failure') {
				instance.showConfirmPaymentFrame();
			}else {
				instance.checkPaymentsDialogStatusTimer = setTimeout("Nitro.callAPI('method=user.payments.status','Nitro.checkPaymentsDialogStatus',0)",2000);
			}
		}
		
		this.injectPaymentsDialogContent = function(button,content) {
			if(button != null) {
				var elems = this.getElementForClass('nitro_payment_dialog_method');
				for(var i = 0; i < elems.length; i++) {
					this.removeClass(elems[i],'nitro_payment_dialog_method_active');
				}
				this.addClass(button,'nitro_payment_dialog_method_active');

				var div = document.getElementById('nitro_payments_dialog_method_content');
				div.innerHTML = content;
				if(button.id == "nitro_surveyMethodButton") {
					this.removeClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');				
					this.addClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');
				}else {
					this.removeClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');
					this.addClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');				
				}					
			}
			this.resetPaymentOptions();
			
		}
		
		this.showBokuFrame = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				if (document.nitroPaymentOptions.po[i].checked) {
					var img = this.paymentOptions.paymentProductUrl;
					var price = document.nitroPaymentOptions.po[i].value.split("|")[1];
					var desc = document.nitroPaymentOptions.po[i].value.split("|")[0] + ' ' + this.paymentDialogParams.pointCategory;
					this.getBokuFrame(img, price, desc);
					break;
				}
			}
			this.toggleBackgroundFrame(true);
		}
		this.showOfferpalFrame = function() {			
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<iframe id='nitro_payment_dialog_background_iframe_wide' src='" + this.paymentMethods.Offerpal.buyButton + (typeof nitroToolbar != "undefined" && nitroToolbar.args.siteId ? '&affl='+nitroToolbar.args.siteId : '') + "'></iframe>";
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_background_frame_title">Complete Surveys to Earn ' + this.paymentDialogParams.pointCategory + '</p>';
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_back_button" style="right:35px" href="#" onclick="nitro.toggleBackgroundFrame()" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_back_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_back_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_cancel_button" href="#" onclick="Nitro.reloadWidgets();nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_cancel_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_cancel_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_terms_message">By clicking "Purchase" you agree to the <a href="'+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml" target="_blank">Bunchball Virtual Goods Terms of Service</a></p> \
										<div onclick="window.open(\''+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml\')" class="nitro_payment_dialog_poweredby">&nbsp;</div>';

			this.toggleBackgroundFrame(true);
		}
		
		this.toggleBackgroundFrame = function(show) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			var light = document.getElementById('nitro_payment_dialog_container');
			if(show) {
				backgroundFrame.style.display = "block";
				light.style.display = "none";
			}else {
				backgroundFrame.style.display = "none";
				light.style.display = "block";
			}
		}
		
		this.addCommas = function(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}
		
		this.showPaymentDialogWithOptions = function(data) {
			
			var optionsHTML = "";
			var amountHTML = "";
			var methodsHTML = "";
			var itemHTML = "";
			this.paymentOptions = data.Nitro.paymentOptions;
			this.paymentMethods = data.Nitro.paymentMethods;
			var optionsArray = this.makeArray(data.Nitro.paymentOptions.PaymentOption);
			var numOptions = 0;
			var numMethods = 0;
			if (optionsArray != null) {
				numOptions = optionsArray.length;
				optionsHTML = "<table class='nitro_payment_dialog_options_table' cellspacing=0 cellpadding=0><tr><th style='width:30px'>&nbsp;</th><th style='width:90px'>Price</th><th>Package</th></tr>\n";
				for (var i = 0; i < optionsArray.length; i++) {
					var cost = parseFloat(optionsArray[i].cost).toFixed(2);
					if(cost > 29.99) {
						if(!this.hidablePaymentOptions)
							this.hidablePaymentOptions = [];
						this.hidablePaymentOptions["nitro_tr_po_"+i] = true;
					}
					optionsHTML+= '<tr id="nitro_tr_po_'+i+'" onclick="this.childNodes[0].childNodes[0].checked=true;nitro.onPaymentClicked()" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_selected_field_hover\')" onmouseover="if(!this.childNodes[0].childNodes[0].checked) nitro.addClass(this,\'nitro_payment_dialog_selected_field_hover\')" >' +
									'<td style="border:0px"><input class="nitro_payment_dialog_choice" type="radio" name="po" id="nitro_po_'+i+'" value="' + optionsArray[i].quantity + '|' + cost + '" onClick="nitro.onPaymentClicked()" ' + '></td>' + 
									'<td>$' + cost + '</td>' +
									'<td>' + nitro.addCommas(optionsArray[i].quantity) + ' ' + this.paymentDialogParams.pointCategory + '</td>' +
								  '</tr>\n';
				}
				optionsHTML+= "</table>\n";
				if (optionsArray.length > 0) {
					var cost = parseFloat(optionsArray[0].cost).toFixed(2);					
					amountHTML = '<input type="hidden" name="amount" value="' + cost  + '">';
					itemHTML = '<input type="hidden" name="item_name" value="' + optionsArray[0].quantity + ' ' + this.paymentDialogParams.pointCategory + '">';	
				}
			}
	
			var error = false;
			if (optionsHTML == "") {
				optionsHTML = "No payment options configured in the Admin UI or invalid pointCategory.";
				error = true;
			}
			var paymentMessage = "Buy points";
			if (typeof data.Nitro.paymentOptions.paymentMessage != "undefined" && data.Nitro.paymentOptions.paymentMessage != "") {
				paymentMessage = data.Nitro.paymentOptions.paymentMessage;	
			}		
			var imageUrl = "";
			if (typeof data.Nitro.paymentOptions.paymentLogoUrl != "undefined" && data.Nitro.paymentOptions.paymentLogoUrl != "") {
				imageUrl = '<input type="hidden" name="image_url" value="' + data.Nitro.paymentOptions.paymentLogoUrl + '">';
			}
			if (this.paymentDialogParams.logoUrl != null && this.paymentDialogParams.logoUrl != "") {
				imageUrl = '<input type="hidden" name="image_url" value="' + this.paymentDialogParams.logoUrl + '">';	
			}
			var returnUrl = "";
			if (this.paymentDialogParams.returnUrl != null && this.paymentDialogParams.returnUrl != "") {
				returnUrl = '<input type="hidden" name="return" value="' + this.paymentDialogParams.returnUrl + '">';	
			}
			var cancelReturnUrl = "";
			if (this.paymentDialogParams.cancelReturnUrl != null && this.paymentDialogParams.cancelReturnUrl != "") {
				cancelReturnUrl = '<input type="hidden" name="cancel_return" value="' + this.paymentDialogParams.cancelReturnUrl + '">';	
			}
			var returnButtonText = "";
			if (this.paymentDialogParams.returnButtonText != null && this.paymentDialogParams.returnButtonText != "") {
				returnButtonText = '<input type="hidden" name="cbt" value="' + this.paymentDialogParams.returnButtonText + '">';	
			}
			
			var onPaypalClick = "nitroPaypalForm.submit();nitro.showConfirmPaymentFrame()";
			if (this.paymentDialogParams.paymentWindowTarget == "_self" || this.paymentDialogParams.paymentWindowTarget == "_top") {
				onPaypalClick = "nitroPaypalForm.submit();";	
			}						
									
			var ipn_url = this.connectionParams.server;
			ipn_url = ipn_url.substring(0, ipn_url.indexOf('/json')) + '/premiumCreditProcessor';
			var paypalServer = "https://www.paypal.com/cgi-bin/webscr";
			var pixelUrl = "https://www.paypal.com/en_US/i/scr/pixel.gif";
			var businessId = "S5GDMZW4PTLPQ";
			
			var testing = 0;
			if (testing) {
				paypalServer = "https://www.sandbox.paypal.com/cgi-bin/webscr";
				pixelUrl = "https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif";
				businessId = "UWWDCGQCS7CE8";
			}
			
			var paypal_content = "<div style=\\\'margin:0px 5px 5px 10px\\\'>" + 
									"<img style=\\\'margin-right:5px\\\' src=\\\'"+nitroProtocol+"://assets.bunchball.net/widgets/payments/" + nitroLibsVersion + "/Padlock.png\\\'>" +
									"<span>Step 3: Checkout with PayPal</span>" +
								"</div>" +
				'<form name="nitroPaypalForm" action="' + paypalServer + '" method="post" target="' + this.paymentDialogParams.paymentWindowTarget + '"> \
				<input type="hidden" name="cmd" value="_xclick"> \
				<input type="hidden" name="business" value="' + businessId + '"> \
				<input type="hidden" name="lc" value="US"> \
				<input type="hidden" name="button_subtype" value="products"> \
				<input type="hidden" name="no_note" value="1"> \
				<input type="hidden" name="no_shipping" value="1"> \
				<input type="hidden" name="currency_code" value="USD">' + 
				imageUrl + returnUrl + cancelReturnUrl + returnButtonText +
				'<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted"> \
				<input type="hidden" name="notify_url" value="' + ipn_url + '"> \
				<input type="hidden" name="quantity" value="1">' +
				amountHTML + itemHTML + 
				'<input type="hidden" name="custom" value="'+(typeof nitroToolbar != "undefined" && nitroToolbar.args.siteId ? 'toolbarSiteId='+nitroToolbar.args.siteId+'&affl='+nitroToolbar.args.siteId+'&' : '')+'apiKey=' + this.connectionParams.apiKey + '&userId=' + this.jsConnector.connectionParams.userId + '&pointCategory=' + this.paymentDialogParams.pointCategory + '">' +
				'<div style="font-weight:normal;padding:10px;">' +
					'<h4>Use your Paypal account to buy ' + this.paymentDialogParams.pointCategory + '!</h4>' +
					'When you click &quot;Next&quot; below, a new window will open to complete your order securely through PayPal.<br><br>' +
				'</div> ' +
				'<input type="button" class="nitro_payment_dialog_next_button" onclick="' + onPaypalClick + '" > \
				</form>';
			paypal_content = paypal_content.replace(/\"/g,"\\\'");
			
			var boku_content = "<div style=\\\'margin:0px 5px 5px 10px\\\'>" + 
									"<img style=\\\'margin-right:5px\\\' src=\\\'"+nitroProtocol+"://assets.bunchball.net/widgets/payments/" + nitroLibsVersion + "/Padlock.png\\\'>" +
									"<span>Step 3: Pay with Your Mobile Phone</span>" +
								"</div>" +
								'<div style=\\\'font-weight:normal;padding:10px;\\\'>' +
									'<h4>Use your Mobile Phone to buy ' + this.paymentDialogParams.pointCategory + '!</h4>' +
									'When you click &quot;Next&quot; below, a window will open to assist you with your secure order through Paymo.<br><br>' +
								'</div> ' +
								"<input type=\\\'button\\\' class=\\\'nitro_payment_dialog_next_button\\\' onclick=\\\'nitro.showBokuFrame()\\\' >";
			var cc_content = paypal_content;
			
			var offerpal_content = "<div style=\\\'margin:0px 5px 5px 10px\\\'>" + 
									"<span>Step 2: Earn "+this.paymentDialogParams.pointCategory+"</span>" +
								"</div>" +
								'<div style=\\\'font-weight:normal;padding:10px;\\\'>' +
									'<h4>Complete surveys and offers to earn ' + this.paymentDialogParams.pointCategory + '!</h4>' +
									'<span>When you click &quot;Next&quot; below, a window will open with surveys and offers you can complete.</span><br><br>' +
								'</div> ' +
								'<input type=\\\'button\\\' class=\\\'nitro_payment_dialog_next_button\\\' onclick=\\\'nitro.showOfferpalFrame()\\\' >';
											
			methodsHTML+= '<a class="nitro_payment_dialog_method" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_method_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_method_hover\')" id="nitro_paypalMethodButton" onclick="nitro.selectedPaymentMethod=\'cc\';nitro.injectPaymentsDialogContent(this,\'' + cc_content + '\')"><div>Credit Card / Paypal</div><img style="margin-top:5px" src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/CreditCards.png"><img src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/PayPalLogo.png"></a>\n';
			methodsHTML+= '<a class="nitro_payment_dialog_method" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_method_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_method_hover\')" id="nitro_bokuMethodButton" onclick="nitro.selectedPaymentMethod=\'boku\';nitro.injectPaymentsDialogContent(this,\'' + boku_content + '\');Nitro.checkPaymentsDialogStatus(null,null);"><div>Mobile Phone</div><img src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/BokuLogo.png"></a>\n';
			if(data.Nitro.paymentMethods.Offerpal) methodsHTML+= '<a class="nitro_payment_dialog_method" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_method_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_method_hover\')" id="nitro_surveyMethodButton" onclick="nitro.selectedPaymentMethod=\'offerpal\';nitro.injectPaymentsDialogContent(this,\'' + offerpal_content + '\')"><div>Earn '+this.paymentDialogParams.pointCategory+'</div><img src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/SurveyIcon.png"></a>\n';
			methodsHTML+= '<br style="clear:both">';
			
			var paymentDialogHTML = '<p class="nitro_payment_dialog_message">' + paymentMessage + '</p> \
									<div class="nitro_payment_dialog_account_balance"> \
										<span>Account Balance: </span> \
										<span id="nitro_payment_dialog_points_balance"></span> \
										<span id="nitro_payment_dialog_points_balance_pc">' + this.paymentDialogParams.pointCategory + '</span> \
									</div> \
									<div class="nitro_payment_dialog_step_full">' +
										'<div style="margin:5px 5px 5px 10px">' + 
											'<img style="margin-right:5px" src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/Padlock.png">' +
											'<span>Step 1: Select A Secure Payment Option...</span>' +
										'</div>\n' +
										methodsHTML + 			
									'</div>\n' + 
									'<br style="clear:both"/>' +
									'<form id="nitroPaymentOptions" name="nitroPaymentOptions" class="nitro_payment_dialog_form nitro_payment_dialog_step_half nitro_payment_dialog_obscured">' + 
										'<div style="margin:5px 5px 5px 27px">' + 
											'<span>Step 2: Choose a Package</span>' + 
										'</div>' + 
										optionsHTML +
									'</form> \
									<div class="nitro_payment_dialog_step_half nitro_payment_dialog_obscured" id="nitro_payments_dialog_method_content" style="float:left">' + 
									'</div>' +
									'<a class="nitro_payment_dialog_cancel_button" href="#" onclick="nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_cancel_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_cancel_button_hover\')" ></a> \
									<p class="nitro_payment_dialog_terms_message">By clicking "Purchase" you agree to the <a href="'+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml" target="_blank">Bunchball Virtual Goods Terms of Service</a></p> \
									<div onclick="window.open(\''+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml\')" class="nitro_payment_dialog_poweredby">&nbsp;</div>\
									<img alt="" border="0" src="' + pixelUrl + '" width="1" height="1"> \
								';
			if (error) {
					paymentDialogHTML = optionsHTML + '<button type="button" onclick="nitro.closePaymentDialog();">Cancel</button>';
			}
			var positioning = "fixed";
			var doMask = true;
			if (!window.XMLHttpRequest || document.compatMode == "BackCompat") {			
				// IE6 or quirks mode
				positioning = "absolute";
			}
			if (!window.XMLHttpRequest) {
				doMask = false;	
			}
			
			if (typeof this.paymentStylesWritten == "undefined" && this.paymentDialogParams.useDefaultStyle) {
				var width = 685;
				var height = 600;
				var bokuFrameWidth = 550;
				var bokuFrameHeight = 490;
				var offerpalFrameWidth = 640;
				var offerpalFrameHeight = 490;
				var width_small = 480;
				var height_small = 200;
				var browser=navigator.appName;

				this.paymentDialogStyles = ".nitro_payment_dialog_container * { \
											  margin: 0; padding: 0; font-family:Helvetica,Verdana; \
											} \
											.nitro_payment_dialog_container { \
											  top:350px; left:50%; margin-top: -" + (height / 2) + "px; height:" + height +"px; \
											  padding-top: 10px; padding-bottom: 10px; position: " + positioning + "; z-index: 1002; overflow: hidden; \
											  background: #dcd8d7 url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/MainWindow.png) no-repeat 0 0; \
											  border: 2px solid #9ea3a9; border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; \
											  border-color: #FFF #9ea3a9 #9ea3a9 #FFF; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? "padding-right: 0px; padding-left: 0px; width: " + (width) + "px;margin-left: -" + ((width) / 2) + "px;"  : "padding-right: 0px; padding-left: 20px; width: " + (width-20) + "px; margin-left: -" + ((width-20) / 2) + "px;" )+"\
											} \
											html>body .nitro_payment_dialog_container { \
											  width: " + (width-25) + "px; margin-left: -" + ((width-25) / 2) + "px; margin-top: -" + ((height-30) / 2) + "px; height:" + (height-30) +"px; \
											} \
											.nitro_payment_dialog_container_small * { \
											  margin: 0; padding: 0; font-family:Helvetica,Verdana; \
											} \
											.nitro_payment_dialog_container_small { \
											  top:30px; left:50%; width: " + width_small + "px; margin-left: -" + (width_small / 2) + "px; margin-top: -" + (height_small / 2) + "px; height:" + height_small +"px; \
											  padding-top: 10px; padding-right: 0px; padding-bottom: 10px; padding-left: 20px; position: " + positioning + "; z-index: 1002; overflow: auto; \
											  background: #dcd8d7 url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/MiniMessage_Window.png) no-repeat 0 0; \
											  border: 2px solid #9ea3a9; border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; \
											  border-color: #FFF #9ea3a9 #9ea3a9 #FFF; \
											} \
											html>body .nitro_payment_dialog_container_small { \
											  width: " + (width_small-25) + "px; margin-left: -" + ((width_small-25) / 2) + "px; margin-top: -" + ((height_small-30) / 2) + "px; height:" + (height_small-30) +"px; \
											  padding-top: 10px; padding-right: 0px; padding-bottom: 10px; padding-left: 20px; \
											} \
											.nitro_payment_dialog_container label { \
											  cursor: pointer; \
											} \
											.nitro_payment_dialog_next_button { \
											  width: 85px; height: 50px; border:0px; float:right; margin-right:15px; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/NextButton_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_next_button_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/NextButton_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_cancel_button { \
											  width:26px; height:30px; position:absolute; top:0px; right:0px; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/XButton_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_cancel_button_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/XButton_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_back_button { \
											  width:53px; height:27px; position:absolute; top:10px; right:10px; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/BackButton_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_back_button_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/BackButton_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_continue_button { \
											  width:121px; height:38px; position:absolute; bottom:50px; left:180px; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/ContinueButton_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_continue_button_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/ContinueButton_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_message { \
											  font-size: 20px; margin-top:3px; margin-bottom: 10px; font-weight: bold; width:100%; text-align: left; color: white; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? "margin-left:15px;" : "")+"\
											} \
											.nitro_payment_dialog_account_balance { \
											  position:relative; font-size: 16px; font-weight: bold; text-align:right; padding-right:16px; margin-top:0px; margin-bottom:10px; vertical-align:bottom;  \
											} \
											#nitro_payment_dialog_points_icon { \
											  position:relative; top:3px; height: 20px; width:20px; border:0px; float:left; \
											} \
											#nitro_payment_dialog_points_balance { \
											  font-size:14px; \
											} \
											#nitro_payment_dialog_points_balance_pc { \
											  font-size:14px; font-weight: normal; margin-left:5px; \
											} \
											#nitro_payment_dialog_background_frame { \
											} \
											.nitro_payment_dialog_background_frame_title { \
											  color: white; font-weight:bold; font-size:16px; position:absolute; top:15px; left:15px; \
											} \
											#nitro_payment_dialog_background_iframe { \
											  border: 0px; margin:35px 0px 0px 45px; \
											  height: " + bokuFrameHeight + "px; width: " + bokuFrameWidth + "px; \
											} \
											#nitro_payment_dialog_background_iframe_wide { \
											  border: 0px; overflow-x: hidden; overflow-y: auto; \
											  height: " + offerpalFrameHeight + "px; width: " + offerpalFrameWidth + "px; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? "margin:35px 0px 0px 20px; " : "margin:35px 0px 0px 0px; ")+"\
											} \
											.nitro_payment_dialog_form { \
											  padding-bottom: 20px; float:left; \
											} \
											.nitro_payment_dialog_options_table { \
											  width: 315px; border:0px; \
											} \
											.nitro_payment_dialog_options_table th, .nitro_payment_dialog_options_table td{ \
											  padding-top:5px; font-weight:bold; \
											} \
											html>body .nitro_payment_dialog_options_table td{ \
											  padding-bottom: 5px; \
											} \
											.nitro_payment_dialog_options_table td{ \
											  border-left:0px solid #CCCCCC; text-align:center; cursor:pointer; \
											} \
											#nitro_payments_dialog_method_content { \
											  padding:5px; \
											} \
											.nitro_payment_dialog_selected_field { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/SelectedField_Active.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_selected_field td{ \
											  border: 0px; \
											} \
											.nitro_payment_dialog_selected_field_hover { \
											  background:  url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/SelectedField_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_selected_field_hover td{ \
											  border: 0px; \
											} \
											.nitro_payment_dialog_step_full { \
											  display:block; padding: 0px; height:119px; float:left; font-weight:bold; margin-bottom:20px; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/StepBox_Long.png) no-repeat 0 0; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? 'margin-left:8px; width: 645px; ' : 'margin-left:-5px; width: 651px; ')+"\
											} \
											.nitro_payment_dialog_step_half { \
											  display:block; padding: 0px; height:244px; float:left; font-weight:bold; margin-right:5px; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/StepBox_Standard2.png) no-repeat 0 0; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? 'margin-left:10px; width: 310px;' : 'margin-left:5px; width: 317px;')+"\
											} \
											html>body .nitro_payment_dialog_step_half { \
												width: 310px;\
											}\
											.nitro_payment_dialog_method { \
											  display:block; padding: 0px; width: 130px; height:85px; text-align: center; float:left; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/PaymentTypeBox_Up.png) no-repeat 0 0; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? 'margin-left: 7%;' : 'margin-left: 10%;')+"\
											} \
											.nitro_payment_dialog_method_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/PaymentTypeBox_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_method_active { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/PaymentTypeBox_Active.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_method div { \
											  font-size:12px; font-weight:bold; margin-bottom: 5px; margin-top:5px; \
											} \
											.nitro_payment_dialog_method img { \
											  \
											} \
											.nitro_payment_dialog_choice { \
											  padding-bottom: 5px; padding-top: 5px; margin-left: 20px; color: red; \
											} \
											.nitro_payment_dialog_terms_message { \
											  position:absolute; bottom:5px; left:15px; cursor:pointer; font-size: 10px; \
											} \
											.nitro_payment_dialog_poweredby { \
											  height:24px; width:176px; position:absolute; bottom:0px; right:10px; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/BunchballLogo_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_obscured { \
											  filter: alpha(opacity='10'); opacity:.1; \
											} \
											html>body .nitro_payment_dialog_obscured { \
											} \
											.nitro_payment_dialog_obscured * { \
											  filter: alpha(opacity='10'); opacity:.1; \
											} \
				";

				var styleElement = document.createElement("div");
				styleElement.innerHTML = "<br><style>"+this.paymentDialogStyles+"</style>";				
				document.getElementsByTagName('head')[0].appendChild(styleElement);
				this.paymentStylesWritten = true;
			}								

			if (doMask) {
				var fade = document.createElement("div");
				fade.id = "nitro_payment_dialog_mask";
				fade.setAttribute("class", "nitro_payment_dialog_mask");
				fade.setAttribute("className", "nitro_payment_dialog_mask");
				if (this.paymentDialogParams.useDefaultStyle) {
					fade.style.position = positioning;
					fade.style.top = "0%";
					fade.style.left = "0%";
					fade.style.width = "100%";
					fade.style.height = "100%";	
					fade.style.backgroundColor = "black";	
					fade.style.zIndex = 1001;	
					fade.style.filter = 'alpha(opacity='+80+')';			
					fade.style.opacity = .8;	
				}
				document.body.appendChild(fade);
			}
			
			
			var backgroundFrame = document.createElement('div');
			backgroundFrame.id = "nitro_payment_dialog_background_frame";
			backgroundFrame.style.display = "none";
			backgroundFrame.setAttribute("class", "nitro_payment_dialog_container");
			backgroundFrame.setAttribute("className", "nitro_payment_dialog_container");	
			document.body.appendChild(backgroundFrame);
			
			var light = document.createElement("div");
			light.id = "nitro_payment_dialog_container";
			light.setAttribute("class", "nitro_payment_dialog_container");
			light.setAttribute("className", "nitro_payment_dialog_container");	
			light.innerHTML = paymentDialogHTML;
			document.body.appendChild(light);
			this.jsConnector.callAPI("method=user.getPointsBalance&pointCategory=" + this.paymentDialogParams.pointCategory, "Nitro.processPointsBalance", this.counterId, true);
		}
		
	
		this.showToolbar = function(plugins, args) {
			if(!args)
				var args = {};
		
			if(this.args) {
				for(var i in this.args) {
					if(!args[i])
						args[i] = this.args[i];
				}
			}
			args.plugins = [];
			for(var i in plugins) {
				if(!plugins[i].name)
					plugins[i].name = (plugins[i].type + (plugins[i].type == 'custom' ? i : ''));
				args.plugins[plugins[i].name.replace(/ /g,'_')] = plugins[i];
			}
			
			args.apiKey = this.connectionParams.apiKey;
			args.server = this.connectionParams.server.replace("/json", "/xml");
			args.ownerId = this.jsConnector.connectionParams.userId;
			args.userId = args.ownerId;
			args.viewerId = args.ownerId;
			args.nitroInstanceId=this.counterId;
			
			if (typeof this.connectionParams.timeStamp != "undefined") {
				args.timeStamp = this.connectionParams.timeStamp;
				args.signature = this.connectionParams.signature;
				args.sessionKey = this.connectionParams.sessionKey;
			}
			
			if (this.connectionParams.sessionKey == null && !this.connectionParams.noLogin) NitroJSConnector.toolbarArgs = args;
			else nitroToolbar.show(args);
		}
		
		Nitro.redirectTo = null;
		Nitro.redirectToAction = null;
		Nitro.redirectToUserId = null;
		this.handleRedirects = function() {
			var action = this.getUrlParameter('nitroAction');
			var userId = this.getUrlParameter('nitroUserId');
			Nitro.redirectTo = this.getUrlParameter('nitroRedirectTo');
			Nitro.redirectToAction = action;
			Nitro.redirectToUserId = userId;
			
			if(action) {
				if(!userId) {
					userId = this.connectionParams.userId;
				}
				
				//check if this redirect has happened before
				var actionAlreadyLogged = NitroCookies.readJSCookie('NITRO_ACTION-'+Nitro.redirectToAction+"|"+Nitro.redirectToUserId)
				
				if(actionAlreadyLogged) {
					Nitro.handleClientLogAction();
				}else {
					this.jsConnector.callAPI("method=user.clientLogAction&userId=" + userId + "&tags=" + action, "Nitro.handleClientLogAction", this.counterId, true);
				}
			}
		}
		Nitro.handleClientLogAction = function() {		
		
			//save the cookie that we have logged the action
			NitroCookies.createJSCookie('NITRO_ACTION-'+Nitro.redirectToAction+"|"+Nitro.redirectToUserId, true, 365);
		
			if(Nitro.redirectTo) {
				window.location = unescape(Nitro.redirectTo);
			}
		}
		
		this.getUrlParameter = function(name) {
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)";
		  var regex = new RegExp( regexS );
		  var results = regex.exec(window.location.href);
		  if(results == null)
			return null;
		  else
			return results[1];
		}
	}
	
	/**** Localization *****
	* This variable will be populated after Login takes place and a locale is requested
	*/
	Nitro.Localization = null;
	
	Nitro.getLocale = function() {
		if ( navigator ) {
			if ( navigator.language ) {
				return navigator.language;
			} else if ( navigator.browserLanguage ) {
				return navigator.browserLanguage;
			} else if ( navigator.systemLanguage ) {
				return navigator.systemLanguage;
			} else if ( navigator.userLanguage ) {
				return navigator.userLanguage;
			}
		}
	}

	Nitro.getLocalizationFile = function(locale) {
		if(typeof JSONscriptRequest == "undefined") {
			eval('setTimeout("Nitro.getLocalizationFile(\''+locale+'\')",50)');
			return;
		}
		var fullUrl = nitroProtocol+"://assets.bunchball.net/scripts/locale/"+nitroLibsVersion+"/"+locale+".properties";
		var obj=new JSONscriptRequest(fullUrl,true);     
		obj.buildScriptTag(); // Build the script tag     
		obj.addScriptTag(); // Execute (add) the script tag
	}
	
	Nitro.processLocalizationFile = function(data) {
		
		if(!Nitro.Localization)
			Nitro.Localization = [];
		
		var localeMap = eval(data);
		for (var name in localeMap) {
			var value = localeMap[name];
			Nitro.Localization[name] = value;
		}
	}	
	
	//for flash ease of use
	Nitro.getLocalizedString = function(name,prefix) {
		return name.nitroLocalize(prefix);
	}
	
	String.prototype.nitroLocalize = function(prefix){
		if(!prefix)
			var prefix = 'javascript';
			
		var s = Nitro.Localization[prefix+"."+this];
		if( !s ) return( "���" + this + "���" );
		for (var i = 1; i < arguments.length; i++) {
			s = s.replace("{" + i + "}", arguments[i]);
		}  
		return s;
	};
	
	if(typeof nitroLocale != "undefined")
		Nitro.getLocalizationFile(nitroLocale);
}