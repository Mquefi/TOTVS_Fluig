function buscarComplementos() {
  const complemento = parent.document.querySelector(".history-block");
  const historico = complemento.cloneNode(true);

  historico.querySelectorAll("img").forEach((el) => el.remove());

  if (historico.innerHTML == "") return "";
  return historico.outerHTML;
}

async function enviarEmail(complementos, descricao) {
  const data = {
    to: "sysaid@compasa.com.br",
    from: "fluig@compasa.com.br",
    subject: "ABERTURA DE CHAMADO FLUIG - PRÉ-NOTA DE ENTRADA",
    templateId: "tmpl_abrir_chamado_processos",
    dialectId: "pt_BR",
    param: {
      PROCESS_ID: getProcessId(),
      PROCESS_INSTANCE_ID: getProcess(),
      STATE: getState(),
      DESCRIPTION: descricao,
      HISTORY: complementos,
    },
  };

  const url = "/api/public/alert/customEmailSender";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) return response.json();

  const error = await response.text();
  throw new Error(error);
}

function abrirModalChamado(event) {
  const content = /*html*/ `
  <div class="row">
  	<div class="col-xs-12 col-md-12">
      <div class="form-group">
          <label for="descricao" class="form-label">Descrição</label>
          <textarea  id="descricao" class="form-control chamado-descricao"></textarea>
      </div>
  </div>
  </div>
  `;

  const modal = FLUIGC.modal(
    {
      title: "Chamado",
      content,
      size: "full",
      id: "modal-chamado",
      actions: [
        {
          label: "Abrir chamado",
          bind: "data-abrir-chamado",
        },
        {
          label: "Cancelar",
          autoClose: true,
        },
      ],
    },
    function (err) {
      if (err) {
        console.log(err);
        return;
      }

      const $modalBody = document.querySelector("#modal-chamado");
      const $descricao = $modalBody.querySelector(".chamado-descricao");
      const editor = FLUIGC.richeditor($descricao, { height: "280" });
      const $btnAbrirChamado = $modalBody.querySelector("[data-abrir-chamado]");
      $btnAbrirChamado.onclick = async function () {
        const descricao = editor.getData();
        const complementos = buscarComplementos();

        const load = FLUIGC.loading($modalBody, {
          textMessage: "Enviando chamado...",
        });
        try {
          load.show();
          await enviarEmail(complementos, descricao);
          modal.remove();
          FLUIGC.toast({
            message: "Chamado enviado com sucesso!",
            type: "success",
          });
        } catch (error) {
          FLUIGC.toast({
            message: "Erro ao abrir chamado",
            type: "danger",
          });
          console.error(error);
        } finally {
          load.hide();
        }
      };
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const $row = document.createElement("div");
  $row.classList.add("row", "fs-md-margin-bottom");

  const $btnAbrirModal = document.createElement("buttom");
  $btnAbrirModal.classList.add("btn", "btn-default", "pull-right");
  $btnAbrirModal.innerText = "Abrir Chamado";
  $btnAbrirModal.onclick = abrirModalChamado;
  $row.append($btnAbrirModal);

  document.forms[0].prepend($row);
});
