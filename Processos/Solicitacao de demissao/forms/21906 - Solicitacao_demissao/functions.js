
function carrega_formulario(tab){
    console.log("AQUI: ", tab);
    if(tab == 0){                
        $("#S1_aprovacao").addClass("hide");
        $("#S2_aprovacao").addClass("hide");
        $("#S3_aprovacao").addClass("hide");
        $("#S4_aprovacao").addClass("hide");
        $("#S5_aprovacao").addClass("hide");
        $("#S0_Abertura").removeClass("hide");
        var atividade = $("#num_ativ").val(); 
        if(atividade > 0){
            preenche_check();
            $("input[name=tp_contrat][value='on']").attr('disabled', true);
            $("input[name=tp_contrat][value='off']").attr('disabled', true);
            $("input[name=info_cand_2][value='on']").attr('disabled', true);
            $("input[name=info_cand_2][value='off']").attr('disabled', true);
            $("input[name=info_cand_3][value='on']").attr('disabled', true);
            $("input[name=info_cand_3][value='off']").attr('disabled', true);
        }
    }else if(tab == 1){        
        $("#S1_aprovacao").removeClass("hide");
        $("#S2_aprovacao").addClass("hide");
        $("#S3_aprovacao").addClass("hide");
        $("#S4_aprovacao").addClass("hide");
        $("#S5_aprovacao").addClass("hide");
        $("#S0_Abertura").addClass("hide");
    }else if(tab == 2){        
        $("#S1_aprovacao").addClass("hide");
        $("#S2_aprovacao").removeClass("hide");
        $("#S3_aprovacao").addClass("hide");
        $("#S4_aprovacao").addClass("hide");
        $("#S5_aprovacao").addClass("hide");
        $("#S0_Abertura").addClass("hide");
    }else if(tab == 3){        
        $("#S1_aprovacao").addClass("hide");
        $("#S2_aprovacao").addClass("hide");
        $("#S3_aprovacao").removeClass("hide");
        $("#S4_aprovacao").addClass("hide");
        $("#S5_aprovacao").addClass("hide");
        $("#S0_Abertura").addClass("hide");
    }else if(tab == 4){        
        $("#S1_aprovacao").addClass("hide");
        $("#S2_aprovacao").addClass("hide");
        $("#S3_aprovacao").addClass("hide");
        $("#S4_aprovacao").removeClass("hide");
        $("#S5_aprovacao").addClass("hide");
        $("#S0_Abertura").addClass("hide");
    }else if(tab == 5){        
        $("#S1_aprovacao").addClass("hide");
        $("#S2_aprovacao").addClass("hide");
        $("#S3_aprovacao").addClass("hide");
        $("#S4_aprovacao").addClass("hide");
        $("#S5_aprovacao").removeClass("hide");
        $("#S0_Abertura").addClass("hide");
    }
}
var count = 0;
function listDocumentByFolder(folders){
    count++;
    if(count < 100){
        var that = this;
        var obj = false;
        var valida = false
        console.log("FOLDERS: ", folders);
        for ( var i in folders) {
            if(folders[i].status == false && obj == false){
                console.log("ID: ", i);
                obj = folders[i];
                obj.parentId = folders[i-1].numPasta;
                obj.indice = i;
                
                if(folders[i].tipoDoc == true &&folders[i-1].tipoDoc == false){
                    obj = folders[i];
                    obj.parentId = folders[i-1].numPasta;
                    obj.indice = i;
                } else if(folders[i].tipoDoc == true){
                    obj = folders[i];
                    obj.parentId = folders[i-1].parentId;
                    obj.indice = i;
                }
                valida = true
            }
        }

        if(valida){
            var data = JSON.stringify({
                "documentId": obj.parentId,
                "documentTypes": [
                  "1",
                  "2"
                ],
                "filters": {
                  "documentDescription": obj.id
                }
              });
            console.log("data",data)
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;

              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(JSON.parse(this.responseText).content == ""){
                        that.createFolderDocuments(obj,folders);
                    } else {
                        console.log("a pasta já existe"+obj.indice)
                        console.log(JSON.parse(this.responseText).content[0].documentId);
                        
                        folders[obj.indice].numPasta = JSON.parse(this.responseText).content[0].documentId;
                        
                        if(folders[obj.indice].unique == true && $("#num_ativ").val() == "0"){
                            console.log("unique")
                            var arrDel = JSON.parse(this.responseText).content
                             for ( var it in arrDel) {
                               deleteFolder(arrDel[it].documentId)
                             }
                            
                            createFolderDocuments(obj,folders)
                          } else {
                                folders[obj.indice].status = true;
                                $("#hid_folders").val(JSON.stringify(folders))
                                listDocumentByFolder(folders);
                          }
                    }
                }
              });

              xhr.open("POST", "/api/public/2.0/folderdocuments/listDocumentByFolder");
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.setRequestHeader("cache-control", "no-cache");
              xhr.setRequestHeader("Postman-Token", "67f2de42-d17d-4ab9-8efd-a166fe7af7a0");

              xhr.send(data);
      }
        }
        
}

function createFolderDocuments(obj,folders){
    console.log("createFolderDocuments(obj)", obj)
    var that = this;
    var data = JSON.stringify(
        {
            "parentFolderId": obj.parentId,
            "iconId": "1",
            "documentDescription": obj.id,
            "additionalComments": "Additional Comments",
            "versionDescription": "VersionDescription",
            "expires": "false",
            "keyWord": "keyWord",
            "publisherId": "64654",
            "volumeId": "Default",
            "permissionType": "1",
            "restrictionType": "3",
            "inheritSecurity": "false",
            "approvalAndOr": "true",
            "permissions": [
                {
                    //PERMISSAO TOTAL PRA TODOS
                "securityLevel": "3",
                "securityVersion": false,
                "inheritSecurity": true,
                "downloadEnabled": "true",
                "showContent": "true",
                "attributionDescription": "attributionDescription",
                "attributionType": "3",
                "attributionValue": ""
                }
            ],
            "restrictions": [
                
            ],
            "publisherApprovers": [
                
            ],
            "downloadEnabled": "true",
            "updateIsoProperties": "false",
            "topicId": "133",
            "documentTypeId": "5",
            "notifyUser": "true",
            "internalVisualizer": "true"
        }
        /*
        {
          "parentFolderId": obj.parentId,
          "iconId": "23",
          "documentDescription": obj.id,
          "additionalComments": "Additional Comments",
          "versionDescription": "VersionDescription",
          "expires": "false",
          "keyWord": "keyWord",
          "publisherId": "64654",
          "volumeId": "Default",
          "permissionType": "1",
          "restrictionType": "3",
          "inheritSecurity": "true",
          "approvalAndOr": "true",
          "permissions": null,
          "restrictions": null,
          "publisherApprovers": [
            
          ],
          "downloadEnabled": "true",
          "updateIsoProperties": "false",
          "topicId": "133",
          "documentTypeId": "5",
          "notifyUser": "true",
          "internalVisualizer": "true"
        }*/);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              if(JSON.parse(this.responseText).content == ""){
              }
              console.log("a pasta foi criada")
              console.log(JSON.parse(this.responseText));
              folders[obj.indice].numPasta = JSON.parse(this.responseText).content.documentId;
              folders[obj.indice].status = true;
              $("#hid_folders").val(JSON.stringify(folders))
              listDocumentByFolder(folders)
          }
        });

        xhr.open("POST", "/api/public/2.0/folderdocuments/create");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "472d8304-284e-47c6-a257-1e0b939cf323");

        xhr.send(data);
}

function deleteFolder(numPasta){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "/api/public/2.0/documents/deleteDocument/"+numPasta);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "c5db2954-d143-484d-a8cc-afb6352df001");

    xhr.send(data);
}

function V_ListaAnexos(obj,p,atv){
    var that = this;
    var ativ 	= 	$("#num_ativ").val()
    var btnHide	=	"hide"
    //var M_tiposDocumentos = M_tiposDocumentos()
    console.log("OBJETO: ", obj);
    console.log("DOC: ", p);
    
    
    if(obj.length ==0){
        console.log("ENTROU IF");
        console.log("ATIV: ", atv)
        switch (atv) {
            case "S0":
                btnHide			=	"";
                break;
            case "S1":
                
                btnHide			=	"";
                break;
            case "S2":
                btnHide			=	"";
                break;
            case "S3":
                btnHide			=	"";
                break;
            case "S4":
                btnHide			=	"";
                break;
            
        }
        
        if($("#hid_mode").val()=="VIEW"){
            btnHide		=	"hide"
        }
        
        var template = {
                'linhas': new Array(),
                'novo':btnHide
                }
    }else{
        switch (atv) {
            case "S0":
                var fileName = $("#hid_filenames_S0").val();
                break;
            case "S1":
                
                var fileName = $("#hid_filenames_S1").val();
                break;
            case "S2":
                var fileName = $("#hid_filenames_S2").val();
                break;
            case "S3":
                var fileName = $("#hid_filenames_S3").val();
                break;
            case "S4":
                var fileName = $("#hid_filenames_S4").val();
                break;
            
        }
        
        var arrFileName = fileName.split(";");
        console.log("ARRAY NAME FILE: ", arrFileName);
        var arr 	= 	new Array();
        for (var i = 0; i < obj.length; i++) {
            var o 			= 	new Object();
            o.src			=	obj[i].src;   
            
            o.doc			=	arrFileName[i+1];
            o.documentId	=	obj[i].documentId;            
            o.hash			=	obj[i].hash;            
            o.objeto		=	JSON.stringify(obj[i]);
            
            //default
            o.remove		=	""
            o.pontero		=	"no-drop"
            o.hide			=	"hide"	
            
            if($("#hid_mode").val()=="VIEW"){
                var remove		=	""
                var pointer		=	"no-drop"
            } else {
                var remove		=	"window.FAT.C_deleteDocument('"+o.documentId+"');"
                var pointer		=	"pointer"
            }
                
            switch (atv) {
                case "0":
                        o.remove		=	remove
                        o.pontero		=	pointer
                        o.hide			=	""
                        btnHide			=	""	
                    
                    
                    break;
                case "4":                    
                        o.remove		=	remove
                        o.pontero		=	pointer
                        o.hide			=	""
                        btnHide			=	""	
                    
                    
                    break;
                case "5":
                    
                        o.remove		=	remove
                        o.pontero		=	pointer
                        o.hide			=	""
                        btnHide			=	""
                    
                    
                    break;
                case "28":
                    
                        o.remove		=	remove
                        o.pontero		=	pointer
                        o.hide			=	""	
                        btnHide			=	""	
                   
                    
                    break;
                case "30":
                    
                        o.remove		=	remove
                        o.pontero		=	pointer
                        o.hide			=	""	
                        btnHide			=	""	
                   
                    
                    break;
                case "32":
                    
                        o.remove		=	remove
                        o.pontero		=	pointer
                        o.hide			=	""	
                        btnHide			=	""	
                   
                    
                    break;	
            }
            arr.push(o);
            if($("#hid_mode").val()=="VIEW"){
                btnHide = "hide"
            }
            var template = {
                    'linhas': arr,
                    'novo'	: btnHide		
                    }
                            
            }
    }
    console.log(template)
    var tabela = `
                <link type="text/css" rel="stylesheet" href="/portal/resources/style-guide/css/fluig-style-guide.min.css"/>
                <link type="text/css" rel="stylesheet" href="css/style.css"/>
                <div class="row">
                    <div class="col-xs-12 col-md-12 " style="max-height:22em">
                        <table class="table table-striped table-condensed" style="margin: 0">
                            <tr style="background:#58595b; font-size:16px;">
                                <th class="solicitacao-icones" style="color:lavender!important;width: 21em !important">Documento</th>
                                <th class="solicitacao-icones" style="color:lavender!important;">Link</th>
                                <th class="solicitacao-icones" style="color:lavender!important;">Remover</th>
                            </tr>
                            {{#linhas}}
                                <tr>
                                    <td>{{doc}}</td>
                                    <td style="vertical-align:middle" class="solicitacao-icones"><i class="fs-cursor-pointer fluigicon fluigicon-search-test icon-sm" style="color:#283f63;  vertical-align:middle;" onClick="openDocument('{{documentId}}');"></i></td>
                                    <td style="vertical-align:middle" class="solicitacao-icones"><i class="  fluigicon fluigicon-trash icon-sm" style="cursor:{{pontero}}; color:#283f63;  vertical-align:middle;" onClick="{{{remove}}}"></i></td>
                                </tr>
                            {{/linhas}}
                        </table>
                    </div>
                </div>	 
                <div class="{{novo}} modal-footer" style="padding: 15 0 0 0;">
                    <div class="col-md-offset-9 col-md-3" style="padding: 0;">
                        <a class="file-input-wrapper btn btn-primary btn-block">
                        <span>Novo</span>
                        <input
                            id="fileupload" 
                            type="file" 
                            name="files" 
                            data-url="/ecm/upload"
                            class="btn btn-primary btn-sm btn-block"
                            title="Buscar Arquivo(s)"
                            multiple/>
                        </a>
                    </div>
                </div>		
                `;
    
    return Mustache.render(tabela,template);
}
function openDocument(docId, docVersion) {
    var parentOBJ;

    if (window.opener) {
        parentOBJ = window.opener.parent;
    } else {
        parentOBJ = parent;
    }

    var cfg = {
        url : "/ecm_documentview/documentView.ftl",
        maximized : true,
        title : "Visualizador de Documentos",
        callBack : function() {
            parentOBJ.ECM.documentView.getDocument(docId, docVersion);
        },
        customButtons : []
    };
        parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);
}
function C_ListaAnexos(obj,tp){
    var that				=	this;
    var documentDescription = C_hashAnexos(obj);
    var r = '';
    var hid_objAnexos		= C_getObjAnexos(tp);
    console.log("AQUI FUNCAO: ", hid_objAnexos);
    var d	=	new Array();
    if(hid_objAnexos){
        for (var i = 0; i < hid_objAnexos.length; i++) {            
            var url = C_GetDownloadURL(hid_objAnexos[i].documentId);
            console.log("URL: ", url);
            if(url){
                d.push({'src':url, 'documentId':hid_objAnexos[i].documentId, 'formaPgto': hid_objAnexos[i].formaPgto, 'tipoDoc': hid_objAnexos[i].tipoDoc, 'hash': hid_objAnexos[i].hash});
            }            
        }
        
    }


            
    r	=	V_ListaAnexos(d,documentDescription,tp);

    return r;
}
function C_hashAnexos(obj){
    return obj.hash;
}
function C_GetDownloadURL(documentId){
    var that	=	this;
    var x = false;
    $.ajax({
        async : false,
        type : "GET",
        contentType: "application/json",
        url : '/api/public/2.0/documents/getDownloadURL/'+documentId,
        error: function(e) {
            console.log("RETORNO GETDOWN: ", e);
            return false;
        },
        success: function(data) {
            x =	data.content;		
        }
    });
    return x;
    
}
function carregaPastas(){
		
    $("#hid_folder_ano").val(SOLVS.dataAtual().ano);
    $("#hid_folder_mes").val(SOLVS.mesNome(SOLVS.dataAtual().month));
    $("#hid_folder_dia").val(SOLVS.dia);
    
}
function getPastaAnexos(){
    var PRODUCAO = false;
	if(PRODUCAO){
		var id = '9890';
	}else{
		var id = '9890';//'150';
	}
	return(id);
}
function C_validaAnexos(){
    var that = this
    that.C_validaAnexosObrigatorios()
    that.C_vinculaURLAnexos()
    
}
function C_getField(id){
    var mode = $("#hid_mode_form").val();
    if(mode=="VIEW"){
        return $("#"+id).text().trim();
    } else {
        return $("#"+id).val().trim();
    }
}
function carregaArray(){

    var dia, mes, ano;
    //console.log("SPLIT: ", $("#dt_abertura").val().split('/'))
    var data_aber = $("#dt_abertura").val().split('/');
    if(data_aber.length==1){
        
        dia = $("#dt_abertura").val().split('-')[2];
        mes = $("#dt_abertura").val().split('-')[1];
        ano = $("#dt_abertura").val().split('-')[0];
    }else{
        ano = $("#dt_abertura").val().split('/')[2];
        mes = $("#dt_abertura").val().split('/')[1];
        dia = $("#dt_abertura").val().split('/')[0];
    }
    console.log("DIA: ", dia);
    console.log("MES: ", mes);
    console.log("ANO: ", ano);

    var folders = [{
        id: "RH - ANEXOS",
        status: true,
        numPasta: getPastaAnexos(),
        tipoDoc: false,
        unique: false
    },
    {
        id: $("#hid_filial").val(),
        status: false,
        numPasta: false,
        tipoDoc: false,
        unique: false
    },
    {
        id:  ano,
        status: false,
        numPasta: false,
        tipoDoc: false,
        unique: false
    },
    {
        id: SOLVS.mesNome(mes-1),
        status: false,
        numPasta: false,
        tipoDoc: false,
        unique: false
    },
    {
        id: dia,
        status: false,
        numPasta: false,
        tipoDoc: false,
        unique: false
    },
    {
        id: "Etapa "+ $("#hid_etapa").val(),
        status: false,
        numPasta: false,
        tipoDoc: false,
        unique: true
    }]
    
    return folders;
}
function C_getObjAnexos(atividade){
    //var atividade = $("#num_ativ").val();
    console.log("ATIVIDADE C_getObjAnexos: ", atividade)
    try{
        if(atividade == "S0"){
            
            var hid_objAnexos = C_getField("hid_objAnexos_S0");
            console.log("FUNCAO GET S0:", hid_objAnexos);
            if(hid_objAnexos==undefined){
                return false
            }else{
                if(typeof hid_objAnexos=="string"){
                    return JSON.parse(hid_objAnexos)
                }else{
                    false
                }
            }
        }
        
    }catch(e){
        return false
    }
    
}
function C_setObjAnexos(obj,name_file){
    var that = this;
    var atividade = $("#num_ativ").val();
    if(SOLVS.validaObj(obj)){
        
        if(atividade == '0' || atividade == '4'){
            var hid_objAnexos = C_getObjAnexos('S0')
            console.log("SET: ", typeof hid_objAnexos);
            if(typeof hid_objAnexos!="object"){
                hid_objAnexos = new Array()
            }
            hid_objAnexos.push(obj)
            $("#hid_objAnexos_S0").val(JSON.stringify(hid_objAnexos))
            return true
        }//S0 S1
        
    }else{
        return false	
    }
}
function C_upload(obj){
    var atividade = $("#num_ativ").val();
    console.log("ENTROU AQUI: ", obj);
    var that	 =	this;
    var processo =	C_hashAnexos(obj)
    var	parentId =	JSON.parse($("#hid_folders").val())[5].numPasta
    var arr = $("#hid_etapa").val();
    var data_file;   
    if(atividade == "0" || atividade == "4"){
        /*$('#fileupload').fileupload({
            dataType: 'json',
            done: function (e, data) {
                $('#idModalAnexos_S0').modal('toggle');
                
                console.log("AQUI DATA: ", data);       
                $.each(data.result.files, function (index, file) {
                    
                   console.log("DESCRICAO: ", arr);
                   console.log("PARANTEID: ", parentId);
                   console.log("ANEXOS: ", file.name);
                   
                   console.log("RETORNO: ", C_GetDownloadURL(parentId));
                   
                    $.ajax({
                        async : true,
                        type : "POST",
                        contentType: "application/json",
                        url : 'http://fluig.compasa.com.br:8180/api/public/ecm/document/createDocument',
        
                        data: JSON.stringify({
                            "description": arr,
                            "parentId": parentId,
                            "downloadEnabled": true,
                            "attachments": [{
                                "fileName": file.name,
                            }],
                        }),
                        error: function(data) {
                            console.log("DEU RUIM:: ", data);
                            FLUIGC.toast({
                                 title: '',
                                 message: "Falha ao enviar- " + processo,
                                 type: 'danger'
                             });
                            
                        },
                        success: function(data) {
                            var nameFile = $("#hid_filenames_S0").val();
                            nameFile += ";" +  file.name;
                            $("#hid_filenames_S0").val(nameFile); 
                            console.log("DEU CERTO:: ", data);
                            obj.documentId = data.content.id
                            C_setObjAnexos(obj,file.name);
                            FLUIGC.toast({
                                title: '',
                                message: "Arquivo enviado com sucesso!",
                                type: 'success'
                            });
                            
                        },
                    });
                });
            }
        });*/
    }
}
function C_modalAnexos(tp){
    var hash 		= $("#hid_hash").val().trim();   
    var obj = {
        hash:hash
    }
    if(tp == "S0"){
        var modal = FLUIGC.modal({
            title: 'ANEXAR - Documentos Abertura',
            content: C_ListaAnexos(obj,tp),
            id: 'idModalAnexos_S0',
        }, function(err, data) {
            if(err) {
                
            } else {
                // do something with data
                C_upload(obj);
            }
        });
    }
}

function preenche_subs(val){
    var atividade = $("#num_ativ").val(); 
    if(atividade == 0){
        if(val=="on"){
            $("#hid_check_subs").val("sim");
        }else{
            $("#hid_check_subs").val("nao");
        }
    }
}//preenche_candidato

function preenche_candidato(val){
    var atividade = $("#num_ativ").val(); 
    if(atividade == 0){
        if(val=="on"){
            $("#hid_check_candidato").val("sim");
        }else{
            $("#hid_check_candidato").val("nao");
        }
    }
}//preenche_func
function preenche_func(val){
    var atividade = $("#num_ativ").val(); 
    if(atividade == 0){
        if(val=="on"){
            $("#hid_check_func").val("sim");
        }else{
            $("#hid_check_func").val("nao");
        }
    }
}
