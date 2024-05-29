import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObtenerFamilias, EliminarFamilia } from "../../../Apis/FetchFamilias";
import { Modal, initTE, Toast } from "tw-elements";
import {
  crearTable,
  actualizarTabla
} from "../../../componentes/Tables/TableUtil";

const useCatFamilias = () => {
  initTE({ Modal, Toast });

  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [idSelected, setIdSelected] = useState();

  const navegar = useNavigate();
  const idToast = "toastFam";

  const tituloCatFamilias = "Catálogo de Familias de Clientes";

  const formatCell = (cell, value) => {
    cell.classList.add("hidden");
  };
  const columnsData = [
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Nombre", field: "nombre", sort: true },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

  const optionsTable = { ofText: "Familias de" };
  //const optionsTable= { noFoundMessage: 'Datos no encontrados', ofText: 'Visitas de', loadingMessage: 'Cargando resultados', }

  async function GetFamilias() {
    let rowsNew = [];
    setLoading(true);
    console.log("obteniendo Datos de ws Familias");
    const familias = await ObtenerFamilias();
    console.log("lista de Familias: ", familias);

    if (familias) {
      rowsNew = familias.map((resp) => ({
        clave: resp.clave,
        id: resp.id,
        nombre: resp.nombre
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
      idTable: "tablaFamilias",
      columnsData: columnsData,
      options: optionsTable
    });
    console.log("table recover: ", table);
    const rowData = await GetFamilias();
    await actualizarTabla({
      table: table,
      columnsData: columnsData,
      rowsData: rowData,
      options: optionsTable
    });
    console.log("tabla actualizada");
  }

  function AltaFamilia() {
    console.log("action click alta Familia");
    navegar("/suvalsa/catalogos/familias/alta", {
      state: { urlBack: "/suvalsa/catalogos/familias" }
    });
  }
  function ReporteFamilias() {
    console.log("action click Reporte Familia");
  }
  function EliminarFam() {
    console.log("action click Eliminar Familia");
    const myModal = new Modal(document.getElementById("staticBackdrop"));
    myModal.show();
  }

  async function confirmarEliminacion() {
    setLoading(true);
    console.log(idSelected);
    await EliminarFamilia(idSelected);
    console.log("familia eliminada");
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
      action: AltaFamilia,
      disabled: false,
      type: "submit",
      label: "Alta"
    },
    buttonSecondary: {
      action: ReporteFamilias,
      disabled: false,
      type: "button",
      label: "Reporte"
    },
    buttonTertiary: {
      action: EliminarFam,
      disabled: !rowSelected,
      type: "button",
      label: "Eliminar"
    }
  };

  return {
    loading,
    idToast,
    tituloCatFamilias,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetFamilias,
    confirmarEliminacion,
    buttonsGroup
  };
};

export default useCatFamilias;
