var controle = [];
var FTDForms = {
  params: {},
  initForm: function (params) {
    this.params = params;
    var $this = this;
    $(function () {
      if (params.formMode == 'ADD' || params.formMode == 'MOD') {
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
  



  }
};




function setSelectedZoomItem(selectedItem) {
  console.log(selectedItem);


  if (selectedItem['inputName'].match(/cCusto/g)) {
    //alert(selectedItem["Descrição"]);
    $("#descCentCusto").val(selectedItem["Descrição"]);
    $("#regional").val(selectedItem["Regional"]);
    
  }



}