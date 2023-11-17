function servicetask32(attempt, message) {
	
	
	var quantidadeFuncao = parseInt(hAPI.getCardValue('quantidadeFuncao'));
	var quant = [];
	for(var i = 0;i<=quantidadeFuncao;i++){
		
		log.info("@@@ INTERGRAÇAO START PROCESS");
		var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
	    var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
	    var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
	    var objectFactory = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ObjectFactory");
	    var cardData = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray");
	    var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
	    var colleaguesId = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    colleaguesId.getItem().addAll(['admin']);
	    var appointment =  workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
	    
	    
	    
	    var itemForm1 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm1.getItem().add("aprovador_Adm_Obra");
	    itemForm1.getItem().add(hAPI.getCardValue('aprovador_Adm_Obra'))
	    cardData.getItem().add(itemForm1);
	    
	    var itemForm2 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm2.getItem().add("aprovador_Eng_Gestor");
	    itemForm2.getItem().add(hAPI.getCardValue('aprovador_Eng_Gestor'))
	    cardData.getItem().add(itemForm2);
	    
	    
	    var itemForm3 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm3.getItem().add("aprovador_Rh_Sede");
	    itemForm3.getItem().add(hAPI.getCardValue('aprovador_Rh_Sede'))
	    cardData.getItem().add(itemForm3);
	    
	    
	    var itemForm4 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm4.getItem().add("codSolicitante");
	    itemForm4.getItem().add(hAPI.getCardValue('codSolicitante'))
	    cardData.getItem().add(itemForm4);
	    
	    
	    var itemForm5 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm5.getItem().add("numSolicitacaoDeVaga");
	    itemForm5.getItem().add(hAPI.getCardValue('idSolicitacao'))
	    cardData.getItem().add(itemForm5);
	    
	    
	    
	    var itemForm6 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm6.getItem().add("solicitante");
	    itemForm6.getItem().add(hAPI.getCardValue('solicitante'))
	    cardData.getItem().add(itemForm6);
	    
	    var itemForm7 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm7.getItem().add("email");
	    itemForm7.getItem().add(hAPI.getCardValue('email'))
	    cardData.getItem().add(itemForm7);
	    
	    var tipoDeVaga = hAPI.getCardValue('tipoDeVaga');
	    if(tipoDeVaga == '1'){
	    	tipoDeVaga = "CLT"
	    }else if(tipoDeVaga == '2'){
	    	tipoDeVaga = "Jovem Aprendiz"
	    }else if(tipoDeVaga == '3'){
	    	tipoDeVaga = "Aprendiz"
	    }else if(tipoDeVaga == '4'){
	    	tipoDeVaga = "Estagiário"
	    }else if(tipoDeVaga == '5'){
	    	tipoDeVaga = "PJ"
	    }
	    
	    var itemForm8 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm8.getItem().add("TipoContratacao");
	    itemForm8.getItem().add(tipoDeVaga)
	    cardData.getItem().add(itemForm8);
	    
	    var possuiCandidato = hAPI.getCardValue('possuiCandidato');
	    if(possuiCandidato == '1'){
	    	possuiCandidato = "Sim"
	    }else if(possuiCandidato == '2'){
	    	possuiCandidato = "Não"
	    }
	    
	    
	    var itemForm9 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm9.getItem().add("temCandidato");
	    itemForm9.getItem().add(possuiCandidato)
	    cardData.getItem().add(itemForm9);
	    
	    
	    var itemForm10 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm10.getItem().add("nomeCandidato");
	    itemForm10.getItem().add(hAPI.getCardValue('nomeCandidato'))
	    cardData.getItem().add(itemForm10);
	    
	    
	    var itemForm11 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm11.getItem().add("estado");
	    itemForm11.getItem().add(hAPI.getCardValue('estado'))
	    cardData.getItem().add(itemForm11);
	    
	    var itemForm12 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm12.getItem().add("descricaoEstado");
	    itemForm12.getItem().add(hAPI.getCardValue('descricaoEstado'))
	    cardData.getItem().add(itemForm12);
	    
	    var itemForm13 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm13.getItem().add("municipio");
	    itemForm13.getItem().add(hAPI.getCardValue('municipio'))
	    cardData.getItem().add(itemForm13);
	    
	    
	    
	    var itemForm14 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm14.getItem().add("trabalho");
	    itemForm14.getItem().add(hAPI.getCardValue('trabalho'))
	    cardData.getItem().add(itemForm14);
	    
	    
	    var itemForm15 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm15.getItem().add("indicacao");
	    itemForm15.getItem().add(hAPI.getCardValue('indicacao'))
	    cardData.getItem().add(itemForm15);
	    
	    var itemForm16 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm16.getItem().add("nomeQUemIndicou");
	    itemForm16.getItem().add(hAPI.getCardValue('nomeQUemIndicou'))
	    cardData.getItem().add(itemForm16);
	    
	    var itemForm17 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm17.getItem().add("parente");
	    itemForm17.getItem().add(hAPI.getCardValue('parente'))
	    cardData.getItem().add(itemForm17);
	    
	    
	    var itemForm18 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm18.getItem().add("NomeParente");
	    itemForm18.getItem().add(hAPI.getCardValue('NomeParente'))
	    cardData.getItem().add(itemForm18);
	    
	    
	    var itemForm19 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm19.getItem().add("estadoCivil");
	    itemForm19.getItem().add(hAPI.getCardValue('estadoCivil'))
	    cardData.getItem().add(itemForm19);
	    
	    var itemForm20 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    itemForm20.getItem().add("escolaridade");
	    itemForm20.getItem().add(hAPI.getCardValue('escolaridade'))
	    cardData.getItem().add(itemForm20);
	    

	    
	    var rest =  workflowEngineService.startProcess("informatica@compasa.com.br", "Fluig@1q2w3e4r", 01, "solicitacao_de_admissao",0, colleaguesId, "Tarefa iniciado automaticamente", "admin", true, processAttachmentDtoArray, cardData, appointment, false);
	    numeroNovaSolic = rest.getItem().get(0).getItem().get(1).toString();
	    log.info("@@@ INTERGRAÇAO START PROCESS FIM "+numeroNovaSolic );
	    quant.push(numeroNovaSolic);
		
	}
	
	hAPI.setCardValue('solicitacoes',quant)
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
