/*

function validateForm(form) {
  var atividade = getValue("WKNumState");

  var erro = "";

  if (atividade == 0 || atividade == 4) {
    var nomeCompleto = form.getValue("nomeCompleto");
    if (eVazio(nomeCompleto)) {
      erro += "O campo Nome Completo não pode estar vazio\n";
    }
    
    var funcao = form.getValue("funcao");
    if (eVazio(funcao)) {
      erro += "O campo Função não pode estar vazio\n";
    }

    var gestorImediato = form.getValue("gestorImediato");
    if (eVazio(gestorImediato)) {
      erro += "O campo Gestor Imediato não pode estar vazio\n";
    }

    var departamentoRegional  = form.getValue("departamentoRegional");
    if (eVazio(departamentoRegional)) {
      erro += "O campo Departamento Regional não pode estar vazio\n";
    }

    var previsaoInicial  = form.getValue("previsaoInicial");
    if (eVazio(previsaoInicial)) {
      erro += "O campo Previsão inciala não pode estar vazio\n";
    } 

    var telefoneParaContato  = form.getValue("telefoneParaContato");
    if (eVazio(telefoneParaContato)) {
      erro += "O campo Telefone para contato não pode estar vazio\n";
    }

    var tipoComputador  = form.getValue("tipoComputador");
    if (eVazio(tipoComputador)) {
      erro += "O campo Tipo do computador não pode estar vazio\n";
    }

    var proprietario  = form.getValue("proprietario");
    if (eVazio(proprietario)) {
      erro += "O campo Proprietario não pode estar vazio\n";
    }

    var marca  = form.getValue("marca");
    if (eVazio(marca)) {
      erro += "O campo Marca não pode estar vazio\n";
    }

    var modelo  = form.getValue("modelo");
    if (eVazio(modelo)) {
      erro += "O campo Modelo não pode estar vazio\n";
    }

    var numeroDeSerie  = form.getValue("numeroDeSerie");
    if (eVazio(numeroDeSerie)) {
      erro += "O campo Numero de serie não pode estar vazio\n";
    }

    var dominioEmail  = form.getValue("dominioEmail");
    if (eVazio(dominioEmail)) {
      erro += "O campo Dominio Email não pode estar vazio\n";
    }

    var grupoEmail  = form.getValue("grupoEmail");
    if (eVazio(grupoEmail)) {
      erro += "O campo Grupo Email não pode estar vazio\n";
    }

    var perfilAcesso  = form.getValue("perfilAcesso");
    if (eVazio(perfilAcesso)) {
      erro += "O campo Perfil Acesso não pode estar vazio\n";
    }

    var obraAcesso  = form.getValue("obraAcesso");
    if (eVazio(obraAcesso)) {
      erro += "O campo Obra Acesso não pode estar vazio\n";
    }

    var outrosSistema  = form.getValue("outrosSistema");
    if (eVazio(outrosSistema)) {
      erro += "O campo Outros Sistema não pode estar vazio\n";
    }

    var obsOutrSist  = form.getValue("obsOutrSist");
    if (eVazio(obsOutrSist)) {
      erro += "O campo Observaçoes outro Sistema não pode estar vazio\n";
    }
  }

  if (erro != "") {
    throw erro + "\n\n";
  }
}

function eVazio(value) {
  return value == null || value == undefined || value.trim() == "";
}
*/
