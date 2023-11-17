function servicetask11(attempt, message) {
  var tableName = "SE2" + addRightPad(hAPI.getCardValue("cod_grupo_empresa") + "", "0", 3);

  getTableValues("titulos", [
    "E2_FILIAL",
    "E2_PREFIXO",
    "E2_NUM",
    "E2_PARCELA",
    "E2_TIPO",
    "E2_FORNECE",
    "E2_LOJA",
    "E2_NOMFOR",
    "E2_EMISSAO",
    "E2_VENCTO",
    "E2_VENCREA",
    "E2_VALOR",
    "E2_SALDO",
    "E2_CDFLUIG",
    "E2_NUMBOR",
    "E2_PGPARCI"
  ]).forEach(function (titulo) {
    // prettier-ignore
    var sqlUpdate = " UPDATE " + tableName + " SET E2_CDFLUIG = CONCAT(SUBSTRING(RTRIM(E2_CDFLUIG),1,27),'|','" + getValue("WKNumProces") + "'), " + 
    " E2_NUMBOR = '', E2_PGPARCI = " + asFloat(titulo.E2_PGPARCI) +
    " WHERE E2_FILIAL = '" + titulo.E2_FILIAL + "' " +
    " AND E2_PREFIXO = '" + titulo.E2_PREFIXO + "' " +
    " AND E2_NUM = '" + titulo.E2_NUM + "' " +
    " AND E2_PARCELA = '" + titulo.E2_PARCELA + "' "
    " AND E2_TIPO = '" + titulo.E2_TIPO + "' " + " AND E2_FORNECE = '" + titulo.E2_FORNECE + "' " + " AND E2_LOJA = '" + titulo.E2_LOJA + "' AND D_E_L_E_T_ <> '*' ";
    
    log.info('QUERY UPDATE ==> ' + sqlUpdate);
    
    DBUtils.execute("Protheus12", sqlUpdate);
  });
}
