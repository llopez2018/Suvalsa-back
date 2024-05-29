import FetchApi, { FetchApiDelete, FetchApiPost } from "./ConfigFetch";

const URL_SALIDAS = "http://suvalsa-home.ddns.net:8030/salidas/";
const METHOD_ALTA = "crear";

export async function ObtenerMaxSalida() {
  let max = "";

  max = await FetchApi(URL_SALIDAS.concat("maxnumero"));

  return max.data;
}

//DELETE
//http://suvalsa-home.ddns.net:8030/salidas/{numero}
export async function EliminarSalida(numero) {
    let salida = "";
  
    salida = await FetchApiDelete(URL_SALIDAS.concat(numero));
  
    return salida.data;
  }

  //http://suvalsa-home.ddns.net:8030/salidas/manifiesto/307329
  //GET
  export async function ObtenerSalidasManif(numero) {
    let salida = "";
  
    salida = await FetchApi(URL_SALIDAS.concat('manifiesto/' + numero));
  
    return salida.data;
  }
//http://suvalsa-home.ddns.net:8030/salidas/crear
// {
//     "numero": "10000",
//     "fecha": "2024-05-10",
//     "tipo": "A",
//     "insumo": "INS1",
//     "cantidad": 150.00,
//     "unidad": "KG",
//     "referencia": "REF1234567",
//     "familia": "FAM1",
//     "cliente": "CLI1",
//     "manif": "MANIF1234567",
//     "factura": "FACT1",
//     "usom": "UM",
//     "status": "1"
//   }  
//POST
export async function CrearSalida(data) {
  let responseFam = null;
  responseFam = await FetchApiPost(
    URL_SALIDAS.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseFam };
}
