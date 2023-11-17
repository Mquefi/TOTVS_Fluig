function servicetask15(attempt, message) {
  try {
    var itens = [];
    var vetor = [];
    var tipoEntrada = hAPI.getCardValue('tipo_entrada');
    
    
    


    if (tipoEntrada == 'C') {
    	
        var codFornecedor = hAPI.getCardValue('codFornecedor');
        var loja = hAPI.getCardValue('loja');
        
        
      var fornecedor = hAPI.getCardValue('fornecedor');
      var indexes = hAPI.getChildrenIndexes('itens');
      
      
      var emissao = hAPI.getCardValue('data_emissao').split('/');
      
      var dia = emissao[0];
      var mes = emissao[1];;
      var ano= emissao[2];
      
      emissao = ano+'-'+mes+'-'+dia;
      
      for (var i = 0; i < indexes.length; i++) {
        log.warn('item: ' + i);
        log.warn('coluna produto: ' + hAPI.getCardValue('produto___' + indexes[i]));
        log.warn('coluna quantidade: ' + hAPI.getCardValue('qtdade___' + indexes[i]));
        log.warn('coluna preco: ' + hAPI.getCardValue('valor_unitario___' + indexes[i]));
        log.warn('coluna total: ' + hAPI.getCardValue('valor_total___' + indexes[i]));
        log.warn('coluna pedido: ' + hAPI.getCardValue('pedido___' + indexes[i]));
        log.warn('coluna item_pedido: ' + hAPI.getCardValue('item_pedido___' + indexes[i]));
        log.warn('coluna centro custo: ' + hAPI.getCardValue('centro_custo___' + indexes[i]).trim());

        
        log.warn('DTCOMPETENCIA : ' + hAPI.getCardValue('D1_DFABRIC___' + indexes[i]).trim());
        
       
        
        
        var json = {
          PRODUTO: hAPI.getCardValue('produto___' + indexes[i]) + '',
          QUANTIDADE: hAPI.getCardValue('qtdade___' + indexes[i]) + '',
          PRECO: hAPI.getCardValue('valor_unitario___' + indexes[i]) + '',
          TOTAL: hAPI.getCardValue('valor_total___' + indexes[i]) + '',
          PEDIDO: hAPI.getCardValue('pedido___' + indexes[i]) + '',
          ITEM_PEDIDO: hAPI.getCardValue('item_pedido___' + indexes[i]) + '',
          CENTROCUSTO: hAPI.getCardValue('centro_custo___' + indexes[i]).trim() + '',
          DTCOMPETENCIA: hAPI.getCardValue('D1_DFABRIC___' + indexes[i]) + ''
        };

        vetor.push(json);
      }
    } else {
        var codFornecedor = hAPI.getCardValue('codFornecedor2');
        var loja = hAPI.getCardValue('loja2');
        
        
      var indexes = hAPI.getChildrenIndexes('itens2');
      
      var emissao = hAPI.getCardValue('data_emissao').split('/');
      
      var dia = emissao[0];
      var mes = emissao[1];;
      var ano= emissao[2];
      
      emissao = ano+'-'+mes+'-'+dia;
      
      for (var i = 0; i < indexes.length; i++) {
        var preco = toFixed(hAPI.getCardValue('valor_unitario2___' + indexes[i]), 8);
        if (parseFloat(preco) > 9999999) throw 'O valor ' + preco + ' é maior que o limite permitido';

        log.warn('item: ' + i);
        log.warn('coluna produto: ' + hAPI.getCardValue('produto2___' + indexes[i]));
        log.warn('coluna quantidade: ' + hAPI.getCardValue('qtdade2___' + indexes[i]));
        log.warn('coluna preco: ' + toFixed(hAPI.getCardValue('valor_unitario2___' + indexes[i]), 8));
        log.warn('coluna total: ' + hAPI.getCardValue('valor_total2___' + indexes[i]));
        log.warn('coluna centro custo: ' + hAPI.getCardValue('cc___' + indexes[i]));
        
        log.warn('DTCOMPETENCIA: ' + hAPI.getCardValue('D1_DFABRIC2___' + indexes[i]).trim());

        var json = {
          PRODUTO: hAPI.getCardValue('produto2___' + indexes[i]) + '',
          QUANTIDADE: hAPI.getCardValue('qtdade2___' + indexes[i]) + '',
          PRECO: toFixed(hAPI.getCardValue('valor_unitario2___' + indexes[i]), 8) + '',
          TOTAL: hAPI.getCardValue('valor_total2___' + indexes[i]) + '',
          CENTROCUSTO: hAPI.getCardValue('cc___' + indexes[i]) + '',
          DTCOMPETENCIA: hAPI.getCardValue('D1_DFABRIC2___' + indexes[i]) + ''
        };

        vetor.push(json);
      }
    }
    log.warn('CABEÇALHO');
    log.warn('NUMERO_NOTA: ' + hAPI.getCardValue('numero'));
    log.warn('SERIE_NOTA: ' + hAPI.getCardValue('serie'));
    log.warn('EMISSAO: ' + hAPI.getCardValue('data_emissao'));
    log.warn('FORNECEDOR: ' + fornecedor);
    log.warn('ESPECIE: ' + hAPI.getCardValue('hidden_especie'));
    log.warn('CONDICAO_PAGAMENTO: ' + hAPI.getCardValue('hidden_condicao'));
    log.warn('TIPO: ' + hAPI.getCardValue('tipo_entrada'));
    log.info("@@@ AMISSAO "+emissao);
    
    
    var dados = {
      NUMERO_NOTA: hAPI.getCardValue('numero') + '',
      SERIE_NOTA: hAPI.getCardValue('serie') + '',
      EMISSAO: emissao + '',
      FORNECEDOR: codFornecedor + '',
      ESPECIE: hAPI.getCardValue('hidden_especie') + '',
      CONDICAO_PAGAMENTO: hAPI.getCardValue('hidden_condicao') + '',
      TIPO: hAPI.getCardValue('tipo_entrada') + '',
      LOJA:loja+ '',
      ITENS: vetor
    };

    var TENANTID = hAPI.getCardValue('tenant');

    log.info('******** TENANTID: ' + TENANTID);
    log.info('******** TENANTID-REPLACE: ' + TENANTID.replaceAll('\\.', ','));

    TENANTID = TENANTID.replaceAll('\\.', ',') + '';

    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: getValue('WKCompany') + '',
      serviceCode: 'cadastroPreNota',
      endpoint: '/WSPRNFEN',
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

    log.info("@@@@ INTEGRAÇÃO "+JSONUtil.toJSON(data));
    
    var vo = clientService.invoke(JSONUtil.toJSON(data));

    var response = JSON.parse(vo.getResult());

    for (var i in response) {
      log.info('>>>>> aqui ' + i + ': ' + response[i]);
      if (i == 'message') {
        log.info('>>>>> ENTROU AQUI 123445 ' + i + ': ' + response[i]);
        hAPI.setCardValue('message', response[i]);
        
        if(response[i] == "Precondition Required"){
        	throw response[i];
        }
        
        if(response[i] == "Internal Server Error"){
        	throw response[i];
        }
      }

      if (i == 'prenota') {
        log.info('>>>>> ENTROU AQUI 123445 ' + i + ': ' + response[i]);
      }

      if (i == 'errorMessage') {
        log.info('>>>>> ENTROU AQUI olha aqui ' + i + ': ' + response[i]);
        throw response[i];
      }
    }
  } catch (err) {
    log.warn('Erro ao enviar PRE NOTA: ' + err);
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
