function servicetask9(attempt, message) {
  try {
    var vetor = [];

    var json = {
      PRODUTO: hAPI.getCardValue('C6_PRODUTO') + '',
      QUANTIDADE: hAPI.getCardValue('C6_QTDVEN_ITEM') + '',
      PRECO: hAPI.getCardValue('C6_VALOR') + '',
      TOTAL: hAPI.getCardValue('C6_VALOR_TOTAL_INTEGRA') + '',
      DATAENTREGA: hAPI.getCardValue('C6_ENTREG') + '',
      CENTROCUSTO: hAPI.getCardValue('C6_CC') + '',
      C6_TES: hAPI.getCardValue('F4_CODIGO') + ''
    };

    vetor.push(json);

    var TES = hAPI.getCardValue('F4_CODIGO') + '';
    var FINALIDADE = TES == '527' || TES == '529' || TES == '714' || TES == '526' ? '1' : '4';

    var dados = {
      EMAIL: hAPI.getCardValue('user_email') + '',
      CGC: hAPI.getCardValue('hidden_codCliente') + '',
      OBSERVACAO: hAPI.getCardValue('C5_OBINTER') + '',
      MSGNOTA: hAPI.getCardValue('C5_MENIOTA') + '',
      ESTADO: hAPI.getCardValue('A2_EST_COD') + '',
      MUNICIPIO: hAPI.getCardValue('A2_COD_MUN_COD') + '',
      LOCALENTREGA: hAPI.getCardValue('C5_DESTIMO') + '',
      USINA: hAPI.getCardValue('C5_USINA') + '',
      FINALIDADE: FINALIDADE,
      PEDIDO: hAPI.getCardValue('fCodigoPedido') + '',
      ITENS: vetor
    };

    var TENANTID = hAPI.getCardValue('tenant');

    log.info('******** TENANTID: ' + TENANTID);
    log.info('******** TENANTID-REPLACE: ' + TENANTID.replaceAll('\\.', ','));

    TENANTID = TENANTID.replaceAll('\\.', ',') + '';

    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: getValue('WKCompany') + '',
      serviceCode: 'CadastroPedidoVenda',
      endpoint: '/WSPEDVEND',
      method: 'post',
      timeoutService: '3000',
      options: {
        mediaType: 'application/json'
      },
      headers: {
        tenantId: TENANTID,
        Authorization: 'Bearer cG9ydGFsbmRpbnRlZ3JhZG9jb21vUHJvdGhldXNlRmx1aWc='
      }
    };

    if (dados != '') data.params = dados;

    var vo = clientService.invoke(JSONUtil.toJSON(data));
    
    log.info('############################# vo.getResult(): ' + vo.getResult());
   
    
    var response = JSON.parse(vo.getResult());
    log.info('############################# vo.response : ' + response['pedido']);
    
    
    var valida = response['pedido'] || "";
    
    if(valida != ""){
	    for (var i in response) {
	      log.info('>>>>> aqui ' + i + ': ' + response[i]);
	      if (i == 'message') {
	        log.info('>>>>> ENTROU AQUI 123445 ' + i + ': ' + response[i]);
	        hAPI.setCardValue('message', response[i]);
	      }
	
	      if (i == 'pedido') {
	        log.info('>>>>> ENTROU AQUI 123445 ' + i + ': ' + response[i]);
	        hAPI.setCardValue('fCodigoPedido', response[i]);
	      }
	
	      if (i == 'errorMessage') {
	        log.info('>>>>> ENTROU AQUI olha aqui ' + i + ': ' + response[i]);
	        throw response[i];
	      }
	    }
    }else{
    	throw "Erro ao tentar integrar com o Protheus";
    }
    
    
    
    
    
    
  } catch (err) {
    log.warn('Erro ao enviar PEDIDO: ' + err);
    printLog('erro', 'ERRO INTEGRACAO PROTHEUS' + err.toString());
    throw err;
  }
}

function printLog(tipo, msg) {
  var msgs = getValue('WKDef') + ' - ' + getValue('WKNumProces') + ' - ' + msg;
  if (tipo == 'info') {
    log.info(msgs);
  } else if (tipo == 'error') {
    log.error(msgs);
  } else if (tipo == 'fatal') {
    log.fatal(msgs);
  } else {
    log.warn(msgs);
  }
}
