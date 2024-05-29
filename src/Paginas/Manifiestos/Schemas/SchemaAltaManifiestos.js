import * as Yup from "yup";

const MSJ_DATO_REQ = "Dato requerido";
const MSJ_DIAS_POSITIVO= "El número de días debe ser mayor a 0";

const schemaAltaManifiestosYdocsVi = Yup.object({
  clave: Yup.string().required(MSJ_DATO_REQ),
  nombre: Yup.string().required(MSJ_DATO_REQ),
  dias: Yup.string().required(MSJ_DATO_REQ),
  fInicio: Yup.string().required(MSJ_DATO_REQ),
  oper: Yup.string().required(MSJ_DATO_REQ),
  aux: Yup.string().required(MSJ_DATO_REQ),
  noEco: Yup.string().required(MSJ_DATO_REQ),
  operador: Yup.string(),
  auxiliar: Yup.string(),
  vehiculo: Yup.string(),
});

export const schemaEditaManifiestosYdocsVi = Yup.object({
  id: Yup.string(),
  clave: Yup.string(),
  servManif: Yup.string(),
  diasManif: Yup.number()
  .required(MSJ_DATO_REQ)
  .test(
    'Is positive?', 
    MSJ_DIAS_POSITIVO, 
    (value) => value > 0
  ),
  fVisitaManif: Yup.date(),
  insumo: Yup.string(),
  noManif: Yup.number().required(MSJ_DATO_REQ),
  plantaManif: Yup.number().required(MSJ_DATO_REQ),
  rutaPlantaManif: Yup.string(),
});

export default schemaAltaManifiestosYdocsVi;
