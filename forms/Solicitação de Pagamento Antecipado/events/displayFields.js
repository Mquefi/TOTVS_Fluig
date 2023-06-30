function displayFields(form,customHTML){
    var ATIVIDADE_INICIO = 1; // ID da primeira atividade de acordo com o seu Workflow
    
    var activity = parseInt(getValue("WKNumState"));

    var hoje = new Date().toLocaleString();
    
    // Regras para quando está criando uma solicitação ou terminando de editar a atividade inicial
    if (form.getFormMode() == "ADD" || (form.getFormMode() == "MOD") && activity == ATIVIDADE_INICIO) {
        var user = fluigAPI.getUserService().getCurrent();
        
        form.setValue("solicitante", user.getFullName());
        form.setValue("campoData", hoje.toString());
        // form.setValue("idsolicitante", user.getCode());
		form.setValue('DATA', hoje.toString());
        // Como as regras são específicas pra essa parte já pode sair da função
        return;
    }
}