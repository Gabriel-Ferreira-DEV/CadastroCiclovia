                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

/* This JS file contains misc note patched Java Script code. */
/*Customer Message Number : 0120050410 0000475531 2004 --  Pop-up Date`Error Throughout ICH.*/
    function sapUrMapi_InputField_showActualDatePicker(sId, oEvt) {
   var val = sapUrMapi_InputField_getValue(sId);
    var a=sapUrMapi_Date_getArray(ur_system.dateformat,val);
    //if (isNaN(a[0])) {
    if (isNaN(a[0]) || a.length < 3 ) {
      sapUrMapi_InputField_showDatePicker(sId,(new Date
()).getUTCFullYear(),(new Date()).getMonth(),(new Date()).getDate
(),ur_system.firstdayofweek, oEvt);
    } else {
      a=sapUrMapi_Date_normalize(ur_system.dateformat,a);
      sapUrMapi_InputField_showDatePicker(sId,a[0],a[1],a
[2],ur_system.firstdayofweek, oEvt);
    }
}

 function sapUrMapi_Tray_showOptionMenu(idTray,idTrigger,idContent,pos,e) {
     /*if (e.type!="click") {
          if (!sapUrMapi_checkKey(e,"keydown",new Array("32","40"))) {`            sapUrMapi_cancelEvent(e);
            return false;
         }
     }*/
      sapUrMapi_PopupMenu_showMenu(idTrigger,idContent,pos,e);
  }

function sapUrMapi_SapTable_correctSelectionBorder(oRow)
{
try {
  sapUrMapi_SapTable_correctSelectionBorder4Table(oRow.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id);
} catch (e) {}
}

function bspDCSel(listBoxId,comboBoxKey,comboBoxId,document)
{
try{
var sList=sapUrMapi_ItemListBox_getList(listBoxId,document);
var sNewList=sList;
do{
sList=sNewList;
sNewList=sList.replace(/\|\| \|\|\|/g, "|| | ||");
}while(sNewList!=sList);
do{
sList=sNewList;
sNewList=sList.replace(/\|\|\| \|\|/g, "|| | ||");
}while(sNewList!=sList);
do{
sList=sNewList;
sNewList=sList.replace(/\|\|\|\|\|/g, "|| | ||");
}while(sNewList!=sList);
var sListArray=sList.split("||");
var sListTable=new Object;
for(var i=0;i<sListArray.length;i++){
var sListItem=sListArray[i].split("|");
if(typeof sListItem[1]!="undefined")
sListTable[sListItem[1]]=sListItem[0];
}
var value="";
var newComboBoxKey=comboBoxKey;
if(typeof sListTable[comboBoxKey]=="undefined"){
for(var prop in sListTable){
newComboBoxKey=prop;
value=sListTable[newComboBoxKey];
break;
}
}
else{
value=sListTable[comboBoxKey];
}
sapUrMapi_ItemListBox_setSelectedKey(listBoxId,newComboBoxKey,document,true);
document.getElementById(comboBoxId).value=value;
}catch(e){};
}
