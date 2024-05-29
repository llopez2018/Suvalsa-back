import * as Yup from "yup";

const MSJ_DATO_REQ = "Dato requerido";
const MSJ_DIGITO = "Introduzca solo digitos";
const MSJ_DOS_DECIMALES = "Ingresa un número positivo con dos decimales";
const MSJ_CANTIDAD = "Ingresa un número positivo con un decimal";
const regexDigit = /^[0-9]+$/;
const patternCantidad = /^\d+(\.\d{1})?$/;
const patternDecimales = /^\d+(\.\d{2})?$/;

const schemaActualizaRuta = Yup.object({
  clave: Yup.string().required(MSJ_DATO_REQ),
  nombre: Yup.string()
  .max(12, 'Ingresa máximo 12 caracteres')
  .required(MSJ_DATO_REQ),
  duracion: Yup.string().required(MSJ_DATO_REQ),
  oper: Yup.string().required(MSJ_DATO_REQ),
  aux: Yup.string().required(MSJ_DATO_REQ),
  noEco1: Yup.string().required(MSJ_DATO_REQ),
  noEco2: Yup.string(),
  operador: Yup.string(),
  auxiliar: Yup.string(),
  vehiculo1: Yup.string(),
  vehiculo2: Yup.string(),
});

export default schemaActualizaRuta;
