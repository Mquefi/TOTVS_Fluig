$(document).ready(function () {
  var form_mod = $("#hid_form_mod").val();
  var atividade = $("#num_ativ").val(); //AQUI PEGO O VALOR LA QUE O DISPLAY COLOCOU NESSE CAMPO...
  var hid_hash = $("#hid_hash").val();
  var hid_idSolicitante = $("#hid_idSolicitante").val();
  //var hid_data_atual      = $("#hid_dtAtual").val();
  if (hid_hash == null || hid_hash == "") {
    $("#hid_hash").val(SOLVS.hash(hid_idSolicitante));
  }
  console.log("ATIVIDADE: ", atividade);
  FLUIGC.switcher.init("#S1_ckb_aprova");
  FLUIGC.switcher.init("#S2_ckb_aprova");
  FLUIGC.switcher.init("#S3_ckb_aprova");
  FLUIGC.switcher.init("#S4_ckb_aprova");
  FLUIGC.switcher.init("#S5_ckb_aprova ");
  FLUIGC.switcher.onChange("#S1_ckb_aprova", function (event, state) {
    console.log(state); // true | false
    if (state) {
      $("#hid_aprov_1").val("V");
    } else {
      $("#hid_aprov_1").val("F");
    }
  });
  FLUIGC.switcher.onChange("#S2_ckb_aprova", function (event, state) {
    console.log(state); // true | false
    if (state) {
      $("#hid_aprov_2").val("V");
    } else {
      $("#hid_aprov_2").val("F");
    }
  });
  FLUIGC.switcher.onChange("#S3_ckb_aprova", function (event, state) {
    console.log(state); // true | false
    if (state) {
      $("#hid_aprov_3").val("V");
    } else {
      $("#hid_aprov_3").val("F");
    }
  });
  FLUIGC.switcher.onChange("#S4_ckb_aprova", function (event, state) {
    console.log(state); // true | false
    if (state) {
      $("#hid_aprov_4").val("V");
    } else {
      $("#hid_aprov_4").val("F");
    }
  });
  FLUIGC.switcher.onChange("#S5_ckb_aprova", function (event, state) {
    console.log(state); // true | false
    if (state) {
      $("#hid_aprov_5").val("V");
    } else {
      $("#hid_aprov_5").val("F");
    }
  });
  if (form_mod == "VIEW") {
    console.log("ENTROU AQUI FINAL");
    FLUIGC.switcher.enable("#S1_ckb_aprova");
    FLUIGC.switcher.enable("#S2_ckb_aprova");
    FLUIGC.switcher.enable("#S3_ckb_aprova");
    FLUIGC.switcher.enable("#S4_ckb_aprova");
    FLUIGC.switcher.enable("#S5_ckb_aprova");
    preenche_dados();
    var obj_folder = carregaArray();
    listDocumentByFolder(obj_folder);
    bloqueia_campos("S0");
    bloqueia_campos("S1");
    bloqueia_campos("S2");
    bloqueia_campos("S3");
    bloqueia_campos("S4");
    if ($("#hid_aprov_1").val() == "V") {
      FLUIGC.switcher.setTrue("#S1_ckb_aprova");
    } else {
      FLUIGC.switcher.setFalse("#S1_ckb_aprova");
    }
    FLUIGC.switcher.disable("#S1_ckb_aprova");
    if ($("#hid_aprov_2").val() == "V") {
      FLUIGC.switcher.setTrue("#S2_ckb_aprova");
    } else {
      FLUIGC.switcher.setFalse("#S2_ckb_aprova");
    }
    FLUIGC.switcher.disable("#S2_ckb_aprova");
    if ($("#hid_aprov_3").val() == "V") {
      FLUIGC.switcher.setTrue("#S3_ckb_aprova");
    } else {
      FLUIGC.switcher.setFalse("#S3_ckb_aprova");
    }
    FLUIGC.switcher.disable("#S3_ckb_aprova");
    if ($("#hid_aprov_4").val() == "V") {
      FLUIGC.switcher.setTrue("#S4_ckb_aprova");
    } else {
      FLUIGC.switcher.setFalse("#S4_ckb_aprova");
    }
    FLUIGC.switcher.disable("#S4_ckb_aprova");
    if ($("#hid_aprov_5").val() == "V") {
      FLUIGC.switcher.setTrue("#S5_ckb_aprova");
    } else {
      FLUIGC.switcher.setFalse("#S5_ckb_aprova");
    }
    FLUIGC.switcher.disable("#S5_ckb_aprova");
    $(".aba0").click();
  } else {
    if (atividade == 0) {
      $("#hid_etapa").val("Abertura");
      var obj_folder = carregaArray();
      listDocumentByFolder(obj_folder);
      $(".aba0").click();
      $("#nav1").addClass("hide");
      $("#nav2").addClass("hide");
      $("#nav3").addClass("hide");
      $("#nav4").addClass("hide");
      $("#nav5").addClass("hide");
    } else if (atividade == 10) {
      // preenche_dados();
      //preenche_check();
      bloqueia_campos("S0");
      var obj_folder = carregaArray();
      listDocumentByFolder(obj_folder);
      $(".aba1").click();
      $("#nav2").addClass("hide");
      $("#nav3").addClass("hide");
      $("#nav4").addClass("hide");
      $("#nav5").addClass("hide");
    } else if (atividade == 11) {
      //preenche_dados();
      bloqueia_campos("S0");
      bloqueia_campos("S1");
      var obj_folder = carregaArray();
      listDocumentByFolder(obj_folder);
      if ($("#hid_aprov_1").val() == "V") {
        FLUIGC.switcher.setTrue("#S1_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S1_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S1_ckb_aprova");

      $(".aba2").click();
      $("#nav3").addClass("hide");
      $("#nav4").addClass("hide");
      $("#nav5").addClass("hide");
    } else if (atividade == 12) {
      //preenche_dados();
      var obj_folder = carregaArray();
      listDocumentByFolder(obj_folder);
      bloqueia_campos("S0");
      bloqueia_campos("S1");
      bloqueia_campos("S2");
      if ($("#hid_aprov_1").val() == "V") {
        FLUIGC.switcher.setTrue("#S1_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S1_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S1_ckb_aprova");
      if ($("#hid_aprov_2").val() == "V") {
        FLUIGC.switcher.setTrue("#S2_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S2_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S2_ckb_aprova");
      $(".aba3").click();
      $("#nav4").addClass("hide");
      $("#nav5").addClass("hide");
    } else if (atividade == 13) {
      //preenche_dados();
      var obj_folder = carregaArray();
      listDocumentByFolder(obj_folder);
      bloqueia_campos("S0");
      bloqueia_campos("S1");
      bloqueia_campos("S2");
      bloqueia_campos("S3");

      if ($("#hid_aprov_1").val() == "V") {
        FLUIGC.switcher.setTrue("#S1_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S1_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S1_ckb_aprova");
      if ($("#hid_aprov_2").val() == "V") {
        FLUIGC.switcher.setTrue("#S2_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S2_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S2_ckb_aprova");
      if ($("#hid_aprov_3").val() == "V") {
        FLUIGC.switcher.setTrue("#S3_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S3_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S3_ckb_aprova");
      $(".aba4").click();
      $("#nav5").addClass("hide");
    } else if (atividade == 14) {
      console.log("ENTOU_RH_REVISAO");
      console.log("APROVA_1: ", $("#hid_aprov_1").val());
      console.log("APROVA_2: ", $("#hid_aprov_2").val());
      console.log("APROVA_3: ", $("#hid_aprov_3").val());
      console.log("APROVA_4: ", $("#hid_aprov_4").val());

      //preenche_dados();
      var obj_folder = carregaArray();
      listDocumentByFolder(obj_folder);
      bloqueia_campos("S0");
      bloqueia_campos("S1");
      bloqueia_campos("S2");
      bloqueia_campos("S3");
      if ($("#hid_aprov_1").val() == "V") {
        FLUIGC.switcher.setTrue("#S1_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S1_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S1_ckb_aprova");
      if ($("#hid_aprov_2").val() == "V") {
        FLUIGC.switcher.setTrue("#S2_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S2_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S2_ckb_aprova");
      if ($("#hid_aprov_3").val() == "V") {
        FLUIGC.switcher.setTrue("#S3_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S3_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S3_ckb_aprova");
      if ($("#hid_aprov_4").val() == "V") {
        FLUIGC.switcher.setTrue("#S4_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S4_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S4_ckb_aprova");
      $("#nav5").addClass("hide");
    } else if (atividade == 81) {
      console.log("ENTROU AQUI NOVO");
      //preenche_dados();
      var obj_folder = carregaArray();
      listDocumentByFolder(obj_folder);
      bloqueia_campos("S0");
      bloqueia_campos("S1");
      bloqueia_campos("S2");
      bloqueia_campos("S3");
      bloqueia_campos("S4");
      if ($("#hid_aprov_1").val() == "V") {
        FLUIGC.switcher.setTrue("#S1_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S1_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S1_ckb_aprova");
      if ($("#hid_aprov_2").val() == "V") {
        FLUIGC.switcher.setTrue("#S2_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S2_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S2_ckb_aprova");
      if ($("#hid_aprov_3").val() == "V") {
        FLUIGC.switcher.setTrue("#S3_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S3_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S3_ckb_aprova");
      if ($("#hid_aprov_4").val() == "V") {
        FLUIGC.switcher.setTrue("#S4_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S4_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S4_ckb_aprova");
      $(".aba5").click();
    } else if (atividade == 16) {
      console.log("ENTROU AQUI FINAL");
      FLUIGC.switcher.enable("#S1_ckb_aprova");
      FLUIGC.switcher.enable("#S2_ckb_aprova");
      FLUIGC.switcher.enable("#S3_ckb_aprova");
      FLUIGC.switcher.enable("#S4_ckb_aprova");
      FLUIGC.switcher.enable("#S5_ckb_aprova");
      preenche_dados();
      var obj_folder = carregaArray();
      listDocumentByFolder(obj_folder);
      bloqueia_campos("S0");
      bloqueia_campos("S1");
      bloqueia_campos("S2");
      bloqueia_campos("S3");
      bloqueia_campos("S4");
      if ($("#hid_aprov_1").val() == "V") {
        FLUIGC.switcher.setTrue("#S1_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S1_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S1_ckb_aprova");
      if ($("#hid_aprov_2").val() == "V") {
        FLUIGC.switcher.setTrue("#S2_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S2_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S2_ckb_aprova");
      if ($("#hid_aprov_3").val() == "V") {
        FLUIGC.switcher.setTrue("#S3_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S3_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S3_ckb_aprova");
      if ($("#hid_aprov_4").val() == "V") {
        FLUIGC.switcher.setTrue("#S4_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S4_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S4_ckb_aprova");
      if ($("#hid_aprov_5").val() == "V") {
        FLUIGC.switcher.setTrue("#S5_ckb_aprova");
      } else {
        FLUIGC.switcher.setFalse("#S5_ckb_aprova");
      }
      FLUIGC.switcher.disable("#S5_ckb_aprova");
      $(".aba5").click();
    }
  }

  $("input#cand_pes").change(function (e) {
    e.preventDefault();
    if ($("input#cand_pes").is(":checked")) {
      $("input#cand_pes").val("checked");
      $("#info_cand_1").fadeIn(600);
      $("html, body").animate({ scrollTop: 1000 }, 50);
    } else {
      $("input#cand_pes").val("");
      $("#info_cand_1").fadeOut(600);
    }
  });
});

$(".required")
  .find("input, textarea, select")
  .on("change", function () {
    if ($(this).val() != "") {
      $(this).parent(".form-group").removeClass("has-error").addClass("has-success");
    } else {
      $(this).parent(".form-group").addClass("has-error").removeClass("has-success");
    }
  });

function bloqueia_campos(classe) {
  $("." + classe).each(function (i, val) {
    $(val).attr("readonly", true);
  });

  //$("#sec_fun").attr('disabled', true);
  //$("#func_fun").attr('disabled', true);
  $("#cand_pes").attr("disabled", true);
  //$("#info_cand_2").attr('disabled', true);
  //$("#info_cand_3").attr('disabled', true);
  //$("#tp_contrat").attr('disabled', true);
}
function preenche_funcao(val) {
  $("#hid_funcao").val(val);
}
function preenche_pre(val) {
  $("#hid_func_pre").val(val);
}
function preenche_dados() {
  console.log("ENTROU NO PREENCHE");
  console.log("FUNCAO: ", $("#hid_funcao").val());
  console.log("SECCAO: ", $("#hid_secao").val());
  $("#func_fun").text($("#hid_funcao").val());
  $("#sec_fun").text($("#hid_secao").val());
  $("#func_pre").text($("#hid_func_pre").val());
  console.log("CHECKBOX");
  console.log("CHECK_1: ", $("#hid_check_subs").val());
  console.log("CHECK_2: ", $("#hid_check_candidato").val());
  console.log("CHECK_3: ", $("#hid_check_func").val());
  if ($("#hid_check_subs").val() == "sim") {
    $("input[name=tp_contrat][value='on']").prop("checked", true);
  } else if ($("#hid_check_subs").val() == "nao") {
    $("input[name=tp_contrat][value='off']").prop("checked", true);
  }

  if ($("#hid_check_candidato").val() == "sim") {
    $("input[name=info_cand_2][value='on']").prop("checked", true);
  } else if ($("#hid_check_candidato").val() == "nao") {
    $("input[name=info_cand_2][value='off']").prop("checked", true);
  }

  if ($("#hid_check_func").val() == "sim") {
    $("input[name=info_cand_3][value='on']").prop("checked", true);
  } else if ($("#hid_check_func").val() == "nao") {
    $("input[name=info_cand_3][value='off']").prop("checked", true);
  }
}
function preenche_check() {
  console.log("CHECKBOX");
  console.log("CHECK_1: ", $("#hid_check_subs").val());
  console.log("CHECK_2: ", $("#hid_check_candidato").val());
  console.log("CHECK_3: ", $("#hid_check_func").val());
  if ($("#hid_check_subs").val() == "sim") {
    console.log("tes: ", $("input[name=tp_contrat][value='on']"));
    $("input[name=tp_contrat][value='on']").prop("checked", true);
  } else if ($("#hid_check_subs").val() == "nao") {
    $("input[name=tp_contrat][value='off']").prop("checked", true);
  }

  if ($("#hid_check_candidato").val() == "sim") {
    $("input[name=info_cand_2][value='on']").prop("checked", true);
  } else if ($("#hid_check_candidato").val() == "nao") {
    $("input[name=info_cand_2][value='off']").prop("checked", true);
  }

  if ($("#hid_check_func").val() == "sim") {
    $("input[name=info_cand_3][value='on']").prop("checked", true);
  } else if ($("#hid_check_func").val() == "nao") {
    $("input[name=info_cand_3][value='off']").prop("checked", true);
  }
}
function user_preen_campo(id_campo) {
  //PREENCHE CAMPO DE USUÁRIO QUE DIGITOU
  var user_logado = $("#nm_user").val();
  $("#" + id_campo + "_user").val(user_logado);
}
