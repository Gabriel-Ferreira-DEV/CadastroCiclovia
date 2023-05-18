                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

var htmlbEventFunction = null;
function htmlbEF(event_string)
{
    htmlbEventFunction = new Function('htmlbevent', event_string);
}

function htmlbEnterKey(event)
{
  var keyCode=event.keyCode;
   if(keyCode==13)
      return true;
    else
      return false;
}

function htmlbSubmitPre() {}

function htmlbSubmitPost() {}

function htmlbSubmitForm(form)
{
  try{
    form.submit();
  }
  catch(e){
    if(window.onbeforeunload != "" && window.onbeforeunload != null) return;
    var isXPSP2=false;
    if(form.encoding=="multipart/form-data"){
      input_fields = form.getElementsByTagName("INPUT");
      for (var i = 0; i < input_fields.length; i++) {
        if(input_fields[i].type=="file"){
          isXPSP2=true;
          break;
        }
      }
    }
    if(isXPSP2==true){
      alert("HTML Submit Error\n\nWhat happened?\n"+
            "You have submitted a html form by using an input type=submit element.\n\n"+
            "Reason and Prerequisites:\nIn Microsoft Windows XP Service Pack 2 (SP2),\n"+
            "you have to submit a fully qualified path when you use an 'input type=file' element.\n\n"+
            "Please refer to note 899994.");
      if (document.getElementById("sapProtectDoubleSubmitBlock")!= null) return false;
    }
    else{
      alert("An error occurs during the sending of the data by the browser.\n"+
            "Please try again.");
      if (document.getElementById("sapProtectDoubleSubmitBlock")!= null) return false;
    }
  }
}

function htmlbDisableFields()
{

  try{
    frm_name=document.getElementById("htmlbevt_frm").value;
    frm_obj=document.getElementById(frm_name);
    if(frm_obj.htmlbScrollX.value==0 && frm_obj.htmlbScrollY.value==0){
      frm_obj.htmlbScrollX.disabled=true;
      frm_obj.htmlbScrollY.disabled=true;
    }
    frm_obj.htmlbdoc_id.disabled=true;
    frm_obj[frm_name+"_complete"].disabled=true;
    init=(parseInt(frm_obj.htmlbevt_cnt.value))+1;
    for(i=init;i!=10;i++)
      frm_obj["htmlbevt_par"+i].disabled=true;
  }
  catch(e) {}
}

function htmlbEnableFields()
{
  try{
    frm_name=document.getElementById("htmlbevt_frm").value;
    frm_obj=document.getElementById(frm_name);
    frm_obj.htmlbScrollX.disabled=false;
    frm_obj.htmlbScrollY.disabled=false;
    frm_obj.htmlbdoc_id.disabled=false;
    frm_obj[frm_name+"_complete"].disabled=false;
    init=(parseInt(frm_obj.htmlbevt_cnt.value))+1;
    for(i=init;i!=10;i++)
      frm_obj["htmlbevt_par"+i].disabled=false;
  }
  catch(e){}
}

function htmlbSubmit(elem,
                     eventType,
                     formID,
                     objectID,
                     eventName,
                     paramCount,
                     param1,param2,param3,param4,param5,param6,param7,param8,param9)
{


 if (document.getElementById(formID + "_complete").getAttribute("code") != "OK") return;

  var form = document.getElementById(formID);
  var func = window["doValidate_" + formID];
  if(func != null){
    var isValidate = true;
    isValidate = func();
    if(isValidate==false){
      if(document.all && event != null)
    event.returnValue = false;
      return false;
    }
  }
    form.htmlbScrollX.value = document.body.scrollLeft;
  form.htmlbScrollY.value = document.body.scrollTop;
  form.htmlbevt_ty.value = eventType;
  form.htmlbevt_oid.value = objectID;
  form.htmlbevt_id.value = eventName;
  form.htmlbevt_cnt.value = paramCount;
  if ( paramCount > 0 ) {
    form.htmlbevt_par1.value = param1;
  }else{
    form.htmlbevt_par1.value = "";
  };
  if ( paramCount > 1 ) {
    form.htmlbevt_par2.value = param2;
  }else{
    form.htmlbevt_par2.value = "";
  };
  if ( paramCount > 2 ) {
    form.htmlbevt_par3.value = param3;
  }else{
    form.htmlbevt_par3.value = "";
  };
  if ( paramCount > 3 ) {
    form.htmlbevt_par4.value = param4;
  }else{
    form.htmlbevt_par4.value = "";
  };
  if ( paramCount > 4 ) {
    form.htmlbevt_par5.value = param5;
  }else{
    form.htmlbevt_par5.value = "";
  };
  if ( paramCount > 5 ) {
    form.htmlbevt_par6.value = param6;
  }else{
    form.htmlbevt_par6.value = "";
  };
  if ( paramCount > 6 ) {
    form.htmlbevt_par7.value = param7;
  }else{
    form.htmlbevt_par7.value = "";
  };
  if ( paramCount > 7 ) {
    form.htmlbevt_par8.value = param8;
  }else{
    form.htmlbevt_par8.value = "";
  };
  if ( paramCount > 8 ) {
    form.htmlbevt_par9.value = param9;
  }else{
    form.htmlbevt_par9.value = "";
  };

  if(document.all)
  {
    if ( event != null )
      event.returnValue = false;
  }

  if (HTMLB_SECTION508){
   if(document.all)
      try{form.activeElement508.value = document.activeElement.getAttribute("id");}catch(ex){}
  }



  try { sap_htmlb_ofcsavescrol(); } catch(e) {}
  try { htmlbSubmitPre(); } catch(e) {}
  htmlbDisableFields();
  var l_answer=true;
  l_answer=htmlbSubmitForm(form);
  if(l_answer==false){return l_answer;}
  htmlbEnableFields();
  try { htmlbSubmitPost(); } catch(e) {}

  func = window["clearUp_" + formID];
  if(func != null){
    var isClearUp = true;
    isClearUp = func();
    if(isClearUp==false){
      event.returnValue = false;
      return false;
    }
  }

  form.htmlbevt_ty.value = "";
  form.htmlbevt_oid.value = "";
  form.htmlbevt_id.value = "";
  form.htmlbevt_cnt.value = 0;
  form.htmlbevt_par1.value = "";
  form.htmlbevt_par2.value = "";
  form.htmlbevt_par3.value = "";
  form.htmlbevt_par4.value = "";
  form.htmlbevt_par5.value = "";
  form.htmlbevt_par6.value = "";
  form.htmlbevt_par7.value = "";
  form.htmlbevt_par8.value = "";
  form.htmlbevt_par9.value = "";
}

function htmlbEvent(elem,
                    eventClass,
                    eventType,
                    formID,
                    objectID,
                    eventName,
                    paramCount,
                    param1,param2,param3,param4,param5,param6,param7,param8,param9)
{
 var htmlbevent = htmlbCreateEvent(elem,formID+" "+objectID,eventName);

  if(htmlbEventFunction==null)
    htmlbEventFunction = window[formID+"_"+objectID+"_"+eventClass];
  if ( htmlbEventFunction != null) htmlbEventFunction(htmlbevent);
  htmlbEventFunction=null;

  if(htmlbevent.cancelSubmit==false){
    htmlbSubmit(elem,eventType,formID,objectID,eventName,paramCount,param1,param2,param3,param4,param5,param6,param7,param8,param9);
  }
  return htmlbevent.returnValue;
}

function htmlbEventCO(elem,
                      eventClass,
                      eventType,
                      formID,
                      objectID,
                      eventName,
                      paramCount,
                      param1,param2,param3,param4,param5,param6,param7,param8,param9)
{
  htmlbevent = htmlbCreateEvent(elem,formID+" "+objectID,eventName);

  if(htmlbEventFunction==null)
    htmlbEventFunction = window[formID+"_"+objectID+"_"+eventClass];
  if ( htmlbEventFunction != null) htmlbEventFunction(htmlbevent);
  htmlbEventFunction=null;

  return htmlbevent.returnValue;
}

function htmlbCreateEvent(elem,objectID,eventName)
{
  var htmlbevent = new Object;
  if(document.all)
   htmlbevent.htmlEvent   = event;
  htmlbevent.srcElement   = elem;
  htmlbevent.eventName    = eventName;
  htmlbevent._objectID    = objectID;
  htmlbevent.returnValue  = true;
  htmlbevent.cancelSubmit = false;
  return htmlbevent;
}

function htmlbSubmitLib(library,elem,eventType,formID,objectID,eventName,paramCount,param1,param2,param3,param4,param5,param6,param7,param8,param9)
{
  document.forms[formID].onInputProcessing.value = library;
  htmlbSubmit(elem,eventType,formID,objectID,eventName,paramCount,param1,param2,param3,param4,param5,param6,param7,param8,param9);
}

function htmlbEventLib(library,elem,eventClass,eventType,formID,objectID,eventName,paramCount,param1,param2,param3,param4,param5,param6,param7,param8,param9)
{
  document.forms[formID].onInputProcessing.value = library;
  return htmlbEvent(elem,eventClass,eventType,formID,objectID,eventName,paramCount,param1,param2,param3,param4,param5,param6,param7,param8,param9)
}

function htmlbSL(elem,eventType_idx,objectID_plus_eventName,eventDef,param1,param2)
{
  eventType = htmlbEDIC[eventType_idx];
  paramCount = arguments.length>4 ? arguments.length-4 : 0;
  if(!eventDef) eventDef='null';
  eventType = eventType + ':' + eventDef;
  tokens = objectID_plus_eventName.split(':'); objectID=tokens[0]; eventName=tokens[1];
  frm_name=document.getElementById("htmlb_first_form_id").value;
  htmlbSubmitLib('htmlb',elem,eventType,frm_name,objectID,eventName,paramCount,param1,param2);
  return false;
}

function htmlbEL(elem,eventType_idx,objectID_plus_eventName,eventDef,param1,param2)
{
  eventType = htmlbEDIC[eventType_idx];
  paramCount = arguments.length>4 ? arguments.length-4 : 0;
  if(!eventDef) eventDef='null';
  eventType = eventType + ':' + eventDef;
  tokens = objectID_plus_eventName.split(':'); objectID=tokens[0]; eventName=tokens[1];
  eventClass = eventType.split(':')[2];
  frm_name=document.getElementById("htmlb_first_form_id").value;
  return htmlbEventLib('htmlb',elem,eventClass,eventType,frm_name,objectID,eventName,paramCount,param1,param2);
}

function htmlbDisableBackspaceNavigationOnKeydown(e)
{
  if(document.all)
    e=window.event;

  if (e.keyCode == 8 || (e.keyCode == 37 && e.altKey==true) || (e.keyCode == 39 && e.altKey==true)|| (e.keyCode == 82 && e.ctrlKey==true)){
    flag=true;
    if(document.all) obj=e.srcElement;
    else             obj=e.target;
    tag_name = obj.tagName.toUpperCase( );
    if(tag_name=="INPUT"){
      tag_type=obj.type.toUpperCase( )
      if(tag_type=="FILE"|| tag_type=="TEXT" || tag_type=="PASSWORD")
        flag=false;
    }
    else if(tag_name=="TEXTAREA")
      flag=false;

    if(e.keyCode == 37 && e.altKey==true)
      flag=true;

    if(e.keyCode == 39 && e.altKey==true)
      flag=true;

    if(e.keyCode == 82 && e.ctrlKey==true)
      flag=true;

    if (flag == true){
      if(document.all){
        e.returnValue  = false;
        e.cancelBubble = true;
      }
      else{
        e.stopPropagation();
        routeEvent(e);
      }  
    } 
  }
}

function htmlbDisableBackspaceNavigation()
{
  if(!document.all)
    window.addEventListener("keypress", htmlbDisableBackspaceNavigationOnKeydown, false)
  else
    document.onkeydown=htmlbDisableBackspaceNavigationOnKeydown;
}

/* skip through container (508) */
function f_skip_cont(e)
{
  if(e.keyCode==83 ){
    if(e.srcElement.id.lastIndexOf("begin")!=-1)
      end_id=e.srcElement.id.replace("begin","end" );

    if(e.srcElement.id.lastIndexOf("end")!=-1)
      end_id=e.srcElement.id.replace("end","begin" );

    var end_obj = document.getElementById(end_id)
    end_obj.focus()
  }
}

function htmlbTbvCellClickLib(library, table, formID, controlId, eventId )
{
  document.forms[formID].onInputProcessing.value = library;
  htmlbTbvCellClick(table, formID, controlId, eventId);
}
/* TableView: handle cell click */
function htmlbTbvCellClick(table, formId, controlId, eventId)
{
if(document.all)
 {
   var obj = event.srcElement;
   if(obj.tagName=='INPUT') return;
   while ( (obj!=null) && (obj.tagName!='TD') )
      obj = obj.parentElement;
   if(obj==null) return;
   if(obj.getAttribute('flt')!=null) return;
   var parent;
   var rowIndex;
   var colIndex;
   rowIndex = obj.parentElement.rr;
   colIndex = obj.cc;

   if (rowIndex && colIndex){
     cellClick = table.getAttribute('colEvt'+colIndex);
     if(cellClick == null){
         m_obj=document.getElementById(controlId)
     cellClick = m_obj.getAttribute('colEvt'+colIndex);}
     if (cellClick){
       event.cancelBubble = true;
       htmlbSubmit(this, eventId, formId, controlId, cellClick, 2, rowIndex,colIndex);
       return;
     }
   }
 }
 else
 {
   var obj = table.target;
   while ( (obj!=null) && (obj.tagName!='TD') )
     obj = obj.parentNode;
   if(obj==null) return;
   var table =obj;
   while ( (table!=null) && (table.tagName!='TABLE') )
     table = table.parentNode;
   var parent = obj.parentNode;
   var rowIndex = parent.getAttribute("rr");
   var colIndex = obj.getAttribute("cc");
   if (rowIndex && colIndex)
   {
     cellClick = document.getElementById(controlId).getAttribute('colEvt'+colIndex);
     if (cellClick){
        htmlbSubmit(table, eventId, formId, controlId, cellClick, 2, rowIndex,colIndex);
     }
     return;
   }
 }
}

function htmlbF(filter)  {
    htmlbFilterKeyDown(filter);
 }

function htmlbFilterKeyDown(filter){
  if(event.keyCode == 13)
    document.getElementById(filter).click();
}

function onHTMLBKeyDown(evt,id)
{
  if(evt.keyCode == 13){
    var obj = document.getElementById(id);
    if(obj){
      if (HTMLB_SECTION508){
        obj.all("activeElement508").value = document.activeElement.getAttribute("id");
      }
  var func = window["doValidate_" + id];
  if(func != null){
    var isValidate = true;
    isValidate = func();
    if(isValidate==false){
      if(document.all)
    event.returnValue = false;
      return false;
    }
  }
      obj.submit();
    }
  }
}
function htmlbLabelClick(id)
{
var obj=document.getElementById(id);
if(obj)if(obj.tagName)if(obj.tagName=='SELECT')if(obj.disabled!=true)
  {
  obj.focus();
  return false;
  }
return true;
}

function SapTable_ctrlPressed(event)
{
  var ctrlPressed=false;
  if(navigator.appName=="Netscape"){
    var str =(event.modifiers+32).toString(2).substring(3,6);
    if(str.charAt(1)=="1")
      ctrlPressed=true;
  }
  else if(event.ctrlKey){
    ctrlPressed=true;
  }
  return ctrlPressed;
}

  function SapTable_selectRow(id,e,bSecondary)
  {
   if (typeof(bSecondary)=="undefined"){
     try{
     var LSInput = document.getElementById(id+"-leadSelection");
     if(LSInput.value==e.srcElement.rr)
       return;
     else
       bSecondary=true;
     }catch(ex){bSecondary=false;}
   }
   var e;
   var m_chk;
   var m_prevchk;
   var mode=document.getElementById(id+'-TS').value;
   var objChk;
   var objPrevChk;
   var c_row;
   if(mode == 'MULTISELECT' || mode == 'MULTILINEEDIT'){
    c_row =sapUrMapi_SapTable_selectRow(id,0,0,0,e,bSecondary);
    m_chk=id+'-chk'+ c_row.getAttribute('rr');
    m_prevchk=id+'-prevchk';
    objChk = document.getElementById(m_chk);
    objPrevChk_col = document.getElementsByName(m_prevchk);
       for(i=0;i!=objPrevChk_col.length;i++){
        if(objPrevChk_col[i].value==c_row.getAttribute('rr'))
         objPrevChk= objPrevChk_col[i];
        }

   try{
       m_par_obj = objChk.parentNode;
       m_par_obj.removeChild(objChk);
       m_par_obj.removeChild(objPrevChk);
 }
 catch(e){
     el = document.createElement('input');
     el.setAttribute( 'id',    m_prevchk );
     el.setAttribute( 'name',  m_prevchk );
     el.setAttribute( 'type',  'hidden' );
     el.setAttribute( 'value', c_row.getAttribute('rr'));
       document.getElementById(id).appendChild( el );
     el = document.createElement('input');
     el.setAttribute( 'id',    m_chk );
     el.setAttribute( 'name',  m_chk );
     el.setAttribute( 'type',  'hidden' );
     el.setAttribute( 'value', c_row.getAttribute('rr'));
       document.getElementById(id).appendChild( el );
 }
   }

   else if(mode == 'SINGLESELECT' || mode == 'LINEEDIT'){
   m_chk=id+'-chk';
   m_prevchk=id+'-prevchk';
   objChk = document.getElementById(m_chk);
   objPrevChk = document.getElementById(m_prevchk);
 _ur_tables[id]=null;
 var oTable=ur_Table_create(id);
 for (var i=0;i<oTable.rows.length;i++) {
      var oButton = oTable.rows[i].ref.getElementsByTagName("BUTTON").item(0);
      if (oButton==null) continue;
      if(!oButton.getAttribute("rr")||oButton.getAttribute("rr")=="") continue;
      sapUrMapi_SapTable_selectRowByObject(oTable.rows[i].ref,false,false);
 }
   c_row =sapUrMapi_SapTable_selectRow(id,0,0,0,e,bSecondary);
   var cur_row =c_row.getAttribute('rr');
   if (objPrevChk !=null){
    if (objPrevChk.value == ''){
  objPrevChk.value = cur_row;
  objChk.value = cur_row;
     return;   
     }
   row_idx = parseInt(objPrevChk.value);
    
  if(objPrevChk.value == cur_row){
       sapUrMapi_SapTable_selectRow(id,0,0,0,e,bSecondary);
  objPrevChk.value='';
  objChk.value='';
  }else{
  objPrevChk.value = cur_row;
  objChk.value = cur_row;
  }
 }
   else{
     el = document.createElement('input');
     el.setAttribute( 'id',    m_prevchk );
     el.setAttribute( 'name',  m_prevchk );
     el.setAttribute( 'type',  'hidden' );
     el.setAttribute( 'value', cur_row );
       document.getElementById(id).appendChild( el );
     el = document.createElement('input');
     el.setAttribute( 'id',    m_chk );
     el.setAttribute( 'name',  m_chk );
     el.setAttribute( 'type',  'hidden' );
     el.setAttribute( 'value', cur_row );
       document.getElementById(id).appendChild( el );
    }
   }
}

function SapTabstrip_click(scurId, sTabstrId) {
  m_par=scurId.split('-')
  ind= m_par[m_par.length-1];
  tab_id=sTabstrId+'-'+'itm-'+ind
  document.getElementById(tab_id).click();
}

function portalEPCM() {
    try{
       var ldFrame = window;
       while ( typeof(ldFrame.EPCM)=="undefined" && ldFrame != top)
          ldFrame = ldFrame.parent;
       return ldFrame.EPCM;
    }catch(ex){ }
}

function portalSubscribeEvent( eventnamespace, eventname ) {
    try{
      epcm = portalEPCM();
      if (epcm.subscribeEventReliable){
         epcm.subscribeEventReliable( eventnamespace, eventname, window, "portalEventHandler");
      }else{
         epcm.subscribeEvent( eventnamespace, evName, eventname, "portalEventHandler");
      }
    }catch(ex){ }
}

function portalFireEvent( namespace, eventname, data, sourceId) {
     try{
       epcm = portalEPCM();
       epcm.raiseEvent(namespace,eventname,data,sourceId);
    }catch(ex){ }
}

function portalEventHandler( event ){
    var eventId   = event.eventNamespace + '&' + event.eventName;
    var eventData = event.dataObject + '&' + event.sourceId;
    htmlbSubmitLib('htmlb',this,'bsp:portalEvent:raised:null',document.getElementById("htmlb_first_form_id").value,'ID','eventRaised',2,eventId,eventData);
}

function sap_htmlb_ofcscrolto(){
 try{
  obj_ofc=document.getElementsByName('htmlb_ofc');
  for(i=0;i!=obj_ofc.length;i++){
    obj_ofc_div=document.getElementById(obj_ofc[i].value);
    obj_ofc_div.scrollLeft=document.getElementById(obj_ofc[i].value + '_x').value;
    obj_ofc_div.scrollTop=document.getElementById(obj_ofc[i].value + '_y').value;
  }
 }
 catch(e){}
}

function sap_htmlb_ofcsavescrol(){
 try{
 obj_ofc=document.getElementsByName('htmlb_ofc');
 for(i=0;i!=obj_ofc.length;i++){
     obj_ofc_div=document.getElementById(obj_ofc[i].value);
     document.getElementById(obj_ofc[i].value + '_x').value=obj_ofc_div.scrollLeft;
     document.getElementById(obj_ofc[i].value + '_y').value=obj_ofc_div.scrollTop;
  }
 }
catch(e){}
}

function sap_Pc_initializePager(sId,e) {
 try{
 var oTabs = document.getElementById(sId + "-tbl");
 var tabcount = parseInt(oTabs.getAttribute("tabcount"));
 var firsttab = parseInt(oTabs.getAttribute("starttab"));
 var tabpage = parseInt(oTabs.getAttribute("tabpage"));
 var vistabs = parseInt(oTabs.getAttribute("vistabs"));
 var lasttab = parseInt(oTabs.getAttribute("lasttab"));
 if (isNaN(lasttab)){
   if (firsttab + vistabs >= tabcount){lasttab = tabcount - 1;}
   else{lasttab = firsttab + vistabs - 1;}
 }
 oTabs.setAttribute("lasttab", lasttab);
             sapUrMapi_Pc_togglePager(sId,e);
 }
catch(e){}
}
function bspembedfix(){
try{
objects = document.getElementsByTagName("embed");
for (var i = 0; i < objects.length; i++)
objects[i].outerHTML = objects[i].outerHTML;
 }
catch(e){}
}
