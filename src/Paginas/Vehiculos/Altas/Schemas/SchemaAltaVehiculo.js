import * as Yup from "yup";

const MSJ_DATO_REQ = "Dato requerido";
const MSJ_DIGITO = "Introduzca solo digitos";
const MSJ_DOS_DECIMALES = "Ingresa un número positivo con dos decimales";
const MSJ_CANTIDAD = "Ingresa un número positivo con un decimal";
const regexDigit = /^[0-9]+$/;
const patternCantidad = /^\d+(\.\d{1})?$/;
const patternDecimales = /^\d+(\.\d{2})?$/;

const schemaAltaVehiculo = Yup.object({
  clave: Yup.string()
  .max(5, "Ingresa un máximo de 5 caracteres")
  .required(MSJ_DATO_REQ),
  marca: Yup.string().required(MSJ_DATO_REQ),
  modelo: Yup.string().required(MSJ_DATO_REQ),
  anio: Yup.number().required(MSJ_DATO_REQ),
  placas: Yup.string().required(MSJ_DATO_REQ),
  chasis: Yup.string().required(MSJ_DATO_REQ),
  motor: Yup.string().required(MSJ_DATO_REQ),
  noine: Yup.string(),
  permisosct: Yup.string(),
  sust: Yup.string(),
  arrastre: Yup.string(),
  carga: Yup.number(),
  dimCaja: Yup.string(),
  dimUnidad: Yup.string(),
  terMarca: Yup.string(),
  terModelo: Yup.string(),
  terSerie: Yup.string(),
  rampaMarca: Yup.string(),
  rampaCap: Yup.number(),
  rampaSerie: Yup.string(),
  cajaMarca: Yup.string(),
  cajaTipo: Yup.string(),
  cajaCap: Yup.number(),
  cajaAcc: Yup.string(),
  hidrolavadora: Yup.string(),
});

export default schemaAltaVehiculo;
