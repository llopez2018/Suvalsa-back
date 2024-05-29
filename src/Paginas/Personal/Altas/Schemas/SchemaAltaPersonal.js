import * as Yup from "yup";

const MSJ_DATO_REQ = "Dato requerido";
const MSJ_DIGITO = "Introduzca solo digitos";
const MSJ_DOS_DECIMALES = "Ingresa un número positivo con dos decimales";
const MSJ_CANTIDAD = "Ingresa un número positivo con un decimal";
const regexDigit = /^[0-9]+$/;
const patternCantidad = /^\d+(\.\d{1})?$/;
const patternDecimales = /^\d+(\.\d{2})?$/;

const getCharacterValidationError = (str) => {
  return `Tu contraseña debe tener al menos ${str}`;
};

const schemaAltaAgente = Yup.object({
  clave: Yup.string()
    .required(MSJ_DATO_REQ),
  nombre: Yup.string()
  .required(MSJ_DATO_REQ),
  puesto: Yup.string()
  .required(MSJ_DATO_REQ),
  tarjeta: Yup.string()
  .required(MSJ_DATO_REQ),
  domicilio: Yup.string()
  .required(MSJ_DATO_REQ),
  telefono: Yup.string()
  .required(MSJ_DATO_REQ),
  celular: Yup.string()
  .required(MSJ_DATO_REQ),
  licencia: Yup.string()
  .required(MSJ_DATO_REQ),
  curp: Yup.string()
  .required(MSJ_DATO_REQ),
  mail: Yup.string()
  .required(MSJ_DATO_REQ),
  status: Yup.string()
  .required(MSJ_DATO_REQ),
  imss: Yup.string()
  .required(MSJ_DATO_REQ),
  tipo: Yup.string()
  .required(MSJ_DATO_REQ),
  usuario: Yup.string()
  .required(MSJ_DATO_REQ),
  contrasena: Yup.string()
  .required(MSJ_DATO_REQ)
  // check minimum characters
  .min(8, "Tu contraseña debe tener al menos 8 caracteres")
  // different error messages for different requirements
  .matches(/[0-9]/, getCharacterValidationError("un digito"))
  .matches(/[a-z]/, getCharacterValidationError("una letra minúscula"))
  .matches(/[A-Z]/, getCharacterValidationError("una letra mayúscula"))
  .matches('^(?=.*?[#?!@$%^&*-]).{8,}$', getCharacterValidationError("un caracter especial")),
  confContrasena: Yup.string()
  .required(MSJ_DATO_REQ)
  // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([Yup.ref("contrasena")], "Las contraseñas con coinciden"),
});

export default schemaAltaAgente;
