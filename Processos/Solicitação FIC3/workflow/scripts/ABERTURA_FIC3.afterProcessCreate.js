function afterProcessCreate(processId){
	hAPI.setCardValue("hid_numSolicitacao", processId);


	var obra = hAPI.getCardValue("S0_txt_obra_sol");
	var assunto = hAPI.getCardValue("S0_txt_area_incid");
	var subAssunto = hAPI.getCardValue("S0_txt_tp_incid");
	var prazo = hAPI.getCardValue("S0_txt_prazo_sol");



	var c1 = DatasetFactory.createConstraint("tipo", subAssunto, subAssunto, ConstraintType.MUST); 
	var c2 = DatasetFactory.createConstraint("not", assunto, assunto, ConstraintType.MUST);      
	var constraints   = new Array(c1,c2); 
	var dados = DatasetFactory.getDataset('ds_get_usuarios_notificacao',null,constraints,null);

	try{
		for (var x=0; x<dados.rowsCount;x++){
			var email = dados.getValue(x,"email");

			var c3 = DatasetFactory.createConstraint("mail", email, email, ConstraintType.MUST); 
			var dados2 = DatasetFactory.getDataset('colleague',null,[c3],null);
			var matricula = dados2.getValue(0,"colleaguePK.colleagueId");


			var c4 = DatasetFactory.createConstraint("tipo", subAssunto, subAssunto, ConstraintType.MUST); 
			var c5 = DatasetFactory.createConstraint("not", assunto, assunto, ConstraintType.MUST);
			var dados3 = DatasetFactory.getDataset('ds_get_prazo_fic03',null,[c4,c5],null);
			var conteudo = dados3.getValue(0,"S0_txt_conteudo");




			log.info('*** Teste de Email: try');
			//Monta mapa com parâmetros do template
			var parametros = new java.util.HashMap();
			parametros.put("obra", obra);
			parametros.put("assunto", assunto);
			parametros.put("subAssunto",subAssunto);
			parametros.put("descricao", conteudo);
			
		
			//Este parâmetro é obrigatório e representa o assunto do e-mail
			parametros.put("subject", "Notificação FIC3");

			log.info('*** Teste de Email Parametros 1: ' + parametros);
			
			//Monta lista de destinatários
			var destinatarios = new java.util.ArrayList();
			destinatarios.add(matricula);

			
		
			log.info('*** Teste de Email Destinatarios 1: ' + destinatarios);
			
			//Envia e-mail
			notifier.notify("admin", "fic3", parametros, destinatarios, "text/html");
			
			log.info('*** Teste de Email FIM ');

			

		
		}
		

	    
	} catch(e){
		log.info('*** Teste de Email catch: ' + e);
	}
	
}