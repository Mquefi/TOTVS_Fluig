function defineStructure() {

	 addColumn("grupo");
     addColumn("codfil");
     addColumn("empresa");
     addColumn("unidneg");
     addColumn("filial");
     addColumn("nome");
     addColumn("nomred");
     addColumn("nomecom");
     addColumn("cgc");
     addColumn("descemp");
     addColumn("descgrp");
     addColumn("fullname");
     addColumn("chave");
     addColumn("fieldtext");

     setKey(["cgc",]);
     addIndex(["cgc"]);

}
function onSync(lastSyncDate) {

    var dataset = DatasetBuilder.newDataset();
    
    try {
        var retorno = DatasetFactory.getDataset("dsEmpresasProtheus",null,null, null);
        for (var i = 0; i < retorno.rowsCount; i++){
        	log.dir("Dentro do FOR e retornando as empresas");
        	log.dir(retorno.getValue(i,'grupo'));
        	
            var SM0_GRPEMP   = retorno.getValue(i,'grupo');
            var SM0_CODFIL   = retorno.getValue(i,'codfil');
            var SM0_EMPRESA  = retorno.getValue(i,'empresa');
            var SM0_UNIDNEG  = retorno.getValue(i,'unidneg');
            var SM0_FILIAL   = retorno.getValue(i,'filial');
            var SM0_NOME     = retorno.getValue(i,'nome');
            var SM0_NOMRED   = retorno.getValue(i,'nomred');
            var SM0_NOMECOM  = retorno.getValue(i,'nomecom');
            var SM0_CGC      = retorno.getValue(i,'cgc');
            var SM0_DESCEMP  = retorno.getValue(i,'descemp');
            var SM0_DESCGRP  = retorno.getValue(i,'descgrp');
            var SM0_FULLNAME = retorno.getValue(i,'fullname');
            var SM0_CHAVE    = retorno.getValue(i,'chave');
            var SM0_FIELD    = retorno.getValue(i,'fieldtext');
            
            

            if (SM0_GRPEMP != null && SM0_CODFIL != null && SM0_EMPRESA != null && SM0_UNIDNEG != null){ 
            	log.dir("ADD EMPRESA : EMPRESA_PROTHEUS_SYNC");
                dataset.addOrUpdateRow([SM0_GRPEMP,SM0_CODFIL,SM0_EMPRESA,SM0_UNIDNEG,SM0_FILIAL,SM0_NOME,SM0_NOMRED,SM0_NOMECOM,SM0_CGC,SM0_DESCEMP,SM0_DESCGRP,SM0_FULLNAME,SM0_CHAVE,SM0_FIELD]);
            }
   
        }
        return dataset;
    } catch(e) {
        return dataset;
    }    

}
function createDataset(fields, constraints, sortFields) {

}function onMobileSync(user) {

}