import { useEffect, useState } from "react";
import { Input, Toast, initTE } from "tw-elements";
import { ObtenerAgentes, ObtenerVehiculos } from "../../../Apis/FetchCatalogos";
import { BuscarRutaClave, ObtenerClientesRuta, CrearClienteRuta, ActualizarClienteRuta, ActualizarRuta, EliminarClienteRuta } from "../../../Apis/FetchRutas";
import { createOption } from "../../../utils/CommonUtils";

const useActualizarRuta = () => {
  initTE({ Input });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [validaOrdenes, setValidaOrdenes] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [dataFounded, setDataFounded] = useState(false);
  //Hook lista de clientes nuevos a agregar
  const [addClientes, setAddClientes] = useState([]);
  //Hook lista de clientes editados
  const [editClientes, setEditClientes] = useState([]);
  //Hook lista de clientes eliminados
  const [removeClientes, setRemoveClientes] = useState([]);
  const [agentes, setAgentes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [oper, setOper] = useState("");
  const [aux, setAux] = useState("");
  const [noEco, setNoEco] = useState("");
  const [noEco2, setNoEco2] = useState("");

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
  const [clientesRuta, setClientesRuta] = useState([]);
  const [clientesRutaActuales, setClientesRutaActuales] = useState([]);

  const idToastactualizaRuta = "toastActualizaRuta";
  const idToastDelete = "toastClientes";
  const idModalRetirarCliente = "modalRetirarClientes";
  const idModalClientes = "modalClientes";
  const idTableClientesRuta = "tablaClientesRuta";
  const idTableClientes = "tablaClientes";

  const opcionesTabla = { ofText: "Clientes en Ruta de" };
  const opcionesTablaClientes = { ofText: "Clientes de", multiSelect: true };

  const formatEditable = (cell, value) => {
    cell.setAttribute('role' , 'input')
    cell.classList.add("Editable");
    cell.addEventListener('keyup', function (e) {
      let curval = e.target.innerHTML;
      e.target.innerHTML = curval.replace(/[^0-9]/g, '')
      curval = Number(e.target.innerHTML)

      setTimeout(function() {
          // check if new value is more or equal to 255
          if (typeof curval === "number"){
            console.log('valor numerico permitido')
            if (curval <= 0) {
              // fill with previous value
              console.log('valor no permitido')
              e.target.innerHTML = '';
              e.target.classList.add('border-[1px]')
              e.target.classList.add('border-red-600')
              //se apunta el flag a false para indicar que no pasa esta validacion de ordenes
              setValidaOrdenes(false)
            }else{
              setValidaOrdenes(true)
              console.log('valor ingresado:', curval)
              e.target.innerHTML = curval
              e.target.classList.remove('border-[1px]')
              e.target.classList.remove('border-red-600')
            }
        }else{
          console.log('valor no permitido. El valor debe ser numerico')
             //se apunta el flag a false para indicar que no pasa esta validacion de ordenes
             setValidaOrdenes(false)
        }
      }, 1);
    });
  };

  const formatCell = (cell, value) => {
    cell.classList.add("hidden");
  };

  const formatEditCell = (cell, value) => {
    cell.setAttribute("contenteditable", "false");
  };
  
  const columnas = [
    { label: "Ord.", field: "orden", sort: true, width: 50, fixed: true,  format: formatEditable },
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true, format: formatEditCell },
    { label: "Nombre", field: "nombre", sort: true, format: formatEditCell },
    { label: "Familia", field: "familia", sort: true, width: 50, fixed: true, format: formatEditCell },
    { label: "Ciudad", field: "ciudad", sort: true, format: formatEditCell },
    //recoleccion
    { label: "Servicio", field: "servicio", sort: true, format: formatEditCell },
    //{ label: "Ruta", field: "ruta", sort: false, width: 10, format: formatCell },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

  const colsClientes = [
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Nombre", field: "nombre", sort: true },
    { label: "Familia", field: "familia", sort: true, width: 50, fixed: true },
    //recoleccion
    { label: "Ciudad", field: "ciudad", sort: true },
    { label: "Servicio", field: "servicio", sort: true },
    { label: "Ruta", field: "ruta", sort: true },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
  ];

  const initValuesAc = {
    clave: "",
    nombre: "",
    duracion: "",
    oper: "",
    aux: "",
    noEco1: "",
    noEco2: "",
    operador: "",
    auxiliar: "",
    vehiculo: "",
    vehiculo2: ""
  };

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
        aux: "",
        vehiculo1: "",
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
          aux: r.auxiliar,
          vehiculo1: r.vehiculo,
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
    setValidaOrdenes(true)
    setLoadingData(false);
    return cRuta[0];
  }

  async function loadClientesRuta(clave) {
    const clientesRuta = await ObtenerClientesRuta(clave);
    respaldarClientes(clientesRuta)
    let cRuta = [];
    if (clientesRuta) {
      cRuta = clientesRuta.map((r) => ({
        orden: r.orden,
        clave: r.cliente,
        nombre: r.nombre,
        familia: r.fam,
        ciudad: r.ciudad,
        servicio: r.serv,
        id: r.id
      }));
    }
    setClientesRuta(cRuta);
  }

  const respaldarClientes = (clientesR) =>{
    let cRuta = [];
    if (clientesRuta) {
      cRuta = clientesR.map((cr) => ({
        orden: cr.orden,
        clave: cr.cliente,
        nombre: cr.nombre,
        familia: cr.fam,
        ciudad: cr.ciudad,
        servicio: cr.serv,
        id: cr.id
      }));
    }
    console.log('clientes ruta actuales',cRuta)
    setClientesRutaActuales(cRuta)
  }

  async function GetClientesRuta() {
    console.log("## valores a retornar desde getClientesRuta...", clientesRuta);
    return clientesRuta;
  }

  const AddData = (datasSelected) => {
    const newClientesRuta = [...clientesRuta];
    console.log(datasSelected);
    datasSelected.forEach((s) => {
      console.log(s.clave);
      const newC = {
        orden: (newClientesRuta.length + 1).toString(),
        clave: s.clave,
        nombre: s.nombre,
        familia: s.familia,
        ciudad: s.ciudad,
        servicio: s.servicio,
        id: s.id
      };
      newClientesRuta.push(newC);
    });
    console.log("newClientesRuta:::", newClientesRuta);
    setClientesRuta(newClientesRuta);
  };

  function OrdenarLista(rowsData) {
    console.log(
      "Funcion para ordenar la lista de clientes, colocando valores ascendentes al campo Orden"
    );

    const tmpClientesRuta=[...rowsData];
      console.log(tmpClientesRuta)
    tmpClientesRuta.sort(function (a, b) {
      if (a.orden > b.orden) {
        return 1;
      }
      if (a.orden < b.orden) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
      let noOrden = 1;
      tmpClientesRuta.map( (clRuta) => {
        clRuta.orden = noOrden
        noOrden++;
        return clRuta
      })
    console.log('tmpOrden', tmpClientesRuta)
    return tmpClientesRuta
  }

  async function mostrarResultadoActualiza() {
    console.log(document.getElementById(idToastactualizaRuta));
    const myToastAct = document.getElementById(idToastactualizaRuta);
    console.log(Toast.getInstance(myToastAct));
    Toast.getOrCreateInstance(myToastAct).show();
  }

  async function onSubmitActualizaRuta(values, { resetForm }) {
    console.log("onsubmit....");
    if(validaOrdenes){
      setLoading(true);
      const datosActRuta = {
        id: rutaData.id,
        clave: values.clave,
        nombre: values.nombre,
        duracion: values.duracion,
        operador: values.oper,
        auxiliar: values.aux,
        vehiculo: values.noEco1,
        //noEco2: values.noEco2
      };
      await sleep(5000);
      await ActualizarRutaCliente(datosActRuta);
      console.log("datosActRuta:", datosActRuta);
      await ProcesarClienteRuta(values.clave)
      //await resetForm();
      setLoading(false);
      await mostrarResultadoActualiza();
      await BuscarRuta(values.clave) 
    }else{
      alert('Por favor revisa que todos los clientes cuenten con un orden correcto.')
    }
  }

  async function ProcesarClienteRuta(claveRuta){
    console.log("onsubmit....");
    setLoading(true);
    if(clientesRuta && claveRuta){
      await sleep(1000);
      let auxClientes = clientesRutaActuales;
      console.log(clientesRutaActuales.length)
      if(clientesRutaActuales.length >0){
        clientesRutaActuales.forEach( (clienteActual) =>{
          //primero validamos si se borraron todos los clientes de la lista, 
          if(clientesRuta.length > 0) {
            const clienteEliminado = clientesRuta.find( (c) => (c.clave === clienteActual.clave ))
            //se valida si ya no existe el cliente en la lsita original de clientes
            if(!clienteEliminado){
              //aqui se procede a ejecutar el servicio de eliminacion y borrarlo de la lista de clientesRuta
              console.log('se elimina el registro:',clienteActual.clave)
              EliminarClienteRuta(claveRuta, clienteActual.clave)
              //si no se enceuntra el cliente ya en la lista original, se borra de la lista auxClientes
              auxClientes = auxClientes.filter( (auxC) => auxC.clave !== clienteActual.clave)
            }
          }else{
            console.log('se procede a eliminar el cliente de la lista actual ya que se borraron todos desde la pagina y ya no se realiza otra accion')
            EliminarClienteRuta(claveRuta, clienteActual.clave)
            //si no se enceuntra el cliente ya en la lista original, se borra de la lista auxClientes
            auxClientes = auxClientes.filter( (auxC) => auxC.clave !== clienteActual.clave)
          }
        })
      }
      console.log('auxClientes:', auxClientes)
      //se reordenan los clientes en base al campo orden
      const clientesRutaOrdenados = OrdenarLista(clientesRuta)
      console.log('clientes Re-ordenados',clientesRutaOrdenados)
      clientesRutaOrdenados.forEach( async (clienteRuta) => {
        const dataClienteRuta = {
          clave : claveRuta,
          orden: clienteRuta.orden,
          cliente: clienteRuta.clave
        }
        if(auxClientes.length >0){
          //se obtiene el cliente de la lista original de clientes de ruta
          const existeCliente = auxClientes.find( (c) => (c.clave === clienteRuta.clave ))
          if(existeCliente){//si se encuentra el cliente en la lista, solo se pudo haber editado o no
            //si el orden cambio en clientesRutaOrdenados se procede a invocar el servicio de update
            if(existeCliente.orden !== clienteRuta.orden){
              //aqui se consume el servicio de actualizacion de este cliente, ya que si se encontro y se edito el orden
              console.log('cliente a actualizar por cambio de orden:', dataClienteRuta)
              await ActualizarOrdenClienteRuta( existeCliente.id, dataClienteRuta)
            }
            //else : aqui ya no aplica un else ya que en este punto, no se actualizo el cliente asi que no se realiza accion
          }else{
            console.log('el cliente',clienteRuta.clave,'NO fue editado, se procede a agregarlo como nuevo')
            await CrearClienteRuta(dataClienteRuta)
          }
        }else{
          console.log('no existen clientes agregados actualmente para la ruta, se procede a agregar todos de la lista como nuevos clientes')
          await CrearClienteRuta(dataClienteRuta)
        }
        
      })
    }
    setLoading(false);
  }

  async function ActualizarRutaCliente(data) {
    await ActualizarRuta(rutaData.id, data)
  }

  async function ActualizarOrdenClienteRuta(id, ruta) {
    await ActualizarClienteRuta(id, ruta)
  }

  function resetStates() {
    console.log("reseting useStates");
    setOper("");
    setAux("");
    setNoEco("");
    setNoEco2("");
    setClientesRuta([]);
  }

  const onChangeOper = (e) => {
    console.log("e.target: ", e.target);
    const valueSel = e.target.value.trim();
    const selected = agentes.find((op) => op.clave === valueSel);
    console.log(selected);
    if (selected) setOper(selected.nombre);
  };

  const onChangeAux = (e) => {
    console.log("e.target: ", e.target);
    const valueSelAux = e.target.value.trim();
    const selected = agentes.find((op) => op.clave === valueSelAux);
    console.log(selected);
    if (selected) setAux(selected.nombre);
  };

  const onChangeNoEco = (e) => {
    console.log("e.target: ", e.target);
    const valueSelEco = e.target.value.trim();
    console.log("valueSelEco: ", valueSelEco.trim());
    const selected = vehiculos.find(
      (op) => op.CLAVE.trim() === valueSelEco.trim()
    );
    console.log(selected);
    if (selected) setNoEco(selected.MARCA + " " + selected.MODELO);
    else setNoEco("");
  };

  const onChangeNoEco2 = (e) => {
    console.log("e.target: ", e.target);
    const valueSelEco = e.target.value.trim();
    console.log("valueSelEco: ", valueSelEco.trim());
    const selected = vehiculos.find(
      (op) => op.CLAVE.trim() === valueSelEco.trim()
    );
    console.log(selected);
    if (selected) setNoEco2(selected.MARCA + " " + selected.MODELO);
    else setNoEco2("");
  };

  const agregarSelectAg = (puesto, defaultValue) => {
    if (agentes === null) {
      return "";
    }
    const ags = agentes.filter((ags) => ags.puesto === puesto);
    console.log(ags.length);

    let currentAg = [];
    if (defaultValue) {
      const agsCurrent = agentes.filter(
        (ags) => ags.puesto === puesto && ags.clave === defaultValue
      );
      console.log("puesto:", puesto);
      console.log("agsCurrent:", agsCurrent);
      if (agsCurrent.length === 0)
        currentAg.push(createOption(defaultValue, defaultValue, defaultValue));
      console.log("currentAg", currentAg);
    }

    ags.forEach((ag) =>
      currentAg.push(createOption(ag.id, ag.clave, ag.clave))
    );

    console.log("currentAg", puesto, currentAg);
    return currentAg;
    // return ags.map((ag) =>
    //   createOption(ag.id, ag.clave, ag.clave)
    // );
  };
  const agregarSelectNoEco = () => {
    if (vehiculos === null) {
      return "";
    }

    return vehiculos.map((veh) => createOption(veh.id, veh.CLAVE, veh.CLAVE));
  };

  useEffect(() => {
    console.log("agente: ", agentes);
    if (agentes !== null && agentes.length > 0) {
      console.log("setting onchange Select/Oper");
      const mySelect = document.getElementById("selectOper");
      mySelect.addEventListener("valueChange.te.select", (e) => {
        onChangeOper(e);
      });
      const mySelectAux = document.getElementById("selectAux");
      mySelectAux.addEventListener("valueChange.te.select", (e) => {
        onChangeAux(e);
      });
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
      //noEco 1
      const mySelectV = document.getElementById("selectVehic1");
      mySelectV.addEventListener("valueChange.te.select", (e) => {
        onChangeNoEco(e);
      });
      //noEco 2
      const mySelectV2 = document.getElementById("selectVehic2");
      mySelectV2.addEventListener("valueChange.te.select", (e) => {
        onChangeNoEco2(e);
      });
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

  useEffect(() => {
    console.log("rutaData.clave:", rutaData.clave);
    if (dataFounded) {
      loadClientesRuta(rutaData.clave);

      console.log("rutaData.oper", rutaData.oper);
      const eOper = {
        target: {
          value: rutaData?.oper ?? ''
        }
      };
      onChangeOper(eOper);

      const eAux = {
        target: {
          value: rutaData?.aux ?? ''
        }
      };
      onChangeAux(eAux);

      const e = {
        target: {
          value: rutaData?.vehiculo1 ?? ''
        }
      };
      onChangeNoEco(e);
    } else {
      resetStates();
    }
  }, [dataFounded, rutaData]);


  return {
    dataFounded,
    loading,
    loadingData,
    loadClientesRuta,
    AddData,
    BuscarRuta,
    setClientesRuta,
    idTableClientesRuta,
    idTableClientes,
    opcionesTabla,
    opcionesTablaClientes,
    columnas,
    colsClientes,
    rutaData,
    GetClientesRuta,
    clientesRuta,
    initValuesAc,
    idToastactualizaRuta,
    idToastDelete,
    idModalClientes,
    idModalRetirarCliente,
    onSubmitActualizaRuta,
    agregarSelectAg,
    agregarSelectNoEco,
    noEco,
    noEco2,
    aux,
    oper
  };
};

export default useActualizarRuta;
