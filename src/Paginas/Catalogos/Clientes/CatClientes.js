import { EliminarCliente, ObtenerClientes } from '../../../Apis/FetchClientes';

export const tituloCatClientes = "Catálogo de Clientes";

export const formatCell = (cell, value) => {
  cell.classList.add("hidden");
};
 
export const columnas = [
  { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
  { label: "Familia", field: "familia", sort: true, width: 50, fixed: true },
  { label: "Nombre", field: "nombre", sort: true },
  { label: "Razón Social", field: "razonSocial", sort: true },
  { label: "Tipo de Sociedad", field: "tipoSociedad", sort: true },
  { label: "Régimen Fiscal", field: "regimenFiscal", sort: true },
  { label: "Uso de CFDI", field: "usoCfdi", sort: true },
  { label: "Correo Electrónico", field: "correoE", sort: true },
  { label: "Segundo Correo E.", field: "segundoCorreoE", sort: true },
  { label: "Ruta", field: "ruta", sort: true },
  { label: "Orden", field: "orden", sort: true },
  { label: "Año Alta", field: "anioa", sort: true },
  { label: "Frec.", field: "frec", sort: true },
  { label: "Condición Pago", field: "condicionPago", sort: true },
  { label: "RFC", field: "rfc", sort: true },
  { label: "Revisión Facturas", field: "revFacturas", sort: true },
  { label: "Pago de Facturas", field: "pagoFacturas", sort: true },
  { label: "Status", field: "status", sort: true },
  { label: "Registro INE", field: "pagoFacturas", sort: true },
  { label: "Contratos", field: "contratos", sort: true },
  { label: "Inicio", field: "fechaInicio", sort: true },
  { label: "Terminación", field: "fechaFin", sort: true },
  { label: "No.Cons", field: "noCons", sort: true },
  { label: "Paq.Insm", field: "paqInsm", sort: true },
    //recoleccion
  { label: "Servicio", field: "servicio", sort: true },
  { label: "Ref. Bancaria", field: "refBancaria", sort: true },
  { label: "Calle", field: "calle", sort: true },
  { label: "Colonia", field: "colonia", sort: true },
  { label: "Ciudad", field: "ciudad", sort: true },
  { label: "Estado", field: "estado", sort: true },
  { label: "Clave Estado (INE)", field: "claveEstadoINE", sort: true },//REVISAR
  { label: "Teléfono", field: "telefono", sort: true },
  { label: "Contacto", field: "contacto", sort: true },
  { label: "", field: "id", sort: false, width: 10, format: formatCell }
];

export const opcionesTabla = { ofText: "Clientes de" };

export async function GetClientes() {
  let rowsNew = [];
  console.log("obteniendo Datos de ws Clientes");
  const clientes = await ObtenerClientes();
  console.log("lista de Clientes: ", clientes);

  if (clientes) {
    rowsNew = clientes.map((res) => ({
        clave : res.clave,
        id: res.id,
        familia : res.fam,
        nombre: res.nombre,
        razonSocial: res.fnombre,
        tipoSociedad: res.tiposociedad,
        regimenFiscal: res.regimenfiscal,
        usoCfdi: res.usocfdi,
        correoE: res.correoelectronico,
        segundoCorreoE: res.segundocorreoelectronico,
        ruta: res.ruta,
        orden: res.orden,
        anioa: res.aalta,
        frec: res.frec,
        condicionPago: res.condspago,
        rfc: res.rfc,
        revFacturas: res.revision,
        pagoFacturas: res.pago,
        status: res.status,
        regIne: res.registro,
        contratos: res.conts,
        fechaInicio: res.inicio,
        fechaFin: res.fin,
        noCons: res.cons,
        paqInsm: res.paqinsm,
        servicio : res.serv,
        refBancaria: res.refbanco,
        calle: res.calle,
        colonia: res.colonia,
        ciudad: res.ciudad,
        estado: res.estado,
        claveEstadoINE: res.edo,//REVISAR
        telefono: res.telefono,
        contacto: res.contacto,
  
    }));
  }
  return rowsNew;
}
export const idTable = "tablaClientes";
export const idToastDelete = "toastClientes";
export const idModalDelete = "staticBackdrop";
export const pathAltaCliente = "/suvalsa/datos/cliente/alta";
export const pathCatClientes = "/suvalsa/catalogos/clientes";

export async function actionDelete(id){
  console.log("actionDelete");
  await EliminarCliente(id)
};
