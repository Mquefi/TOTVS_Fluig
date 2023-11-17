function validateForm(form){

	var CURRENT_STATE = getValue('WKNumState');
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
    var errorMsg = '';
	
	log.info('##### protocolo de remessa de documentos - validateForm - CURRENT_STATE: ' + CURRENT_STATE + ' - NEXT_STATE: ' + NEXT_STATE + '- COMPLETED_TASK: ' + COMPLETED_TASK) 
	 
	if(COMPLETED_TASK){
		if(CURRENT_STATE == '0' || CURRENT_STATE == '4' || CURRENT_STATE == '11'){
			if(form.getValue('setorOrigem') == "" || form.getValue('setorOrigem') == null){
	            errorMsg += "O campo Setor de Origem é obrigatorio.\n";
	        } 
	        
		 } else if(CURRENT_STATE == '5'  || CURRENT_STATE == '15' ){
			//campos do primeiro processo - dados base
			 if(form.getValue('setorDestino') == "" || form.getValue('setorDestino') == null){
		            errorMsg += "O campo Setor de Detino é obrigatorio.\n";
		        }     		
		}
		
		if(errorMsg != ''){
			throw '\n'+ errorMsg
		}
	}
}