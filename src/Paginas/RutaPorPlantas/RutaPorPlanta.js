import { AgregarRutasPorPlanta } from "../../Apis/FetchCatalogos";

export const idToastalta = "toastAltaRutaPlantas";

export const initValuesAdd = {
    planta: "",
    nombre: "",
    rutaplanta: ""
  };

export async function AgregarRuta(values) {
    console.log("action alta");
    const datosRutasP = {
      planta: values.planta,
      //rutaplanta: values.nombre
      rutaplanta: values.rutaplanta
    };
    await AgregarRutasPorPlanta(datosRutasP);
    return true;
  }

export const urlCatalogo = "/suvalsa/catalogos/rutas-para-plantas";