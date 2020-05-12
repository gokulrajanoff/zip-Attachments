({
    doInit : function(component, event, helper) {
        var action = component.get("c.getAttacment");
        action.setCallback(this, function(a) {
            // store the response return value (wrapper class insatance)  
            var result = a.getReturnValue();
            component.set("v.Wrappers", result);
            console.log(result);
            component.set("v.showDownload", true);
        });
        $A.enqueueAction(action);
    },
    selectAll : function(component, event, helper){
        var Wraper = component.get("v.Wrappers");
        if(Wraper){
            var selectAllValue = component.get("v.selectAll");
            for(var i=0;i<Wraper.length;i++){
                if(selectAllValue){
                    Wraper[i].selected=true;
                }
                else{
                    Wraper[i].selected=false;
                }
            }
            component.set("v.Wrappers",Wraper);
        }
    },
    bulkDownloadOption2:function(component, event, helper){
    var Wraper = component.get("v.Wrappers");
        var attachmentId = [];
        if(Wraper){
            var selectAllValue = component.get("v.selectAll");
            for(var i=0;i<Wraper.length;i++){
                if(Wraper[i].selected){
                   attachmentId.push(Wraper[i].IdValue); 
                }
            }
      var action = component.get("c.getAttacmentWithBody");
      action.setParams({
        'attachmentId': attachmentId
    });
    action.setCallback(this, function(a) {
      var result = a.getReturnValue();
      if(result){
        var zip = new JSZip();
        for(var i=0;i<result.length;i++){
          console.log(result[i].Body);
          console.log(result[i].Body.length);
          console.log(typeof result[i].Body);
          zip.file(result[i].Name,helper.b64toBlob(result[i].Body));
        }
        console.log(zip);
        zip.generateAsync({type:"Blob"})
        .then(function(content) {
          console.log(content);
          helper.downLoadFile(component,content, "example.zip","application/zip");
        });
      }
      else{
        component.set('v.selectedFileMessage','Unable to fetch Attachments');
      }
    });
    $A.enqueueAction(action);
        }
    },
      afterScriptsLoaded : function(component, event, helper) {
    console.log('loaded');
    },
})