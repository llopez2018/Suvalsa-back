import { useEffect, useState } from "react";
import { createOption } from "../../../utils/CommonUtils";
import { ObtenerAgentes, ObtenerVehiculos } from "../../../Apis/FetchCatalogos";
import { Select } from "tw-elements";
import {CrearRuta} from '../../../Apis/FetchRutas'

const useAltaRutas = () => {
  const [gettingData, setGettingData] = useState(false);
  const [agentes, setAgentes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [oper, setOper] = useState("");
  const [aux, setAux] = useState("");
  const [noEco, setNoEco] = useState("");

  function resetStates() {
    console.log("reseting useStates");
    setOper("");
    setAux("");
    setNoEco("");
  }

  const idToastalta = "toastAltaRuta";

  const initValuesAdd = {
    clave: "",
    nombre: "",
    duracion: "0",
    oper: "",
    aux: "",
    noEco: "",
    operador: "",
    auxiliar: "",
    vehiculo: ""
  };

  async function AgregarDatosRuta(values) {
    console.log("action alta");
    console.log(values)
    const datosRutas = {
      clave: values.clave,
      nombre: values.nombre,
      duracion: values.duracion,
      operador: values.oper,
      auxiliar: values.aux,
      vehiculo: values.noEco
    };
    await CrearRuta(datosRutas);
    return true;
  }

  const agregarSelectAg = (agentes, puesto) => {
    if (agentes === null) {
      return "";
    }
    const ags = agentes.filter((ags) => ags.puesto === puesto);
    console.log(ags.length);

    return ags.map((ag) =>
      createOption(ag.id, ag.clave, ag.clave)
    );
  };

  const agregarSelectNoEco = (vehiculos) => {
    if (vehiculos === null) {
      return "";
    }

    return vehiculos.map((veh) =>
      createOption(
        veh.id,
        veh.CLAVE,
        veh.CLAVE
      )
    );
  };

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
      (op) =>
        (op.CLAVE).trim() === valueSelEco.trim()
    );
    console.log(selected);
    if (selected) setNoEco(selected.MARCA + " " + selected.MODELO);
    else setNoEco("");
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
      const singleSelect = document.querySelector("#selectOper");
      if (singleSelect) Select.getOrCreateInstance(singleSelect);

      const singleSelectAux = document.querySelector("#selectAux");
      if (singleSelectAux) Select.getOrCreateInstance(singleSelectAux);
    } else {
      async function listarAgentes() {
        setGettingData(true);
        console.log("Onteniendo lista de Agentes::: ");
        const listaAgent = await ObtenerAgentes();
        console.log("listaAgent ", listaAgent);
        setAgentes(listaAgent);
        setGettingData(false);
      }

      if (agentes !== null && agentes.length === 0) listarAgentes();
    }
  }, [agentes]);

  useEffect(() => {
    console.log("vehiculos: ", vehiculos);

    if (vehiculos !== null && vehiculos.length > 0) {
      console.log("setting onchange SelectVehiculos");
      const mySelectV = document.getElementById("selectVehic");
      mySelectV.addEventListener("valueChange.te.select", (e) => {
        onChangeNoEco(e);
      });

      const singleSelectV = document.querySelector("#selectVehic");
      Select.getOrCreateInstance(singleSelectV);
    } else {
      async function listarVehiculos() {
        setGettingData(true);
        console.log("obteniendo lista de ws Vehiculos");
        const listVehic = await ObtenerVehiculos();
        console.log("listaVehic ", listVehic);
        setVehiculos(listVehic);
        setGettingData(false);
      }

      listarVehiculos();
    }
  }, [vehiculos]);

  useEffect(() => {
    const selectOper = document.querySelector("#selectOper");
    if (selectOper) Select.getOrCreateInstance(selectOper);
    const selectVehic = document.querySelector("#selectVehic");
    if (selectVehic) Select.getOrCreateInstance(selectVehic);
    const selectAux = document.querySelector("#selectAux");
    if (selectAux) Select.getOrCreateInstance(selectAux);
  }, []);

  return {
    idToastalta,
    initValuesAdd,
    gettingData,
    AgregarDatosRuta,
    agregarSelectAg,
    agregarSelectNoEco,
    oper,
    aux,
    noEco,
    agentes,
    vehiculos,
    resetStates
  };
};

export default useAltaRutas;
