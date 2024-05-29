import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EliminarAgente, ObtenerAgentes } from "../../../Apis/FetchCatalogos";
import { Modal, initTE, Toast } from "tw-elements";
import {
  crearTable,
  actualizarTabla
} from "../../../componentes/Tables/TableUtil";

const useCatPersonal = () => {
  initTE({ Modal, Toast });

  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [idSelected, setIdSelected] = useState();

  const navegar = useNavigate();
  const idToast='toastPers'
  const tituloCatAgentes = "Catálogo de Personal";

  const formatCell = (cell, value) => {
    cell.classList.add("hidden");
  };

  const columnsData = [
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Nombre", field: "nombre", sort: true },
    { label: "Puesto", field: "puesto", sort: true },
    { label: "Tarjeta", field: "tarjeta", sort: true },
    { label: "Domicilio", field: "domicilio", sort: true },
    { label: "Teléfono", field: "telefono", sort: true },
    { label: "Celular", field: "celular", sort: true },
    { label: "Licencia", field: "licencia", sort: true },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

  const optionsTable = { ofText: "Agentes de" };
  //const optionsTable= { noFoundMessage: 'Datos no encontrados', ofText: 'Visitas de', loadingMessage: 'Cargando resultados', }
  async function GetAgentes() {
    setLoading(true)
    let rowsNew = [];
    const agentes = await ObtenerAgentes();
    console.log("lista de Agentes: ", agentes);

    if (agentes) {
      rowsNew = agentes.map((ag) => ({
        clave: ag.clave,
        id: ag.id,
        nombre: ag.nombre,
        puesto: ag.puesto,
        tarjeta: ag.tarjeta,
        domicilio: ag.domicilio,
        telefono: ag.telefono,
        celular: ag.celular,
        licencia: ag.licencia
      }));
    }
    setLoading(false)
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
      idTable: "tablaAgentes",
      columnsData: columnsData,
      options: optionsTable
    });
    console.log("table recover: ", table);
    const rowData = await GetAgentes();
    await actualizarTabla({
      table: table,
      columnsData: columnsData,
      rowsData: rowData,
      options: optionsTable
    });
    console.log("tabla actualizada");
  }

  function AltaAgentes() {
    console.log("action click alta Agentes");
    navegar("/suvalsa/catalogos/personal/alta", {state: {urlBack:"/suvalsa/catalogos/personal" }} );
  }
  function ReporteAgentes() {
    console.log("action click Reporte Agentes");
  }
  function EliminarAgentes() {
    console.log("action click Eliminar Agentes");
    const modalDelete = new Modal(document.getElementById("staticBackdrop"));
    modalDelete.show();
  }

  async function confirmarEliminacion() {
    setLoading(true)
    console.log(idSelected);
    await EliminarAgente(idSelected);
    console.log("proveedor eliminado");
    console.log(document.getElementById(idToast));
    const myToast = document.getElementById(idToast);
    console.log(Toast.getInstance(myToast));
    Toast.getOrCreateInstance(myToast).show();
    //para volver a cargar la tabla

    console.log("recargando tabla");
    await reloadTable();
    setLoading(false)
  }

  const buttonsGroup = {
    buttonPrimary: {
      action: AltaAgentes,
      disabled: false,
      type: "submit",
      label: "Alta"
    },
    buttonSecondary: {
      action: ReporteAgentes,
      disabled: false,
      type: "button",
      label: "Reporte"
    },
    buttonTertiary: {
      action: EliminarAgentes,
      disabled: !rowSelected,
      type: "button",
      label: "Eliminar"
    }
  };

  return {
    loading, idToast,
    tituloCatAgentes,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetAgentes,
    confirmarEliminacion, 
    buttonsGroup
  };
};

export default useCatPersonal;
