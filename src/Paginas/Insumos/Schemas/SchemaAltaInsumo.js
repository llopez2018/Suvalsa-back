import * as Yup from "yup";

const MSJ_DATO_REQ= 'Dato requerido';
const MSJ_DIGITO= 'Introduzca solo digitos';
const MSJ_DOS_DECIMALES= 'Ingresa un número positivo con dos decimales';
const MSJ_CANTIDAD= 'Ingresa un número positivo con un decimal';
const regexDigit = /^[0-9]+$/;
const patternCantidad = /^\d+(\.\d{1})?$/;
const patternDecimales = /^\d+(\.\d{2})?$/;

const schemaAltaInsumos = Yup.object({
  clave: Yup.string()
    .matches(regexDigit, "Clave incorrecta")
    .required(MSJ_DATO_REQ),
  nombre: Yup.string()
  .required(MSJ_DATO_REQ),
  modelo: Yup.string()
  .required(MSJ_DATO_REQ),
  uni: Yup.string()
  .required(MSJ_DATO_REQ),
  tipo: Yup.string()
  .required(MSJ_DATO_REQ),
  precio: Yup.string()
  .required(MSJ_DATO_REQ),
  minimo: Yup.string()
  .required(MSJ_DATO_REQ),
  maximo: Yup.string()
  .required(MSJ_DATO_REQ),
});

export default schemaAltaInsumos;
