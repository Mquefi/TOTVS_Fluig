

var globalMsg = new Object();
	globalMsg.mensagens = new Array();
var globalChats = new Object();
	globalChats.mensagens = new Array();

$(document).ready(function(){
    if($("#hid_macroSelecionado").val()=="VIEW"){
        console.log("MODO VIEW");
        showChats();
    }
    if(atividade == 0 || atividade == 4){     
        $("#hid_etapa").val("Abertura");
        var obj_folder = carregaArray();
        listDocumentByFolder(obj_folder);
        $(".aba0").click();
        $("#nav1").addClass("hide");
        $("#nav2").addClass("hide");
        carrega_formulario(0);
    }else if(atividade==19){
        $(".aba0").click();
        $("#nav1").addClass("hide");
        $("#nav2").addClass("hide");
        carrega_formulario(0);
        //preenche_campos(1);
        showChats();
    }else if(atividade==5){
        $(".aba1").click();
        $("#nav0").addClass("hide");
        $("#nav2").addClass("hide");
        $("#nav1").removeClass("hide");
        carrega_formulario(1);
        preenche_campos(1);
        showChats();
    }else if(atividade==9){
        $(".aba2").click();
        $("#nav0").addClass("hide");
        $("#nav1").addClass("hide");
        $("#nav2").removeClass("hide");
        carrega_formulario(2);
        preenche_campos(2);
        showChats();
    }else if(atividade==29){
        $(".aba2").click();
        $("#nav0").addClass("hide");
        $("#nav1").addClass("hide");
        $("#nav2").removeClass("hide");
        carrega_formulario(2);
        preenche_campos(2);
        showChats();
        $("#S3_sel_validacao").attr("readonly","readonly");
    }
    
});

function carrega_formulario(tab){
    console.log("AQUI: ", tab);
    if(tab == 0){                
        $("#S2_resolucao").addClass("hide");
        $("#S3_aprovacao").addClass("hide");
        $("#S0_Abertura").removeClass("hide");
    }else if(tab == 1){        
        $("#S0_Abertura").addClass("hide");
        $("#S3_aprovacao").addClass("hide");
        $("#S2_resolucao").removeClass("hide");
    }else if(tab == 2){        
        $("#S0_Abertura").addClass("hide");
        $("#S2_resolucao").addClass("hide");
        $("#S3_aprovacao").removeClass("hide");
    }
}
function preenche_campos(tp){
    if(tp==1){
        $("#S2_txt_tp_incid").val($("#S0_txt_tp_incid").val());
        $("#S2_txt_obra_sol").val($("#S0_txt_obra_sol").val());
        $("#S2_txt_prazo_sol").val($("#S0_txt_prazo_sol").val());
        $("#S2_txt_area_incid").val($("#S0_txt_area_incid").val());
        $("#S2_txt_resp_sol").val($("#S0_txt_resp_sol").val());
    }else if(tp==2){
        $("#S3_txt_tp_incid").val($("#S0_txt_tp_incid").val());
        $("#S3_txt_obra_sol").val($("#S0_txt_obra_sol").val());
        $("#S3_txt_prazo_sol").val($("#S0_txt_prazo_sol").val()); 
        $("#S3_txt_set_sol").val($("#S0_txt_set_sol").val());
        $("#S3_txt_area_incid").val($("#S0_txt_area_incid").val());
        $("#S3_txt_resp_sol").val($("#S0_txt_resp_sol").val());
    }
}
function limpa_campos(){
    console.log("ENTROU AQUI");
    $("#S0_txt_tp_incid").val("");
    $("#S0_txt_prazo_sol").val(""); 
    $("#S0_txt_resp_sol").val("");
}
function abre_modal(modal){
    console.log("ENTROU AQUI1");
    if(modal=="obras"){
        var dados;
        dados = busca_obras();
        console.log("OBRAS COMPASA: ", dados.values);
        monta_modal("obras",dados.values);
        
    }else if(modal=="assunto"){
        var dados;  
        //var c1 = DatasetFactory.createConstraint("S0_sel_area_inci", area, area, ConstraintType.MUST);      
        //var constraints   = new Array(c1);
        dados = busca_assuntos();
        console.log("ASSUNTOS: ", dados);
        monta_modal("assunto",dados.values);
    }else if(modal=="subassunto"){
        var dados;  
        //var c1 = DatasetFactory.createConstraint("S0_sel_area_inci", area, area, ConstraintType.MUST);      
        //var constraints   = new Array(c1);
        var assunto = $("#S0_txt_area_incid").val();
        if(assunto==""||assunto==undefined||assunto==null){
            var myModal = FLUIGC.modal({
                title: 'PROBLEMA',
                content: 'Precisa Selecionar um Assunto para Continuar!',
                id: 'fluig-modal',
                size: 'small',
                actions: [{
                    'label': 'Fechar',
                    'autoClose': true
                }]
            }, function(err, data) {
                if(err) {
                    // do error handling
                } else {
                    // do something with data
                }
            });
            return false;
        }else{
            dados = busca_subassuntos(assunto);
            console.log("SUB-ASSUNTOS: ", dados);
            monta_modal("subassunto",dados.values);
        }
        
    }else if(modal=="setor"){
        var dados;        
        dados = busca_setores();
        console.log("SETORES: ", dados.values);
        monta_modal("setor",dados.values);
    }else if(modal=="users"){
        var dados;        
        dados = busca_users();
        console.log("USUARIOS: ", dados.values);
        monta_modal("users",dados.values);
    }
}
var dadosUsers = new Array();
function busca_users(){
    var dados = DatasetFactory.getDataset('colleague',null,null,null);
    var tam_table = dados.values.length;    
    for(var i=0; i < tam_table;i++){
        var user = new Object();        
        user.COD = dados.values[i]["colleaguePK.colleagueId"];        
        user.NOME = dados.values[i]["colleagueName"];        
        dadosUsers.push(user);        
    }
    return dados;
}
var dadosObras = new Array();
function busca_obras(){

	
    var dados = DatasetFactory.getDataset('ds_get_cc',null,null,null);
    var tam_table = dados.values.length; 
    
    if(tam_table > 0){
    	for(var i=0; i < tam_table;i++){
            var obra = new Object();        
            obra.COD = dados.values[i]["S0_txt_Obra"];        
            //obra.NOME = dados.values[i]["S0_txt_Obra"];        
            dadosObras.push(obra);        
        }
        return dados;
    }else{
    	alert("Você nao tem obras cadastrda. Por favor entrar em contato com a T.I");
    }
    
}
var dadosAssuntos = new Array();
function busca_assuntos(){
    var dados = DatasetFactory.getDataset('ds_assuntos',null,null,null);

    var tam_table = dados.values.length;
    
    for(var i=0; i < tam_table;i++){
        var assunto = new Object();        
        assunto.COD = dados.values[i]["S0_txt_assunto"];        
        //obra.NOME = dados.values[i]["S0_txt_DescObra"];        
        dadosAssuntos.push(assunto);        
    }

    return dados;
}
var dadosSubAssuntos = new Array();
function busca_subassuntos(assunto){
    var c1 = DatasetFactory.createConstraint("S0_sel_assunto", assunto, assunto, ConstraintType.MUST);      
    var constraints   = new Array(c1);
    var dados = DatasetFactory.getDataset('ds_subassunto',null,constraints,null);

    var tam_table = dados.values.length;
    
    for(var i=0; i < tam_table;i++){
        var subassunto = new Object();        
        subassunto.COD = dados.values[i]["S0_txt_subAssunto"];        
        //obra.NOME = dados.values[i]["S0_txt_DescObra"];        
        dadosSubAssuntos.push(subassunto);        
    }

    return dados;
}
var dadosSetores = new Array();
function busca_setores(){
    var dados = DatasetFactory.getDataset('ds_setores',null,null,null);
    var tam_table = dados.values.length;
    for(var i=0; i < tam_table;i++){
        var setor = new Object();
        setor.COD = dados.values[i]["S0_txt_setor"];         
        dadosSetores.push(setor);
    }
    return dados;
}
function monta_modal(tipo,table){
    var id_campo;
    if(tipo=="obras"){
        id_campo = "S0_txt_obra_sol"
        console.log("DADOS TABLE: ", table);
        var txt;        
        txt =         '<div class="row">';
        txt +=              '<div class="col-md-12">';
        txt +=                  '<table class="table table-hover">'; 
        txt +=                      '<thead>'; 
        txt +=                          '<tr>'; 
        //txt +=                              '<th>Código Obra</th>';
        txt +=                              '<th>Descrição Obra</th>';       
        txt +=                          '</tr>';
        txt +=                      '</thead>'; 
        txt +=                      '<tbody id="buscaObras">'; 
        var tam_table = table.length;
        for(var i=0; i < tam_table;i++){
            txt +=                          '<tr id="'+table[i].S0_txt_Obra+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal">'; 
            txt +=                              '<td>'+table[i].S0_txt_Obra+'</td>';
            //txt +=                              '<td>'+table[i].S0_txt_DescObra+'</td>';                                      
            txt +=                          '</tr>'; 
        }

        txt +=                      '</tbody>'; 
        txt +=                  '</table>';       
        txt +=              '</div>';
        txt +=         '</div>';
        txt += '<script>function seleciona_linha (a, b){ console.log("ENTROU NO SELECIONA LINHA"); $(".linha_sel").each(function(i,val) { $(val).removeClass("linha_sel");});$(a).addClass("linha_sel");console.log("elemento: ", $(a)[0]); var id =  $(a)[0].id; var aux = id.split(";"); console.log("val: ", aux); $("#hid_inci_sel").val(aux[0]); $("#hid_praz_sel").val(aux[1]); $("#hid_resp_grupo").val(aux[2]);$("#S0_txt_resp_sol").val(aux[3]);}</script>';
        var myModal1 = FLUIGC.modal({
            title: '',
            content: txt,
            id: 'fluig-modal',
            size: 'full',
            actions: [{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                // do something with data
            }
        });
        $(".modal-body").css( "max-height", "250px" );
        $(".modal-header").html(headerModal('OBRAS COMPASA','obras'));
        $("#logoCOMPASA_modal").attr("width","150");
        $("#logoCOMPASA_modal").attr("height","60");
    }else if(tipo=="assunto"){
        id_campo = "S0_txt_area_incid"
        console.log("DADOS TABLE: ", table);
        var txt;        
        txt =         '<div class="row">';
        txt +=              '<div class="col-md-12">';
        txt +=                  '<table class="table table-hover">'; 
        txt +=                      '<thead>'; 
        txt +=                          '<tr>'; 
        txt +=                              '<th>Assuntos</th>';     
        txt +=                          '</tr>';
        txt +=                      '</thead>'; 
        txt +=                      '<tbody id="buscaAssuntos">'; 
        var tam_table = table.length;
        for(var i=0; i < tam_table;i++){
            txt +=                          '<tr id="'+table[i].S0_txt_assunto+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal">'; 
            txt +=                              '<td>'+table[i].S0_txt_assunto+'</td>';                                                  
            txt +=                          '</tr>'; 
        }

        txt +=                      '</tbody>'; 
        txt +=                  '</table>';       
        txt +=              '</div>';
        txt +=         '</div>';
        txt += '<script>function seleciona_linha (a, b){ console.log("ENTROU NO SELECIONA LINHA"); $(".linha_sel").each(function(i,val) { $(val).removeClass("linha_sel");});$(a).addClass("linha_sel");console.log("elemento: ", $(a)[0]); var id =  $(a)[0].id; var aux = id; console.log("val: ", aux); }</script>';
        var myModal1 = FLUIGC.modal({
            title: '',
            content: txt,
            id: 'fluig-modal',
            size: 'full',
            actions: [{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                // do something with data
            }
        });
        $(".modal-body").css( "max-height", "250px" );
        $(".modal-header").html(headerModal('ASSUNTOS','assuntos'));
        $("#logoCOMPASA_modal").attr("width","150");
        $("#logoCOMPASA_modal").attr("height","60");
    }else if(tipo=="subassunto"){
        id_campo = "S0_txt_tp_incid"
        console.log("DADOS TABLE: ", table);
        var txt;        
        txt =         '<div class="row">';
        txt +=              '<div class="col-md-12">';
        txt +=                  '<table class="table table-hover">'; 
        txt +=                      '<thead>'; 
        txt +=                          '<tr>'; 
        txt +=                              '<th>Assuntos</th>';     
        txt +=                          '</tr>';
        txt +=                      '</thead>'; 
        txt +=                      '<tbody id="buscaSubAssuntos">'; 
        var tam_table = table.length;
        for(var i=0; i < tam_table;i++){
            txt +=                          '<tr id="'+table[i].S0_txt_subAssunto+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal">'; 
            txt +=                              '<td>'+table[i].S0_txt_subAssunto+'</td>';                                                  
            txt +=                          '</tr>'; 
        }

        txt +=                      '</tbody>'; 
        txt +=                  '</table>';       
        txt +=              '</div>';
        txt +=         '</div>';
        txt += '<script>function seleciona_linha (a, b){ console.log("ENTROU NO SELECIONA LINHA"); $(".linha_sel").each(function(i,val) { $(val).removeClass("linha_sel");});$(a).addClass("linha_sel");console.log("elemento: ", $(a)[0]); var id =  $(a)[0].id; var aux = id; console.log("val: ", aux); }</script>';
        var myModal1 = FLUIGC.modal({
            title: '',
            content: txt,
            id: 'fluig-modal',
            size: 'full',
            actions: [{
                'label': 'Fechar',
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                // do something with data
            }
        });
        $(".modal-body").css( "max-height", "250px" );
        $(".modal-header").html(headerModal('SUB-ASSUNTOS','subassuntos'));
        $("#logoCOMPASA_modal").attr("width","150");
        $("#logoCOMPASA_modal").attr("height","60");
    }else if(tipo=="setor"){
        id_campo = "S0_txt_set_sol"
        console.log("DADOS TABLE: ", table);
        var txt;        
        txt =         '<div class="row">';
        txt +=              '<div class="col-md-12">';
        txt +=                  '<table class="table table-hover">'; 
        txt +=                      '<thead>'; 
        txt +=                          '<tr>'; 
        txt +=                              '<th>Código</th>';         
        txt +=                          '</tr>';
        txt +=                      '</thead>'; 
        txt +=                      '<tbody id="buscaSetores">'; 
        var tam_table = table.length;
        for(var i=0; i < tam_table;i++){
            txt +=                          '<tr id="'+table[i].S0_txt_setor+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal">'; 
            txt +=                              '<td>'+table[i].S0_txt_setor+'</td>';
                                            
            txt +=                          '</tr>'; 
        }

        txt +=                      '</tbody>'; 
        txt +=                  '</table>';       
        txt +=              '</div>';
        txt +=         '</div>';
        txt += '<script>function seleciona_linha (a, b){ console.log("ENTROU NO SELECIONA LINHA"); $(".linha_sel").each(function(i,val) { $(val).removeClass("linha_sel");});$(a).addClass("linha_sel");console.log("elemento: ", $(a)[0]); var id =  $(a)[0].id; var aux = id.split(";"); console.log("val: ", aux); $("#hid_codsetor_sel").val(aux[0]); $("#hid_setor_sel").val(aux[1]);}</script>';
        var myModal1 = FLUIGC.modal({
            title: '',
            content: txt,
            id: 'fluig-modal',
            size: 'full',
            actions: [{
                'label': 'Fechar',                
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                // do something with data
            }
        });
        $(".modal-body").css( "max-height", "250px" );
        $(".modal-header").html(headerModal('SETORES DA EMPRESA','setor'));
        $("#logoCOMPASA_modal").attr("width","150");
        $("#logoCOMPASA_modal").attr("height","60");
    }else if(tipo=="users"){
        console.log("DADOS TABLE: ", table);
        id_campo = "S0_txt_resp_sol"
        var txt;        
        txt =         '<div class="row">';
        txt +=              '<div class="col-md-12">';
        txt +=                  '<table class="table table-hover">'; 
        txt +=                      '<thead>'; 
        txt +=                          '<tr>'; 
        txt +=                              '<th>Código</th>';
        txt +=                              '<th>Nome</th>';       
        txt +=                          '</tr>';
        txt +=                      '</thead>'; 
        txt +=                      '<tbody id="buscaUsers">'; 
        var tam_table = table.length;
        for(var i=0; i < tam_table;i++){
            txt +=                          '<tr id="'+table[i]["colleaguePK.colleagueId"]+';'+table[i]["colleagueName"]+'" onclick="selec_user(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal">'; 
            txt +=                              '<td>'+table[i]["colleaguePK.colleagueId"]+'</td>';
            txt +=                              '<td>'+table[i]["colleagueName"]+'</td>';                                      
            txt +=                          '</tr>'; 
        }

        txt +=                      '</tbody>'; 
        txt +=                  '</table>';       
        txt +=              '</div>';
        txt +=         '</div>';
        txt += '<script>function seleciona_linha (a, b){ console.log("ENTROU NO SELECIONA LINHA"); $(".linha_sel").each(function(i,val) { $(val).removeClass("linha_sel");});$(a).addClass("linha_sel");console.log("elemento: ", $(a)[0]); var id =  $(a)[0].id; var aux = id.split(";"); console.log("val: ", aux); $("#hid_resp_grupo").val(aux[0]); $("#S0_txt_resp_sol").val(aux[1]);}</script>';
        var myModal1 = FLUIGC.modal({
            title: '',
            content: txt,
            id: 'fluig-modal',
            size: 'full',
            actions: [{
                'label': 'Fechar',                
                'autoClose': true
            }]
        }, function(err, data) {
            if(err) {
                // do error handling
            } else {
                // do something with data
            }
        });
        $(".modal-body").css( "max-height", "250px" );
        $(".modal-header").html(headerModal('USUÁRIOS DA EMPRESA','users'));
        $("#logoCOMPASA_modal").attr("width","150");
        $("#logoCOMPASA_modal").attr("height","60");
    }
}
function seleciona_incidente(){    
    if(atividade == 0 || atividade == 4 || atividade == 19){
        $("#S0_txt_tp_incid").val($("#hid_inci_sel").val()); 
        $("#S0_txt_prazo_sol").val($("#hid_praz_sel").val());
    }else if(atividade == 5){
        $("#S2_txt_tp_incid").val($("#hid_inci_sel").val()); 
        $("#S2_txt_prazo_sol").val($("#hid_praz_sel").val());
    }
     
          
}
function selec_itens(val,id){

    if(id.id == "S0_txt_tp_incid"){

        var not = $("#S0_txt_area_incid").val();

        var c1 = DatasetFactory.createConstraint("tipo", val, val, ConstraintType.MUST); 
        var c2 = DatasetFactory.createConstraint("not", not, not, ConstraintType.MUST);      
        var constraints   = new Array(c1,c2);
        var dados = DatasetFactory.getDataset('ds_get_usuarios_notificacao',null,constraints,null);


        var c13 = DatasetFactory.createConstraint("tipo", val, val, ConstraintType.MUST); 
        var c23 = DatasetFactory.createConstraint("not", not, not, ConstraintType.MUST);      
        var constraints   = new Array(c13,c23);
        var dados2 = DatasetFactory.getDataset('ds_get_prazo_fic03',null,constraints,null);
        
        if(dados2.values.length > 0){
            var time = new Date();
			var outraData = new Date();
			outraData.setDate(time.getDate() + parseInt(dados2.values[0].S0_txt_prazo)); // Adiciona 3 dias

            var dia = outraData.getDate();
            var mes = outraData.getMonth();
            var ano = outraData.getFullYear();
            var formatedDate = ("0" + outraData.getDate()).substr(-2) + "/" + ("0" + (outraData.getMonth() + 1)).substr(-2) + "/" + outraData.getFullYear();
            $("#S0_txt_prazo_sol,#S0_txt_prazo_estima").val(formatedDate);


        }

        
        if(dados.values.length > 0){
			
            var txt = "";
			for (var x = 0; x < dados.values.length; x++) {

				var usuario = dados.values[x].usuario;
				var nome_usuario = dados.values[x].nome_usuario;
				var email = dados.values[x].email;

                
                    txt +="<b>Nome:</b> "+dados.values[x].nome_usuario;
                    txt +="   <b>E-Mail</b>: "+dados.values[x].email;
                    txt += "<br>";


                
                
				/*var n = wdkAddChild('NFitens');
				$("#xProd___"+n).val(xProd);
				$("#qCom___"+n).val(qCom);
				$("#vUnCom___"+n).val(vUnCom);
				$("#vProd___"+n).val(vProd);
				$("#nunItem___"+n).val(nunItem);*/
				
			}


             FLUIGC.modal({
                title: 'Usuários que serão notificados',
                content: txt,
                id: 'fluig-modal2',
                size: 'large',
                actions: [{
                    'label': 'Fechar',                
                    'autoClose': true
                }]
            }, function(err, data) {
                if(err) {
                    // do error handling
                } else {
                    // do something with data
                }
            });
		}

    }
    
    $("#"+id.id).val(val);
}
function selec_user(val,id){
    var valores = val.split(";");
    if(atividade=="5"){
        $("#S2_txt_resp_sol").val(valores[1]);
        //selec_user
        $("#hid_idUserTransferir").val(valores[0]);
    }else{
        $("#"+id.id).val(valores[1]);
    }
    
    $("#hid_resp_resolucao").val(valores[0]);
}
headerModal = function(titulo,tp){
    if(tp=="obras"){
        return(`<section id="header">
        <div class="row">            
            <div class="col-sm-4 col-md-4">
                <img id="logoCOMPASA_modal" src="http://fluig.compasa.com.br:8180/portal/api/servlet/image/01/custom/logo_image.png">  
            </div>         
            <div class="col-md-8">
                <div id="tituloFormulario">
                    <span>`+titulo+`</span>
                </div>
            </div>
        </div>
    </section>
        <div class="row">
            <div class="col-md-6">
                <label class="control-label">Descrição</label>
                <div class=" input-group">
                    <span class="input-group-addon fluigicon fluigicon-md fluigicon-file"></span>		
                    <input type="text" class="form-control" name="S0_txt_nm_obras" id="S0_txt_nm_obras" onkeyup="busca_obras_nome(this.value)"></input>
                </div>             
            </div>            
        </div>
        
    `);
    }else if(tp=="assuntos"){
        return(`<section id="header">
        <div class="row">   
            <div class="col-sm-4 col-md-4">
                <img id="logoCOMPASA_modal" src="http://fluig.compasa.com.br:8180/portal/api/servlet/image/01/custom/logo_image.png">  
            </div>         
            <div class="col-md-8">
                <div id="tituloFormulario">
                    <span>`+titulo+`</span>
                </div>
            </div>
        </div>
    </section> <div class="row">    
    <div class="col-md-6">
        <label class="control-label">Descrição</label>
        <div class=" input-group">
            <span class="input-group-addon fluigicon fluigicon-md fluigicon-file"></span>		
            <input type="text" class="form-control" name="S0_txt_nm_assunto" id="S0_txt_nm_assunto" onkeyup="busca_assunto_nome(this.value)"></input>
        </div>             
    </div>            
</div>

`);
    }else if(tp=="subassuntos"){
        return(`<section id="header">
        <div class="row">   
            <div class="col-sm-4 col-md-4">
                <img id="logoCOMPASA_modal" src="http://fluig.compasa.com.br:8180/portal/api/servlet/image/01/custom/logo_image.png">  
            </div>         
            <div class="col-md-8">
                <div id="tituloFormulario">
                    <span>`+titulo+`</span>
                </div>
            </div>
        </div>
    </section> <div class="row">    
    <div class="col-md-6">
        <label class="control-label">Descrição</label>
        <div class=" input-group">
            <span class="input-group-addon fluigicon fluigicon-md fluigicon-file"></span>		
            <input type="text" class="form-control" name="S0_txt_nm_subassunto" id="S0_txt_nm_subassunto" onkeyup="busca_subassunto_nome(this.value)"></input>
        </div>             
    </div>            
</div>

`);
    }else if(tp=="setor"){
        return(`<section id="header">
        <div class="row">   
            <div class="col-sm-4 col-md-4">
                <img id="logoCOMPASA_modal" src="http://fluig.compasa.com.br:8180/portal/api/servlet/image/01/custom/logo_image.png">  
            </div>         
            <div class="col-md-8">
                <div id="tituloFormulario">
                    <span>`+titulo+`</span>
                </div>
            </div>
        </div>
    </section> <div class="row">    
    <div class="col-md-6">
        <label class="control-label">Código</label>
        <div class=" input-group">
            <span class="input-group-addon fluigicon fluigicon-md fluigicon-file"></span>		
            <input type="text" class="form-control" name="S0_txt_cod_setor" id="S0_txt_cod_setor" onkeyup="busca_setor_cod(this.value)"></input>
        </div>             
    </div>            
</div>

`);
    }else if(tp=="users"){
        return(`<section id="header">
        <div class="row">            
            <div class="col-sm-4 col-md-4">
                <img id="logoCOMPASA_modal" src="http://fluig.compasa.com.br:8180/portal/api/servlet/image/01/custom/logo_image.png">  
            </div>         
            <div class="col-md-8">
                <div id="tituloFormulario">
                    <span>`+titulo+`</span>
                </div>
            </div>
        </div>
    </section>
        <div class="row">
            <div class="col-md-6">
                <label class="control-label">Código</label>
                <div class=" input-group">
                    <span class="input-group-addon fluigicon fluigicon-md fluigicon-file"></span>	
                    <input type="text" class="form-control" name="S0_txt_cod_user" id="S0_txt_cod_user" onkeyup="busca_user_cod(this.value)"></input>
                </div>
            </div>
            <div class="col-md-6">
                <label class="control-label">Nome</label>
                <div class=" input-group">
                    <span class="input-group-addon fluigicon fluigicon-md fluigicon-file"></span>		
                    <input type="text" class="form-control" name="S0_txt_nm_user" id="S0_txt_nm_user" onkeyup="busca_user_nome(this.value)"></input>
                </div>             
            </div>            
        </div>
        
    `);
    }
    
  }

  function busca_setor_cod(nm){
    //S0_txt_area_incid
  console.log("OBEJTO DADOS1: ", dadosSetores);
  var txt = "";
  var id_campo = "S0_txt_set_sol";
  for(var i=0; i < dadosSetores.length; i++){
      //@ VARIAVEIS
      var aux  = dadosSetores[i]['COD'].toUpperCase();
      var aux2 = nm.toUpperCase();

      //@ CONDICIONAL
      if(aux.indexOf(aux2) > -1){
          txt +=                          '<tr id="'+dadosSetores[i]['COD']+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal">';                          
          txt +=                              '<td>'+dadosSetores[i]['COD']+'</td>'; 
          txt +=                          '</tr>';  
      }
  }    
  //@ APPEND HTML NA TABELA
  $("#buscaSetores").html(txt);
}
  function busca_assunto_nome(nm){
      //S0_txt_area_incid
    console.log("OBEJTO DADOS1: ", dadosAssuntos);
    var txt = "";
    var id_campo = "S0_txt_area_incid";
    for(var i=0; i < dadosAssuntos.length; i++){
        //@ VARIAVEIS
        var aux  = dadosAssuntos[i]['COD'].toUpperCase();
        var aux2 = nm.toUpperCase();

        //@ CONDICIONAL
        if(aux.indexOf(aux2) > -1){
            txt +=                          '<tr id="'+dadosAssuntos[i]['COD']+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal">';                          
            txt +=                              '<td>'+dadosAssuntos[i]['COD']+'</td>'; 
            txt +=                          '</tr>';  
        }
    }    
    //@ APPEND HTML NA TABELA
    $("#buscaAssuntos").html(txt);
  }
  function busca_subassunto_nome(nm){
      //S0_txt_tp_incid
      var id_campo = "S0_txt_tp_incid";
    console.log("OBEJTO DADOS1: ", dadosSubAssuntos);
    var txt = "";
    for(var i=0; i < dadosSubAssuntos.length; i++){
        //@ VARIAVEIS
        var aux  = dadosSubAssuntos[i]['COD'].toUpperCase();
        var aux2 = nm.toUpperCase();

        //@ CONDICIONAL
        if(aux.indexOf(aux2) > -1){
            txt +=                          '<tr id="'+dadosSubAssuntos[i]['COD']+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal">';                          
            txt +=                              '<td>'+dadosSubAssuntos[i]['COD']+'</td>'; 
            txt +=                          '</tr>';  
        }
    }    
    //@ APPEND HTML NA TABELA
    $("#buscaSubAssuntos").html(txt);
  }

  
  function busca_obras_nome(nm){
    var id_campo = "S0_txt_obra_sol";
    console.log("OBEJTO DADOS2: ", dadosObras);
    var txt = "";
    for(var i=0; i < dadosObras.length; i++){
        //@ VARIAVEIS
        var aux  = dadosObras[i]['COD'].toUpperCase();
        var aux2 = nm.toUpperCase();

        //@ CONDICIONAL
        if(aux.indexOf(aux2) > -1){
            txt +=                          '<tr id="'+dadosObras[i]['COD']+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal" >'; 
            txt +=                              '<td>'+dadosObras[i]['COD']+'</td>';
            //txt +=                              '<td>'+dadosObras[i]['NOME']+'</td>'; 
            txt +=                          '</tr>';  
        }
    }    
    //@ APPEND HTML NA TABELA
    $("#buscaObras").html(txt);
  }

  function busca_obras_cod(cod){
    var id_campo = "S0_txt_obra_sol";
    console.log("OBEJTO DADOS2: ", dadosObras);
    var txt = "";
    for(var i=0; i < dadosObras.length; i++){
        //@ VARIAVEIS
        var aux  = dadosObras[i]['COD'].toUpperCase();
        var aux2 = cod.toUpperCase();

        //@ CONDICIONAL
        if(aux.indexOf(aux2) > -1){
            txt +=                          '<tr id="'+dadosObras[i]['COD']+'" onclick="selec_itens(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal" >'; 
            txt +=                              '<td>'+dadosObras[i]['COD']+'</td>';
            txt +=                              '<td>'+dadosObras[i]['NOME']+'</td>'; 
            txt +=                          '</tr>';  
        }
    }    
    //@ APPEND HTML NA TABELA
    $("#buscaObras").html(txt);
  }
  //busca_user_cod
  //busca_user_nome
  function busca_user_nome(nm){
    var id_campo = "S0_txt_resp_sol";
    console.log("OBEJTO DADOS2: ", dadosUsers);
    var txt = "";
    for(var i=0; i < dadosUsers.length; i++){
        //@ VARIAVEIS
        var aux  = dadosUsers[i]['NOME'].toUpperCase();
        var aux2 = nm.toUpperCase();

        //@ CONDICIONAL
        if(aux.indexOf(aux2) > -1){
            txt +=                          '<tr id="'+dadosUsers[i]["COD"]+';'+dadosUsers[i]["NOME"]+'" onclick="selec_user(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal" >'; 
            txt +=                              '<td>'+dadosUsers[i]['COD']+'</td>';
            txt +=                              '<td>'+dadosUsers[i]['NOME']+'</td>'; 
            txt +=                          '</tr>';  
        }
    }    
    //@ APPEND HTML NA TABELA
    $("#buscaUsers").html(txt);
  }

  function busca_user_cod(cod){
    var id_campo = "S0_txt_resp_sol";
    console.log("OBEJTO DADOS2: ", dadosUsers);
    var txt = "";
    for(var i=0; i < dadosUsers.length; i++){
        //@ VARIAVEIS
        var aux  = dadosUsers[i]['COD'].toUpperCase();
        var aux2 = cod.toUpperCase();

        //@ CONDICIONAL
        if(aux.indexOf(aux2) > -1){
            txt +=                          '<tr id="'+dadosUsers[i]["COD"]+';'+dadosUsers[i]["NOME"]+'" onclick="selec_user(this.id,'+id_campo+');" style="cursor:pointer;" data-dismiss="modal" >'; 
            txt +=                              '<td>'+dadosUsers[i]['COD']+'</td>';
            txt +=                              '<td>'+dadosUsers[i]['NOME']+'</td>'; 
            txt +=                          '</tr>';  
        }
    }    
    //@ APPEND HTML NA TABELA
    $("#buscaUsers").html(txt);
  }
  function getDateNow(tp){
	var data = new Date();
	var a = data.getFullYear();
	var m = data.getMonth()+1;
	var d = data.getDate();

	var h = data.getHours();
	var mn = data.getMinutes();
	var s = data.getSeconds();

		if(m < 10){
			m = "0"+m;
		}

		if(d < 10){
			d = "0"+d;
		}

		if(h < 10){
			h = "0"+h;
		}

		if(mn < 10){
			mn = "0"+mn;
		}

		if(s < 10){
			s = "0"+s;
		}
        if(tp == "tds"){
            return String(d)+'/'+String(m)+'/'+String(a)+' '+String(h)+':'+String(mn)+':'+String(s);
        }else if(tp=="dt"){
            return String(d)+'/'+String(m)+'/'+String(a);
        }else if(tp=="hr"){
            return String(h)+':'+String(mn)+':'+String(s);
        }
		
}

function newMessage(gb){
	var obj = {
		'message':function(){
			var arrRetorno = new Array();
				for(var key = 0; key < gb.mensagens.length; key++){
					arrRetorno.push({
						'typeBox':gb.mensagens[key].typeBox,						
						'nome':gb.mensagens[key].user,
						'data':gb.mensagens[key].data,
						'message':gb.mensagens[key].msg,
						'actionMSG':gb.mensagens[key].actionMSG
					});
				}
			return arrRetorno;
		}
	}

	var template = `
		{{#message}}
			<div class="message-box {{typeBox}}">
				<div class="row">
					<div class="col-md-12">
						<div class="message-action">
							<span>{{actionMSG}}</span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 ">
						<div class="pull-left header-message">
							<span>{{nome}}&nbsp&nbsp{{data}}</span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<span>{{message}}</span>
					</div>
				</div>
			</div>
		{{/message}}
	`;

	return Mustache.render(template,obj);
}

  function sendObservation(){

	    var n = wdkAddChild('notificacaoQuadro');
	    var obs = $('#S1_tex_descSolicitacao').val();

        $("#msg___"+n).val(obs);
        $("#userLogado___"+n).val(user);
        $("#idUser___"+n).val(idUser);
        $("#dataMsg___"+n).val(getDateNow("tds"));
        $("#typeBox___"+n).val("owner pull-left");
        $("#hashTicket___"+n).val($('#hid_hashProcesso').val());
        $("#actionMSG___"+n).val('Solicitação');

		if(obs != '' && obs != null){
			globalMsg.mensagens.push({
				msg:obs,
				user:user,
				idUser:idUser,
				data:getDateNow("tds"),
				typeBox:"owner pull-left",
				hashTicket:$('#hid_hashProcesso').val(),
				actionMSG:'Solicitação'
			});

			globalChats.mensagens.push({
				msg:obs,
				user:user,
				idUser:idUser,
				data:getDateNow("tds"),
				typeBox:"owner pull-left",
				hashTicket:$('#hid_hashProcesso').val(),
				actionMSG:'Solicitação'
			});

			$('#chatSolicitacao').children().remove();
			$('#chatSolicitacao').html(newMessage(globalChats));

			var totalHeight = 0;

				$("#chatSolicitacao").children().each(function(){
				    totalHeight = totalHeight + $(this).outerHeight(true);
				});

				$("#chatSolicitacao").scrollTop(totalHeight);	

			$('#S1_tex_descSolicitacao').val('');
            
            
            //Grava DATASET - VIA WEBSERVICE DE CRIAR REGISTRO DE FORMULARIO (form_mensagens_chamados)

           
		}else{
			FLUIGC.toast({
				title:'Ops!',
				message:'Adicione uma mensagem antes de enviar o comentario',
				type:'info'
			});
		}	
}




function sendObservationResolucao(){
    console.log("ASDASD");
	var obs = $('#S2_tex_descSolucao').val();
		if(obs != '' && obs != null){



            var n = wdkAddChild('notificacaoQuadro');

            if($('#S1_tex_descSolicitacao').val() != ""){
                var obs = $('#S1_tex_descSolicitacao').val();
                
            }else{
                var obs = $('#S2_tex_descSolucao').val();
            }
            

    
            $("#msg___"+n).val(obs);
            $("#userLogado___"+n).val(user);
            $("#idUser___"+n).val(idUser);
            $("#dataMsg___"+n).val(getDateNow("tds"));
            $("#typeBox___"+n).val("owner pull-right");
            $("#hashTicket___"+n).val($('#hid_hashProcesso').val());
            $("#actionMSG___"+n).val('Resolução');


            
			globalMsg.mensagens.push({
				msg:obs,
				user:user,
				idUser:idUser,
				data:getDateNow("tds"),
				typeBox:"other pull-right",
				hashTicket:$('#hid_hashProcesso').val(),
				actionMSG:'Resolução'
			});

			globalChats.mensagens.push({
				msg:obs,
				user:user,
				idUser:idUser,
				data:getDateNow("tds"),
				typeBox:"other pull-right",
				hashTicket:$('#hid_hashProcesso').val(),
				actionMSG:'Resolução'
			});

			$('#chatResolucao').children().remove();
			$('#chatResolucao').html(newMessage(globalChats));

			var totalHeight = 0;

				$("#chatResolucao").children().each(function(){
				    totalHeight = totalHeight + $(this).outerHeight(true);
				});

				$("#chatResolucao").scrollTop(totalHeight);	

			$('#S2_tex_descSolucao').val('');
			// var obj = { 
			// 	"documentDescription": "newcard", 
			// 	"parentDocumentId": 13640, 
			// 	"version": 1000, 
			// 	"inheritSecurity": false, 
			// 	"attachments": "", 
			// 	"formData": [ 
			// 			{ 
			// 				"name": "macroName", 
			// 				"value": "Macro TESTE REST" 
			// 			}, { 
			// 				"name": "macroCod", 
			// 				"value": btoa("Macro TESTE REST") 
			// 			}
			// 		] 
			// };

		}else{
			FLUIGC.toast({
				title:'Ops!',
				message:'Adicione uma mensagem antes de enviar o comentario',
				type:'info'
			});
		}
}

function sendObservationValidacao(){
	var obs = $('#S3_tex_descValidacao').val();
	
	
    var n = wdkAddChild('notificacaoQuadro');

    $("#msg___"+n).val(obs);
    $("#userLogado___"+n).val(user);
    $("#idUser___"+n).val(idUser);
    $("#dataMsg___"+n).val(getDateNow("tds"));
    $("#typeBox___"+n).val("owner pull-left");
    $("#hashTicket___"+n).val($('#hid_hashProcesso').val());
    $("#actionMSG___"+n).val('Solicitação');
    
    
    
		if(obs != '' && obs != null){
			globalMsg.mensagens.push({
				msg:obs,
				user:user,
				idUser:idUser,
				data:getDateNow("tds"),
				typeBox:"owner pull-left",
				hashTicket:$('#hid_hashProcesso').val(),
				actionMSG:'Validação'
			});

			globalChats.mensagens.push({
				msg:obs,
				user:user,
				idUser:idUser,
				data:getDateNow("tds"),
				typeBox:"owner pull-left",
				hashTicket:$('#hid_hashProcesso').val(),
				actionMSG:'Validação'
			});

			$('#chatValidacao').children().remove();
			$('#chatValidacao').html(newMessage(globalChats));

			var totalHeight = 0;

				$("#chatValidacao").children().each(function(){
				    totalHeight = totalHeight + $(this).outerHeight(true);
				});

				$("#chatValidacao").scrollTop(totalHeight);	

			$('#S3_tex_descValidacao').val('');
		}
}
function showChats(){
    var consulta;
    var chats = new Object();
        chats.mensagens = new Array();
        /*
    if(atividade==5){
        var id_user = $("#hid_idSolicitante").val();
        var incidente = $("#hid_inci_sel").val();

        var c1 = DatasetFactory.createConstraint("hid_idSolicitante", id_user, id_user, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("hid_inci_sel", incidente, incidente, ConstraintType.MUST);      
        var constraints   = new Array(c1,c2);
        var dados = DatasetFactory.getDataset('ds_Chamados_FIC3',null,constraints,null);
        console.log("CHAMADOS ANTERIORES: ",dados.values);
        if(dados.values.length>0){
            var id = dados.values.length - 1;
            for(var i=0; i<dados.values.length;i++){
                console.log("id values: ", i);
                if(dados.values[i]["hid_hashProcesso"]!="" && dados.values[i]["hid_hashProcesso"]!=null && dados.values[i]["hid_hashProcesso"]!=undefined && dados.values[i]["hid_numSolicitacao"]!=""){
                    var hash = dados.values[i]["hid_hashProcesso"];
                    var obj1 = {
                        'dataset':'ds_mensagens_chamado',
                        'campos':null,
                        'ordem':null,
                        'filtros':[{
                            'campo':'hashTicket',
                            'initial':hash,
                            'final':hash,
                            'tipo':'MUST',
                            'like':false
                        }]
                    }
                    var consulta1 = getDados(obj1);
                    console.log("MENSAGENS A MOSTRAR CHAMADOS ANTERIORES: ", consulta1);
                    

                    for(var key in consulta1.values){
                        var action = consulta1.values[key].actionMSG + " - Num.Fluig: " +dados.values[i]["hid_numSolicitacao"];
                        console.log("ACTION: ", action);
                        chats.mensagens.push({
                            msg:consulta1.values[key].comentario,
                            user:consulta1.values[key].nomeUsuarioComentario,
                            idUser:consulta1.values[key].idUsuarioComentario,
                            data:consulta1.values[key].dataComentario,
                            typeBox:consulta1.values[key].tipoComentario,
                            hashTicket:consulta1.values[key].hashTicket,
                            actionMSG:action
                        });

                        globalChats.mensagens.push({
                            msg:consulta1.values[key].comentario,
                            user:consulta1.values[key].nomeUsuarioComentario,
                            idUser:consulta1.values[key].idUsuarioComentario,
                            data:consulta1.values[key].dataComentario,
                            typeBox:consulta1.values[key].tipoComentario,
                            hashTicket:consulta1.values[key].hashTicket,
                            actionMSG:action
                        });
                    }
                }
                
                id = id - 1;
            }            
        }
    }*/
	var hash = $('#hid_hashProcesso').val();
	var obj = {
		'dataset':'ds_mensagens_chamado',
		'campos':null,
		'ordem':null,
		'filtros':[{
			'campo':'hashTicket',
			'initial':hash,
			'final':hash,
			'tipo':'MUST',
			'like':false
		}]
	}

	consulta = getDados(obj);
    console.log("MENSAGENS A MOSTRAR: ", consulta);
	

		for(var key in consulta.values){
			chats.mensagens.push({
				msg:consulta.values[key].comentario,
				user:consulta.values[key].nomeUsuarioComentario,
				idUser:consulta.values[key].idUsuarioComentario,
				data:consulta.values[key].dataComentario,
				typeBox:consulta.values[key].tipoComentario,
				hashTicket:consulta.values[key].hashTicket,
				actionMSG:consulta.values[key].actionMSG
			});

			globalChats.mensagens.push({
				msg:consulta.values[key].comentario,
				user:consulta.values[key].nomeUsuarioComentario,
				idUser:consulta.values[key].idUsuarioComentario,
				data:consulta.values[key].dataComentario,
				typeBox:consulta.values[key].tipoComentario,
				hashTicket:consulta.values[key].hashTicket,
				actionMSG:consulta.values[key].actionMSG
			});
		}
		
		$('.chat-field').each(function(){
			$(this).children().remove();
		});

		$('.chat-field').each(function(){
			$(this).html(newMessage(chats));
		});
}

function C_modalAnexos(tp){
    var hash 		= $("#hid_hashProcesso").val().trim();   
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
    }else if(tp == "S1"){
        var modal = FLUIGC.modal({
            title: 'ANEXAR - Documentos Resolução',
            content: C_ListaAnexos(obj,tp),
            id: 'idModalAnexos_S1',
        }, function(err, data) {
            if(err) {
                
            } else {
                // do something with data
                C_upload(obj);
            }
        });
    }else if(tp == "S2"){
        var modal = FLUIGC.modal({
            title: 'ANEXAR - Documentos Validação',
            content: C_ListaAnexos(obj,tp),
            id: 'idModalAnexos_S2',
        }, function(err, data) {
            if(err) {
                
            } else {
                // do something with data
                C_upload(obj);
            }
        });
    }    
    
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
function C_getField(id){
    var mode = $("#hid_form_mod").val();
    if(mode=="VIEW"){
        return $("#"+id).text().trim();
    } else {
        return $("#"+id).val().trim();
    }
}
function C_getObjAnexos(atividade){
    //var atividade = $("#num_ativ").val();
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
                    return false
                }
            }
        }else if(atividade == "S1"){
            var hid_objAnexos = C_getField("hid_objAnexos_S1");
            if(hid_objAnexos==undefined){
                return false
            }else{
                if(typeof hid_objAnexos=="string"){
                    return JSON.parse(hid_objAnexos)
                }else{
                   return false
                }
            }
        }else if(atividade == "S2"){
            var hid_objAnexos = C_getField("hid_objAnexos_S2");
            if(hid_objAnexos==undefined){
                return false
            }else{
                if(typeof hid_objAnexos=="string"){
                    return JSON.parse(hid_objAnexos)
                }else{
                    return false
                }
            }
        }
        
    }catch(e){
        return false
    }
    
}
function C_GetDownloadURL(documentId){
    var that	=	this;
    var x = false;
    $.ajax({
        async : false,
        type : "GET",
        contentType: "application/json",
        url : '/api/public/2.0/documents/getDownloadURL/'+documentId,
        error: function() {
            return false;
        },
        success: function(data) {
            x =	data.content;		
        }
    });
    return x;
    
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
function V_ListaAnexos(obj,p,atv){
    
    var that = this;
    
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
        var mode = $("#hid_form_mod").val();
        switch (atv) {
            case "S0":            
                if(mode=="VIEW"){
                    var fileName = $("#hid_filenames_S0").text();
                }else{
                    var fileName = $("#hid_filenames_S0").val();
                }
                break;
            case "S1":
                
                if(mode=="VIEW"){
                    var fileName = $("#hid_filenames_S1").text();
                }else{
                    var fileName = $("#hid_filenames_S1").val();
                }
                break;
            case "S2":
                if(mode=="VIEW"){
                    var fileName = $("#hid_filenames_S2").text();
                }else{
                    var fileName = $("#hid_filenames_S2").val();
                }
                break;
            case "S3":
                if(mode=="VIEW"){
                    var fileName = $("#hid_filenames_S3").text();
                }else{
                    var fileName = $("#hid_filenames_S3").val();
                }
                break;
            case "S4":
                if(mode=="VIEW"){
                    var fileName = $("#hid_filenames_S4").text();
                }else{
                    var fileName = $("#hid_filenames_S4").val();
                }
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
                
            switch (atividade) {
                case "0":
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
                case "9":
                    
                        o.remove		=	remove
                        o.pontero		=	pointer
                        o.hide			=	""
                        btnHide			=	""
                    
                    
                    break;
                case "19":
                    
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
function getPastaAnexos(){
    var PRODUCAO = false;
	if(PRODUCAO){
		var id = '380';
	}else{
		var id = '380';//'150';
	}
	return(id);
}
function carregaArray(){
    var folders = [{
        id: "FIC3 - CHAMADOS ANEXOS",
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
        id:  $("#S0_txt_dt_sol").val().split('/')[2],
        status: false,
        numPasta: false,
        tipoDoc: false,
        unique: false
    },
    {
        id: SOLVS.mesNome($("#S0_txt_dt_sol").val().split('/')[1]-1),
        status: false,
        numPasta: false,
        tipoDoc: false,
        unique: false
    },
    {
        id: $("#S0_txt_dt_sol").val().split('/')[0],
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
function C_upload(obj){
    console.log("ENTROU AQUI: ", obj);
    var that	 =	this;
    var processo =	C_hashAnexos(obj)
    var	parentId =	JSON.parse($("#hid_folders").val())[5].numPasta
    var arr = $("#hid_etapa").val();
    var data_file;   
    if(atividade == "0" || atividade == "4"||atividade == "5"||atividade == "9"||atividade == "19"){
        $('#fileupload').fileupload({
            dataType: 'json',
            done: function (e, data) {
                $('#idModalAnexos_S0').modal('toggle');
                //window.FAT.C_startLoading()
                console.log("AQUI DATA: ", data);       
                $.each(data.result.files, function (index, file) {
                    /*
                    var obj = {
                        "description": arr,
                        "parentId": parentId,
                        "downloadEnabled": true,
                        "attachments": [{
                            "fileName": file.name,
                        }]
                    };
                    createCard(obj);

                    */
                    /*
                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;

                    data_file = JSON.stringify({
                        "description": arr,
                        "parentId": parentId,
                        "downloadEnabled": true,
                        "attachments": [{
                            "fileName": file.name
                        }],
                    }),

                    xhr.open("POST", "/2.0/documents/createDocument");
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("cache-control", "no-cache");
                    xhr.setRequestHeader("Postman-Token", "472d8304-284e-47c6-a257-1e0b939cf323");

                    xhr.send(data_file);
                    */
                   console.log("DESCRICAO: ", arr);
                   console.log("PARANTEID: ", parentId);
                   console.log("ANEXOS: ", file.name);
                   
                   console.log("RETORNO: ", C_GetDownloadURL(parentId));
                   //.log("DESCRICAO: ", arr);

                    $.ajax({
                        async : true,
                        type : "POST",
                        contentType: "application/json",
                        url : 'http://fluigteste.compasa.com.br:8080/api/public/ecm/document/createDocument',
        
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
                            //C_modalAnexos(processo);
                            
                            
                            //window.FAT.C_stopLoading()
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
                            //C_validaAnexos()
                            
                            //window.FAT.C_stopLoading()
                        },
                    });
                });
            }
        });
    }
    
    
}
function C_setObjAnexos(obj,name_file){
    var that = this;
    
    if(SOLVS.validaObj(obj)){
        
        if(atividade == "0" || atividade == "4"||atividade == "5"||atividade == "9"||atividade == "19"){
            var hid_objAnexos = C_getObjAnexos('S0')
            console.log("SET: ", typeof hid_objAnexos);
            if(typeof hid_objAnexos!="object"){
                hid_objAnexos = new Array()
            }
            hid_objAnexos.push(obj)
            $("#hid_objAnexos_S0").val(JSON.stringify(hid_objAnexos))
            return true
        }
        
    }else{
        return false	
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