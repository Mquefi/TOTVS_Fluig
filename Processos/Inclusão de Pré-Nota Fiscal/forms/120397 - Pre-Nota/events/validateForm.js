function validateForm(form){
	  var numActivity = getValue('WKNumState');
	  var WKNextState = getValue('WKNextState')
	  
	  ;
	if(numActivity == 0 || numActivity == 1){
		
		  if (form.getValue('tenant') == null ||form.getValue('tenant') == "" ) {
		      throw '<strong>O campo Empresa/Filial é obrigatório</strong>';
		    }
		  
		  
		  if (form.getValue('tenant') == null || form.getValue('tenant') == "") {
		      throw '<strong>O campo Empresa/Filial é obrigatório</strong>';
		   }
		  
		  if (form.getValue('numero') == "") {
		      throw '<strong>O campo Número  é obrigatório</strong>';
		    }
		  if (form.getValue('serie') == "") {
		      throw '<strong>O campo Serie  é obrigatório</strong>';
		    }
		
		  if (form.getValue('especie') == null || form.getValue('especie') == "") {
		      throw '<strong>O campo Especie é obrigatório</strong>';
		   }
		  if (form.getValue('condicao') == null || form.getValue('condicao') == "") {
		      throw '<strong>O campo Cond.Pagto. é obrigatório</strong>';
		   }
		  
		  if (form.getValue('tipo_entrada') ==  "S" && form.getValue('fornecedor2') == "") {
		      throw '<strong>O campo Fornecedor/Loja é obrigatório</strong>';
		   }
		  if (form.getValue('tipo_entrada') ==  "C" && form.getValue('fornecedor') == "") {
		      throw '<strong>O campo  Fornecedor/Loja é obrigatório</strong>';
		   }
		  
		  
		  
		  if (form.getValue('tipo_entrada') ==  "C" ) {
			  var index = form.getChildrenIndexes("itens");
			  
			  if(index.length === 0){
				  throw '<strong>Informe pelo menos um item </strong>';
			  }
			  
			  
		   }else{
			   var index = form.getChildrenIndexes("itens2");
				  if(index.length === 0){
					  throw '<strong>Informe pelo menos um item </strong>';
				  }
		   }
		
		  
		
	}
	
	
	
	
	
	
}