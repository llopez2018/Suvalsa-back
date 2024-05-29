import { useState } from "react";
import { Modal, initTE, Toast } from "tw-elements";
import { crearTable, actualizarTabla } from "../componentes/Tables/TableUtil";

const useActualizar = ({
  idToastDelete,
  columnsData,
  optionsTable,
  getData,deleteData,
  idTable,
  editTable,
  idModalAgregar,
  idModalDelete
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
      setDataSelected(e.selectedRows[0].clave);
      setIdxSelected(e.selectedIndexes[0]);
    } else {
      setRowSelected(false);
      setDataSelected(null);
      setIdxSelected(null);
    }
  };

  async function reloadTable(dataTable) {
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
    console.log("tabla actualizada");
  }

  function actionImprimir() {
    console.log("clic imprimir reporte Ruta: ");
  }

  function actionAgregar() {
    console.log("action click Eliminar:",idModalAgregar);
    const myModal = new Modal(document.getElementById(idModalAgregar));
    myModal.show();
  }

  function actionRetirar() {
    console.log("action click Eliminar");
    const myModal = new Modal(document.getElementById(idModalDelete));
    myModal.show();
  }

  async function ordenarLista() {
    console.log(
      "Funcion para ordenar la lista de clientes, colocando valores ascendentes al campo Orden"
    );

    const tmpClientesRuta=[...rowsData];
      console.log(tmpClientesRuta)
    tmpClientesRuta.sort(function (a, b) {
      if (a.orden > b.orden) {
        return 1;
      }
      if (a.orden < b.orden) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
      let noOrden = 1;
      tmpClientesRuta.map( (clRuta) => {
        clRuta.orden = noOrden
        noOrden++;
        return clRuta
      })
    console.log('tmpOrden', tmpClientesRuta)
    reloadTable(tmpClientesRuta)
  }

  async function confirmarEliminacion() {
    setLoading(true);
    console.log(idxSelected);
    if(deleteData)
      deleteData(idxSelected);
    else{
      //const tmpNewRows = rowsData;
      rowsData.splice( idxSelected,1 )
      console.log('rowsNew:',rowsData)
    }
    console.log("Registro eliminado");
    console.log(document.getElementById(idToastDelete));
    const myToast = document.getElementById(idToastDelete);
    console.log(Toast.getInstance(myToast));
    Toast.getOrCreateInstance(myToast).show();
    //para volver a cargar la tabla
    console.log("recargando tabla");
    await reloadTable();
    setLoading(false);
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
      action: actionAgregar,
      disabled: (loading),
      type: "button",
      label: "Agregar Cliente"
    },
    buttonCuatriary: {
      action: actionRetirar,
      disabled: !rowSelected,
      type: "button",
      label: "Retirar Cliente"
    },
    buttonQuintuary: {
      action: ordenarLista,
      disabled: (loading || rowsData.length <= 0 ),
      type: "button",
      label: "Ordenar"
    }
  };

  return {
    loading,
    idToastDelete,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetRowsData,
    confirmarEliminacion,
    reloadTable,
    buttonsGroup
  };
};

export default useActualizar;
