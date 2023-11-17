function validateForm(form){
	
	   var numActivity = getValue("WKNumState");


		   if(numActivity == 0 || numActivity == 4){
		        if(form.getValue('A2_NOME') == ""){
		            throw "O campo Razao Social é obrigatorio";
		        } 
	        if(form.getValue('A2_NREDUZ') == ""){
	            throw "O campo Nome Fantasia é obrigatorio";
	        } 
	        if(form.getValue('A2_CEP') == ""){
	            throw "O campo CEP é obrigatorio";
	        } 
	        if(form.getValue('A2_END') == ""){
	            throw "O campo Endereço é obrigatorio";
	        } 
	        if(form.getValue('A2_BAIRRO') == ""){
	            throw "O campo Bairro é obrigatorio";
	        }
	        if(form.getValue('A2_EST') == null){
	            throw "O campo Estado é obrigatorio";
	        }
	        if(form.getValue('A2_COD_MUN') == null || form.getValue('A2_COD_MUN') == ""){
	            throw "O campo Municipio é obrigatorio";
	        }
	        if(form.getValue('A2_TIPO') == "J" && form.getValue('A2_CNAE') == ""){
	            throw "O campo Cod. CNAE é obrigatorio";
	        }	        
	        if(form.getValue('A2_CGC') == ""){
	            throw "O campo CNPJ/CPF é obrigatorio";
	        }
			if(form.getValue('A2_CGC') == ""){
	            throw "O campo CNPJ/CPF é obrigatorio";
	        }			
			if(form.getValue('A2_PAIS') == null || form.getValue('A2_PAIS') == ""){
	            throw "O campo Descr.Pais é obrigatorio";
	        }			
			if(form.getValue('A2_CONTA') == null || form.getValue('A2_CONTA') == ""){
	            throw "O campo Conta Contabil é obrigatorio";
	        }			
			if(form.getValue('A2_CODPAIS_DESCRICAO') == null || form.getValue('A2_CODPAIS_DESCRICAO') == ""){
	            throw "O campo Descr.Pais Bacen é obrigatorio";
	        }
	    }

		if(numActivity == 14 ){
			if(form.getValue('A2_CODPAIS_DESCRICAO') == null){
	            throw "O campo Descr.Pais é obrigatorio";
	        }
			if(form.getValue('A2_CODPAIS') == ""){
	            throw "O campo Descr.Pais Bacen é obrigatorio";
	        }
		}



		
}