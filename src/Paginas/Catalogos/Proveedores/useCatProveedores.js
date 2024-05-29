import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ObtenerProveedores,
  EliminarProveedor
} from "../../../Apis/FetchCatalogos";

export async function GetProveedores() {
  let rowsNew = [];
  console.log("obteniendo Datos de ws Proveedores");
  const proveedores = await ObtenerProveedores();
  console.log("lista de provedores: ", proveedores);

  if (proveedores) {
    rowsNew = proveedores.map((proveedor) => ({
      clave: proveedor.clave,
      id: proveedor.id,
      empresa: proveedor.empresa,
      calle: proveedor.trial_calle_3,
      colonia: proveedor.colonia,
      ciudad: proveedor.ciudad,
      cp: proveedor.cp,
      contacto: proveedor.contacto,
      tel: proveedor.telefono
    }));
  }
  return rowsNew;
}

const useCatProveedores = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const navegar = useNavigate();

  const idToast = "toastProv";
  const idModal = "modalDeleteProv";
  const tituloCatProveedores = "Catálogo de Proveedores";

  const propsToast = {
    type: "info",
    idToast: idToast,
    title: "Proveedor eliminado",
    setMessage: (selectedRowData) =>
      "Proveedor " + selectedRowData?.clave + " eliminado correctamente"
  };

  const propsModal = {
    id: idModal,
    title: "Eliminar proveedor",
    setMessage: (selectedRowData) =>
      "¿Deseas eliminar el Proveedor con clave " + selectedRowData?.clave + "?"
  };

  // const columnMinSize = 50;
  // const columnMaxSize = 450;
  //const columnSize = 250;

  const columnsData = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableColumnFilter: false
        //footer: props => props.column.id,
        //sortDescFirst: false, //sort by order in ascending order first (default is descending for number columns)
      },
      {
        accessorKey: "clave",
        header: "Clave",
        enableColumnFilter: true,
        filterFn: "includesString", //note: normal non-fuzzy filter column - case insensitive
        //filterFn: 'customFilter', //using our custom function filter
        //filterFn: "fuseFilterFn"
        //footer: props => props.column.id,
        size: 50, //set column size for this column
        enableSorting: true
      },
      {
        accessorKey: "empresa",
        header: "Empresa",
        enableColumnFilter: false,
        enableSorting: false
        //footer: props => props.column.id,
      },
      {
        accessorKey: "calle",
        header: "Calle",
        enableColumnFilter: false,
        enableSorting: false
        //footer: props => props.column.id,
      },
      {
        accessorKey: "colonia",
        header: "Colonia",
        enableColumnFilter: false,
        enableSorting: false
        //footer: props => props.column.id,
      },
      {
        accessorKey: "ciudad",
        header: "Ciudad",
        enableColumnFilter: false,
        enableSorting: false,
        //footer: props => props.column.id,
        size: 100 //set column size for this column
      },
      {
        accessorKey: "cp",
        header: "CP",
        enableColumnFilter: false,
        enableSorting: false
        //footer: props => props.column.id,
      },
      {
        accessorKey: "contacto",
        header: "Contacto",
        enableColumnFilter: false,
        enableSorting: false
        //footer: props => props.column.id,
      },
      {
        accessorKey: "tel",
        header: "Telefono",
        enableColumnFilter: false,
        enableSorting: false
        //footer: props => props.column.id,
      }
    ],
    []
  );

  const optionsTable = { ofText: "Proveedores de" };
  //const optionsTable= { noFoundMessage: 'Datos no encontrados', ofText: 'Visitas de', loadingMessage: 'Cargando resultados', }

  async function getDataFunction() {
    setLoading(true);
    setData(await GetProveedores());
    setLoading(false);
  }

  function AltaProveedores() {
    console.log("action click alta proveedores");
    navegar("/suvalsa/portal-proveedores/altas-bajas", {
      state: { urlBack: "/suvalsa/catalogos/proveedores" }
    });
  }

  function ReporteProveedores() {
    console.log("action click Reporte proveedores");
  }

  async function confirmarEliminacion(itemSelected) {
    setLoading(true);
    console.log(itemSelected.id);

    await EliminarProveedor(itemSelected.id);
    console.log("proveedor eliminado");
    //aqui se debe de validar si se elimina o no, que tipo de mensaje se debe de mostrar con el toast
    setLoading(false);
    return true;
  }

  const buttonsGroup = {
    buttonPrimary: {
      action: AltaProveedores,
      disabled: false,
      type: "submit",
      label: "Alta"
    },
    buttonSecondary: {
      action: ReporteProveedores,
      disabled: false,
      type: "button",
      label: "Reporte"
    }
  };

  return {
    loading,
    idToast,
    tituloCatProveedores,
    optionsTable,
    columnsData,
    data,
    setData,
    getDataFunction,
    confirmarEliminacion,
    propsToast,
    propsModal,
    buttonsGroup
  };
};

export default useCatProveedores;
