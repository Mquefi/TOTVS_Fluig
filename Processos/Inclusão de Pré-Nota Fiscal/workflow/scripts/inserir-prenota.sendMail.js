function sendMail() {
	//Monta mapa com parâmetros do template
	var parametros = new java.util.HashMap();
	parametros.put("SERVER_URL", com.totvs.technology.wcm.sdk.service.ServicesUtil.getWCMSDK().getServerURL());
	parametros.put("TENANT_ID", getValue("WKCompany"));

	parametros.put("CUSTOM_MAIL_TITLE", MAIL.TITLE);
	parametros.put("CUSTOM_MAIL_DESCRIPTION", MAIL.DESCRIPTION);
	parametros.put("subject", MAIL.SUBJECT);
	
	parametros.put("FORM_SUPPLIER_ID", hAPI.getCardValue("hidden_fornecedor"));
	parametros.put("FORM_DOC", hAPI.getCardValue("numero"));
	parametros.put("FORM_DATE", hAPI.getCardValue("data_emissao"));
	
	//Monta lista de destinatários
	var destinatarios = new java.util.ArrayList();
	for (var i = 0; i < MAIL.TO.length; i++) {
		destinatarios.add(MAIL.TO[i]);
	}

	var attachments = hAPI.listAttachments();
	
	var items = new java.util.ArrayList();
	if (attachments != null) {
	    for (var i = 0; i < attachments.size(); i++) {
	    	var attachment = attachments.get(i);
	    	
	    	var item = new java.util.HashMap();
	    	item.put("name", attachment.getDocumentDescription());
	    	item.put("url", getFileURL(attachment));
	    	
	    	items.add(item);
	    }
	}
	parametros.put("attachments", items);
	
	//Envia e-mail
	notifier.notify(MAIL.SENDER, MAIL.TEMPLATE_NAME, parametros, destinatarios, "text/html");
}

function getFileURL(attachment) {
	return fluigAPI.getDocumentService().getDownloadURL(attachment.getDocumentId());
}