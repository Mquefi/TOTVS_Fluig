function beforeTaskSave (colleagueId, nextSequenceId, userList) {
    var atv = getValue("WKNumState");
    var nextAtv = getValue("WKNextState");
    var temAnexo = false;

    if ((atv == 15 && nextAtv != 19) || atv == 38 ) {
        var anexos = hAPI.listAttachments();
        var temAnexo = anexos.size() > 0;
        if (!temAnexo) {
            throw "É preciso anexar o documento para continuar o processo!";
         }

        }
       
}