function beforeTaskComplete(colleagueId,nextSequenceId,userList){
	log.info("BEFORE TASK COMPLETE");
	var processo = getValue("WKNumProces");
    var sequenceId = getValue("WKNumState");
    log.info("ID_PROCESSO_RH: "+ processo);
    log.info("ID_TAREFA_RH: "+ sequenceId);
    if(sequenceId == "15" && nextSequenceId=="59"){
        log.info("ENTROU IF");
        var parametros = new java.util.HashMap();
        parametros.put("RECEIVER", "RH");
        parametros.put("WDK_TaskNumber", processo);
        parametros.put("WDK_ProcessDescription", "Processo de Admissão");
        parametros.put("WDK_TaskDescription", "Contratação");
        var link_process = "http://fluig.compasa.com.br:8180/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+ processo
        parametros.put("WDK_TaskLink", link_process);//WDK_TaskLink http://fluig.compasa.com.br:8180/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=938
        parametros.put("LINK", "http://fluig.compasa.com.br:8180/portal/p/01/globalalertview");
        //LINK http://fluig.compasa.com.br:8180/portal/p/01/globalalertview
        //Este parâmetro é obrigatório e representa o assunto do e-mail
        parametros.put("subject", "Solicitação RH");
        
        //Monta lista de destinatários
        var destinatarios = new java.util.ArrayList();
        destinatarios.add("rh@compasa.com.br");
        
        //Envia e-mail
        notifier.notify("admin", "Email_RH", parametros, destinatarios, "text/html");
    }else{
    	log.info("ENTROU_ELSE");
        var parametros = new java.util.HashMap();
        parametros.put("RECEIVER", "SOLICITANTE");
        parametros.put("WDK_TaskNumber", processo);
        parametros.put("WDK_ProcessDescription", "Processo de Admissão");
        parametros.put("WDK_TaskDescription", "Contratação");
        var link_process = "http://fluig.compasa.com.br:8180/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+ processo
        parametros.put("WDK_TaskLink", link_process);//WDK_TaskLink http://fluig.compasa.com.br:8180/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=938
        parametros.put("LINK", "http://fluig.compasa.com.br:8180/portal/p/01/globalalertview");
        //LINK http://fluig.compasa.com.br:8180/portal/p/01/globalalertview
        //Este parâmetro é obrigatório e representa o assunto do e-mail
        parametros.put("subject", "Solicitação Admissão");
        
        //Monta lista de destinatários
        var destinatarios = new java.util.ArrayList();
        destinatarios.add(hAPI.getCardValue("hid_user_abertura"));
        
        //Envia e-mail
        notifier.notify("admin", "Email_RH", parametros, destinatarios, "text/html");
    }
}