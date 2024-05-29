import FetchApi from "./ConfigFetch";

const URL_MANIFIESTOS= 'http://suvalsa-home.ddns.net:8093/queryMani/manifquery/'
const URL_MANIFIESTOS_API= 'http://suvalsa-home.ddns.net:8070/api/manif/max-clave'

// GET
//http://suvalsa-home.ddns.net:8093/queryMani/manifquery/4
// {
//     "id": 2574,
//     "clave": "4",
//     "ciudad": "Acapulco",
//     "fam": "BASE",
//     "nombre": "Suvalsa (Acapulco)",
//     "ruta": "4",
//     "orden": 1.0,
//     "serv": "NA",
//     "planta": "2997",
//     "rutaplanta": "",
//     "cliente": "238"
// },

//get
export async function ObtenerClientesManifiestos(clave) {
    let dataClientes= []

    dataClientes = await FetchApi(URL_MANIFIESTOS.concat(clave))

    return  dataClientes.data ;
}

//get
export async function ObtenerMaxManifiesto() {
    let maxManif= ''

    maxManif = await FetchApi(URL_MANIFIESTOS_API)

    return  maxManif.data ;
}