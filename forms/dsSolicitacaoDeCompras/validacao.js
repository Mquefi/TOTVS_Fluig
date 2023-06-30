var beforeSendValidate = function (numState, nextState) {
    var processInstanceId = parent.ECM.workflowView.processDefinition.processInstanceId;
    var user = parent.WCMAPI.userCode;
    console.log("--Debbug-- beforeSendValidate-");
    console.log("--Debbug-- numState: " + numState);
    console.log("--Debbug-- nextState: " + nextState);

    console.log("-validateForm-");
    var retorno = new Array();

    var tableSolQtd = $('table#tableSolicitacaoProducts tbody tr [id^="qtdade___"]');
    var tableSolCC = $('table#tableSolicitacaoProducts tbody tr [id^="cc___"]');

    let z = 0;
    let newLine = false;

    if (tableSolQtd.length > 0) {
        for (var i = 0; i < tableSolQtd.length; i++) {
            z++
            if (tableSolQtd[i].value == '' || parseInt(tableSolQtd[i].value) <=0 ) {
                retorno.push('ITEM:' + z.toString() + ' -> Quantidade não preenchida ou zerada');
                newLine = true;
            }
            if (tableSolCC[i].value == '') {
                retorno.push('ITEM:' + z.toString() + ' -> Código do Centro de Custo não preenchido');
                newLine = true;
            }
            if (newLine) {
                retorno.push('\n');
                newLine = false;
            }
        }
    } else {
        //msgSwap('Opss',"Por favor, informe ao menos um produto.",'error');
        //return false;
        throw "Por favor, informe ao menos um produto.";
    }
    if (retorno.length > 0) {
        var cErro = "";
        for (var i = 0; i < retorno.length; i++) {
            if (retorno[i] != '' && retorno[i] != undefined) {
                cErro += retorno[i] + '\n';

            }
        }
        if (cErro != '' && cErro != undefined)
        throw (cErro);
            //msgSwap('Opss',cErro,'error');
            //return false;
    }




}