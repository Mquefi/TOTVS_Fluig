const showModal = getModalZoom();

async function zoom(field, btnEl) {
  if (getFormMode() === "VIEW") return;

  if (field === "filial") {
    if (getState() != 0 && getState() != 4 && getState() != 16) return;

    const config = {
      title: "Filial",
      description: "Selecione uma filial abaixo",
      selectedClass: "info",
      dataset: "dsv_filial_protheus",
      displayFields: [
        {
          label: "Código Grupo",
          field: "M0_CODIGO"
        },
        {
          label: "Grupo",
          field: "M0_NOME"
        },
        {
          label: "Código Filial",
          field: "M0_CODFIL"
        },
        {
          label: "Filial",
          field: "M0_FILIAL"
        }
      ],
      resultFields: ["M0_CODIGO", "M0_NOME", "M0_CODFIL", "M0_FILIAL"],
      filters: [
        {
          field: "D_E_L_E_T_",
          initialValue: "*",
          finalValue: "*",
          type: ConstraintType.MUST_NOT
        }
      ],
      orderBy: ["M0_CODIGO", "M0_CODFIL"],
      searchField: ["M0_CODFIL", "M0_FILIAL"],
      upperCase: false,
      preFetch: true,
      multiSelect: false,
      limit: 10
    };

    const filial = await showModal(config);
    if (!filial) return;
    document.querySelector("#cod_grupo_empresa").value = filial.M0_CODIGO;
    document.querySelector("#grupo_empresa").value = filial.M0_CODIGO + " - " + filial.M0_NOME;
    document.querySelector("#cod_filial").value = filial.M0_CODFIL;
    document.querySelector("#filial").value = filial.M0_CODFIL + " - " + filial.M0_FILIAL;
  }
}
