import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ObtenerFrecuencias,
  EliminarFrecuencia
} from "../../../Apis/FetchCatalogos";
import { Modal, initTE, Toast } from "tw-elements";
import {
  crearTable,
  actualizarTabla
} from "../../../componentes/Tables/TableUtil";

function useCatFrecuencias() {
  initTE({ Modal, Toast });

  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [idSelected, setIdSelected] = useState();

  const navegar = useNavigate();
  const idToast = "toastFrec";

  const tituloCatFrecuencias = "Catálogo de Frecuencia de Visitas a Clientes";

  const formatCell = (cell, value) => {
    cell.classList.add("hidden");
  };

  const columnsData = [
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Frecuencia", field: "frecuencia", sort: true },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

  const optionsTable = { ofText: "Visitas de" };
  //const optionsTable= { noFoundMessage: 'Datos no encontrados', ofText: 'Visitas de', loadingMessage: 'Cargando resultados', }

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

  async function GetFrecuencias() {
    let rowsNew = [];
    setLoading(true);
    console.log("obteniendo Datos de ws Frecuencias");
    const frec = await ObtenerFrecuencias();
    console.log("lista de Frecuencias: ", frec);

    if (frec) {
      rowsNew = frec.map((frecuencia) => ({
        clave: frecuencia.clave,
        id: frecuencia.id,
        frecuencia: frecuencia.frecuencia
      }));
    }
    setLoading(false);
    return rowsNew;
  }

  async function reloadTable() {
    setRowSelected(false);
    //setDataSelected(null)
    //setIdSelected(null)
    const table = await crearTable({
      idTable: "tablaFrecuencias",
      columnsData: columnsData,
      options: optionsTable
    });
    console.log("table recover: ", table);
    const rowData = await GetFrecuencias();
    await actualizarTabla({
      table: table,
      columnsData: columnsData,
      rowsData: rowData,
      options: optionsTable
    });
    console.log("tabla actualizada");
  }

  function AltaFrecuencias() {
    console.log("action click alta Frecuencias");
    navegar("/suvalsa/catalogos/frecuencia-visitas/alta", {
      state: { urlBack: "/suvalsa/catalogos/frecuencia-visitas" }
    });
  }
  function ReporteFrecuencias() {
    console.log("action click Reporte Frecuencias");
  }
  function EliminarFrecuencias() {
    console.log("action click Eliminar Frecuencias");
    const myModal = new Modal(document.getElementById("staticBackdrop"));
    myModal.show();
  }

  async function confirmarEliminacion() {
    setLoading(true);
    console.log(idSelected);
    await EliminarFrecuencia(idSelected);
    console.log("Frec eliminada");
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
      action: AltaFrecuencias,
      disabled: false,
      type: "submit",
      label: "Alta"
    },
    buttonSecondary: {
      action: ReporteFrecuencias,
      disabled: false,
      type: "button",
      label: "Reporte"
    },
    buttonTertiary: {
      action: EliminarFrecuencias,
      disabled: !rowSelected,
      type: "button",
      label: "Eliminar"
    }
  };

  return {
    loading,
    idToast,
    tituloCatFrecuencias,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetFrecuencias,
    confirmarEliminacion,
    buttonsGroup
  };
}

export default useCatFrecuencias;
