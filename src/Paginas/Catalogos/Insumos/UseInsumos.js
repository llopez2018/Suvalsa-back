import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, initTE, Toast } from "tw-elements";
import {
  crearTable,
  actualizarTabla
} from "../../../componentes/Tables/TableUtil";
import { EliminarInsumo, ObtenerInsumos } from "../../../Apis/FetchCatalogos";

const useCatInsumos = () => {
  initTE({ Modal, Toast });

  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [idSelected, setIdSelected] = useState();

  const navegar = useNavigate();
  const idToast = "toastInsu";
  const tituloCatInsumos = "Catálogo de Insumos";

  const formatCell = (cell, value) => {
    cell.classList.add("hidden");
  };
  
  const columnsData = [  { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Nombre", field: "nombre", sort: true },
    { label: "Modelo", field: "modelo", sort: true },
    { label: "Uni", field: "uni", sort: true },
    { label: "Tipo", field: "tipo", sort: true },
    { label: "Precio", field: "precio", sort: true },
    { label: "Mínimo", field: "minimo", sort: true },
    { label: "Máximo", field: "maximo", sort: true },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

  const optionsTable = { ofText: "Insumos de" };
  //const optionsTable= { noFoundMessage: 'Datos no encontrados', ofText: 'Visitas de', loadingMessage: 'Cargando resultados', }

  async function GetResiduos() {
    setLoading(true);
    let rowsNew = [];
    const insumos = await ObtenerInsumos();
    console.log("lista de Insumos: ", insumos);

    if (insumos) {
      rowsNew = insumos.map((ins) => ({
        clave: ins.clave,
        nombre: ins.nombre,
        modelo: ins.modelo,
        uni: ins.uni,
        tipo: ins.tipo,
        precio: ins.precio,
        minimo: ins.minimo,
        maximo: ins.maximo
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
      idTable: "tableInsumos",
      columnsData: columnsData,
      options: optionsTable
    });
    console.log("table recover: ", table);
    const rowData = await GetResiduos();
    await actualizarTabla({
      table: table,
      columnsData: columnsData,
      rowsData: rowData,
      options: optionsTable
    });
    console.log("tabla actualizada");
  }

  function AltaInsumos() {
    console.log("action click alta Insumos");
    navegar("/suvalsa/catalogos/insumos/alta", {
      state: { urlBack: "/suvalsa/catalogos/insumos" }
    });
  }
  function ReporteInsumos() {
    console.log("action click Reporte Insumos");
  }
  function EliminarInsumos() {
    console.log("action click Eliminar Insumos");
    const modalDelete = new Modal(document.getElementById("staticBackdrop"));
    modalDelete.show();
  }

  async function confirmarEliminacion() {
    setLoading(true);
    console.log(idSelected);
    await EliminarInsumo(idSelected);
    console.log("Insumo eliminado");
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
      action: AltaInsumos,
      disabled: false,
      type: "submit",
      label: "Alta"
    },
    buttonSecondary: {
      action: ReporteInsumos,
      disabled: false,
      type: "button",
      label: "Reporte"
    },
    buttonTertiary: {
      action: EliminarInsumos,
      disabled: !rowSelected,
      type: "button",
      label: "Eliminar"
    }
  };

  return {
    loading,
    idToast,
    tituloCatInsumos,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetResiduos,
    confirmarEliminacion,
    buttonsGroup
  };
};

export default useCatInsumos;
