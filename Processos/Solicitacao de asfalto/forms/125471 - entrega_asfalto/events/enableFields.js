function enableFields(form){ 
	
	   var numActivity = getValue("WKNumState");


	    if(numActivity == 15 || numActivity == 38 || numActivity == 17 || numActivity == 26  ){
	        form.setEnabled("tenant",false);
	        form.setEnabled("A1_NREDUZ",false);
	        form.setEnabled("A2_EST",false);
	        form.setEnabled("A2_COD_MUN",false);
			form.setEnabled("C6_PRODUTO",false);
			
			form.setEnabled("C6_CC",false);
	        
	    }

		if(numActivity == 0 || numActivity == 5){
			form.setEnabled("A2_EST",true);
			form.setEnabled("A2_COD_MUN",true);
		}
	    
}