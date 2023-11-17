function servicetask31(attempt, message) {
  var num_rec = hAPI.getCardValue("num_rec");
  if (num_rec != "") {
    return;
  }

  var clientService = fluigAPI.getAuthorizeClientService();

  var tenantId = hAPI.getCardValue("codEmpresa").replaceAll("\\.", ",") + "";

  var data = {
    companyId: getValue("WKCompany") + "",
    serviceCode: "cadastroPreNota",
    endpoint: "/WSPAGANT",
    method: "post",
    timeoutService: "1000",
    params: {
      VALOR: asFloat(hAPI.getCardValue("valorPago")) + "",
      VENCIMENTO: formatDate(parseDate(hAPI.getCardValue("dataNecessidade"), "dd/MM/yyyy"), "yyyyMMdd") + "",
      NUMTITULO: hAPI.getCardValue("pedido") + "",
      BANCO: hAPI.getCardValue("cod_banco_compasa") + "",
      AGENCIA: hAPI.getCardValue("agencia_compasa") + "",
      CONTA: hAPI.getCardValue("conta_compasa") + "",
      CCUSTO: hAPI.getCardValue("cCusto") + "",
      HIST: hAPI.getCardValue("justificativa") + ""
    },
    options: {
      encoding: "UTF-8",
      mediaType: "application/json"
    },
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer cG9ydGFsbmRpbnRlZ3JhZG9jb21vUHJvdGhldXNlRmx1aWc=",
      tenantId: tenantId
    }
  };

  var response = clientService.invoke(JSON.stringify(data));
  var result = response.getResult();

  if (result == null || result.isEmpty()) throw "Retorno vazio";

  log.info("Resultado Pagamento Antecipado" + result);
}

function removerFormatacaoNumero(numberString) {
  if (!numberString) return new java.lang.String("0");
  return numberString.replaceAll("\\.", "").replaceAll("\\,", ".");
}

function asInt(num) {
  var numString = new java.lang.String(num + "");
  var numWithoutFormating = removerFormatacaoNumero(numString);
  if (numWithoutFormating.isEmpty()) return 0;
  return java.lang.Long.parseLong(numWithoutFormating, 10);
}

function asFloat(num) {
  var numString = new java.lang.String(num + "");
  var floatValue = parseFloat(removerFormatacaoNumero(numString));
  if (isNaN(floatValue)) return 0;
  return floatValue;
}

function formatDate(data, format) {
  var dateFormat = new java.text.SimpleDateFormat(format || "dd/MM/yyyy");
  return dateFormat.format(data);
}

function parseDate(dateString, format) {
  var dateFormat = new java.text.SimpleDateFormat(format || "dd/MM/yyyy");
  return dateFormat.parse(dateString);
}
