function enableFields(form,customHTML){
	
    var processo = getValue("WKNumState");
    
        
    if(processo == "4") {
    	
      	form.setEnabled("cCusto",false);
    	form.setEnabled("descCentCusto",false);
    	form.setEnabled("regional",false);
    	form.setEnabled("tipoRnc",false);
    	form.setEnabled("rncAnterior",false);
    }
    if(processo == 2){
    	
      	form.setEnabled("razaSocial",false);
    	form.setEnabled("cnpj",false);
    	form.setEnabled("pedido",false);
    	form.setEnabled("justificativa",false);
    	form.setEnabled("dataNecessidade",false);     	
    	form.setEnabled("valor",false);
    	form.setEnabled("tipoPag",false);    	
    	form.setEnabled("banco",false);
    	form.setEnabled("agencia",false);
    	form.setEnabled("conta",false);
    	form.setEnabled("chavePix",false);
    	form.setEnabled("cCusto",false);
    	form.setEnabled("gCusto",false);
    	
    }
    if(processo == 3 || processo == 4){
    	
      	form.setEnabled("razaSocial",false);
    	form.setEnabled("cnpj",false);
    	form.setEnabled("pedido",false);
    	form.setEnabled("justificativa",false);
    	form.setEnabled("dataNecessidade",false);     	
    	form.setEnabled("valor",false);
    	form.setEnabled("tipoPag",false);    	
    	form.setEnabled("banco",false);
    	form.setEnabled("agencia",false);
    	form.setEnabled("conta",false);
    	form.setEnabled("chavePix",false);
    	form.setEnabled("cCusto",false);
    	form.setEnabled("gCusto",false);
      	form.setEnabled("dataPagamento",false);
    	form.setEnabled("valorPago",false);
    	form.setEnabled("cnpjNF",false);
    	form.setEnabled("numNf",false);
    	form.setEnabled("dataNf",false);
    }
}