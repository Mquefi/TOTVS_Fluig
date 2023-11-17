function servicetask4(attempt, message) {
	var formItems = hAPI.getChildrenIndexes("itens");
	var items = [];
	for (var i = 0; i < formItems.length; i++) {
	    items[i] = {
	    	"D1_COD": getCardValue("produto___" + formItems[i]),
		    "D1_QUANT": getCardValue("qtdade___" + formItems[i]),
		    "D1_VUNIT": getCardValue("valor_unitario___" + formItems[i]),
		    "D1_TOTAL": getCardValue("valor_total___" + formItems[i]),
		    "D1_CC": getCardValue("centro_custo___" + formItems[i]),
		    "D1_PEDIDO": getCardValue("pedido___" + formItems[i]),
		    "D1_ITEMPC": getCardValue("item_pedido___" + formItems[i])
	    };
	}
	
	var tenantData = getTenantData();
	var tenantId = tenantData.getValue(0, "TENANT_ID");
	
	var params = {
			"EMPRESA": tenantId + '',
			"FILIAL": getBranch(tenantData) + '',
			"email": fluigAPI.getUserService().getCurrent().getEmail() + '',
			"F1_TIPO": getCardValue("tipo_nota"),
			"F1_FORMUL": getCardValue("form_proprio"),
			"F1_DoC": getCardValue("numero"),
			"F1_SERIE": getCardValue("serie"),
			"F1_EMISSAO": toDate(getCardValue("data_emissao")),
			"F1_FORNECE": getCardValue("hidden_fornecedor"),
			"F1_LOJA": getStoreId() + '',
			"F1_ESPECIE": getCardValue("hidden_especie"),
			"ITENS": items
	};
	
	var clientService = fluigAPI.getAuthorizeClientService();
	var data = {
		companyId : getValue("WKCompany") + '',
		serviceCode : SERVICE_REST.CODE,
		endpoint : SERVICE_REST.ENDPOINT,
		method : 'post',// 'delete', 'patch', 'put', 'get'     
		timeoutService: '1000', // segundos
		params : params,
		options : {
			encoding : 'UTF-8',
			mediaType: 'application/json'
		},
		headers: {
			"Content-Type": 'application/json;charset=UTF-8'
		}
	};

	var vo = clientService.invoke(JSON.stringify(data));
	if (vo.getHttpStatusResult() >= 200 && vo.getHttpStatusResult() < 300) {
		try {
			var result = JSON.parse(vo.getResult());
			console.dir(result);
			
			var returnType = result[0][0];
			if (returnType.equals("OK")) {
				return true;
			}
		} catch (e) {
			console.dir(vo.getResult());
			console.log(e);
			throw "Ocorreu um erro no processamento do retorno do serviço";
		}
		throw result[0][1];
		
	} else if(vo.getResult()== null || vo.getResult().isEmpty()){
		throw "Ocorreu um erro desconhecido";
	} else {
		throw "Ocorreu um erro: " + vo.getResult();
	}
}

function getTenantData() {
    var c1 = DatasetFactory.createConstraint("GENERAL_ID", hAPI.getCardValue("hidden_tenant"), hAPI.getCardValue("hidden_tenant"), ConstraintType.MUST);
    var constraints   = new Array(c1);
     
    return DatasetFactory.getDataset(DATASETS.TENANT_BRANCH, null, constraints, null);
}

function getBranch(tenantData) {
	return tenantData.getValue(0, "TENANT_ID") + "01" + tenantData.getValue(0, "BRANCH");
}

function getSupplierData() {
    var c1 = DatasetFactory.createConstraint("SUPPLIER_ID", hAPI.getCardValue("hidden_fornecedor"), hAPI.getCardValue("hidden_fornecedor"), ConstraintType.MUST);
    var constraints   = new Array(c1);
     
    return DatasetFactory.getDataset(DATASETS.SUPPLIER, null, constraints, null);
}

function getStoreId() {
	var supplierData = getSupplierData();
	return supplierData.getValue(0, "STORE_ID");
}

function getCardValue(field) {
	return hAPI.getCardValue(field) + '';
}

function toDate(value) {
	var split = value.split("/");
	if (split.length != 3) {
		throw "Data inválida (" + value + ")";
	}
	return split[2] + split[1] + split[0];
}
