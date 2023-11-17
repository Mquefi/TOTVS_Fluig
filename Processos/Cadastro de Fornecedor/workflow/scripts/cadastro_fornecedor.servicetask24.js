function updateFornec(data) {
	return;
	var clientService = fluigAPI.getAuthorizeClientService();
	data.method = 'put';
	data.params.NOME_FANTASIA = data.params.NOME_FANTASIA + '.';
	var paramValues = JSON.stringify(data);
	var vo = clientService.invoke(paramValues);

	var response = JSON.parse(vo.getResult());

	for ( var i in response) {
		if (i == "errorMessage") {
			throw response[i];
		}
	}

}

function servicetask24(attempt, message) {
	try {
		log.info('############################# ENTROU NO CADASTRO');
		var NOME = hAPI.getCardValue('A2_NOME');
		var NOME_FANTASIA = hAPI.getCardValue('A2_NREDUZ');
		var ENDERECO = hAPI.getCardValue('A2_END');
		var ENDERECO = hAPI.getCardValue('A2_END');
		var BAIRRO = hAPI.getCardValue('A2_BAIRRO');

		var TIPO = hAPI.getCardValue('A2_TIPO');
		var ESTADO = hAPI.getCardValue('A2_EST_COD').trim();
		var CODIGO_MUNICIPIO = hAPI.getCardValue('A2_COD_MUN_COD');
		var MUNICIPIO = hAPI.getCardValue('A2_COD_MUN').trim();
		
		var CNAE = hAPI.getCardValue('A2_CNAE').trim();
		var ANP = hAPI.getCardValue('A2_CODANP').trim();
		
		var CEP = hAPI.getCardValue('A2_CEP').replace("-", "");
		var INSCRICAO_ESTADUAL = hAPI.getCardValue('A2_INSCR');
		var CNPJ = hAPI.getCardValue('A2_CGC').replaceAll("\\.", "").replace("-", "").replace("/", "");
		
		
		log.info("@@@ CNPJ "+CNPJ)
		
		
		var PAIS = hAPI.getCardValue('A2_COD_PAIS');
		var EMAIL = hAPI.getCardValue('A2_EMAIL');
		var DDD = hAPI.getCardValue('A2_DDD');
		var TELEFONE = hAPI.getCardValue('A2_TEL').replace("-", "");

		var BANCO = hAPI.getCardValue('A2_BANCO_COD');
		var AGENCIA = hAPI.getCardValue('A2_AGENCIA');
		var DIGITO_AGENCIA = hAPI.getCardValue('A2_DVAGE');

		var CONTA = hAPI.getCardValue('A2_NUMCON').trim();
		var DIGITO_CONTA = hAPI.getCardValue('A2_DVCTA');
		var CONTA_CONTABIL = hAPI.getCardValue('A2_CONTA_COD').trim();

		var TIPO_CONTA_FORNECEDOR = hAPI.getCardValue('A2_TIPCTA');
		var FAX = hAPI.getCardValue('A2_FAX').replace("-", "");
		var RECOLHE_ISS = hAPI.getCardValue('A2_RECISS');
		var RECOLHE_INSS = hAPI.getCardValue('A2_RECINSS');
		var TIPO_PESSOA = hAPI.getCardValue('A2_TPESSOA');
		var CODIGO_PAIS = hAPI.getCardValue('A2_CODPAIS');

		var RECOLHE_PIS = hAPI.getCardValue('A2_RECPIS');
		var RECOLHE_COFINS = hAPI.getCardValue('A2_RECCOFI');
		var RECOLHE_CSLL = hAPI.getCardValue('A2_RECCSLL');

		var TENANTID = hAPI.getCardValue('tenant');
		var hidden_tenant = hAPI.getCardValue('hidden_tenant');
		log.info("@@@ hidden_tenant " + hidden_tenant);

		var url = hAPI.getCardValue('url');

		log.info("@@@ url " + url);

		var hidden_filial = hAPI.getCardValue('hidden_filial');
		log.info('******** TENANTID: ' + TENANTID);
		log.info('******** TENANTID-REPLACE: '
				+ TENANTID.replaceAll("\\.", ","));

		TENANTID = TENANTID.replaceAll("\\.", ",") + ''

		var clientService = fluigAPI.getAuthorizeClientService();
		
		var data = {
			companyId : getValue("WKCompany") + '',
			serviceCode : 'cadastroFornecedor',
			endpoint : '/WSFORNEC',
			method : 'post',
			timeoutService : '100',
			params : {
				NOME : NOME + '',
				NOME_FANTASIA : NOME_FANTASIA + '',
				ENDERECO : ENDERECO + '',
				BAIRRO : BAIRRO + '',
				TIPO : TIPO + '',
				ESTADO : ESTADO + '',
				CODIGO_MUNICIPIO : CODIGO_MUNICIPIO + '',
				MUNICIPIO : MUNICIPIO + '',
				CNAE : CNAE + '',
				ANP : ANP + '',
				CEP : CEP + '',
				INSCRICAO_ESTADUAL : INSCRICAO_ESTADUAL + '',
				CNPJ : CNPJ + '',
				PAIS : PAIS + '',
				EMAIL : EMAIL + '',
				DDD : DDD + '',
				TELEFONE : TELEFONE + '',
				BANCO : BANCO + '',
				AGENCIA : AGENCIA + '',
				DIGITO_AGENCIA : DIGITO_AGENCIA + '',
				CONTA : CONTA + '',
				DIGITO_CONTA : DIGITO_CONTA + '',
				TIPO_CONTA_FORNECEDOR : TIPO_CONTA_FORNECEDOR + '',
				FAX : FAX + '',
				EMAIL : EMAIL + '',
				RECOLHE_ISS : RECOLHE_ISS + '',
				RECOLHE_INSS : RECOLHE_INSS + '',
				TIPO_PESSOA : TIPO_PESSOA + '',
				CODIGO_PAIS : CODIGO_PAIS + '',
				RECOLHE_PIS : RECOLHE_PIS + '',
				RECOLHE_COFINS : RECOLHE_COFINS + '',
				RECOLHE_CSLL : RECOLHE_CSLL + '',
				CONTA_CONTABIL : CONTA_CONTABIL + ''
			},
			options : {
				encoding : 'UTF-8',
				mediaType : 'application/json'
			},
			headers : {
				'Content-Type' : 'application/json;charset=UTF-8',
				tenantId : TENANTID,
				"Authorization" : "Bearer cG9ydGFsbmRpbnRlZ3JhZG9jb21vUHJvdGhldXNlRmx1aWc"
			}
		}
		
		

		var paramValues = JSON.stringify(data);

		log.info('******** paramValues: ' + paramValues);

		var vo = clientService.invoke(paramValues);

		log.info('############################# vo.getResult(): '
				+ vo.getResult());

		var response = JSON.parse(vo.getResult());
		
		
		var valida = response['codigo'] || "";
		
		
		
		for ( var i in response) {
			log.info('>>>>> aqui ' + i + ': ' + response[i]);
			if (i == "message") {

				if (response[i] == "Internal Server Error") {
					throw response[i];
				} else if(response[i] == "Precondition Required") {
					hAPI.setCardValue("message", response[i]);
					throw response[i];
				}else{
					hAPI.setCardValue("message", response[i]);
				}

			}

			if (i == "loja_fornecedor") {
				log.info('>>>>> ENTROU AQUI loja_fornecedor ' + i + ': ' + response[i]);
				hAPI.setCardValue("loja_fornecedor", response[i]);
			}
			if (i == "cod_fornecedor") {
				log.info('>>>>> ENTROU AQUI cod_fornecedor ' + i + ': ' + response[i]);
				hAPI.setCardValue("cod_fornecedor", response[i]);
			}

			if (i == "errorMessage") {
				log.info('>>>>> ENTROU AQUI olha aqui errorMessage ' + i + ': '
						+ response[i]);
				throw response[i];
			}
			
			updateFornec(data)
		}

	} catch (err) {
		log.info(err);
		throw err;
	}

}