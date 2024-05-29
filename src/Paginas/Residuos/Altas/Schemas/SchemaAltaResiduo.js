import * as Yup from "yup";

const MSJ_DATO_REQ = "Dato requerido";
const MSJ_DIGITO = "Introduzca solo digitos";
const MSJ_DOS_DECIMALES = "Ingresa un número positivo con dos decimales";
const MSJ_CANTIDAD = "Ingresa un número positivo con un decimal";
const regexDigit = /^[0-9]+$/;
const patternCantidad = /^\d+(\.\d{1})?$/;
const patternDecimales = /^\d+(\.\d{2})?$/;

const schemaAltaResiduo = Yup.object({
  clave: Yup.string()
    .required(MSJ_DATO_REQ),
  nombre: Yup.string()
  .required(MSJ_DATO_REQ),
  uni: Yup.string()
  .required(MSJ_DATO_REQ),
  tipo: Yup.string()
  .required(MSJ_DATO_REQ),
  titulo: Yup.string()
  .required(MSJ_DATO_REQ),
  clasificacion: Yup.string()
  .required(MSJ_DATO_REQ),
  clvine: Yup.string()
  .required(MSJ_DATO_REQ),
  sistemadfinal: Yup.string()
  .required(MSJ_DATO_REQ),
  empresadfinal: Yup.string()
  .required(MSJ_DATO_REQ),
  autorizacion: Yup.string()
  .required(MSJ_DATO_REQ),
  codigo: Yup.string()
  .required(MSJ_DATO_REQ),
});

export default schemaAltaResiduo;
