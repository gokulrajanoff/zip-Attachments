public class GrZipController {
    public class Wrapper {
    @AuraEnabled public Boolean selected{get;set;}
    @AuraEnabled public String Name{get;set;}
    @AuraEnabled public Id IdValue{get;set;}
    @AuraEnabled public String Content{get;set;}
    }
    
     public class encodedAttachment {
        @AuraEnabled public Transient String Body {get;set;}
        @AuraEnabled public Transient String Name {get;set;}
    }
    @AuraEnabled
    public static List<encodedAttachment> getAttacmentWithBody(List<Id> attachmentId){
        List<encodedAttachment> returnData = new List<encodedAttachment>();
        encodedAttachment ea;
        for(Attachment a: [select id,Name,Body from Attachment where id=:attachmentId]){
            ea = new encodedAttachment();
            ea.Body = EncodingUtil.base64Encode(a.Body);
            ea.Name = a.Name;
            returnData.add(ea);
        }
        return returnData;
    }

    @AuraEnabled
    public static List<Wrapper> getAttacment(){
        List<Wrapper> result = new List<Wrapper>();
        List<Attachment> attachmentWithBody = [select id,Name,ContentType,BodyLength from Attachment order by createdDate desc limit 10];
        for(Attachment a : attachmentWithBody){
            Wrapper w = new Wrapper();
            w.selected = false;
            w.Name = a.Name;
            w.Content = a.ContentType;
            w.IdValue = a.Id;
            result.add(w);
        }
        return result;
    }
}