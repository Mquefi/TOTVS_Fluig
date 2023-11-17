function validateForm(form){

	var CURRENT_STATE = getValue('WKNumState');
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
    var errorMsg = '';
	
	log.info('##### Cadastro de Produto - validateForm - CURRENT_STATE: ' + CURRENT_STATE + ' - NEXT_STATE: ' + NEXT_STATE + '- COMPLETED_TASK: ' + COMPLETED_TASK) 
	 
	if(COMPLETED_TASK){
		if(CURRENT_STATE == 5 && NEXT_STATE == 6){
			if(form.getValue('tenant') == "" || form.getValue('tenant') == null){
	            errorMsg += "O campo Grupo empresa/Filial é obrigatorio.\n";
	        } 
	        if(form.getValue('fDescricao') == "" || form.getValue('fDescricao') == null){
	            errorMsg += "O campo Descrição é obrigatorio.\n";
	        } 
	        if(form.getValue('fGrupo') == "" || form.getValue('fGrupo') == null){
	            errorMsg += "O campo Grupo é obrigatorio.\n";
	        } 
	        if(form.getValue('fTipo') == "" || form.getValue('fTipo') == null){
	            errorMsg += "O campo Tipo é obrigatorio.\n";
	        } 
	        if(form.getValue('fUnidade') == "" || form.getValue('fUnidade') == null){
	            errorMsg += "O campo Unidade é obrigatorio.\n";
	        } 
	        if(form.getValue('fLocal') == "" || form.getValue('fLocal') == null){
	            errorMsg += "O campo Armazem Padrão é obrigatorio.\n";
	        }/*
	        if(form.getValue('fProdANP') == null || form.getValue('fProdANP') == ""){
	            errorMsg += "O campo Cod Prod ANP é obrigatorio.\n";
	        }
	        if(form.getValue('fSeqANP') == null  || form.getValue('fSeqANP') == ""){
	            errorMsg += "O campo Cod Seq ANP é obrigatorio.\n";
	        }
	        if(form.getValue('fSegUnidade') == ""){
	            errorMsg += "O campo Seg.Unidade Medida é obrigatorio.\n";
	        }
			if(form.getValue('fFatConv') == "" || form.getValue('fSeqANP') == null){
	            errorMsg += "O campo Fator Conversão é obrigatorio.\n";
	        }
			if(form.getValue('fComprador') == "" || form.getValue('fComprador') == null){
	            errorMsg += "O campo Comprador é obrigatorio.\n";
	        }*/
		 } else if( CURRENT_STATE == 6  && NEXT_STATE == 8 ){
			//campos do primeiro processo - dados base
			if(form.getValue('fDescricao') == "" || form.getValue('fDescricao') == null){
	            errorMsg += "O campo Descrição é obrigatorio.\n";
	        } 
	        if(form.getValue('fGrupo') == "" || form.getValue('fGrupo') == null){
	            errorMsg += "O campo Grupo é obrigatorio.\n";
	        } 
	        if(form.getValue('fTipo') == "" || form.getValue('fTipo') == null){
	            errorMsg += "O campo Tipo é obrigatorio.\n";
	        } 
	        if(form.getValue('fUnidade') == "" || form.getValue('fUnidade') == null){
	            errorMsg += "O campo Unidade é obrigatorio.\n";
	        } 
	        if(form.getValue('fLocal') == "" || form.getValue('fLocal') == null){
	            errorMsg += "O campo Armazem Padrão é obrigatorio.\n";
	        }/*
	        if(form.getValue('fProdANP') == null || form.getValue('fProdANP') == ""){
	            errorMsg += "O campo Cod Prod ANP é obrigatorio.\n";
	        }
	        if(form.getValue('fSeqANP') == null  || form.getValue('fSeqANP') == ""){
	            errorMsg += "O campo Cod Seq ANP é obrigatorio.\n";
	        }
	        if(form.getValue('fSegUnidade') == ""){
	            errorMsg += "O campo Seg.Unidade Medida é obrigatorio.\n";
	        }
			if(form.getValue('fFatConv') == "" || form.getValue('fSeqANP') == null){
	            errorMsg += "O campo Fator Conversão é obrigatorio.\n";
	        }
			if(form.getValue('fComprador') == "" || form.getValue('fComprador') == null){
	            errorMsg += "O campo Comprador é obrigatorio.\n";
	        }*/

			//campos do segundo processo - Suprimentos

			if(form.getValue('fAliqICMS') == "" || form.getValue('fAliqICMS') == null){
	            errorMsg += "O campo Aliq.ICMS é obrigatorio.\n";
	        } 
	        if(form.getValue('fAliqIPI') == "" || form.getValue('fAliqIPI') == null){
	            errorMsg += "O campo Aliq.IPI é obrigatorio.\n";
	        } 
	        if(form.getValue('fposIPINCM') == "" || form.getValue('fposIPINCM') == null){
	            errorMsg += "O campo Pos.IPI/NCM é obrigatorio.\n";
	        } 
	        if(form.getValue('fOrigem') == "" || form.getValue('fOrigem') == null){
	            errorMsg += "O campo Origem é obrigatorio.\n";
	        } 
       
		}else if(CURRENT_STATE == 8 ){
			//campos do primeiro processo - dados base
			if(form.getValue('fDescricao') == "" || form.getValue('fDescricao') == null){
	            errorMsg += "O campo Descrição é obrigatorio.\n";
	        } 
	        if(form.getValue('fGrupo') == "" || form.getValue('fGrupo') == null){
	            errorMsg += "O campo Grupo é obrigatorio.\n";
	        } 
	        if(form.getValue('fTipo') == "" || form.getValue('fTipo') == null){
	            errorMsg += "O campo Tipo é obrigatorio.\n";
	        } 
	        if(form.getValue('fUnidade') == "" || form.getValue('fUnidade') == null){
	            errorMsg += "O campo Unidade é obrigatorio.\n";
	        } 
	        if(form.getValue('fLocal') == "" || form.getValue('fLocal') == null){
	            errorMsg += "O campo Armazem Padrão é obrigatorio.\n";
	        }
	        /*if(form.getValue('fProdANP') == null || form.getValue('fProdANP') == ""){
	            errorMsg += "O campo Cod Prod ANP é obrigatorio.\n";
	        }
	        if(form.getValue('fSeqANP') == null  || form.getValue('fSeqANP') == ""){
	            errorMsg += "O campo Cod Seq ANP é obrigatorio.\n";
	        }
	        if(form.getValue('fSegUnidade') == ""){
	            errorMsg += "O campo Seg.Unidade Medida é obrigatorio.\n";
	        }
			if(form.getValue('fFatConv') == "" || form.getValue('fSeqANP') == null){
	            errorMsg += "O campo Fator Conversão é obrigatorio.\n";
	        }
			if(form.getValue('fComprador') == "" || form.getValue('fComprador') == null){
	            errorMsg += "O campo Comprador é obrigatorio.\n";
	        }*/

			//campos do segundo processo - Suprimentos

			/*if(form.getValue('fAliqICMS') == "" || form.getValue('fAliqICMS') == null){
	            errorMsg += "O campo Aliq.ICMS é obrigatorio.\n";
	        } */
	        if(form.getValue('fAliqIPI') == "" || form.getValue('fAliqIPI') == null){
	            errorMsg += "O campo Aliq.IPI é obrigatorio.\n";
	        } 
	        if(form.getValue('fposIPINCM') == "" || form.getValue('fposIPINCM') == null){
	            errorMsg += "O campo Pos.IPI/NCM é obrigatorio.\n";
	        } 
	        if(form.getValue('fOrigem') == "" || form.getValue('fOrigem') == null){
	            errorMsg += "O campo Origem é obrigatorio.\n";
	        } 

			//campos do terceiro processo - Contabilidade
			
			/*if(form.getValue('fConta') == "" || form.getValue('fConta') == null){
	            errorMsg += "O campo Cta.Estoque é obrigatorio.\n";
	        } */
	        if(form.getValue('fXConta') == "" || form.getValue('fXConta') == null){
	            errorMsg += "O campo Cta.Despesa é obrigatorio.\n";
	        } 
	        if(form.getValue('fYConta') == "" || form.getValue('fYConta') == null){
	            errorMsg += "O campo Cta.Custo é obrigatorio.\n";
	        } 
	        /*if(form.getValue('fVConta') == "" || form.getValue('fVConta') == null){
	            errorMsg += "O campo Cta.Gerencia é obrigatorio.\n";
	        } */
		}
		
		if(errorMsg != ''){
			throw '\n'+ errorMsg
		}
	}
}