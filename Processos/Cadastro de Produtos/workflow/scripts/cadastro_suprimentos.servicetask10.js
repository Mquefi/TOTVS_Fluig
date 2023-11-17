function servicetask10(attempt, message) {
	try{
		var DESCRICAO 		 	= hAPI.getCardValue('fDescricao').trim();
		var GRUPO     		 	= hAPI.getCardValue('fGrupo').split('-')[0];
		var TIPO      		 	= hAPI.getCardValue('fTipo').split('-')[0];
		var UNIDADE   		 	= hAPI.getCardValue('fUnidade').split('-')[0];
		var ARMAZEM   		 	= hAPI.getCardValue('fLocal').split('-')[0];
		var CODIGOANP        	= hAPI.getCardValue('fProdANP');
		var SEQUENANP        	= hAPI.getCardValue('fSeqANP');
		var SEGUNIDMEDIDA    	= hAPI.getCardValue('fSegUnidade').split('-')[0];
		var FATORCONVERSAO   	= hAPI.getCardValue('fFatConv');
		var TIPOCONVERSAO    	= hAPI.getCardValue('fTipoConv');
		var COMPRADOR        	= hAPI.getCardValue('fComprador').split('-')[0];
		
		var ICMS 				= hAPI.getCardValue('fAliqICMS');
		var IPI  				= hAPI.getCardValue('fAliqIPI');
		var CSLL 				= hAPI.getCardValue('fRetemCsll');
		var NCM  				= hAPI.getCardValue('fposIPINCM')?String(hAPI.getCardValue('fposIPINCM').split('-')[0]).trim():'';
		var INSS  				= hAPI.getCardValue('fCalcINSS');
		var PIS    				= hAPI.getCardValue('fRetemPis');
		var COF    				= hAPI.getCardValue('fRetemCof');
		var ORIGEM 				= hAPI.getCardValue('fOrigem').split('-')[0];
		
		var ESTOQUE  			= hAPI.getCardValue('fConta').split('-')[0];
		var DESPESA  			= hAPI.getCardValue('fXConta').split('-')[0];
		var CUSTO   			= hAPI.getCardValue('fYConta').split('-')[0];
		var GERENCIA 			= hAPI.getCardValue('fVConta').split('-')[0];

		var TENANTID            = hAPI.getCardValue('tenant');
		
		
		var BI_CONTRA    				= hAPI.getCardValue('BI_CONTRA');
		
		log.info('******** TENANTID: ' + TENANTID);
		log.info('******** TENANTID-REPLACE: ' + TENANTID.replaceAll("\\.",","));
		
		TENANTID = TENANTID.replaceAll("\\.",",")+''
		
		
		var clientService = fluigAPI.getAuthorizeClientService();	   
		var data = {
				companyId : getValue("WKCompany") + '',
				serviceCode : 'cadastroProduto',
				endpoint : '/wsprodut',
				method : 'post',   
				timeoutService: '100', 
				params : {
					COD_ANP:            CODIGOANP+'',
					CALCULA_INSS:       INSS+'',
					RETEM_COFINS:       COF+'',
					ALIQ_IPI:           IPI+'',
					RETEM_CSLL:         CSLL+'',
					SEG_UNIDADE_MEDIDA: SEGUNIDMEDIDA+'',
					TIPO:           	TIPO+'',
					COMPRADOR:      	COMPRADOR+'',
					CONTA_ESTOQUE: 		ESTOQUE+'',
					UNIDADE_MEDIDA: 	UNIDADE+'',
					GRUPO:          	GRUPO+'',
					COD_ANP_SEC:    	SEQUENANP+'',
					LOCAL_PADRAO:   	ARMAZEM+'',
					RETEM_PIS:      	PIS+'',
					ORIGEM:         	ORIGEM+'',
					CONTA_DESPESA:  	DESPESA+'',
					CONTA_CUSTO:    	CUSTO+'',
					DESCRICAO:      	DESCRICAO+'',
					CONVERSAO:      	FATORCONVERSAO+'',
					TIPO_CONVERSAO: 	TIPOCONVERSAO+'',
					POS_IPI_NCM:    	NCM+'',
					CONTA_GERENCIA: 	GERENCIA+'',
					ALIQ_ICMS:      	ICMS+'',
					B1_Contra:      	BI_CONTRA+''
					},
				options : {
					encoding : 'UTF-8',
					mediaType: 'application/json'
				},
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					"tenantId": TENANTID,
					"Authorization": "Bearer cG9ydGFsbmRpbnRlZ3JhZG9jb21vUHJvdGhldXNlRmx1aWc="
				}
		}
		
		var paramValues = JSON.stringify(data);
		
		log.info('******** paramValues: ' + paramValues);
		
		var vo = clientService.invoke(paramValues);
		
		log.info('############################# vo.getResult(): ' + vo.getResult());
		
		var response = JSON.parse(vo.getResult());
		
		log.info('############################# vo.response : ' + response['codigo']);
		
		log.info('############################# vo.response : ' + response['codigo']);
		
		
			var valida = response['codigo'] || "";
		
			if(valida != ""){
				for (var i in response) {
					log.info('>>>>> aqui ' + i + ': ' + response[i]);
					if(i == "message"){
						log.info('>>>>> ENTROU AQUI 123445 ' + i + ': ' + response[i]);
						hAPI.setCardValue("message",  response[i] );
					}
					
					if(i == "codigo"){
						log.info('>>>>> ENTROU AQUI 123445 ' + i + ': ' + response[i]);
						hAPI.setCardValue("fCodigoProduto",  response[i] );
					}
					
					
					if(i == "errorMessage"){
						log.info('>>>>> ENTROU AQUI olha aqui ' + i + ': ' + response[i]);
						throw response[i];
					}
				}
			}else{
				throw "Erro ao tentar integrar com o Protheusas";
			}
			
		
		
		
		
		
		
		
		
	} catch(err) {
		throw err;
	}
	
}