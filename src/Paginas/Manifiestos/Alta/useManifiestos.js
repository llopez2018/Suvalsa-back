import { useState } from "react"
import {ObtenerClientesManifiestos, ObtenerMaxManifiesto} from "../../../Apis/FetchManifiestos"
import dayjs from "dayjs";
import { BuscarRutaClave } from "../../../Apis/FetchRutas";


export async function loadClientesManif(clave) {
    const cManif = await ObtenerClientesManifiestos(clave);
    let rowsNew = [];
    console.log("lista de Clientes Manifiestis: ", cManif);

    if (cManif) {
      let noManif = await ObtenerMaxManifiesto()
      console.log(noManif)
      if(noManif !== null){                           
        if (noManif === '') noManif = 0; else noManif = Number(noManif.claveFinal);
        console.log(noManif)
        rowsNew = cManif.map((res) => {
          let isNoManif = res.serv === "CB" || res.serv === "CI" || res.serv === "TI";
          if(isNoManif) noManif += 1;
  
          return {
          id: res.id,
          clave : res.cliente,
          ciudad: res.ciudad,
          familia : res.fam,
          nombre: res.nombre,
          ruta: res.ruta,
          orden: res.orden,
          servicio : res.serv,
          dias: '',
          fvisita: '',
          salida: '',
          manifiesto: isNoManif ? noManif : '',
          planta: res.planta,
          rutaplanta: res.rutaplanta,
        }});
      }
      }
    console.log(rowsNew)
    return rowsNew;
}
function reeestablecerFechaVisita(fInicio, dias){
    if(dias ==="") return "";

    const date = dayjs(fInicio);
        let days = Number(dias)
        if(isNaN(days)) return ""

        return date.add( days-1,'days').format("YYYY-MM-DD")
}

export async function reloadClientesManif(data, fInicio) {
    let rowsNew = [];
    console.log("lista de Clientes Manifiestis: ", data);
  
    if (data) {
      rowsNew = data.map((res) => {
        const fechaVisita =  reeestablecerFechaVisita(fInicio, res.dias);
        return {
        id: res.id,
        clave : res.clave,
        ciudad: res.ciudad,
        familia : res.familia,
        nombre: res.nombre,
        ruta: res.ruta,
        orden: res.orden,
        servicio : res.servicio,
        dias: res.dias,
        fvisita: fechaVisita,
        salida: res.salida,
        manifiesto: res.manifiesto,
        planta: res.planta,
        rutaplanta: res.rutaplanta,
      }});
    }
    console.log(rowsNew)
    return rowsNew;
  }

const useManifiestos= () =>{
const [data, setData]= useState([]);
const [loadingData, setLoadingData] = useState(false);

const [rutaData, setRutaData] = useState([
  {
    clave:"",
    nombre: "",
    duracion: "",
    oper: "",
    aux: "",
    vehiculo1: "",
    id: ""
  }
]);

async function onSubmitAltaManifestos(values) {
  console.log("onsubmit....");
  console.log("action alta");
  //se valida si los dias agregados estan dentro de los dias permitidos en el manifiesto
  let diasTotales =0;
  data.forEach( (clm) => {
    const dContador = clm.dias === "" ? 0 : Number(clm.dias)
    console.log(dContador)
    console.log(diasTotales + dContador)
    diasTotales = diasTotales + dContador
  })
  console.log('diasTotales agregados:', diasTotales)
    if(diasTotales > values.dias){
      console.log("Los dias agregados son mas de los permitidos en el manifiesto")
      return false;
    }
  return true;
}

async function getDataFunction(clave){
  setLoadingData(true)
    setData( await loadClientesManif(clave))
    setLoadingData(false)
}

async function BuscarRuta(clave) {
  console.log("consultando datos de la ruta:", clave);
  setLoadingData(true);
  const ruta = clave ? await BuscarRutaClave(clave) : null;
  console.log(ruta);
  let cRuta = [
    {
      clave: clave,
      nombre: "",
      duracion: "",
      oper: "",
      operador: '',
      aux: "",
      auxiliar: '',
      noEco: '',
      vehiculo: "",
      id: ""
    }
  ];

  if (ruta !== null && ruta.length > 0) {
    cRuta = ruta.map((r) => {
      const auxRuta = {
        clave: r.clave,
        nombre: r.nombre,
        duracion: r.duracion,
        oper: r.operador,
        operador: '',//buscarAgente('OPE', r.operador),
        aux: r.auxiliar,
        auxiliar: '',//buscarAgente('AUX', r.auxiliar),
        noEco: r.vehiculo,
        vehiculo: '',//buscarVehiculo(r.vehiculo),//buscarAgente(r.vehiculo),
        id: r.id
      };
      //setDataFounded(true);
      return auxRuta;
    });
  } else {
    //setDataFounded(false);
  }
  console.log(cRuta);
  setRutaData(...cRuta);
  setLoadingData(false);
  return cRuta[0];
}

async function addSalida(data, rowIndex, value) {
  let rowsNew = [];
  console.log("lista de Clientes Manifiestis: ", data);
  if (data) {
    rowsNew = data.map((res, index) => {
      return {
      id: res.id,
      clave : res.clave,
      ciudad: res.ciudad,
      familia : res.familia,
      nombre: res.nombre,
      ruta: res.ruta,
      orden: res.orden,
      servicio : res.servicio,
      dias: res.dias,
      fvisita: res.fvisita,
      salida: index === rowIndex ? value : res.salida,
      manifiesto: res.manifiesto,
      planta: res.planta,
      rutaplanta: res.rutaplanta,
    }});
  }
  console.log(rowsNew)
  setData( rowsNew)
  return rowsNew;
}

    return {
        getDataFunction, BuscarRuta,
        loadingData, rutaData,
        data,
        setData,
        addSalida,
        onSubmitAltaManifestos,
    }
}

export default useManifiestos