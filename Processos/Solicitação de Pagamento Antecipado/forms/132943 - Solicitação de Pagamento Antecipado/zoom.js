async function zoom(field, btnEl) {
  const showModal = getModalZoom();

  if (getFormMode() === "VIEW") return;

  if (field === "banco") {
    if (getState() == 0 || getState() == 1 || getState() == 3 || getState() == 4) return;
    const filial = document.querySelector("#filial").value;
    if (!filial) {
      FLUIGC.toast({
        message: "Informe a filial",
        type: "warning"
      });
      return;
    }

    const config = {
      title: "Banco",
      description: "Selecione uma banco abaixo",
      selectedClass: "info",
      dataset: "dsv_contas_bancos_protheus",
      displayFields: [
        {
          label: "Filial",
          field: "A6_FILIAL"
        },
        {
          label: "Banco",
          field: "A6_NREDUZ"
        },
        {
          label: "Conta",
          field: "A6_NUMCON"
        },
        {
          label: "Agência",
          field: "A6_AGENCIA"
        }
      ],
      resultFields: ["A6_COD", "A6_FILIAL", "A6_NREDUZ", "A6_NUMCON", "A6_AGENCIA"],
      filters: [
        {
          field: "D_E_L_E_T_",
          initialValue: "*",
          finalValue: "*",
          type: ConstraintType.MUST_NOT
        },
        {
          field: "A6_BLOCKED",
          initialValue: "1",
          finalValue: "1",
          type: ConstraintType.MUST_NOT
        },
        {
          field: "A6_FILIAL",
          initialValue: filial,
          finalValue: filial,
          type: ConstraintType.MUST
        }
      ],
      orderBy: ["A6_NREDUZ", "A6_NUMCON"],
      searchField: ["A6_NREDUZ", "A6_NUMCON"],
      upperCase: false,
      preFetch: true,
      multiSelect: false,
      limit: 10
    };

    const banco = await showModal(config);
    if (!banco) return;

    document.querySelector("#cod_banco_compasa").value = banco.A6_COD;
    document.querySelector("#banco_compasa").value = banco.A6_NREDUZ;
    document.querySelector("#agencia_compasa").value = banco.A6_AGENCIA;
    document.querySelector("#conta_compasa").value = banco.A6_NUMCON;
  }
}
