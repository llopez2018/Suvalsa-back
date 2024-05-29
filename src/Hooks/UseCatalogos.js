import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, initTE, Toast } from "tw-elements";
import {
  crearTable,
  actualizarTabla
} from "../componentes/Tables/TableUtil";

const useCatalogo = ({idToast, columnsData, optionsTable, getData, idTable, idModalDelete, pathNavTo, pathNavBack, deleteData}) => {
  initTE({ Modal, Toast });

  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [idSelected, setIdSelected] = useState();

  const navegar = useNavigate();

  async function GetRowsData() {
    let rowsNew = [];
    setLoading(true);
    console.log("obteniendo Datos de ws");
    rowsNew = await getData();
    console.log("ROWS DATA: ", rowsNew);
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
    const table = await crearTable({
      idTable: idTable,
      columnsData: columnsData,
      options: optionsTable
    });
    console.log("table recover: ", table);
    const rowsData = await GetRowsData();
    await actualizarTabla({
      table: table,
      columnsData: columnsData,
      rowsData: rowsData,
      options: optionsTable
    });
    console.log("tabla actualizada");
  }

  function actionAlta() {
    console.log("action click alta");
    navegar(pathNavTo, {
      state: { urlBack: pathNavBack }
    });
  }

  function actionReporte() {
    console.log("action click Reporte");
  }

  function actionEliminar() {
    console.log("action click Eliminar");
    const myModal = new Modal(document.getElementById(idModalDelete));
    myModal.show();
  }

  async function confirmarEliminacion() {
    setLoading(true);
    console.log(idSelected);
    await deleteData(idSelected);
    console.log("Registro eliminado");
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
      action: actionAlta,
      disabled: false,
      type: "submit",
      label: "Alta"
    },
    buttonSecondary: {
      action: actionReporte,
      disabled: false,
      type: "button",
      label: "Reporte"
    },
    buttonTertiary: {
      action: actionEliminar,
      disabled: !rowSelected,
      type: "button",
      label: "Eliminar"
    }
  };

  return {
    loading,
    idToast,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetRowsData,
    confirmarEliminacion,
    buttonsGroup
  };
};

export const useCatalogoSelect = ({columnsData, optionsTable, getData, idModal, callBackAction}) => {
  initTE({ Modal });

  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [datasSelected, setDatasSelected] = useState();
  const [idSelected, setIdSelected] = useState();

  async function GetRowsData() {
    let rowsNew = [];
    setLoading(true);
    console.log("obteniendo Datos de ws");
    rowsNew = await getData();
    console.log("ROWS DATA: ", rowsNew);
    setLoading(false);
    return rowsNew;
  }

  const SelectRowAction = (e) => {
    console.log(e.selectedRows, e.selectedIndexes, e.allSelected);
    if (e.selectedRows.length >= 1) {
      setRowSelected(true);
      setDatasSelected(e.selectedRows);
      setIdSelected(e.selectedRows[0].id);
    } else {
      setRowSelected(false);
      setDatasSelected(null);
      setIdSelected(null);
    }
  };

  // async function reloadTable() {
  //   setRowSelected(false);
  //   const table = await crearTable({
  //     idTable: idTable,
  //     columnsData: columnsData,
  //     options: optionsTable
  //   });
  //   console.log("table recover: ", table);
  //   const rowsData = await GetRowsData();
  //   await actualizarTabla({
  //     table: table,
  //     columnsData: columnsData,
  //     rowsData: rowsData,
  //     options: optionsTable
  //   });
  //   console.log("tabla actualizada");
  // }

  function actionCancelar() {
    const myModal = new Modal(document.getElementById(idModal));
    console.log(myModal)
    if (myModal) Modal.getOrCreateInstance(myModal).hide();
  }

  function actionAgregar(){
    callBackAction(datasSelected)
    actionCancelar();
  }

  const buttonsGroup = {
    buttonPrimary: {
      action: actionAgregar,
      disabled: !rowSelected ,
      type: "button",
      label: "Agregar",
      modalDismiss: true
    },
    buttonSecondary: {
      action: actionCancelar,
      disabled: false,
      type: "button",
      label: "Cancelar",
      modalDismiss: true
    },
  };

  return {
    loading,
    columnsData,
    optionsTable,
    SelectRowAction,
    datasSelected,
    GetRowsData,
    buttonsGroup
  };
};

export default useCatalogo;
