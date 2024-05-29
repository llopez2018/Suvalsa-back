import { useState } from "react";
// Initialization for ES Users
import { Datatable, initTE } from "tw-elements";
import { actualizarTabla, crearTable } from "./TableUtil";

export const useTable = (idTable, options, selectActionLsnr) => {
  const [table, setTable] = useState(null);

  const initTable = async (columnsData) => {
    if (table === null) {
      console.log("Init TABLE: ", idTable);
      initTE({ Datatable });
      setTable(await crearTable({ idTable, columnsData, options }));
    }
  };

  const updateTable = async (columnsData, rowsData, editTable) => {
    console.log("table:: ", table);
    console.log('editable:',editTable)
    await actualizarTabla({ table, columnsData, rowsData, options, editTable });
    if (selectActionLsnr) {
      const datatableElement = document.getElementById(idTable);
      datatableElement.addEventListener(
        "selectRows.te.datatable",
        selectActionLsnr
      );
    }
  };

  return { table, setTable, initTable, updateTable };
};
