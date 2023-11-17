var controle = [];
var FTDForms = {
  params: {},
  initForm: function (params) {
    this.params = params;
    var $this = this;
    $(function () {
      if (params.formMode == "ADD" || params.formMode == "MOD") {
        $this.onEdit(params);
      } else {
        $this.onView(params);
      }
    });
  },
  onView: function (params) {
    //Visualização do formulário sem a possibilidade de edição (consulta)
  },
  onEdit: function (params) {
    //Edição do formulário
    var WKNumState = params.WKNumState;
    var cod_usuario = params.WKNumState;
  },
};

function setSelectedZoomItem(selectedItem) {
  if (selectedItem["inputName"].match(/sec_fun/g)) {
    // busca_aprovs(selectedItem.S0_txt_cod);

    $("#hid_aprov_encarregado").val(selectedItem["hid_id_Enca"]);
    $("#hid_aprov_engenharia").val(selectedItem["hid_id_Enge"]);
    //$("#hid_aprov_RH").val(selectedItem['hid_id_RH']);
    $("#hid_aprov_cordEng").val(selectedItem["hid_id_Cord"]);

    if (selectedItem.S0_txt_cod == "01.03.01.01.001" || selectedItem.S0_txt_cod == "01.01.01.01.002") {
      $("#hid_aprov_Diretoria").val("4e5804a4705e11ebbd4d0a5864604505");
    } else {
      $("#hid_aprov_Diretoria").val("579637a2af5e45afb3fb68be771cc417");
    }
    //$("#hid_aprov_Diretoria").val(selectedItem['hid_id_Dire']);
    $("#hid_secao").val(selectedItem.S0_txt_cod);
    $("#aprov_aba1").val(selectedItem["S0_txt_enca"]);
  }
}

// function busca_aprovs(val){
// 	var c1 = DatasetFactory.createConstraint("hid_id_Secao", val, val, ConstraintType.MUST);
// 	var constraints   = new Array(c1);
// 	var Aprov_secao = DatasetFactory.getDataset('ds_aprov_admissao',null,constraints,null);

// 	$("#hid_aprov_encarregado").val(Aprov_secao.values[0]['hid_id_Enca']);
// 	$("#hid_aprov_engenharia").val(Aprov_secao.values[0]['hid_id_Enge']);
// 	//$("#hid_aprov_RH").val(Aprov_secao.values[0]['hid_id_RH']);
// 	$("#hid_aprov_cordEng").val(Aprov_secao.values[0]['hid_id_Cord']);

// 	if(val == '01.03.01.01.001' || val == '01.01.01.01.002'){
// 	  $("#hid_aprov_Diretoria").val('4e5804a4705e11ebbd4d0a5864604505');
// 	}else{
// 	  $("#hid_aprov_Diretoria").val('579637a2af5e45afb3fb68be771cc417');
// 	}
// 	//$("#hid_aprov_Diretoria").val(Aprov_secao.values[0]['hid_id_Dire']);
// 	$("#hid_secao").val(val);
// 	$("#aprov_aba1").val(Aprov_secao.values[0]['S0_txt_enca']);

//   }
