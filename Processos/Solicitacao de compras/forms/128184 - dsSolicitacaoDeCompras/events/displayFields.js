function displayFields(form, customHTML) {
    form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
    FTDForms(form, customHTML);


}

function FTDForms(form, customHTML) {
    var version = "1.0.0";

    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var constraints = new Array(c1);
	var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);

    var solicitante = colaborador.getValue(0, "colleagueName");

    customHTML.append("<script type='text/javascript'>");
    customHTML.append("if (FTDForms && FTDForms.initForm) {");
    customHTML.append("FTDForms.initForm({");
    customHTML.append(" formMode:'" + form.getFormMode() + "',");
    customHTML.append(" WKCompany:'" + getValue("WKCompany") + "',");
    customHTML.append(" WKNumState:'" + getValue("WKNumState") + "',");
    customHTML.append(" WKNumProces:'" + getValue("WKNumProces") + "',");
    customHTML.append(" WKCurrentState:'" + getValue("WKCurrentState") + "',");
    customHTML.append(" WKUser:'" + solicitante + "',");
    customHTML.append(" isMobile: " + (form.getMobile() != null && form.getMobile()) + ",");
    customHTML.append("});");
    customHTML.append("}</script>");
}