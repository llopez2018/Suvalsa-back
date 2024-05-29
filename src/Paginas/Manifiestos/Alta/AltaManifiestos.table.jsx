import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useTable } from "../../../componentes/Tables/useTableV2";
import CustomTable from "../../../componentes/Tables/CustomTable";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";

const AltaManifiestosTable = ({
  clave,
  fInicio,
  columnsData,
  data,
  setData,
  getData,
  actionEditRow
}) => {
  const isTableSelected = true;
  //const [table, setTable] = useState();

  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = useState("");
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

  //const {data, setData, getDataFunction} = useGetData()
  //const [data, setData] = useState(rowsData);

  const TableCell = (getValue, row, id, table, fInicio) => {
    const [value, setValue] = useState("");
    let initialValue = getValue();

    const isDias = id === "dias";
    const servicio = row.original.servicio;

    const isEditable =
      isDias ||
      id === "rutaplanta" ||
      (id === "manifiesto" && servicio === "TB");
    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      if (isDias) {
        console.log(fInicio);
        const date = dayjs(fInicio);
        console.log(date);
        const days = Number(value);
        if (isNaN(days)) row.original.fvisita = "";
        else
          row.original.fvisita = date
            .add(days - 1, "days")
            .format("YYYY-MM-DD");
      }
      table.options.meta?.updateData(row.index, id, value);
    };
    //establecer el valor de inicio, cuando se recuperan del servicio
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    //dependiendo de la validacion se setea como input o no
    return isEditable ? (
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={onBlur}
        type={isDias ? "number" : "text"}
        className=" w-16"
      />
    ) : (
      <span>{value}</span>
    );
  };

  const defaultColumn = {
    cell: ({ getValue, row, column: { id }, table }) => {
      return TableCell(getValue, row, id, table, fInicio.current ?? fInicio);
    }
  };

  function conditionalSelection(row) {
    return row.original.salida === "" || row.original.salida === null;
  }

  const { table } = useTable({
    isSelected: isTableSelected,
    //isMultiRowSelection: true,
    setData,
    data,
    columns: columnsData,
    defaultColumn,
    globalFilter,
    conditionalSelection,
    columnFilters,
    sorting,
    setSorting
  });

  // function recargar () {
  //   getDataFunction(clave)
  // }

  async function AgregarSalida() {
    console.log(table.getSelectedRowModel().flatRows);
    const rowsSelected = table.getSelectedRowModel().flatRows;
    // table.getState().rowSelection
    await actionEditRow(data, rowsSelected[0].index, "112233");
    table.resetRowSelection();
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

  const buttonsGroup = {
    buttonTertiary: {
      action: AgregarSalida,
      disabled: table.getSelectedRowModel().flatRows.length <= 0,
      type: "button",
      label: "Elaborar"
    }
  };

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
      <CustomTable
        table={table}
        setSorting={setSorting}
        actionRefreshData={() => getData(clave)}
        optionsTable = { {ofText: "Manifiestos de"} }
        isTableSelected={isTableSelected}
        // tableOptions={
        //   {
        //     styles : {
        //       width: '100%', height: '600px'
        //     },
        //     classNames : 'overflow-auto'
        //   }
        // }
      />

      <div className="h-2" />
      <ButtonGroup buttonTertiary={buttonsGroup.buttonTertiary} />
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

export default AltaManifiestosTable;
