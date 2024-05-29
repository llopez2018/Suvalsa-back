import * as Yup from "yup";

const MSJ_DATO_REQ= 'Dato requerido';
const MSJ_DIGITO= 'Introduzca solo digitos';
const MSJ_DOS_DECIMALES= 'Ingresa un número positivo con dos decimales';
const MSJ_CANTIDAD= 'Ingresa un número positivo con un decimal';
const regexDigit = /^[0-9]+$/;
const patternCantidad = /^\d+(\.\d{1})?$/;
const patternDecimales = /^\d+(\.\d{2})?$/;

const schemaAltaProveedor = Yup.object({
  clave: Yup.string()
    .matches(regexDigit, "Clave incorrecta")
    .required(MSJ_DATO_REQ),
  empresa: Yup.string()
  .required(MSJ_DATO_REQ),
  calle: Yup.string()
  .required(MSJ_DATO_REQ),
  colonia: Yup.string()
  .required(MSJ_DATO_REQ),
  ciudad: Yup.string()
  .required(MSJ_DATO_REQ),
  cp: Yup.string()
  .required(MSJ_DATO_REQ),
  contacto: Yup.string()
  .required(MSJ_DATO_REQ),
  telefono: Yup.string()
  .required(MSJ_DATO_REQ),
});

export default schemaAltaProveedor;
