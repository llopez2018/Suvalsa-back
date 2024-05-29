import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ObtenerNumerosDatosCtrl,
  EliminarNumerosDatosCtrl
} from "../../../Apis/FetchCatalogos";
import { Modal, initTE, Toast } from "tw-elements";
import {
  crearTable,
  actualizarTabla
} from "../../../componentes/Tables/TableUtil";

const useCatDatosNumeros = () => {
  initTE({ Modal, Toast });

  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [idSelected, setIdSelected] = useState();

  const navegar = useNavigate();
  const idToast = "toastNoDatos";

  const tituloCatNumerosDatosControl = "Catálogo de Números y Datos de Control";

  const formatCell = (cell, value) => {
    cell.classList.add("hidden");
  };

  const columnsData = [
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Concepto", field: "concepto", sort: true },
    { label: "Dato - Número - Código", field: "datonumerocodigo", sort: true },
    { label: "Status", field: "status", sort: true },
    { label: "Observaciones", field: "observaciones", sort: true },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

  const optionsTable = { ofText: "Datos y Números de" };
  //const optionsTable= { noFoundMessage: 'Datos no encontrados', ofText: 'Visitas de', loadingMessage: 'Cargando resultados', }

  async function GetDatosNumeros() {
    let rowsNew = [];
    setLoading(true);
    const datosNumeros = await ObtenerNumerosDatosCtrl();
    //await ObtenerFrecuencias();
    console.log("lista de DatosNumeros: ", datosNumeros);

    if (datosNumeros) {
      rowsNew = datosNumeros.map((res) => ({
        clave: res.clave,
        id: res.id,
        concepto: res.concepto,
        datonumerocodigo: res.dato,
        status: res.status,
        observaciones: res.notas
      }));
    }
    setLoading(false);
    return rowsNew;
  }

  const SelectRowAction = (e) => {
    console.log(e.selectedRows, e.selectedIndexes, e.allSelected);
    if (e.selectedRows.length >= 1) {
      setRowSelected(true);
      setDataSelected(e.selectedRows[0].clave);
      setIdSelected(e.selectedRows[0].id);
    } else {
      setRowSelected(false);
      setDataSelected(null);
      setIdSelected(null);
    }
  };

  async function reloadTable() {
    setRowSelected(false);
    //setDataSelected(null)
    //setIdSelected(null)
    const table = await crearTable({
      idTable: "tableDatosNumerosControl",
      columnsData: columnsData,
      options: optionsTable
    });
    console.log("table recover: ", table);
    const rowData = await GetDatosNumeros();
    await actualizarTabla({
      table: table,
      columnsData: columnsData,
      rowsData: rowData,
      options: optionsTable
    });
    console.log("tabla actualizada");
  }

  function AltaDatosNumeros() {
    console.log("action click alta Datos numeros");
    navegar("/suvalsa/catalogos/datos-y-numeros-control/alta", {
      state: { urlBack: "/suvalsa/catalogos/datos-y-numeros-control" }
    });
  }
  function ReporteDatosNumeros() {
    console.log("action click Reporte Datos numeros");
  }
  function EliminarDatosNumeros() {
    console.log("action click Eliminar Datos numeros");
    const myModal = new Modal(document.getElementById("staticBackdrop"));
    myModal.show();
  }

  async function confirmarEliminacion() {
    setLoading(true);
    console.log(idSelected);
    await EliminarNumerosDatosCtrl(idSelected);
    console.log("Datos/Numeros eliminado");
    console.log(document.getElementById(idToast));
    const myToast = document.getElementById(idToast);
    console.log(Toast.getInstance(myToast));
    Toast.getOrCreateInstance(myToast).show();
    //para volver a cargar la tabla

    console.log("recargando tabla");
    await reloadTable();
    setLoading(false);
  }

  const buttonsGroup = {
    buttonPrimary: {
      action: AltaDatosNumeros,
      disabled: false,
      type: "submit",
      label: "Alta"
    },
    buttonSecondary: {
      action: ReporteDatosNumeros,
      disabled: false,
      type: "button",
      label: "Reporte"
    },
    buttonTertiary: {
      action: EliminarDatosNumeros,
      disabled: !rowSelected,
      type: "button",
      label: "Eliminar"
    }
  };

  return {
    loading,
    idToast,
    tituloCatNumerosDatosControl,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetDatosNumeros,
    confirmarEliminacion,
    buttonsGroup
  };
};

export default useCatDatosNumeros;
