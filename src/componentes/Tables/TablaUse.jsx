import React, { useEffect, useState } from "react";
import { useTable } from "./UseTable";


const TablaSeleccionable = (props) => {
  const [loadingTable, setLoadingTable] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const { initTable, updateTable } = useTable(
    props.id,
    props.options,
    props.selectActionLsnr
  );

  async function invokeGetData() {
    setRowsData(await props.invokeGetDataFunction());
    setLoadingTable(true);
  }
  useEffect(() => {
    initTable(props.columnsData);
  }, []);

  //esto se ejecuta solo una vez cuando se renderiza el componente de tabla seleccionada
  useEffect(() => {
    if (!loadingTable) {
      setTimeout(() => invokeGetData(), 100);
    } else {
      //actualizando tabla
      updateTable(props.columnsData, rowsData, props.editTable);
    }
  }, [loadingTable, rowsData]);

  return (
      <div id={props.id}></div>
  );
};

export const TablaSimple = (props) => {
  const [loadingTable, setLoadingTable] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const { initTable, updateTable } = useTable(
    props.id,
   { selected: false, ...props.options},
  );

  async function invokeGetData() {
    setRowsData(await props.invokeGetDataFunction());
    setLoadingTable(true);
  }
  useEffect(() => {
    initTable(props.columnsData);
  }, []);

  useEffect(() => {
    if (!loadingTable) {
      invokeGetData();
    } else {
      //actualizando tabla
      updateTable(props.columnsData, rowsData, props.editTable);
    }
  }, [loadingTable, rowsData]);

  return (
    <>

        <div id={props.id}></div>
    </>
  );
};

export default TablaSeleccionable;
