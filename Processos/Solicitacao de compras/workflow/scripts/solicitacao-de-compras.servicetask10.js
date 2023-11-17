function servicetask10(attempt, message) {
    try {

        var itens = [];
        var vetor = [];
        var indexes = hAPI.getChildrenIndexes("tableSolicitacaoProducts");
        for (var i = 0; i < indexes.length; i++) {

            log.warn('item: ' + i);
            log.warn('coluna produto: ' + hAPI.getCardValue("produto___" + indexes[i]));
            log.warn('coluna descricao: ' + hAPI.getCardValue("nome_produto___" + indexes[i]));
            log.warn('coluna quantidade: ' + hAPI.getCardValue("qtdade___" + indexes[i]));
            log.warn('coluna centro custo: ' + hAPI.getCardValue("cc___" + indexes[i]));
            log.warn('coluna Observacao: ' + hAPI.getCardValue("observacao___" + indexes[i]));

            var json = {
                PRODUTO: hAPI.getCardValue("produto___" + indexes[i]) + "",
                QUANTIDADE: hAPI.getCardValue("qtdade___" + indexes[i]) + "",
                CENTROCUSTO: hAPI.getCardValue("cc___" + indexes[i]) + "",
                OBSERVACAO: hAPI.getCardValue("observacao___" + indexes[i]) + ""
            };

            vetor.push(json);
        }

        log.warn('CABEÇALHO');
        log.warn('SOLICITANTE: ' + hAPI.getCardValue('solicitante'));
        log.warn('EMISSAO: ' + hAPI.getCardValue('dataEmissao'));

        var dados = {
            SOLICITANTE: hAPI.getCardValue('solicitante') + "",
            EMISSAO: hAPI.getCardValue('dataEmissao') + "",
            ITENS: vetor
        };

        var TENANTID = hAPI.getCardValue('tenant');

        log.info('******** TENANTID: ' + TENANTID);
        log.info('******** TENANTID-REPLACE: ' + TENANTID.replaceAll("\\.", ","));

        TENANTID = TENANTID.replaceAll("\\.", ",") + ''

        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId: getValue("WKCompany") + '',
            serviceCode: 'cadastroSC',
            endpoint: '/WSSOLCOMP',
            method: 'post',
            timeoutService: '3000',
            options: {
                mediaType: 'application/json'
            },
            headers: {
                "tenantId": TENANTID,
                "Authorization": "Bearer cG9ydGFsbmRpbnRlZ3JhZG9jb21vUHJvdGhldXNlRmx1aWc="
            }
        }

        if (dados != '')
            data.params = dados;

        var vo = clientService.invoke(JSONUtil.toJSON(data));

        var response = JSON.parse(vo.getResult());

        for (var i in response) {
            log.info('>>>>> aqui ' + i + ': ' + response[i]);
            if (i == "message") {
                hAPI.setCardValue("messageSC", response[i]);
            }

            if (i == "solicitacao") {
                hAPI.setCardValue("scprotheus", response[i]);
            }

            if (i == "errorMessage") {
                throw response[i];
            }
        }

    } catch (err) {
        log.warn('Erro ao enviar SOLICITACAO DE COMPRAS: ' + err);
        printLog('erro', "ERRO INTEGRACAO PROTHEUS" + err.toString());
        throw err;
    }


}

function printLog(tipo, msg) {


    var msgs = getValue("WKDef") + " - " + getValue("WKNumProces") + " - " + msg
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