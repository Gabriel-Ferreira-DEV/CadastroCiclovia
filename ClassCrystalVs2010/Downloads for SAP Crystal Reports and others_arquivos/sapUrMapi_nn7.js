
//** GlobalVariables.nn7 **

var bSkipCtrlState  = false;
var bSkipAltState   = false;
var iSkipStartKey     = 66;
var iSkipEndKey       = 90;
var sapUrDomainRelaxing = {NONE:"NONE",MINIMAL:"MINIMAL",MAXIMAL:"MAXIMAL"};
try {ur_system==null;} catch(e) {ur_system = {doc : window.document , stylepath : document.location.pathname.substring(0,document.location.pathname.substring(1).indexOf("/")+1)+"/resources/style/", is508 : true, domainrelaxing:sapUrDomainRelaxing.MINIMAL, dateformat:1, firstdayofweek:0};}
try {ur_language==null;} catch(e) {ur_language="en"};
ur_txt=new Array();
ur_system.browser_abbrev = "nn7";
if(ur_system.mimepath==null) ur_system.mimepath = ur_system.stylepath+"common/";
if(ur_system.emptyhoverurl==null) ur_system.emptyhoverurl = ur_system.mimepath+"emptyhover.html";
ur_KEYS = {TAB:9,ESCAPE:27,
           UP:38,DOWN:40,LEFT:37,RIGHT:39,
           BEGIN:36,END:35,PAGE_UP:33,PAGE_DOWN:34,POS1:36,
           BACKSPACE:8,DELETE:46,ENTER:13,SPACE:32,INSERT:45,
           F4:115}

//** Abbrev.ie5 **

ur_ctmap={AX:"ActiveXContainer",AP:"AppletContainer",BRC:"BreadCrumb",B:"Button",BR:"ButtonRow",CP:"Caption",C:"CheckBox",CG:"CheckBoxGroup",CB:"ComboBox",CXP:"ContextualPanel",DT:"DataTip",DN:"DateNavigator",DRS:"DragSource",DDL:"DropDownListBox",DRT:"DropTarget",FU:"FileUpload",FL:"FlowLayout",FOC:"FocusRect",FRA:"FreeArea",GTBV:"GenericTableView",GM:"GeoMap",GL:"GridLayout",G:"Group",HD:"HorizontalDivider",IF:"Iframe",IMG:"Image",I:"InputField",IT:"InputTokenizer",ITL:"InputTokenList",INV:"Invisible",IL:"ItemList",ILB:"ItemListBox",	L:"Label",LEG:"Legend",LEGDI:"LegendDateNavigatorItem",LEGTI:"LegendTableItem",LN:"Link",LB:"ListBox",LA:"LoadingAnimation",ML:"MatrixLayout",MNB:"MenuBar",MB:"MessageBar",NL:"NavigationList",PH:"ViewSwitch",PG:"Paginator",PC:"PatternContainerContentItem",PCI:"PatternContainerIconButton",PCSEQ:"PatternContainerSequence",PCTAB:"PatternContainerTab",PCTIT:"PatternContainerTitle",PHI:"PhaseIndicator",PI:"PopIn",POMN:"PopupMenu",POTRG:"PopupTrigger",PRI:"ProgressIndicator",R:"RadioButton",RG:"RadioButtonGroup",RL:"RasterLayout",RI:"RatingIndicator",RM:"RoadMap",ST:"SapTable",STC:"SapTableCell",STDB:"SapTableDefaultBody",STHC:"SapTableHeaderCell",STHIC:"SapTableHierarchicalCell",STR:"SapTableRow",STSB:"SapTableScrollingBody",STSC:"SapTableSelectionCell",SC:"ScrollContainer",SLB:"SelectableLinkBar",SL:"SingleColumnLayout",TBV:"TableView",TS:"TabStrip",TSITM:"Tabstrip Item",TXB:"TextBar",TE:"TextEdit",TV:"TextView",TGL:"ToggleLink",T:"Toolbar",TB:"ToolbarButton",TCB:"ToolbarComboBox",TDDL:"ToolbarDropDownListBox",TI:"ToolbarInputField",TLN:"ToolbarLink",TSEP:"ToolbarSeparator",TY:"Tray",TR:"Tree",TRI:"TriStateCheckBox",BS:"UrBase",VC:"ValueComparison",VS:"ViewSwitch"};
ur_st={SUCCESS:"a",ERROR:"b",COMPLETED:"c",DESELECTABLE:"D",DISABLED:"d",END:"e",INVALID:"i",REQUIRED:"m",NOTSELECTED:"n",UNCOMPLETED:"o",READONLY:"r",SELECTABLE:"6",SELECTED:"s",UNDEFINED:"u",WARNING:"w",MINIMIZED:"z",START:"1",EXPANDED:"+",COLLAPSED:"-",SORTEDASC:"2",SORTEDDESC:"3",NOTSORTED:"4",DYNAMIC:"y"};

//** GlobalFunctions.nn6 **

function sapUrMapi_checkKey(e,eType,arrKeys) {
	if (e.type==eType) {
		for (var i=0;i<arrKeys.length;i++) {
			if (e.which==parseInt(arrKeys[i])) {
				e.returnValue=false;
				return true;
			}
		}
	}
	return false;
}
var ur_context={suppressFocus:false};
function sapUrMapi_suppressFocus(){
	ur_context.suppressFocus=true;
}
function sapUrMapi_triggerFocus(sId) {
  ur_callDelayed("sapUrMapi_focusElement('"+sId+"')",0);
}
function ur_focus(o) {
	if (!ur_context.suppressFocus) {
		try {o.focus();} 
		catch (ex){}
	} else {
		ur_context.suppressFocus=false;
	}
}
function sapUrMapi_focusElement(sId) {
	if(sId == "") return;
	oElem = document.getElementById(sId);
	if (oElem!=null) {
		try{
		    oElem.focus();
		}
		catch (e){
			
			
		}
	}
}
function sapUrMapi_refocusElement(sId){};
function sapUrMapi_setTabIndex(oElem,iVal) {
  oElem.setAttribute("tabindex",iVal);
  oElem.setAttribute("ti",iVal);
}
function sapUrMapi_getAbsolutePosition (obj) {
  var position = { top: 0, left: 0, right: 0};  
	var obj2=obj;
	while (obj && obj.tagName!="BODY") {
	  try { 
	    var s=document.defaultView.getComputedStyle(obj,"");
			if (s.getPropertyValue("overflow")!="visible") {
				position.left-=obj.scrollLeft;
				position.top-=obj.scrollTop;
			}
	  } catch(ex) {}
	  if (obj==obj2) {
	    position.left += obj.offsetLeft;
	    position.top  += obj.offsetTop;
		  obj2=obj.offsetParent;
	  }
	  obj = obj.parentNode;
	}
  return position;
}
function sapUrMapi_isChildOfControl(oObj,sControlType) {
  while (oObj.tagName!="BODY") {
    if (sapUrMapi_getControlTypeFromObject(oObj)==sControlType) return oObj;
    oObj=oObj.parentNode;
  }
  return null;
}
function sapUrMapi_getControlTypeFromObject(o) {
	try {
	  var sControlType="";
	  while (o.getAttribute("ct")==null) {
	    if (o.tagName=="BODY") return "";
	    o=o.parentNode;
	  }
	  return o.getAttribute("ct");
	} catch (ex) {return ""};
}
function sapUrMapi_getControlType(sId) {
	try {
	  aId=sId.split("-");
	  return document.getElementById(aId[0]).getAttribute("ct");
	} catch (ex) {return ""};
}
try{
  document.createElement('span');
  HTMLElement.prototype.click = function(){
  if(typeof this.onclick=='function')
    this.onclick({type: 'click'});
  }
}
  catch(exception){
}
function sapUrMapi_triggerClick(e,arrKeys)
{
  if(sapUrMapi_checkKey(e,"keydown",arrKeys) || sapUrMapi_checkKey(e,"keypress",arrKeys)){
    try{
      e.target.click();
    }
    catch(ex){};
  }
}
function sapUrMapi_cancelEvent(e,ePrime){
	if (ePrime) 
		e = ePrime;
	e.stopPropagation();
	e.preventDefault();
	return false;
}
function ur_cancelBubble(oEvt){
	oEvt.stopPropagation();
}
function sapUrMapi_skip(sId,oEvt) {	}
function sapUrMapi_skipElement(sId,oEvent,bJumpToBegin) {
	iKey    = oEvent.keyCode;
	bAlt    = oEvent.altKey;
	bCtrl   = oEvent.ctrlKey;
	if ((bSkipCtrlState==bCtrl) && (bSkipAltState == bAlt) && (sSkipKey==String.fromCharCode(iKey))) {
		if (bJumpToBegin) {
		  document.getElementById(sId+"-skipstart").focus();
	  } else {
		  document.getElementById(sId+"-skipend").focus();
	  }
	}
}
function getLanguageText(sMain,arrChildTxt) {
	 var s;
	 try {
	 	s= ur_txt[ur_language][sMain];
	 	for (var i=0;i<arrChildTxt.length;i++) {
	 		 if (ur_txt[ur_language][arrChildTxt[i]]) {
	 	  	 s= s.replace("{"+i+"}",ur_txt[ur_language][arrChildTxt[i]]);
	 	 	} else {
	 	  	 s= s.replace("{"+i+"}",arrChildTxt[i]);
	 	 	}
	 	}
	} catch(e) {
		s="";
	}
	 return s;
}
function ur_get(sId) {
  return document.getElementById(sId);
}
var ur_arr_FrameCollector = new Array();
function sapUrMapi_toggleIframes(inElement,bShow) {
  var arr = sapUrMapi_collectIFrames(inElement);
  for (var i=0;i<arr.length;i++) {
  	if (!bShow) {
  		if ((arr[i].getAttribute("oldheight")=="")||(!arr[i].getAttribute("oldheight"))) {
  			arr[i].setAttribute("oldheight",arr[i].offsetHeight);
  		}
  		if ((arr[i].getAttribute("hidelevel")=="")||(!arr[i].getAttribute("hidelevel"))) {
  		  arr[i].setAttribute("hidelevel",0);
  		}
  		arr[i].setAttribute("hidelevel",parseInt(arr[i].getAttribute("hidelevel"))+1);
 		  arr[i].style.height="0";
    } else {
  		if ((arr[i].getAttribute("hidelevel")=="")||(!arr[i].getAttribute("hidelevel"))) {
  		  arr[i].setAttribute("hidelevel",1);
  		}
  		arr[i].setAttribute("hidelevel",parseInt(arr[i].getAttribute("hidelevel"))-1);
  		if (arr[i].getAttribute("hidelevel")==0) {
	  		if ((arr[i].getAttribute("oldheight")!="")||(arr[i].getAttribute("oldheight"))) {
	  		  arr[i].style.height=arr[i].getAttribute("oldheight");
	  		}
	  	}
    }
  }
}
function sapUrMapi_collectIFrames(el) {
  ur_arr_FrameCollector = new Array();
  if (el.innerHTML.indexOf("iframe")>-1) {
    sapUrMapi_collectIFramesRec(el);
  }
  return ur_arr_FrameCollector;
}
function sapUrMapi_collectIFramesRec(el) {
	  if (el.childNodes) {
	    var i=0;
	    while ( i<el.childNodes.length ) {
	      var o=el.childNodes.item(i)
	      if (o.childNodes) sapUrMapi_collectIFramesRec(o);
	      if (o.tagName=="IFRAME") ur_arr_FrameCollector[ur_arr_FrameCollector.length]=o;
	      i++;
	    }
	  }
}
function sapUrMapi_scrollRight(elem)
{
  return 0;
}
function sapUrMapi_clientRight(elem)
{
  return 0;
}
function sapUrMapi_scrollBarWidth(elem)
{
  return 0;
}
function sapUrMapi_offsetRight(elem)
{
  return 0;
}
function sapUrMapi_clientXtoRight(docBody, e)
{
  return 0;
}
function sapUrMapi_posLeftCorrectionForRTL(elem)
{
  return 0;
}
function sapUr_Scroll_scrollToPosition(sId,x,y) {
	sapUrMapi_scrollToPosition(ur_get(sId),x,y);
}
function sapUrMapi_scrollToPosition(o,x,y) {
	o.scrollTop=y;
    o.scrollLeft=x;
}
function sapUrMapi_getScrollLeft(o) {
  return o.scrollLeft;
}
function sapUrMapi_getScrollTop(o) {
  return o.scrollTop;
}
function sapUr_Scroll_scrollLeft(sId) {
	return ur_get(sId).scrollLeft;
 
}
function sapUr_Scroll_scrollRight(sId) {
	var o = ur_get(sId);
	return sapUrMapi_scrollRight(o);
}
function sapUr_Scroll_scrollTop(sId) {
	return ur_get(sId).scrollTop;
}
function ur_Scrl_setScrlPosById(sId,oPos)
{
	var obj = ur_get(sId);
	if(obj != null)
	{	
		sapUrMapi_scrollToPosition(obj,oPos.x,oPos.y)
	}
}
function ur_Scrl_getScrlPosById(sId)
{
	var obj = ur_get(sId);
	var oPos = new Object();
	if(obj != null)
	{	
		oPos.x = sapUrMapi_getScrollLeft(obj);
		oPos.y = sapUrMapi_getScrollTop(obj);
		return oPos;
	}
}
function sapUrMapi_initLinkStatus() {
  var oNodes = document.getElementsByTagName("A");
  for (var n=0;n<oNodes.length;n++) {
    if (oNodes[n].href.indexOf("javascript:void")>-1) {
      oNodes[n].onmouseover=sapUrMapi_resetStatus;
      oNodes[n].onfocus=sapUrMapi_resetStatus;
    }
  }
}
function sapUrMapi_resetStatus() {
  window.status="";
  
}
function sapUrMapi_Resize_Handler(sId, sHandler) {
	this.sId = sId;
	this.sHandler = sHandler;
}
var sapUrMapi_Resize_Registry = new Array();
var sapUrMapi_Resize_Width = null;
var sapUrMapi_Resize_Timeout = null;
var sapUrMapi_Resize_Set = false;
function sapUrMapi_Resize_Capture() {
	if (sapUrMapi_Resize_Set == false) {
		window.addEventListener("resize", sapUrMapi_Resize_CheckSize, false);
		sapUrMapi_Resize_Set = true;
	}
}
function sapUrMapi_Resize_AddItem(sId, sHandler) {
	
	sapUrMapi_Resize_Capture();
	
	if (!sapUrMapi_Resize_Registry[sId] || sapUrMapi_Resize_Registry[sId]) {
		sapUrMapi_Resize_Registry[sId] = new sapUrMapi_Resize_Handler(sId, sHandler);
	}
}
function sapUrMapi_Resize_CheckSize() {
	if (sapUrMapi_Resize_Timeout == null && sapUrMapi_Resize_Width == null) {
		sapUrMapi_Resize_Width = document.body.offsetWidth;
		sapUrMapi_Resize_Timeout = window.ur_callDelayed("sapUrMapi_Resize_CheckSize()", 50);
		return;
	}
	if (sapUrMapi_Resize_Width != document.body.offsetWidth) {
		sapUrMapi_Resize_Width = document.body.offsetWidth;
		sapUrMapi_Resize_Timeout = window.ur_callDelayed("sapUrMapi_Resize_CheckSize()", 50);
	}
	else {
	    window.clearTimeout(sapUrMapi_Resize_Timeout);
		sapUrMapi_Resize_Timeout = null;
		sapUrMapi_Resize_Resize();
		sapUrMapi_Resize_Width = null;
	}
}
function sapUrMapi_Resize_Resize() {
	for (var ctl in sapUrMapi_Resize_Registry) {
		if (ctl.indexOf("_") == 0) {continue;}
		if (sapUrMapi_Resize_Registry[ctl] != null) {
			eval(sapUrMapi_Resize_Registry[ctl].sHandler);
		}
	}
}
function sapUrMapi_Create_Handler(sId, sHandler) {
	this.sId = sId;
	this.sHandler = sHandler;
}
var sapUrMapi_Create_Registry = new Array();
var sapUrMapi_Create_Set = false;
var sapUrMapi_Create_Timeout = null;
var sapUrMapi_Create_Doc = "";
function sapUrMapi_Create_Capture() {
	if (sapUrMapi_Create_Set == false) {
		
		sapUrMapi_Create_Doc = document.body.innerHTML;
		sapUrMapi_Create_Timeout = window.ur_callDelayed("sapUrMapi_Create_CreateItems()", 150);
		sapUrMapi_Create_Set = true;
	}
}
function sapUrMapi_Create_AddItem(sId, sHandler) {
	
	sapUrMapi_Create_Capture();
	
	sapUrMapi_Create_Registry[sId] = new sapUrMapi_Create_Handler(sId, sHandler);
}
function sapUrMapi_Create_CreateItems() {
	
	var doc = document.body.innerHTML;
	if (doc != sapUrMapi_Create_Doc) {
		sapUrMapi_Create_Doc = doc;
		sapUrMapi_Create_Timeout = window.ur_callDelayed("sapUrMapi_Create_CreateItems()", 150);
	}
	else {
		window.clearTimeout(sapUrMapi_Create_Timeout);
		sapUrMapi_Create_Timeout = null;
		for (var ctl in sapUrMapi_Create_Registry) {
			if (ctl.indexOf("_") == 0) {continue;}
			if (sapUrMapi_Create_Registry[ctl] != null) {
				eval(sapUrMapi_Create_Registry[ctl].sHandler);
			}
		}
		sapUrMapi_Create_Registry = new Array();
	}
}
function sapUrMapi_init() {
  if (ur_system.mimepath == null)ur_system.mimepath = ur_system.stylepath.substring(0,ur_system.stylepath.indexOf("/ur"))+"/common/"; 
  if(typeof(ur_system.emptyhoverurl)=="undefined" || (typeof(ur_system.emptyhoverurl)=="string" && ur_system.emptyhoverurl.length==0))
    ur_system.emptyhoverurl = ur_system.mimepath+"emptyhover.html";      
  oPopup=null;
  oDatePicker=null;
  sapUrMapi_Resize_Registry=new Array();
  sapUrMapi_PcTabSeq_Registry = new Array();
   _ur_tables=new Array();
}
function ur_evtSrc(e){return e.target;}
function ur_get(sId) {
  return document.getElementById(sId);
}
function ur_isDisabled(o){
	var sSt=o.getAttribute("st");
	if(sSt.indexOf("d")!=-1) return true;
	else return false;
}
function ur_setDisabled(o,bOn){
	var sSt=o.getAttribute("st");
	if(bOn) {if(sSt.indexOf("d")==-1) o.setAttribute("st",sSt+"d");}
	else {if(sSt.indexOf("d")!=-1) o.setAttribute("st",sSt.replace("d",""));}
}
function ur_isInvalid(o){
	var sSt=o.getAttribute("st");
	if(sSt.indexOf("i")!=-1) return true;
	else return false;
}
function ur_setInvalid(o,bOn){
	var sSt=o.getAttribute("st");
	if(bOn) {if(sSt.indexOf("i")==-1) o.setAttribute("st",sSt+"i");}
	else {if(sSt.indexOf("i")!=-1) o.setAttribute("st",sSt.replace("i",""));}
}
function ur_isReadonly(o){
	var sSt=o.getAttribute("st");
	if(sSt.indexOf("r")!=-1) return true;
	else return false;
}
function ur_setReadonly(o,bOn){
	var sSt=o.getAttribute("st");
	if(bOn) {if(sSt.indexOf("r")==-1) o.setAttribute("st",sSt+"r");}
	else {if(sSt.indexOf("r")!=-1) o.setAttribute("st",sSt.replace("r",""));}
}
function ur_isRequired(o){
	var sSt=o.getAttribute("st");
	if(sSt.indexOf("m")!=-1) return true;
	else return false;
}
function ur_setRequired(o,bOn){
	var sSt=o.getAttribute("st");
	if(bOn) {if(sSt.indexOf("m")==-1) o.setAttribute("st",sS+"m");}
	else {if(sSt.indexOf("m")!=-1) o.setAttribute("st",sSt.replace("m",""));}
}
function ur_getStatusText(o){
	var sSt=o.getAttribute("st");
	var sStTxt="";
	if(sSt.indexOf("d")!=-1) sStTxt += getLanguageText("SAPUR_DISABLED")+" ";
	if(sSt.indexOf("i")!=-1) sStTxt += getLanguageText("SAPUR_INVALID")+" ";
	if(sSt.indexOf("r")!=-1) sStTxt += getLanguageText("SAPUR_READONLY")+" ";
	if(sSt.indexOf("m")!=-1) sStTxt += getLanguageText("SAPUR_REQUIRED");
	sStTxt.replace(/\s+/g," ");
	return sStTxt;
}
function ur_getTooltip(sId){
}
function sapUrMapi_cleanUp() {
  
}
function ur_getAttD(o,sAtt,def) {
  if (!o || !o.getAttribute) return def;
  var s=o.getAttribute(sAtt);
  if (s!=null && s!="") return s;
  else return def;
}
function ur_callDelayed(sFunc,ms) {
  return setTimeout("try{"+sFunc+"}catch(ex){}",ms);
}
//** Event.nn6 **

function ur_EVT_fire(o,sName,oEvt,hWnd) {
	var sFunc = o.getAttribute(sName); 
	if (sFunc && sFunc!="") {
		if (typeof(hWnd)=="undefined") hWnd=window; 
		if (typeof(oEvt)=="undefined") oEvt=hWnd.event;
		o.func=new hWnd.Function("event",sFunc); 
		return o.func(oEvt); 
	}
	return null;
}
function ur_EVT_src(oEvt) {
	return ur_EVT(oEvt).srcElement;
}
function ur_EVT_cancel(oEvt,oPrimeEvt){
	if (oPrimeEvt) oEvt = oPrimeEvt;
	try{oEvt.keyCode="";} catch(ex) {}; 
	oEvt.stopPropagation();
	oEvt.preventDefault();
	return true;
}
function ur_EVT_cancelBubble(oEvt){
	oEvt.stopPropagation();
}
function ur_EVT(oEvt) {
	oEvt["srcElement"]=oEvt.target.tagName?oEvt.target:oEvt.target.parentNode;
	oEvt["fromElement"]=oEvt.relatedTarget;
	oEvt["toElement"]=oEvt.currentTarget;
	return oEvt;
}

//** Button.nn6 **

function sapUrMapi_Button_checkClick(sId, oEvt) {
	if (document.getElementById(sId).disabled) return false;
	if (oEvt.type=="click") return true;
	return sapUrMapi_checkKey(oEvt,"keypress",new Array("32"))
}
function sapUrMapi_Button_setDisabled(sId) {
	var o = document.getElementById(sId);
	if (o.getAttribute("dsbl")=="true") return;
	var s  = o.className;
  var bEmph=false;
  var bSml=false;
  o.disabled=true;
  if (s.indexOf("Emph")>-1) bEmph=true;
	if (s.indexOf("Sml")>-1)  bSml =true;
	sN="urBtn";
	if (bSml) sN+="Sml";
	if (bEmph) sN+="Emph";
	if ((!bEmph)&&(!bSml)) sN+="Std";
	sN+="Dsbl";
	if (s.indexOf("urV")>-1) sN+=" urV";
	o.className=sN;
	o.setAttribute("dsbl","true");
	if (ur_system.is508) {
	  sOldTooltip = o.title.substring(o.title.lastIndexOf(" - ")+3);
		sText=o.title.substring(0,o.title.indexOf(" - "));
    o.title = getLanguageText("SAPUR_BUTTON",new Array(sText,"SAPUR_DISABLED",sOldTooltip));
	}
}
function sapUrMapi_Button_setEnabled(sId) {
	var o = document.getElementById(sId);
	var s  = o.className;
  var bEmph=false;
  var bSml=false;
	o.disabled=false;
	if (s.indexOf("Emph")>-1) bEmph=true;
	if (s.indexOf("Sml")>-1)  bSml =true;
	sN="urBtn";
	if (bSml) sN+="Sml";
	if (bEmph) sN+="Emph";
	if ((!bEmph)&&(!bSml)) sN+="Std";
	if (s.indexOf("urV")>-1) sN+=" urV";
	o.className=sN;
	o.setAttribute("dsbl","false");
	if (ur_system.is508) {
		var sOldTooltip = o.title.substring(o.title.lastIndexOf(" - ")+3);
		sText=o.title.substring(0,o.title.indexOf(" - "));
	  o.title = getLanguageText("SAPUR_BUTTON",new Array(sText,"SAPUR_BUTTON_ENABLED",sOldTooltip));
	}
}

//** BreadCrumb.nn6 **

function sapUrMapi_BreadCrumb_keydown(sId,oEvt){
}
function sapUrMapi_BreadCrumb_activate(sId,oEvt){
}
function sapUrMapi_BreadCrumb_deactivate(sId,oEvt){
}

//** CheckBox.nn6 **

function sapUrMapi_CheckBox_toggle(sId,e) {
  var oIn=ur_get(sId);
  if (oIn.disabled) return false;  
  var oImg=ur_get(sId+"-img");
	
  ur_focus(oIn);
  
	if (oImg.className.indexOf("Chk")<0){ 
		oIn.checked=true;
		oImg.className=oImg.className.replace("urImgCbgImg","urImgCbgImgChk");
	}
  
	else{
		oIn.checked=false;
		oImg.className=oImg.className.replace("urImgCbgImgChk","urImgCbgImg");   
	}
  return true;
}
function sapUrMapi_CheckBox_setDisabled(sId) {
  var oIn=ur_get(sId);
	var oImg=ur_get(sId+"-img");
	if (oIn.checked){ 
		if(oImg.className.indexOf("Dsbl")<0)
			oImg.className=oImg.className.replace("urImgCbgImgChk","urImgCbgImgChkDsbl");
	}
	else{
		if(oImg.className.indexOf("Dsbl")<0)
			oImg.className=oImg.className.replace("urImgCbgImg","urImgCbgImgDsbl");
	}
  oIn.disabled=true;	
	ur_setDisabled(oIn,true);
	sapUrMapi_Label_setDisabled(sapUrMapi_Label_getInputLabel(sId));
}
function sapUrMapi_CheckBox_setEnabled(sId) {
  var oIn=ur_get(sId);
	var oImg =ur_get(sId + "-img");
	if (oIn.checked) oImg.className=oImg.className.relace("urImgCbgImgChkDsbl","urImgCbgImgChk");
	else oImg.className=oImg.className.replace("urImgCbgImgDsbl","urImgCbgImg");
	oIn.disabled=false;
	ur_setDisabled(oIn,false);
	sapUrMapi_Label_setEnabled(sapUrMapi_Label_getInputLabel(sId));
}
function sapUrMapi_CheckBox_setReadonly(sId,bSet){
  var oIn=ur_get(sId);
	var oImg=ur_get(sId+"-img");
	if(bSet){
		if (oIn.checked){ 
			if(oImg.className.indexOf("Dsbl")<0)
				oImg.className=oImg.className.replace("urImgCbgImgChk","urImgCbgImgChkDsbl");
		}
		else{ 
			if(oImg.className.indexOf("Dsbl")<0)
				oImg.className=oImg.className.replace("urImgCbgImg","urImgCbgImgDsbl");
		}
		oIn.disabled=true;	
		ur_setReadonly(oIn,true);
	}
	else{
		if (oIn.checked) oImg.className=oImg.className.replace("urImgCbgImgChkDsbl","urImgCbgImgChk");
		else oImg.className=oImg.className.replace("urImgCbgImgDsbl","urImgCbgImg");
		oIn.disabled=false;	
		ur_setReadonly(oIn,false);	
	}
	sapUrMapi_Label_setEnabled(sapUrMapi_Label_getInputLabel(sId));
}
function sapUrMapi_CheckBox_focus(sId,oEvt) {
	sapUrMapi_DataTip_show(sId,"focus");
}
function sapUrMapi_CheckBox_blur(sId,oEvt) {
	sapUrMapi_DataTip_hide();
}
function sapUrMapi_CheckBox_keydown(sId,oEvt) {
}

//** ComboBox.nn6 **

function ur_ComboBox_fireBeforeListLoad(sId,sListId,oEvt){
	var o=sapUrMapi_ComboBox_getObject(sId);
  var sFunc=o.main.getAttribute("onbll");	
  if(o.txt.getAttribute("ll")) return;
   if(sFunc && sFunc.indexOf("UR_NotHandled")<0){
		o.main.fBefListLoad = new Function("event",sFunc);
		o.main.fBefListLoad(oEvt);
  }
  else return false;
  o.txt.setAttribute("ll",true);
  return true;
}
function sapUrMapi_ComboBox_getObject(sId) {
	var o=new Object();
	o.main=document.getElementById(sId+"-r");
	o.txt=document.getElementById(sId);
	o.btn=document.getElementById(sId+"-btn");
	o.isdd=o.txt.getAttribute("dd")=="true";
	o.isro=ur_isReadonly(o.txt);
	o.isdsbl=ur_isDisabled(o.txt);
	o.isinv=ur_isInvalid(o.txt);
	o.isreq=ur_isRequired(o.txt);	
	o.key=o.txt.getAttribute("k");
	o.vt=o.txt.getAttribute("vt")=="true";
	o.lid=o.txt.getAttribute("lid");
	o.open=o.txt.getAttribute("op")=="true";
	return o;
}
function sapUrMapi_ComboBox_registerCreate(sId,sListId,sWidth){
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_ComboBox_setWidth('"+sId+"','"+sListId+"','"+sWidth+"')");
}
function sapUrMapi_ComboBox_setWidth(sId,sListId,sWidth){
	if(sWidth!="") return;
   var o=ur_get(sId);
	var oL=ur_get(sListId+"-r");
	if(oL==null) return;
	sapUrMapi_ItemListBox_setDim( sListId, "10px" );
	
	var oL=ur_get(sListId+"-r");
	o.style.width=oL.offsetWidth;
}
function sapUrMapi_ComboBox_addClass(sId,sClass,bSetIt) {
  var o = sapUrMapi_ComboBox_getObject(sId);
	
	if (o.main.parentNode.className.indexOf("STTD")>=0){		 
	if (o.txt.className.indexOf(sClass)==-1 && bSetIt) {
		o.txt.className=o.txt.className+" "+sClass;
			o.main.className=o.main.className+" "+sClass;
		}
		else if(o.txt.className.indexOf(sClass)>=0 && !bSetIt){
			o.txt.className=o.txt.className.replace(" "+sClass,"");
			o.main.className=o.main.className.replace(" "+sClass,"");
		}
	}
	
	else{
		if (o.txt.className.indexOf(sClass)==-1 && bSetIt)
			o.txt.className=o.txt.className+" "+sClass; 
		else if(o.txt.className.indexOf(sClass)>=0 && !bSetIt)
		o.txt.className=o.txt.className.replace(" "+sClass,"");
	}
	return o;
}
function sapUrMapi_ComboBox_mousedown(sId,e) {
	var o=sapUrMapi_ComboBox_getObject(sId);
	if(e.button!=0 && o.open) return;
  o.txt.setAttribute("noblur","true");
}
function sapUrMapi_ComboBox_click(sId,e) {
	var o=sapUrMapi_ComboBox_getObject(sId);
	if (o.isdsbl) return;
	if (o.isdd || e.type=="keydown" || ur_evtSrc(e).className.indexOf("urCoB2Btn")>=0) {
	  if (!o.open) 
			sapUrMapi_ComboBox_showList(sId,e);
		else{
			sapUrMapi_ComboBox_hideList(sId);
			if(o.isdd) sapUrMapi_ComboBox_addClass(sId,"urCoB2Hv",true);			
		}
		if(ur_evtSrc(e).className.indexOf("urCoB2Btn")>=0) 
			ur_focus(o.txt);
	}
  o.txt.setAttribute("noblur","false");
  return sapUrMapi_cancelEvent(e);
}
function sapUrMapi_ComboBox_focusDdlb(sId,e) { 
	var o=sapUrMapi_ComboBox_getObject(sId);
	if (!o.open) sapUrMapi_DataTip_show(sId,"focus");
	if (o.isdsbl) return;
	o.txt.setAttribute("noblur","false");
	if(!o.isdd) return;
	if (o.open && o.txt.className.indexOf(" urCoB2Hv")) sapUrMapi_ComboBox_addClass(sId,"urCoB2Hv",false);
	else if(!o.open && o.txt.className.indexOf(" urCoB2Hv")==-1) sapUrMapi_ComboBox_addClass(sId,"urCoB2Hv",true);
        return sapUrMapi_cancelEvent(e);
}
function sapUrMapi_ComboBox_fireSelectionChange(o, oEvt){
	
  if(o.txt.getAttribute("ks")==o.txt.getAttribute("k") && o.txt.getAttribute("vs")==o.txt.value) 
		return;
  
  if(o.isdd && parseInt(o.txt.getAttribute("ic"))==0) return;
  
  if(oEvt.type=="keydown" && (((oEvt.keyCode==40 || oEvt.keyCode==38)&&o.open) || (oEvt.keyCode>64 && oEvt.keyCode<126) || (oEvt.keyCode>127 && oEvt.keyCode<192))) return;

  /* initialize key if only value has changed */
  if(o.txt.getAttribute("k") == o.txt.getAttribute("ks") && o.txt.getAttribute("vs")!=o.txt.value){
    o.txt.setAttribute("k", "");
  }

  o.txt.setAttribute("vs",o.txt.value);
  o.txt.setAttribute("ks",o.txt.getAttribute("k"));
  var sFunc=o.main.getAttribute("onsc");
  if(sFunc){
		o.main.fSelCh = new Function("event",sFunc);
		o.main.fSelCh(oEvt);
  }
}
function sapUrMapi_ComboBox_blurDdlb(sId,e) { 
	var o=sapUrMapi_ComboBox_getObject(sId);
	
	if (o.isdsbl) {sapUrMapi_DataTip_hide();return;}
	if(o.txt.getAttribute("noblur")=="true" || (oPopup!=null && oPopup.frame.window.mover && o.open)){
		o.txt.setAttribute("noblur","false");
		ur_focus(o.txt);
		return sapUrMapi_cancelEvent(e);
	}
	
	if (o.isdd) sapUrMapi_ComboBox_addClass(sId,"urCoB2Hv",false);
	if (oPopup!=null && o.open) sapUrMapi_ComboBox_hideList(sId);
	if (oPopup!=null && !o.open) sapUrMapi_DataTip_hide();
	sapUrMapi_ComboBox_fireSelectionChange(o,e);
	o.txt.setAttribute("ll",false); 
	return sapUrMapi_cancelEvent(e);
}
function sapUrMapi_ComboBox_setReadonly(sId,bReadonly) {
  var o=sapUrMapi_ComboBox_addClass(sId,"urCoB2Ro",bReadonly);
  ur_setReadonly(o.txt,bReadonly);
  o.txt.readOnly=bReadonly;
}
function sapUrMapi_ComboBox_setInvalid(sId,bInvalid) {
  var o=sapUrMapi_ComboBox_addClass(sId,"urCoB2Inv",bInvalid);
  ur_setInvalid(o.txt,bInvalid);
}
var sUrComboBox_virtualTyping="";
function sapUrMapi_ComboBox_keydown(sId,e) {
	var o=sapUrMapi_ComboBox_getObject(sId);
	
	if (o.isdsbl) return;
	
	
	if (e.keyCode==9) {
		if(o.open) sapUrMapi_ItemListBox_selectHoveredItem(o.lid, oPopup.frame.window.document,e);
		if (o.isdd) sapUrMapi_ComboBox_addClass(sId,"urCoB2Hv",false);
		if (oPopup!=null && o.open) sapUrMapi_ComboBox_hideList(sId);
		return;
	}
	
	
	if( (e.altKey && (e.keyCode==40||e.keyCode==38)) || e.keyCode==115 ){
		sapUrMapi_ComboBox_click(sId,e);
		return sapUrMapi_cancelEvent(e);
	}
	
	
	if(e.keyCode==40 || e.keyCode==38 || e.keyCode==33 || e.keyCode==34 || e.keyCode==35 || e.keyCode==36){
		if(o.open) sapUrMapi_ItemListBox_keydown(o.lid, oPopup.frame.window.document, e );
		else{
			
			if(ur_ComboBox_fireBeforeListLoad(sId,o.lid,e))
				return sapUrMapi_cancelEvent(e);
			sapUrMapi_ItemListBox_setParentId(o.lid, sId);
			sapUrMapi_ItemListBox_setSelectedKey(o.lid,o.key,document,false);
			sapUrMapi_ItemListBox_keydown(o.lid, document, e );
		}		
		return sapUrMapi_cancelEvent(e);
	}
	
	
  if (e.keyCode==27 && o.open) { 
		o.txt.value=o.txt.getAttribute("vs");
		o.txt.setAttribute("k",o.txt.getAttribute("ks"));
  	sapUrMapi_ComboBox_hideList(sId);
  	sapUrMapi_ComboBox_focusDdlb(sId,e);
  	return sapUrMapi_cancelEvent(e);
  }
  else if (e.keyCode==27 && !o.open) 
		sapUrMapi_DataTip_hide();
  
  
  if (e.keyCode==13 && o.open) { 
		sapUrMapi_ItemListBox_selectHoveredItem(o.lid, oPopup.frame.window.document,e);
  	sapUrMapi_ComboBox_hideList(sId);
  	sapUrMapi_ComboBox_fireSelectionChange(o, e);
  	return sapUrMapi_cancelEvent(e);
  }
  else if (e.keyCode==13 && !o.isdd)
    	if(!sapUrMapi_ComboBox_findItem(sId,o.txt.value,true,e))
    		sapUrMapi_ComboBox_fireSelectionChange(o, e);
  
  
  	if ((e.keyCode>64 && e.keyCode<126)||(e.keyCode>127 && e.keyCode<192)) {
		if (o.isdd){
	  	if (o.vt) sapUrMapi_ComboBox_initVirtualTyping();
	  	var sSearch=String.fromCharCode(e.keyCode);
	  	if (!o.vt) sUrComboBox_virtualTyping=sSearch;
			else sUrComboBox_virtualTyping+=sSearch;
	  	sapUrMapi_ComboBox_findItem(sId,sUrComboBox_virtualTyping,true,e);
	  	if(o.open){
	  		o=sapUrMapi_ComboBox_getObject(sId);
	  		sapUrMapi_ItemListBox_setSelectedKey(o.lid,o.key,oPopup.frame.window.document,true);
	  	}	  	
	 	}
		else{
				o.txt.setAttribute("k","");
		}
	}
}
function sapUrMapi_ComboBox_keypress(sId,e) {
}
var oVTTimer=null;
function sapUrMapi_ComboBox_initVirtualTyping() {
  if (oVTTimer!=null) clearTimeout(oVTTimer); 
 	oVTTimer=ur_callDelayed("sUrComboBox_virtualTyping='';clearTimeout(oVTTimer);oVTTimer=null;",250);
 }
function sapUrMapi_ComboBox_findItem(sId,sSearch,bSelect,oEvt) {
	var o=sapUrMapi_ComboBox_getObject(sId);
	var sList=sapUrMapi_ItemListBox_getList(o.lid,document);
	var sLIST=sList.toUpperCase();
	var sSEARCH="||"+sSearch.toUpperCase();
	var iStart=0;
	var iEnd=0;
	var sKey=o.txt.getAttribute("k")+"||";
	var sNewKey="";
	var sNewVal="";
	
	if(sKey!=null && sKey!="")
		iStart=sList.indexOf(sKey);
	iStart=sLIST.indexOf(sSEARCH,iStart);
	if(iStart<0)
		iStart=sLIST.indexOf(sSEARCH);
	if(iStart<0) return false;
	
	iStart+=2;
	iEnd=sList.indexOf("|",iStart);
	sVal=sList.slice(iStart,iEnd);
	iStart=iEnd+1;
	iEnd=sList.indexOf("||",iStart);
	sKey=sList.slice(iStart,iEnd);
	
  if (bSelect)
		sapUrMapi_ComboBox_setValue(sId,sKey,sVal,null,oEvt);
	return true;
}
function sapUrMapi_ComboBox_showList(sId,oEvt) {
	var o=sapUrMapi_ComboBox_getObject(sId);
	var oIlb;
	var arrUrls = new Array(ur_system.stylepath+"ur_pop_"+ur_system.browser_abbrev+".css");
	
	if(ur_ComboBox_fireBeforeListLoad(sId,o.lid,oEvt))
		return sapUrMapi_cancelEvent(oEvt);
	o.open=o.txt.setAttribute("op","true");
  if (o.isdd) sapUrMapi_ComboBox_addClass(sId,"urCoB2Hv",false);
  	
	
	clearTimeout(_ur_DataTip_timer);
	
	
	sapUrMapi_ItemListBox_setParentId(o.lid, sId);
	oIlb=sapUrMapi_ItemListBox_getObject(o.lid,document,null);
	sapUrMapi_ItemListBox_setDim(o.lid, o.main.offsetWidth);
	sapUrMapi_ItemListBox_setSelectedKey(o.lid,o.key,document,false);
	sapUrMapi_ItemListBox_setReadonly(oIlb,o.isro);	
	oPopup = new sapPopup(window,arrUrls,document.getElementById(o.lid+"-r"),document.getElementById(sId),oEvt,0);
	oPopup.size.height=oIlb.box.offsetHeight;
	oPopup.size.width=oIlb.box.offsetWidth;
	oPopup.sizebehaviour=sapPopupSizeBehavior.USER
	if (ur_system.direction=="rtl") oPopup.positionbehavior = sapPopupPositionBehavior.MENURIGHT;
	else sapPopupPositionBehavior.MENULEFT;	
	oPopup.show(true,true);
}
function sapUrMapi_ComboBox_hideList(sId) {
  var o=sapUrMapi_ComboBox_getObject(sId);
	o.txt.setAttribute("op","false");
	o.txt.setAttribute("noblur","false");
	if (oPopup) oPopup.hide();
}
function sapUrMapi_ComboBox_toggleButton(sId,bShow) {}
function sapUrMapi_ComboBox_setValue(sId,sKey,sValue,sImgSrc,oEvt) {
  var o = sapUrMapi_ComboBox_getObject(sId);
  if(!o.isro && !o.isdsbl && sKey!=null && (o.txt.ks!=sKey || o.txt.k!=sKey)){
		
			o.txt.setAttribute("k",sKey);
			o.txt.value=sValue;
			if (sImgSrc!="" && sImgSrc!=null)
  			if (sImgSrc.indexOf("url(")!=0 && sImgSrc.length>0) o.txt.style.backgroundImage="url("+sImgSrc+")";
  			else o.txt.style.backgroundImage=sImgSrc;
		
		
		sapUrMapi_ComboBox_fireSelectionChange(o,oEvt);
  }
  
  
  if (oEvt!=null && oEvt.type=="click"){
		sapUrMapi_ComboBox_hideList(sId);
		ur_focus(o.txt);
	}
}
function sapUrMapi_ComboBox_getSelectedKey(sId) {
  var o = sapUrMapi_ComboBox_getObject(sId);
  return o.txt.getAttribute("k");
}
function sapUrMapi_ComboBox_getSelectedValue(sId) {
  var o = sapUrMapi_ComboBox_getObject(sId);
	return o.txt.value;
}

//** DataTip.nn6 **

var _ur_DataTip_timer;
function sapUrMapi_DataTip_getText(sId) {
	var oDTText = document.getElementById(sId+"-dtip");
	oDTText = oDTText.firstChild.lastChild;
	return oDTText.innerHTML;
}
enumUrDataTipType = {ERROR:"Error",WARNING:"Warning",OK:"Ok",TEXT:"Text"};
function sapUrMapi_DataTip_getType(sId) { 
	var oDTTyp  = document.getElementById(sId+"-dtip");
	oDTTyp = oDTTyp.firstChild.firstChild;
    if ((oDTTyp.className).indexOf(enumUrDataTipType.ERROR)>-1) return enumUrDataTipType.ERROR;
    if ((oDTTyp.className).indexOf(enumUrDataTipType.WARNING)>-1) return enumUrDataTipType.WARNING;
    if ((oDTTyp.className).indexOf(enumUrDataTipType.OK)>-1) return enumUrDataTipType.OK;
    if ((oDTTyp.className).indexOf("urDataTipTxt")>-1) return enumUrDataTipType.TEXT;
  }
function sapUrMapi_DataTip_show(sId,sEvtType) {
	var bShow=false;
	oDataTip = document.getElementById(sId+"-dtip");
	if (oDataTip==null) return;
	var bAf=((oDataTip.getAttribute("af")!=null) && (oDataTip.getAttribute("af")=="a"));
	var bAff=((oDataTip.getAttribute("af")!=null) && (oDataTip.getAttribute("af")=="f"));
	var iTo=0;
	if ((oDataTip.getAttribute("to")!=null) && (oDataTip.getAttribute("to")!="")) {
	  iTo=parseInt(oDataTip.getAttribute("to"));
	}
	if (typeof(sEvtType)=="undefined" || sEvtType=="") {
	  bShow=true;
	}
	if (sEvtType=="keydown") {
	  bShow=true;
	  iTo=0;
	}
	if (sEvtType=="focus") {
	  if (bAf) bShow=true;
	  if ((bAff) && (oDataTip.getAttribute("first")==null || oDataTip.getAttribute("first")=="")) {
	    bShow=true;
		oDataTip.setAttribute("first","true");
	  } else {
	    if (!bAf) iTo=0;
	  }
	}
	if (bShow) {
		var arrUrls = new Array(ur_system.stylepath+"ur_pop_"+ur_system.browser_abbrev+".css");
		sTriggerId=sId;
		oTrg=document.getElementById(sId);
		if (oTrg.tagName=="INPUT" && (oTrg.type.toLowerCase()=="radio" || oTrg.type.toLowerCase()=="checkbox")) {
		  oTrg=oTrg.nextSibling;
		}
		oPopup = new sapPopup(window,arrUrls,document.getElementById(sId+'-dtip'),oTrg,null,0);
		if (ur_system.direction=="rtl") oPopup.positionbehavior = sapPopupPositionBehavior.MENURIGHT;
		else sapPopupPositionBehavior.MENULEFT;	
		oPopup.show(true,true);
	}
	if (iTo>0) {
	 _ur_DataTip_timer = ur_callDelayed("sapUrMapi_DataTip_hide()",iTo*1000);
	}
}
function sapUrMapi_DataTip_hide() {
	clearTimeout(_ur_DataTip_timer);
	if (oPopup!=null) oPopup.hide();
}

//** DateNavigator.nn6 **

function sapUrMapi_DateNavigator_keydown(sId,oEvt) {}
function sapUrMapi_DateNavigator_mousemove(sId,oEvt) {}
function sapUrMapi_DateNavigator_activate(sId,oEvt){}
function sapUrMapi_DateNavigator_getDateFromId(sId){}

//** DragSource.nn6 **

var _ur_DragDrop=null;
function ur_Drag_hideCursor() {
	if (_ur_DragDrop) {
   if (_ur_DragDrop.cursor) {
     _ur_DragDrop.cursor.style.display="none";
   }
  }
}
function ur_Drag_showCursor() {
	if (_ur_DragDrop) {
   if (_ur_DragDrop.cursor) {
     _ur_DragDrop.cursor.style.display="block";
   }
  }
}
function ur_Drag_progress(e) {
  if (_ur_DragDrop && _ur_DragDrop.progress) {
    var o=ur_EVT_src(e);
    _ur_DragDrop.isddoperation=true;
    var oChildContainer=sapUrMapi_isChildOfControl(o,"DropTarget");
    if (oChildContainer) {
	    if (_ur_DragDrop.target!=oChildContainer) {
	      _ur_DragDrop.target=oChildContainer;
	      ur_Drag_enter(_ur_DragDrop.target.id,e);
	    } else {
	      ur_Drag_over(_ur_DragDrop.target.id,e);
	    }
	    if (_ur_DragDrop.cursor!=_ur_DragDrop.drag) {
	      ur_Drag_hideCursor();
	      _ur_DragDrop.cursor=_ur_DragDrop.drag;
	    };
	  } else {
	    if (_ur_DragDrop.target) ur_Drag_leave(_ur_DragDrop.target.id,e);
	    _ur_DragDrop.target=null;
	    if (_ur_DragDrop.cursor!=_ur_DragDrop.nodrag) {
	      ur_Drag_hideCursor();
	      _ur_DragDrop.cursor=_ur_DragDrop.nodrag;
	    };
	  }
	  var oBody=document.getElementsByTagName("BODY")[0];
	  if (e.x>oBody.offsetWidth-26 ||e.y>oBody.offsetHeight-26 || e.x<0 || e.y<0) {
	    ur_Drag_hideCursor();
	  } else {
	  	if (ur_system.direction=="rtl") {
				iHorCorr = oBody.scrollLeft-sapUrMapi_posLeftCorrectionForRTL(oBody);
			} else {
				iHorCorr = oBody.scrollLeft;
			}
			_ur_DragDrop.cursor.style.top=e.clientY+14;
			_ur_DragDrop.cursor.style.left=e.clientX+10;
	    ur_Drag_showCursor();
	  }
    ur_EVT_fire(ur_get(_ur_DragDrop.source.id),"odrag",e);
  }
}
function ur_Drag_start(sId,e){
  if (!_ur_DragDrop) {
    _ur_DragDrop={cursor:null,drag:null,nodrag:null,progress:false,isddoperation:false};
    var o=document.createElement("IMG");
    o.src=ur_system.mimepath+"dragdrop/nodrop.gif";
		o.style.position="absolute";
	  o.style.display="none";
	  o.style.zIndex="1000";
	  _ur_DragDrop.nodrag=o;
	  document.body.appendChild(_ur_DragDrop.nodrag);
    var o=document.createElement("IMG");
    o.src=ur_system.mimepath+"dragdrop/drop.gif";
		o.style.position="absolute";
	  o.style.display="none";
	  o.style.zIndex="1000";
	  _ur_DragDrop.drag=o;
	  document.body.appendChild(_ur_DragDrop.drag);
	} 
	_ur_DragDrop.progress=true;
	_ur_DragDrop.source=ur_get(sId);
	window.addEventListener("mousemove",ur_Drag_progress,true);
	window.addEventListener("mouseup",ur_Drag_end,true);
  ur_EVT_fire(ur_get(sId),"ods",e);
  ur_EVT_cancel(e);
}
function ur_Drag_end(e){
	if (_ur_DragDrop && _ur_DragDrop.progress && _ur_DragDrop.isddoperation) {
    ur_Drag_hideCursor();
    if (_ur_DragDrop.target) ur_Drop(_ur_DragDrop.target.id,e);
	  ur_EVT_fire(_ur_DragDrop.source,"ode",e);
  	window.removeEventListener("mousemove",ur_Drag_progress,true);
  	window.removeEventListener("mouseup",ur_Drag_end,true);
		ur_Drag_hideCursor();
		_ur_DragDrop.source=null;
		_ur_DragDrop.target=null;
		_ur_DragDrop.isddoperation=false;
		_ur_DragDrop.progress=false;
  }
}
function ur_Drop(sId,e) {
	if (_ur_DragDrop && _ur_DragDrop.progress && _ur_DragDrop.isddoperation) {
		ur_EVT_fire(ur_get(sId),"odrop",e);
	}
}
function ur_Drag_enter(sId,e) {
	if (_ur_DragDrop && _ur_DragDrop.progress && _ur_DragDrop.isddoperation) {
	  ur_EVT_fire(ur_get(sId),"odenter",e);
	}
}
function ur_Drag_over(sId,e) {
	if (_ur_DragDrop && _ur_DragDrop.progress && _ur_DragDrop.isddoperation) {
	  ur_EVT_fire(ur_get(sId),"odo",e);
	}
}
function ur_Drag_leave(sId,e) {
	if (_ur_DragDrop && _ur_DragDrop.progress && _ur_DragDrop.isddoperation) {
  	ur_EVT_fire(ur_get(sId),"odl",e);
  }
}

//** DropDownListBox.ie5 **

function sapUrMapi_DropDownListBox_getSelectedKey(sId) {
	oSelect = document.getElementById(sId);
	return oSelect.options[oSelect.selectedIndex].value;
}
function sapUrMapi_DropDownListBox_setSelectedKey(sId,sKey) {
	oSelect = document.getElementById(sId);
	for (var n=0;n<oSelect.options.length;n++) {
		if (oSelect.options[n].value==sKey) {
			oSelect.selectedIndex=n; return;
		}
	}
}
function sapUrMapi_DropDownListBox_getSelectedIndex(sId) {
	return document.getElementById(sId).selectedIndex;
}
function sapUrMapi_DropDownListBox_setSelectedIndex(sId,iIndex) {
	document.getElementById(sId).selectedIndex=iIndex;
}
function sapUrMapi_DropDownListBox_focus(sId) {
   sapUrMapi_focusElement(sId);
}
function sapUrMapi_DropDownListBox_addOptions(sId,oKeyValuePairs,sSelectedKey) {
  for(var elem in oKeyValuePairs)
    sapUrMapi_DropDownListBox_addOption(sId,elem,oKeyValuePairs[elem],elem==sSelectedKey);
}
function sapUrMapi_DropDownListBox_addOption(sId,sKey,sValue,bSelected) {
  var ddlb = document.getElementById(sId);
  ddlb.options[ddlb.options.length] = new Option(sValue,sKey);
  if (bSelected) ddlb.options[ddlb.options.length-1].selected=true;
}
function sapUrMapi_DropDownListBox_keydown(sId,oEvt){
	if(oEvt.keyCode==40 || oEvt.keyCode==38) ur_cancelBubble(oEvt);
}

//** FileUpload.ie5 **

function sapUrMapi_FileUpload_change(sId,oEvt){
	if(ur_system.is508){
		var o=ur_evtSrc(oEvt);
		var sTt=o.getAttribute("tt");
		var sSep=" "+getLanguageText("SAPUR_SEPARATOR")+" ";
		if(o.value!="")
			o.title=o.value+sSep;
		o.title+=getLanguageText("SAPUR_UPLD");
		if(sTt!=null && sTt!="")
			o.title+=sSep+sTt;
		o.title+=sSep+getLanguageText("SAPUR_UPLD_TUTOR");
	}
}

//** FocusRect.nn6 **
function sapUrMapi_Focus_getFocusOffset(object){}
function sapUrMapi_Focus_canFocus(o){}
function sapUrMapi_Focus_getNextFocusableElement(o){}
function sapUrMapi_Focus_showFocusRect(sId){}
function sapUrMapi_Focus_RegisterCreate(sId){}
function sapUrMapi_Focus_getCurrentId(){}
function sapUrMapi_Focus_reset(){}
function sapUrMapi_Focus_remove(){}
function sapUrMapi_Focus_getFocusRectHeight() {return 0;}

//** Image.ie5 **

function sapUrMapi_Image_menuActivate(sImageId,e) {
	oImage = document.getElementById(sImageId);
	if (sapUrMapi_checkKey(e,"keydown",new Array("32","40"))) {
		if (oImage.onclick) {oImage.onclick();return false;} 
		if (oImage.oncontextmenu) {oImage.oncontextmenu();return false;} 
		if (oImage.onmouseover) {oImage.onmouseover();return false;} 
	}
  return false;
}
function sapUrMapi_Image_checkClick(sId, e) {
	if (e.type=="click") return true;
	return sapUrMapi_checkKey(e,"keydown",new Array("32"));
}

//** InputField.nn6 **

var aMonthNames=null;
var aDayNames=null;
var aDayNameAbbrevs=null;
var aDayCount=null;

function sapUrMapi_InputField_setInvalid(sId,bSet,sTooltip) {
	var oIn=ur_get(sId);
	if (oIn.disabled || oIn.readonly || (ur_isSt(sId,ur_st.INVALID)&&bSet) || (!ur_isSt(sId,ur_st.INVALID)&&!bSet)) return;
  var oLbl=sapUrMapi_Label_getInputLabel(sId);
	sapUrMapi_Label_setInvalid(oLbl,bSet);
	if(sTooltip!="") oIn.setAttribute("tt",sTooltip);
	ur_setSt(sId,ur_st.INVALID,bSet);
	if(bSet)
		oIn.className=oIn.className+" urEdf2TxtInv";
	else
    oIn.className=oIn.className.replace(" urEdf2TxtInv","");
}
function sapUrMapi_InputField_setDisabled(sId,bSet) {
	var oIn=ur_get(sId);
  var oLbl=sapUrMapi_Label_getInputLabel(sId);
  var oBtn=ur_get(sId+"-btn");
  
	if (bSet && !ur_isSt(sId,ur_st.DISABLED)) {
		sapUrMapi_Label_setDisabled(oLbl);
	  oIn.readOnly=true;
		oIn.className+=" urEdf2TxtDsbl";
		if(oBtn!=null) 
			oBtn.className=oBtn.className+"Dsbl";
		ur_setSt(sId,ur_st.DISABLED,bSet);	
	} 
	else if(!bSet && ur_isSt(sId,ur_st.DISABLED)){
		sapUrMapi_Label_setEnabled(oLbl);
	  oIn.readOnly=false;
    oIn.className=oIn.className.replace(" urEdf2TxtDsbl","");
		if(oBtn!=null)
			oBtn.className=oBtn.className.substring(0,oBtn.className.length-4);
		ur_setSt(sId,ur_st.DISABLED,bSet);
	}
}
function sapUrMapi_InputField_setReadonly(sId,bSet) {
	var oIn=ur_get(sId);
  var oLbl=sapUrMapi_Label_getInputLabel(sId);
  var oBtn=ur_get(sId+"-btn");
  
	if (bSet && !ur_isSt(sId,ur_st.READONLY)) {
		sapUrMapi_Label_setDisabled(oLbl);
	  oIn.readOnly=true;
		oIn.className+=" urEdf2TxtRo";
		ur_setSt(sId,ur_st.READONLY,bSet);
	} 
	else if(!bSet && ur_isSt(sId,ur_st.READONLY)){
		sapUrMapi_Label_setEnabled(oLbl);
	  oIn.readOnly=false;
		oIn.className=oIn.className.replace(" urEdf2TxtRo","");
		ur_setSt(sId,ur_st.READONLY,bSet);
	}
}
function sapUrMapi_InputField_keydown(sId,e){
	var o=ur_get(sId);
	var iKeyCode=e.keyCode;
	
	if(e.keyCode==115){
	  if(ur_get(sId+"-btn"))
			ur_get(sId+"-btn").onclick();
		return ur_EVT_cancel(e);
	}
	
	if(e.which == 27){
		sapUrMapi_DataTip_hide(sId);
		return ur_EVT_cancel(e);
	}
	
	
	
	var sDefaultValue=o.getAttribute("defval");
	if(sDefaultValue && o.value == sDefaultValue){
		var sNavigationKeys="|"+ur_KEYS.UP+"|"+ur_KEYS.DOWN+"|"+ur_KEYS.LEFT+"|"+ur_KEYS.RIGHT+"|"+ur_KEYS.POS1+"|"+ur_KEYS.END+"|";
		if(sNavigationKeys.indexOf("|"+iKeyCode+"|") >=0){
			return ur_EVT_cancel(e);		}				
	}		
}
function sapUrMapi_InputField_changeLabel(sId,sNewLabel){
}
function sapUrMapi_InputField_focus(sId,oEvt) {
	var o=ur_get(sId);
	
  sapUrMapi_focusElement(sId);
  
	
  sapUrMapi_DataTip_show(sId,"focus");
  
  if (o.getAttribute("st").indexOf("d")>-1) o.disabled=true;
  
  
  ur_setEditCellColor(o);
  
  sapUrMapi_InputField_showButton(o,oEvt);
  
	
	var sDefaultValue=o.getAttribute("defval");
	if(sDefaultValue && o.value == sDefaultValue){
		o.select();
		o.onclick=ur_InputField_click;
	}  
	
	
	o.setAttribute("oldvalue",o.value);
	
}
function ur_InputField_click(oEvt) {
	var o=ur_evtSrc(oEvt);
	
	
	var sDefaultValue=o.getAttribute("defval");
	if(sDefaultValue && o.value == sDefaultValue){
		o.select();
	}
}
function sapUrMapi_InputField_focusWithFormat(sId,sFormat,oEvt) {
	var o=ur_get(sId);
	sapUrMapi_InputField_focus(sId,oEvt);
	if (ur_getAttD(o,"tp","")=="DATE") {
	   o.setAttribute("df",sFormat);
	}
}
function sapUrMapi_InputField_triggerOnChange(sId,sOldValue,sNewValue) {
  var oInp = ur_get(sId);
  if (sOldValue!=sNewValue) {
    if (oInp.onchange!=null) return oInp.onchange();
  }
}
function sapUrMapi_InputField_setValue(sId,sValue) {
  ur_get(sId).value=sValue;
}
function sapUrMapi_InputField_getValue(sId) {
  return ur_get(sId).value;
}
var oDatePicker;
var dActDate;
function sapUrMapi_Date_getArray(sFormat,sDate) {
  var q;
  if ( sFormat == 1 || sFormat == 4 )
    q=sDate.split(".");
  if ( sFormat == 2 || sFormat == 5 || sFormat == 7)
    q=sDate.split("/" );
  if ( sFormat == 3 || sFormat == 6 || sFormat == 8)
    q=sDate.split("-");
  for (var i=0;i<q.length;i++) {
  	var str=q[i];
		if(str.length==2 && str.charAt(0)=='0'){
		  str=str.charAt(1);
		}
		q[i]=parseInt(str);
  }
  return q;
}
function sapUrMapi_Date_normalize(sFormat,arrDate) {
  
	var Day=1;
	var Month=0;
	var Year=0;
	if(sFormat==1 || sFormat==7 || sFormat==8){
		Day=arrDate[0];
		Month=arrDate[1];
		Year=arrDate[2];
	}
	else if(sFormat==2 || sFormat==3){
		Day=arrDate[1];
		Month=arrDate[0];
		Year=arrDate[2];
        }
	else if(sFormat==4 || sFormat==5 || sFormat== 6){
		Day=arrDate[2];
		Month=arrDate[1];
		Year=arrDate[0];
	}
	var arrRet=new Array(3);
	arrRet[0]=Year;
	arrRet[1]=Month-1;
	arrRet[2]=Day;
	return arrRet;
}
function sapUrMapi_Date_make(sFormat,vYear,vMonth,vDay)
{
  var dateString;
  if ( sFormat == 1 )
    dateString=sapUrMapi_Date_setZero(parseInt(vDay)) + "." + sapUrMapi_Date_setZero(parseInt(vMonth)) + "." + vYear;
  if ( sFormat == 2 )
    dateString=sapUrMapi_Date_setZero(parseInt(vMonth)) + "/" + sapUrMapi_Date_setZero(parseInt(vDay)) + "/" + vYear;
  if ( sFormat == 3 )
    dateString=sapUrMapi_Date_setZero(parseInt(vMonth)) + "-" + sapUrMapi_Date_setZero(parseInt(vDay)) + "-" + vYear;
  if ( sFormat == 4 )
    dateString="" + vYear + "." + sapUrMapi_Date_setZero(parseInt(vMonth)) + "." + sapUrMapi_Date_setZero(parseInt(vDay));
  if ( sFormat == 5 )
    dateString="" + vYear + "/" + sapUrMapi_Date_setZero(parseInt(vMonth)) + "/" + sapUrMapi_Date_setZero(parseInt(vDay));
  if ( sFormat == 6 )
    dateString="" + vYear + "-" + sapUrMapi_Date_setZero(parseInt(vMonth)) + "-" + sapUrMapi_Date_setZero(parseInt(vDay));
  if ( sFormat == 7 )
    dateString=sapUrMapi_Date_setZero(parseInt(vDay)) + "/" + sapUrMapi_Date_setZero(parseInt(vMonth)) + "/" + vYear;
  if ( sFormat == 8 )
    dateString=sapUrMapi_Date_setZero(parseInt(vDay)) + "-" + sapUrMapi_Date_setZero(parseInt(vMonth)) + "-" + vYear;
  return dateString;
}
function sapUrMapi_InputField_showActualDatePicker(sId, oEvt) {
	  var dt=sapUrMapi_DateField_getDate(sId);
    sapUrMapi_InputField_showDatePicker(sId,dt.year,dt.month-1,dt.day,ur_system.firstdayofweek, oEvt);
}
function ur_DatePicker_keydown(oEvt) {
  if (oEvt.keyCode==27 || oEvt.keyCode==115) sapUrMapi_hideDatePicker();
}
function sapUrMapi_InputField_showDatePicker(sId,iYear,iMonth,iDay,iFirstDayOfWeek, oEvt) {
	oInput=ur_get(sId);
	if (ur_getAttD(oInput,"st","").indexOf("d")>-1) return;
	ur_focus(oInput);
  if (typeof(iFirstDayOfWeek)=="undefined") {
  	iFirstDayOfWeek=ur_system.firstdayofweek;
  }
  if (isNaN(iYear) || isNaN(iMonth) || isNaN(iDay)) {
	  var dt=sapUrMapi_DateField_getDate(sId);
	  iYear=dt.year;
	  iMonth=dt.month;
	  iDay=dt.day;
	  if (isNaN(iYear) || isNaN(iMonth) || isNaN(iDay)) {
			var dt=new Date();
			iYear  = dt.getFullYear();
			iMonth = dt.getMonth();
			iDay   = dt.getDate();
		} 
  }
	if (oInput.getAttribute("dsbl")=="true") return;
	var arrUrls;
	arrUrls = new Array(ur_system.stylepath+"ur_pop_"+ur_system.browser_abbrev+".css");
  if (oDatePicker) {
    var oCal = sapUrMapi_DatePicker_make(sId,iYear,iMonth,iDay,iFirstDayOfWeek);
  	try {
  	  oDatePicker.frame.window.document.getElementsByTagName("BODY")[0].innerHTML=oCal.innerHTML;
  	} catch(ex) {}
  } else {
    dActDate  = new Date(iYear,iMonth,iDay);
    var oCal = sapUrMapi_DatePicker_make(sId,iYear,iMonth,iDay,iFirstDayOfWeek);
    oDatePicker = new sapPopup(window,arrUrls,oCal,document.getElementById(sId+"-btn"),oEvt,0);
		oDatePicker.positionbehavior = sapPopupPositionBehavior.MENURIGHT;
		
		if (ur_system.direction=="rtl") {
		  oDatePicker.position.right=oDatePicker.position.right-1;
		} else {
		  oDatePicker.position.left=oDatePicker.position.left-1;
		}
		oDatePicker.inputId=sId;
		oDatePicker.position.top=oDatePicker.position.top-1;
  	oDatePicker.show();
  	oDatePicker.frame.window.focus();
  	oDatePicker.frame.window.onkeydown=ur_DatePicker_keydown;  	window.onfocus = sapUrMapi_hideDatePicker;
	
	
  }
}
function sapUrMapi_hideDatePicker() {
	if (oDatePicker) {
		oDatePicker.hide();
		oDatePicker.onblur=null;
    if (oDatePicker.inputId) document.getElementById(oDatePicker.inputId).focus();		
    oDatePicker=null;
		oPopup=null;
	}
}
function sapUrMapi_DatePicker_select(sId,e) {
  var o = e.target;
  if (e.target.id =="prev" || e.target.id=="next" || e.target.id=="nextyear" || e.target.id=="prevyear") return;
  var oInput=ur_get(sId);
  if(ur_isSt(sId,ur_st.READONLY))
	  return;
  while (o.tagName!="TD") {
  	o = o.parentNode;
  	if (o==null) return;
  }
	sDay = o.getAttribute("id");
	if (sDay==null || sDay=="") return;
  if (sDay) {
    var aDate = sDay.split("-");
    var arrValue=new Array();
    arrValue[0]=parseInt(aDate[2]);
    arrValue[1]=parseInt(aDate[1]);
    arrValue[2]=parseInt(aDate[0]);
 	  sapUrMapi_DateField_setDate(sId,arrValue[0],arrValue[1],arrValue[2]);
		sapUrMapi_hideDatePicker();
		ur_focus(oInput);
  }
}
function sapUrMapi_Date_setZero(iInt) {
	return iInt<10?"0"+iInt:iInt;
}
function sapUrMapi_DatePicker_make(sId,iYear,iMonth,iDay,iFirstDayOfWeek) {
	if (iYear < 0 ) {
		iYear = 0;
		iMonth = 0;
	}
  var arrTmp = ur_txt[ur_language];
  var hasValue = document.getElementById(sId).value==ur_InputField_getFormattedDateString(sId,iDay,iMonth+1,iYear);
  if (aMonthNames==null) aMonthNames = new Array (arrTmp["SAPUR_JANUARY"],arrTmp["SAPUR_FEBRUARY"],arrTmp["SAPUR_MARCH"],arrTmp["SAPUR_APRIL"],arrTmp["SAPUR_MAY"],arrTmp["SAPUR_JUNE"],arrTmp["SAPUR_JULY"],arrTmp["SAPUR_AUGUST"],arrTmp["SAPUR_SEPTEMBER"],arrTmp["SAPUR_OCTOBER"],arrTmp["SAPUR_NOVEMBER"],arrTmp["SAPUR_DECEMBER"]);
  if (aDayNameAbbrevs==null)   aDayNameAbbrevs   = new Array (arrTmp["SAPUR_SUNDAY_ABBREV"],arrTmp["SAPUR_MONDAY_ABBREV"],arrTmp["SAPUR_TUESDAY_ABBREV"],arrTmp["SAPUR_WEDNESDAY_ABBREV"],arrTmp["SAPUR_THURSDAY_ABBREV"],arrTmp["SAPUR_FRIDAY_ABBREV"],arrTmp["SAPUR_SATURDAY_ABBREV"]);
  if (aDayCount==null)  aDayCount = new Array (31,28,31,30,31,30,31,31,30,31,30,31);
  sapUrMapi_Date_setDayCount(iMonth,iYear);
  if (typeof(iFirstDayOfWeek)=="undefined") {
  	iFirstDayOfWeek=ur_system.firstdayofweek;
  }
  var oCal = document.getElementById("ur-date-picker");
  if (!oCal) {
	  var oBody = document.getElementsByTagName("BODY")[0];
	  var oCal = document.createElement("SPAN");
	  oCal.id="ur-date-picker";
	  oCal.style.position="absolute";
	  if (ur_system.direction=="rtl") {
	    oCal.style.right="0";
	  } else {
	    oCal.style.left="0";
	  }
	  oCal.style.top="-1999px";
	  oBody.appendChild(oCal);
  }
  var o=ur_get(sId);
  var bRO=o.readOnly;
  var sCalHtml = "<div onclick=\"me.sapUrMapi_DatePicker_select('"+sId+"',event);return false;\"><table class='urCalPicWhl' cellpaddding='0' cellspacing='0' border='0' viscnt='0'><tbody><tr>";
  var pm = iMonth-1;
  var nm = iMonth+1;
  var dy = iDay;
  var py = iYear;
  var ny = iYear;
  if (pm==-1) {pm = 11;py--;}
  if (nm==12) {nm = 0;ny++;}
  if (dy>28) {dy=25}
    if (ur_system.direction=="rtl") {
		if(iYear==0) {
		  sCalHtml    += "<td class=\"urCalArrPrevYearDsbl\">&nbsp;</td>";
		} else {
//		sCalHtml    += "<td id=\"prevyear\" class=\"urCalArrPrevYear\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+(iYear-1)+","+iMonth+","+dy+","+iFirstDayOfWeek+",event,true);\">&nbsp;</td>";
		}
		if(iYear==0 && iMonth==0) {
		  sCalHtml    += "<td class=\"urCalArrPrevDsbl\">&nbsp;</td>";
		} else {
		sCalHtml    += "<td id=\"prev\" class=\"urCalArrPrev\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+py+","+pm+","+dy+","+iFirstDayOfWeek+",event,true);\">&nbsp;</td>";
		}
		// Year and month - colspan=4
		sCalHtml    += "<td colspan=6 class=urCalHdr nowrap align=center>"+aMonthNames[iMonth]+" "+iYear+"</td>";
		if(iYear==9999) {
		  if (iMonth==11) 
  			sCalHtml  += "<td id=\"next\" class=\"urCalArrNextDsbl\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+9999+","+11+","+31+","+iFirstDayOfWeek+",event,true);\">";
			else
				sCalHtml  += "<td id=\"next\" class=\"urCalArrNext\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+ny+","+nm+","+dy+","+iFirstDayOfWeek+",event,true);\">";
	//		sCalHtml  += "<td id=\"nextyear\" class=\"urCalArrNextYearDsbl\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+9999+","+11+","+31+","+iFirstDayOfWeek+",event,true);\">";
		} else {
			sCalHtml  += "<td id=\"next\" class=\"urCalArrNext\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+ny+","+nm+","+dy+","+iFirstDayOfWeek+",event,true);\">";
	//		sCalHtml  += "<td id=\"nextyear\" class=\"urCalArrNextYear\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+(iYear+1)+","+iMonth+","+iDay+","+iFirstDayOfWeek+",event,true);\">";
		}
	} else {
		if(iYear==0) {
		  sCalHtml    += "<td class=\"urCalArrPrevYearDsbl\">&nbsp;</td>";
		} else {
//		sCalHtml    += "<td id=\"prevyear\" class=\"urCalArrPrevYear\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+(iYear-1)+","+iMonth+","+dy+","+iFirstDayOfWeek+",event,true);\">&nbsp;</td>";
		}
		if(iYear==0 && iMonth==0) {
		  sCalHtml    += "<td class=\"urCalArrPrevDsbl\">&nbsp;</td>";
		} else {
		sCalHtml    += "<td id=\"prev\" class=\"urCalArrPrev\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+py+","+pm+","+dy+","+iFirstDayOfWeek+",event,true);\">&nbsp;</td>";
		}
		// Year and month - colspan=4
		sCalHtml    += "<td colspan=6 class=urCalHdr nowrap align=center>"+aMonthNames[iMonth]+" "+iYear+"</td>";
		if(iYear==9999) {
		  if (iMonth==11) 
  			sCalHtml  += "<td id=\"next\" class=\"urCalArrNextDsbl\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+9999+","+11+","+31+","+iFirstDayOfWeek+",event,true);\">";
			else
				sCalHtml  += "<td id=\"next\" class=\"urCalArrNext\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+ny+","+nm+","+dy+","+iFirstDayOfWeek+",event,true);\">";
//			sCalHtml  += "<td id=\"nextyear\" class=\"urCalArrNextYearDsbl\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+9999+","+11+","+31+","+iFirstDayOfWeek+",event,true);\">";
		} else {
			sCalHtml  += "<td id=\"next\" class=\"urCalArrNext\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+ny+","+nm+","+dy+","+iFirstDayOfWeek+",event,true);\">";
//			sCalHtml  += "<td id=\"nextyear\" class=\"urCalArrNextYear\" onclick=\"me.sapUrMapi_InputField_showDatePicker('"+sId+"',"+(iYear+1)+","+iMonth+","+iDay+","+iFirstDayOfWeek+",event,true);\">";
		}
	}
	sCalHtml    += "&nbsp;";
  sCalHtml    += "</td>";
  sCalHtml    += "</tr>";
  sCalHtml    += "<tr>";
  iLastDayOfWeek = iFirstDayOfWeek-1;
  if (iLastDayOfWeek==-1) iLastDayOfWeek=6;
  
  if (ur_system.direction=="rtl") {
    sCalHtml    += "<td class=urCalName style=\"border-left:0px none\">&nbsp;</td>";
  } else {
    sCalHtml    += "<td class=urCalName style=\"border-right:0px none\">&nbsp;</td>";
  }
  for (var i=iFirstDayOfWeek;i<aDayNameAbbrevs.length;i++) {
    if (aDayNameAbbrevs.length>3) {
      aDayNameAbbrevs[i]=aDayNameAbbrevs[i].substring(0,3);
    }
    sCalHtml    += "<td class=urCalName>"+aDayNameAbbrevs[i]+"</td>";
  }
  for (var i=0;i<iFirstDayOfWeek;i++) {
    sCalHtml    += "<td class=urCalName>"+aDayNameAbbrevs[i]+"</td>";
  }
  var dDate  = new Date(iYear,iMonth,1,12);
  dDate.setFullYear(iYear);
  var dStart=dDate;
  dStart = new Date(dStart.getTime()-((dStart.getDay()-iFirstDayOfWeek)*1000*60*60*24));
  if (dStart.getDate() >= 1 && dStart.getDate() <= 7) dStart = new Date(dStart.getTime()-(7*1000*60*60*24));
  var iFirstWeekCode=30;                                                   
  
  
  var iMinimalDaysInFirstWeek=ur_system.minimalDaysInFirstWeek;
  if (!iMinimalDaysInFirstWeek) iMinimalDaysInFirstWeek=4;
		
	for (var i=0;i<6;i++) {
   
    var oDateObj=new Date();
    var weekNum=ur_getWeek(dStart,iMinimalDaysInFirstWeek);
		
    sCalHtml    += "<tr class=urCalRow";
    if (!bRO) sCalHtml    += " style=\"cursor:pointer;height:18px\"";
		sCalHtml    += ">";
		
    sCalHtml    +=                                                           
		"<th class=urCalName style='border-style:none" +                         
		((i<5)?" none solid none":"")+" !important;'>" +                         
		weekNum+"</th>";                                       
    for (var n=0;n<7;n++) {
				var sClass="";
            var sId="id="+dStart.getFullYear()+"-"+(dStart.getMonth()+1)+"-"+dStart.getDate();
            if (dStart.getFullYear()<0 || dStart.getFullYear()>9999) {
            	sId="";
            } 
	  		if (dStart.getMonth()!=iMonth) {
	  			sClass="urCalIna";
	  		} else {
	  			sClass="";
	  		}
	  		if ((dStart.getYear()==dActDate.getYear()) && (dStart.getMonth()==dActDate.getMonth()) && (dStart.getDate()==dActDate.getDate() && hasValue)) {
	  			sClass+=" urMnuRowOn";
	  		}
	  		sCalHtml+="<td";
				if (n==0) {
	  		  sCalHtml+=" style=\"border-left-style:solid\"";
	  		}
	  		if ((dStart.getYear()==new Date().getYear()) && (dStart.getMonth()==new Date().getMonth()) && (dStart.getDate()==new Date().getDate())) {
	        var sCursor = "cursor:pointer";
	        if (dStart.getFullYear()<0 || dStart.getFullYear()>9999) {
	        	sCursor = "cursor:default!important"
	        }
	        if (sClass!="") {
	          sCalHtml+=" class="+sClass+" "+sId+"><div style=\"margin:-1;"+sCursor+";background-color:transparent\" class=urCalTod>"+dStart.getDate()+"</div></td>";
	        } else {
	          sCalHtml+=" "+sId+"><div style=\"margin:-1;"+sCursor+";background-color:transparent;height:18px\" class=urCalTod>"+dStart.getDate()+"</div></td>";
	        }
	  		} else {
	  		  if (sClass!="") {
	          	sCalHtml+=" "+sId+" class="+sClass+">"+dStart.getDate()+"</td>";
	        } else {
	          sCalHtml+=" "+sId+">"+dStart.getDate()+"</td>";
	        }
	  		}
	  		var oldStart = dStart;
	  		dStart = new Date(dStart.getTime()+(1000*60*60*24));
	  		if (dStart.getDate()==oldStart.getDate()) {
	  		  
	  		  dStart = new Date(dStart.getTime()+(1000*60*60*1));
	  		}
	  		if (dStart.getHours()==1) {
	  		  dStart = new Date(dStart.getTime()-(1000*60*60*1));
	  		}
  	}
    sCalHtml    += "</tr>";
  }
  sCalHtml    += "</tr></tbody></table></div>";
  oCal.innerHTML=sCalHtml;
  return oCal;
}
function sapUrMapi_Date_setDayCount(iMonth, iYear) {
	if ((iMonth == 1) && ((iYear % 400 == 0)) || ((iYear % 4 == 0) && (iYear % 100 != 0))) aDayCount[1] = 29;
}
var urSizeDiv = null;
var urInpSizes = new Array();
var urInpWidths = new Array();
function sapUrMapi_InputField_KeyUp(id, event) {
	return false;
}
function sapUrMapi_InputField_Blur(id, event) {
	var o=ur_get(id);
	sapUrMapi_DataTip_hide(id);
	if (ur_getAttD(o,"tp","")=="DATE") {
	  sapUrMapi_DateField_checkDate(id);
	}
	ur_removeEditCellColor();
	sapUrMapi_InputField_hideButton(o,event);
	
	var sOldValue=o.getAttribute("oldvalue");
	if(sOldValue!=o.value){
		o.onchange();
	}	
}
function sapUrMapi_InputField_change(sId,oEvt) {
	var o=ur_get(sId);
	
	o.setAttribute("oldvalue",o.value);
}
function sapUrMapi_InputFieldHelpClick(sId,oEvt) {
	
	if (ur_getAttD(ur_get(sId),"st","").indexOf("d")>-1) return;
  sapUrMapi_InputField_showActualDatePicker(sId,oEvt);
}
function sapUrMapi_InputField_showButton(o,oEvt){
	var oBtn=ur_get(o.id+"-btn");
	
	if(oBtn==null || oBtn.offsetTop>=0) return;
	
	
	var iTop=o.offsetTop;
	var oParent=o.offsetParent;
	while(oParent!=document.body){
		if(oParent.style.position=="absolute") 
			break;	
		iTop+=oParent.offsetTop;
		iTop-=oParent.scrollTop;
		oParent=oParent.offsetParent;
	}
	
	oParent=o.parentNode;
	while(oParent!=document.body){
		iTop-=oParent.scrollTop;
		oParent=oParent.parentNode;
	}		
	oBtn.style.top=iTop;
	oBtn.style.zIndex=101; 
}
function sapUrMapi_InputField_hideButton(o,oEvt){
	var oBtn=ur_get(o.id+"-btn");
	if(oBtn==null || oBtn.style.position!="absolute")return;
	ur_callDelayed("ur_get('"+oBtn.id+"').style.top='-900px'",150);
}
function sapUrMapi_DateField_checkDate(sId) {
  
  
  
}
function sapUrMapi_DateField_getDate(sId) {
  var dToday=new Date();
  var sValue=sapUrMapi_InputField_getValue(sId);
  if (sValue=="") return {day:iDay,month:iMonth,year:iYear};
  var sPattern=ur_DateField_getDatePattern(sId);
  var sLongPattern=sPattern;
  var dgtsYr=0;
  
  var sFindNumber="0123456789";
  var sFindPattern="dMy";
  var iDay,iMonth,iYear;
  var iErrors=0;
	while(sFindNumber.indexOf(sValue.charAt(0))==-1) {
		sValue=sValue.substring(1);
		iErrors++;
	}
	while(sFindNumber.indexOf(sValue.charAt(sValue.length-1))==-1) {
	  sValue=sValue.substring(0,sValue.length-1);
		iErrors++;
	}
  
  var sRegPattern="([^0-9])";
  var reg=new RegExp(sRegPattern,"ig");
  var arr=reg.exec(sValue);
  var xValue=sValue;
	var sCh=RegExp.$1;
	var sCh1;
	var twodelimiters=false;
	
	 try{
	xValue=sValue.split(sCh);
  if (xValue.length != 3)
  {
	var reg1=new RegExp(sRegPattern,"ig");
	var stempval=xValue[1];
	if(stempval!=null)
	while(reg1.exec(stempval))
	{
		var arr1= reg1.exec(stempval);
		sCh1=RegExp.$1;
		xValue=stempval.split(sCh1);
		stempval=xValue[1];
	}
	}
 
	
	if(sCh1!=null) {
	twodelimiters=true;
	if (sValue.indexOf(sCh) > sValue.indexOf(sCh1))
	{
		var tmp=sCh1;
		sCh1=sCh;
		sCh=tmp;
		
	}
	}
	}catch(Exp){}
    reg=new RegExp(sRegPattern,"ig");
    arr=reg.exec(sValue);
    
    if (reg.lastIndex>0) {
    if (sValue.indexOf(sCh)==4 || sValue.indexOf(sCh)==3) {
		  xValue=sPattern.replace("yyyy",sValue.substring(0,sValue.indexOf(sCh)));
				  if(twodelimiters)
			{
			  xValue=xValue.replace("MM",sValue.substring(sValue.indexOf(sCh)+1,sValue.lastIndexOf(sCh1)));
			  xValue=xValue.replace("M",sValue.substring(sValue.indexOf(sCh)+1,sValue.lastIndexOf(sCh1)));
			  xValue=xValue.replace("dd",sValue.substring(sValue.lastIndexOf(sCh1)+1));
			  xValue=xValue.replace("d",sValue.substring(sValue.lastIndexOf(sCh1)+1));
			}
	      else
			{
		  xValue=xValue.replace("MM",sValue.substring(sValue.indexOf(sCh)+1,sValue.lastIndexOf(sCh)));
		  xValue=xValue.replace("M",sValue.substring(sValue.indexOf(sCh)+1,sValue.lastIndexOf(sCh)));
		  xValue=xValue.replace("dd",sValue.substring(sValue.lastIndexOf(sCh)+1));
		  xValue=xValue.replace("d",sValue.substring(sValue.lastIndexOf(sCh)+1));
			}
		  sValue=xValue;
    }
  } 
	while(sFindPattern.indexOf(sPattern.charAt(sPattern.length-1))==-1) sPattern=sPattern.substring(0,sPattern.length-1);
  while (sPattern.indexOf(" ")>-1) sPattern=sPattern.replace(" ","");
  while (sValue.indexOf(" ")>-1) {
		
    sValue=sValue.replace(" ","");
  }
  if (iErrors>3) return {day:iDay,month:iMonth,year:iYear};
  
  
  var reg=ur_DateField_getRegExpTest(sValue,sPattern);
  if (reg.lastIndex>0) {
    
    
    var iDayPos=sPattern.indexOf("d");
    var iMonthPos=sPattern.indexOf("M");
    var iYearPos=sPattern.indexOf("y");
    var sDay,sMonth,sYear="";
    if(iDayPos != -1)
    {    
		if (iDayPos<iMonthPos && iDayPos<iYearPos) sDay=RegExp.$1;
    if (iDayPos>iMonthPos && iDayPos<iYearPos) sDay=RegExp.$2;
    if (iDayPos<iMonthPos && iDayPos>iYearPos) sDay=RegExp.$2;
    if (iDayPos>iMonthPos && iDayPos>iYearPos) sDay=RegExp.$3;
    if (iMonthPos==-1)
		{
		if( iDayPos<iYearPos) sDay=RegExp.$1;
		else
		if(iDayPos>iYearPos) sDay=RegExp.$2;
		}
	if (iYearPos==-1)
		{
		if( iDayPos<iMonthPos) sDay=RegExp.$1;
		else
		if(iDayPos>iMonthPos) sDay=RegExp.$2;
		}
    if(iMonthPos==-1 && iYearPos==-1)
		sDay=RegExp.$1;
		
		while (sDay.indexOf("0")==0 && sDay.length>1) sDay=sDay.substring(1);
		iDay=parseInt(sDay);
		if (iDay==0) iDay=1;
	}
	else
	{iDay=-1;}
	if (iMonthPos != -1	)
	{
    if (iMonthPos<iDayPos && iMonthPos<iYearPos) sMonth=RegExp.$1;
    if (iMonthPos>iDayPos && iMonthPos<iYearPos) sMonth=RegExp.$2;
    if (iMonthPos<iDayPos && iMonthPos>iYearPos) sMonth=RegExp.$2;
    if (iMonthPos>iDayPos && iMonthPos>iYearPos) sMonth=RegExp.$3;
    
    if (iDayPos==-1)
		{
		if( iMonthPos<iYearPos) sMonth=RegExp.$1;
		else
		if(iMonthPos>iYearPos) sMonth=RegExp.$2;
		}
	if (iYearPos==-1)
		{
		if( iMonthPos<iDayPos) sMonth=RegExp.$2;
		else
		if(iMonthPos>iDayPos) sMonth=RegExp.$1;
		}
	if(iDayPos==-1 && iYearPos==-1)
		sMonth=RegExp.$1;
		
   
    while (sMonth.indexOf("0")==0 && sMonth.length>1) sMonth=sMonth.substring(1);
		iMonth=parseInt(sMonth);
	}
	else
		iMonth=-1;
	if(iYearPos != -1)
	{
    if (iYearPos<iMonthPos && iYearPos<iDayPos) sYear=RegExp.$1;
    if (iYearPos>iMonthPos && iYearPos<iDayPos) sYear=RegExp.$2;
    if (iYearPos<iMonthPos && iYearPos>iDayPos) sYear=RegExp.$2;
    if (iYearPos>iMonthPos && iYearPos>iDayPos) sYear=RegExp.$3;
    
    if (iDayPos==-1)
		{
		if(iMonthPos<iYearPos) sYear=RegExp.$2;
		else
		if(iMonthPos>iYearPos) sYear=RegExp.$1;
		}
	if (iMonthPos==-1)
		{
		if(iYearPos<iDayPos) sYear=RegExp.$1;
		else
		if(iYearPos>iDayPos) sYear=RegExp.$2;
		}
	if(iDayPos==-1 && iMonthPos==-1)
		sYear=RegExp.$1;    
	dgtsYr=sYear.length;
    while (sYear.indexOf("0")==0 && sYear.length>1) sYear=sYear.substring(1);
		iYear=parseInt(sYear);
	}
	else
	iYear =-1;
		var arrMonth=new Array(0,31,29,31,30,31,30,31,31,30,31,30,31);
  	if (isNaN(iYear) && isNaN(iMonth) && isNaN(iDay)) return {day:iDay,month:iMonth,year:iYear};
		if (isNaN(iYear)) iYear=dToday.getFullYear();
		if (isNaN(iMonth)) iMonth=dToday.getMonth()+1;
		if (isNaN(iDay) && iMonth==dToday.getMonth()+1) iDay=dToday.getDate();
		if (isNaN(iDay) && iMonth!=dToday.getMonth()+1) iDay=1;
		if (isNaN(iYear) || isNaN(iMonth) || isNaN(iDay)) return {day:iDay,month:iMonth,year:iYear};
		if (iMonth>12) iMonth=12;
		if (iMonth<1) iMonth=1;
		if (iDay>arrMonth[iMonth]) iDay=arrMonth[iMonth];
		if ( dgtsYr != 4 && dgtsYr !=0)
		{
		if (iYear<=20) iYear+=	2000;
		else if (iYear>20 && iYear<=99) iYear+=1900;
		}
		if (iMonth==2 && iDay==29 && (!ur_DateField_isLeapYear(iYear))) iDay=28;
    return {day:iDay,month:iMonth,year:iYear};
  } else {
  	
    return {day:iDay,month:iMonth,year:iYear};
  }
  oEvt.returnValue=false;
  
}
function ur_DateField_getRegExpTest(sValue,sPattern) {
  var sPatternNew="";
  var sEscapeChars="()*$[]\/^{}|. -";
  var sFindNumberPattern="dMy";
  var bFoundNumber=false;
  for (var j=0;j<sPattern.length;j++) {
    if (!bFoundNumber && sFindNumberPattern.indexOf(sPattern.charAt(j))>-1) bFoundNumber=true;
    if (bFoundNumber) {
			if (sEscapeChars.indexOf(sPattern.charAt(j))>-1) sPatternNew=sPatternNew+"[^0-9]{0,1}";
			else sPatternNew+=sPattern.charAt(j);
		}
  }
  sRegPattern=sPatternNew.replace("dd","([0-9]{1,2})");
  sRegPattern=sRegPattern.replace("MM","([0-9]{1,2})");
  sRegPattern=sRegPattern.replace("d","([0-9]{1,2})");
  sRegPattern=sRegPattern.replace("M","([0-9]{1,2})");
  sRegPattern=sRegPattern.replace("yyyy","([0-9]{1,4})");
  sRegPattern=sRegPattern.replace("yy","([0-9]{1,4})");
  var reg=new RegExp(sRegPattern,"ig");
  var arr=reg.exec(sValue);
	if (reg.lastIndex==0) {
		sRegPattern=sPatternNew.replace("dd","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("MM","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("d","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("M","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("yyyy","([0-9]{1,4})");
		sRegPattern=sRegPattern.replace("yy","([0-9]{1,4})");
		var reg=new RegExp(sRegPattern,"ig");
		var arr=reg.exec(sValue);
  }
  if (reg.lastIndex==0 && sValue.length>2) {
		sRegPattern=sPatternNew.replace("dd","([0-9]{2,2})");
		sRegPattern=sRegPattern.replace("MM","([0-9]{2,2})");
		sRegPattern=sRegPattern.replace("d","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("M","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("yyyy","");
		sRegPattern=sRegPattern.replace("yy","");
		if (sRegPattern.indexOf("\\(")==-1 && sRegPattern.indexOf("\\)")==-1) {
		  sRegPattern=sRegPattern.substring(sRegPattern.indexOf("("),sRegPattern.lastIndexOf(")")+1);
		}
		var reg=new RegExp(sRegPattern,"ig");
	  var arr=reg.exec(sValue);
	}
  if (reg.lastIndex==0 && sValue.length>2) {
		sRegPattern=sPatternNew.replace("dd","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("MM","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("d","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("M","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("yyyy","");
		sRegPattern=sRegPattern.replace("yy","");
		if (sRegPattern.indexOf("\\(")==-1 && sRegPattern.indexOf("\\)")==-1) {
		  sRegPattern=sRegPattern.substring(sRegPattern.indexOf("("),sRegPattern.lastIndexOf(")")+1);
		}
		var reg=new RegExp(sRegPattern,"ig");
	  var arr=reg.exec(sValue);
	}
  if (reg.lastIndex==0) {
		sRegPattern=sPatternNew.replace("dd","([0-9]{2,2})");
		sRegPattern=sRegPattern.replace("MM","");
		sRegPattern=sRegPattern.replace("d","([0-9]{1,2})");
		sRegPattern=sRegPattern.replace("M","");
		sRegPattern=sRegPattern.replace("yyyy","");
		sRegPattern=sRegPattern.replace("yy","");
		if (sRegPattern.indexOf("\\(")==-1 && sRegPattern.indexOf("\\)")==-1) {
		  sRegPattern=sRegPattern.substring(sRegPattern.indexOf("("),sRegPattern.lastIndexOf(")")+1);
		}
		var reg=new RegExp(sRegPattern,"ig");
	  var arr=reg.exec(sValue);
	}
	return reg;
}
function ur_DateField_isLeapYear(iYear) {
  return ((iYear % 400 == 0) || ((iYear % 4 == 0) && (iYear % 100 != 0)));
}
function ur_InputField_getFormattedDateString(sId,iDay,iMonth,iYear) {
  var sPattern=ur_DateField_getDatePattern(sId);
  var sFormat=sPattern;
  var s=sPattern.replace("dd",ur_DateField_addZero(iDay));
  s=s.replace("MM",ur_DateField_addZero(iMonth));
  if (iYear<10)
  	s=s.replace("yyyy","000"+iYear);
  else if (iYear<100)
  	s=s.replace("yyyy","00"+iYear);
  else if (iYear<1000) {
  	s=s.replace("yyyy","0"+iYear);
  } else {
  	s=s.replace("yyyy",""+iYear);
  }
  if (iYear<1950) {
    s=s.replace("yy",iYear+"");
  } else {
    s=s.replace("yy",(iYear+"").substring(2));
  }
  s=s.replace("d",iDay+"");
  s=s.replace("M",iMonth+"");
  return s; 
}
function sapUrMapi_DateField_setDate(sId,iDay,iMonth,iYear) {
  var s=ur_InputField_getFormattedDateString(sId,iDay,iMonth,iYear);
	sapUrMapi_InputField_setInvalid(sId,false,"");
	var oldValue=sapUrMapi_InputField_getValue(sId);
	sapUrMapi_InputField_setValue(sId,s)
	sapUrMapi_InputField_triggerOnChange(sId,oldValue,s);
}
function ur_DateField_getDatePattern(sId) {
	var o=ur_get(sId);
	var sFormatString="";
	if (ur_getAttD(o,"tp","")=="DATE") {
	  sFormatString=ur_getAttD(o,"df","");
	}
	if (sFormatString=="") {
	  sFormatString=ur_system.dateformatstring;
	}
	if (sFormatString!=null && sFormatString!="") 
		{
		while(sFormatString.indexOf("'")>-1) {sFormatString=sFormatString.replace("'","");}
		return sFormatString;
		}
	var iFormat=ur_system.dateformat;
	if (iFormat==1) return "dd.MM.yyyy";
	else if (iFormat==2) return "MM/dd/yyyy";
	else if (iFormat==3) return "MM-dd-yyyy";
	else if (iFormat==4) return "yyyy.MM.dd";
	else if (iFormat==5) return "yyyy/MM/dd";
	else if (iFormat==6) return "yyyy-MM-dd";
	else if (iFormat==7) return "dd/MM/yyyy";
	else if (iFormat==8) return "dd-MM-yyyy";
	else return "MM/dd/yyyy";
}
function ur_DateField_addZero(i) {
  return i<10&&i>0?"0"+i:""+i;
}
function ur_getWeek(oDate,minDays) { 
  if (oDate.getFullYear() < 500) return "";
  var x1day = 864e5;
  var x7days = 7*x1day;
  if (oDate.getDay()==0) oDate=new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate()+1);
  var oDateISO = (Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate())/x1day)+(7-minDays);
  var iAbsoluteWeekNum = Math.floor(oDateISO/7); 
  var iWeekYearNum = new Date(iAbsoluteWeekNum*x7days).getUTCFullYear();
  return iAbsoluteWeekNum - Math.floor(Date.UTC(iWeekYearNum-1, 11, 31)/x7days) 
}

//** ItemListBox.nn6 **

function sapUrMapi_ItemListBox_registerCreate(sId,sWidth){
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_ItemListBox_setDim('"+sId+"','"+sWidth+"')");
}
function ur_ItemListBox_getIndex(sId,sKey){
	var o=sapUrMapi_ItemListBox_getObject(sId,document);
	var i=0;
	for(i=0; i<o.itms.length; i++)
		if(o.itms[i].k==sKey)	return i+1;
	return null;
}
function sapUrMapi_ItemListBox_getObject(sId,oDoc,oEvt){
	var o = new Object();
	
	var oR=oDoc.getElementById(sId+"-r");
	if (oR && oR.hasChildNodes() && oR.firstChild.tagName=="XMP") {
	  oR.innerHTML=oR.firstChild.innerHTML; 
	}	
	o.r=oDoc.getElementById(sId);
	
	o.tbl = oDoc.getElementById(sId+'-tbl');
	o.tbd=o.tbl.firstChild;
	
	o.box=o.tbl;
	
	o.scrl=o.tbd;	
	
	o.itms = o.tbl.getElementsByTagName("TR");
	
	var sFocus=o.tbl.getAttribute("focusitm");
	if(sFocus)
		o.focusedItm=o.itms[parseInt(sFocus)-1];
	else
		o.focusedItm=null;
	var sOldFocus=o.tbl.getAttribute("oldfocusitm");
	if(sOldFocus)
		o.oldFocusedItm=o.itms[parseInt(sOldFocus)-1];
	if(o.focusedItm==null)
		o.focusedItm=o.itm;
	
	o.selItms=new Array();
	o.prevItm=null;
	o.nextItm=null;
	var j=0;
	for(var i=0;i<o.itms.length;i++){
		if(o.itms[i].className=="urIlbItmSel"){
			o.selItms[j]=o.itms[i];
			j++;
		}
		if(o.focusedItm!=null&&o.focusedItm==o.itms[i]){
			if(i>0)
				if(o.itms[i-1].name=="HLine") o.prevItm=o.itms[i-2];
				else o.prevItm=o.itms[i-1];
			if(i<o.itms.length-1)
				if(o.itms[i+1].name=="HLine") o.nextItm=o.itms[i+2];
				else o.nextItm=o.itms[i+1];
		}
	}
	if(o.prevItm==null && o.nextItm==null) o.nextItm=o.itms[0];
	
	o.parId=o.tbl.getAttribute("parid");
	
	if(o.parId!=null&&o.parId!="") o.ro = ur_isReadonly(document.getElementById(o.parId));
	else o.ro = ur_isReadonly(o.r);
	o.enbl = !ur_isDisabled(o.r);
	o.inv = ur_isInvalid(o.r);
	o.popup = o.tbl.getAttribute("pop") == "true";
	o.multi = o.tbl.getAttribute("multi") == "true";
	o.size = parseInt(o.tbl.getAttribute("s"));
	o.vissize = parseInt(o.tbl.getAttribute("v"));
	o.userheight = o.tbl.getAttribute("h");
	o.userwidth = o.tbl.getAttribute("w");
	o.cols = o.tbl.getAttribute("cols");
	o.valcol=o.tbl.getAttribute( "vcol" );
	o.icocol=o.tbl.getAttribute( "icol" );
	return o;
}
function sapUrMapi_ItemListBox_getItem(o,sKey){
	for(var i=0; i<o.itms.length;i++){
		if(sKey==o.itms[i].getAttribute("k"))
			return o.itms[i];
	}
	return o.itms[0];
}
function sapUrMapi_ItemListBox_findItem(sId,sSearchString,sStartKey,oDoc) {
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,null);
	if(!o) return;
	
	var bSearchStart=false;
	var sValue="";
	var sFirstKey="";
	var sKey="";
    
	sSearchString=sSearchString.toUpperCase();
	if(!sSearchString) return;
	if(!sStartKey) bSearchStart=true;
    
    for(var i=0; i<o.itms.length;i++){
 		sValue=o.itms[i].firstChild.innerHTML;
		sValue=sValue.substr(0,sSearchString.length);
		sValue=sValue.toUpperCase();
		if(bSearchStart){
			if(sSearchString==sValue){
            sKey=o.itms[i].getAttribute("k");
            return sKey;
            }
		}
		else if(sStartKey==o.itms[i].getAttribute("k")){
			bSearchStart=true;
		}
		if(!sFirstKey && (sSearchString==sValue)){
            sKey=o.itms[i].getAttribute("k");
			sFirstKey=sKey;
		}
    }
	if(sFirstKey){
		return sFirstKey;
	}
}
function sapUrMapi_ItemListBox_setParentId(sId, sParentId)  {
	if (!ur_get(sId)) sapUrMapi_ItemListBox_getObject(sId,document,null);
	var oTbl = document.getElementById(sId+"-tbl");
	oTbl.setAttribute("parid",sParentId);
}
function sapUrMapi_ItemListBox_getSelectedKeys(sId,oDoc){
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,null);
	var aKeys=new Array();
	var j=0;
	for(var i=0; i<o.itms.length;i++){
		if( o.itms[i].className == "urIlbItmSel" ){
			aKeys[j]=o.itms[i].getAttribute("k");
			j++;
		}
	}
	return aKeys;
}
function sapUrMapi_ItemListBox_setSelectedKeys(sId,aKeys,oDoc){
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,null);
	var sKey=aKeys.toString();
	for(var i=0; i<o.itms.length;i++)
		if( sKey.indexOf(o.itms[i].getAttribute("k")) == 0 )
			sapUrMapi_ItemListBox_selectItem(o,o.itms[i],true,null);
}
function sapUrMapi_ItemListBox_setSelectedKey(sId,sKey,oDoc,bScroll){
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,null);
	if(sKey=="") return;
	for(var i=0; i<o.itms.length;i++){
		if( sKey==o.itms[i].getAttribute("k") ){
			sapUrMapi_ItemListBox_turnHighlightOff(o);
			sapUrMapi_ItemListBox_itemSetHighlight(o.itms[i], true);
			sapUrMapi_ItemListBox_focusItem(o,o.itms[i]);
			if(bScroll) sapUrMapi_ItemListBox_scrollIntoView(o,o.itms[i],true);			
			return;
		}
	}
}
function sapUrMapi_ItemListBox_selectHoveredItem(sId,oDoc,oEvt){
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,null);
	for(var i=0; i<o.selItms.length;i++)
		sapUrMapi_ItemListBox_selectItem(o,o.selItms[i],true,oEvt);
}
function sapUrMapi_ItemListBox_getList(sId,doc){
	var o=sapUrMapi_ItemListBox_getObject(sId,doc,null);
	var oCols = new Array();
	var sItmKey = "";
	var sList = "";
	for( var i=0; i<o.itms.length; i++ ){
		sItmKey = o.itms[i].getAttribute("k");
		oCols =  o.itms[i].getElementsByTagName("TD");
		sList += "||";
		sList += oCols[parseInt(o.valcol)-1].innerHTML;
		sList += "|";
		sList += sItmKey;
	}
	if(sList!="") sList+="||";
	return sList;
}
function sapUrMapi_ItemListBox_setDim( sId, sWidth ){
	var o = sapUrMapi_ItemListBox_getObject(sId,document,null);
	
	if( parseInt(o.vissize) > 0 && !isNaN(parseInt(o.vissize)) )
		sapUrMapi_ItemListBox_setSize(o, parseInt(o.vissize));
	else if( parseInt(o.userheight) > 0 && !isNaN(parseInt(o.userheight)) )
		sapUrMapi_ItemListBox_setHeight(o, parseInt(o.userheight));
	
	if( parseInt(sWidth) >= 0 && !isNaN(parseInt(sWidth)) )
		sapUrMapi_ItemListBox_setWidth(o, parseInt(sWidth));
}
function sapUrMapi_ItemListBox_setSize(o,sSize){
	var iHeight = 0;
	var iBorder = 0;
	if(parseInt(sSize) <= 0) return;
	if(parseInt(sSize) >= o.itms.length) return;
	if(o.itms.length > 1)
		iHeight = parseInt(sSize) * parseInt(o.itms[1].offsetHeight) + iBorder + 2*(o.itms[1].offsetHeight-o.itms[0].offsetHeight);
	else
		iHeight = parseInt(sSize) * parseInt(o.itms[0].offsetHeight) + iBorder;
	sapUrMapi_ItemListBox_setHeight(o,iHeight);
}
function sapUrMapi_ItemListBox_setHeight(o,sHeight){
	var iHeight = 0;
	var iNewHeight = 0;
	var iBorder = 0;
	
	if( isNaN(parseInt(sHeight)) || parseInt(sHeight) <= 0 ) return;
	
	iHeight = o.scrl.offsetHeight;
	o.scrl.style.overflow = "-moz-scrollbars-vertical";
	o.scrl.style.height = sHeight;
	iNewHeight = o.scrl.offsetHeight;
	
	if(iHeight <= iNewHeight){
		o.scrl.style.height=iHeight;
		return;
	}
	
	iNewHeight = 0;
	for( var i=0; i<o.itms.length; i++ ){
		if( (iNewHeight + parseInt(o.itms[i].offsetHeight)) > o.scrl.offsetHeight )
			break;
		iNewHeight += parseInt(o.itms[i].offsetHeight);
	}
	iNewHeight = iNewHeight + iBorder;
	
	o.scrl.style.height = iNewHeight;
	o.tbl.setAttribute("s",i);
	if( iNewHeight < iHeight )
		for(var i=0; i<o.itms.length;i++ )
			o.itms[i].lastChild.style.paddingRight = "17px";
}
function sapUrMapi_ItemListBox_setWidth(o,sWidth){
	var iWidth = 0;
	var iNewWidth=parseInt(sWidth);
	if (isNaN(iNewWidth) || iNewWidth<=0) return;
	o.box.style.width = "10px";
		iWidth = o.r.offsetWidth;
	if (iNewWidth<iWidth) return;
	o.box.style.width = iNewWidth;
	o.box.setAttribute("style","width:"+iNewWidth+";");
}
function sapUrMapi_ItemListBox_setReadonly(o,bRo){
  if(bRo){
		for(var i=0; i<o.itms.length; i++)
			if(o.itms[i].className.indexOf("Ro")==-1 && o.itms[i].className.indexOf("Sel")==-1)
				o.itms[i].className += "Ro";
	}
	else if(!bRo){
		for(var i=0; i<o.itms.length; i++)
			if(o.itms[i].className.indexOf("Ro")!=-1)	
				o.itms[i].className=o.itms[i].className.replace("Ro","");
	}
	ur_setReadonly(o.r,bRo);
}
function sapUrMapi_ItemListBox_itemSelected(oItm){
	if( oItm.className == "urIlbItmSel" ) return true;
	return false;
}
function sapUrMapi_ItemListBox_itemSetHighlight(oItm,bOn){
	if( oItm == null || oItm.tagName != "TR" ) return;
	if( bOn && oItm.className != "urIlbItmSel") oItm.className = "urIlbItmSel";
	else if( oItm.className == "urIlbItmSel" ) oItm.className = "urIlbItm";
	else return;
}
function sapUrMapi_ItemListBox_turnHighlightOff(o){
	if(o.selItms==null) return;
	for(var i=0; i<o.selItms.length; i++)
		sapUrMapi_ItemListBox_itemSetHighlight(o.selItms[i],false);
}
function sapUrMapi_ItemListBox_getVal(o,oItm){
	if(o.valcol==null) return null;
	var oCols=oItm.getElementsByTagName("TD");
	var sVal="";
	sVal = oCols[parseInt(o.valcol)-1].childNodes[0].data;
	if( sVal.search(/\s/) == 0 ) sVal = sVal.substr(1,sVal.length);
	return sVal;
}
function sapUrMapi_ItemListBox_getIconSrc(o,oItm){
	if(o.icocol==null || o.icocol=="") return null;
	var oCols=oItm.getElementsByTagName("TD");
	var oIco;
	oIco = oCols[parseInt(o.icocol)-1].firstChild;
	return oIco.style.backgroundImage;
}
function sapUrMapi_ItemListBox_hoverItem(o,oItm){
	if(o.ro) return;
	sapUrMapi_ItemListBox_turnHighlightOff(o);
	sapUrMapi_ItemListBox_itemSetHighlight(oItm, true);
	sapUrMapi_ItemListBox_focusItem(o,oItm);
}
function sapUrMapi_ItemListBox_scrollIntoView(o,oItm,bTop){
	if( (o.tbd.scrollTop > oItm.rowIndex*oItm.offsetHeight) || (o.tbd.scrollTop+o.tbd.clientHeight-5 <= oItm.rowIndex*oItm.offsetHeight) )
		if(!bTop) o.tbd.scrollTop=(oItm.rowIndex-o.size+1)*oItm.offsetHeight;
		else o.tbd.scrollTop=oItm.rowIndex*oItm.offsetHeight;
}
function sapUrMapi_ItemListBox_selectItem(o,oItm,bTop,oEvt){
	if(!o.ro && o.enbl){
		if(!(o.multi&&(oEvt.shiftKey||oEvt.ctrlKey))) sapUrMapi_ItemListBox_deselectAllItems(o);
		sapUrMapi_ItemListBox_itemSetHighlight(oItm,true);
		if(o.popup){
			sapUrMapi_ComboBox_setValue(o.parId,oItm.getAttribute("k"), sapUrMapi_ItemListBox_getVal(o,oItm), sapUrMapi_ItemListBox_getIconSrc(o,oItm),oEvt);
		}
	}
	sapUrMapi_ItemListBox_focusItem(o,oItm);
	sapUrMapi_ItemListBox_scrollIntoView(o,oItm,bTop);
}
function sapUrMapi_ItemListBox_deselectItem(oItm){
	sapUrMapi_ItemListBox_itemSetHighlight(oItm,false);
}
function sapUrMapi_ItemListBox_deselectAllItems(o){
	sapUrMapi_ItemListBox_turnHighlightOff(o);
}
function sapUrMapi_ItemListBox_focusItem(o,oItm){
	o.tbl.setAttribute("focusitm",oItm.rowIndex+1);
	if(o.popup) return;
	try{
		ur_focus(o.r);
	} catch(err){}
}
function sapUrMapi_ItemListBox_mouseover( sId,oDoc,oEvt) {
	var oFrom=oEvt.relatedTarget;
	var oTo=oEvt.target;
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,oEvt);
	
	if( oTo.tagName=="DIV" || oTo.tagName=="SPAN" || o.ro || !o.enbl || o.size==0) return;
	while( oFrom != null && oFrom.tagName != "TR" )
		oFrom = oFrom.parentNode;
	while( oTo != null && oTo.tagName != "TR" )
		oTo = oTo.parentNode;
	if( oTo==null || oTo.name=="HLine" || oFrom==oTo ) return;
	sapUrMapi_ItemListBox_hoverItem(o,oTo);
}
function sapUrMapi_ItemListBox_focus(sId,oDoc,oEvt){
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,oEvt);
	
	if(!o.enbl && !ur_system.is508) return;
	sapUrMapi_DataTip_show(sId,"focus");
	
	if(ur_evtSrc(oEvt).id!=sId) return;
	
	if(o.tbl.getAttribute("tabback")=="true"){
		o.tbl.setAttribute("tabback","false");
		var oNewEvt=oDoc.createEventObject();
		oNewEvt.keyCode="9";
		oNewEvt.shiftKey=true;
		o.r.fireEvent("onkeydown",oNewEvt);
		return;
	}
	
	if(o.selItms.length==0) oItm = o.itms[0];
	else oItm = o.selItms[0];
	
	sapUrMapi_ItemListBox_focusItem(o,oItm);
}
function sapUrMapi_ItemListBox_blur( sId, oEvt ){
	sapUrMapi_DataTip_hide();
}
function sapUrMapi_ItemListBox_click(sId,oDoc,oEvt) {
	
	var oItm=ur_evtSrc(oEvt);
	if(oItm.tagName!="TD") return;
	while(oItm.tagName!="TR"){
		if(oItm.getAttribute("ct")=="ItemListBox") return;
		oItm=oItm.parentNode;
	}
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,oEvt);
	var bSel = false;
	
	
	if( o.multi == true && oEvt.ctrlKey == false )
		sapUrMapi_ItemListBox_deselectAllItems(o);
	
	if(oEvt.shiftKey == true && o.multi == true  && (o.focusedItm != oItm) && o.oldFocusedItm != null){
		var oStart=o.oldFocusedItm;
		if(oStart.rowIndex < oItm.rowIndex)
			for(var i=oStart.rowIndex;i<=oItm.rowIndex;i++)
				sapUrMapi_ItemListBox_selectItem(o,o.itms[i],true, oEvt);
		else
			for(var i=oStart.rowIndex;i>=oItm.rowIndex;i--)
				sapUrMapi_ItemListBox_selectItem(o,o.itms[i],true, oEvt);
	}
	
	else{
		sapUrMapi_ItemListBox_selectItem(o, oItm, true,oEvt);
		o.tbl.setAttribute( "oldfocusitm", oItm.rowIndex+1 );
	}
	return sapUrMapi_cancelEvent(oEvt);
}
function sapUrMapi_ItemListBox_keypress( sId,oDoc,oEvt){
	var o=sapUrMapi_ItemListBox_getObject(sId,oDoc,oEvt);
	if (o.popup) return;
  
  if( oEvt.charCode > 0){
    var sSearchChar = String.fromCharCode(oEvt.charCode);
    var sSelectedKey = "";
    if (o.selItms.length > 0) {
      sSelectedKey = o.selItms[o.selItms.length-1].getAttribute("k");
    }
    var sNewKey = sapUrMapi_ItemListBox_findItem(sId,sSearchChar,sSelectedKey,oDoc);
    if (sNewKey!="") sapUrMapi_ItemListBox_setSelectedKey(sId,sNewKey,oDoc,true);
  }  
}
function sapUrMapi_ItemListBox_keydown( sId, doc, e ){
	var o=sapUrMapi_ItemListBox_getObject(sId, doc, e);
	var iItmIdx = 0;
	
	if(e.keyCode == "81" && e.ctrlKey ){
		sapUrMapi_DataTip_show(sId,"keydown");
		return sapUrMapi_cancelEvent(e);
	}
	
	
	if(e.keyCode == "27"){
		sapUrMapi_DataTip_hide();
		return sapUrMapi_cancelEvent(e);
	}
	
	
	if(e.keyCode=="9"  && e.shiftKey==true ){
		if(ur_evtSrc(e).tagName!="SPAN"){
			o.tbl.setAttribute("tabback","true");
			ur_focus(o.r);
		}
		return true;
	}
	
	
	if( e.keyCode =="38" && o.prevItm != null ){
		if( e.ctrlKey && o.multi )
			sapUrMapi_ItemListBox_focusItem(o,o.prevItm);
		else if( sapUrMapi_ItemListBox_itemSelected(o.prevItm) && o.multi){
			sapUrMapi_ItemListBox_deselectItem(o.focusedItm);
			sapUrMapi_ItemListBox_focusItem(o,o.prevItm);
		}
		else
			sapUrMapi_ItemListBox_selectItem(o, o.prevItm,true, e );
		return sapUrMapi_cancelEvent(e);
	}
	
	
	if( e.keyCode =="40" && o.nextItm != null ){
		if( e.ctrlKey && o.multi )
			sapUrMapi_ItemListBox_focusItem(o,o.nextItm);
		else if( sapUrMapi_ItemListBox_itemSelected(o.nextItm) && o.multi == true ){
			sapUrMapi_ItemListBox_deselectItem(o.focusedItm);
			sapUrMapi_ItemListBox_focusItem(o,o.nextItm);
		}
		else
			sapUrMapi_ItemListBox_selectItem(o, o.nextItm,false, e );
		return sapUrMapi_cancelEvent(e);
	}
	
	
	if( e.ctrlKey && e.keyCode == "32"  && o.multi ){
		if( sapUrMapi_ItemListBox_itemSelected(o.focusedItm) )
			sapUrMapi_ItemListBox_deselectItem(o.focusedItm);
		else
			sapUrMapi_ItemListBox_selectItem(o, o.focusedItm,true, e);
		return sapUrMapi_cancelEvent(e);
	}
	
	
	if( e.keyCode == "36" ){
		sapUrMapi_ItemListBox_selectItem(o, o.itms[0],true, e );
    return sapUrMapi_cancelEvent(e);
	}
	
	
	if( e.keyCode == "35" ){
		sapUrMapi_ItemListBox_selectItem(o, o.itms[o.itms.length-1],false, e );
		return sapUrMapi_cancelEvent(e);
	}
		
	
	if( e.keyCode=="33" && o.size!=null ){
		iItmIdx = o.focusedItm.rowIndex - o.size + 1;
			if( iItmIdx < 0 ) iItmIdx = 0;
		sapUrMapi_ItemListBox_selectItem(o, o.itms[iItmIdx],true, e );
		return sapUrMapi_cancelEvent(e);
	}
	
	
	if( e.keyCode == "34" && o.size!=null ){
		iItmIdx = o.focusedItm.rowIndex + o.size - 1;
		if( iItmIdx > o.tbd.lastChild.rowIndex ) iItmIdx = o.tbd.lastChild.rowIndex;
		sapUrMapi_ItemListBox_selectItem(o, o.itms[iItmIdx],false, e);
		return sapUrMapi_cancelEvent(e);
	}
}

//** Label.ie5 **

function sapUrMapi_Label_setDisabled(oLbl) {
	if(oLbl==null || oLbl.className.indexOf("Dsbl")>-1) return;
	if(oLbl.className.indexOf("Std")>-1)
		oLbl.className=oLbl.className.replace("LblStd","LblDsbl");
	else
		oLbl.className=oLbl.className.replace("Lbl","LblDsbl");
}
function sapUrMapi_Label_setEnabled(oLbl) {
	if (oLbl==null) return;
	oLbl.className=oLbl.className.replace("Dsbl","Std");
}
function sapUrMapi_Label_setInvalid(oLbl,bSet) {
	if (oLbl==null) return;
	
	if(!bSet){
		oLbl.className=oLbl.className.replace("Inv","");
		return;
	}
	
	if(oLbl.className.indexOf("Inv")>-1) return;
	if (oLbl.className.indexOf("Bar")>-1) 
		oLbl.className=oLbl.className.replace("Bar","InvBar");
	else
		oLbl.className+="Inv";
}
function sapUrMapi_Label_getInputLabel(sId) {
	var ur_arrLabels = document.getElementsByTagName("LABEL");
	for (var i=0;i<ur_arrLabels.length;i++) {
		if (ur_arrLabels.item(i).getAttribute("f")==sId) {
			return ur_arrLabels.item(i);
		}
	}
	for (var i=0;i<ur_arrLabels.length;i++) {
		if (ur_arrLabels.item(i).getAttribute("htmlFor")==sId) {
			return ur_arrLabels.item(i);
		}
	}
	return null;
}
function sapUrMapi_Label_getLabel(sId) {
	return sapUrMapi_Label_getInputLabel(sId);
}
function sapUrMapi_Label_FocusLabeledElement(sForId) {
  sapUrMapi_focusElement(sForId);
}
function sapUrMapi_Label_getLabelText(sId) {
	var oLbl=sapUrMapi_Label_getLabel(sId);
	if(oLbl==null) return null;
	return oLbl.innerText;
}
function sapUrMapi_Label_clickLabeledElement(sId,sForId,oEvt) {
	var o=ur_get(sForId);
	try{
		if(o.getAttribute("ct")=="CheckBox" || o.getAttribute("ct")=="RadioButton") o.click();
		else ur_focus(o);
	} catch(e){}
}
function sapUrMapi_Label_focus(sId,sForId,oEvt) {
	var o=ur_evtSrc(oEvt);
	if(ur_system.is508 && sForId!="") o.title=ur_getTooltip(sForId,sForId,false);
}

//** Link.ie5 **

function sapUrMapi_Link_activate(sLinkId,e) {
	oLink = document.getElementById(sLinkId);
	if (oLink.getAttribute("hasmenu")=="true") {
		if (sapUrMapi_checkKey(e,"keydown",new Array("32","40"))) {
			if (oLink.onclick) {oLink.onclick();return false;} 
			if (oLink.oncontextmenu) {oLink.oncontextmenu();return false;} 
			if (oLink.onmouseover) {oLink.onmouseover();return false;} 
		}
  } else {
		if (sapUrMapi_checkKey(e,"keydown",new Array("32"))) { 
  	  return true;
  	}
  }
  return false;
}

//** ListBox.ie5 **

function sapUrMapi_ListBox_focus(sId,e) {
    
	sapUrMapi_DataTip_show(sId,"focus");
}
function sapUrMapi_ListBox_blur(sId,event) {
	sapUrMapi_DataTip_hide(sId);
}
function sapUrMapi_ListBox_keydown(sId,oEvt) {
	if(oEvt.keyCode == "81" && oEvt.ctrlKey && !oEvt.altKey ){
		oEvt.keyCode = "";
		oEvt.cancelBubble = true;
		oEvt.returnValue = false;
		if (sapUrMapi_DataTip_isOpen(sId)) sapUrMapi_DataTip_hide(sId);
		else sapUrMapi_DataTip_show(sId,"keydown");
	}
	if(oEvt.keyCode == "27"){
		oEvt.keyCode = "";
		oEvt.cancelBubble = true;
		oEvt.returnValue = false;
		sapUrMapi_DataTip_hide(sId);
	}
}

//** LoadingAnimation.nn6 **

var _ur_LoadingAni_delay = 2000;
var _ur_LoadingAni_timerId = null;
var _ur_LoadingPopup = null;
function sapUrMapi_LoadingAnimation_getObject() {
	return document.getElementById("ur-loading");
}
function sapUrMapi_LoadingAnimation_getText() {
	var oLAText = document.getElementById("ur-loading");
	oLAText = oLAText.firstChild.lastChild;
	return oLAText.innerHTML;
}
function sapUrMapi_LoadingAnimation_trigger() {
	_ur_LoadingAni_timerId = ur_callDelayed("sapUrMapi_LoadingAnimation_show('ur-loading')", _ur_LoadingAni_delay);
}
function sapUrMapi_LoadingAnimation_show(sId) {
	if (_ur_LoadingAni_timerId) {
		var arrUrls = new Array(ur_system.stylepath+"ur_pop_"+ur_system.browser_abbrev+".css");
		_ur_LoadingPopup = new sapPopup(window,arrUrls,document.getElementById("ur-loading"),document.getElementById("ur-loading"),null,0);
		_ur_LoadingPopup.positionbehavior=sapPopupPositionBehavior.BROWSERCENTER;
		_ur_LoadingPopup.show(true);
		_ur_LoadingAni_timerId = null;
	}
}
function sapUrMapi_LoadingAnimation_cancel() {
	if (_ur_LoadingAni_timerId) {
		clearTimeout(_ur_LoadingAni_timerId);
	_ur_LoadingAni_timerId = null;
	} else {
		sapUrMapi_LoadingAnimation_hide();
}
}
function sapUrMapi_LoadingAnimation_hide() {
	if (_ur_LoadingPopup!=null) {
	   _ur_LoadingPopup.hide();
	   _ur_LoadingPopup=null;
        }
}

//** MenuBar.nn6 **

function sapUrMapi_MenuBar_hover(sId,e){
	var oTxt=document.getElementById(sId+"-txt");
	var oBtn=document.getElementById(sId+"-btn");
	if (oTxt.className == "urMenuItemTxtStdHover") {
	   oTxt.className = "urMenuItemTxtStd";
	   oBtn.className = "urMenuItemBtnStd";
	   return;
	  }
	else
	  if (oTxt.className == "urMenuItemTxtStdDsbl"){
	     oTxt.className = "urMenuItemTxtStdDsbl";
		 oBtn.className = "urMenuItemBtnStdDsbl";
		 return;
		}
	   else
	     if(oTxt.className == "urMenuItemTxtTrnDsbl") {
	        oTxt.className = "urMenuItemTxtTrnDsbl";
			oBtn.className = "urMenuItemBtnTrnDsbl";
			return;
		}
	      else
		  	if(oTxt.className == "urMenuItemTxtTrn") {
				oTxt.className = "urMenuItemTxtTrnHover";
				oBtn.className = "urMenuItemBtnTrnHover";
				return;
			}
			else
			  if(oTxt.className == "urMenuItemTxtTrnHover")	{
			  	  oTxt.className = "urMenuItemTxtTrn";
				  oBtn.className = "urMenuItemBtnTrn";
				  return;
				}
				else
  	        oTxt.className ="urMenuItemTxtStdHover";
			oBtn.className ="urMenuItemBtnStdHover";
			return;
}

//** MessageBar.ie5 **
enumUrMessageBarType = {ERROR:"Error",WARNING:"Warning",OK:"Ok",STOP:"Stop",LOADING:"Loading",NONE:"None",TEXT:"Text"};
function sapUrMapi_MessageBar_setAccText(sId,vMessageBarType) {
	var oMBar = document.getElementById(sId);
	var oMTxt = document.getElementById(sId+"-txt");
	var sMTxt = oMTxt.innerText;
	if (oMTxt.getAttribute("tt")!=null && oMTxt.getAttribute("tt")!="") sMTxt=oMTxt.getAttribute("tt");
	var sType = vMessageBarType.toUpperCase(); 
	var bHasConId = oMBar.onclick!=null;
	var sTxt = "";
	if (bHasConId) sTxt="SAPUR_MSG_JUMPKEY"; 
	if (vMessageBarType!=enumUrMessageBarType.TEXT) {
		if (ur_system.is508) {
			oMBar.title=getLanguageText("SAPUR_MSG",new Array("SAPUR_MSG_"+sType,sMTxt,sTxt));
		} else {
		  oMBar.title=sMTxt;
		}
	} else {
		if (ur_system.is508) {
			oMBar.title=getLanguageText("SAPUR_MSG",new Array("",sMTxt,sTxt));
		} else {
		  oMBar.title=sMTxt;
		}
	}
}
function sapUrMapi_MessageBar_setType(sId,vMessageBarType) {
	var oMBar = document.getElementById(sId);
	sapUrMapi_MessageBar_setAccText(sId,vMessageBarType);
	if (vMessageBarType==enumUrMessageBarType.NONE) {
		oMBar.style.display = 'none';
		return;
	} else {
		if (vMessageBarType==enumUrMessageBarType.ERROR || vMessageBarType==enumUrMessageBarType.STOP) oMBar.className="urMsgBarErr";
		else oMBar.className="urMsgBarStd";
		oMBar.style.display = 'block';
    var oMBarImg  = document.getElementById(sId+"-img");
    if (vMessageBarType!=enumUrMessageBarType.TEXT) {
    	oMBarImg.style.display="inline";
      oMBarImg.className = "urMsgBarImg"+vMessageBarType;
    } else {
    	oMBarImg.style.display="none";
    }
	}
}
function sapUrMapi_MessageBar_getType(sId) {
	var oMBar = document.getElementById(sId);
  if (oMBar.style.display == 'none') {
  	return enumUrMessageBarType.NONE;
  } else {
    var oMBarImg  = document.getElementById(sId+"-img");
    if ((oMBarImg.className).indexOf(enumUrMessageBarType.ERROR)>-1) return enumUrMessageBarType.ERROR;
    if ((oMBarImg.className).indexOf(enumUrMessageBarType.WARNING)>-1) return enumUrMessageBarType.WARNING;
    if ((oMBarImg.className).indexOf(enumUrMessageBarType.LOADING)>-1) return enumUrMessageBarType.LOADING;
    if ((oMBarImg.className).indexOf(enumUrMessageBarType.STOP)>-1) return enumUrMessageBarType.STOP;
    if ((oMBarImg.className).indexOf(enumUrMessageBarType.OK)>-1) return enumUrMessageBarType.OK;
    if ((oMBarImg.style.display).indexOf("none")>-1) return enumUrMessageBarType.TEXT;
  }
}
function sapUrMapi_MessageBar_setText(sId,sText) {
	var oMBarText = document.getElementById(sId+"-txt");
	oMBarText.innerHTML = sText;
	sapUrMapi_MessageBar_setAccText(sId,sapUrMapi_MessageBar_getType(sId));
}
function sapUrMapi_MessageBar_getText(sId) {
	var oMBarText = document.getElementById(sId+"-txt");
	return oMBarText.innerHTML;
}
function sapUrMapi_MessageBar_navigateToField(sId,sConId,oEvt) {
  
  if ((oEvt.type=="click") || (sapUrMapi_checkKey(oEvt,"keydown",new Array("32")))) {
    
    sapUrMapi_cancelEvent(oEvt);
    sapUrMapi_triggerFocus(sConId);
  }
}

//** Paginator.nn6 **

UR_PAGINATOR_BUTTON = {BEGIN:0, PREVIOUS_PAGE:1, PREVIOUS_ITEM:2,NEXT_ITEM:3,NEXT_PAGE:4,END:5};
function sapUrMapi_Paginator_setStates(sId, arrBtns, arrStates) {
	var oPaginator  = document.getElementById(sId);
	var oButton;
	var bHorizontal = oPaginator.getAttribute("ur_direction")=="horizontal";
	for (var n=0;n<arrBtns.length;n++) {
		try {
			oButton= document.getElementById(sId+"-btn-"+arrBtns[n]);
		  if (oButton==null) continue;
		} catch (e) {
		  continue;
		}
	  var sBtnTxt="";
	  if (arrBtns[n]==UR_PAGINATOR_BUTTON.BEGIN) sBtnTxt="SAPUR_PAG_IBEGIN";
	  if (arrBtns[n]==UR_PAGINATOR_BUTTON.PREVIOUS_PAGE) sBtnTxt="SAPUR_PAG_PPREV";
	  if (arrBtns[n]==UR_PAGINATOR_BUTTON.PREVIOUS_ITEM) sBtnTxt="SAPUR_PAG_IPREV";
	  if (arrBtns[n]==UR_PAGINATOR_BUTTON.NEXT_ITEM) sBtnTxt="SAPUR_PAG_INEXT";
	  if (arrBtns[n]==UR_PAGINATOR_BUTTON.NEXT_PAGE) sBtnTxt="SAPUR_PAG_PNEXT";
	  if (arrBtns[n]==UR_PAGINATOR_BUTTON.END) sBtnTxt="SAPUR_PAG_IEND";
		if (arrStates[n]) {
		  if (oButton.getAttribute("dsbl")=="true") {
		  	var arrClass=oButton.className.split(" ");
		  	oButton.className=arrClass[0].substring(0,arrClass[0].length-4)+" "+arrClass[1].substring(0,arrClass[1].length-4);
		  	oButton.setAttribute("dsbl","false");
				if (oButton.getAttribute("oc")!=null && oButton.getAttribute("oc")!="") {
					oButton.onclick=new Function("event",oButton.getAttribute("oc"));   
				} 
		  	if (ur_system.is508) {
  		    oButton.title = getLanguageText("SAPUR_WHL3",new Array(sBtnTxt,"SAPUR_PAG_BTN","SAPUR_PAG_BTN_TUTOR"));
		  	}
		  }
		} else {
		  if (oButton.getAttribute("dsbl")=="false") {
		  	var arrClass=oButton.className.split(" ");
		  	oButton.className=arrClass[0]+"Dsbl "+arrClass[1]+"Dsbl"; 
		  	oButton.setAttribute("dsbl","true");
				oButton.onclick=null;
		  	if (ur_system.is508) {
  		    oButton.title = getLanguageText("SAPUR_WHL3",new Array(sBtnTxt,"SAPUR_PAG_BTN","SAPUR_DISABLED"));
		  	}
		  }
		}
	}
}
function sapUrMapi_Paginator_buttonDisabled(o) {
  if (o.onclick!=null) {
    return o.getAttribute("dsbl")=="true";
  } else {
    return sapUrMapi_Paginator_buttonDisabled(o.parentNode);
  }
}
function sapUrMapi_Paginator_getInputValue(sId) {
  var oInp=document.getElementById(sId+"-inp");
  if (oInp!=null) return parseInt(oInp.value);
}
function sapUrMapi_Paginator_setInputValue(sId,iNewValue) {
  var oInp=document.getElementById(sId+"-inp");
  if (oInp!=null) oInp.value=iNewValue;
}
function sapUrMapi_Paginator_keydown(sId,sConId,oEvt) {
  o=ur_evtSrc(oEvt);
  if (o.tagName=="INPUT") return;
  if (o.className.indexOf("urBtnIco")>-1) { 
	  if (!sapUrMapi_Paginator_buttonDisabled(o)) {
      o.click();
    }
  }
}
function sapUrMapi_Paginator_navBegin(sId,sConId,oEvt) {
  o=ur_evtSrc(oEvt);
	if (!sapUrMapi_Paginator_buttonDisabled(o)) {
		var arrButtonArray = new Array();
		arrButtonArray[0]=UR_PAGINATOR_BUTTON.PREVIOUS_PAGE;
		arrButtonArray[1]=UR_PAGINATOR_BUTTON.PREVIOUS_ITEM;
		arrButtonArray[2]=UR_PAGINATOR_BUTTON.BEGIN;
		arrButtonArray[3]=UR_PAGINATOR_BUTTON.NEXT_PAGE;
		arrButtonArray[4]=UR_PAGINATOR_BUTTON.NEXT_ITEM;
		arrButtonArray[5]=UR_PAGINATOR_BUTTON.END;
		var arrStateArray = new Array();
		arrStateArray[0]=false;
		arrStateArray[1]=false;
		arrStateArray[2]=false;
		arrStateArray[3]=true;
		arrStateArray[4]=true;
		arrStateArray[5]=true;
		sapUrMapi_Paginator_setStates(sId,arrButtonArray,arrStateArray);
		try {
	    if (sapUrMapi_getControlType(sConId)=="PatternContainerSequence") 
	      sapUrMapi_bounceItem(sConId,-1,"PATTERNCONTAINERSEQUENCE");
			if (sapUrMapi_getControlType(sConId)=="PatternContainerTab") 
				sapUrMapi_bounceItem(sConId,-1,"PATTERNCONTAINERTAB");
	  } catch (ex) {}  
		return true;
  }
  return false
}
function sapUrMapi_Paginator_navEnd(sId,sConId,oEvt) {
  o=ur_evtSrc(oEvt);
	if (!sapUrMapi_Paginator_buttonDisabled(o)) {
		var arrButtonArray = new Array();
		arrButtonArray[0]=UR_PAGINATOR_BUTTON.NEXT_PAGE;
		arrButtonArray[1]=UR_PAGINATOR_BUTTON.NEXT_ITEM;
		arrButtonArray[2]=UR_PAGINATOR_BUTTON.END;
		arrButtonArray[3]=UR_PAGINATOR_BUTTON.PREVIOUS_PAGE;
		arrButtonArray[4]=UR_PAGINATOR_BUTTON.PREVIOUS_ITEM;
		arrButtonArray[5]=UR_PAGINATOR_BUTTON.BEGIN;
		var arrStateArray = new Array();
		arrStateArray[0]=false;
		arrStateArray[1]=false;
		arrStateArray[2]=false;
		arrStateArray[3]=true;
		arrStateArray[4]=true;
		arrStateArray[5]=true;
		sapUrMapi_Paginator_setStates(sId,arrButtonArray,arrStateArray);
		try {
	    if (sapUrMapi_getControlType(sConId)=="PatternContainerSequence") 
	      sapUrMapi_bounceItem(sConId,1,"PATTERNCONTAINERSEQUENCE");
			if (sapUrMapi_getControlType(sConId)=="PatternContainerTab") 
				sapUrMapi_bounceItem(sConId,1,"PATTERNCONTAINERTAB");
	  } catch (ex) {}  
		return true;
  }
  return false;
}
function sapUrMapi_Paginator_navPrevPage(sId,sConId,oEvt) {
  o=ur_evtSrc(oEvt);
	if (!sapUrMapi_Paginator_buttonDisabled(o)) {
		try {
	    if (sapUrMapi_getControlType(sConId)=="PatternContainerSequence") 
	      sapUrMapi_pageItem(sConId,-1,"PATTERNCONTAINERSEQUENCE");
			if (sapUrMapi_getControlType(sConId)=="PatternContainerTab") 
				sapUrMapi_pageItem(sConId,-1,"PATTERNCONTAINERTAB");
	  } catch (ex) {}  
		return true;
  }
  return false;
}
function sapUrMapi_Paginator_navNextPage(sId,sConId,oEvt) {
  o=ur_evtSrc(oEvt);
	if (!sapUrMapi_Paginator_buttonDisabled(o)) {
		try {
	    if (sapUrMapi_getControlType(sConId)=="PatternContainerSequence") 
	      sapUrMapi_pageItem(sConId,1,"PATTERNCONTAINERSEQUENCE");
			if (sapUrMapi_getControlType(sConId)=="PatternContainerTab") 
				sapUrMapi_pageItem(sConId,1,"PATTERNCONTAINERTAB");
	  } catch (ex) {}  
		return true;
  }
  return false;
}
function sapUrMapi_Paginator_navPrev(sId,sConId,oEvt) {
  o=ur_evtSrc(oEvt);
	if (!sapUrMapi_Paginator_buttonDisabled(o)) {
		try {
	      if (sapUrMapi_getControlType(sConId)=="PhaseIndicator") 
	        sapUrMapi_PhaseIndicator_paging(sConId,"BACK");
	    if (sapUrMapi_getControlType(sConId)=="PatternContainerSequence") 
	      sapUrMapi_scrollItem(sConId,-1,"PATTERNCONTAINERSEQUENCE");
			if (sapUrMapi_getControlType(sConId)=="PatternContainerTab") 
				sapUrMapi_scrollItem(sConId,-1,"PATTERNCONTAINERTAB");
	    } catch (ex) {}  
		return true;
  }
  return false;
}
function sapUrMapi_Paginator_navNext(sId,sConId,oEvt) {
  o=ur_evtSrc(oEvt);
	if (!sapUrMapi_Paginator_buttonDisabled(o)) {
    try {
	    if (sapUrMapi_getControlType(sConId)=="PhaseIndicator") 
	      sapUrMapi_PhaseIndicator_paging(sConId,"FURTHER");
	    if (sapUrMapi_getControlType(sConId)=="PatternContainerSequence") 
	      sapUrMapi_scrollItem(sConId,1,"PATTERNCONTAINERSEQUENCE");
	    if (sapUrMapi_getControlType(sConId)=="PatternContainerTab") 
	      sapUrMapi_scrollItem(sConId,1,"PATTERNCONTAINERTAB");
	  } catch (ex) {}  
		return true;
  }
  return false;
}
function sapUrMapi_Paginator_showMenu(sId,sMenuId,sConId,oEvt) {
  sapUrMapi_PopupMenu_showMenu(sId+"-menu",sMenuId,sapPopupPositionBehavior.MENURIGHT,oEvt);
}
function sapUrMapi_Paginator_enrichParameters(sConId) {
	try {
		if (sapUrMapi_getControlType(sConId)=="PhaseIndicator") {
	  	return sapUrMapi_PhaseIndicator_getFirstVisible(ur_get(sConId));
	   }
	} catch (ex) {}  
	return "";
}
//** PatternContainerContentItem.nn7 **

function sapUrMapi_Pc_Resize(sId) {
	sapUrMapi_Resize_AddItem(sId, "sapUrMapi_PcTabSeq_Draw('" + sId + "')");
}
function sapUrMapi_Pc_RegisterCreate(sId) {
	sapUrMapi_PcTabSeq_Create(sId);
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_PcTabSeq_Draw('" + sId + "')");
}
function sapUrMapi_Pc_toggle(sId, sCtlType, e) {
	if ((e.type!="click") && (!sapUrMapi_checkKey(e,"keydown",new Array("32","30")))) return false;
	e.cancelBubble=true;
	var tbdy = document.getElementById(sId+"-tbd");
	var tbl = tbdy.parentNode;
	var tbar = document.getElementById(sId+"-tbar");
	var thead = document.getElementById(sId+"-hd");
	var ico = document.getElementById(sId+"-exp");
	if ( tbdy != null && ico != null ) {
		if ( tbdy.style.display == "none" ) {
			if (tbar) tbar.style.display = "";
			tbdy.style.display = "";
			
			if (tbl.getAttribute("sized") != "true"){
				sapUrMapi_Pc_Create(sId, tbl.getAttribute("scrolltype"), false );
			}
			if (ico.className.indexOf("urPcExpClosedIco") != -1){ ico.className = ico.className.replace("urPcExpClosedIco", "urPcExpOpenIco");}
			if (thead != null && thead.className == "urPcHdBgClosedIco" ){ thead.className = "urPcHdBgOpenIco";}
			if (ur_system.is508) {
				ico.title=getLanguageText(sCtlType + "_COLLAPSE",new Array(thead.innerText,sCtlType + "_COLLAPSE_KEY"));
			}
		} else {
			if (tbar){ tbar.style.display = "none";}
			var helper = tbdy.parentNode.offsetWidth;
			tbdy.style.display = "none";
			tbdy.parentNode.style.width=helper+"px";
			if (ico.className.indexOf("urPcExpOpenIco") != -1 ){ ico.className = ico.className.replace("urPcExpOpenIco", "urPcExpClosedIco");}
			if (thead != null && thead.className == "urPcHdBgOpenIco" ){ thead.className = "urPcHdBgClosedIco";}
			if (ur_system.is508) {
				ico.title=getLanguageText(sCtlType + "_EXPAND",new Array(thead.innerText, sCtlType + "_EXPAND_KEY"));
			}
	}
		
		sapUrMapi_focusElement(sId+"-exp")
}
	return true;
}
function sapUrMapi_Pc_showOptionMenu(sId,e) {
  var sTrayId=sId;
  var sTriggerId=sId+"-menu";
  var sMenuContentId=ur_get(sTriggerId).getAttribute("mid");
 	if (ur_system.direction=="rtl")
	  var enumPositionBehavior=sapPopupPositionBehavior.MENULEFT;
	else
	  var enumPositionBehavior=sapPopupPositionBehavior.MENURIGHT;
  var sControlType=sapUrMapi_getControlTypeFromObject(ur_get(sId)).toUpperCase();
	switch (sControlType) {
		case "PATTERNCONTAINERTAB" :
			if (e.type!="click") {
				if (sapUrMapi_checkKey(e,"keydown",new Array("32","40","13"))){
					sapUrMapi_PopupMenu_showMenu(sTriggerId,sMenuContentId,enumPositionBehavior,e);
				}
				else if (sapUrMapi_checkKey(e,"keydown",new Array("39","37"))) {
					var intTabCount = parseInt(document.getElementById(sTrayId + "-tbl").getAttribute("tabcount"));
					if (ur_system.direction=="rtl") {
					  sapUrMapi_PcTabs_focusItem(sTrayId,null,null,e.keyCode==37,e.keyCode==39);
					} else {
					  sapUrMapi_PcTabs_focusItem(sTrayId,null,null,e.keyCode==39,e.keyCode==37);
					}
					return;
				}
				else {
					return false;
				}
			}
			else {
				sapUrMapi_PopupMenu_showMenu(sTriggerId,sMenuContentId,enumPositionBehavior,e);
			}
			break;
		case "PATTERNCONTAINERSEQUENCE" :
			if (e.type!="click") {
				if (sapUrMapi_checkKey(e,"keydown",new Array("32","40","13"))){
					sapUrMapi_PopupMenu_showMenu(sTriggerId,sMenuContentId,enumPositionBehavior,e);
				}
				else if (sapUrMapi_checkKey(e,"keydown",new Array("39","37"))) {
					var intTabCount = parseInt(document.getElementById(sTrayId + "-tbl").getAttribute("tabcount"));
					if (ur_system.direction=="rtl") {
					  sapUrMapi_PcSeq_focusItem(sTrayId,null,null,e.keyCode==37,e.keyCode==39);
					} else {
					  sapUrMapi_PcSeq_focusItem(sTrayId,null,null,e.keyCode==39,e.keyCode==37);
					}
					return;
				}
				else {
					return false;
				}
			}
			else {
				sapUrMapi_PopupMenu_showMenu(sTriggerId,sMenuContentId,enumPositionBehavior,e);
			}
			break;
		case "PATTERNCONTAINERTITLE" :
			if (e.type!="click") {
				if (sapUrMapi_checkKey(e,"keydown",new Array("32","40","13"))){
					sapUrMapi_PopupMenu_showMenu(sTriggerId,sMenuContentId,enumPositionBehavior,e);
				}
			}
			else {
			  sapUrMapi_PopupMenu_showMenu(sTriggerId,sMenuContentId,enumPositionBehavior,e);
			}
			break;
		default :
			return;
	}
}
function sapUrMapi_PcTab_Resize(sId) {
	sapUrMapi_Resize_AddItem(sId, "sapUrMapi_PcTabSeq_Draw('" + sId + "')");
}
function sapUrMapi_PcTabSeq_RegisterCreate(sId) {
	sapUrMapi_PcTabSeq_Create(sId);
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_PcTabSeq_Draw('" + sId + "')");
}
var sapUrMapi_PcTabSeq_Registry = new Array();
function sapUrMapi_PcTabSeq_Create(sId) {
	sapUrMapi_PcTabSeq_Registry[sId] = false;
	
	var bCollapsed = document.getElementById(sId).getAttribute("collapsed");
	var tbl = document.getElementById(sId + "-tbd").parentNode;
	if (bCollapsed == "true"){
		tbl.setAttribute("sized", "false");
	}
	else{
		tbl.setAttribute("sized", "true");
	}
	
	sapUrMapi_Resize_AddItem(sId, "sapUrMapi_PcTabSeq_Draw('" + sId + "')");
	sapUrMapi_PcTabSeq_Registry[sId] = true;
}
function sapUrMapi_PcTabSeq_Draw() {
	var divlist = new Array();
	var tbdylist = new Array();
	var iIdx = "null";
	for (var ctls in sapUrMapi_PcTabSeq_Registry) {
		if (ctls.indexOf("_") == 0) {continue;}
		var tbdy = document.getElementById(ctls + "-tbd");
		tbdylist[ctls] = tbdy;
		divlist[ctls] = null;
		if (tbdy.style.display == "none") {
			continue;
		}
		iIdx = document.getElementById(ctls + "-tbl").getAttribute("selectedtab");
		if (iIdx == -9999) {
			iIdx = "Title";
		}
		var div = document.getElementById(ctls + "-cnt-" + iIdx);
		if (div==null) return;
		divlist[ctls] = div;
		for (i = 0; i < div.childNodes.length; i++) {
			if (div.childNodes[i].nodeType == 1) {div.childNodes[i].style.display = "none";}
		}
	}
	for (var ctls in sapUrMapi_PcTabSeq_Registry) {
		if ((ctls.indexOf("_") == 0) || (tbdylist[ctls].style.display == "none")) {
			continue;
		}
		var div = divlist[ctls];
		var maxWidth = parseInt(div.offsetWidth);
		for (var i = 0; i < div.childNodes.length; i++) {
			if (div.childNodes[i].nodeType == 1) {div.childNodes[i].style.width = (maxWidth - 1) + "px";}
		}
	}
	for (var ctls in sapUrMapi_PcTabSeq_Registry) {
		if ((ctls.indexOf("_") == 0) || (tbdylist[ctls].style.display == "none")) {
			continue;
		}
		var div = divlist[ctls];
		for (var i = 0; i < div.childNodes.length; i++) {
			if (div.childNodes[i].nodeType == 1) {
			if (div.childNodes[i].style.display == "none") {
				div.childNodes[i].style.display = "";
				}
			}
		}
	}
}
function sapUrMapi_PcTabs_getSelectedItemId(sTabStripId) {
  var oTabTable 	= document.getElementById(sTabStripId+"-tbl");
	var iSelTab			=	parseInt(oTabTable.getAttribute("selectedtab"));
	return sTabStripId+"-itm-"+iSelTab;
}
function sapUrMapi_PcTabs_focusItem(sTabStripId,iFocusIdx,iTabCount,bNext,bPrev) {
	var oTabTable = document.getElementById(sTabStripId+"-tbl");
	if (isNaN(iFocusIdx)) {iFocusIdx = parseInt(oTabTable.getAttribute("selectedtab"));}
	if (isNaN(iTabCount)) {iTabCount = parseInt(oTabTable.getAttribute("tabcount"));}
	var ico = document.getElementById(sTabStripId + "-menu");
	var iNewIndex=iFocusIdx;
	if (ico != null && ico.getAttribute("hasfocus") == "true") {
		if (bNext) {
			iNewIndex = parseInt(oTabTable.getAttribute("starttab"));
		}
		if (bPrev) {
			iNewIndex = parseInt(oTabTable.getAttribute("starttab")) - 1 + parseInt(oTabTable.getAttribute("vistabs"));
		}
	}
	else {
		if (bNext) {
			if (iFocusIdx<iTabCount-1) iNewIndex=iFocusIdx+1;
			else iNewIndex=0;
		}
		if (bPrev) {
			if (iFocusIdx>0) iNewIndex=iFocusIdx-1;
			else iNewIndex=iTabCount-1;
		}
	}
	oFocusedTab = document.getElementById(sTabStripId+"-itm-"+iNewIndex);
	if (oFocusedTab.style.display != "none") {
		var iOldFoc     = parseInt(oTabTable.getAttribute("focusedtab"));
		if (!isNaN(iOldFoc)) {
			sapUrMapi_setTabIndex(document.getElementById(sTabStripId+"-itm-"+iOldFoc+"-txt"),-1);
		}
		var oFoc = document.getElementById(sTabStripId+"-itm-"+iNewIndex+"-txt");
		sapUrMapi_setTabIndex(oFoc,0);
		
		sapUrMapi_focusElement(oFoc.id);
		oTabTable.setAttribute("focusedtab",iNewIndex);
		if (ico != null) {
			ico.setAttribute("hasfocus", "false");
		}
		if ((oFocusedTab.getAttribute("dsbl")=="true")&&(!ur_system.is508)) {
			sapUrMapi_PcTabs_focusItem(sTabStripId,iNewIndex,iTabCount,bNext,bPrev);
			return;
		}
	}
	else {
	    if (ico != null) {
			sapUrMapi_setTabIndex(ico,0);
			ico.setAttribute("hasfocus", "true");
			sapUrMapi_focusElement(ico.id);
	    }
	}
}
function sapUrMapi_PcTabs_enter (sId,e) {
	if (e.target.id==sId+"-skipstart") {
		if (sapUrMapi_Skip(sId,true,e)) return;
    if (!e.shiftKey) { 
		  if (sapUrMapi_checkKey(e,"keydown",new Array("9","39","37"))){
	      sapUrMapi_PcTabs_focusItem(sId);
			  e.cancelBubble=false;
		  }
	  }
	}
}
function sapUrMapi_PcTabs_setActiveItem(sId,iIdx) {
	with (document) {
		var oTabTable 	= getElementById(sId+"-tbl");
		var tbdy = getElementById(sId+"-tbd");
		var iSelTab			=	parseInt(oTabTable.getAttribute("selectedtab"));
		var iTabLength	=	parseInt(oTabTable.getAttribute("tabcount"));
		var iCurIdx = parseInt(oTabTable.getAttribute("starttab"));
		var iVisTabs = parseInt(oTabTable.getAttribute("vistabs"));
		if (isNaN(iIdx)) return;
		if (getElementById(sId+"-itm-"+iIdx).getAttribute("dsbl")=="true") return false; 
		if ((iTabLength==1) || (iSelTab==iIdx)) return true; 
		var oCurrentTxt  = getElementById(sId+"-itm-"+iSelTab+"-txt");
		var oCurrentCell = getElementById(sId+"-itm-"+iSelTab);
		var oCurrentCon = getElementById(sId+"-itm-"+iSelTab+"-c");
		var oClickedTxt  = getElementById(sId+"-itm-"+iIdx+"-txt");
		var oClickedCell = getElementById(sId+"-itm-"+iIdx);
		var oClickedCon = getElementById(sId+"-itm-"+iIdx+"-c");
		var oFirstImage  = getElementById(sId+"-p");
		var oLastImage   = getElementById(sId+"-n");
		if (oCurrentCell != null){
			oCurrentCell.className="urPcTbsLabelOff"; 
			oCurrentTxt.className = "urPcTbsTxtOff";  
			if (oCurrentCon != null){
				oCurrentCon.className = "urPcConOff";	
			}
		}
		oClickedTxt.className = "urPcTbsTxtOn";   
		oClickedCell.className="urPcTbsLabelOn";  
		if (oClickedCon != null){
			oClickedCon.className = "urPcConOn";	
		}
		
		if (iCurIdx != 0){
			if (iIdx!=iCurIdx){oFirstImage.className="urPcTbsFirstAngOffPrevOn"; }
			else{oFirstImage.className="urPcTbsFirstAngOnPrevOn"; }
		}
		else{
			if (iIdx!=iCurIdx){oFirstImage.className="urPcTbsFirstAngOffPrevOff"; }
			else{oFirstImage.className="urPcTbsFirstAngOnPrevOff"; }
		}
		
		if (iCurIdx + iVisTabs >= iTabLength){
			if (iIdx == iTabLength - 1){
				oLastImage.className="urPcTbsLastOnNextOff"; 
			}
			else{
				if (iIdx != (iCurIdx + iVisTabs - 1)){oLastImage.className="urPcTbsLastOffNextOff"; }
				else{oLastImage.className="urPcTbsLastOnNextOff"; }
			}
		}
		else{  
			if (iIdx != (iCurIdx + iVisTabs - 1))oLastImage.className="urPcTbsLastOffNextOn"; 
			else{oLastImage.className="urPcTbsLastOnNextOn"; }
		}
		
		if (iSelTab == iCurIdx){
			getElementById(sId+"-itm-"+(iSelTab)+"-a").className="urPcTbsAngOffOff";
			getElementById(sId+"-itm-"+(iSelTab+1)+"-a").className="urPcTbsAngOffOff";
		} else  {
			getElementById(sId+"-itm-"+(iSelTab)+"-a").className="urPcTbsAngOffOff";
			if (iSelTab != iTabLength - 1){
				getElementById(sId+"-itm-"+(iSelTab+1)+"-a").className="urPcTbsAngOffOff";
			}
		}
		
		if (iIdx==iCurIdx){
			getElementById(sId+"-itm-"+(iIdx)+"-a").className="urPcTbsAngOffOn";
			getElementById(sId+"-itm-"+(iIdx+1)+"-a").className="urPcTbsAngOnOff";
		} else {
			getElementById(sId+"-itm-"+(iIdx)+"-a").className="urPcTbsAngOffOn";
			if (iIdx != iTabLength - 1) {
				getElementById(sId+"-itm-"+(iIdx+1)+"-a").className="urPcTbsAngOnOff";
			}
		}
		oTabTable.setAttribute("selectedtab",iIdx); 
		sapUrMapi_PcTabs_focusItem(sId,iIdx); 
		
		var oCurrentContent  = getElementById(sId+"-cnt-"+iSelTab);
		var oClickedContent  = getElementById(sId+"-cnt-"+iIdx);
		
		if (tbdy.style.display != "none") {
			var maxwidth = parseInt(oCurrentContent.clientWidth);
			for (var i = 0; i < oClickedContent.childNodes.length; i++){
				oClickedContent.childNodes[i].style.width = (maxwidth - 1) + "px";
				}
			}
		
		oClickedContent.className = "urPcTbsDspSel";
		oCurrentContent.className = "urPcTbsDsp";
	}
	if (ur_system.is508) {
		oClickedTxt.title = getLanguageText("SAPUR_PCTABS_ITEM",new Array(oClickedTxt.innerText,"SAPUR_PCTABS_ITEM_SELECTED"));
		oCurrentTxt.title = getLanguageText("SAPUR_PCTABS_ITEM",new Array(oCurrentTxt.innerText,"SAPUR_PCTABS_ITEM_ENABLED"));
	}
	return true
}
function sapUrMapi_PcTabs_keySelect(sId, iSelectedIdx, iTabCount,e) {
	if (sapUrMapi_checkKey(e,"keydown",new Array("39","37"))){
	  if (ur_system.direction=="rtl") {
	    sapUrMapi_PcTabs_focusItem(sId,iSelectedIdx,iTabCount,e.keyCode==37,e.keyCode==39);
		return;
	  } else {
		sapUrMapi_PcTabs_focusItem(sId,iSelectedIdx,iTabCount,e.keyCode==39,e.keyCode==37);
		return;
	  }
	}
	if (sapUrMapi_checkKey(e,"keydown",new Array("32"))){
		sapUrMapi_PcTabs_setActiveItem(sId,iSelectedIdx,0,false);
		return;
	}
}
function sapUrMapi_PcSeq_setActiveItem(sId, iIdx, iOldIdx, bIsTitle) {
	with(document) {
		var maxwidth = 0;
		var oTbl = getElementById(sId+"-tbl");
		var tbdy = getElementById(sId+"-tbd");
		var iOldIdx = parseInt(oTbl.getAttribute("selectedtab"));
		var iTabLength = parseInt(oTbl.getAttribute("tabcount"));
		var iNewIdx = parseInt(oTbl.getAttribute("starttab"));
		var iVisTabs = parseInt(oTbl.getAttribute("vistabs"));
		
		
		if (isNaN(iIdx)){return;}
		if ((iTabLength==1) || (iOldIdx==iIdx)){ return true; }
		
		
		if (iIdx != -9999){
			
			var oClkCell = getElementById(sId + "-itm-" + iIdx);
			if (oClkCell.getAttribute("dsbl")=="true" || oClkCell.className.indexOf("Term") != -1){ return false; }
		}
		
		if (iOldIdx == -9999){
			
			
			var oCurTxt = getElementById(sId + "-tit-txt");
			var oCurCon = getElementById(sId + "-itm-tit-cn");
			var oCurContent  = getElementById(sId+"-cnt-tit");
			maxwidth = parseInt(oCurContent.clientWidth);
			
			if (oCurTxt != null){
				oCurTxt.className = "urPcTitTxt";
			}
			
			if (oCurCon != null){
				oCurCon.className = "urPcConOff";
			}
			
			oCurContent.className = "urPcSeqDsp";
		}
		else if (iOldIdx >=0 && iOldIdx < iTabLength){
			
			
			var oCurTxt = getElementById(sId + "-itm-" + iOldIdx + "-txt");
			var oCurCell = getElementById(sId + "-itm-" + iOldIdx);
			var oCurCon = getElementById(sId + "-itm-" + iOldIdx + "-c");
			var oCurStpCell = getElementById(sId + "-itm-" + iOldIdx + "-n");
			var oCurStpTxt = getElementById(sId + "-itm-" + iOldIdx + "-na");
			var oCurContent  = getElementById(sId+"-cnt-"+iOldIdx);
			maxwidth = parseInt(oCurContent.clientWidth);
			if (oCurCell != null){
				
				oCurCell.className="urPcSeqLabelOff";
				oCurTxt.className = "urPcSeqTxtOff";
				if (oCurStpCell != null){
					var re = /On/gi;
					var clsNm = oCurStpCell.className;
					
					oCurStpCell.className = clsNm.replace(re, "Off");
					oCurStpTxt.className = "urPcSeqStpTxtOff";
				}
				
				if (oCurCon != null){
					oCurCon.className = "urPcConOff";
				}
			}
			
			oCurContent.className = "urPcSeqDsp";
		}
		
		
		var newHt = 0;
		if (iIdx == -9999){
			
			
			var oClkTxt  = getElementById(sId + "-tit-txt");
			var oClkCon = getElementById(sId + "-itm-tit-cn");
			var oClkContent  = getElementById(sId+"-cnt-tit");
			
			if (oClkCon != null){
				oClkCon.className = "urPcConOn";
			}
			
			if (tbdy.style.display != "none") {
				for (var i = 0; i < oClkContent.childNodes.length; i++){
					oClkContent.childNodes[i].style.width = (maxwidth - 1) + "px";
					}
				}
			oClkContent.className = "urPcSeqDspSel";
		}
		else{
			
			
			var oClkCell = getElementById(sId + "-itm-" + iIdx);
			var oClkTxt  = getElementById(sId + "-itm-" + iIdx + "-txt");
			var oClkCon = getElementById(sId + "-itm-" + iIdx + "-c");
			var oClkStpCell = getElementById(sId + "-itm-" + iIdx + "-n");
			var oClkStpTxt = getElementById(sId + "-itm-" + iIdx + "-na");
			var oClkContent  = getElementById(sId+"-cnt-"+iIdx);
			if (oClkCell != null){
				
				oClkCell.className="urPcSeqLabelOn";
				oClkTxt.className = "urPcSeqTxtOn";
				if (oClkStpCell != null){
					var re = /Off/gi;
					var clsNm = oClkStpCell.className;
					
					oClkStpCell.className = clsNm.replace(re, "On");
					oClkStpTxt.className = "urPcSeqStpTxtOn";
				}
			}
			
			if (oClkCon != null){
				oClkCon.className = "urPcConOn";
			}
			
			if (tbdy.style.display != "none") {
				for (var i = 0; i < oClkContent.childNodes.length; i++){
					oClkContent.childNodes[i].style.width = (maxwidth - 1) + "px";
					}
				}
			oClkContent.className = "urPcSeqDspSel";
		}
		
		if (iOldIdx != -9999){
			if (iOldIdx == iNewIdx){
				var img = getElementById(sId+"-itm-"+(iOldIdx)+"-a");
				if ( img != null) {
					if (img.style.display == "none") {
					  img.className="urPcSeqAngOffOff";
						img.style.display = "none";
					}
					else {
					  img.className="urPcSeqAngOffOff";
					}
				}
				var td = getElementById(sId+"-itm-"+(iOldIdx+1)+"-a");
				if (td.className.indexOf("Term") == -1){
					td.className="urPcSeqAngOffOff";
				}
				else{
					 td.className="urPcSeqAngOffTerm";
				}
			}
			else if (iOldIdx >=0 && iOldIdx < iTabLength){
				getElementById(sId+"-itm-"+(iOldIdx)+"-a").className="urPcSeqAngOffOff";
				if (iOldIdx < iTabLength){
					var td = getElementById(sId+"-itm-"+(iOldIdx+1)+"-a");
					if (td != null) {
					       if (td.className.indexOf("Term") == -1){
						       td.className="urPcSeqAngOffOff";
					       }
					       else{
						       td.className="urPcSeqAngOffTerm";
						}
					}
				}
			}
		}
		
		if (iIdx==iNewIdx){
				var td = getElementById(sId+"-itm-"+(iIdx+1)+"-a");
				if (getElementById(sId+"-itm-"+(iIdx)+"-a") != null) {
				  getElementById(sId+"-itm-"+(iIdx)+"-a").className="urPcSeqAngOffOn";
				}
				if (td.className.indexOf("Term") == -1){
					td.className="urPcSeqAngOnOff";
				}
				else{
					td.className="urPcSeqAngOnTerm";
				}
		}
		else{
			if (iIdx != -9999){
				getElementById(sId+"-itm-"+(iIdx)+"-a").className="urPcSeqAngOffOn";
			}
			if (iIdx != -9999 && iIdx != iTabLength - 1) {
				var td = getElementById(sId+"-itm-"+(iIdx+1)+"-a");
				if (td.className.indexOf("Term") == -1){
					td.className="urPcSeqAngOnOff";
				}
				else{
					td.className="urPcSeqAngOnTerm";
				}
			}
		}
		
		var oFirstImage  = getElementById(sId+"-p");
		var oLastImage   = getElementById(sId+"-n");
		
		if (iNewIdx != 0){
			
			if (iIdx!=iNewIdx){oFirstImage.className="urPcSeqFirstAngOffPrevon";}
			
			else{oFirstImage.className="urPcSeqFirstAngOnPrevon";}
		}
		else{
			
			if (iIdx!=iNewIdx){oFirstImage.className="urPcSeqFirstAngOffPrevoff";}
			
			else{oFirstImage.className="urPcSeqFirstAngOnPrevoff";}
		}
		
		if (iNewIdx + iVisTabs >= iTabLength){
			
			if (iIdx != (iNewIdx + iVisTabs - 1) && iIdx != iTabLength - 1){
				if (oLastImage.className.indexOf("Branch") != -1){
					oLastImage.className="urPcSeqLastOffBranchOn";
				}
				else if (oLastImage.className.indexOf("Term") != -1){
					
				}
				else{
					oLastImage.className="urPcSeqLastOffNextOn";
				}
			}
			else{ 
				if (oLastImage.className.indexOf("Branch") != -1){
					oLastImage.className="urPcSeqLastOnBranchOn";
				}
				else if (oLastImage.className.indexOf("Term") != -1){
					
				}
				else{
					oLastImage.className="urPcSeqLastOnNextOn";
				}
			}
		}
		else{
			
			if (iIdx != (iNewIdx + iVisTabs - 1) && iIdx != iTabLength - 1){
				if (oLastImage.className.indexOf("Branch") != -1){
					oLastImage.className="urPcSeqLastOffBranchOn";
				}
				else if (oLastImage.className.indexOf("Term") != -1){
				}
				else{
					oLastImage.className="urPcSeqLastOffNextOn";
				}
			}
			else{
				if (oLastImage.className.indexOf("Branch") != -1){
					oLastImage.className="urPcSeqLastOnBranchOn";
				}
				else if (oLastImage.className.indexOf("Term") != -1){
				}
				else{
					oLastImage.className="urPcSeqLastOnNextOn";
				}
			}
		}
		
		oTbl.setAttribute("selectedtab",iIdx);
		
		if (iIdx != -1){
			sapUrMapi_PcSeq_focusItem(sId,iIdx);
		}
		if (ur_system.is508) {
			oClkTxt.title = getLanguageText("SAPUR_PCSEQ_ITEM",new Array(oClkTxt.innerText,"SAPUR_PCSEQ_ITEM_SELECTED"));
			if (oCurTxt != null) {
				oCurTxt.title = getLanguageText("SAPUR_PCSEQ_ITEM",new Array(oCurTxt.innerText,"SAPUR_PCSEQ_ITEM_ENABLED"));
			}
		}
	}
}
function sapUrMapi_PcSeq_focusItem(sSeqId, iIdx, iTabCount, bNext, bPrev) {
	var oTabTable 	= document.getElementById(sSeqId+"-tbl");
	if (isNaN(iIdx)) {iIdx = parseInt(oTabTable.getAttribute("selectedtab"));}
	if (isNaN(iTabCount)) {iTabCount = parseInt(oTabTable.getAttribute("tabcount"));}
	var ico = document.getElementById(sSeqId + "-menu");
	
	if (iIdx == -9999) {return false;}
	var iNewIndex=iIdx;
	if (ico != null && ico.getAttribute("hasfocus") == "true") {
		if (bNext) {
			iNewIndex = parseInt(oTabTable.getAttribute("starttab"));
		}
		if (bPrev) {
			iNewIndex = parseInt(oTabTable.getAttribute("starttab")) - 1 + parseInt(oTabTable.getAttribute("vistabs"));
			if (document.getElementById(sSeqId+"-itm-"+iNewIndex+"-txt").getAttribute("design") == "term") {
				iNewIndex--;
			}
		}
	}
	else {
		if (bNext) {
			
			if (iIdx<iTabCount-1){ iNewIndex=iIdx+1;}
			else {iNewIndex=0;}
		}
		if (bPrev) {
			if (iIdx>0) {iNewIndex=iIdx-1;}
			else {iNewIndex=iTabCount-1;}
		}
	}
	oFocusedTab = document.getElementById(sSeqId+"-itm-"+iNewIndex);
	if (oFocusedTab.style.display != "none") {
		var iOldFoc = parseInt(oTabTable.getAttribute("focusedtab"));
		if (!isNaN(iOldFoc)) {
			if (iOldFoc == -9999) {
			  sapUrMapi_setTabIndex(document.getElementById(sSeqId+"-tit-txt"),-1);
			}
			else {
			sapUrMapi_setTabIndex(document.getElementById(sSeqId+"-itm-"+iOldFoc+"-txt"),-1);
			}
		}
		var oFoc = document.getElementById(sSeqId+"-itm-"+iNewIndex+"-txt");
		if (oFoc.getAttribute("design") != "term") {
			sapUrMapi_setTabIndex(oFoc,0);
			
			sapUrMapi_focusElement(sSeqId+"-itm-"+iNewIndex+"-txt");
			oTabTable.setAttribute("focusedtab",iNewIndex);
			if (ico != null) {
				ico.setAttribute("hasfocus", "false");
			}
			if ((oFocusedTab.getAttribute("dsbl")=="true")&&(!ur_system.is508)) {
				sapUrMapi_PcSeq_focusItem(sSeqId,iNewIndex,iTabCount,bNext,bPrev);
				return;
			}
		}
		else {
			if (ico != null && ico.getAttribute("hasfocus") != "true") {
				sapUrMapi_setTabIndex(ico,0);
				ico.setAttribute("hasfocus", "true");
				
				sapUrMapi_focusElement(document.getElementById(sSeqId + "-menu"));
			}
			else {
				sapUrMapi_PcSeq_focusItem(sSeqId,iNewIndex,iTabCount,bNext,bPrev);
				return;
			}
		}
	}
	else {
	    if (ico != null) {
			sapUrMapi_setTabIndex(ico,0);
			ico.setAttribute("hasfocus", "true");
			
			sapUrMapi_focusElement(document.getElementById(sSeqId + "-menu"));
	    }
	}
}
function sapUrMapi_PcSeq_keySelect(sId, iSelectedIdx, iTabCount,e) {
	if (sapUrMapi_checkKey(e,"keydown",new Array("39","37"))){
	  if (ur_system.direction=="rtl") {
	    sapUrMapi_PcSeq_focusItem(sId,iSelectedIdx,iTabCount,e.keyCode==37,e.keyCode==39);
		return;
	  } else {
		sapUrMapi_PcSeq_focusItem(sId,iSelectedIdx,iTabCount,e.keyCode==39,e.keyCode==37);
		return;
	  }
	}
	if (sapUrMapi_checkKey(e,"keydown",new Array("32"))){
		sapUrMapi_PcSeq_setActiveItem(sId,iSelectedIdx,0,false);
		return;
	}
}
function sapUrMapi_scrollItem( sId, iDir, sCtlType ){
	sCtlType=sCtlType.toUpperCase();
	if (iDir != -1 && iDir != 1){
		return false;
	}
	var oTabs = document.getElementById(sId + "-tbl");
	var tabcount = parseInt(oTabs.getAttribute("tabcount"));
	var firsttab = parseInt(oTabs.getAttribute("starttab"));
	var tabpage = parseInt(oTabs.getAttribute("tabpage"));
	var vistabs = parseInt(oTabs.getAttribute("vistabs"));
	var lasttab = parseInt(oTabs.getAttribute("lasttab"));
	var diff = vistabs;
	if (isNaN(lasttab)){
		if (firsttab + vistabs >= tabcount){lasttab = tabcount - 1;}
		else{lasttab = firsttab + vistabs - 1;}
	}
	if (lasttab != firsttab + vistabs - 1){
		diff = lasttab - firsttab;
	}
	if (iDir == 1){
		
		if (lasttab == tabcount - 1){return false;}
		
		SCROLL_FUNCTIONS[sCtlType](sId, firsttab, false, true, false);
		
		firsttab += 1;
		SCROLL_FUNCTIONS[sCtlType](sId, firsttab, true, true, false);
		if (diff > 2) {
			
			SCROLL_FUNCTIONS[sCtlType](sId, lasttab, true, false, false);
		}
		if (diff != 1) {
		
		lasttab += 1;
		SCROLL_FUNCTIONS[sCtlType](sId, lasttab, true, false, true);
	}
	else{
		
		lasttab = firsttab;
		SCROLL_FUNCTIONS[sCtlType](sId, lasttab, true, true, true);
		}
	}
	else{
		
		if (firsttab == 0){return false;}
		
		
		if (diff >= vistabs - 1){
			
			SCROLL_FUNCTIONS[sCtlType](sId, lasttab, false, false, true);
			
			lasttab -= 1;
			SCROLL_FUNCTIONS[sCtlType](sId, lasttab, true, false, true);
		}
		if (diff > 1) {
		
		SCROLL_FUNCTIONS[sCtlType](sId, firsttab, true, false, false);
		
		firsttab -= 1;
		SCROLL_FUNCTIONS[sCtlType](sId, firsttab, true, true, false);
	}
		else {
		
    SCROLL_FUNCTIONS[sCtlType](sId, firsttab, true, false, true);
		firsttab -= 1;
		SCROLL_FUNCTIONS[sCtlType](sId, firsttab, true, true, true);
		}
	}
	
	ICON_FUNCTIONS[sCtlType]( sId, firsttab, lasttab, tabcount );
	
	var newtabpage = Math.floor(firsttab / vistabs);
	oTabs.setAttribute("starttab", firsttab);
	oTabs.setAttribute("lasttab", lasttab);
	sapUrMapi_Pc_togglePager(sId)
}
function sapUrMapi_pageItem( sId, iDir, sCtlType ){
	sCtlType=sCtlType.toUpperCase();
	if (iDir != 1 && iDir != -1){
		return false;
	}
	var oTabs = document.getElementById(sId + "-tbl");
	var tabcount = parseInt(oTabs.getAttribute("tabcount"));
	var firsttab = parseInt(oTabs.getAttribute("starttab"));
	var tabpage = parseInt(oTabs.getAttribute("tabpage"));
	var vistabs = parseInt(oTabs.getAttribute("vistabs"));
	var lasttab = parseInt(oTabs.getAttribute("lasttab"));
	if (isNaN(lasttab)){
		if (firsttab + vistabs >= tabcount){lasttab = tabcount - 1;}
		else{lasttab = firsttab + vistabs-1;}
	}
	
	if ((iDir == -1 && firsttab == 0) || ( iDir == 1 && lasttab == tabcount -1)){
		return false;
	}
	
	if (((iDir == 1) && ((tabpage + iDir) * vistabs) < (tabcount)) ||
		((iDir == -1) && (tabpage + iDir >= 0) )){
		tabpage = tabpage + iDir;
	}
	
	var lbound = Math.floor(tabpage * vistabs);
	var ubound = lbound + vistabs - 1;
	
	if (ubound > tabcount - 1){
		ubound = tabcount -1;
	}
	
	for (var i = 0; i < tabcount; i++){
		
		if (i < lbound || i > ubound){
			if (i == firsttab){
				SCROLL_FUNCTIONS[sCtlType](sId, i, false, true, false);
			}
			else if (i == lasttab){
				SCROLL_FUNCTIONS[sCtlType](sId, i, false, false, true);
			}
			else{
			   SCROLL_FUNCTIONS[sCtlType](sId, i, false, false, false);
			}
		}
		else{
		   if (i == lbound){
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, true, false);
		   }
		   else if (i == tabcount -1 || i == ubound){
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, false, true);
		   }
		   else{
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, false, false);
		   }
		}
	}
	
	ICON_FUNCTIONS[sCtlType]( sId, lbound, ubound, tabcount );
	
	oTabs.setAttribute("starttab", lbound);
	oTabs.setAttribute("lasttab", ubound);
	oTabs.setAttribute("tabpage", tabpage);
	sapUrMapi_Pc_togglePager(sId)
}
function sapUrMapi_boundsItem( sId, iDir, sCtlType ){
	sCtlType=sCtlType.toUpperCase();
	if (iDir != 1 && iDir != -1){
		return false;
	}
	var oTabs = document.getElementById(sId + "-tbl");
	var tabcount = parseInt(oTabs.getAttribute("tabcount"));
	var firsttab = parseInt(oTabs.getAttribute("starttab"));
	var tabpage = parseInt(oTabs.getAttribute("tabpage"));
	var vistabs = parseInt(oTabs.getAttribute("vistabs"));
	var lasttab = parseInt(oTabs.getAttribute("lasttab"));
	if (isNaN(lasttab)){
		if (firsttab + vistabs >= tabcount){lasttab = tabcount - 1;}
		else{lasttab = firsttab + vistabs-1;}
	}
	
	if ((iDir == -1 && firsttab == 0) || ( iDir == 1 && lasttab == tabcount -1)){
		return false;
	}
	
	if (iDir == 1){
		tabpage = Math.ceil(tabcount / vistabs) - 1;
	}
	else{
		tabpage = 0;
	}
	
	var lbound = Math.floor(tabpage * vistabs);
	var ubound = lbound + vistabs - 1;
	
	if (ubound > tabcount - 1){
		ubound = tabcount -1;
	}
	
	for (var i = 0; i < tabcount; i++){
		
		if (i < lbound || i > ubound){
			if (i == firsttab){
				SCROLL_FUNCTIONS[sCtlType](sId, i, false, true, false);
			}
			else if (i == lasttab){
				SCROLL_FUNCTIONS[sCtlType](sId, i, false, false, true);
			}
			else{
			   SCROLL_FUNCTIONS[sCtlType](sId, i, false, false, false);
			}
		}
		else{
		   if (i == lbound){
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, true, false);
		   }
		   else if (i == tabcount -1 || i == ubound){
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, false, true);
		   }
		   else{
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, false, false);
		   }
		}
	}
	
	ICON_FUNCTIONS[sCtlType]( sId, lbound, ubound, tabcount );
	
	oTabs.setAttribute("starttab", lbound);
	oTabs.setAttribute("lasttab", ubound);
	oTabs.setAttribute("tabpage", tabpage);
	sapUrMapi_Pc_togglePager(sId)
}
function sapUrMapi_jumpItem( sId, iTab, sCtlType ){
	sCtlType=sCtlType.toUpperCase();
	var oTabs = document.getElementById(sId + "-tbl");
	var tabcount = parseInt(oTabs.getAttribute("tabcount"));
	var firsttab = parseInt(oTabs.getAttribute("starttab"));
	var vistabs = parseInt(oTabs.getAttribute("vistabs"));
	var lasttab = parseInt(oTabs.getAttribute("lasttab"));
	var seltab = parseInt(oTabs.getAttribute("selectedtab"));
	if (isNaN(lasttab)){
		if (firsttab + vistabs >= tabcount){lasttab = tabcount - 1;}
		else{lasttab = firsttab + vistabs-1;}
	}
	
	if (iTab >= tabcount || iTab < 0){
		return false;
	}
	
	var tabpage = Math.floor(iTab / vistabs);
	
	var lbound = Math.floor(tabpage * vistabs);
	var ubound = lbound + vistabs - 1;
	
	if (ubound > tabcount - 1){
		ubound = tabcount -1;
	}
	
	for (var i = 0; i < tabcount; i++){
		
		if (i < lbound || i > ubound){
			if (i == firsttab){
				SCROLL_FUNCTIONS[sCtlType](sId, i, false, true, false);
			}
			else if (i == lasttab){
				SCROLL_FUNCTIONS[sCtlType](sId, i, false, false, true);
			}
			else{
			   SCROLL_FUNCTIONS[sCtlType](sId, i, false, false, false);
			}
		}
		else{
		   if (i == lbound){
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, true, false);
		   }
		   else if (i == tabcount -1 || i == ubound){
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, false, true);
		   }
		   else{
				SCROLL_FUNCTIONS[sCtlType](sId, i, true, false, false);
		   }
		}
	}
	
	oTabs.setAttribute("starttab", lbound);
	oTabs.setAttribute("lasttab", ubound);
	oTabs.setAttribute("tabpage", tabpage);
	sapUrMapi_Pc_togglePager(sId)
	
	
	SELECT_FUNCTIONS[sCtlType](sId, iTab, seltab, false);
	
	ICON_FUNCTIONS[sCtlType]( sId, lbound, ubound, tabcount );
}
function showTab(sId, iIdx, bShow, bIsFirst, bIsLast ){
	
	var oTabs = document.getElementById(sId + "-tbl");
	var tabcount = parseInt(oTabs.getAttribute("tabcount"));
	var tabimg = document.getElementById(sId + "-itm-" + iIdx + "-a");
	var tabcell = document.getElementById(sId + "-itm-" + iIdx);
	
	var conimg = document.getElementById(sId + "-itm-" + iIdx + "-ca");
	var concell = document.getElementById(sId + "-itm-" + iIdx + "-c");
	if (bShow){
		
		if (!bIsFirst && !bIsLast){
			tabimg.style.display = "";
			tabcell.style.display = "";
			if (concell != null){
				concell.style.display = "";
				conimg.style.display = "";
			}
		}
		else if (bIsFirst){
			tabimg.style.display = "none";
			tabcell.style.display = "";
			if (concell != null){
				concell.style.display = "";
				conimg.style.display = "none";
			}
		}
		else if (bIsLast && !bIsFirst){
			tabimg.style.display = "";
			tabcell.style.display = "";
			if (concell != null){
				concell.style.display = "";
				conimg.style.display = "";
			}
		}
	}
	else{
		
		tabimg.style.display = "none";
		tabcell.style.display = "none";
		if (concell != null){
			concell.style.display = "none";
			conimg.style.display = "none";
		}
	}
}
function setTabIcons( sId, firsttab, lasttab, tabcount ){
	var prev = document.getElementById(sId + "-p");
	var next = document.getElementById(sId + "-n");
	var first = document.getElementById(sId + "-itm-" + firsttab);
	var last = document.getElementById(sId + "-itm-" + lasttab);
	var prevtmp = prev.className;
	var nexttmp = next.className
	
	if (firsttab == 0){
		if (first.className.indexOf("LabelOn") != -1){
			prev.className = "urPcTbsFirstAngOnPrevOff";
		}
		else{
			prev.className = "urPcTbsFirstAngOffPrevOff";
		}
	}
	else{
		if (first.className.indexOf("LabelOn") != -1){
			prev.className = "urPcTbsFirstAngOnPrevOn";
		}
		else{
			prev.className = "urPcTbsFirstAngOffPrevOn";
		}
	}
	
	if (lasttab == tabcount - 1){
		if (last.className.indexOf("LabelOn") != -1){
			next.className = "urPcTbsLastOnNextOff";
		}
		else{
			next.className = "urPcTbsLastOffNextOff";
		}
	}
	else{
		if (last.className.indexOf("LabelOn") != -1){
			next.className = "urPcTbsLastOnNextOn";
		}
		else{
			next.className = "urPcTbsLastOffNextOn";
		}
	}
	prev.childNodes.item(0).className = "urPcTbsPreFirstAng";
	next.childNodes.item(0).className = "urPcTbsAfterLastAng";
}
function showItem( sId, iIdx, bShow, bIsFirst, bIsLast ){
	
	var oTabs = document.getElementById(sId + "-tbl");
	var tabcount = parseInt(oTabs.getAttribute("tabcount"));
	var tabimg = document.getElementById(sId + "-itm-" + iIdx + "-a");
	var tabstat = document.getElementById(sId + "-itm-" + iIdx + "-n");
	var tabcell = document.getElementById(sId + "-itm-" + iIdx);
	
	var conimg = document.getElementById(sId + "-itm-" + iIdx + "-ca");
	var constat = document.getElementById(sId + "-itm-" + iIdx + "-cn");
	var concell = document.getElementById(sId + "-itm-" + iIdx + "-c");
	if (bShow){
		
		var statdisp = "";
		if (tabstat.getAttribute("design") == "INT"){
			statdisp = "none";
		}
		if (!bIsFirst && !bIsLast){
			tabimg.style.display = "";
			tabcell.style.display = "";
			tabstat.style.display = statdisp;
			if (concell != null){
				concell.style.display = "";
				conimg.style.display = "";
				constat.style.display = statdisp;
			}
		}
		else if (bIsFirst){
			tabimg.style.display = "none";
			tabcell.style.display = "";
			tabstat.style.display = statdisp;
			if (concell != null){
				concell.style.display = "";
				conimg.style.display = "none";
				constat.style.display = statdisp;
			}
		}
		else if (bIsLast){
			tabimg.style.display = "";
			tabcell.style.display = "";
			tabstat.style.display = statdisp;
			if (concell != null){
				concell.style.display = "";
				conimg.style.display = "";
				constat.style.display = statdisp;
			}
		}
	}
	else{
		
		tabimg.style.display = "none";
		tabcell.style.display = "none";
		tabstat.style.display = "none";
		if (concell != null){
			concell.style.display = "none";
			conimg.style.display = "none";
			constat.style.display = "none";
		}
	}
}
function setSeqIcons( sId, firsttab, lasttab, tabcount ){
	var prev = document.getElementById(sId + "-p");
	var next = document.getElementById(sId + "-n");
	var first = document.getElementById(sId + "-itm-" + firsttab);
	var last = document.getElementById(sId + "-itm-" + lasttab);
	var prevtmp = prev.className;
	var nexttmp = next.className
	
	if (firsttab == 0){
		if (first.className == "urPcSeqLabelOn"){
			prev.className = "urPcSeqFirstAngOnPrevOff";
		}
		else{
			prev.className = "urPcSeqFirstAngOffPrevOff";
		}
	}
	else{
		if (first.className == "urPcSeqLabelOn"){
			prev.className = "urPcSeqFirstAngOnPrevOn";
		}
		else{
			prev.className = "urPcSeqFirstAngOffPrevOn";
		}
	}
	
	if (lasttab == tabcount - 1){
		var lastdesign = last.getAttribute("design").toUpperCase();
		
		
		if (lastdesign == "TERM") {
			next.className = "urPcSeqLastTerm";
		}
		
		else if (lastdesign == "BRANCH") {
			if (last.className == "urPcSeqLabelOn"){
				next.className = "urPcSeqLastOnBranchOn";
			}
			else{
				next.className = "urPcSeqLastOffBranchOn";
			}
		}
		else {
		    if (last.className == "urPcSeqLabelOn") {
				next.className = "urPcSeqLastOnNextOn";
			}
			else {
			    next.className = "urPcSeqLastOffNextOn";
			}
		}
	}
	else{
		if (last.className == "urPcSeqLabelOn"){
			next.className = "urPcSeqLastOnNextOn";
		}
		else{
			next.className = "urPcSeqLastOffNextOn";
		}
	}
	
	prev.childNodes[0].className = "urPcSeqPreFirstAng";
	
	if (next.className.indexOf("Term") != -1){
		next.childNodes[0].className = "urPcSeqAfterLastAng";
	}
	else if (next.className.indexOf("Branch") != -1){
		next.childNodes[0].className = "urPcSeqBranchAng";
	}
	else{
		next.childNodes[0].className = "urPcSeqAfterLastAng";
	}
}
SCROLL_FUNCTIONS = {PATTERNCONTAINERTAB:showTab,PATTERNCONTAINERSEQUENCE:showItem};
ICON_FUNCTIONS = {PATTERNCONTAINERTAB:setTabIcons,PATTERNCONTAINERSEQUENCE:setSeqIcons}
SELECT_FUNCTIONS = {PATTERNCONTAINERTAB:sapUrMapi_PcTabs_setActiveItem,PATTERNCONTAINERSEQUENCE:sapUrMapi_PcSeq_setActiveItem}
function debug_jumpItem(elm){
	for (var i = 0; i < elm.options.length; i++){
		if (elm.options[i].selected == true){
			sapUrMapi_jumpItem( elm.getAttribute("control"), i, elm.getAttribute('controltype'));
		}
	}
}
function sapUrMapi_Pc_togglePager(sId) {
  if (document.getElementById(sId+"-pag")!=null) {
    var sPagerId=document.getElementById(sId+"-pag").firstChild.id;
  } else {
    return;
  }
	var oTabs = document.getElementById(sId + "-tbl");
	var tabcount = parseInt(oTabs.getAttribute("tabcount"));
	var firsttab = parseInt(oTabs.getAttribute("starttab"));
	var tabpage = parseInt(oTabs.getAttribute("tabpage"));
	var vistabs = parseInt(oTabs.getAttribute("vistabs"));
	var lasttab = parseInt(oTabs.getAttribute("lasttab"));
  var arrButtonArray = new Array();
	var arrStateArray = new Array();
  arrButtonArray[arrButtonArray.length]=UR_PAGINATOR_BUTTON.BEGIN;
  arrButtonArray[arrButtonArray.length]=UR_PAGINATOR_BUTTON.PREVIOUS_PAGE;
  arrButtonArray[arrButtonArray.length]=UR_PAGINATOR_BUTTON.PREVIOUS_ITEM;
	if (firsttab!=0) {
	  arrStateArray[arrStateArray.length]=true;
	  arrStateArray[arrStateArray.length]=true;
	  arrStateArray[arrStateArray.length]=true;
	} else {
	  arrStateArray[arrStateArray.length]=false;
	  arrStateArray[arrStateArray.length]=false;
	  arrStateArray[arrStateArray.length]=false;
	}
  arrButtonArray[arrButtonArray.length]=UR_PAGINATOR_BUTTON.END;
  arrButtonArray[arrButtonArray.length]=UR_PAGINATOR_BUTTON.NEXT_PAGE;
  arrButtonArray[arrButtonArray.length]=UR_PAGINATOR_BUTTON.NEXT_ITEM;
	if (lasttab!=tabcount-1) {
	  arrStateArray[arrStateArray.length]=true;
	  arrStateArray[arrStateArray.length]=true;
	  arrStateArray[arrStateArray.length]=true;
	} else {
	  arrStateArray[arrStateArray.length]=false;
	  arrStateArray[arrStateArray.length]=false;
	  arrStateArray[arrStateArray.length]=false;
	}
  sapUrMapi_Paginator_setStates(sPagerId,arrButtonArray,arrStateArray);
}
//** PhaseIndicator.ie5 **
function sapUrMapi_PhInPhaseSelect(sId,sPhaseId,bSelected,e){}
var arrValuesOfPhases = new Array();
function sapUrMapi_PhaseIndicator_create(sId){
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_PhaseIndicator_init('"+sId+"')");
}
function sapUrMapi_PhaseIndicator_init(sId){
	var oVisblPhases = ur_get(sId);
	var iWidth = oVisblPhases.offsetWidth;
	if (iWidth>0) {
	  sapUrMapi_PhaseIndicator_setAllValues(sId);
	} else {
	 	return;
  }
  sapUrMapi_PhaseIndicator_draw(sId);
	
	sapUrMapi_Resize_AddItem(sId, "sapUrMapi_PhaseIndicator_draw('" + sId + "')");
}
function sapUrMapi_PhaseIndicator_setAllValues(sId){
	var done = false;
	if(done == false){
		arrValuesOfPhases[sId] = new Array();
		var iItemCount = parseInt(ur_get(sId).getAttribute('allitems'));
		for(var i = 0; i <= iItemCount; i++){
			arrValuesOfPhases[sId][i] = new Array();
			arrValuesOfPhases[sId][i][0] = sId + '-itm-' + i;
			arrValuesOfPhases[sId][i][1] = ur_get(sId + '-itm-' + i).offsetWidth;
		}
		arrValuesOfPhases[sId][iItemCount + 1] = new Array();
		done = true;
	}
}
function sapUrMapi_PhaseIndicator_draw(sId) {
  var o=ur_get(sId);
	var iItemCount = parseInt(o.getAttribute('allitems'));
	var iFirstIdxOld = parseInt(o.getAttribute('firstvisible'));
	ur_get(sId + '-cnt-scrl').style.width = '1px';
	sapUrMapi_PhaseIndicator_setSelectedItem(sId);
	sapUrMapi_PhaseIndicator_make(sId,iFirstIdxOld,iItemCount);
}
function sapUrMapi_PhaseIndicator_make(sId,iStart,iEnd,sDir){
  var o=ur_get(sId);
	var iLastIdxOld = parseInt(o.getAttribute('lastvisible'));
	var iFirstIdxOld = parseInt(o.getAttribute('firstvisible'));
	var iAvailWdth = ur_get(sId + '-cnt').offsetWidth;
	var iItemCount = parseInt(o.getAttribute('allitems'));
	var iVisblWdth = 0;
	var iFirstIdx = 0;
	var iLastIdx = 0;
	var ii=0;
	for(var i=0;i<=iItemCount;i++) {
	  arrValuesOfPhases[sId][i][2]=false;
	}
  
  
	if(sDir == 'FURTHER' || typeof(sDir)=="undefined"){
    for (i=iStart;i<=iEnd;i++) {
			if(iAvailWdth > 0 && iAvailWdth >= arrValuesOfPhases[sId][i][1]){
				arrValuesOfPhases[sId][i][2]=true;
				iAvailWdth = iAvailWdth - arrValuesOfPhases[sId][i][1];
				iVisblWdth = iVisblWdth + arrValuesOfPhases[sId][i][1];
			}else{
				break;
			}
		ii=i;
    }
	}
	if(sDir == 'BACK'){
    for (i=iStart;i>=iEnd;i--) {
			if(iAvailWdth > 0 && iAvailWdth >= arrValuesOfPhases[sId][i][1]){
				arrValuesOfPhases[sId][i][2]=true;
				iAvailWdth = iAvailWdth - arrValuesOfPhases[sId][i][1];
				iVisblWdth = iVisblWdth + arrValuesOfPhases[sId][i][1];
			}else{
				break;
			}
		  ii=i;
    }
  }
	if(ii == 0 && iAvailWdth > iVisblWdth && iAvailWdth >= arrValuesOfPhases[sId][iStart + 1][1]){
		iAvailWdth = ur_get(sId + '-cnt').offsetWidth;
		for(i = (iStart + 1); i<= iItemCount; i++){
				iVisblWdth = iVisblWdth + arrValuesOfPhases[sId][i][1];
			if(iAvailWdth >= iVisblWdth && iAvailWdth >= arrValuesOfPhases[sId][i][1]){
				arrValuesOfPhases[sId][i][2]=true;
				iStart = i;
			}else{
				break;
			}
		}
	}
	for(var i=0;i<=iItemCount;i++) {
	  if (arrValuesOfPhases[sId][i][2]==false) {
		  ur_get(arrValuesOfPhases[sId][i][0]).childNodes[0].style.display = "none";
	  } else {
		  ur_get(arrValuesOfPhases[sId][i][0]).childNodes[0].style.display = "block";
	  }
	}
	if(sDir == 'BACK'){
		ur_get(sId).setAttribute('firstvisible',ii);
		ur_get(sId).setAttribute('lastvisible',iStart);
		iFirstIdx = ii;
		iLastIdx = iStart;
	} else {
		ur_get(sId).setAttribute('firstvisible',iStart);
		ur_get(sId).setAttribute('lastvisible',ii);
		iFirstIdx = iStart;
		iLastIdx = ii;
	}
	var oLastIdx = ur_get(sId + '-itm-img-' + iLastIdx);
	if(iFirstIdx == 0 && iLastIdx != iItemCount && oLastIdx != null){
		ur_get(sId + '-cnt-scrl').style.width = iVisblWdth;
		if(!isNaN(iLastIdxOld) && iLastIdxOld != iItemCount){
			ur_get(sId + '-itm-img-' + iLastIdxOld).className = 'urPhInFurtherArrow';
			}
		ur_get(sId + '-p').style.display = 'none';
		ur_get(sId + '-itm-img-' + iLastIdx).className = 'urPhInMoreAfter';
	}
	if(iFirstIdx != 0 && iLastIdx != iItemCount){
		ur_get(sId + '-p').style.display = 'block';
		ur_get(sId + '-cnt-scrl').style.width = iVisblWdth;
		if(iLastIdxOld != iItemCount){
			if(!isNaN(iLastIdxOld)){
				ur_get(sId + '-itm-img-' + iLastIdxOld).className = 'urPhInFurtherArrow';
			}
		}
		if(iLastIdx!=null){
			ur_get(sId + '-itm-img-' + iLastIdx).className = 'urPhInMoreAfter';
		}
	}
	if(iFirstIdx != 0 && iLastIdx == iItemCount){
		ur_get(sId + '-p').style.display = 'block';
		ur_get(sId + '-cnt-scrl').style.width = iVisblWdth;
		if(!isNaN(iLastIdxOld) && iLastIdxOld != iItemCount){
			ur_get(sId + '-itm-img-' + iLastIdxOld).className = 'urPhInFurtherArrow';
		}
	}
	if(iFirstIdx == 0 && iLastIdx == iItemCount){
		ur_get(sId + '-cnt-scrl').style.width = iVisblWdth;
		ur_get(sId + '-p').style.display = 'none';
		if(!isNaN(iLastIdxOld) && iLastIdxOld != iItemCount){
			ur_get(sId + '-itm-img-' + iLastIdxOld).className = 'urPhInFurtherArrow';
		}
	}
	sapUrMapi_PhaseIndicator_setPagingButtons(sId);
}
function sapUrMapi_PhaseIndicator_paging(sId,sDir){
	var iItemCount = parseInt(ur_get(sId).getAttribute('allitems'));
	var iFirstIdxOld = parseInt(ur_get(sId).getAttribute('firstvisible'));
	var iLastIdxOld = parseInt(ur_get(sId).getAttribute('lastvisible'));
		if(sDir == 'FURTHER'){
				iFirstIdxOld = iLastIdxOld + 1;
				sapUrMapi_PhaseIndicator_make(sId,iFirstIdxOld,iItemCount,sDir);
		} else if(sDir== 'BACK'){
			iLastIdxOld = iFirstIdxOld - 1;
			if(iLastIdxOld != 0){
				sapUrMapi_PhaseIndicator_make(sId,iLastIdxOld,0,sDir);
				}else{
					ur_get(sId).setAttribute('firstvisible',0);
					sapUrMapi_PhaseIndicator_draw(sId);
				}
		} else {
		  	iLastIdxOld = parseInt(sDir.substring(sDir.lastIndexOf("-")+1));
				ur_get(sId).setAttribute('focuseditem',iLastIdxOld);
				ur_get(sId).setAttribute('firstvisible',iLastIdxOld);
				sapUrMapi_PhaseIndicator_draw(sId);
			}
	}
function sapUrMapi_PhaseIndicator_setPagingButtons(sId){
	var iItemCount = parseInt(ur_get(sId).getAttribute('allitems'));
	if(ur_get(sId+"-pag").hasChildNodes()){
		sPagerId = ur_get(sId+"-pag").childNodes.item(0).id;
		var arrButtonArray = new Array();
		arrButtonArray[0]=UR_PAGINATOR_BUTTON.PREVIOUS_ITEM;
		arrButtonArray[1]=UR_PAGINATOR_BUTTON.NEXT_ITEM;
		var arrStateArray = new Array();
		arrStateArray[0]=true; 
		arrStateArray[1]=true; 
		var iFirstIdxOld = parseInt(ur_get(sId).getAttribute('firstvisible'));
		var iLastIdxOld = parseInt(ur_get(sId).getAttribute('lastvisible'));
		if(iFirstIdxOld == 0){
				arrStateArray[0]=false; 
		}
		if(iLastIdxOld == iItemCount || isNaN(iLastIdxOld)){
				arrStateArray[1]=false; 
		}
		sapUrMapi_Paginator_setStates(sPagerId,arrButtonArray,arrStateArray);
	} else {
	  return;
	}
}
function sapUrMapi_PhaseIndicator_setSelectedItem(sId) {
	var iItemCount = parseInt(ur_get(sId).getAttribute('allitems'));
	var iItemSel = parseInt(ur_get(sId).getAttribute('selecteditem'));
	var bNoSel = false;
	var iFirstIdx = parseInt(ur_get(sId).getAttribute('firstvisible'));
	
	
	if (!isNaN(iItemSel)) {
		for (i = 0; i <= iItemCount; i++) {
			if (ur_get(sId + '-itm-' + i).getAttribute('sel') == 'true') {
				ur_get(sId).setAttribute('selecteditem',i);
				ur_get(sId).setAttribute('focuseditem',i);
					bNoSel = true;
				break;
			}
		}
	}
	if(bNoSel == false){
		ur_get(sId).setAttribute('selecteditem',iFirstIdx);		
	}
}
function sapUrMapi_PhaseIndicator_keydown(sId,e){
  var iSelected = parseInt(ur_get(sId).getAttribute('selecteditem'));
  if(e.keyCode == 39 || e.keyCode == 37){
		if (isNaN(iSelected)) {
			if (ur_get(sId).getAttribute('stepamount')!="0") {
				sapUrMapi_setTabIndex(ur_get(sId + '-itm-0'),0);
				ur_focus(ur_get(sId + '-itm-0'));
			} 
		} else {
		sapUrMapi_setTabIndex(ur_get(sId + '-itm-'+iSelected),0);
			ur_focus(ur_get(sId + '-itm-' + iSelected));
  }
}
	if(e.keyCode==9){
		if (isNaN(iSelected)) {
			if (ur_get(sId).getAttribute('stepamount')!="0") {
				sapUrMapi_setTabIndex(ur_get(sId + '-itm-0'),-1);
			} 
		} else {
			sapUrMapi_setTabIndex(ur_get(sId + '-itm-' + iSelected),-1);
		}
	}
}
function sapUrMapi_PhaseIndicator_keydownStep(sId,sItemIdx,bSel,e){
	var iItemCount = parseInt(ur_get(sId).getAttribute('allitems'));
	var iFocusedItemOld = ur_get(sId).getAttribute('focuseditem');
	var iLastVsbl = ur_get(sId).getAttribute('lastvisible');
	var iFirstVsbl = ur_get(sId).getAttribute('firstvisible');
	var iSelected = ur_get(sId).getAttribute('selecteditem');
	var iItemIdx = parseInt(sItemIdx);
	var sItem = '-itm-';
	var sFocusedItemNew = sItem + iItemIdx;          
	var sNextItem = sItem + (iItemIdx + 1);  
	var sPrevItem = sItem + (iItemIdx - 1); 
	
	
	if(e.keyCode == 39) {
	  if (ur_system.direction == "rtl") {
	    
	    if (iItemIdx > 0){
	       sapUrMapi_PhaseIndicator_focusItem(sId,sFocusedItemNew,sPrevItem);
	    }
	    
	    if(iItemIdx == 0){
	    }
		if (iItemIdx == iFirstVsbl && !isNaN(iFirstVsbl) && iFirstVsbl != 0){
			sapUrMapi_PhaseIndicator_paging(sId,"BACK");
	    }
	  } else {
	    
	    if (iItemIdx < iItemCount){
	       sapUrMapi_PhaseIndicator_focusItem(sId,sFocusedItemNew,sNextItem);
	    }
	    
			if (iItemIdx == iItemCount){
		    }
			if (iItemIdx == iLastVsbl && !isNaN(iLastVsbl) && iLastVsbl != iItemCount){
			sapUrMapi_PhaseIndicator_paging(sId,"FURTHER");
	    }
	  }
	}
	
	
	if(e.keyCode == 37) {
	  if (ur_system.direction == "rtl") {
	    
	    if (iItemIdx < iItemCount){
	       sapUrMapi_PhaseIndicator_focusItem(sId,sFocusedItemNew,sNextItem);
	    }
	    
			if (iItemIdx == iItemCount){
		    }
			if (iItemIdx == iLastVsbl && !isNaN(iLastVsbl) && iLastVsbl != iItemCount){
			sapUrMapi_PhaseIndicator_paging(sId,"FURTHER");
	    }
	  } else {
	    
	    if (iItemIdx > 0){
	       sapUrMapi_PhaseIndicator_focusItem(sId,sFocusedItemNew,sPrevItem);
	    }
	    
		    if(iItemIdx == 0){
		    }
			if (iItemIdx == iFirstVsbl && !isNaN(iFirstVsbl) && iFirstVsbl != 0){
			  sapUrMapi_PhaseIndicator_paging(sId,"BACK");
	    }
	  }
	}
	if(e.keyCode==32){
		sapUrMapi_triggerClick(e,new Array('32'));
	}
	
	if(!isNaN(iFocusedItemOld)){
		if(e.keyCode == 9 && iSelected != iFocusedItemOld){
		   sapUrMapi_PhaseIndicator_focusItem(sId,(sItem + iFocusedItemOld),(sItem + iSelected));
		   }
		 }
	   e.cancelBubble=true;
}
function sapUrMapi_PhaseIndicator_focusItem(sId,sFocusedOld,sFocusedNew){
	sapUrMapi_setTabIndex(ur_get(sId + sFocusedOld),-1);
	sapUrMapi_setTabIndex(ur_get(sId + sFocusedNew),0);
	ur_focus(ur_get(sId + sFocusedNew));
	
}
function sapUrMapi_PhaseIndicator_setFocusAttribute(sId,sItemIdx){
	ur_get(sId).setAttribute('focuseditem',sItemIdx);
	sapUrMapi_Focus_showFocusRect();
	e.cancelBubble=true;
}
function sapUrMapi_PhaseIndicator_getFirstVisible(o){
	return o.getAttribute("firstvisible");
}

//** PopupMenu.nn6 **

var mnu = new Object();
mnu.intv = null;
mnu.active = false;
mnu.delay = 250;
mnu.cancel = false;
mnu.mnuWin = null;
mnu.mnuE = null;
var sapPopupMenuLevel = 0;
var subMenus = new Array(null,null,null,null,null,null);
var subMenuItems = new Array(null,null,null,null,null,null);
var itemsArray = new Array(null,null,null,null,null,null,null,null);
var urOldFocus = window.onfocus;
var baseMenu = null;
var oPopup;
me=window;
function sapUrMapi_PopupMenu_init(id,e) {
	if (me.menuObject) {
	  sapUrMapi_PopupMenu_exit(id,e);
	}
	if (!me.menuObject) {
	  
	  var items = window.document.getElementById(id+"-r").childNodes.item(1).childNodes;
	  var menu = new sapUrMapi_PopupMenu(items);
	  me.menuObject = menu;
    me.menuObject.standalone=true;
  }
}
function sapUrMapi_PopupMenu_exit(id,e) {
	if (e.target.id==id) {
		if (me.menuObject) {
			sapUrMapi_PopupMenu_hideAll();
			sapUrMapi_PopupMenu_setItemActive(me,-1, id);
		  me.menuObject = null;
		}
	} else {
		if (me.menuObject) {
			if (me.menuObject.out) {
		    sapUrMapi_PopupMenu_setItemActive(me,-1, id);
		  }
		}
	}
}
function sapUrMapi_PopupMenu_hoverItem(mywindow,id,e) {
	
	if(e==null) return;
	
	var o=e.target;
  if(o.parentNode.className=="urMnuDvdr"){
      iIdx = "dvdr"
      sapUrMapi_PopupMenu_setItemActive(mywindow,iIdx, id);
      if (mywindow.mylevel<=sapPopupMenuLevel) {
                  for (var n=mywindow.mylevel+1;n<=sapPopupMenuLevel;n++) {
                       subMenus[n].hide();
                  }
      }
      return;
  }
  if(typeof o.tagName=="undefined") o=o.parentNode;
  if (o.tagName=="IMG" || o.tagName=="NOBR" || o.tagName=="SPAN")o=o.parentNode;
  if (o.tagName=="TD") {
		iIdx = parseInt(o.parentNode.getAttribute("Idx"));
	  if (mywindow.menuObject==null) {
	    sapUrMapi_PopupMenu_init(id,e);
	  }
	
	  
	  var items = mywindow.document.getElementById(id+"-r").childNodes.item(1).childNodes;
	  mywindow.menuObject = sapUrMapi_PopupMenu(items);
	  if (mywindow.menuObject.activeItem==iIdx) return;
	
	if(o.getAttribute("isscroll")=="true") {
		e.stopPropagation();
		return false;
	}
	  sapUrMapi_PopupMenu_setItemActive(mywindow,iIdx, id);
	  if (mywindow.mylevel<=sapPopupMenuLevel) {
	  	for (var n=mywindow.mylevel+1;n<=sapPopupMenuLevel;n++) {
	      subMenus[n].hide();
      }
	  }
	  ur_focus(mywindow);
	  if (ur_getAttD(mywindow.menuObject.items[mywindow.menuObject.activeItem],"dsbl","")!="true") {
	    sapUrMapi_PopupMenu_setItemActive(mywindow,"opensub", id);
	  }
	}
	e.cancelBubble=true;
}
function 	sapUrMapi_PopupMenu_hideAll() {
  for (var n=0;n<sapPopupMenuLevel+1;n++) {
	 if (subMenus[n]!=null) {
    subMenus[n].hide();
   }
  }
  if (baseMenu!=null) {baseMenu.hide();}
  baseMenu=null;
	if(oPopup!=null){
		try {
			  ur_focus(oPopup.source.object);
		} catch(e) {}	
	}
	oPopup=null;
  sapPopupMenuLevel=0;
  
}
function sapUrMapi_PopupMenu_showMenu(idTrigger,idContent,enumAlignment,e ) {
	var styles = document.getElementsByTagName("LINK");
	var arrUrls;
	arrUrls = new Array(ur_system.stylepath+"ur_pop_"+ur_system.browser_abbrev+".css");
  
  for (var i=0;i<subMenus.length;i++) {
  	if (subMenus[i]!=null) {
  		subMenus[i].hide();
  	}
  }
   var o = ur_get(idContent);
	if (!o) return;
	if (o.hasChildNodes() && o.firstChild.tagName=="XMP") {
	  o.innerHTML=o.firstChild.innerHTML; 
	}
  sapUrMapi_PopupMenu_drawInit(idContent);
	oPopup = new sapPopup(window,arrUrls,o,ur_get(idTrigger),e,0);
   oPopup.onblur=oPopup.hide;
  if (!enumAlignment)
    if (ur_system.direction== "rtl")
      enumAlignment= sapPopupPositionBehavior.MENURIGHT;
    else
      enumAlignment= sapPopupPositionBehavior.MENULEFT;
  oPopup.positionbehavior = enumAlignment;
  oPopup.show();
  baseMenu=oPopup;
	window.onfocus=sapUrMapi_PopupMenu_hideAll;
}
function sapUrMapi_PopupMenu_setItemActive(win,newActive, sId) {
	if (sId=="blank") return;
	var remActive = newActive;
	if (!win.menuObject) {
	  var items=win.document.getElementsByTagName("BODY").item(0).childNodes.item(0).childNodes.item(0).childNodes.item(0).childNodes.item(1).childNodes;
	  win.menuObject = sapUrMapi_PopupMenu(items);
	}
	var menuObj=win.menuObject;
	if (newActive==menuObj.activeItem) return;
	menuObj.out=false;
	if ((newActive=="opensubkey")||(newActive=="opensub")) {
		if (!menuObj.items[menuObj.activeItem]) return;
		var sSubMenuId = menuObj.items[menuObj.activeItem].getAttribute("submenu");
		if ((sSubMenuId!="") && (sSubMenuId!=null)) {
		  if (!oPopup) {
		  	var iStartLevel=-1;
		  } else {
		  	var iStartLevel=win.mylevel;
		  }
		  if (iStartLevel<sapPopupMenuLevel) {
				for (var n=iStartLevel+1;n<sapPopupMenuLevel+1;n++) {
				  if (subMenus[n]!=null) {
  				  subMenus[n].hide();
  				}
				}
			  sapPopupMenuLevel=iStartLevel;
			}
			var arrUrls;
			arrUrls = new Array(ur_system.stylepath+"ur_pop_"+ur_system.browser_abbrev+".css");
			if (top.sapPopupStore) {
			  oStore = top.sapPopupStore
			} else {
			  oStore = window.sapPopupStore;
			}
			if (!oPopup) {
			   subwindow = window;
  			 sapPopupMenuLevel = 0;
			} else {
			  subwindow = win;
			  sapPopupMenuLevel = win.mylevel+1;
			}
			var src = menuObj.items[menuObj.activeItem];
			var o = ur_get(sSubMenuId);
			if (o.hasChildNodes() && o.firstChild.tagName=="XMP") {
				o.innerHTML=o.firstChild.innerHTML; 
			}
		  sapUrMapi_PopupMenu_drawInit(sSubMenuId);
		  subMenu = new sapPopup(window,arrUrls,o,src,null,sapPopupMenuLevel);
	    subMenu.onblur=subMenu.hide;
	    subMenu.positionbehavior = sapPopupPositionBehavior.SUBMENU;
	    subMenu.show();
	    subMenus[sapPopupMenuLevel] = subMenu;
		}
	  return;
	}
	if (newActive=="closesub") {
		if (win.mylevel) {
			subMenus[win.mylevel].hide();
			if (win.mylevel>1) {
  			ur_focus(subMenus[win.mylevel-1].frame.window);
				sapUrMapi_PopupMenu_setItemActive(subMenus[win.mylevel-1].frame.window,subMenus[win.mylevel-1].frame.window.menuObject.activeItem, sId)
				win.onkeydown=void(0);
			} else {
  			sapUrMapi_PopupMenu_setItemActive(oPopup.frame.window,itemsArray[0].activeItem, sId)
				ur_focus(oPopup.frame.window);
				win.onkeydown=void(0);
			}
			subMenus[win.mylevel].hide();
		}
	  return;
	}
	if (newActive=="first") {
	  newActive=menuObj.activeItem+1;
	  if (newActive>menuObj.items.length-1) newActive=0;
	}
	var bDown = "true";
	if (newActive=="next") {
	  newActive=menuObj.activeItem+1;
		if (newActive>menuObj.items.length-1){
			if (menuObj.items[0].style.display != "none"){
				newActive=0;
			}
			else{
			   newActive = menuObj.items.length-1;
			   return;
			}
		}
	}
	if (newActive=="prev") {
		newActive=menuObj.activeItem-1;
		if (newActive<0){
			if (menuObj.items[menuObj.items.length-1].style.display != "none"){
				newActive=menuObj.items.length-1;
			}
			else{
			   newActive = 0;
			   return;
			}
	}
		bDown = "false";
	}
  if (newActive=="dvdr") {
             if (menuObj.activeItem>-1) {
                  if ((menuObj.items[menuObj.activeItem].getAttribute("dsbl")!=null) && (menuObj.items[menuObj.activeItem].getAttribute("dsbl")!="")) {
                  menuObj.items[menuObj.activeItem].className="urMnuRowDsbl";
                  } else {
                          menuObj.items[menuObj.activeItem].className="urMnuRowOff";
                  }
             }
  }
	if (newActive>-1) {
		if (menuObj.activeItem>-1) {
			sDsbl = menuObj.items[menuObj.activeItem].getAttribute("dsbl");
			if ((sDsbl!="")&&(sDsbl!=null)) {
			  menuObj.items[menuObj.activeItem].className="urMnuRowDsbl";
		  } else {
			  menuObj.items[menuObj.activeItem].className="urMnuRowOff";
		  }
		  if (ur_system.is508) {
		  	with(menuObj.items[menuObj.activeItem]) {
		  	  for (var i=0;i<childNodes.length;i++) {
		  	    if (childNodes.item(i).className=="urMnuTxt") {
		  	    	sapUrMapi_setTabIndex(childNodes.item(i),-1);
		  	    	break;
		  	    }
		  	  }
		  	}
		  }
		}
		menuObj.activeItem =  newActive;
		if (menuObj.activeItem>-1) {
		  if (ur_system.is508) {
				while (menuObj.items[menuObj.activeItem].style.display == "none"){
					sapUrMapi_PopupMenu_manualScroll(win, sId, bDown, true);
				}
		  	with(menuObj.items[menuObj.activeItem]) {
		  	  for (var i=0;i<childNodes.length;i++) {
		  	    if (childNodes.item(i).className=="urMnuTxt") {
		  	    	sapUrMapi_setTabIndex(childNodes.item(i),0);
		  	    	
		  	    	break;
		  	    }
		  	  }
		  	}
		  }
			sDsbl = menuObj.items[menuObj.activeItem].getAttribute("dsbl");
			if ((sDsbl!="")&&(sDsbl!=null)) {
			  menuObj.items[menuObj.activeItem].className="urMnuRowDsblOn";
		  } else {
			  menuObj.items[menuObj.activeItem].className="urMnuRowOn";
		  }
		}
	} else {
		if (newActive==-1) {
			if (ur_system.is508) {
				if (menuObj) {
					if (menuObj.items) {
				  	for (var j=0;j<menuObj.items.length;j++) {
				 			if (menuObj.items[j]) {
					  		with(menuObj.items[j]) {
						  	  for (var i=0;i<childNodes.length;i++) {
						  	    if (childNodes.item(i).className=="urMnuTxt") {
						  	    	sapUrMapi_setTabIndex(childNodes.item(i),-1);
						  	    	break;
						  	    }
						  	  }
						  	}
					  	}
					  }
					}
				}
		  }
		  if (menuObj) {
			  if (menuObj.items.length>0) {
			  	if (menuObj.items[menuObj.activeItem]) {
						if (menuObj.items[menuObj.activeItem].getAttribute("dsbl")!=null) {
						  menuObj.items[menuObj.activeItem].className="urMnuRowDsbl";
					  } else {
						  menuObj.items[menuObj.activeItem].className="urMnuRow";
					  }
					}
				}
			}
		}
	}
}
function sapUrMapi_PopupMenu(items) {
	this.activeItem = -1;
	this.items = new Array();
	for (var i=0;i<items.length;i++) {
		if (items.item(i).childNodes.item(0).className!="urMnuDvdr") {
			this.items[this.items.length]=items.item(i);
			if (this.items[this.items.length-1].className.indexOf("On")>-1) {
				this.activeItem=this.items.length-1;
			}
			this.items[this.items.length-1].setAttribute("Idx",this.items.length-1);
		}
	}
	return this;
}
function sapUrMapi_PopupMenu_keyDown(mywindow,id,e) {
	if (e.keyCode==27) {
		if (mywindow.menuObject) {
			if (mywindow.menuObject.standalone) {
				sapUrMapi_PopupMenu_exit(id,e);
		    ur_focus(me.menuObject.items[me.menuObject.activeItem].parentNode.parentNode.parentNode);
		  } else {
		  	try {
			    ur_focus(oPopup.source.object);
			  } catch(e) {
			  }
			  hidePopupMenu();
		  }
		}
		return;
	}
	if (e.keyCode==40) { 
	  sapUrMapi_PopupMenu_setItemActive(mywindow,"next", id);
	}
	if (e.keyCode==38) { 
	  sapUrMapi_PopupMenu_setItemActive(mywindow,"prev", id);
	}
	if (e.keyCode==39) { 
	  if (ur_system.direction == "rtl") {
	    sapUrMapi_PopupMenu_setItemActive(mywindow,"closesub", id);
		e.cancelBubble=true;
		return;
	  } else {
	    sapUrMapi_PopupMenu_setItemActive(mywindow,"opensubkey", id);
	  }
    }
	if (e.keyCode==37) { 
	  if (ur_system.direction == "rtl") {
	    sapUrMapi_PopupMenu_setItemActive(mywindow,"opensubkey", id);
	  } else {
	    sapUrMapi_PopupMenu_setItemActive(mywindow,"closesub", id);
		e.cancelBubble=true;
		return;
	  }
	}
	if (e.keyCode==13) { 
		var item=mywindow.menuObject.items[mywindow.menuObject.activeItem];
		if (item.onclick) {
			item.onclick();
		}
	}
	if (e.keyCode!=9) {
	  e.cancelBubble=true;
	  e.returnValue=false;
	} else {
		if (mywindow.menuObject) {
			mywindow.menuObject.out=true;
		}
		if(oPopup.source.object!=null){
			try {
			    ur_focus(oPopup.source.object);
			} catch(e) {}	
		}	
		hidePopupMenu();
	  e.cancelBubble=false;
	  e.returnValue=true;
	}
	return false;
}
function sapUrMapi_PopupMenu_ExecuteLink(id) {
  oItem = window.document.getElementById(id);
  sTarget = oItem.getAttribute("target");
  sHref   = oItem.getAttribute("href");
  oTarget = top.frames[sTarget];
  if (oTarget) {
  	oTarget.location.href=sHref;
  } else {
    window.open(sHref,sTarget,"");
	}
  }
function sapUrMapi_PopupMenu_RegisterCreate(sId) {
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_PopupMenu_drawInit('" + sId + "')");
}
function sapUrMapi_PopupMenu_drawInit( sId ){
    var tbl = window.document.getElementById(sId+"-r");
	var rows = tbl.childNodes.item(1).rows;
	var visIdx = tbl.getAttribute("visidx") - 0;
    var visCnt = tbl.getAttribute("viscnt") - 0;
	var maxVisCnt = rows.length - visIdx;
	tbl.width = tbl.offsetWidth;
    tbl.style.width = tbl.offsetWidth + "px";
	
	var maxHt = window.document.body.offsetHeight;
	var mnuHt = tbl.offsetHeight;
	var btnHt = tbl.childNodes.item(0).rows[0].offsetHeight + tbl.childNodes.item(2).rows[0].offsetHeight;
	var visBtns = true;
	
	
	if ((visIdx == 0) && (visCnt >= rows.length)){
		tbl.childNodes.item(0).style.display = "none";
		tbl.childNodes.item(2).style.display = "none";
		
		for (var i = 0; i < rows.length; i++){
			if (rows[i].cells[0].className == "urMnuDvdr"){
				rows[i].cells[0].style.fontSize="5px";
			}
		}
		}
	
	for (var i = 0; i < rows.length; i++){
        for (var z = 0; z < rows[i].cells.length; z++){
			rows[i].cells[z].width = rows[i].cells[z].offsetWidth;
            rows[i].cells[z].style.width = rows[i].cells[z].offsetWidth +"px";
        }
    }
	if (visCnt <= 0){
		
		return false;
	}
	if (visCnt > maxVisCnt) {
	    
		visCnt = maxVisCnt;
		tbl.setAttribute("viscnt", visCnt);
	}
	var resetVisCnt = false;
	var upOn = false;
	var dnOn = false;
    for (var n = 0; n < rows.length; n++){
		
        if (n < visIdx){
   			
			for (var i = 0;i < rows[n].cells.length; i++){
				rows[n].cells[i].style.display = "none";
			}
			upOn = true;
        }
		else if (n == visIdx){
				
		}
		
		else if (n > visIdx && n < (visIdx + visCnt)){
				
		}
		else if (n >= (visIdx + visCnt)){
			
			for (var i = 0; i < rows[n].cells.length; i++){
				rows[n].cells[i].style.display = "none";
			}
			dnOn = true;
	}
}
	
	sapUrMapi_PopupMenu_setButtons( sId, false, upOn );
	sapUrMapi_PopupMenu_setButtons( sId, true, dnOn );
	  }
function sapUrMapi_PopupMenu_timeScroll(oWindow, sId, bDown, bCancel, e) {
    
    mnu.mnuWin = oWindow;
	e.stopPropagation();
    if (bCancel & mnu.intv == null){
        mnu.active = false;
        return false;
    }
    else if (bCancel){
        mnu.cancel = true;
        mnu.mnuWin.parent.clearInterval(mnu.intv);
        mnu.intv = null;
        
        if (mnu.active == false){
            sapUrMapi_PopupMenu_scrollItem(sId, bDown);
        }
        mnu.active = false;
    }
    else{
        mnu.cancel = false;
		mnu.intv = mnu.mnuWin.parent.setInterval("sapUrMapi_PopupMenu_scrollItem('" + sId + "', '" + bDown + "')", mnu.delay);
    }
}
function sapUrMapi_PopupMenu_manualScroll(oWindow, sId, bDown, bCancel, e ){
    
    mnu.mnuWin = oWindow;
    
	if (bCancel){
        mnu.cancel = true;
        mnu.mnuWin.parent.clearInterval(mnu.intv);
        mnu.intv = null;
        
        if (mnu.active == false){
            sapUrMapi_PopupMenu_scrollItem(sId, bDown);
        }
        mnu.active = false;
	}
	else{
    return false;
}
}
function sapUrMapi_PopupMenu_scrollItem(sId, bDown) {
    mnu.active = true;
    
	var tbl = mnu.mnuWin.document.getElementById(sId+"-r");
    var tbody = tbl.childNodes.item(1);
    
    var rIdx = tbl.getAttribute("visidx") - 0;
    var visCnt = tbl.getAttribute("viscnt") - 0;
    
    if (bDown == "true"){
        if ((rIdx + visCnt) >= tbody.rows.length){
            mnu.cancel = true;
        }
        else{
			
			for (var i = 0; i < tbody.rows[rIdx].cells.length; i++){
				tbody.rows[rIdx].cells[i].style.display = "none";
			}
			
			for (var i = 0; i < tbody.rows[rIdx + visCnt].cells.length; i++){
				tbody.rows[rIdx + visCnt].cells[i].style.display = "";
			}
            ++rIdx;
            tbl.setAttribute("visidx", rIdx);
            mnu.cancel = false;
        }
    }
    else{
       if (rIdx <= 0){
           mnu.cancel = true;
       }
       else{
           
		   for (var i = 0; i < tbody.rows[rIdx + visCnt - 1].cells.length; i++){
				tbody.rows[rIdx + visCnt - 1].cells[i].style.display = "none";
		   }
           --rIdx;
		   
		   for (var i = 0; i < tbody.rows[rIdx].cells.length; i++){
				tbody.rows[rIdx].cells[i].style.display = "";
		   }
           tbl.setAttribute("visidx", rIdx);
           mnu.cancel = false;
       }
    }
    
    if(mnu.cancel){
        mnu.mnuWin.parent.clearInterval(mnu.intv);
        mnu.intv = null;
        return;
    }
    else{
       
       if ((rIdx + visCnt - 0) >= tbody.rows.length){
           sapUrMapi_PopupMenu_setButtons(sId, true, false);
       }
       else{
           sapUrMapi_PopupMenu_setButtons(sId, true, true);
      }
       if (rIdx - 0 <= 0){
          sapUrMapi_PopupMenu_setButtons(sId, false, false);
	  }
       else{
          sapUrMapi_PopupMenu_setButtons(sId, false, true);
	  }
	}
}
function sapUrMapi_PopupMenu_setButtons( sId, bUp, bOn ){ 
 var x; 
 var node;   
 (bUp)? x = 2 : x = 0; 
 if (mnu.mnuWin != null){ 
   try { 
     node =  mnu.mnuWin.document.getElementById(sId+"-r").childNodes.item(x).childNodes.item(0).childNodes.item(0); 
    } 
    catch (e) { 
      node = window.document.getElementById(sId+"-r").childNodes.item(x).childNodes.item(0).childNodes.item(0); 
    } 
  } 
  else { 
    node = window.document.getElementById(sId+"-r").childNodes.item(x).childNodes.item(0).childNodes.item(0); 
  } 
  if (!bOn){ 
       node.className = node.className.split("Dsbl")[0] + "Dsbl"; 
  } 
  else{ 
       node.className = node.className.split("Dsbl")[0]; 
  } 
}
function sapUrMapi_PopupMenu_setEvents(o,bExit) {
	if (o) {
		var tbls = o.frame.window.document.getElementsByTagName("TABLE");
		for (var z = 0; z < tbls.length; z++){
			if (tbls[z].getAttribute("viscnt") != null){
				var tbl = tbls[z];
			}
		}
		try{
			if (tbl.childNodes.item(1) != null){
				var items=tbl.childNodes.item(1).childNodes;
			}
			else{
			   var items=tbl.childNodes.item(0).childNodes;
			}
		}
		catch (e) {return;}
		o.frame.window.menuObject = sapUrMapi_PopupMenu(items);
		try {
		  o.frame.window.onkeydown=o.frame.window.document.getElementsByTagName("BODY").item(0).childNodes.item(0).childNodes.item(0).childNodes.item(0).onkeydown;
		} catch(ex) {}
		ur_focus(o.frame.window);
		itemsArray[o.frame.window.mylevel]=o.frame.window.menuObject;
		if (o.frame.window.mylevel>1) {
			sapUrMapi_PopupMenu_setItemActive(o.frame.window,subMenus[o.frame.window.mylevel].frame.window.menuObject.activeItem, "blank")
		} else {
	  	if (bExit==2){
		  	
  } else {
			 if (oPopup == null && oDatePicker != null){
				sapUrMapi_PopupMenu_setItemActive(oDatePicker.frame.window,-1, "blank");
			 }
			 if (oPopup != null && oDatePicker == null){
				sapUrMapi_PopupMenu_setItemActive(oPopup.frame.window,-1, "blank");
			 }
		  }
		}
		if (bExit==1){
	    sapUrMapi_PopupMenu_setItemActive(o.frame.window,"first", "blank");
	  }
  }
}
function sapUrMapi_PopupMenuItem_setDisabled( sPopupMenuId, iIdx){
  var tbl = window.document.getElementById(sPopupMenuId+"-r");
	if (isNaN(iIdx)) { return; }
	var rows = tbl.childNodes.item(1).rows;
	rows(iIdx).className="urMnuRowDsbl";
	rows(iIdx).setAttribute("dsbl","true");
	rows(iIdx).cells(1).oldTitle=rows(iIdx).cells(1).title;
  rows(iIdx).cells(1).title=getLanguageText("SAPUR_POPUP_ITEM_DISABLED_WHL",new Array(rows(iIdx).cells(1).innerText,"SAPUR_POPUP_ITEM_DISABLED"))
}
function sapUrMapi_PopupMenuItem_setEnabled( sPopupMenuId, iIdx){
  var tbl = window.document.getElementById(sPopupMenuId+"-r");
	if (isNaN(iIdx)) { return; }
	var rows = tbl.childNodes.item(1).rows;
	rows(iIdx).className="urMnuRowOff";
	rows(iIdx).setAttribute("dsbl","false");
	rows(iIdx).cells(1).title=rows(iIdx).cells(1).oldTitle;
}
function sapUrMapi_ToolbarButton_openMenu( sButtonId, e){
	var sPopupId=document.getElementById(sButtonId+"-r").getAttribute("popup");
	if ((e.type!="click")&&(e.type!="contextmenu")) {
		if (!sapUrMapi_checkKey(e,"keydown",new Array("32","40"))) {
	    e.cancelBubble=true;
	    e.returnValue=true;
		  return false;
		}
	}
	if (ur_system.direction=="rtl") {
	  sapUrMapi_PopupMenu_showMenu(sButtonId+"-r",sPopupId,sapPopupPositionBehavior.MENURIGHT,e);
	} else {
	  sapUrMapi_PopupMenu_showMenu(sButtonId+"-r",sPopupId,sapPopupPositionBehavior.MENULEFT,e);
	}
  e.cancelBubble=false;
	if ((e.type=="contextmenu")) {
    e.returnValue=false;
  } else {
    e.returnValue=true;
  }
}
function sapUrMapi_PopupMenu_selectItem(oWnd,sItemId,bChecked,oEvt) {
   oWnd.me.sapUrMapi_ToolbarButton_setFunctionFromMenuItem(sItemId);  
   oWnd.me.sapUrMapi_PopupMenu_hideAll();
   sapUrMapi_cancelEvent(oEvt);
}

//** PopupTrigger.nn6 **

function sapUrMapi_PopupTrigger_hover(sId,bIn,e) {
	if (bIn || e.type=="mouseover") {
		document.getElementById(sId).className = "urPopUpTrgWhl urPopUpTrgInd";
		if (e.type=="focus") {
	      document.getElementById(sId).setAttribute("opened","false");
	      document.getElementById(sId).setAttribute("focused","true");
	    }
	} 
	if (bIn==false || e.type=="mouseout") {
   	if (document.getElementById(sId).getAttribute("opened")!="true"){
		  if (document.getElementById(sId).getAttribute("focused")=="true"){
		  } else {
		    document.getElementById(sId).className = "urPopUpTrgWhl";
		  }
		  if (e.type=="blur") {
		    document.getElementById(sId).setAttribute("focused","false");
		    document.getElementById(sId).className = "urPopUpTrgWhl";
		  }
		}
  }
  e.cancelBubble=true;
  e.returnValue=true;
}
function sapUrMapi_PopupTrigger_openMenu(sId,sMenuId,e) {
	if ((e.type!="click")&&(e.type!="contextmenu")) {
		if (!sapUrMapi_checkKey(e,"keydown",new Array("32","40"))) {
	    e.cancelBubble=true;
	    e.returnValue=true;
		  return false;
		}
	}
	if (ur_system.direction=="rtl") {
	  sapUrMapi_PopupMenu_showMenu(sId,sMenuId,sapPopupPositionBehavior.MENURIGHT,e);
	} else {
	  sapUrMapi_PopupMenu_showMenu(sId,sMenuId,sapPopupPositionBehavior.MENULEFT,e);
	}
  e.cancelBubble=false;
	if ((e.type=="contextmenu")) {
    e.returnValue=false;
  } else {
    e.returnValue=true;
  }
}
function sapUrMapi_PopupTrigger_RegisterCreate(sId) {
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_PopupTrigger_init('" + sId + "')");
}
function sapUrMapi_PopupTrigger_init(sId){}

//** RadioButton.nn6 **

function sapUrMapi_RadioButton_registerCreate(sId) {
}
function sapUrMapi_RadioButton_create(sId) {
}
function sapUrMapi_RadioButton_toggle(sId,e) {
  var oIn=ur_get(sId);
  if (oIn.disabled) return false;
  var oInGrp=new Array();
  if(oIn.name!="") 
		oInGrp=document.getElementsByName(oIn.name);
	else
		oInGrp[0]=oIn;
  oIn.checked = true;
  ur_focus(oIn);
  for(var i=0;i<oInGrp.length;i++){
	  var oImg = ur_get(oInGrp[i].id+"-img");
	  if (oImg == null) continue;
	  if(oInGrp[i].checked ){ 
			if(oImg.className.indexOf("Chk")<0)
				oImg.className=oImg.className.replace("urImgRbgImg","urImgRbgImgChk");
    }
	  else {
	  	if (!oInGrp[i].disabled) {
	  	   oImg.className=oImg.className.replace("urImgRbgImgChk","urImgRbgImg");
	  	} else {
	  		if(oImg.className.indexOf("Dsbl")<0)
	  			oImg.className=oImg.className.replace("urImgRbgImg","urImgRbgImgDsbl");
	  	}
	  }
  }
  return true;
}
function sapUrMapi_RadioButton_setDisabled(sId) {
  var oIn=ur_get(sId);
  var oImg=ur_get(sId+"-img");
  oIn.disabled=true;
	if(oImg.className.indexOf("Chk")>=0){ 
		if(oImg.className.indexOf("Dsbl")<0)
			oImg.className=oImg.className.replace("urImgRbgImgChk","urImgRbgImgChkDsbl");
	}
	else{ 
		if(oImg.className.indexOf("Dsbl")<0)
			oImg.className=oImg.className.replace("urImgRbgImg","urImgRbgImgDsbl");
	}
	ur_setDisabled(oIn,true);
	sapUrMapi_Label_setDisabled(sapUrMapi_Label_getInputLabel(sId));
}
function sapUrMapi_RadioButton_setEnabled(sId) {
  var oIn=ur_get(sId);
  oIn.disabled=false;
	var oImg=ur_get(sId+"-img");
	if (oImg.className.indexOf("Chk")>=0) 
		oImg.className=oImg.className.replace("urImgRbgImgChkDsbl","urImgRbgImgChk");
	else 
		oImg.className=oImg.className.replace("urImgRbgImgDsbl","urImgRbgImg");
	ur_setDisabled(oIn,false);
	sapUrMapi_Label_setEnabled(sapUrMapi_Label_getInputLabel(sId));
}
function sapUrMapi_RadioButton_setReadonly(sId,bSet){
  var oIn=ur_get(sId);
	var oImg=ur_get(sId+"-img");
	if(bSet){
		if (oImg.className.indexOf("Chk")>=0){ 
			if(oImg.className.indexOf("Dsbl")<0)
				oImg.className=oImg.className.replace("urImgRbgImgChk","urImgCbgImgChkDsbl");
		}
		else{ 
			if(oImg.className.indexOf("Dsbl")<0)
				oImg.className=oImg.className.replace("urImgRbgImg","urImgRbgImgDsbl");
		}
		oIn.disabled=true;	
		ur_setReadonly(oIn,true);
	}
	else{
		if (oImg.className.indexOf("Chk")>=0) 
			oImg.className=oImg.className.replace("urImgRbgImgChkDsbl","urImgRbgImgChk");
		else 
			oImg.className=oImg.className.replace("urImgRbgImgDsbl","urImgRbgImg");
		oIn.disabled=false;	
		ur_setReadonly(oIn,false);	
	}
	sapUrMapi_Label_setEnabled(sapUrMapi_Label_getInputLabel(sId));
}
function sapUrMapi_RadioButton_focus(sId,oEvt) {
	sapUrMapi_DataTip_show(sId,"focus");
}
function sapUrMapi_RadioButton_blur(sId,oEvt) {
	sapUrMapi_DataTip_hide();
}
function sapUrMapi_RadioButton_keydown(sId,oEvt) {
}

//** RoadMap.nn7 **

function sapUrMapi_RoadMap_hoverEdges(sId,sEdgeName,sBool,e){
	var oMore=document.getElementById(sId + '-itm-' + sEdgeName).childNodes.item(0);
	if(sBool=='true' && sEdgeName=='end'){
		oMore.className='urRMMoreAfterHover';
	}
	if(sBool=='false' && sEdgeName=='end'){
		oMore.className='urRMMoreAfter';
	}
	if(sBool=='true' && sEdgeName=='start'){
			oMore.className='urRMMoreBeforeHover';
	}
	if(sBool=='false' && sEdgeName=='start'){
		oMore.className='urRMMoreBefore';
	}
}
function sapUrMapi_RoadMap_hoverStep(sId,sStepNr,sBool,sStep){
	var oStep=document.getElementById(sId + '-itm-' + sStepNr).childNodes.item(0).childNodes.item(0).childNodes.item(0).childNodes.item(1);
	var oStepName=document.getElementById(sId + '-itm-' + sStepNr).childNodes.item(1);
	if(sStep=='default'){
			if(sBool=='true'){
				oStep.className='urRMStep urRMStepStd urRMStepHover';
				oStepName.className='urRMStepItem urRMItemHover';
			}else{
				oStep.className='urRMStep urRMStepStd';
				oStepName.className='urRMStepItem';
			}
		}
	if(sStep=='rtstart'){
			if(sBool=='true'){
				oStep.className='urRMStep urRMRoundTripStart urRMRoundTripStartHover';
				oStepName.className='urRMStepItem urRMItemHover';
			}else{
				oStep.className='urRMStep urRMRoundTripStart';
				oStepName.className='urRMStepItem';
			}
		}
	if(sStep=='rtend'){
			if(sBool=='true'){
				oStep.className='urRMStep urRMRoundTripEnd urRMRoundTripEndHover';
				oStepName.className='urRMStepItem urRMItemHover';
			}else{
				oStep.className='urRMStep urRMRoundTripEnd';
				oStepName.className='urRMStepItem';
			}
		}
	if(sStep=='rt'){
			if(sBool=='true'){
				oStep.className='urRMStep urRMRoundTrip urRMRoundTripHover';
				oStepName.className='urRMStepItem urRMItemHover';
			}else{
				oStep.className='urRMStep urRMRoundTrip';
				oStepName.className='urRMStepItem';
			}
		}
	if(sStep=='sub'){
			if(sBool=='true'){
				oStep.className='urRMSubStep urRMSubStepHover';
				oStepName.className='urRMStepItem urRMItemHover';
			}else{
				oStep.className='urRMSubStep';
				oStepName.className='urRMStepItem';
			}
		}
}
function sapUrMapi_RoadMap_getSelected(sId,e){}
//** SapTable.nn6 **

function sapUrMapi_SapTable_getClickedRowIndex(e)
{
   if (typeof(e)=='undefined') {
     oSrc = window.event.target;
   } else {
     oSrc = e.target;
   }
   var obj = oSrc;
   while ( (obj!=null) && (obj.getAttribute("rr")==null) )
      obj = obj.parentElement;
   if(obj==null) return;
   try {
     var rowindex = obj.rr;
     var nr=parseInt(rowindex);
     if (isNaN(nr)) return null;
     else return nr;
   } catch (e) {
     return null;
   }
}
function sapUrMapi_SapTable_getClickedColIndex(e)
{
   if (typeof(e)=='undefined') {
     oSrc = window.event.target;
   } else {
     oSrc = e.target;
   }
   var obj=oSrc;
   while ( (obj!=null) && (obj.getAttribute("colidx")==null) )
      obj = obj.parentElement;
   if(obj==null) return;
   try {
     var colindex = obj.cc;
     var nr=parseInt(colindex);
     if (isNaN(nr)) return null;
     else return nr;
   } catch (e) {
     return null;
   }
}
function sapUrMapi_SapTable_getClickedCellId(e)
{
   if (typeof(e)=='undefined') {
     oSrc = window.event.target;
   } else {
     oSrc = e.target;
   }
   var obj=oSrc;
   while ( (obj!=null) && (obj.getAttribute("colidx")==null) )
      obj = obj.parentElement;
   if(obj==null) return;
   try {
     var col=obj.cc;
     var thisid = obj.id;
     return thisid;
   } catch (e) {
     return null;
   }
}
function sapUrMapi_SapTable_getClickedRow(sTableId,e) {
   if (typeof(e)=='undefined') {
     oSrc = window.event.target;
   } else {
     oSrc = e.target;
   }
   var obj=oSrc;
   while ( (obj!=null) && (obj.getAttribute("rr")==null) )
      obj = obj.parentElement;
   if(obj==null) return;
     return sapUrMapi_SapTable_getRow(sTableId,parseInt(obj.rr))
 }
function sapUrMapi_SapTable_getRow(sTableId, iRowIdx) {
	colTr = ur_get(sTableId).getElementsByTagName("TR");
	arrRows = new Array();
	for (var i=0;i<colTr.length;i++) {
	  if (colTr.item(i).getAttribute("r")!=null) {
	  	if (colTr.item(i).childNodes.item(0).getAttribute("rr")!=null) {
		  	arrRows[arrRows.length]=colTr.item(i);
		  	if (arrRows.length>iRowIdx) return colTr.item(i);
		  }
		}
	}
	return null;
}
function sapUrMapi_SapTable_correctSelectionBorder(oRow) {
	return;
	collRows = oRow.parentNode.childNodes;
	var count=-1;
	for (var x=0; x<collRows.length;x++) {
		if (collRows.item(x).childNodes.item(0).tagName!="TD") {
		  continue;
		} else {
			count++;
		}
	  if (count>0) {
	    oTestRow1 = collRows.item(x-1);
	    oTestRow2 = collRows.item(x);
			for (var n=0;n<oTestRow2.childNodes.length;n++) {
		    if (oTestRow2.childNodes.item(0).className.indexOf("Sel")>-1) {
						var oItem=oTestRow1.childNodes.item(n);
						oTestRow1.childNodes.item(n).style.borderBottomColor=document.defaultView.getComputedStyle(oTestRow2.childNodes.item(n),null).getPropertyValue("border-top-color");
						oTestRow1.childNodes.item(n).style.borderBottomStyle=document.defaultView.getComputedStyle(oTestRow2.childNodes.item(n),null).getPropertyValue("border-top-style");
						oTestRow2.childNodes.item(n).style.borderTopWidth="0px";
		  	} else {
						oTestRow1.childNodes.item(n).style.borderBottomWidth=document.defaultView.getComputedStyle(oTestRow2.childNodes.item(n),null).getPropertyValue("border-bottom-style");
						oTestRow1.childNodes.item(n).style.borderBottomColor=document.defaultView.getComputedStyle(oTestRow2.childNodes.item(n),null).getPropertyValue("border-bottom-color")
						oTestRow2.childNodes.item(n).style.borderTopWidth="0px";
			  }
	    }
	  }
	}
}
function sapUrMapi_SapTable_selectRowByObject(oRow,bSelect,bSecondary) {
	if (oRow==null) return;
	oButton = oRow.getElementsByTagName("BUTTON").item(0);
	if (!oButton.getAttribute("rr")) return;
	if (oButton.getAttribute("rr")!="") {
		var sClass=oButton.className;
		if (!bSelect) {
			oButton.className="urSTRowUnSelIcon";
			for (var n=0;n<oRow.childNodes.length;n++) {
				oItem=oRow.childNodes.item(n);
				for (var n=0;n<oRow.childNodes.length;n++) {
					oItem=oRow.childNodes.item(n);
				  sapUrMapi_SapTableSelectCell(oItem,true,false);
				}
			}
		} else {
			if (sClass=="urSTRowUnSelIcon") {
				if (bSecondary) {
  				oButton.className="urSTRowSelSecIcon";
				} else {
					oButton.className="urSTRowSelIcon";
				}
				for (var n=0;n<oRow.childNodes.length;n++) {
					oItem=oRow.childNodes.item(n);
					if (oItem==oButton.parentNode) {
					  sapUrMapi_SapTableSelectCell(oItem,oItem.nextSibling.edit=="true",true);
					} else {
					  sapUrMapi_SapTableSelectCell(oItem,oItem.edit=="true",true);
					}
				}
			}
		}
	}
}
function sapUrMapi_SapTable_selectRow(sTableId, sRowIdx,iCol, iGroup, e) {
	var oRow    = e.target.parentNode.parentNode;
	var oButton = e.target;
	var sClass=oButton.className;
	if (sClass=="urSTRowSelIcon") {
		oButton.className="urSTRowUnSelIcon";
		for (var n=0;n<oRow.childNodes.length;n++) {
			oItem=oRow.childNodes.item(n);
		  sapUrMapi_SapTableSelectCell(oItem,true,false);
		}
	}
	if (sClass=="urSTRowUnSelIcon") {
		oButton.className="urSTRowSelIcon";
		for (var n=0;n<oRow.childNodes.length;n++) {
			oItem=oRow.childNodes.item(n);
			if (oItem==oButton.parentNode) {
			  sapUrMapi_SapTableSelectCell(oItem,oItem.nextSibling.edit=="true",true);
			} else {
			  sapUrMapi_SapTableSelectCell(oItem,oItem.edit=="true",true);
			}
		}
	}
	sapUrMapi_SapTable_correctSelectionBorder(oRow);
	return oRow;
}
function sapUrMapi_SapTableSelectCell(oCell,bEdit,bSelect) {
	if (typeof(bSelect)=="undefined") bSelect=true;
	if (bSelect) {
		if (bEdit) {
		  oCell.className=oCell.className+" urSTSel";
		} else {
		  oCell.className=oCell.className+" urSTSelRo";
		}
  } else {
  	arrClasses = oCell.className.split(" ");
	  var s="";
		for (var i=0;i<arrClasses.length;i++) {
			if (arrClasses[i].indexOf("urSTSel")==-1) {
				s=s+" "+arrClasses[i];
		  }
		}
		oCell.className=s;
	}
}
function sapUrMapi_SapTable_clickSelButton(oRow,oEvt){
	while(oRow.tagName!="TR") oRow = oRow.parentNode;
	if(oRow.tagName!="TR")return;
	var sButtons = oRow.getElementsByTagName("BUTTON");
	for(var i=0;i<sButtons.length;i++){
		if(sButtons[i].className=="urSTRowUnSelIcon" || sButtons[i].className=="urSTRowSelIcon"){
			sButtons[i].click();
			return;
		}
	}
}
var _ur_tables=new Array();
function ur_Table_create(sId) {
	if (_ur_tables[sId]==null) { 
		
		var oRows = new Array();
		var oRefCells = new Array();
		var oBdy = null;
		var iR=0;
		var oTab=ur_get(sId);
		while(oBdy==null){
		  if (oTab.rows[iR].cells[0]==null){iR++;continue;}
		  var oTmp=oTab.rows[iR].cells[0].firstChild;
		  if (oTmp==null) {iR++;continue;}
		  if (oTmp.tagName=="TABLE") {
		    if (oTmp.getAttribute("bd")=="1") {
					oBdy=oTmp;
					break;
		    }	  
		    if (oTmp.firstChild.firstChild.firstChild.getAttribute("ct")=="Toolbar") {
					oTb=oTmp.firstChild.firstChild.firstChild;
					bHasTb=true;
		    }	  
		  }
		  iR++;
		}
		var oTRows = oBdy.rows;
		var oDCells = null;
		var oRowSpanedCells = new Array();
		
		var iMax=0;
		for (var iRowCount=0;iRowCount<oTRows.length;iRowCount++)  {
			var oCells = new Array();
			var iColCount=0;
			oDCells=oTRows[iRowCount].cells;
			var iLength=iMax;
			if (oDCells.length>iMax) iLength=oDCells.length; 
			for (var iCol=0;iCol<iLength;iCol++) {
				if (oRowSpanedCells!=null) { 
					for (var k=0;k<oRowSpanedCells.length;k++) {
						if (oRowSpanedCells[k].pos==iCol && oRowSpanedCells[k].rspan>1) { 
							iColCount++;
							oCells.push({ref:oRowSpanedCells[k].o,rspan:true}); 
							for (t=1;t<oRowSpanedCells[k].cspan;t++) { 
								iColCount++;
								oCells.push({ref:oRowSpanedCells[k].o,cspan:true,rspan:true}); 
							}
							oRowSpanedCells[k].rspan--; 
						}
					}
				}
				if (iCol<oDCells.length) {
					iColCount++;
					oCells.push({ref:oDCells[iCol]});	 
					var iColSpan=parseInt(oDCells[iCol].colSpan); 
					if (isNaN(iColSpan)) iColSpan=1;
					var iRowSpan=parseInt(oDCells[iCol].rowSpan); 
					if (isNaN(iRowSpan)) iRowSpan=1;
					if (iColSpan>1) {
						for (var x=1;x<iColSpan;x++) {
							
							oCells.push({ref:oDCells[iCol],cspan:true});
							iColCount++;
						}
					}
					if (iRowSpan>1) oRowSpanedCells.push({rspan:iRowSpan,cspan:iColSpan,o:oDCells[iCol],pos:iCol}); 
				}	
			}
			oRows.push({irowidx:oRows.length,ref:oTRows[iRowCount],cells:oCells}); 
			iMax=iColCount>iMax?iColCount:iMax; 
		}
		
		
		
		
		
		var oCols=new Array();
		for (var i=0;i<oRows.length;i++){
			for (var j=0;j<iMax;j++) {
				if (oRows[i].cells[j]==null) {
					oRows[i].cells[j]={ref:oRows[i].cells[j-1].ref,empty:true};
					oRows[i].cells[j-1].last=true; 
				} else {
					oRows[i].cells[j].empty=false;
					oRows[i].cells[j].last=j==iMax-1?true:false; 
				}
				if (i>0) oRows[i].previousRow=oRows[i-1];
				if (i<oRows.length-1) oRows[i].nextRow=oRows[i+1];
				oRows[i].irowidx=i;
				var oCell=oRows[i].cells[j]; 
				
				oRows[i].sel=-1;
				
				oCell.foc=false;
				oCell.sel=-1; 
				oCell.type="te"; 
				oCell.parentRow=oRows[i]; 
				oCell.headers=ur_table_getCellHeaders(oCell.ref.getAttribute("headers"));
				oCell.first=j==0?true:false; 
				oCell.isTH=oCell.ref.tagName=="TH"; 
				oCell.rowIdx=i;
				oCell.colIdx=j;
				
				
				if (i==0) {
					oCols.push({icolidx:j,cells:new Array()}); 
				}
				oCell.parentCol=oCols[j];	
				oCols[j].cells.push(oCell); 
				
				oCols[j].sel=-1;
				if (oCell.ref.id==null || oCell.ref.id=="") {
					oCell.ref.setAttribute("id",sId+"-cell-"+i+"-"+j);
				}
				if (oRefCells[oCell.ref.id]==null) {
				  oRefCells[oCell.ref.id] = new Array();
				  oRefCells[oCell.ref.id].push=oCell;
				} else {
				  oRefCells[oCell.ref.id].push=oCell;
				}
			}
		}
		
		_ur_tables[sId]={rows:oRows,cols:oCols,lookup:oRefCells};
	}
  
	return _ur_tables[sId];
}
function ur_table_getCellHeaders(s) {
	var result=null;
	if (s!=null && s!="") {
		result=new Array();
		var arrHdr=s.split(",");
		for (var iH=0;iH<arrHdr.length;iH++) {
			var oHdr=ur_get(arrHdr[iH]);
			result.push({ref:oHdr,text:""});
			
		}
	}
	return result;
}
function sapUrMapi_SapTable_keydown(sId,e){}
function sapUrMapi_SapTable_activate(sId,e){}
function sapUrMapi_SapTable_HiCell_he(o,oEvt) {
  oSrc=oEvt.target;
  var sTag=oSrc.tagName;
  var sCt="|"+sapUrMapi_getControlTypeFromObject(oSrc)+"|";
  var sClick="|TextView|SapTable|";
  if ((sClick.indexOf(sCt)>-1 || oEvt.keyCode==9 || oEvt.keyCode==107 || oEvt.keyCode==109) && (sCt!='|InputField|' && sCt!='|TextEdit|' && sCt!='|ComboBox|')) {
		var sExp=o.getAttribute("oex");	
		var sCol=o.getAttribute("oco");	
		var sCl=o.getAttribute("oc");
		var oFunc=null;
		var oExp=null;
		var oCol=null;
		var sClass=o.firstChild.className;
		var bNoMod = (oEvt.shiftKey==false && oEvt.ctrlKey==false && oEvt.altKey==false);  
		if (sCl!=null && sCl!="")
			oFunc=new Function("event",sCl);  
		if (sClass.indexOf("urSTExpClo")>-1 && sExp!=null && sExp!="")
			oExp=new Function("event",sExp);  
		if (sClass.indexOf("urSTExpOp")>-1 && sCol!=null && sCol!="")
			oCol=new Function("event",sCol);  
																																											
		if (oCol!=null &&(oEvt.type=="click" || (oEvt.type=="keydown" && oEvt.keyCode==109 && bNoMod))) {
			oCol(o.id);
			sapUrMapi_cancelEvent(oEvt);
		}
		if (oExp!=null && (oEvt.type=="click" || (oEvt.type=="keydown" && oEvt.keyCode==107 && bNoMod))) {
			oExp(o.id);
			sapUrMapi_cancelEvent(oEvt);
		}
		if (oFunc!=null && (oEvt.type=="click" || (oEvt.type=="keydown" && oEvt.keyCode==32 && bNoMod))) {
			oFunc(o.getAttribute("tableid"),o.id);
			sapUrMapi_cancelEvent(oEvt);
		}
	} else {
    return;
  }
}

//** SelectableLinkBar.nn6 **

function sapUrMapi_SelectableLinkBar_RegisterCreate(sId) {
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_SelectableLinkBar_create('" + sId + "')");
}
function sapUrMapi_SelectableLinkBar_create(sId) {
  sapUrMapi_SelectableLinkBar_draw(sId);
	
	sapUrMapi_Resize_AddItem(sId, "sapUrMapi_SelectableLinkBar_draw('" + sId + "')");
}
var oSelectableLinkBarContents= new Array();
function sapUrMapi_SelectableLinkBar_draw(sId) {
  var oLinkBar = document.getElementById(sId);
  var iWidth = oLinkBar.offsetWidth;
  var iOrgWidth=iWidth;
  var oLinkBarContent = document.getElementById(sId+"-cnt");
  var iFirstVisible=sapUrMapi_SelectableLinkBar_getFirstVisibleItem(sId);
  var iLastVisible=parseInt(ur_get(sId).getAttribute("lastitemidx"));
  if (oSelectableLinkBarContents[sId]==null) {
  	oSelectableLinkBarContents[sId]=oLinkBarContent;
  } else {
    if (iFirstVisible>=oSelectableLinkBarContents[sId].childNodes.length) return;
  	oParent = oLinkBarContent.parentNode;
  	oParent.removeChild(oLinkBarContent);
  	oSave = oSelectableLinkBarContents[sId].cloneNode(true);
  	oParent.appendChild(oSelectableLinkBarContents[sId]);
  	oSelectableLinkBarContents[sId]=oSave;
  	oLinkBarContent=document.getElementById(sId+"-cnt");
  }
  var oLinkBarScrollPrev = document.getElementById(sId+"-p");
  var oLinkBarScrollNext = document.getElementById(sId+"-n");
  iWidth-=oLinkBarScrollPrev.offsetWidth;
  iWidth-=oLinkBarScrollNext.offsetWidth;
  var nWidth=0;
  var xWidth=0;
  var xHeight=oLinkBarScrollNext.offsetHeight;
  var collItems = oLinkBarContent.childNodes;
  for (var n=0;n<collItems.length;n++) {
		  collItems.item(n).style.width="50px";
  }
  var ix=0;
  if (iWidth==0) {
  	oLinkBar.style.width="100%";
  	return;
  }
  if (iFirstVisible==-1) {
	  for (var n=0;n<iLastVisible+1;n++) {
	    nWidth+=collItems.item(n).offsetWidth;
	    if (nWidth<iWidth) {
	      xWidth=nWidth;
	    }
 	    if (nWidth>iWidth) {
	      collItems.item(ix).style.display="none";
	      ix++;
	      iFirstVisible=ix;
	    }
    }
    if (nWidth<iWidth) {
		  for (var n=iLastVisible+1;n<collItems.length;n++) {
		   	collItems.item(n).style.display="inline-table";
  	    iLastVisible=n-1;
		    if (nWidth<iWidth) {
		      xWidth=nWidth;
		    }
 	      nWidth+=collItems.item(n).offsetWidth;
	 	    if (nWidth>iWidth) {
	 	   	  collItems.item(n).style.display="none";
	 	    	break;
		    }
	    }
    }
  } else {
    var iLastVisible=-1;
	  for (var n=0;n<collItems.length;n++) {
		   if (n<iFirstVisible) {
		   	 collItems.item(n).style.display="none";
		    continue;
		   } else {
		   	collItems.item(n).style.display="inline-table";
		   }
		   nWidth+=collItems.item(n).offsetWidth;
		   if (nWidth<iWidth) {
		     xWidth=nWidth;
		   }
		   if (nWidth>iWidth) {
		     collItems.item(n).style.display="inline-table";
		     if (iLastVisible==-1) {
		     	 iLastVisible=n-1;
		     }
		   }
		   if (nWidth<iWidth) {
		     xWidth=nWidth;
		   }
	  }
  }
  if (iLastVisible==-1) {
  	 iLastVisible=collItems.length-1;
  }
  if (iFirstVisible==-1) {
  	 iFirstVisible=0;
  }
  oLinkBar.setAttribute("lastitemidx",iLastVisible);
  oLinkBar.setAttribute("firstitemidx",iFirstVisible);
  if (iLastVisible>=collItems.length-1) {
    oLinkBarScrollNext.className="urLnkBarScrlRight urLnkBarScrlRightDsbl";
  } else {
    oLinkBarScrollNext.className="urLnkBarScrlRight";
  }
  if (iFirstVisible==0) {
    oLinkBarScrollPrev.className="urLnkBarScrlLeft urLnkBarScrlLeftDsbl";
  } else {
    oLinkBarScrollPrev.className="urLnkBarScrlLeft";
  }
  var oLinkBarDiv = document.getElementById(sId+"-div");
  oLinkBarDiv.style.width=xWidth;
  oLinkBar.style.width=xWidth;
}
function sapUrMapi_SelectableLinkBar_getFirstVisibleItem(sLinkBarId) {
	return parseInt(ur_get(sLinkBarId).getAttribute("firstitemidx"));
}
function sapUrMapi_SelectableLinkBar_resize(sLinkBarId,e) {
  sapUrMapi_SelectableLinkBar_create(sLinkBarId);
}
function sapUrMapi_SelectableLinkBar_scroll(sLinkBarId,sDirection) {
  var iFirstVisible=sapUrMapi_SelectableLinkBar_getFirstVisibleItem(sLinkBarId);
  var iLastVisible=parseInt(ur_get(sLinkBarId).getAttribute("lastitemidx"));
  var iPageSize=iLastVisible-iFirstVisible;
	var oLinkBarContent = ur_get(sLinkBarId+"-cnt");
  var collItems = oLinkBarContent.childNodes;
  if (sDirection=="PREV") {
		iLastVisible=iFirstVisible-1;
		iFirstVisible=-1;
  } else {
		iFirstVisible=iLastVisible+1;
		iLastVisible=-1;
	}
	ur_get(sLinkBarId).setAttribute("firstitemidx",iFirstVisible)
	ur_get(sLinkBarId).setAttribute("lastitemidx",iLastVisible)
  sapUrMapi_SelectableLinkBar_draw(sLinkBarId);
}
function sapUrMapi_SelectableLinkBar_keydown(sId,e) {
	var o=e.target;
	
	if(e.keyCode=="32"){
		if(o.tagName=="A")o.click();
	}
	
	if(e.keyCode=="39"){
		if(o.tagName == "TABLE"){
			o=o.firstChild.firstChild.firstChild;
		}
		else{
			while(o.tagName != "TD") o=o.parentNode;
			sapUrMapi_setTabIndex(o.firstChild,-1);
			o=o.nextSibling;
			if(o==null) return;
		}
		if(o.firstChild.className == "urLnkBarLnkDsbl" && ur_system.is508 == false )o=o.nextSibling;
		if(o==null) return;
		if(o.style.display=="none")
			sapUrMapi_SelectableLinkBar_scroll(sId,"NEXT");
		sapUrMapi_setTabIndex(o.firstChild,0);
		ur_focus(o.firstChild);
		return true;
	}
	
	if(e.keyCode=="37"){
		if(o.tagName == "TABLE"){
			o=o.firstChild.firstChild.firstChild;
		}
		else{
			while(o.tagName != "TD") o=o.parentNode;
			sapUrMapi_setTabIndex(o.firstChild,-1);
			o=o.previousSibling;
			if(o==null) return;
		}
		if(o.firstChild.className == "urLnkBarLnkDsbl" && ur_system.is508 == false )o=o.previousSibling;
		if(o==null) return;
		if(o.style.display=="none")
			sapUrMapi_SelectableLinkBar_scroll(sId,"PREV");
		sapUrMapi_setTabIndex(o.firstChild,0);
		ur_focus(o.firstChild);
		return true;
	}
}

//** TableView.nn6 **

function sapUrMapi_Table_selectRow(sTableId,iRow,e) {
  var oInput = document.getElementById(sTableId+'-itm-'+iRow);
  var oInputGrp = document.getElementsByName(oInput.name);
  if ((oInputGrp.length==1)&&(oInput.type!="radio")) {
    if (e.target.tagName=="IMG") oInput.checked = (!oInput.checked);
		var oImg = document.getElementById(oInput.id + "-img");
	  oImg.className = "urImgCbgImg";
		if (oInput.checked) oImg.className = "urImgCbgImgChk";
		
		var oRow = oInput.parentNode;
		while(!oRow.getAttribute("rr")) {
			oRow=oRow.parentNode;
		}
		for (var n=0;n<oRow.cells.length;n++) {
			var oCell = oRow.cells[n];
			if (oInput.checked) {
			  oCell.setAttribute("unselectedclass",oCell.className);
			  
			} else {
	  	  
			}
		}
  } else {
	  for (var i = 0; i < oInputGrp.length; i++){
	    var oImg = document.getElementById(oInputGrp[i].id + "-img");
	    if (oInputGrp[i]==oInput){
			  if (e.target.tagName=="IMG") oInput.checked=true;
			  if (e.target.tagName=="IMG") ur_focus(oInputGrp[i]);
		    oImg.className = "urImgRbgImgChk";
	    } else {
			 if (oImg.onclick) {
			 oInputGrp[i].checked=false;
	     oImg.className = "urImgRbgImg";
	    }
   }
  }
  }
  e.cancelBubble=true;
}
function sapUrMapi_Table_getClickedRowIndex(sId,oEvent) {
 	 oSrc = oEvent.target;
   var obj = oEvent.target;
   while ( (obj!=null) && (obj.tagName!='TD') )
      obj = obj.parentNode;
   if(obj==null) return;
   var parent = obj.parentNode;
   var rowIndex = parent.getAttribute("rr");
   return parseInt(rowIndex);
}
function sapUrMapi_Table_getClickedColIndex(sId,oEvent) {
 	 oSrc = oEvent.target;
   var obj = oEvent.target;
   while ( (obj!=null) && (obj.tagName!='TD') )
      obj = obj.parentNode;
   var oCell = obj;
   while ( (obj!=null) && (obj.tagName!='TR') )
      obj = obj.parentNode;
   var oRow = obj;
   while ( (obj!=null) && (obj.tagName!='TABLE') )
      obj = obj.parentNode;
   var oTable = obj;
   if ( obj==null ) return;
   var idx = 0;
   while (oRow.childNodes.item(idx)!=oCell) {
   	 idx++;
   }
   var colidx =  idx - parseInt( oTable.getAttribute("nmi"));
   return colidx;
}
function sapUrMapi_Table_getClickedCellId(sId,oEvent) {
 	 oSrc = oEvent.target;
   var obj = oEvent.target;
   while ( (obj!=null) && (obj.tagName!='TD') )
      obj = obj.parentNode;
   var oCell = obj;
   var cellid =  oCell.getAttribute("id");
   return cellid;
}
function sapUrMapi_Table_keydown(sId,e){}
function sapUrMapi_Table_activate(sId,e){}

//** TabStrip.nn6 **

function sapUrMapi_TabStrip_RegisterCreate(sId,iCount,iActive) {
  if (ur_get(sId).getAttribute("exact")!="1") return;
  sapUrMapi_Create_AddItem(sId, "sapUrMapi_TabStrip_create('" + sId + "','" + iCount + "','" + iActive + "')");
   
  sapUrMapi_Resize_AddItem(sId, "sapUrMapi_TabStrip_resize('"+sId+"',"+iCount+")");	
}
function sapUrMapi_TabStrip_create(sId,iCount,iActive) {
	if(iCount==0) return;
	var oTabTable=ur_get(sId);
	var colDiv=oTabTable.getElementsByTagName("div");
	var colContDiv  = new Array()
	var iHeight_atr='';
	var iWidth_atr=oTabTable.style.width;
	var iHeight=0;
	var iWidth=0;
	var re= sId+'-cnt-'
	for(i=0;i<iCount;i++){
		curTab = ur_get(sId + "-cnt-" + i);
		iHeight_atr=curTab.style.height;
		if (document.defaultView.getComputedStyle(curTab.childNodes[0],"overflow")=="visible") {
		if(curTab.scrollHeight>iHeight) iHeight=curTab.scrollHeight;
		if(curTab.scrollWidth>iWidth) iWidth=curTab.scrollWidth;
		if (iHeight_atr && iWidth_atr) break;
		} else {
			if (iWidth_atr!="" && iWidth_atr.indexOf("%")==-1) curTab.style.width=iWidth_atr;
			else if (iWidth_atr.indexOf("%")>-1) curTab.style.width=0;
		}
	}
	var activeTab = ur_get(sId + "-cnt-" + iActive);
	var iParentWdth = activeTab.parentNode.offsetWidth;
	var iParentHght = activeTab.parentNode.offsetHeight;
	
	if(iWidth_atr.indexOf("%")>-1 || iWidth_atr=="" || iWidth < iParentWdth) iWidth=iParentWdth;
	if(iHeight_atr.indexOf("%")>-1 || iHeight_atr=="" ||  iHeight < iParentHght ) iHeight=iParentHght;
	
		activeTab.style.height=iHeight;
		activeTab.style.width=iWidth;
		
}
function sapUrMapi_TabStrip_resize(sId,iCount)
{
	var iSel;
	
	for(i=0;i<iCount;i++)
	{
		var curTab = ur_get(sId + "-itm-" + i);
		if(curTab.classname = "urTbsLabelOn")
		{
			iSel = i;
			break;
		}
	}
	var activeTab = ur_get(sId + "-cnt-" + iSel);
	
	
	
	activeTab.style.width = 0;
	
}
function sapUrMapi_TabStrip_getSelectedItemId(sTabStripId) {
  var oTabTable 	= document.getElementById(sTabStripId+"-tbl");
	var iSelTab			=	parseInt(oTabTable.getAttribute("selectedtab"));
	return sTabStripId+"-itm-"+iSelTab;
}
function sapUrMapi_TabStrip_keySelect(strId, intSelectedIdx, intTabCount,e) {
}
function sapUrMapi_TabStrip_focusItem(sTabStripId,iFocusIdx,iTabCount,bNext,bPrev) {
}
function sapUrMapi_TabStrip_enter (sId,e) {
}
function sapUrMapi_TabStrip_setActiveItem(sId,iIdx) {
	with (document) {
		var oTabTable 	= getElementById(sId+"-tbl");
		var iSelTab			=	parseInt(oTabTable.getAttribute("selectedtab"));
		var iTabLength	=	parseInt(oTabTable.getAttribute("tabcount"));
		if (isNaN(iIdx)) return;
		if (getElementById(sId+"-itm-"+iIdx).getAttribute("dsbl")=="true") return false; 
		if ((iTabLength==1) || (iSelTab==iIdx)) return true; 
		var oCurrentTxt  = getElementById(sId+"-itm-"+iSelTab+"-txt");
		var oCurrentCell = getElementById(sId+"-itm-"+iSelTab);
		var oClickedTxt  = getElementById(sId+"-itm-"+iIdx+"-txt");
		var oClickedCell = getElementById(sId+"-itm-"+iIdx);
		var oFirstImage  = getElementById(sId+"-p");
		var oLastImage   = getElementById(sId+"-n");
		var oCurrentContent  = getElementById(sId+"-cnt-"+iSelTab);
	  	var oClickedContent  = getElementById(sId+"-cnt-"+iIdx);
		var oBorders=document.defaultView.getComputedStyle(oClickedContent.parentNode,"");
		var iBl=parseInt(oBorders.getPropertyValue("border-left-width"));
		var iBr=parseInt(oBorders.getPropertyValue("border-right-width"));
		var iBt=parseInt(oBorders.getPropertyValue("border-top-width"));
		var iBb=parseInt(oBorders.getPropertyValue("border-bottom-width"));
		oCurrentCell.className="urTbsLabelOff"; 
		oCurrentTxt.className = "urTbsTxtOff";  
		oClickedTxt.className = "urTbsTxtOn";   
	  oClickedCell.className="urTbsLabelOn";  
		if (iIdx!=0) oFirstImage.className="urTbsFirstAngOffPrevoff"; 
		else oFirstImage.className="urTbsFirstAngOnPrevoff"; 
		if (iIdx!=iTabLength-1)oLastImage.className="urTbsLastOffNextoff"; 
		else oLastImage.className="urTbsLastOnNextoff"; 
	  
		if (iSelTab==0) getElementById(sId+"-itm-"+(iSelTab+1)+"-a").className="urTbsAngOffOff";
		else  {
	  	getElementById(sId+"-itm-"+(iSelTab)+"-a").className="urTbsAngOffOff";
		  if (iSelTab!=iTabLength-1) getElementById(sId+"-itm-"+(iSelTab+1)+"-a").className="urTbsAngOffOff";
		}
	  
		if (iIdx==0) getElementById(sId+"-itm-"+(iIdx+1)+"-a").className="urTbsAngOnOff";
		else {
			getElementById(sId+"-itm-"+(iIdx)+"-a").className="urTbsAngOffOn";
			if (iIdx!=iTabLength-1) getElementById(sId+"-itm-"+(iIdx+1)+"-a").className="urTbsAngOnOff";
		}
	  oTabTable.setAttribute("selectedtab",iIdx); 
	  sapUrMapi_TabStrip_focusItem(sId,iIdx); 
	  
	  
		if (document.defaultView.getComputedStyle(oClickedContent.childNodes[0],"overflow")=="visible") {
	      if (ur_get(sId).getAttribute("exact")=="1") {
  		  oClickedContent.style.height=oCurrentContent.offsetHeight;
  		    oClickedContent.style.width=oCurrentContent.offsetWidth;
		  }
		}  else {
		  oClickedContent.style.height=oClickedContent.parentNode.offsetHeight-iBt-iBb;
		  oClickedContent.style.width=oClickedContent.parentNode.offsetWidth-iBl-iBr;
		}
		oCurrentContent.style.position="absolute";
		oCurrentContent.style.top="-10000";
		oCurrentContent.style.visibility="hidden";
		oClickedContent.style.position="static";
		oClickedContent.style.top="0";
		oClickedContent.style.visibility="inherit";
	}
	return true;
}

//** TextEdit.ie5 **

function sapUrMapi_TextEdit_focus(sId,oEvt){
	if(ur_system.is508) {
		var o=ur_get(sId);
		o.title=ur_getTooltip(sId);
	}
	sapUrMapi_DataTip_show(sId,"focus");
}
function sapUrMapi_TextEdit_blur(sId,oEvt) {
	sapUrMapi_DataTip_hide(sId);
}
function sapUrMapi_TextEdit_keydown(sId,oEvt) {
	if(oEvt.keyCode == "81" && oEvt.ctrlKey && !oEvt.altKey ){
		if (sapUrMapi_DataTip_isOpen(sId)) sapUrMapi_DataTip_hide(sId);
		else sapUrMapi_DataTip_show(sId,"keydown");
		sapUrMapi_cancelEvent(oEvt);
	}
	if(oEvt.keyCode == "27"){
		sapUrMapi_DataTip_hide(sId);
		sapUrMapi_cancelEvent(oEvt);
	}
}

//** TextView.ie5 **

function sapUrMapi_TextView_menuActivate(sTextViewId,e) {
	var o=ur_get(sTextViewId);
	if(sapUrMapi_checkKey(e,"keydown",new Array("32","40"))) {
		if(o.onclick) {o.onclick();return false;} 
		if(o.oncontextmenu) {o.oncontextmenu();return false;} 
		if(o.onmouseover) {o.onmouseover();return false;} 
	}
  return false;
}
function sapUrMapi_TextView_focus(sId,oEvt) {
	if(ur_system.is508) {
		var o=ur_get(sId);
		if(o!=null) o.title=ur_getTooltip(sId);
		else oEvt.srcElement.title=ur_getTooltip(oEvt.srcElement);
	}
}
//** Toolbar.nn6 **

function sapUrMapi_Toolbar_toggleItems(sControlId,e) {
  var oToggleButton = document.getElementById(sControlId+"-tgl");
  var oToolbar = document.getElementById(sControlId);
  var colItems = oToolbar.childNodes;
  var bShowAllState = oToggleButton.getAttribute("showall")=="true";
  for (var n=0;n<colItems.length;n++) {
  	var oItem=colItems.item(n);
  	if (oItem.getAttribute("cancollapse")=="true") {
  	  if (bShowAllState) {
  		  oItem.style.display="none";
  		  oItem.setAttribute("show","false");
      } else {
    	  oItem.style.display="inline";
  		  oItem.setAttribute("show","true");
    	}
    }
    if (oItem==oToggleButton) break;
  }
  if (bShowAllState) {
    oToggleButton.setAttribute("showall","false");
    oToggleButton.getElementsByTagName("IMG").item(0).className="urTbarBtnCol";
  } else {
    oToggleButton.setAttribute("showall","true");
    oToggleButton.getElementsByTagName("IMG").item(0).className="urTbarBtnExp";
  }
}

//** ToolbarButton.nn6 **
var ur_replace_function=false;
var ur_replace_function_button_id="";
function sapUrMapi_ToolbarButton_openMenu( sButtonId, e){
	var sPopupId=document.getElementById(sButtonId+"-r").getAttribute("popup");
	if (document.getElementById(sPopupId)==null) return;
	if (document.getElementById(sButtonId+"-r").getAttribute("replaceable")=="true") {
	  ur_replace_function=true;
	  ur_replace_function_button_id=sButtonId;
	}
	if ((e.type!="click")&&(e.type!="contextmenu")) {
		if (!sapUrMapi_checkKey(e,"keydown",new Array("32","40"))) {
	    e.cancelBubble=true;
    e.returnValue=true;
		  return false;
		}
	}
	if (ur_system.direction=="rtl") {
	  sapUrMapi_PopupMenu_showMenu(sButtonId+"-r",sPopupId,sapPopupPositionBehavior.MENURIGHT,e);
	} else {
	  sapUrMapi_PopupMenu_showMenu(sButtonId+"-r",sPopupId,sapPopupPositionBehavior.MENULEFT,e);
	}
  e.cancelBubble=false;
	if ((e.type=="contextmenu")) {
    e.returnValue=false;
  } else {
    e.returnValue=true;
  }
}
function sapUrMapi_ToolbarButton_setFunctionFromMenuItem(sMenuItemId) {
  if (ur_replace_function) {
  	var clickedItem = document.getElementById(sMenuItemId);
    var sImgSrc=""
    if (clickedItem.getElementsByTagName("img").length>0) {
      sImgSrc=clickedItem.getElementsByTagName("img").item(0).src;
    }
    var sText=clickedItem.getElementsByTagName("nobr").item(0).innerText;
    var effectedButtonId=ur_replace_function_button_id;
    ur_replace_function_button_id="";
    ur_replace_function=false;
    sapUrMapi_ToolbarButton_applyFunction( effectedButtonId, sText, sImgSrc, clickedItem.onclick)
  }
}
function sapUrMapi_ToolbarButton_applyFunction( sButtonId, sNewText, sNewImageSrc, fNewClickHandler){
  var effectedButton=document.getElementById(sButtonId);
  effectedButton.onclick=fNewClickHandler;
  effectedButton.onkeydown=fNewClickHandler;
  var sButtonContent=effectedButton.getElementsByTagName("nobr").item(0).innerHTML;
  if (effectedButton.getElementsByTagName("nobr").item(0).getElementsByTagName("img").length>0) {
    if (sNewImageSrc=="") {
      effectedButton.getElementsByTagName("nobr").item(0).innerHTML="<img height=\"12\" width=\"1\" border=\"0\" align=\"absmiddle\" src=\""+ur_system.mimepath+"1x1.gif\">"+sNewText
    } else {
      effectedButton.getElementsByTagName("nobr").item(0).innerHTML="<img border=\"0\" align=\"absmiddle\" src=\""+sNewImageSrc+"\">&nbsp;"+sNewText;
  }
  } else {
    effectedButton.getElementsByTagName("nobr").item(0).innerHTML=sNewText;
  }
 }

//** ToolbarInputField.ie5 **

function sapUrMapi_ToolbarInputField_blur(sId,event){
	sapUrMapi_InputField_Blur(sId,event);
}
function sapUrMapi_ToolbarInputField_keydown(sId,oEvt) {
	if(oEvt.keyCode == "81" && oEvt.ctrlKey && !oEvt.altKey ){
		oEvt.keyCode = "";
		oEvt.cancelBubble = true;
		oEvt.returnValue = false;
		if (sapUrMapi_DataTip_isOpen(sId)) sapUrMapi_DataTip_hide(sId);
		else sapUrMapi_DataTip_show(sId,"keydown");
	}
	if(oEvt.keyCode == "27"){
		oEvt.keyCode = "";
		oEvt.cancelBubble = true;
		oEvt.returnValue = false;
		sapUrMapi_DataTip_hide();
	}
}

//** Tray.nn6 **

function sapUrMapi_Tray_RegisterCreate(sId, bScroll, bCollapsed) {
	sapUrMapi_Create_AddItem(sId, "sapUrMapi_Tray_create('" + sId + "',"+bScroll+","+bCollapsed+")");
}
function sapUrMapi_Tray_create(sId,bScroll,bCollapsed) {
  if (bCollapsed==true) {
    sapUrMapi_Tray_toggle(sId);            
   
	}
}
function sapUrMapi_Tray_showOptionMenu2(sTrayId,sMenuContentId,oEvt) {
 	if (ur_system.direction=="rtl")
	  sapUrMapi_Tray_showOptionMenu(sTrayId,sTrayId+"-menu",sMenuContentId,sapPopupPositionBehavior.MENULEFT,oEvt) 
	else
	  sapUrMapi_Tray_showOptionMenu(sTrayId,sTrayId+"-menu",sMenuContentId,sapPopupPositionBehavior.MENURIGHT,oEvt) 
}
function sapUrMapi_Tray_showOptionMenu(idTray,idTrigger,idContent,pos,e) {
	if (e.type!="click") {
		if (!sapUrMapi_checkKey(e,"keydown",new Array("32","40"))) {
		  sapUrMapi_cancelEvent(e);
		  return false;
	   }
	}
	sapUrMapi_PopupMenu_showMenu(idTrigger,idContent,pos,e);
}
ur_trayBody=new Array();
ur_trayValues = new Array();
function sapUrMapi_Tray_toggle( idTray,sCtlType,e) 
{
  sCtlType="SAPUR_TRAY";
  if(typeof(e)!="undefined"){
	  if ((e.type!="click") && (!sapUrMapi_checkKey(e,"keypress",new Array("32","30")))) return false;
	  e.cancelBubble=true;
  }
	var elBody = document.getElementById(idTray+"-tbd");
	var sTitle = document.getElementById(idTray+"-hd");
	var elExpander = document.getElementById(idTray+"-exp");
	var elHeader = document.getElementById(idTray+"-hd");
	var elExpandState = document.getElementById(idTray+"-es");
	if (elBody.getAttribute("cp") == 1)
	{
		elBody.removeAttribute('style');
		elBody.style.visibility="static";
		elBody.setAttribute("cp","0");
		ur_get(idTray+"-bd").style.display ="block"; 
		
		
		
		ur_get(idTray+"-bd").style.display ="none"; 
		ur_get(idTray+"-bd").style.display ="block"; 
		
		if ( elExpander.className.indexOf("Closed") != -1) 
		{
				var re = /Closed/gi;
				var clsNm = elExpander.className;
				
				elExpander.className = clsNm.replace(re, "Open");
				
		}
			if ( elHeader.className == "urTrcHdBgClosedIco" )
				elHeader.className = "urTrcHdBgOpenIco";
			if ( elExpandState )
				elExpandState.value = "1";
			if (ur_system.is508) {
				elExpander.title=getLanguageText(sCtlType + "_COLLAPSE_WHL",new Array(sTitle.data,sCtlType + "_COLLAPSE",sCtlType + "_COLLAPSE_KEY",""));
			} else {
				elExpander.title=getLanguageText(sCtlType + "_COLLAPSE_WHL",new Array(sCtlType + "_COLLAPSE",sCtlType + "_COLLAPSE_KEY",""));
			}
 		}
		else
		{
			elBody.style.position ="absolute";
			elBody.style.overflow="hidden";
			elBody.style.visibility="hidden";
			elBody.style.height= "-2000px";
			elBody.style.width= "-2000px";
			elBody.setAttribute("cp","1");
			ur_get(idTray+"-bd").style.display ="none";
		
			if ( elExpander.className.indexOf("Open") != -1) {
				var re = /Open/gi;
				var clsNm = elExpander.className;
				
				elExpander.className = clsNm.replace(re, "Closed");
				
		  }
			if ( elHeader.className == "urTrcHdBgOpenIco" )
				elHeader.className = "urTrcHdBgClosedIco";
			if ( elExpandState )
				elExpandState.value = "0";
			if (ur_system.is508) {
				elExpander.title=getLanguageText(sCtlType + "_EXPAND_WHL",new Array(sTitle.data,sCtlType + "_EXPAND",sCtlType + "_EXPAND_KEY",""));
			} else {
				elExpander.title=getLanguageText(sCtlType + "_EXPAND_WHL",new Array(sCtlType + "_EXPAND",sCtlType + "_EXPAND_KEY",""));
			}
		}
	return true;
}
	
function ur_Tray_restoreValues(obj)
{
	
	var oInpColl = obj.getElementsByTagName("INPUT");
	var oTaColl = obj.getElementsByTagName("textarea");
	 for(i=0 ; i<oInpColl.length;i++)
    {	
		if(oInpColl[i].getAttribute("id"))
		oInpColl[i].value = ur_trayValues[oInpColl[i].getAttribute("id")] ;
		
    }
    for(i=0 ; i<oTaColl.length;i++)
    {
		if(oTaColl[i].getAttribute("id")){
		var sId = oTaColl[i].getAttribute("id");
		oTaColl[i].value = ur_trayValues[sId]  ;
		}
    }
}
function ur_Tray_CollectValues(obj)
{
	var oInpColl = obj.getElementsByTagName("INPUT");
	var oTaColl = obj.getElementsByTagName("textarea");
	
    for(i=0 ; i<oInpColl.length;i++)
    {	
		if(oInpColl[i].getAttribute("id"))
		ur_trayValues[oInpColl[i].getAttribute("id")] = oInpColl[i].value;
		
    }
    
    for(i=0 ; i<oTaColl.length;i++)
    {
		if(oTaColl[i].getAttribute("id")){
		var sId = oTaColl[i].getAttribute("id");
		ur_trayValues[sId] = oTaColl[i].value;
		}
    }
    
}
//** Tree.nn6 **

function sapUrMapi_Tree_collapseAll(sIdPrefix) {
    var eRootNode = document.getElementById(sIdPrefix + "-r");
    var eNodes = eRootNode.getElementsByTagName("DIV");
    
    for (var i = 0; i < eNodes.length; i++){
        var sStatus = eNodes[i].getAttribute("status");
        if (sStatus != null && sStatus != "closed"){
            
            var childDiv = document.getElementById(eNodes[i].id + "-child");
            var exp = document.getElementById(eNodes[i].id + "-exp");
            
            if (childDiv != null && childDiv.childNodes.length > 0 && childDiv.style.display != "none"){
            		sapUrMapi_Tree_toggle(sIdPrefix,eNodes[i].id);
            }
        }
    }
}
function sapUrMapi_Tree_toggle(sTreeId, sNodeId, bClose, bKey, e) {
	var nodeDiv = document.getElementById(sNodeId);
  if (typeof(e)=="object") {
    sapUrMapi_cancelEvent(e);
  }
	var childrenDiv = document.getElementById( nodeDiv.id + "-child" );
	var expander = document.getElementById( nodeDiv.id + "-exp" );
	if( nodeDiv.getAttribute("status") == "closed" )
	{
		nodeDiv.className = nodeDiv.className=nodeDiv.className+" urTreNlExp";
		if( childrenDiv != null) childrenDiv.style.display="block";
		eLength = expander.className.length;
		expander.className = expander.className.substr(0,eLength-3) + "Op";
        nodeDiv.setAttribute("status", "open");
	}
	else
	{
		if (nodeDiv.className.lastIndexOf(" ")>-1) {
		  nodeDiv.className = nodeDiv.className.substring(0,nodeDiv.className.lastIndexOf(" "));
		}
		if( childrenDiv != null) childrenDiv.style.display="none";
		eLength = expander.className.length;
		expander.className = expander.className.substr(0,eLength-2) + "Clo";
		nodeDiv.setAttribute("status", "closed");
	}
	
	
	
	try{
	if (typeof(bClose)=="object")
		if(bClose.target.id == sNodeId+"-exp")
			ur_EVT_cancel(bClose);
	}catch(ex){};
}
function sapUrMapi_TreeNode_keyDown(sTreeId,sNodeId,e) {
}
function sapUrMapi_Tree_controlEnter(sTreeId, sNodeId,e) {
	if (document.getElementById(sNodeId+"-cnt-end")) {
	  return true;
	}
	return false;
}
function sapUrMapi_Tree_InvokeNodeClick(sNodeId) {
	document.getElementById(sNodeId+":exp").onclick();
}
function sapUrMapi_TreeNode_hover(sTreeId,sNodeId,bIn,e) {
	if ((e.target.level) && (!e.target.container)) {
    if (bIn) e.target.className="urTreNoEnblClk urTreNoEnblClkHover"
    else e.target.className="urTreNoEnblClk";
  }
}
function sapUrMapi_TreeNode_mouseover(sTreeId,sNodeId,e) {
	sapUrMapi_TreeNode_hover(sTreeId, sNodeId, true, e);
}
function sapUrMapi_TreeNode_mouseout(sTreeId,sNodeId,e) {
	sapUrMapi_TreeNode_hover(sTreeId, sNodeId, false, e);
}
function sapUrMapi_Tree_getNodeId(sId) {
	var o=document.getElementById(sId);
	while (o.tagName!="BODY") {
		if (o.tagName=="DIV" && (o.getAttribute("status")=="open" || o.getAttribute("status")=="closed")) return o.id;
		o=o.parentNode;
	}
	return "";
}
function sapUrMapi_Tree_selectNode(sTreeId, sNodeId, iSelLevel) {
	var oNode   = document.getElementById(sNodeId);
	var bExp    = oNode.className.indexOf("urTreNlExp")>0;
	var sClass = oNode.className.substring(0,oNode.className.indexOf(" "));
	if (sClass=="") {
  	var sClass = oNode.className;
	}
	oNode.setAttribute("sellevel",""+iSelLevel);
	document.getElementById(sNodeId+"-cnt-start").setAttribute("sellevel",""+iSelLevel);
	if (iSelLevel==1) sClass+=" urTreNSel";
	if (iSelLevel==2) sClass+=" urTreNSel2";
	if (bExp) sClass+=" urTreNlExp";
	oNode.className=sClass;
}
function sapUrMapi_Tree_deselectAll(sTreeId) {
	var colNodes   = document.getElementsByTagName("DIV");
	for (var n=0;n<colNodes.length;n++) {
		if (colNodes.item(n).getAttribute("sellevel")) sapUrMapi_Tree_selectNode(sTreeId,colNodes.item(n).id,0);
	}
}
function sapUrMapi_Tree_expandAll(sTreeId) {
    var eRootNode = document.getElementById(sTreeId + "-r");
    var eNodes = eRootNode.getElementsByTagName("DIV");
    
    for (var i =  eNodes.length-1; i >-1; i--){
      var childDiv = document.getElementById(eNodes[i].id + "-child");
      if (childDiv) {
        sapUrMapi_Tree_toggle( sTreeId, eNodes[i].id, false, true)
      }
    }
}

//** TriStateCheckBox.nn6 **

function sapUrMapi_TriStateCheckBox_toggle(sId,e) {
  var oBtn = document.getElementById(sId);
  e.stopPropagation();
  if (oBtn.disabled) return false;
  var prevstate = oBtn.getAttribute("state");
  var state = "";
  if (prevstate == "Ind") {
	state = "Off";
  }
  else if (prevstate == "Off") {
	state = "On";
  }
  else if (prevstate == "On") {
	state = "Ind";
  }
  oBtn.setAttribute("state", state);
  var oImg = document.getElementById(sId + "-img");
  oImg.className = oImg.className.replace(prevstate, state);
  return false;
}
function sapUrMapi_TriStateCheckBox_setDisabled(sId) {
	var oBtn = document.getElementById(sId);
	oBtn.disabled=true;
	oBtn.className = oBtn.className + "Dsbl";
	sapUrMapi_Label_setDisabled(sapUrMapi_Label_getInputLabel(sId));
}
function sapUrMapi_TriStateCheckBox_setEnabled(sId) {
	var oBtn = document.getElementById(sId);
	oBtn.disabled=false;
	oBtn.className = oBtn.className.replace("Dsbl", "");
	sapUrMapi_Label_setEnabled(sapUrMapi_Label_getInputLabel(sId));
}
function ur_setSt(sId,aSt,bOn){
	var o=null;
	if(typeof(sId)=="string") o=ur_get(sId);
	else o=sId;
	if (!o) return 
	var sSt=o.getAttribute("st");
	
	if(sSt==null) sSt="";
	if(typeof(aSt)=="string")
		aSt=new Array(aSt);
	
	for(var i=0; i<aSt.length;i++){
		if(sSt=="" || sSt.indexOf(aSt[i])==-1){
			if(bOn) sSt+=aSt[i];
		}
		else{
			if(!bOn) sSt=sSt.replace(aSt[i],"");
		}
	}
	
	o.setAttribute("st",sSt);
}

function ur_isSt(sId,aSt){
	var o=null;
	if(typeof(sId)=="string") o=ur_get(sId);
	else o=sId;
	if (!o) return false; 
	var sSt=o.getAttribute("st");
	var bRet=true;
	if(sSt==null) return false;
	
	if(typeof(aSt)=="string")
		aSt=new Array(aSt);
	
	for(var i=0; i<aSt.length;i++)
		if(sSt.indexOf(aSt[i])==-1)
			bRet=false;
	return bRet;
}
function ur_getRootObj(o) {
  while(o.getAttribute!=null && (o.getAttribute("ct")==null || o.getAttribute("ct")==""))
    o=o.parentNode;
  if (o.getAttribute!=null && o.getAttribute("ct")!=null && o.getAttribute("ct")!="")
    return o;
}
