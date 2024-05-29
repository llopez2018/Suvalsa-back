import FetchApi from "./ConfigFetch";

const URL_INSUMOS= 'http://suvalsa-home.ddns.net:8030/insumos/'
const METHOD_LISTAR = 'listar';
// GET
//http://suvalsa-home.ddns.net:8030/insumos/listar 
// {
//     "id": 6,
//     "CLAVE": "6",
//     "NOMBRE": "Bolsa de polietileno",
//     "MODELO": "Rojo de 60 x 80 cm",
//     "UNIDAD": "Pz",
//     "TIPO": "",
//     "EXISTEN": 0.0,
//     "PRECIO": 3.0,
//     "CANTIDAD": 0.0,
//     "MINIMO": null,
//     "MAXIMO": null,
//     "nombre": "Bolsa de polietileno",
//     "clave": "6",
//     "unidad": "Pz",
//     "tipo": "",
//     "modelo": "Rojo de 60 x 80 cm",
//     "minimo": null,
//     "cantidad": 0.0,
//     "maximo": null,
//     "existen": 0.0,
//     "precio": 3.0
//     },

//getAll
export async function ObtenerInsumos() {
    let dataInsumos= []

    dataInsumos = await FetchApi(URL_INSUMOS.concat(METHOD_LISTAR))

    return  dataInsumos.data ;
}