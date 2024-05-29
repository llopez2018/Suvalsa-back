import FetchApi, { FetchApiPost, FetchApiPatch } from "./ConfigFetch";

const URL_CLIENTES = 'http://suvalsa-home.ddns.net:8020/clientes/';
const METHOD_LISTAR = 'listar';
const METHOD_ALTA = 'crear';
const METHOD_BUSCAR = 'ver/';
const METHOD_BORRAR = 'borrar/';
const METHOD_BUSCARCLAVE = 'buscarPorClave/';
const METHOD_ACTUALIZAR = 'actualizarParcial/';
const METHOD_BFAMILIA = 'buscarPorFam/';

//getAll
export async function ObtenerClientes() {
    let dataCli = []

    dataCli = await FetchApi(URL_CLIENTES.concat(METHOD_LISTAR))

    return dataCli.data;
}
//getByid
export async function BuscarCliente(idCliente) {
    let dataCliId = []

    dataCliId = await FetchApi(URL_CLIENTES.concat(METHOD_BUSCAR).concat(idCliente))
    //await FetchApiWithParams( URL_CLIENTES.concat(METHOD_BUSCAR), JSON.stringify({id:idCliente}) )

    return dataCliId.data;
}

//getByFamilia
export async function BuscarClientePorFamilia(claveFamilia) {
    let dataCliId = []

    dataCliId = await FetchApi(URL_CLIENTES.concat(METHOD_BFAMILIA).concat(claveFamilia))
    //http://suvalsa-home.ddns.net:8020/clientes/buscarPorFam/
    console.log(URL_CLIENTES.concat(METHOD_BFAMILIA).concat(claveFamilia))
    return dataCliId.data;
}


//GetByClave
export async function BuscarClientePorClave(clave) {
    let dataCliId = []

    dataCliId = await FetchApi(URL_CLIENTES.concat(METHOD_BUSCARCLAVE).concat(clave))
    //http://suvalsa-home.ddns.net:8020/clientes/buscarPorClave/
    console.log(URL_CLIENTES.concat(METHOD_BUSCARCLAVE).concat(clave))
    return dataCliId.data;
}


//POST
export async function AgregarCliente(data) {
    let responseAlta = null
    responseAlta = await FetchApiPost(URL_CLIENTES.concat(METHOD_ALTA), JSON.stringify(data))

    return { responseAlta };
}
//POST
export async function EliminarCliente(id) {
    let responseAlta = null
    responseAlta = await FetchApiPost(URL_CLIENTES.concat(METHOD_BORRAR), JSON.stringify(id))

    return { responseAlta };
}


//Patch
export async function ActualizarCliente(clave, data) {
    const URL_PATCH = URL_CLIENTES.concat(METHOD_ACTUALIZAR).concat(clave);
    let responseModificar = null;
    responseModificar = await FetchApiPatch(URL_PATCH, JSON.stringify(data));
    return { responseModificar };
}

