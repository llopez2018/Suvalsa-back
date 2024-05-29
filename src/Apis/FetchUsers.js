import FetchApi, { FetchApiPost } from "./ConfigFetch";

const URL_USERS = 'http://suvalsa-home.ddns.net:8040/user/';
const URL_USUARIOS = 'http://suvalsa-home.ddns.net:8091/usuariosLogin/'

const METHOD_LISTAR = "listar";
const METHOD_ALTA = "crear";
const METHOD_EMAIL = 'email/';
const METHOD_BUSCAR = "ver/";
const METHOD_BORRAR = "borrar/";
const METHOD_ACTUALIZAR = "update/";

export async function getUsersById(id) {
    let data= null

    data = await FetchApi(URL_USERS+id)

    return { data };
}

export async function getUsersByEmail(email) {
    let dataEmail= null
    dataEmail = await FetchApi(URL_USUARIOS.concat(METHOD_EMAIL)+email)
    console.log('dataEmail:', dataEmail)
    if(dataEmail.data !== null && dataEmail.data.length > 0 )
        dataEmail = dataEmail.data

    console.log('let dataEmail=',dataEmail)
    return {dataEmail};
}

//POST
export async function AgregarUsuario(data) {
    let responseAlta = null;
    responseAlta = await FetchApiPost(
        URL_USUARIOS.concat(METHOD_ALTA),
      JSON.stringify(data)
    );
  
    return { responseAlta };
  }