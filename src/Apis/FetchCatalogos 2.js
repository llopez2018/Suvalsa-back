import FetchApi, { FetchApiPost, FetchApiDelete } from "./ConfigFetch";

const URL_PROVEEDORES = "http://suvalsa-home.ddns.net:8030/provedores/";
const URL_FRECUENCIAS = "http://suvalsa-home.ddns.net:8030/frecuencia/";
const URL_AGENTES = "http://suvalsa-home.ddns.net:8030/agentes/";
const URL_INSUMOS = "http://suvalsa-home.ddns.net:8030/insumos/";
const URL_RESIDUOS = "http://suvalsa-home.ddns.net:8030/residuos/";
const URL_VEHICULOS = "http://suvalsa-home.ddns.net:8030/vehiculos/";
const URL_TRABAJOS = "http://suvalsa-home.ddns.net:8030/trabajos/";
const URL_NUMEROS_DATOS = "http://suvalsa-home.ddns.net:8030/datos-numeros/";
const URL_RUTAS_PLANTA = "http://suvalsa-home.ddns.net:8030/rutas/";
const METHOD_LISTAR = "listar";
const METHOD_ALTA = "crear";
const METHOD_BUSCAR = "ver/";
const METHOD_BORRAR = "borrar/";

//getAll
export async function ObtenerProveedores() {
  let dataProv = [];

  dataProv = await FetchApi(URL_PROVEEDORES.concat(METHOD_LISTAR));

  return dataProv.data;
}
//getByid
export async function BuscarProveedor(idProv) {
  let dataProvId = [];

  dataProvId = await FetchApi(
    URL_PROVEEDORES.concat(METHOD_BUSCAR).concat(idProv)
  );
  //await FetchApiWithParams( URL_PROVEEDORES.concat(METHOD_BUSCAR), JSON.stringify({id:idProv}) )

  return dataProvId.data;
}
//POST
export async function AgregarProveedor(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_PROVEEDORES.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarProveedor(id) {
  let responseDelete = null;
  const urlDelete = URL_PROVEEDORES.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}

//getAll
export async function ObtenerFrecuencias() {
  let dataFrec = [];

  dataFrec = await FetchApi(URL_FRECUENCIAS.concat(METHOD_LISTAR));

  return dataFrec.data;
}
//POST
export async function AgregarFrecuencia(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_FRECUENCIAS.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarFrecuencia(id) {
  let responseDelete = null;
  const urlDelete = URL_FRECUENCIAS.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}
/**
 * OPERACIONES PERSONAL
 */
//getAll
export async function ObtenerAgentes() {
  let dataAgent = [];

  dataAgent = await FetchApi(URL_AGENTES.concat(METHOD_LISTAR));

  return dataAgent.data;
}
//POST
export async function AgregarAgente(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_AGENTES.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarAgente(id) {
  let responseDelete = null;
  const urlDelete = URL_AGENTES.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}
/**OPERACIONES INSUMOS */
//getAll
export async function ObtenerInsumos() {
  let dataInsu = [];

  dataInsu = await FetchApi(URL_INSUMOS.concat(METHOD_LISTAR));

  return dataInsu.data;
}
//POST
export async function AgregarInsumo(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_INSUMOS.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarInsumo(id) {
  let responseDelete = null;
  const urlDelete = URL_INSUMOS.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}
/**OPERACIONES RESIDUOS */
//getAll
export async function ObtenerResiduos() {
  let dataResi = [];

  dataResi = await FetchApi(URL_RESIDUOS.concat(METHOD_LISTAR));

  return dataResi.data;
}
//POST
export async function AgregarResiduo(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_RESIDUOS.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarResiduo(id) {
  let responseDelete = null;
  const urlDelete = URL_RESIDUOS.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}
/**OPERACIONES VEHICULOS */
//getAll
export async function ObtenerVehiculos() {
  let dataVehic = [];

  dataVehic = await FetchApi(URL_VEHICULOS.concat(METHOD_LISTAR));

  return dataVehic.data;
}
//POST
export async function AgregarVehiculo(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_VEHICULOS.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarVehiculo(id) {
  let responseDelete = null;
  const urlDelete = URL_VEHICULOS.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}
/**OPERACIONES TRABAJOS REALIZADOS */
//getAll
export async function ObtenerTrabajos() {
  let dataTrab = [];

  dataTrab = await FetchApi(URL_TRABAJOS.concat(METHOD_LISTAR));

  return dataTrab.data;
}
//POST
export async function AgregarTrabajo(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_TRABAJOS.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarTrabajo(id) {
  let responseDelete = null;
  const urlDelete = URL_TRABAJOS.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}
/**OPERACIONES numeros datos control */
//getAll
export async function ObtenerNumerosDatosCtrl() {
  let dataNoDatos = [];

  dataNoDatos = await FetchApi(URL_NUMEROS_DATOS.concat(METHOD_LISTAR));

  return dataNoDatos.data;
}
//POST
export async function AgregarNumerosDatosCtrl(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_NUMEROS_DATOS.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarNumerosDatosCtrl(id) {
  let responseDelete = null;
  const urlDelete = URL_NUMEROS_DATOS.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}
/**OPERACIONES RUTAS POR PLANTA */
//getAll
export async function ObtenerRutasPorPlanta() {
  let dataRutasP = [];

  dataRutasP = await FetchApi(URL_RUTAS_PLANTA.concat(METHOD_LISTAR));

  return dataRutasP.data;
}
//POST
export async function AgregarRutasPorPlanta(data) {
  let responseAlta = null;
  responseAlta = await FetchApiPost(
    URL_RUTAS_PLANTA.concat(METHOD_ALTA),
    JSON.stringify(data)
  );

  return { responseAlta };
}
//DELETE
export async function EliminarRutasPorPlanta(id) {
  let responseDelete = null;
  const urlDelete = URL_RUTAS_PLANTA.concat(METHOD_BORRAR + id);
  responseDelete = await FetchApiDelete(urlDelete);

  return { responseAlta: responseDelete };
}
