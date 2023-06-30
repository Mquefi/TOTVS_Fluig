var controle = [];
var empresa = "";
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
	onView: function (params) { //Visualização do formulário sem a possibilidade de edição (consulta)


	},
	onEdit: function (params) {  //Edição do formulário 
		var WKNumState = params.WKNumState;
		var cod_usuario = params.WKNumState;



		$("#dataEmissao").val(getFormatedDate());
	}
};

function getFormatedDate() {
	var fullDate = new Date();
	var hours = fullDate.getHours();
	var minutes = fullDate.getMinutes();

	if (minutes <= 9)
		minutes = "0" + minutes;

	var timeValue = hours + ":" + minutes;
	var date = fullDate.getDate().toString();

	if (date.length == 1)
		date = 0 + date;

	var mes = (fullDate.getMonth() + 1).toString();

	if (mes.length == 1)
		mes = 0 + mes;

	return date + "/" + mes + "/" + fullDate.getFullYear();
}










