import * as Yup from "yup";

const MSJ_DATO_REQ= 'Dato requerido';
const MSJ_DIGITO= 'Introduzca solo digitos';
const MSJ_DOS_DECIMALES= 'Ingresa un número positivo con dos decimales';
const MSJ_CANTIDAD= 'Ingresa un número positivo con un decimal';
const regexDigit = /^[0-9]+$/;
const patternCantidad = /^\d+(\.\d{1})?$/;
const patternDecimales = /^\d+(\.\d{2})?$/;

const schemaDatos = Yup.object({
  clave: Yup.string()
    .matches(regexDigit, "Clave incorrecta")
    .required(MSJ_DATO_REQ),
  familia: Yup.string()
    //.oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
    .required(MSJ_DATO_REQ),
    uNegocio: Yup.string()
    .required(MSJ_DATO_REQ),
  nombre: Yup.string()
  .required(MSJ_DATO_REQ),
  tipoSociedad: Yup.string()
  .required(MSJ_DATO_REQ),
  regFiscal: Yup.string()
  .required(MSJ_DATO_REQ),
  usoCfdi: Yup.string()
  .required(MSJ_DATO_REQ),
  correoE: Yup.string()
  .required(MSJ_DATO_REQ),
  correoE2: Yup.string(),
  ruta: Yup.string()
  .matches(regexDigit, "Valor incorrecto"),
  orden: Yup.string()
  .matches(regexDigit, "Valor incorrecto"),
  anioAlta: Yup.string()
    .min(4, "Año no válido")
    .max(4, "Año no válido")
    .matches(regexDigit, MSJ_DIGITO)
    .required(MSJ_DATO_REQ),
  frec: Yup.string()
    .required(MSJ_DATO_REQ),
  condPago: Yup.string(),
  rfc: Yup.string()
    .required(MSJ_DATO_REQ),
  revFacturas: Yup.string(),
  pagoFacturas: Yup.string(),
  status: Yup.string(),
  regIne: Yup.string()
    .required(MSJ_DATO_REQ),
  contratos: Yup.string()
    .matches(regexDigit, MSJ_DIGITO),
  inicio: Yup.string()
    .required(MSJ_DATO_REQ),
  terminacion: Yup.string()
    .required(MSJ_DATO_REQ),
  noCons: Yup.string()
    .matches(regexDigit, MSJ_DIGITO),
  paqInsm: Yup.string(),
  //direccion recorreccion
  servicio: Yup.string()
    //.max(2,'Servicio no válido')
    .required(MSJ_DATO_REQ),
  refBancaria: Yup.string()
    .required(MSJ_DATO_REQ),
  calle: Yup.string()
    .required(MSJ_DATO_REQ),
  colonia: Yup.string()
    .required(MSJ_DATO_REQ),
  ciudad: Yup.string()
    .required(MSJ_DATO_REQ),
  estado: Yup.string()
    .required(MSJ_DATO_REQ),
  cp: Yup.string()
    .required(MSJ_DATO_REQ),
  claveEstadoINE: Yup.string()
    .required(MSJ_DATO_REQ),
  tel: Yup.string()
    .required(MSJ_DATO_REQ),
  contacto: Yup.string()
    .required(MSJ_DATO_REQ),
    //direccion facturacion
    repLegal: Yup.string()
    .required(MSJ_DATO_REQ),
    nombreFactura: Yup.string()
    .required(MSJ_DATO_REQ),
    noCuenta: Yup.string()
    .required(MSJ_DATO_REQ),
    metodoPago: Yup.string()
    .required(MSJ_DATO_REQ),
    calleFactura: Yup.string()
    .required(MSJ_DATO_REQ),
    coloniaFactura: Yup.string()
    .required(MSJ_DATO_REQ),
    ciudadFactura: Yup.string()
    .required(MSJ_DATO_REQ),
    estadoFactura: Yup.string()
    .required(MSJ_DATO_REQ),
    cpFactura: Yup.string()
    .required(MSJ_DATO_REQ),
    entreCalles: Yup.string()
    .required(MSJ_DATO_REQ),
    telFactura: Yup.string(),
    contactoFactura: Yup.string(),
    //Forma de Cobro
    cfFamiliar: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    cfIndividual: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    cfPorViaje: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    kgsiFamiliar: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    kgsiIndividual: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    kgsiPorViaje: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    costokgeFamiliar: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    costokgeIndividual:Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    costokgePorViaje: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    cobrariFamiliar: Yup.string(),
    cobrariIndividual: Yup.string(),
    cobrariPorViaje: Yup.string(),
    otroscFamiliar: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    otroscIndividual:Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    otroscPorViaje: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_DOS_DECIMALES,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternDecimales.test(val);
        }
        return true;
      }
    ),
    //comisiones
    agente1Comision: Yup.string(),
    cantidad1Comision: Yup.number()
    .test(
      "is-decimal",
      MSJ_CANTIDAD,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternCantidad.test(val);
        }
        return true;
      }
    ),
    agente2Comision: Yup.string(),
    cantidad2Comision: Yup.number()
    
    .test(
      "is-decimal",
      MSJ_CANTIDAD,
      (val) => {
        if (val !== undefined) {
          return val > 0 && patternCantidad.test(val);
        }
        return true;
      }
    ),
    //RUPA
    horarioRupa: Yup.string(),
    claveRupa: Yup.string(),
    nombreRupa: Yup.string(),
    niCoa: Yup.boolean()
});

export default schemaDatos;
