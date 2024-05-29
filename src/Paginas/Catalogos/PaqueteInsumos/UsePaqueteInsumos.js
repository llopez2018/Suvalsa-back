import { useState } from "react";

const useCatPaqInsumos = () => {
  const [rowSelected, setRowSelected] = useState(false);
  const tituloCatPaqInsumos = "Catálogo Paquete de Insumos";
  const columnsData = [
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Concepto", field: "concepto", sort: true },
    { label: "Dato - Número - Código", field: "datonumerocodigo", sort: true },
    { label: "Status", field: "status", sort: true },
    { label: "Observaciones", field: "observaciones", sort: true }
  ];

  const optionsTable = { ofText: "Paquetes de" };
  //const optionsTable= { noFoundMessage: 'Datos no encontrados', ofText: 'Visitas de', loadingMessage: 'Cargando resultados', }

  async function CrearPaqInsumos() {
    return [
      {
        clave: 1,
        concepto: "CALLE 1",
        datonumerocodigo: "JOSE VASCONCELOS 39 EDIF 1 DEPTO 4",
        status: "A",
        observaciones: "DIS. FISCAL"
      },
      {
        clave: 1,
        concepto: "CALLE 1",
        datonumerocodigo: "BENITO JUAREZ MZ-62,L-5",
        status: "O",
        observaciones: "Cult+Cep"
      },
      {
        clave: 2,
        concepto: "CALLE 2",
        datonumerocodigo: "",
        status: "O",
        observaciones: ""
      },
      {
        clave: 3,
        concepto: "COLONIA",
        datonumerocodigo: "COL. SANTISIMA TRINIDAD",
        status: "A",
        observaciones: "DIF. FISCAL"
      }
    ];
  }

  async function GetPaqInsumos() {
    let rowsNew = [];
    const datosNumeros = await CrearPaqInsumos();
    //await ObtenerFrecuencias();
    console.log("lista de Paquetes de insumos: ", datosNumeros);

    if (datosNumeros) {
      rowsNew = datosNumeros.map((res) => ({
        clave: res.clave,
        concepto: res.concepto,
        datonumerocodigo: res.datonumerocodigo,
        status: res.status,
        observaciones: res.observaciones
      }));
    }
    return rowsNew;
  }

  const SelectRowAction = (e) => {
    console.log(e.selectedRows, e.selectedIndexes, e.allSelected);
    if (e.selectedRows.length >= 1) {
      setRowSelected(true);
    } else {
      setRowSelected(false);
    }
  };

  function AltaPaqInsumos() {
    console.log("action click alta Paquetes de insumos");
  }
  function ReportePaqInsumos() {
    console.log("action click Reporte Paquetes de insumos");
  }
  function EliminarPaqInsumos() {
    console.log("action click Eliminar Paquetes de insumos");
  }

  const buttonsGroup = {
    buttonPrimary: {
      action: AltaPaqInsumos,
      disabled: false,
      type: "submit",
      label: "Alta"
    },
    buttonSecondary: {
      action: ReportePaqInsumos,
      disabled: !rowSelected,
      type: "button",
      label: "Reporte"
    },
    buttonTertiary: {
      action: EliminarPaqInsumos,
      disabled: !rowSelected,
      type: "button",
      label: "Eliminar"
    }
  };

  return {
    tituloCatPaqInsumos,
    columnsData,
    optionsTable,
    SelectRowAction,
    GetDatosNumeros: GetPaqInsumos,
    buttonsGroup,
    rowSelected
  };
};

export default useCatPaqInsumos;
