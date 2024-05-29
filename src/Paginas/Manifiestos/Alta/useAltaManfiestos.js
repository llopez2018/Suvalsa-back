import { useEffect, useState } from "react";
import { Input, initTE } from "tw-elements";
import { ObtenerAgentes, ObtenerVehiculos } from "../../../Apis/FetchCatalogos";
import { BuscarRutaClave } from "../../../Apis/FetchRutas";
import { ObtenerClientesManifiestos, ObtenerMaxManifiesto } from "../../../Apis/FetchManifiestos";

const useAltaManifiestos = (props) => {
  initTE({ Input });
  const [loadingData, setLoadingData] = useState(false);
  const [dataFounded, setDataFounded] = useState(false);
  const [agentes, setAgentes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [respuestaAlta, setRespuestaAlta] = useState({
    resultado: false, mensaje: "", tipo: "error"
  });
  const [oper, setOper] = useState("");
  const [aux, setAux] = useState("");
  const [noEco, setNoEco] = useState("");

  const [loading, setLoading] = useState(false);
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

  const [clientesManif, setClientesManif] = useState([]);

  const idModalClientesManif = "modalClientesManif";

  const idTableClientesManif= "tablaClientesManif";
  const opcionesTabla = { ofText: "Clientes en Ruta de" };

  const idToastalta = "toastAltaManifiestos";

  const initValuesAdd = {
      ruta: "",
      nombre: "",
      dias: "",
      fInicio: "",
      oper: "",
      aux: "",
      noEco: "",
      operador: "",
      auxiliar: "",
      vehiculo: "",
    };

  const formatCell = (cell, value) => {
    cell.classList.add("hidden");
  };

  const listenerValidaNumber = (e, nameField) =>{
    let isDataValid = false;
      let curval = e.target.innerHTML;
      const currentEnterData = Number(e.data);
    console.log(currentEnterData)
      setTimeout(function() {
          // check if new value is more or equal to 255
          if ( ! isNaN(currentEnterData ) && curval > 0){
              isDataValid = true;
              console.log('valor ingresado:', curval)
              //se llama la funcion de seteo de fvisita cuando sea el cambio sobre los dias
              if (nameField === "dias") {
                establecerFechaVisita(e, props.fechaInicio.current, curval)
              }
        }
        if(isDataValid){
          console.log('valor numerico permitido')
          e.target.classList.remove('border-[1px]')
          e.target.classList.remove('border-red-600')
        }else {
          console.log('valor no permitido. El valor debe ser numerico y mayor a 0')
          e.target.innerHTML = ""
          e.target.classList.add('border-[1px]')
          e.target.classList.add('border-red-600')
          //si es los dias
          if (nameField === "dias") {
            const elementId = e.srcElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
    
            const idxCl = clientesManif.findIndex( (cl) => cl.id === Number(elementId.innerText) )

            if(idxCl > -1){
              e.srcElement.nextElementSibling.innerText = ""
              e.srcElement.nextElementSibling.innerHTML = ""
              clientesManif[idxCl].fvisita = ""
            }
          }
        }
      }, 100);
  }

  const establecerFechaVisita = (e, fecha_ini, value) => {
      let valueFvisita= ""
      console.log(fecha_ini)
      if(value){
        //se asigna el valor de la f visita dependiendo el valor de los dias capturados y la fecha de inicio seleccionada
        const dias = value !== "" ? Number(value) : 0;
        if (dias > 0) {
          const fechaVisita = new Date(fecha_ini); //yyyy-MM-dd
          const moment = require("moment");

          const startdate = moment(fechaVisita).format("yyyy-MM-DD");
          var new_date = moment(startdate, "yyyy-MM-DD").add(dias, "days");
          valueFvisita= moment(new_date).format("yyyy-MM-DD");
        } else valueFvisita= "";
      }

      const elementId = e.srcElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
      
      const idxCl = clientesManif.findIndex( (cl) => cl.id === Number(elementId.innerText) )

      if(idxCl > -1){
        e.srcElement.nextElementSibling.innerText = valueFvisita
        e.srcElement.nextElementSibling.innerHTML = valueFvisita
        clientesManif[idxCl].fvisita = valueFvisita
      }
  }
  
  let isManifEditable = false
  
  const formatEditable = (cell, value) => {
    //console.log(cell)
    const nameField = cell.getAttribute("data-te-field")
    //si es la columna de servicios
    if(nameField && nameField === "servicio") {
      //se le asigna solo que no permita edicion en el caso del servicio
      cell.setAttribute("contenteditable", "false");
      //se actualiza el hook para determinar si permite para ese registro el que sea editable el manifiesto
      if(value === 'TB')
        isManifEditable= true;
      else isManifEditable = false
    }
    //se valida que sea la columna de manifiesto y que sea editable de acuerdo al valor recuperado anteriormente en el servicio TB
    if( nameField && ( (isManifEditable && nameField === "manifiesto" ) || (nameField === "dias") )) {
      //se vuelve editable la celda de manifiestos
      cell.setAttribute('role' , 'input')
      cell.classList.add("Editable");
      //y se le asigna un listener para valdiar que sea solo numerico 
      cell.addEventListener('input', (e) => listenerValidaNumber(e, nameField));
    }else{
      //se le asigna solo que no permita edicion en el caso del manifiesto no lo permita por el valor del propio servicio
      cell.setAttribute("contenteditable", "false");
    }
  };

  const FormatOnlyEditable = (cell, value) => {
    cell.setAttribute('role' , 'input')
    cell.classList.add("Editable");
    cell.addEventListener('keyup', function (e) {
        let curval = e.target.innerHTML;
        e.target.innerHTML = curval.toUpperCase()
    })
  };

  const FormatNoEditableInput = (cell, value) => {
    cell.setAttribute("contenteditable", "false");
    cell.setAttribute('role' , 'input')
  };

  const formatEditCell = (cell, value) => {
    cell.setAttribute("contenteditable", "false");
  };

  const colsClientesManif = [
      { label: "Orden", field: "orden", sort: true, format: formatEditCell },
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true, format: formatEditCell },
    { label: "Nombre", field: "nombre", sort: true, format: formatEditCell },
    { label: "Familia", field: "familia", sort: true, width: 50, fixed: true, format: formatEditCell },
    { label: "Ciudad", field: "ciudad", sort: true, format: formatEditCell },
    { label: "Servicio", field: "servicio", sort: true, format: formatEditable },
    { label: "Dias", field: "dias", sort: true, format: formatEditable },
    { label: "F. Visita", field: "fvisita", sort: true, format: FormatNoEditableInput },
    { label: "Salida", field: "salida", sort: true, format: formatEditCell },
    { label: "Manifiesto", field: "manifiesto", sort: true, format: formatEditable },
    { label: "Planta", field: "planta", sort: true, format: formatEditCell },
    { label: "Ruta Planta", field: "rutaplanta", sort: true, format: FormatOnlyEditable },
    //recoleccion
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

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
          operador: buscarAgente('OPE', r.operador),
          aux: r.auxiliar,
          auxiliar: buscarAgente('AUX', r.auxiliar),
          noEco: r.vehiculo,
          vehiculo: buscarVehiculo(r.vehiculo),//buscarAgente(r.vehiculo),
          id: r.id
        };
        setDataFounded(true);
        return auxRuta;
      });
    } else {
      setDataFounded(false);
    }
    console.log(cRuta);
    setRutaData(...cRuta);
    setLoadingData(false);
    return cRuta[0];
  }

  async function onSubmitAltaManifestos(values) {
    console.log("onsubmit....");
    console.log("action alta");
    //se valida si los dias agregados estan dentro de los dias permitidos en el manifiesto
    let diasTotales =0;
    clientesManif.forEach( (clm) => {
      const dContador = clm.dias === "" ? 0 : Number(clm.dias)
      console.log(dContador)
      console.log(diasTotales + dContador)
      diasTotales = diasTotales + dContador
    })

    console.log('diasTotales agregados:', diasTotales)
    if(diasTotales > props.diasManifiesto){
      console.log("Los dias agregados son mas de los permitidos en el manifiesto")
      setRespuestaAlta({
        resultado: false, mensaje: "Los dias agregados son mas de los permitidos en el manifiesto", tipo: "error"
      });
      return false;
    }else{
      const datosManif = {
        ruta: values.ruta,
        duracion: values.dias,
        operador: values.oper,
        auxiliar: values.aux,
        noEco: values.noEco,
      };
      console.log('datosManif::', datosManif)
      console.log(clientesManif)
      //await AgregarRutasPorPlanta(datosRutas);
      setRespuestaAlta({
        resultado: true, mensaje: "Datos de Viaje agregados correctamente", tipo: "ok"
      });
      setClientesManif([])
      isManifEditable = false
      if (props.actionReset) props.actionReset()
    }
    return true;
  }

  function resetStates() {
    console.log("reseting useStates");
    setOper("");
    setAux("");
    setNoEco("");
  }

  const buscarAgente = (puesto, clave) => {
    console.log("e.target: ", clave);
    const selected = agentes ? agentes.find((op) => op.puesto = puesto && op.clave === clave) : undefined;
    console.log(selected);
    return selected?.nombre ?? '';
  };

  const buscarVehiculo= (claveEco) => {
    console.log("e.target: ", claveEco);
    console.log("valueSelEco: ", claveEco.trim());
    const veh = vehiculos ? vehiculos.find(
      (op) => op.CLAVE.trim() === claveEco.trim()
    ): undefined;
    console.log(veh);
    if (veh) 
        return veh.MARCA + " " + veh.MODELO;
    else 
        return "";
  }

  useEffect(() => {
    console.log("agente: ", agentes);
    if (agentes !== null && agentes.length > 0) {
      console.log("setting onchange Select/Oper");
    } else {
      async function listarAgentes() {
        setLoadingData(true);
        console.log("Onteniendo lista de Agentes::: ");
        const listaAgent = await ObtenerAgentes();
        console.log("listaAgent ", listaAgent);
        setAgentes(listaAgent);
        setLoadingData(false);
      }

      if (agentes !== null && agentes.length === 0) listarAgentes();
    }
  }, [agentes]);

  useEffect(() => {
    console.log("vehiculos: ", vehiculos);

    if (vehiculos !== null && vehiculos.length > 0) {
      console.log("setting onchange SelectVehiculos");
    } else {
      async function listarVehiculos() {
        setLoadingData(true);
        console.log("obteniendo lista de ws Vehiculos");
        const listVehic = await ObtenerVehiculos();
        console.log("listaVehic ", listVehic);
        setVehiculos(listVehic);
        setLoadingData(false);
      }

      listarVehiculos();
    }
  }, [vehiculos]);

  async function loadClientesManif(clave) {
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
    setClientesManif(rowsNew);
}

/**
 * Funcion que recarga la tabla de manifiestos de la ruta
 */
async function reloadClientesManif() {
  setLoading(true)
  let rowsNew = [];
  console.log("lista de Clientes Manifiestis: ", clientesManif);

  if (clientesManif) {
    rowsNew = clientesManif.map((res) => {
      const fechaVisita =  reeestablecerFechaVisita(res.dias, props.fechaInicio.current);
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
  setClientesManif(rowsNew);
  setLoading(false)
}

/**
 * Reestablece el valor de la fecha de visita dependiendo los dias del viaje y la fecha inicial
 * @param diasManif Dias asignados para el viaje
 * @returns La fecha de visita calculada de acuerdo a los parametros
 */
function reeestablecerFechaVisita(diasManif, fechaInicio){
  //se asigna el valor de la f visita dependiendo el valor de los dias capturados y la fecha de inicio seleccionada
  const dias = diasManif !== "" ? Number(diasManif) : 0;
  let valueFvisita= "";
  if (dias > 0) {
    const fechaVisita = new Date(fechaInicio); //yyyy-MM-dd
    const moment = require("moment");

    const startdate = moment(fechaVisita).format("yyyy-MM-DD");
    var new_date = moment(startdate, "yyyy-MM-DD").add(dias, "days");
    valueFvisita= moment(new_date).format("yyyy-MM-DD");
  } else valueFvisita= "";

  console.log(valueFvisita)
  return valueFvisita
}

async function GetClientesManif() {
    console.log("## valores a retornar desde getClientesRuta...", clientesManif);
    return clientesManif;
  }
  
  useEffect(() => {
    console.log("rutaData.clave:", rutaData.clave);
    if (dataFounded) {
        loadClientesManif(rutaData.clave);
    } else {
      resetStates();
    }
  }, [dataFounded, rutaData]);

  return {
    idTableClientesManif,
    opcionesTabla,
    colsClientesManif,
    idModalClientesManif, idToastalta, initValuesAdd,
    onSubmitAltaManifestos, respuestaAlta,
    dataFounded,
    loading,
    loadingData,
    BuscarRuta,
    GetClientesManif, clientesManif, reloadClientesManif,
    rutaData,
    noEco,
    aux,
    oper
  };
};

export default useAltaManifiestos;
