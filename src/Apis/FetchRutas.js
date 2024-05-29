import FetchApi, { FetchApiDelete, FetchApiPost, FetchApiPut } from "./ConfigFetch";

const URL_RUTAS = 'http://suvalsa-home.ddns.net:8092/Funcionalidad/Rutas/';
const URL_CLIENTES_EN_RUTA = 'http://suvalsa-home.ddns.net:8093/cliente/';
const URL_CLIENTES_RUTA = 'http://suvalsa-home.ddns.net:8092/Funcionalidad/ClientesXRuta/';
const METHOD_LISTAR = "listar";
const METHOD_ALTA = "crear";
const METHOD_ACT = "update";
const METHOD_DEL = "eliminar";
const METHOD_BUSCAR_CL = 'clave/';
const METHOD_BUSCAR_NM = 'nombre/';

// GET
// http://suvalsa-home.ddns.net:8093/cliente/query/4

// GET
// http://suvalsa-home.ddns.net:8092/Funcionalidad/ClientesXRuta/listar/8640

// POST
// http://suvalsa-home.ddns.net:8092/Funcionalidad/ClientesXRuta/crear
// {
//     "clave": "1",
//     "orden": "186.0",
//     "cliente": "3746"
// }

// PUT
// http://suvalsa-home.ddns.net:8092/Funcionalidad/ClientesXRuta/update/8640
// {
//     "clave": "1",
//     "orden": "186.0",
//     "cliente": "306"
// }

//http://suvalsa-home.ddns.net:8092/Funcionalidad/Rutas/update/2
// {
//     "id": 2,
//     "clave": "2",
//     "nombre": "ACA GRO",
//     "operador": "EXT",
//     "auxiliar": "EXT",
//     "vehiculo": "EXT",
//     "duracion": "30"
// }
//get
export async function ObtenerRutas() {
    let dataFam= []

    dataFam = await FetchApi(URL_RUTAS.concat(METHOD_LISTAR))

    return  dataFam.data ;
}
//getById
export async function BuscarRutaId(idRuta) {
    let dataRutaId= []

    dataRutaId = await FetchApi(URL_RUTAS.concat(idRuta))

    return  dataRutaId.data ;
}
//getByClave
export async function BuscarRutaClave(clave) {
    let dataRutaClave= []

    dataRutaClave = await FetchApi(URL_RUTAS.concat(METHOD_BUSCAR_CL).concat(clave))

    return  dataRutaClave.data ;
}
//getByNombre like
export async function BuscarRutaNombre(nombre) {
    let dataRutaName= []

    dataRutaName = await FetchApi(URL_RUTAS.concat(METHOD_BUSCAR_NM).concat(nombre))

    return  dataRutaName.data ;
}

//get
export async function ObtenerClientesRuta(clave) {
    let dataClientes= []

    dataClientes = await FetchApi(URL_CLIENTES_EN_RUTA.concat('query/'.concat(clave)))

    return  dataClientes.data ;
}

//get
export async function ObtenerClienteRutaId(id) {
    let dataClientesR= []

    dataClientesR = await FetchApi(URL_CLIENTES_RUTA.concat(METHOD_LISTAR.concat(id)))

    return  dataClientesR.data ;
}

//POST
export async function CrearRuta(data) {
    let responseRuta= null
    responseRuta = await FetchApiPost(URL_RUTAS.concat(METHOD_ALTA), JSON.stringify(data))

    return {responseRuta: responseRuta};
}

//POST
export async function CrearClienteRuta(data) {
    let responseClienteRuta= null
    responseClienteRuta = await FetchApiPost(URL_CLIENTES_RUTA.concat(METHOD_ALTA), JSON.stringify(data))

    return {responseClienteRuta: responseClienteRuta};
}

//PUT
export async function ActualizarRuta(idRuta, data) {
    let responseActRuta= null
    responseActRuta = await FetchApiPut(URL_RUTAS.concat(METHOD_ACT).concat('/'+idRuta), JSON.stringify(data))

    return {responseActRuta: responseActRuta};
}
//PUT
export async function ActualizarClienteRuta(idCliente, data) {
    let responseActClRuta= null
    responseActClRuta = await FetchApiPut(URL_CLIENTES_RUTA.concat(METHOD_ACT).concat('/'+idCliente), JSON.stringify(data))

    return {responseActClienteRuta: responseActClRuta};
}

//http://suvalsa-home.ddns.net:8092/Funcionalidad/ClientesXRuta/eliminar/clave/{CLAVE}/clienteId/{CLIENTE}
//DELETE
export async function EliminarClienteRuta(clave, idCliente) {
    let responseDelClRuta= null
    responseDelClRuta = await FetchApiDelete(URL_CLIENTES_RUTA.concat(METHOD_DEL).concat('/clave/'+clave).concat('/clienteId/'+idCliente))

    return {responseDelClienteRuta: responseDelClRuta};
}