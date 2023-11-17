function copyFiles() {
	var attachments = hAPI.listAttachments();
	if (attachments != null) {
	    for (var i = 0; i < attachments.size(); i++) {
	    	var attachment = attachments.get(i);
	    	if (attachment.getDocumentDescription().toLowerCase().endsWith(".xml")) {
	    		copyDocument(attachment);
	    	}
	    }
	}
}

function copyDocument(document) {	
	var calendar = java.util.Calendar.getInstance().getTime();

	document.setParentDocumentId(DATA.XML_FOLDER);
	document.setVersionDescription(1);
	document.setExpires(false);
	document.setCreateDate(calendar);
	document.setInheritSecurity(true);
	document.setUserNotify(false);
	document.setValidationStartDate(calendar);
	document.setVersionOption('0');
	document.setUpdateIsoProperties(true);

	hAPI.publishWorkflowAttachment(document);
}