function enableFields(form) {
  // form.setEnabled('nomeCompleto', false)
  var atividade = getValue("WKNumState");
  //Aprovação RH - Desemvolvimento
  if (atividade == 12|| atividade == 16) {
    form.setEnabled("nomeCompleto", false);
    form.setEnabled("funcao", false);
    form.setEnabled("gestorImediato", false);
    form.setEnabled("departamentoRegional", false);
    form.setEnabled("previsaoInicial", false);
    form.setEnabled("telefoneParaContato", false);
    form.setEnabled("obsDadoBase", false);
    form.setEnabled("tipoComputador", false);
    form.setEnabled("proprietario", false);
    form.setEnabled("marca", false);
    form.setEnabled("Modelo", false);
    form.setEnabled("numeroDeSerie", false);
    form.setEnabled("obsComputador", false);
    form.setEnabled("dominioEmail", false);
    form.setEnabled("grupoEmail", false);
    form.setEnabled("oneDriveConsoRegi", false);
    form.setEnabled("OneDriveSede", false);
    form.setEnabled("pastaRedeMap", false);
    form.setEnabled("obsServicoRede", false);
    form.setEnabled("perfilAcesso", false);
    form.setEnabled("obraAcesso", false);
    form.setEnabled("obsObraAcesso", false);
    form.setEnabled("acessoProtheus", false);
    form.setEnabled("empresaProtheus", false);
    form.setEnabled("papelTrabalho", false);
    form.setEnabled("obsPrhotheus", false);
    form.setEnabled("modulos", false);
    form.setEnabled("acessoRm", false);
    form.setEnabled("coligadas", false);
    form.setEnabled("obsRm", false);
    form.setEnabled("outrosSistema", false);
    form.setEnabled("obsOutrSist", false);
  }
}




/* function mostrarOcultarCamposRm() {
	var utilizaRm = document.getElementById("utilizaRm");
	var moduloRM = document.getElementById("moduloRM");			    
	var coligaRM = document.getElementById("coligaRM");	
	var regional = document.getElementById("regional");	
	if (utilizaRm.value === "01") {
		moduloRM.style.display = "none";coligaRM.style.display = "none";regional.style.display = "none";
	} else {
		moduloRM.style.display = "";coligaRM.style.display = "";regional.style.display = "";
		}
	}

function toggleCampos(value) {
	var camposMaquina = document.getElementById("camposMaquina");
	var observacoes = document.getElementById("observacoes");
	var mensagemSysaid = document.getElementById("mensagemSysaid");

	if (value === "sim") {
		 camposMaquina.style.display = "block";
		 observacoes.style.display = "block";
		 mensagemSysaid.style.display = "none";
	} else if (value === "nao") {
		 camposMaquina.style.display = "none";
		 observacoes.style.display = "none";
		 mensagemSysaid.style.display = "block";
	} else {
		 camposMaquina.style.display = "none";
		 observacoes.style.display = "none";
		 mensagemSysaid.style.display = "none";
		}
	}
function mostrarOcultarPerfilAcesso() {
	var utilizaSisma = document.getElementById("utilizaSisma");
	var PerfilAcesso = document.getElementById("perfilAcesso");
	var obraAcessoDiv = document.getElementById("obraAcessoDiv");
			
	if (utilizaSisma.value === "01") {
			PerfilAcesso.style.display = "none";obraAcessoDiv.style.display = "none";
	} else {
			PerfilAcesso.style.display = "";obraAcessoDiv.style.display = "";
		}
	}

function mostrarOcultarCamposProtheus() {
	var utilizaProtheus = document.getElementById("utilizaProtheus");
	var acessoProtheus = document.getElementById("acessoProtheus");
	var empresPrtheus = document.getElementById("empresPrtheus");				    
	var papelTrabalho = document.getElementById("papelTrabalho");				
	if (utilizaProtheus.value === "01") {
		acessoProtheus.style.display = "none";empresPrtheus.style.display = "none";papelTrabalho.style.display = "none";
	} else {
		acessoProtheus.style.display = "";empresPrtheus.style.display = "";papelTrabalho.style.display = "";
		}
	}

function mostrarOcultarPerfilFluig() {
	var utilizaFluig = document.getElementById("utilizaFluig");
	var PerfilFluig = document.getElementById("perfilFluig");

			
	if (utilizaFluig.value === "01") {
		PerfilFluig.style.display = "none";
	} else {
		PerfilFluig.style.display = "";
		}
	}

function mostrarOcultarPerfilArquivar() {
	var utilizaArq = document.getElementById("utilizaArq");
	var perfilArq = document.getElementById("perfilArq");

			
	if (utilizaArq.value === "01") {
		perfilArq.style.display = "none";
	} else {
		perfilArq.style.display = "";
		}
	}

	function onLoadFunction() {
		mostrarOcultarCamposRm();
		mostrarOcultarCamposProtheus();
		mostrarOcultarPerfilAcesso();
		toggleCampos(value);
		mostrarOcultarPerfilFluig();
		mostrarOcultarPerfilArquivar();
	}

*/
