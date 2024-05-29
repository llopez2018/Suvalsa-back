import React, { useEffect, useState } from "react";
import { TablaSimple } from "../../../componentes/Tables/TablaUse";
import { ObtenerInsumos } from "../../../Apis/FetchInsumos";
import { useAltaTableEditable } from "../../../Hooks/UseAltas";
import { CrearSalida, ObtenerMaxSalida } from "../../../Apis/FetchSalidas";

const AgregarInsumoForm = (props) => {
  const [insumos, setInsumos] = useState([]);

  const idTablaInsumos = "idTableInsumos";
  const opcionesTabla = { ofText: "Insumos de"};

  const formatCell = (cell, value) => {
    cell.classList.add("hidden");
  };
  const formatNoEditCell = (cell, value) => {
    cell.setAttribute("contenteditable", "false");
  };
  const formatEditable = (cell, value) => {
    //se vuelve editable la celda de manifiestos
    cell.setAttribute("role", "input");
    cell.classList.add("Editable");
    //y se le asigna un listener para valdiar que sea solo numerico
    cell.addEventListener("input", (e) => listenerValidaNumber(e));
  };

  const listenerValidaNumber = (e) => {
    let isDataValid = false;
    let curval = e.target.innerHTML;
    const currentEnterData = Number(e.data);
    console.log(currentEnterData);
    setTimeout(function () {
      // check if new value is more or equal to 255
      if (!isNaN(currentEnterData) && curval > 0) {
        isDataValid = true;
        console.log("valor ingresado:", curval);
      }
      if (isDataValid) {
        console.log("valor numerico permitido");
        e.target.classList.remove("border-[1px]");
        e.target.classList.remove("border-red-600");
      } else {
        console.log(
          "valor no permitido. El valor debe ser numerico y mayor a 0"
        );
        e.target.innerHTML = "";
        e.target.classList.add("border-[1px]");
        e.target.classList.add("border-red-600");
      }
    }, 100);
  };

  const columnasData = [
    { label: "Clave", field: "clave", sort: true, fixed: true,format: formatNoEditCell },
    { label: "Nombre", field: "nombre", sort: true,  format: formatNoEditCell },
    { label: "Modelo", field: "modelo", sort: true, format: formatNoEditCell },
    { label: "Tipo", field: "tipo", sort: true, format: formatNoEditCell },
    { label: "Existencias", field: "existencias", sort: true, fixed: true, format: formatNoEditCell },
    { label: "Uni", field: "unidad", sort: true, format: formatNoEditCell },
    { label: "Cantidad", field: "cantidad", sort: true, fixed: true, format: formatEditable },
    //recoleccion
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

  const GetDataInsumos = async () => {
    const data = await obtenerInsumos();
    let cInsumos = [];
    if (data !== null && data.length > 0) {
      cInsumos = data.map((res) => {
        const insumo = {
          id: res.id,
          clave: res.clave,
          nombre: res.nombre,
          modelo: res.modelo,
          tipo: res.tipo,
          existencias: res.existen,
          unidad: res.unidad,
          cantidad: res.cantidad
        };
        return insumo;
      });
    }
    console.log(cInsumos);
    setInsumos(cInsumos);
  };

  async function obtenerInsumos() {
    const dataInsumos = await ObtenerInsumos();

    return dataInsumos;
  }

  async function onSubmitAgregarInsumo() {
    console.log("onsubmit....");
    console.log("action agregar insumo");
    console.log(props.idxManifiesto);

    const folio = await ObtenerMaxSalida();
    //aqui debe existir una condicion de que si no se obtiene el max de salida, no se agregue
    if(folio.maxNumero){
        const noSalida = Number(folio.maxNumero) + 1;
        const currentDate = new Date(); //yyyy-MM-dd
        const moment = require("moment");
        const fechaActual = moment(currentDate).format("yyyy-MM-DD");

        insumos.forEach( async(ins)=> {
            const cant = Number(ins.cantidad)
            //si se capturo un valor numerico y es mayor a 0
            if(!isNaN(cant) && cant >0){
                console.log('se agregara la salida para ', ins.clave, 'con folio ', noSalida)
                const bodyData = {
                    numero: noSalida,
                    fecha: fechaActual,//"2024-05-10",
                    tipo: ins.tipo,
                    insumo: ins.id,
                    cantidad: cant,
                    unidad: ins.unidad,
                    referencia: props.ruta + props.familia + ins.clave,
                    familia: props.familia,
                    cliente: props.cliente,
                    manif: props.noManifiesto,
                    factura: "",
                    usom: "",
                    status: "1"
                };
                console.log(bodyData)
                await CrearSalida(bodyData)
                if(props.actionUpdateTable){
                    props.actionUpdateTable(props.idxManifiesto, noSalida)
                }
            }
        })
    }else{
        console.log('no se recupero el max de salidas')
        return false;
    }
    return true;
  }

  const {
    onSubmitAlta,
    columnsData,
    optionsTable,
    GetRowsData,
    reloadTable
  } = useAltaTableEditable({
      addData: onSubmitAgregarInsumo,
      columnsData: columnasData,
      optionsTable: opcionesTabla,
      getData: () => insumos,
      idTable: idTablaInsumos,
      //idModalAgregar: idModalClientesManif
      //idToastalta:  idToastAgregar,
  });

  useEffect(() => {
    GetDataInsumos();
  }, []);

  useEffect(() => {
    if (insumos) {
      reloadTable();
    }
  }, [insumos]);

  return (
    <div className="flex flex-col w-full gap-2">
      <TablaSimple
        id={idTablaInsumos}
        invokeGetDataFunction={GetRowsData}
        columnsData={columnsData}
        options={optionsTable}
        editTable={true}
      />
      <div className="flex flex-shrink-0 flex-wrap items-center justify-end gap-2 rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <div className="w-full grid flex-row md:flex md:flex-row-reverse md:justify-start gap-4">
          <button onClick={onSubmitAlta}
            type="button"
            className="btn-primary"
            data-te-modal-dismiss
          >
            Agregar Insumo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarInsumoForm;
