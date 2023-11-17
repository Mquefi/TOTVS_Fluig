function enableFields(form){ 
	
	   var numActivity = getValue("WKNumState");


	    if(numActivity == 11 || numActivity == 14 || numActivity == 17  ){
	        form.setEnabled("A2_EST",false);
	        form.setEnabled("A2_COD_MUN",false);
	        form.setEnabled("A2_PAIS",false);
	        form.setEnabled("A2_BANCO",false);
			form.setEnabled("tenant",false);
	        
	    }
	    
	    if(numActivity == 4 || numActivity == 14 || numActivity == 17){
	    	 //form.setEnabled("A2_CONTA",false);
	    	// form.setEnabled("A2_CODPAIS_DESCRICAO",false);
	    }
}