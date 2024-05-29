import { CrearFamilia } from "../../Apis/FetchFamilias";

export const idToastalta = "toastAltaFamilia";

export const initValuesAdd = {
    clave: "",
    nombre: "",
  };

export async function AgregarFamilia(values) {
    console.log("action alta");
    const datosFam = {
        clave: values.clave,
        nombre: values.nombre
    };
    await CrearFamilia(datosFam);
    return true;
  }

export const urlCatalogo = "/suvalsa/catalogos/familias";