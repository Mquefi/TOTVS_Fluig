function validateForm(form){

	var CURRENT_STATE = getValue('WKNumState');
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
    var errorMsg = '';
	
	log.info('##### Checlist Contrato - validateForm - CURRENT_STATE: ' + CURRENT_STATE + ' - NEXT_STATE: ' + NEXT_STATE + '- COMPLETED_TASK: ' + COMPLETED_TASK) 
	 
	if(COMPLETED_TASK){
		if(CURRENT_STATE == 5 && NEXT_STATE == 6){
			/*
	        if(form.getValue('fProdANP') == null || form.getValue('fProdANP') == ""){
	            errorMsg += "O campo Cod Prod ANP é obrigatorio.\n";
	        }
	        if(form.getValue('fSeqANP') == null  || form.getValue('fSeqANP') == ""){
	            errorMsg += "O campo Cod Seq ANP é obrigatorio.\n";
	        }
	        
	        }*/
		 } else if( CURRENT_STATE == 6  && NEXT_STATE == 8 ){
			//campos do primeiro processo - dados base
			/*
	        if(form.getValue('fProdANP') == null || form.getValue('fProdANP') == ""){
	            errorMsg += "O campo Cod Prod ANP é obrigatorio.\n";
	        }
	        if(form.getValue('fSeqANP') == null  || form.getValue('fSeqANP') == ""){
	            errorMsg += "O campo Cod Seq ANP é obrigatorio.\n";
	        }*/

		 	
		}
		
		if(errorMsg != ''){
			throw '\n'+ errorMsg
		}
	}
}