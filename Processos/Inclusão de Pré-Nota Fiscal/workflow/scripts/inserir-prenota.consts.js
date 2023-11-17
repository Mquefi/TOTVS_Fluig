PROCESS = {
		START_STATE: 1	,
		SERVICE_STATE: 4
};

SERVICE_REST = {
		CODE: 'restCompasa',
		ENDPOINT: '/REST/CMPPRENOTA'
};

DATASETS = {
	TENANT_BRANCH: 'empresaFilial',
	SUPPLIER: 'dsSupplier' 
};

DATA = {
	XML_FOLDER: 151 // pasta destino dos xmls anexados
};

MAIL = {
	SENDER: getValue("WKUser"),//"guilherme.camargo", // usuário que seria o sender
	SUBJECT: "Fluig - Classificar Prenota", // assunto do email
	TEMPLATE_NAME: "custom_template", // código do template de email
	TO: [getValue("WKUser"), "fiscal@compasa.com.br"], // destinatários (getValue("WKUser") pega o usuário atual)
	TITLE: "Pré-nota",
	DESCRIPTION: "Uma pré-nota foi gerada pelo fluig"
}
