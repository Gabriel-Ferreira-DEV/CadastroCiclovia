/*-------------------------------------*/
/*  Global Control Services            */
/*  (c) 2002 SAP AG                    */
/*-------------------------------------*/
  
/*----------------------------------------------------------------------*/
/*  General                                                             */
/*----------------------------------------------------------------------*/
// domainrelaxing
  // domainrelaxing
  
  /*var  strDomainRelaxScript  = '<S'+'CRIPT> var liBehindFirstDot = document.domain.indexOf( "." ) + 1;';
       strDomainRelaxScript += 'if (liBehindFirstDot > 0) {';
       strDomainRelaxScript += 'document.domain = document.domain.substr( liBehindFirstDot );';
       strDomainRelaxScript += '}</S'+'CRIPT>';
  */
  strDomainRelaxScript  = "";  
  var docBody = null;  
//------------------------------------------------------------------------------

//----------------------------------------------------------------------------
//  Popup Object                                                        
//----------------------------------------------------------------------------
//Events provided by this Object 
// onbeforerender  = use that event to set other positions than the precalculated;
// onblur          = fired when the popup blurs, use to hide it
//----------------------------------------------------------------------------

//consts enums 
  
//----------------------------------------------------------------------------
// sapPopupSizeBehavior used with attribute o.sizebehaviour
// o.sizebehaviour.USER    - you can set the size of the popup, 
//                           use o.size.width,o.size.height
//                         
// o.sizebehaviour.CONTENT - the popup will automatically adjust to the the
//                           size of its content
//----------------------------------------------------------------------------
  sapPopupSizeBehavior     = { CONTENT : "CONTENT", USER : "USER" };
//----------------------------------------------------------------------------
if(ur_system.emptyhoverurl==null) ur_system.emptyhoverurl = ur_system.mimepath+"emptyhover.html";
document.write("<div id='urFrames'><iframe id=\"sapPopupMainId_X0\" name=\"sapPopupMainId_X0\" src=\""+ur_system.emptyhoverurl+"\" style=\"z-index:1001;display:block;position:absolute;top:-5000;width:0;height:0\"  frameborder=\"0\" border=\"no\" scrolling=\"no\" tabindex=\"-1\"></iframe></div>");
  
//----------------------------------------------------------------------------
// sapPopupPositionBehavior used with attribute o.positionbehaviour
// o.positionbehaviour.MENULEFT      - popup shows left aligned under the 
//                                     source element.
// o.positionbehaviour.MENURIGHT     - popup shows right aligned under the 
//                                     source element.
// o.positionbehaviour.BROWSERCENTER - popup shows centered in the browser 
//                                     window. 
// o.positionbehaviour.USER          - you can set the position
//                                     use o.position.left, o.position.top
//----------------------------------------------------------------------------
  
  sapPopupPositionBehavior = { MENULEFT : "MENULEFT", MENURIGHT : "MENURIGHT", BROWSERCENTER : "BROWSERCENTER", USER : "USER", SUBMENU : "SUBMENU",EVENT:"EVENT" }
//----------------------------------------------------------------------------

  var sapPopupMainId = "sapPopupMainId_X";

//Variables
  var sapPopupStore = new Array(); 
  var sapOpenLevel  = false; 
  
/*----------------------------------------------------------------------*/
/*  Constructor                                                         */
/*----------------------------------------------------------------------*/
// desc : create a new popup
// in   : sourcewindow   : DOM window object - caller window
//        stylesheets    : Array             - stylesheet urls to use in the popup
//        contentobject  : DOM element       - that contains the html to show in the popup
//        sourceobject   : DOM element       - source element to align the popup
//        sourceevent    : DOM event object  - fired on the sourceobject to position the popup
// out  : none 
// brw  : NN6>
//----------------------------------------------------------------------------
  function sapPopup(sourcewindow,stylesheets,contentobject,sourceobject,sourceevent,level) {
    //Attributes
    this.level = level;
    this.sizebehaviour = sapPopupSizeBehavior.CONTENT;
    this.positionbehavior = sapPopupPositionBehavior.MENULEFT;
    
    this.position = { left: -1, top: -1, right: -1, bottom: -1 };
    this.size     = { width: -1, height: -1 };
    if (document.getElementById(sapPopupMainId+(level+1))==null) {
    	 var oFramesContainer = document.getElementsByTagName("BODY").item(0);
    	 for (var f=level+1;f<level+3;f++) {
    	 	 var oFrame = document.createElement("IFRAME");
    	 	 oFrame.setAttribute("id",sapPopupMainId+(f));
    	 	 oFrame.setAttribute("name",sapPopupMainId+(f));
    	 	 oFrame.setAttribute("src",ur_system.emptyhoverurl);
    	 	 oFrame.setAttribute("style","width:0;height:0;z-index:1001;display:block;position:absolute;top:-5000;");
    	 	 oFrame.setAttribute("tabindex","-1");
    	 	 oFrame.setAttribute("frameborder","0");
    	 	 oFrame.setAttribute("border","no");
    	 	 oFrame.setAttribute("scrolling","no");
    	   oFramesContainer.appendChild(oFrame);
    	 }
    }
    
    this.frame = { object: document.getElementById(sapPopupMainId+level), 
                   window: window.frames[sapPopupMainId+level]};
    
    this.content = { html: contentobject.innerHTML,
                     size: contentobject };
    //store information about the source of that popuprequest
    this.source = { event:sourceevent, 
                    object:sourceobject, 
                    window: sourcewindow, 
                    document:sourcewindow.document, 
                    body: sourcewindow.document.getElementsByTagName("BODY").item(0) };
    
    this.canrender   = true;
    this.domainrelax = true;
    this.scrolling   = true; 
    this.stylesheets = stylesheets;

    //Methods
    this.write   = sapPopup_write;
    this.show    = sapPopup_show;
    this.showOld = sapPopup_showOld;
    this.hide    = sapPopup_hide;
    this.poscalc = sapPopup_poscalc;
    
    //Events
    this.onbeforerender  = null;
    this.onblur          = null;
        
    //define a global variable with the body element for all popups once
    if (!docBody) docBody = window.document.getElementsByTagName("BODY")[0];

    //if relative urls are used for styles try to absolute them
    for (var n=0; n<this.stylesheets.length;n++) {
      this.stylesheets[n]=relativeToAbsolutePath(this.stylesheets[n],sourcewindow.location.href);
    }

    //set a variable inside sourcewindow to itself, used to refer events back
    this.source.window.me = this.source.window;
	  if (this.source.window.ur_system.domainrelaxing==this.source.window.sapUrDomainRelaxing.MINIMAL) {
      strDomainRelaxScript  = "<s"+"cript>try{parent.document.domain} catch(e){var hostname = document.domain; var posBehindFirstDot = hostname.indexOf(\".\") + 1;if (posBehindFirstDot>0) {document.domain=hostname.substr(posBehindFirstDot);}};</scri"+"pt>";
	  } else {
	      if (this.source.window.ur_system.domainrelaxing==this.source.window.sapUrDomainRelaxing.MAXIMAL){
	      strDomainRelaxScript  = "<s"+"cript>try {parent.document.domain} catch(e){var nameparts=document.domain.split(\".\"); if (nameparts.length > 2) document.domain = nameparts.slice(nameparts.length - 2).join(\".\"); };</scri"+"pt>";
	    }
	  }
    
    sapPopupStore[this.level] = this;
    return this; 
 }
 

/*----------------------------------------------------------------------*/
/*  Methods                                                               */
/*----------------------------------------------------------------------*/
//----------------------------------------------------------------------------
// method write
//----------------------------------------------------------------------------
// desc : writes the popup into its iframe
//        internal use only
// in   : none
// out  : none 
// brw  : NN6>
//----------------------------------------------------------------------------
function sapPopup_write(bDoNotAutoFocus) {
  //potentially this is faster with dom operations but what about relaxing domains?
  strContent = "<html><head>";
  //add domain relaxing
  if (this.domainrelax) strContent += strDomainRelaxScript;
  if(bDoNotAutoFocus)
		strContent += "<sc"+"ript>me=parent.sapPopupStore["+this.level+"].source.window;mylevel="+this.level+";</scr"+"ipt>";
	else
		strContent += "<sc"+"ript>me=parent.sapPopupStore["+this.level+"].source.window; window.focus();mylevel="+this.level+";</scr"+"ipt>";
      
  //add stylesheets
  for (var n=0; n<this.stylesheets.length;n++) {
    strContent+= "<link rel=\"stylesheet\" href=\""+this.stylesheets[n]+"\" type=\"text/css\">";
  }
    
  //add the content and the rest
  strContent+= "</head><body class='urBdyStd' scroll=";
  strContent+= this.scrolling?"'no'":"'auto'";
  if(this.frame.object!=null && this.frame.object.getAttribute("ct")!="ComboBox"){    
		strContent+= " onload='parent.sapUrMapi_PopupMenu_setEvents(parent.sapPopupStore["+this.level+"],1);'";
		if (this.level==0) {
			strContent+= " onfocus='parent.sapUrMapi_PopupMenu_setEvents(parent.sapPopupStore["+this.level+"],2);' onblur='if ((parent.sapPopupStore[mylevel]) && (!parent.sapOpenLevel)) {parent.sapPopupStore[mylevel].onblur();}'";
		} else {
			strContent+= " onfocus='parent.sapUrMapi_PopupMenu_setEvents(parent.sapPopupStore["+this.level+"],2);' onblur='if ((parent.sapPopupStore[mylevel]) && (!parent.sapOpenLevel)) {parent.sapPopupStore[mylevel].onblur();}'";
		}
	}
  strContent+= " style='margin:0;border:none;'>"+this.content.html+"</body></html>";
  //write it!
  //this.frame.window.document.open();
  this.frame.window.document.write(strContent);
  this.frame.window.document.close();
}

var intLeftFramePx;
var intTopFramePx;

//----------------------------------------------------------------------------
// method poscalc
//----------------------------------------------------------------------------
// desc : calculates the position of the popup depending on 
//        - sizebehaviour
//        - positionbehavior
//        changes the position if right or/and bottom might be 
//        not in the visible area to ensure the whole popup is visible
// in   : none
// out  : none 
// brw  : NN6>
//----------------------------------------------------------------------------
function sapPopup_poscalc() {
  //set the size of the frame depending on its content
  if (this.sizebehaviour==sapPopupSizeBehavior.CONTENT) {
    this.size.width  = this.content.size.offsetWidth;
    this.size.height = this.content.size.offsetHeight;
  } else {
    if ((this.size.width<=0) || (this.size.height<=0)) {
      showError("Please set\n   int sapPopup.size.width\n   int sapPopup.size.height\n to a value > 0.");
      this.canrender = false
    }
  } 
  //find relative position to sourceobject;
  var sourceoffset    = getAbsolutePosition(this.source.object);
  var sourcesize      = getElementSize(this.source.object);
  //event object is available
  if ( this.positionbehavior.indexOf("MENU")>-1) {
      this.position.left = sourceoffset.left;
      this.position.top  = sourceoffset.top + sourcesize.height;
      if (this.positionbehavior == sapPopupPositionBehavior.MENURIGHT) {
	      this.position.left = this.position.left + sourcesize.width - this.size.width;
      }
      //calculate right and bottom
      if (this.positionbehavior == sapPopupPositionBehavior.SUBMENU) {
	    this.position.left = this.position.left + sourcesize.width;
	    this.position.top  = this.position.top - sourcesize.height;
        if (this.level>0) { 
          this.position.left = this.position.left+sapPopupStore[this.level-1].position.left;
          this.position.top = this.position.top+sapPopupStore[this.level-1].position.top;
        } 
      }
      //calculate right and bottom
      this.position = setPosBottomRight(window, this.position, this.size);
      
      // if submenue does not fit on usual place,
      // try to position on other side of parent menu,
      // but only, of there is enough space available
      var setsubmenubelow=false;
      if (this.positionbehavior == sapPopupPositionBehavior.SUBMENU) {
        if (this.position.right<0) {
          if (this.position.left-(sourcesize.width)+7-this.size.width>window.pageXOffset) {
            this.position.left=this.position.left-(sourcesize.width)+7-this.size.width;
          } else {
            this.position.top = this.position.top + sourcesize.height;
            setsubmenubelow=true;
          }
          //calculate right and bottom 
          this.position = setPosBottomRight(window, this.position, this.size)
        } 
      } 
      
      //reposition horizontally
      if (this.position.right<0) this.position.left  = window.innerWidth + window.pageXOffset - this.size.width;
      if (this.position.left-window.pageXOffset<0) this.position.left  = 0 + window.pageXOffset;
      // reposition vertically
      if (this.position.bottom<0) {											 //too bottom
        if (this.positionbehavior == sapPopupPositionBehavior.SUBMENU) {
          if (setsubmenubelow) 
            this.position.top = this.position.top - sourcesize.height - this.size.height; 
          else  
            this.position.top = this.position.top + sourcesize.height - this.size.height; 
        }  
        if ((this.positionbehavior == sapPopupPositionBehavior.MENULEFT) ||
            (this.positionbehavior == sapPopupPositionBehavior.MENURIGHT)) {
          this.position.top = this.position.top - sourcesize.height - this.size.height;  
        }
      }  
      if (this.position.top-window.pageYOffset<0) this.position.top  = 0 + window.pageYOffset;
        
      //recalculate right and bottom according to changed values
      this.position = setPosBottomRight(window, this.position, this.size)
      
    } else if ( this.positionbehavior == sapPopupPositionBehavior.BROWSERCENTER ) {
	  this.position.left = Math.floor((window.innerWidth/2)-(this.size.width/2)) + this.source.window.pageXOffset;
	  this.position.top  = Math.floor((window.innerHeight/2)-(this.size.height/2)) + this.source.window.pageYOffset;
      this.position.right   = window.innerWidth  - this.position.left - this.size.width + window.pageXOffset;
	  this.position.bottom  = window.innerHeight - this.position.top  - this.size.height + window.pageYOffset;
	  
  } else if (this.positionbehavior == sapPopupPositionBehavior.EVENT) {
	  this.position.left = this.source.event.pageX+window.pageXOffset;
	  this.position.top  = this.source.event.pageY+window.pageYOffset;
      this.position.right   = window.innerWidth  - this.position.left - this.size.width + window.pageXOffset;
      this.position.bottom  = window.innerHeight - this.position.top  - this.size.height + window.pageYOffset;
      
      //repositioning
      if (this.position.right<0) this.position.left  = this.position.left - this.size.width;
      if (this.position.bottom<0) this.position.top  = this.position.top - this.size.height;
      if (this.position.left-window.pageXOffset<0) this.position.left  = 0 + window.pageXOffset;
      if (this.position.top-window.pageYOffset<0) this.position.top  = 0 + window.pageYOffset;
	  //recalculate right and bottom
      this.position = setPosBottomRight(window, this.position, this.size)
   } else if ((this.position.top<0) || (this.position.left<0)) {
      showError("Please set\n   int sapPopup.position.left\n   int sapPopup.position.top\n to a value > 0.");
      this.canrender = false
  }

  if ((this.position.left-window.pageXOffset<0) || (this.position.right<0)) {
     this.position.left  = window.pageXOffset;
  }
  if ((this.position.top-window.pageYOffset<0) || (this.position.bottom<0)){
      if (this.canrender) this.scrolling=true;
      this.position.top  = window.pageYOffset;
  }
}
//----------------------------------------------------------------------------
// method show
//----------------------------------------------------------------------------
// desc : shows the popup
// in   : none
// out  : none 
// brw  : NN6>
//----------------------------------------------------------------------------
function sapPopup_show(noRecalc,bDoNotAutoFocus) {
  //creating another child 
  sapOpenLevel = true;
  this.poscalc();
  if (this.onbeforerender) { if (!this.onbeforerender(this)) return; }
  if (!this.canrender) { showError("Cannot render Popup. Sizes and positions are not set."); return; }
  try {  	
		if (this.frame.window.mylevel==null) {
		  this.write(bDoNotAutoFocus);
		} else {
		  this.frame.window.document.getElementsByTagName("BODY").item(0).innerHTML=this.content.html;
		  window.sapUrMapi_PopupMenu_setEvents(this,1);
		}
  } catch (e){
    this.write(bDoNotAutoFocus);
  }
  //show the menu
  
  this.frame.object.style.left   = this.position.left;
  this.frame.object.style.top    = this.position.top;
  this.frame.object.style.width  = this.size.width;
  this.frame.object.style.height = this.size.height;

  activePopup = this;
  this.oldresize = window.onresize;
  //window.onresize = top.hidePopups;
  return true;
}
//----------------------------------------------------------------------------
// method showOld
//----------------------------------------------------------------------------
// desc : shows the popup, does not calculate the position and does not
//        write the content
// in   : none
// out  : none 
// brw  : NN6>
//----------------------------------------------------------------------------
function sapPopup_showOld() {
  sapOpenLevel = true;
  this.frame.object.style.left   = this.position.left;
  this.frame.object.style.top    = this.position.top;
  this.frame.object.style.width  = this.size.width;
  this.frame.object.style.height = this.size.height;
  activePopup = this;
  this.oldresize = window.onresize;
  return true;
}
//----------------------------------------------------------------------------
// method hide
//----------------------------------------------------------------------------
// desc : hides the popup
// in   : none
// out  : none 
// brw  : NN6>
//----------------------------------------------------------------------------
function sapPopup_hide() {
  //hide the menu
  this.frame.object.style.top="-5001";
  if (this.level<sapPopupStore.length-1) {
  	sapPopupStore[this.level+1].hide();
  }
  sapPopupStore[this.level] = null; 
  var sapPopNew = new Array();
  for (var n=0;n<sapPopupStore.length;n++) {
  	if (sapPopupStore[n]!=null) {
  		sapPopNew[sapPopNew.length]=sapPopupStore[n];
  	}
  }
  sapPopupStore = sapPopNew;
  return true;
}
function hidePopupMenu(level) {
  if (sapPopupStore[0]) {
    sapPopupStore[0].hide();
  }
}

/*----------------------------------------------------------------------*/
/*  Helpers                                                             */
/*----------------------------------------------------------------------*/
//----------------------------------------------------------------------------
// function setPosBottomRight
//----------------------------------------------------------------------------
// desc : returns Right and Bottom  relative from a oBody DOM Body
// in   : oWindow  - windowobject, oPos - object - Position Object , oSize
// out  : oPos   - object Position Object
// brw  : NN6>
//----------------------------------------------------------------------------
function setPosBottomRight ( oWindow, oPos, oSize) {
  oPos.right   = oWindow.innerWidth - oPos.left - oSize.width + oWindow.pageXOffset;
  oPos.bottom  = oWindow.innerHeight - oPos.top - oSize.height + oWindow.pageYOffset;
  return oPos;
}   

//----------------------------------------------------------------------------
// function getAbsolutePosition
//----------------------------------------------------------------------------
// desc : returns position object x.left, x.right and x.top from a dom element 
//        absolute to the left, right and top borders of the document. 
// in   : obj  - object
// out  : position - object 
// brw  : top and left: IE5+, NN6+  right: IE5+
//----------------------------------------------------------------------------
function getAbsolutePosition (obj) {
  if (obj)
	  return sapUrMapi_getAbsolutePosition (obj);
}  

//----------------------------------------------------------------------------
// function getElementSize
//----------------------------------------------------------------------------
// desc : returns size object .width and .height on a dom element
// in   : obj  - object
// out  : size - object 
// brw  : IE5>, NN6>
//----------------------------------------------------------------------------
function getElementSize (obj) {
  return { height : obj.offsetHeight, width: obj.offsetWidth };
}

//----------------------------------------------------------------------------
// function relativeToAbsolutePath
//----------------------------------------------------------------------------
// desc : returns the absolute url of strRel from an absolute url strAbs
// in   : strRel - string
//        strAbs - string
// out  : absolute path - string 
// brw  : IE5>, NN6>
//----------------------------------------------------------------------------
function relativeToAbsolutePath(strRel,strAbs) {
  if (strRel.lastIndexOf("./")==-1) return strRel; //no relative path
  var strRelDots      = strRel.substring(0,strRel.lastIndexOf("./")+2);
  var strAbsPath      = strAbs.substring(0,strAbs.lastIndexOf("/")); 
  while(strRelDots.lastIndexOf("..")>-1) { //erase all double dots
    strAbsPath = strAbsPath.substring(0,strAbsPath.lastIndexOf("/")); 
    strRelDots = strRelDots.substring(0,strRelDots.lastIndexOf(".."))+"/";
  }
  if (strRelDots.lastIndexOf("./")>-1) {
    //erase last dots slash
    strRelDots = strRelDots.substring(0,strRelDots.lastIndexOf("./"))+"/";
    if (strRelDots.lastIndexOf("./")>-1) { 
      showError (strRel+" is not a valid relative url.");
    }
  }
  //build absolut path
  strNewAbsPath = strAbsPath + strRelDots + strRel.substring(strRel.lastIndexOf("./")+2,strRel.length);
  return strNewAbsPath;
}  
//----------------------------------------------------------------------------
// function showError
//----------------------------------------------------------------------------
// desc : shows an error text strTxt in an alert window could be replaces 
//        in the futur to display nicer messages
// in   : strTxt - string
// out  : none 
// brw  : IE5>, NN6>
//----------------------------------------------------------------------------
function showError(strTxt) {
  alert("Error:"+strTxt);
}
  

