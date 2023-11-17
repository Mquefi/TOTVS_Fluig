
$(function () {
	/*$('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
    	
    	var myLoading1 = FLUIGC.loading('#upload-file');
    	myLoading1.show();
    	
        $.each(data.result.files, function (index, file) {
            $.ajax({
                async : true,
                type : "POST",
                contentType: "application/json",
                url : '/api/public/ecm/document/createDocument',
        		data: JSON.stringify({
        			"description": file.name,
        			"parentId": "10999",//Numero do documento aonde irá ser gravado
        			"attachments": [{
        				"fileName": file.name
        			}],
        		}),

        		error: function() {
        			FLUIGC.toast({
        			     title: '',
        			     message: "Falha ao enviar",
        			     type: 'danger'
        			 });
        			myLoading1.hide();
        		},
        		
        		success: function(data) {
        			console.log(data); 
        			$("#IdDocument").val(data.content.id);
        			 
        			FLUIGC.toast({
        			     title: '',
        			     message: "Documento publicado - " + file.name,
        			     type: 'info'
	        			 });
	        			myLoading1.hide();
	        		},
	        	});
	        });
	    }
	});*/
});
