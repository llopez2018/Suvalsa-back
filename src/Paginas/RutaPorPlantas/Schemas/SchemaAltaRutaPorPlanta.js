import * as Yup from "yup";

const MSJ_DATO_REQ = "Dato requerido";
const MSJ_DIGITO = "Introduzca solo digitos";
const MSJ_DOS_DECIMALES = "Ingresa un número positivo con dos decimales";
const MSJ_CANTIDAD = "Ingresa un número positivo con un decimal";
const regexDigit = /^[0-9]+$/;
const patternCantidad = /^\d+(\.\d{1})?$/;
const patternDecimales = /^\d+(\.\d{2})?$/;

const schemaAltaRutaPlanta = Yup.object({
  planta: Yup.string().required(MSJ_DATO_REQ),
  nombre: Yup.string().required(MSJ_DATO_REQ),
  rutaplanta: Yup.string().required(MSJ_DATO_REQ)
});

export default schemaAltaRutaPlanta;
