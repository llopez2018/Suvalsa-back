import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast, Modal, initTE, Select } from "tw-elements";
import { crearTable, actualizarTabla } from "../componentes/Tables/TableUtil";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const useAlta = ({idToastalta, addData, backUrl, actiosOK}) => {
    const [loading, setLoading] = useState(false);
    const [urlBack, setUrlBack] = useState("");
    const navegar = useNavigate();
  
    function actionRegresar() {
      console.log("aqui regresa al catalogo: ", urlBack);
      navegar(urlBack);
    }
  
    function actionImprimir() {
      console.log("clic imprimir contrato: ");
    }
  
    async function mostrarResultadoAlta() {
      console.log(document.getElementById(idToastalta));
      const myToastAlta = document.getElementById(idToastalta);
      console.log(Toast.getInstance(myToastAlta));
      Toast.getOrCreateInstance(myToastAlta).show();
    }
  
    async function onSubmitAlta(values, { resetForm }) {
      console.log("onsubmit....");
      setLoading(true);
      await sleep(1000);
        await addData(values);
      resetForm();
      setLoading(false);
      await mostrarResultadoAlta();
      if (actiosOK) actiosOK();
    }
  
    const buttonsGroup = {
      buttonPrimary: {
        disabled: loading,
        type: "submit",
        label: "Grabar"
      },
      buttonSecondary: {
        action: actionImprimir,
        disabled: loading,
        type: "button",
        label: "Imprimir Contrato"
      },
      buttonTertiary: {
        action: actionRegresar,
        disabled: loading,
        type: "button",
        label: `${urlBack === undefined ? "Ver Catálogo" : "Cancelar"}`
      }
    };
    
    initTE({ Input, Select });
    useEffect(() => {
      console.log("props.backUrl: ", backUrl);
      setUrlBack(backUrl);
    }, []);
  
    useEffect(() => {
      console.log("useEffect urlBack: ", urlBack);
      if (urlBack !== undefined && urlBack !== "") {
        const myToastEl = document.getElementById(idToastalta);
        myToastEl.addEventListener("hidden.te.toast", () => {
          console.log("Accion posterior al cierre del toast");
          actionRegresar();
        });
        return console.log("return useEffect ", urlBack);
      }
    }, [urlBack]);
  
    return {
      loading,
      onSubmitAlta,
      buttonsGroup
    };
}

export const useAltaTableSelected = ({
  addData,
  columnsData,
  optionsTable,
  getData,
  idTable,
  editTable,
  idModalAgregar,
  idToastalta
}) => {
  initTE({ Modal, Toast });

  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [idxSelected, setIdxSelected] = useState();
  const [rowsData, setRowsData] = useState([])

  async function GetRowsData() {
    let rowsNew = [];
    setLoading(true);
    console.log("obteniendo Datos de ws");
    rowsNew = await getData();
    console.log("ROWS DATA: ", rowsNew);
    setLoading(false);
    setRowsData(rowsNew)
    return rowsNew;
  }

  const SelectRowAction = (e) => {
    console.log(e.selectedRows, e.selectedIndexes, e.allSelected);
    if (e.selectedRows.length >= 1) {
      setRowSelected(true);
      setDataSelected(e.selectedRows[0]);
      setIdxSelected(e.selectedIndexes[0]);
    } else {
      setRowSelected(false);
      setDataSelected(null);
      setIdxSelected(null);
    }
  };

  async function reloadTable(dataTable) {
    setLoading(true)
    setRowSelected(false);
    const table = await crearTable({
      idTable: idTable,
      columnsData: columnsData,
      options: optionsTable
    });
    console.log("table recover: ", table);
    const rowsData = dataTable ?? await GetRowsData();
    await actualizarTabla({
      table: table,
      columnsData: columnsData,
      rowsData: rowsData,
      options: optionsTable, editTable: editTable
    });
    setLoading(false)
    console.log("tabla actualizada");
  }

  function actionImprimir() {
    console.log("clic imprimir reporte Ruta: ");
  }

  function actionElaborar() {
    console.log("action click Editar:",idModalAgregar);
    const myModal = new Modal(document.getElementById(idModalAgregar));
    myModal.show();
  }

  const buttonsGroup = {
    buttonPrimary: {
      disabled: loading,
      type: "submit",
      label: "Grabar"
    },
    buttonSecondary: {
      action: actionImprimir,
      disabled: loading,
      type: "button",
      label: "Imprimir Reporte"
    },
    buttonTertiary: {
      action: actionElaborar,
      disabled: (loading || !dataSelected),
      type: "button",
      label: "Elaborar"
    },
  };

  async function mostrarResultadoAlta() {
    console.log(document.getElementById(idToastalta));
    const myToastAlta = document.getElementById(idToastalta);
    console.log(Toast.getInstance(myToastAlta));
    Toast.getOrCreateInstance(myToastAlta).show();
  }

  async function onSubmitAlta(values, { resetForm }) {
    console.log("onsubmit....");
    setLoading(true);
    await sleep(1000);
    const result= await addData(values);
    if (result) {
      resetForm();
    }
    setLoading(false);
    await mostrarResultadoAlta();
  }

  return {
    loading,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected, idxSelected,
    GetRowsData,
    reloadTable,
    buttonsGroup,
    onSubmitAlta,
  };
};

export const useAltaTableEditable = ({
  addData,
  columnsData,
  optionsTable,
  getData,
  idTable,
  editTable,
}) => {
  initTE({ Modal, Toast });

  const [loading, setLoading] = useState(true);
  const [rowsData, setRowsData] = useState([])

  async function GetRowsData() {
    let rowsNew = [];
    setLoading(true);
    console.log("obteniendo Datos de ws");
    rowsNew = await getData();
    console.log("ROWS DATA: ", rowsNew);
    setLoading(false);
    setRowsData(rowsNew)
    return rowsNew;
  }

  async function reloadTable(dataTable) {
    setLoading(true);
    const table = await crearTable({
      idTable: idTable,
      columnsData: columnsData,
      options: optionsTable
    });
    console.log("table recover: ", table);
    const rowsData = dataTable ?? await GetRowsData();
    await actualizarTabla({
      table: table,
      columnsData: columnsData,
      rowsData: rowsData,
      options: optionsTable, 
      editTable: editTable ? editTable : true,
      selected: false,
    });
    setLoading(false)
    console.log("tabla actualizada");
  }

  function actionImprimir() {
    console.log("clic imprimir reporte Ruta: ");
  }

  const buttonsGroup = {
    buttonPrimary: {
      disabled: loading,
      type: "button",
      label: "Agregar"
    },
  };

  async function onSubmitAlta() {
    console.log("onsubmit....");
    setLoading(true);
    await sleep(1000);
    await addData();

    setLoading(false);
  }

  return {
    loading,
    columnsData,
    optionsTable,
    GetRowsData,
    reloadTable,
    buttonsGroup,
    onSubmitAlta,
  };
};

export async function mostrarResultadoAlta(idToastalta) {
  console.log(document.getElementById(idToastalta));
  const myToastAlta = document.getElementById(idToastalta);
  console.log(Toast.getInstance(myToastAlta));
  Toast.getOrCreateInstance(myToastAlta).show();
}

export default useAlta;