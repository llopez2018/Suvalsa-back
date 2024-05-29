import { AgregarAgente } from "../../Apis/FetchCatalogos";
import { AgregarUsuario } from "../../Apis/FetchUsers";

export const idToastalta = "toastAltaAgen";

export const initValuesAdd = {
  clave: "",
  nombre: "",
  puesto: "",
  tarjeta: "",
  domicilio: "",
  telefono: "",
  celular: "",
  licencia: "",
  curp: "",
  imss: "",
  mail: "",
  status: "",
  tipo: "",
  usuario: "",
  contrasena: "",
  confContrasena: ""
};

export async function AgregarPersonal(values) {
  console.log("action alta");
  const datosAgent = {
    clave: values.clave,
    nombre: values.nombre,
    puesto: values.puesto,
    tarjeta: values.tarjeta,
    domicilio: values.domicilio,
    telefono: values.telefono,
    celular: values.celular,
    licencia: values.licencia,
    curp: values.curp,
    imss: values.imss,
    mail: values.mail,
    status: values.status
  };
  await AgregarAgente(datosAgent);
  console.log("agregando usuario");
  const dataAuth = {
    name: values.nombre,
    user_name: values.nombre.split(" ")[0] ?? "",
    email: values.usuario,
    password: values.contrasena,
    type: values.tipo
  };
  //se realiza el update /usuariosLogin/crear
  await AgregarUsuario(dataAuth);
  return true;
}

export const urlCatalogo = "/suvalsa/catalogos/personal";
