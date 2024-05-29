import FetchApi, { FetchApiDelete, FetchApiPost } from "./ConfigFetch";

const URL_FAMILIAS = 'http://suvalsa-home.ddns.net:8060/familia/';
const METHOD_LISTAR = "listar";
const METHOD_ALTA = "alta";
const METHOD_BORRAR = "borrar/";

//get
export async function ObtenerFamilias() {
    let dataFam= []

    dataFam = await FetchApi(URL_FAMILIAS.concat(METHOD_LISTAR))

    return  dataFam.data ;
}
//POST
export async function CrearFamilia(data) {
    let responseFam= null
    responseFam = await FetchApiPost(URL_FAMILIAS.concat(METHOD_ALTA), JSON.stringify(data))

    return {responseFam};
}
//DELETE
export async function EliminarFamilia(id) {
    let responseDelete = null;
    const urlDelete = URL_FAMILIAS.concat(METHOD_BORRAR + id);
    responseDelete = await FetchApiDelete(urlDelete);
  
    return { responseAlta: responseDelete };
  }

