
beforeSendValidate = function(numState,nextState){
	console.log("ATIVIDADE: ", numState);
	console.log("BEFORE: ", globalMsg.mensagens.length);
	//VALIDANDO CAMPOS
	if(numState==0 || numState==4){
		
		if($("#S0_txt_set_sol").val() == "" || $("#S0_txt_set_sol").val() == null || $("#S0_txt_set_sol").val() == undefined ){
			throw "Favor selecionar o seu setor para continuar a abertura do chamado!";
		}
		
		if($("#S0_txt_area_incid").val() == "" || $("#S0_txt_area_incid").val() == null || $("#S0_txt_area_incid").val() == undefined ){
			throw "Favor selecionar uma Área de Incidente para continuar a abertura do chamado!";
		}
		if($("#S0_txt_tp_incid").val() == "" || $("#S0_txt_tp_incid").val() == null || $("#S0_txt_tp_incid").val() == undefined ){
			throw "Favor selecionar um Tipo de Incidente para continuar a abertura do chamado!";
		}		
		if($("#S0_txt_prazo_sol").val() == "" || $("#S0_txt_prazo_sol").val() == null || $("#S0_txt_prazo_sol").val() == undefined ){
			throw "Favor selecionar um Prazo Estimado para continuar a abertura do chamado!";
		}
		if($("#S0_txt_resp_sol").val() == "" || $("#S0_txt_resp_sol").val() == null || $("#S0_txt_resp_sol").val() == undefined ){
			throw "Favor selecionar um Responsável para continuar a abertura do chamado!";
		}
		
		$("#hid_emails_fic3").val(busca_emails());
	}else if(numState == 5){
		

	}else if(numState == 9){
		var just = $('#S3_sel_validacao option:selected').val();
		if(just == 'Error'){
			throw 'Você precisa selecionar ao menos uma opção de validação do seu Ticket';	
		}
		$("#hid_grupo_meca").val($("#hid_idUserTi").val());
	}else if(numState == 19){
		$("#hid_grupo_meca").val($("#hid_idUserTi").val());
	}
	
	

	if(globalMsg.mensagens.length > 0){
		createCard();
	}else{
		if(numState == 0 || numState==4){
			//alert("ENTROU");
			throw 'Você precisa adicionar ao menos uma descrição para efetivar sua solicitação';
		}else if(numState == 5){
			throw 'Você precisa adicionar ao menos uma descrição de Resolução efetivar sua ação';
		}else if(numState == 9){
			var just = $('#S3_sel_validacao option:selected').val();
			if(just == 'Error'){
				throw 'Você precisa selecionar ao menos uma opção de validação do seu Ticket';	
			}else if(just == 'Não'){
				throw 'Você precisa adicionar ao menos uma justificativa para a não resolução do seu Ticket';	
			}
		}
		
	}

	
	
	
	
	
}
function busca_emails(){
	var assunto = $("#S0_txt_area_incid").val();
	var c1 = DatasetFactory.createConstraint("S0_txt_assunto", assunto, assunto, ConstraintType.MUST);      
    var constraints   = new Array(c1);
	var dados = DatasetFactory.getDataset('ds_assuntos',null,constraints,null);
	console.log("EMAIL; ", dados);
	return dados.values[0]["S0_txt_emails"];
}
function createCard(){
	console.log("GRAVANDO MENSAGENS: ",globalMsg);
	for(var key in globalMsg.mensagens){
		var obj = { 
			"documentDescription": "Mensagem - "+globalMsg.mensagens[key].data, 
			//PRODUCAO === 27679 / HOMOLOGACAO === 368
			"parentDocumentId": "27679", 
			"version": "1000", 
			"inheritSecurity": "false", 
			"attachments": [], 
			"formData": [ 
					{ 
						"name": "dataComentario", 
						"value": globalMsg.mensagens[key].data 
					}, { 
						"name": "tipoComentario", 
						"value": globalMsg.mensagens[key].typeBox 
					}, { 
						"name": "idUsuarioComentario", 
						"value": globalMsg.mensagens[key].idUser 
					}, { 
						"name": "nomeUsuarioComentario", 
						"value": globalMsg.mensagens[key].user 
					}, { 
						"name": "comentario", 
						"value": globalMsg.mensagens[key].msg 
					}, { 
						"name": "hashTicket", 
						"value": globalMsg.mensagens[key].hashTicket 
					}, { 
						"name": "actionMSG", 
						"value": globalMsg.mensagens[key].actionMSG 
					}
				] 
		};

	
		// _conn.setParam = obj;
		// _conn.addCard;
		//PRODUCAO = SERVICE == "API_FLUIG" HOMOLOGACAO = SERVICE === "CreateCardAPI"
		var objPai = {
			'service':'API_FLUIG',
			'endpoint':'/api/public/2.0/cards/create/',
			'method':'post',
			'params':obj
		}

		var objRequest = {
			'dataset':'APIConnection',
			'campos':null,
			'ordem':null,
			'filtros':[{
				'campo':'filtro',
				'initial':JSON.stringify(objPai),
				'final':JSON.stringify(objPai),
				'tipo':'MUST',
				'like':false
			}]
		}
		console.log("AQUI: ",objRequest);
		var t = getDados(objRequest);
		console.log("DEPOIS QUE RODOU NOVO SERVICO: ",t);
	}
}

getDados = function(p){
	console.log("DENTRO DO GETDADOS: ",p);
    if(typeof p == 'object'){
       if(p.dataset){
           if(p.filtros != null){
              var f = new Array();
               for(i = 0; i < p.filtros.length; i++){
                   var tipo = p.filtros[i].tipo;
                       if(tipo == "MUST"){
                           tipo = ConstraintType.MUST;
                       }else if(tipo == "SHOULD"){
                           tipo = ConstraintType.SHOULD;
                       }else{
                           tipo = ConstraintType.MUST_NOT;
                       }
                       
                   f.push(
                       DatasetFactory.createConstraint(
                           p.filtros[i].campo,
                           p.filtros[i].initial,
                           p.filtros[i].final,
                           tipo,
                           p.filtros[i].like
                       )
                   );
               }
           }else{
               var f = p.filtros;
           }
           try{
               return DatasetFactory.getDataset(p.dataset,p.campos,f,p.ordem);
           }catch(e){
               throw e;
           }
       }else{
           FLUIGC.toast({
               title:"Ops!",
               message:"Dataset Não Encontratdo",
               type:"danger" 
           });
       }            
   }else{
       FLUIGC.toast({
           title:"Ops!",
           message:"Parametros inválidos",
           type:"danger" 
       });
   }
}