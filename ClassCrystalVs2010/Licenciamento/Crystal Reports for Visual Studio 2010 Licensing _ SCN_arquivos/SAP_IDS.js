this.wro_flag=!0;(function(){if(!jQuery.browser){var d,b;jQuery.uaMatch=function(a){a=a.toLowerCase();a=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}};d=jQuery.uaMatch(navigator.userAgent);b={};d.browser&&(b[d.browser]=!0,b.version=d.version);b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0);jQuery.browser=b;jQuery.sub=
function(){function a(b,c){return new a.fn.init(b,c)}jQuery.extend(!0,a,this);a.superclass=this;a.fn=a.prototype=this();a.fn.constructor=a;a.sub=this.sub;a.fn.init=function(d,c){c&&(c instanceof jQuery&&!(c instanceof a))&&(c=a(c));return jQuery.fn.init.call(this,d,c,b)};a.fn.init.prototype=a.fn;var b=a(document);return a}}})();(function(d){var e,i,l=1,f,g=this,j,k=g.postMessage&&!d.browser.opera;d.postMessage=function(b,a,c){a&&(b="string"===typeof b?b:d.param(b),c=c||parent,k?c.postMessage(b,a.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):a&&(c.location=a.replace(/#.*$/,"")+"#"+ +new Date+l++ +"\x26"+b))};d.receiveMessage=j=function(b,a,c){if(k)if(b&&(f&&j(),f=function(h){if("string"===typeof a&&h.origin!==a||d.isFunction(a)&&!1===a(h.origin))return!1;b(h)}),g.addEventListener)g[b?"addEventListener":"removeEventListener"]("message",
f,!1);else g[b?"attachEvent":"detachEvent"]("onmessage",f);else e&&clearInterval(e),e=null,b&&(e=setInterval(function(){var a=document.location.hash,c=/^#?\d+&/;a!==i&&c.test(a)&&(i=a,b({data:a.replace(c,"")}))},"number"===typeof a?a:"number"===typeof c?c:100))}})(jQuery);(function(g){g.cookie=function(h,b,a){if(1<arguments.length&&(!/Object/.test(Object.prototype.toString.call(b))||null===b||void 0===b)){a=g.extend({},a);if(null===b||void 0===b)a.expires=-1;if("number"===typeof a.expires){var d=a.expires,c=a.expires=new Date;c.setDate(c.getDate()+d)}b=String(b);return document.cookie=[encodeURIComponent(h),"\x3d",a.raw?b:encodeURIComponent(b),a.expires?"; expires\x3d"+a.expires.toUTCString():"",a.path?"; path\x3d"+a.path:"",a.domain?"; domain\x3d"+a.domain:"",a.secure?
"; secure":""].join("")}a=b||{};for(var d=a.raw?function(a){return a}:decodeURIComponent,c=document.cookie.split("; "),e=0,f;f=c[e]&&c[e].split("\x3d");e++)if(d(f[0])===h)return d(f[1]||"");return null}})(jQuery);void 0===this.jQuery&&alert("Error: jQuery not found.\nSAP_IDS.js requires jQuery to be included beforehand.");void 0===this.wro_flag&&(jQuery.getScript(idsHost+"/ui/resources/javascripts/postMessage-0.5.js"),jQuery.getScript(idsHost+"/ui/resources/javascripts/jquery.cookie.js"));"undefined"===typeof console&&(console={log:function(){}});
var idsParentOverlay=function(a){function p(){a.ids.overlay.isPopup()&&!a.ids.overlay.isIDSPage()&&parent.location.replace(location.href);a.ids.overlay.isPopup()||(a.ids.overlay.init(),a(document).delegate("a[rel^\x3dIDS_]","click",function(b){var c=this.rel?this.rel.replace("IDS_",""):void 0,f=this.href?this.href:void 0,h=this.name?this.name:void 0;(this.type?this.type:void 0)===a.ids.overlay.type.DROPDOWN?a.ids.overlay.show(f,c.toLowerCase(),h,void 0,a.ids.overlay.type.DROPDOWN,b.target):a.ids.overlay.show(f,
c.toLowerCase(),h);c.toLowerCase()!==a.ids.overlay.actions.LOGOUT&&b.preventDefault()}))}function w(a){function c(){a.contentWindow.postMessage('{"name":"clickjacking_protect_message"}',"*")}a.attachEvent?a.attachEvent("onload",function(){c()}):a.addEventListener("load",function(){c()},!1)}var g,i;a.ids=a.ids||{};a.ids.overlay=a.ids.overlay||{};$ids=a;a.ids.overlay.actions={REGISTER:"register",FORGOTPASSWORD:"forgotpassword",LOGIN:"login",LOGOUT:"logout"};a.ids.overlay.type={MODAL:"modal",DROPDOWN:"dropdown"};
a.ids.overlay.removePopup=function(){a("#ids_container").remove();"undefined"!=typeof a.ids.overlay.modal().resizer&&a(window).off("resize",a.ids.overlay.modal().resizer)};ids={removePopup:function(){a.ids.overlay.removePopup();a.ajax({type:"GET",cache:!1,url:g+"/ui/resources/javascripts/legacy_compatibility.js",data:{sp_id:g,method:"ids.removePopup"},dataType:"script"})}};a.ids.overlay.getScriptUrl=function(){var b="";a("script").each(function(){-1!==this.src.search(/SAP_IDS\.js(;jsessionid\=\S+)?(\?\S+)?(#\S+)?$/)&&
(b=this.src)});return b};a.ids.overlay.getHost=function(){function b(a){var b=a.indexOf("/",8);return a.substring(0,b).toLowerCase()}var c=a.ids.overlay.getScriptUrl();return g=c.match(/^https?\:/)?b(c):b(location.href)};g=a.ids.overlay.getHost();a.ids.overlay.isIDSPage=function(){return g===window.location.protocol+"//"+window.location.hostname};a.ids.overlay.isPopup=function(){return parent.location!==window.location};a.ids.overlay.getParameter=function(b){var c=document.createElement("a"),f=[a.ids.overlay.getScriptUrl(),
location.href],h;for(h in f){c.href=f[h];var j;c.search.match(/\?\S+\=\S*$/)?j=c.search.slice(1):c.hash.match(/\#\S+\=\S*$/)&&(j=c.hash.slice(1));if(j)for(var e=j.split("\x26"),d=0;d<e.length;d++){var k=e[d].split("\x3d");if(k[0]===b)return decodeURIComponent(k[1])||""}}};a.ids.overlay.init=function(b){i=a.extend({},a.ids.overlay.defaults,b);void 0!==a.ids.overlay.getParameter(i.autologin)&&!("true"===a.cookie(i.autoLoginCookieName)||"true"===window[i.autoLoginCookieName])&&jQuery.ajax({async:!0,
type:"GET",url:g+i.autoLoginCheckURI,cache:!1,data:null,dataType:"script",success:function(){a.cookie(i.autoLoginCookieName,"true",{path:"/"});window[i.autoLoginCookieName]="true"}});if(!a.ids.overlay.isPopup()){if((locale=a.ids.overlay.getParameter(i.locale))&&locale!=a.cookie(i.locale))a.ids.overlay.locale=locale,a.ajax({async:!1,type:"GET",cache:!1,url:g+i.setLocaleURI,complete:function(){a.cookie("locale",a.ids.overlay.locale,{path:"/"})},data:{locale:locale},dataType:"script"});b=(b=location.href.match(/[\?&;#]IDS\w*\=(\w*)/))?
b[1]:null;b&&a.ids.overlay.show(g+"/ids/activation?token\x3d"+b)}return this};a.ids.overlay.show=function(b,c,f,h,j,e){c&&(a.cookie(i.autoLoginCookieName,null,{path:"/"}),window[i.autoLoginCookieName]=null);var d="?sourceUrl\x3d"+encodeURIComponent(document.location.href)+"\x26targetUrl\x3d"+encodeURIComponent(b),k;f&&(d+="\x26spName\x3d"+encodeURIComponent(f));switch(c){case a.ids.overlay.actions.REGISTER:k=g+i.registerFormURI+d;break;case a.ids.overlay.actions.FORGOTPASSWORD:k=g+i.forgotPasswordFormURI+
d;break;case a.ids.overlay.actions.LOGIN:k=b}var m=k,q=function(){a.cookie("targetUrl",b,{path:"/"})};a.ajax({async:!1,type:"GET",cache:!1,url:g+i.setTargetURI,data:{targetUrl:b,isInOverlay:!0},dataType:"script",complete:function(){q&&q();e&&j===a.ids.overlay.type.DROPDOWN&&c===a.ids.overlay.actions.LOGIN?void 0===m?a.ids.overlay.dropdown().create(e,b):a.ids.overlay.dropdown().create(e,m):void 0===m?a.ids.overlay.modal().create(b,h):a.ids.overlay.modal().create(m)}});return this};a.ids.overlay.dropdown=
function(b){function c(){var b=k.offset().left,c=k.offset().top,f=parseInt(k.css("marginLeft"));parseInt(k.css("paddingLeft"));var h=parseInt(k.css("marginTop")),j=k.outerHeight(),g=k.outerWidth(),n=parseInt(d.css("maxWidth")),x=d.outerHeight();isNaN(n)&&(n=350);var l,o=k.offset().left,r=a(window).width()-k.offset().left-g;k.offset();l=g+o-n;var u=g+r-n,o=Math.min(g/2+r-n/2,g/2+o-n/2),r=Math.max(l,u,o);l=("bottomCenter"===i?0<u:"bottomCenter"===v?0<l:0<o)?"bottomCenter":0!==u&&u===r?i:0!==l&&l===
r?v:0!==o&&o===r?s:"bottomCenter";d.removeAttr("class").addClass(e+" animated "+l);switch(l){case i:d.css({top:Math.max(0,c+h+j+10)+"px",left:Math.max(0,b+f)+"px"}).addClass(m+"Bottom");break;case v:d.css({top:Math.max(0,c+h+j+10)+"px",left:Math.max(0,b+f+g-n)+"px"}).addClass(m+"Bottom");break;case s:d.css({top:Math.max(0,c+h+j+10)+"px",left:Math.max(0,b+f+(g-n)/2)+"px"}).addClass(m+"Bottom");break;case t:d.css({top:Math.max(0,c+h)+"px",left:Math.max(0,b+f-n-10)+"px"}).addClass(m+"Left");break;case p:d.css({top:Math.max(0,
c+h)+"px",left:Math.max(0,b+f+g+10)+"px"}).addClass(m+"Right");break;case y:d.css({top:Math.max(0,c+h+j/2-x/2)+"px",left:Math.max(0,b+f-n-10)+"px"}).addClass(m+"Left");break;case z:d.css({top:Math.max(0,c+h+j/2-x/2)+"px",left:Math.max(0,b+f+g+10)+"px"}).addClass(m+"Right")}}function f(){d=a("."+e);d.remove();a("html."+e+"Open").unbind("."+e+"Event").removeClass(e+"Open")}function h(b){try{var c=jQuery.parseJSON(b.data);switch(c.action){case "adjustHeight":a("#"+j.dropDownIframeName).height(c.height);
getPlacement();break;case "resize":a("#"+j.dropDownIframeName).height(c.height);getPlacement();break;case "remove":f();break;case "ready":a.postMessage('{"action":"init", "type": "'+a.ids.overlay.type.DROPDOWN+'"}',"*",l.contentWindow)}}catch(k){}}var j=a.extend({},a.ids.overlay.defaults,b),e="popModal",d,k,m="fadeIn",i="bottomLeft",s="bottomCenter",v="bottomRight",t="leftTop",y="leftCenter",p="rightTop",z="rightCenter",l;return{create:function(b,m){k=a(b);0===a("#ids-popup-css").length&&a("\x3clink /\x3e").attr({id:"ids-popup-css",
href:g+"/universalui/shared/stylesheets/idsPopup.css",rel:"stylesheet",type:"text/css"}).appendTo("head");a.receiveMessage(h);a("html."+e+"Open").unbind("."+e+"Event").removeClass(e+"Open");a("."+e).remove();var i=a('\x3cdiv class\x3d"'+e+' animated"\x3e\x3c/div\x3e'),s=a('\x3cdiv class\x3d"'+e+'_content"\x3e\x3c/div\x3e');i.append(s);var q=m+"#"+encodeURIComponent(document.location.href);try{l=document.createElement('\x3ciframe name\x3d"'+q+'"\x3e')}catch(v){l=document.createElement("iframe"),l.name=
q}l.id=j.dropDownIframeName;l.src=q;l.width="100%";l.frameBorder="0";l.scrolling="no";w(l);s.append(l);a("body").append(i);d=a("."+e);c();a("html").bind("click."+e+"Event",function(b){a(this).addClass(e+"Open");d.is(":hidden")&&f();var c=a(b.target);!c.parents().andSelf().is("."+e)&&!c.parents().andSelf().is(k)&&(b=parseInt(c.parents().filter(function(){return"auto"!==a(this).css("zIndex")}).first().css("zIndex")),isNaN(b)&&(b=0),c=c.css("zIndex"),"auto"===c&&(c=0),b<c&&(b=c),b<=d.css("zIndex")&&
f())});a(window).resize(function(){c()});a("html").bind("keydown."+e+"Event",function(a){27===a.keyCode&&f()})}}};a.ids.overlay.modal=function(b){function c(b){try{var c=jQuery.parseJSON(b.data);this.iframeURL=c.iframeURL;switch(c.action){case "resize":var g=c.height;a("#"+h.modalIframeName).css("height",g);d();break;case "scroll":var j=c.x,i=c.y,t=a("#"+h.modalIframeName).offset();-1===i&&(t.top=1);window.scrollTo(t.left+j,t.top+i);break;case "remove":e();break;case "adjustHeight":var p=c.height;
a("#"+h.modalIframeName).css("height",p);f();break;case "focusIframe":a("#"+h.modalIframeName).focus();break;case "ready":a.postMessage('{"action":"init", "type": "'+a.ids.overlay.type.MODAL+'"}',"*",iframe.contentWindow)}}catch(w){}}function f(){var c=a("#"+h.modalIframeName);if(0!==c.length){var b=a("#ids_wrap");b.length&&screen.width>=c.width()&&(window.innerHeight>c.offset().top+c.height()?b.addClass("ids-wrap--fixed"):b.removeClass("ids-wrap--fixed"))}}var h=a.extend({},a.ids.overlay.defaults,
b),j=f,e=a.ids.overlay.removePopup,d=function(){"hidden"===a("div.ids-wrap").css("visibility")&&(a("div.ids-wrap").css("visibility","visible"),a.postMessage&&0<a("#"+h.modalIframeName).length&&(iframe=a("#"+h.modalIframeName)[0],a.postMessage('{"action":"requestHeight"}',this.iframeURL,iframe.contentWindow),f(),document.activeElement.blur()))};return{create:function(b,f){a.receiveMessage(c);b&&!b.match(/^https?\:/)&&(b=g+location.pathname+b);var e=f?f:b,d=a("#ids_container");0===d.length?d=a("\x3cdiv /\x3e",
{id:"ids_container",style:"text-align: left"}).appendTo("body"):d.empty();0===a("#ids_css").length&&a("\x3clink /\x3e").attr({id:"ids_css",href:g+"/universalui/shared/stylesheets/ids-overlay.css",rel:"stylesheet",type:"text/css"}).appendTo("head");d.append(a("\x3cdiv /\x3e",{"class":"ids-overlay"}));d=a("\x3cdiv /\x3e",{"class":"ids-wrap",height:"0",id:"ids_wrap",style:"visibility:hidden"}).appendTo(d);d=a("\x3cdiv /\x3e",{"class":"ids-overlay-container",id:"ids_overlay_container",role:"dialog"}).appendTo(d);
e='\x3ciframe name\x3d"'+b+"#"+encodeURIComponent(document.location.href)+'" src\x3d"'+e+'" id\x3d"'+h.modalIframeName+'" width\x3d"100%" height\x3d"0" margintop\x3d"0" marginleft\x3d"0" frameborder\x3d"0" scrolling\x3d"no" allowTransparancy\x3d"true"\x3e\x3c/iframe\x3e';d.html(d.html()+e);e=d.find("#"+h.modalIframeName);w(e[0]);a(window).resize(j)},close:e,resizer:j}};a.ids.overlay.defaults={modalWidth:720,modalHeight:300,modalIframeName:"IDS_UI_Window",dropDownIframeName:"IDS_UI_Dropdown_window",
setLocaleURI:"/ui/public/setLocale",setTargetURI:"/ui/public/setTargetUrl",registerFormURI:"/ui/public/showRegisterForm",forgotPasswordFormURI:"/ui/createForgottenPasswordMail",autoLoginCheckURI:"/ids/autologinCheck",autoLoginCookieName:"IDS_autoLoginChecked",locale:"locale",autologin:"autologin"};a.ids.overlay.hidden=function(b){var c=a.extend({},a.ids.overlay.defaults,b);return{create:function(b){a("body").append(a('\x3ciframe name\x3d"'+c.modalIframeName+'_passive" /\x3e').attr({id:c.modalIframeName+
"_passive",src:b,style:"visibility: hidden"}));return this}}};a(document).ready(function(){p()});return{ready:p,manualInit:function(b){var c=!1;a.ids.overlay.isPopup()||(a.ids.overlay.init(b),c=!0);return c},showOverlay:function(b,c,f,h,g){var e=!1;a.ids.overlay.isPopup()||(g=document.getElementById(g),h===a.ids.overlay.type.DROPDOWN&&g?a.ids.overlay.show(b,c.toLowerCase(),f,void 0,a.ids.overlay.type.DROPDOWN,g):a.ids.overlay.show(b,c.toLowerCase(),f),e=!0);return e}}}(jQuery);