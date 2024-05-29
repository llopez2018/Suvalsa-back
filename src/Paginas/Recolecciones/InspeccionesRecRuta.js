import { createOption } from "../../utils/CommonUtils";

export const idToastalta = "toastAltaRecRuta";

export const initValuesAdd = {
    ruta: "",
    nombre: "",
    dias: "",
    fInicio: "",
    fEnvio: "",
    operador: "",
    auxiliar: "",
    vehiculo: "",
  };

export async function AgregarRecRuta(values) {
    console.log("action alta");
    const datosRutas = {
      ruta: values.ruta,
      dias: values.dias,
      fInicio: values.fInicio,
      fEnvio: values.fEnvio,
    };
    //await AgregarRutasPorPlanta(datosRutas);
    return true;
  }

//export const urlCatalogo = "/suvalsa/catalogos/rutas-para-plantas";

export const agregarSelectAg = (agentes, puesto) => {
  if (agentes === null) {
    return "";
  }
  const ags = agentes.filter((ags) => ags.puesto === puesto);
  console.log(ags.length);

  return ags.map((ag) => (
    createOption(ag.id, ag.clave, ag.clave + ' ' + ag.nombre )
  ));
};

export const agregarSelectNoEco = (vehiculos) => {
  if (vehiculos === null) {
    return "";
  }

  return vehiculos.map((veh) => (
    createOption(veh.id, veh.trial_clave_1 + " "+ veh.trial_marca_2 + " " + veh.modelo, veh.trial_clave_1 + " "+ veh.trial_marca_2 + " " + veh.modelo)
  ));
};