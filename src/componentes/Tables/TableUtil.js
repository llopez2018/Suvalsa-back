// Initialization for ES Users
import { Datatable } from "tw-elements";

export const crearTable = async (props) => {
  const table = new Datatable(
    document.getElementById(props.idTable),
    { columns: props.columnsData },
    {
      loading: true,
      pagination: true,
      selectable: props.selected ?? true,
      multi: props.options.multiSelect ?? false,
      selectableRow: "!bg-neutral-100 dark:!bg-neutral-600",
      clickableRows: true,
      fixedHeader: true,
      hover: true,
      sortOrder: "asc",
      entries: 50,
      entriesOptions: [10, 25, 50, 100, 200, 250],
      forceSort: true,
      sortField: props.columnsData[0].field ?? "clave",
      maxHeight: 400,
      noFoundMessage:
        props.options.noFoundMessage ?? "Registros no encontrados",
      ofText: props.options.ofText ?? "Registros de",
      loadingMessage: props.options.loadingMessage ?? "Obteniendo datos",
      rowsText: props.options.rowsText ?? "Registros por página",
      sm: true
    }
  );

  return table;
};

export const actualizarTabla = async (props) => {
  const table = props.table;
 await table.update(
    {
      columns: props.columnsData,
      rows: props.rowsData
    },
    {
      loading: false,
      pagination: true,
      selectable: props.selected ?? true,
      multi: props.options.multiSelect ?? false,
      selectableRow: "!bg-neutral-100 dark:!bg-neutral-600",
      clickableRows: true,
      fixedHeader: true,
      hover: true,
      sortOrder: "asc",
      entries: 50,
      entriesOptions: [10, 25, 50, 100, 200, 250],
      forceSort: true,
      sortField: props.columnsData[0].field ?? "clave",
      maxHeight: 400,
      noFoundMessage:
        props.options.noFoundMessage ?? "Registros no encontrados",
      ofText: props.options.ofText ?? "Registros de",
      loadingMessage: props.options.loadingMessage ?? "Obteniendo datos",
      rowsText: props.options.rowsText ?? "Registros por página",edit: props.editTable ?? false,
      sm: true
    }
  );
};
