({
    b64toBlob:function(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    },
    downLoadFile : function(component,content, fileName, mimeType){
        var a = document.createElement('a');
        a.download = fileName;
        if(Blob){
            var data = new Blob([content], {type: mimeType});
            if(window.URL){
                var url = window.URL.createObjectURL(data);
                a.href=url;
                a.setAttribute("target", "_blank"); 
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);   
                window.URL.revokeObjectURL(a.href);
            }
        }
        
    }
})