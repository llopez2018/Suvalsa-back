import FetchApi, { FetchApiDelete, FetchApiPost } from "./ConfigFetch";

const URL_SERVS = 'http://suvalsa-home.ddns.net:8010/servicios/';
const METHOD_LISTAR = "listar";
const METHOD_ALTA = "crear";
const METHOD_BORRAR = "borrar/";

//get
export async function ObtenerServicios() {
    let dataFam= []

    dataFam = await FetchApi(URL_SERVS.concat(METHOD_LISTAR))

    return  dataFam.data ;
}
//POST
export async function CrearServicio(data) {
    let responseFam= null
    responseFam = await FetchApiPost(URL_SERVS.concat(METHOD_ALTA), JSON.stringify(data))

    return {responseFam};
}
//DELETE
export async function EliminarServicio(id) {
    let responseDelete = null;
    const urlDelete = URL_SERVS.concat(METHOD_BORRAR + id);
    responseDelete = await FetchApiDelete(urlDelete);
  
    return { responseAlta: responseDelete };
  }

