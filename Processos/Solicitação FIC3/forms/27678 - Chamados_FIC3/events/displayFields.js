function displayFields(form,customHTML){
	FTDForms(form, customHTML);
	
	
	form.setShowDisabledFields(true);
	var form_mod = form.getFormMode();
	form.setValue('hid_form_mod',form_mod);
   	form.setHidePrintLink(true);
   	var atividade = getValue('WKNumState');
	form.setValue('hid_macroSelecionado',form.getFormMode());
	   var user = getValue('WKUser');
	   var processo = getValue('WKDef');
	var f = new Array(DatasetFactory.createConstraint('colleaguePK.colleagueId',user,user,ConstraintType.MUST));
	var c = DatasetFactory.getDataset('colleague',null,f,null);

   	var html = '<script>' +
	    ' var atividade = "' + atividade +'";' +
		' var idUser = "' + user +'";' +  
		' var idProcess = "'+ processo +'";' +
	    ' var user = "' + c.getValue(0,'colleagueName') +'";' +
	    '</script>';
	 
	 	customHTML.append(html);


	if(atividade == 0){
		var st = getDateNow('tds')+user;
		var hash = toB64(st);
			form.setValue('hid_hashProcesso',hash);

			form.setValue('hid_idSolicitante',user);
			form.setValue('S0_txt_nm_sol',c.getValue(0,'colleagueName'));
            form.setValue('S0_txt_dt_sol',getDateNow('dt'));
            form.setValue('S0_txt_hr_sol',getDateNow('hr'));
	}else if(atividade == 5){
		form.setValue('hid_idUserTi',user);
		form.setValue('S2_txt_nm_analista',c.getValue(0,'colleagueName'));
		form.setValue('S2_txt_set_sol',c.getValue(0,'mail'));
		form.setValue('S2_txt_dt_sol',getDateNow('dt'));
		form.setValue('S2_txt_hr_sol',getDateNow('hr'));
	}else if(atividade == 9){
		form.setValue('S3_txt_nm_sol',c.getValue(0,'colleagueName'));
		form.setValue('S3_txt_dt_sol',getDateNow('dt'));
		form.setValue('S3_txt_hr_sol',getDateNow('hr'));
	}
	
	if(atividade > 0){
		form.setValue('hid_numSolicitacao',getValue('WKNumProces'));
	}

	
}

function getDateNow(tp){
	var data = new Date();
	var a = data.getFullYear();
	var m = data.getMonth()+1;
	var d = data.getDate();

	var h = data.getHours();
	var mn = data.getMinutes();
	var s = data.getSeconds();

		if(m < 10){
			m = "0"+m;
		}

		if(d < 10){
			d = "0"+d;
		}

		if(h < 10){
			h = "0"+h;
		}

		if(mn < 10){
			mn = "0"+mn;
		}

		if(s < 10){
			s = "0"+s;
		}
        if(tp == "tds"){
            return String(d)+'/'+String(m)+'/'+String(a)+' '+String(h)+':'+String(mn)+':'+String(s);
        }else if(tp=="dt"){
            return String(d)+'/'+String(m)+'/'+String(a);
        }else if(tp=="hr"){
            return String(h)+':'+String(mn)+':'+String(s);
        }
		
}

function toB64(input){
	
	 var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	 var output = "";
	 var chr1, chr2, chr3;
	 var enc1, enc2, enc3, enc4;
	 var i = 0;

	 do {
	  chr1 = input.charCodeAt(i++);
	  chr2 = input.charCodeAt(i++);
	  chr3 = input.charCodeAt(i++);

	  enc1 = chr1 >> 2;
	  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	  enc4 = chr3 & 63;

	  if (isNaN(chr2)) {
	   enc3 = enc4 = 64;
	  } else if (isNaN(chr3)) {
	   enc4 = 64;
	  }

	  output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
	  keyStr.charAt(enc3) + keyStr.charAt(enc4);
	 } while (i < input.length);

	 return output;
}


function FTDForms(form,customHTML) { 
	var version = "1.0.0";	
	
	customHTML.append("<script type='text/javascript'>");
	customHTML.append("if (FTDForms && FTDForms.initForm) {");
	customHTML.append("FTDForms.initForm({");
	customHTML.append(" formMode:'" + form.getFormMode()+"',");
	customHTML.append(" WKCompany:'" + getValue("WKCompany")+"',");
	customHTML.append(" WKNumState:'" + getValue("WKNumState")+"',");
	customHTML.append(" WKNumProces:'" + getValue("WKNumProces")+"',");
	customHTML.append(" WKCurrentState:'" + getValue("WKCurrentState")+"',");
	customHTML.append(" WKUser:'" + getValue("WKUser")+"',");
	customHTML.append(" isMobile: " + (form.getMobile() != null && form.getMobile())+",");
	customHTML.append("});");
	customHTML.append("}</script>"); 		
}
