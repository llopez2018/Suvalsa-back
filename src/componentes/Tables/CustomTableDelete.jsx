import React, { useEffect, useState } from "react";
import { Modal, initTE, Toast } from "tw-elements";

import { useTable } from "./useTableV2";
import CustomTable from "./CustomTable";
import { ButtonGroup } from "../Button/GenericButton";
import CustomModal from "../Modals/CustomModal";
import CustomToast from "../Toasts/CustomToast";

const CustomTableDelete = ({
  columnsData,
  data,
  optionsTable,
  setData,
  getData,
  actionDeleteRow,
  propsModal,
  propsToast,
  buttonsGroup
}) => {
  const isTableSelected = true;
  const customToastId = "customToastIdDelete";
  //const [table, setTable] = useState();

  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = useState("");

  const [rowSelected, setRowSelected] = useState("")
  // {
  //   id: 'clave',
  //   asc: true, // sort by clave in asc order by default
  // },

  const [sorting, setSorting] = React.useState([
    {
      id: "clave",
      desc: "true"
    }
  ]);

  const { table } = useTable({
    isSelected: isTableSelected,
    //isMultiRowSelection: true,
    setData,
    data,
    columns: columnsData,
    globalFilter,
    columnFilters,
    sorting,
    setSorting
  });

  function EliminarProveedores() {
    console.log("action click Eliminar proveedores");
    console.log(table.getSelectedRowModel().flatRows);
    setRowSelected(table.getSelectedRowModel().flatRows[0].original);
    console.log(table.getSelectedRowModel().flatRows[0].original);
    const myModal = new Modal(document.getElementById(propsModal.id));
    myModal.show();
  }

  async function confirmarEliminacion() {
    //const isDeleted =
    await actionDeleteRow(rowSelected);
    //aqui se debe de validar si se elimina o no, que tipo de mensaje se debe de mostrar con el toast
    console.log(document.getElementById(propsToast?.idToast ?? customToastId));
    const myToast = document.getElementById(
      propsToast?.idToast ?? customToastId
    );
    console.log(Toast.getInstance(myToast));
    Toast.getOrCreateInstance(myToast).show();
    //para volver a cargar la tabla

    console.log("recargando tabla");
    await getData();
  }

  const crearFiltro = () => {
    const headerCl = table.getHeaderGroups().at(0).headers[1];
    console.log(headerCl);
    return (
      <div>
        <Filter column={headerCl.column} table={table} />
      </div>
    );
  };

  const buttonTertiary = {
    action: EliminarProveedores,
    disabled: table?.getSelectedRowModel().flatRows.length <= 0,
    type: "button",
    label: "Eliminar"
  };

  useEffect(() => {
    initTE({ Modal, Toast });
  }, []);

  return (
    <>
      {/* <div>
        <input
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div> */}
      <CustomToast
        type={propsToast?.type ?? "info"}
        id={propsToast?.idToast ?? customToastId}
        title={propsToast?.title ?? "Eliminación"} 
        message={ propsToast?.setMessage
          ? propsToast.setMessage(
              rowSelected
            )
          : "Dato eliminado correctamente"
        } />
      <CustomModal
        id={propsModal.id}
        title={propsModal?.title ?? "Confirmar Eliminación"}
        actionAccept={confirmarEliminacion}
      >
        <h1>
          {propsModal?.setMessage
            ? propsModal?.setMessage(
              rowSelected
              )
            : "¿Deseas eliminar este registro?"}
        </h1>
      </CustomModal>
      <CustomTable
        table={table}
        setSorting={setSorting}
        actionRefreshData={() => getData()}
        optionsTable={optionsTable}
        isTableSelected={isTableSelected}
        // optionsTable={
        //   {
        //     styles : {
        //       width: '100%', height: '600px'
        //     },
        //     classNames : 'overflow-auto'
        //   }
        // }
      />
      <div className="h-2" />
      {buttonsGroup ? (
        <ButtonGroup
          buttonPrimary={buttonsGroup.buttonPrimary}
          buttonSecondary={buttonsGroup.buttonSecondary}
          buttonTertiary={buttonTertiary}
        />
      ) : (
        actionDeleteRow ?
        <ButtonGroup buttonTertiary={buttonTertiary} /> :''
      )}
    </>
  );
};

export function Filter(props) {
  const { column, table } = { ...props };

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={columnFilterValue?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={columnFilterValue?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}

export default CustomTableDelete;
