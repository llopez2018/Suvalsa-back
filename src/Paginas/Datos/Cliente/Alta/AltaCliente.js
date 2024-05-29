import { PDFDownloadLink } from "@react-pdf/renderer";
import { AgregarCliente } from "../../../../Apis/FetchClientes";
import { createOption } from "../../../../utils/CommonUtils";

export const idToastalta = "toastAltaCliente";

export const initValuesAdd = {
  clave: "8010",
  familia: "",
  uNegocio: "",
  nombre: "",
  tipoSociedad: "",
  regFiscal: "",
  usoCfdi: "",
  correoE: "",
  correoE2: "",
  ruta: "",
  orden: "",
  anioAlta: "2023",
  frec: "",
  condPago: "",
  rfc: "",
  revFacturas: "",
  pagoFacturas: "",
  status: "",
  regIne: "",
  contratos: "",
  inicio: "",
  terminacion: "",
  noCons: "",
  paqInsm: "",
  servicio: "",
  refBancaria: "",
  calle: "",
  colonia: "",
  ciudad: "",
  estado: "",
  cp: "",
  claveEstadoINE: "",
  tel: "",
  contacto: "",
  repLegal: "",
  nombreFactura: "",
  noCuenta: "",
  metodoPago: "",
  calleFactura: "",
  coloniaFactura: "",
  ciudadFactura: "",
  estadoFactura: "",
  fcp: "",
  entreCalles: "",
  telFactura: "",
  contactoFactura: "",
  cfFamiliar: "",
  cfIndividual: "",
  cfPorViaje: "",
  kgsiFamiliar: "",
  kgsiIndividual: "",
  kgsiPorViaje: "",
  costokgeFamiliar: "",
  costokgeIndividual: "",
  costokgePorViaje: "",
  cobrariFamiliar: "",
  cobrariIndividual: "",
  cobrariPorViaje: "",
  otroscFamiliar: "",
  otroscIndividual: "",
  otroscPorViaje: "",
  agente1Comision: "",
  cantidad1Comision: "",
  agente2Comision: "",
  cantidad2Comision: "",
  horarioRupa: "",
  claveRupa: "",
  nombreRupa: "",
  niCoa: false
};

export async function ImprimirContrato(values) {
  console.log("Se ejecutara la funcion para imprimir contrato");
  const plantillaContrato = "Clave" + values.clave + "Documento de Requerimiento de Perfil: Desarrollador FrontEnd - Sitios Web Responsivos con conocimientos en UI/UX\n\nObjetivo del Documento\nEste documento tiene como objetivo definir el perfil requerido para la posición de Desarrollador FrontEnd especializado en la creación y mantenimiento de sitios web responsivos con un sólido conocimiento en principios de UI/UX y experiencia trabajando bajo metodologías SCRUM o AGILE.\n\nDescripción del Puesto\nEl candidato seleccionado será responsable de desarrollar y optimizar interfaces web responsivas que proporcionen una experiencia de usuario excepcional en diversos dispositivos y plataformas. Trabajará en estrecha colaboración con el equipo de diseño UX/UI para transformar visiones y conceptos en productos funcionales siempre manteniendo las mejores prácticas y estándares de calidad.\n\nHabilidades y Conocimientos Técnicos\nEsenciales\nDominio de HTML5, CSS3, y JavaScript: Capacidad para crear interfaces ricas y complejas siguiendo las mejores prácticas de codificación y optimización.\nExperiencia con Frameworks de CSS (Bootstrap, Tailwind, etc.): Implementación de frameworks CSS para acelerar el desarrollo y garantizar la coherencia visual.\nConocimientos avanzados en Frameworks JavaScript (React, Vue.js, Angular, etc.): Desarrollo de interfaces de usuario dinámicas y reactivas.\nResponsive Web Design: Creación de sitios web que se adaptan perfectamente a cualquier tamaño de pantalla o dispositivo.\nPrincipios de UI/UX: Capacidad para traducir cualquier diseño UI/UX en un producto funcional que ofrezca una excelente experiencia de usuario.\nVersion Control (Git): Manejo de versiones de código y colaboración a través de sistemas de control de versiones como Git.\n\nDeseables\nPreprocesadores CSS (SASS, LESS): Utilización de preprocesadores para escribir CSS de manera más eficiente y organizada.\nHerramientas de construcción y automatización (Webpack, Gulp, etc.): Configuración y uso de herramientas para automatizar tareas repetitivas y optimizar el flujo de trabajo de desarrollo.\nTesting (Jest, Mocha, Cypress): Experiencia realizando pruebas unitarias y de integración para garantizar la calidad del código.\nAccesibilidad web (WCAG): Conocimientos sobre los estándares de accesibilidad web y su implementación.\n\nCompetencias Personales\nCapacidad de Trabajo en Equipo: Facilidad para trabajar de manera colaborativa dentro de equipos multidisciplinarios.\nComunicación Efectiva: Habilidad para comunicarse claramente y efectivamente tanto con miembros del equipo técnico como con stakeholders no técnicos.\nResolución de Problemas: Capacidad para identificar problemas de manera proactiva y generar soluciones efectivas.\nAprendizaje Continuo: Interés y capacidad para aprender nuevas tecnologías y metodologías de manera autónoma y aplicarlas al trabajo diario.\n\nExperiencia\nExperiencia Comprobable: Al menos 2 años de experiencia trabajando como desarrollador FrontEnd en proyectos que incluyan diseño responsivo y principios UI/UX.\nMetodologías Ágiles: Experiencia trabajando bajo metodologías SCRUM o AGILE con una comprensión clara de sus principios y prácticas.\n\nEducación\nGrado en Ingeniería en Sistemas, Ciencias de la Computación, Diseño Gráfico o campos relacionados. Se valorarán certificaciones específicas en desarrollo FrontEnd, UI/UX o metodologías ágiles.";

}

export async function CrearCliente(values) {
  console.log("action alta");
  const datosRutasP = {
    clave: values.clave,
    fam: values.familia,
    unidadnegocio: values.uNegocio,
    nombre: values.nombre,
    tiposociedad: values.tipoSociedad,
    regimenfiscal: values.regFiscal,
    usocfdi: values.usoCfdi,
    correoelectronico: values.correoE,
    segundocorreoelectronico: values.correoE2,
    ruta: values.ruta,
    orden: values.orden,
    aalta: values.anioAlta,
    frec: values.frec,
    condspago: values.condPago,
    rfc: values.rfc,
    revision: values.revFacturas,
    pago: values.pagoFacturas,
    status: values.status,
    registro: values.regIne,
    conts: values.contratos,
    inicio: values.inicio,
    fin: values.terminacion,
    cons: values.noCons,
    paqinsm: values.paqInsm,
    serv: values.servicio,
    refbanco: values.refBancaria,
    calle: values.calle,
    colonia: values.colonia,
    ciudad: values.ciudad,
    estado: values.estado,
    cp: values.cp,
    edo: values.claveEstadoINE,
    telefono: values.tel,
    contacto: values.contacto,
    replegal: values.repLegal,
    fnombre: values.nombreFactura,
    numerocta: values.noCuenta,
    mtdopago: values.metodoPago,
    fcalle: values.calleFactura,
    fcolonia: values.coloniaFactura,
    fciudad: values.ciudadFactura,
    festado: values.estadoFactura,
    fcp: values.cpFactura,
    entreqcalles: values.entreCalles,
    ftelefono: values.telFactura,
    fcontacto: values.contactoFactura,
    fcuota: values.cfFamiliar,
    icuota: values.cfIndividual,
    vcuota: values.cfPorViaje,
    fkginc: values.kgsiFamiliar,
    ikginc: values.kgsiIndividual,
    vkginc: values.kgsiPorViaje,
    fctokg: values.costokgeFamiliar,
    ictokg: values.costokgeIndividual,
    vctokg: values.costokgePorViaje,
    fcobins: values.cobrariFamiliar,
    icobins: values.cobrariIndividual,
    vcobins: values.cobrariPorViaje,
    fotros: values.otroscFamiliar,
    iotros: values.otroscIndividual,
    votros: values.otroscPorViaje,
    agente: values.agente1Comision,
    comision: values.cantidad1Comision,
    agente2: values.agente2Comision,
    comision2: values.cantidad2Comision,
    horario: values.horarioRupa,
    rupa: values.claveRupa,
    nombrerupa: values.nombreRupa,
    nicoa: values.niCoa ? "Y" : "N"
  };
  await AgregarCliente(datosRutasP);
  return true;
}

export function agSelectOptFam(listaFamilias) {
  return listaFamilias !== null
    ? listaFamilias.map((fam) => createOption(fam.id, fam.clave, fam.clave + '  ' + fam.nombre))
    : "";
}

export function agSelectOptAgent(agentes) {
  return agentes !== null
    ? agentes.map((agent) => createOption(agent.id, agent.clave, agent.clave + '  ' + agent.nombre))
    : "";
}

export function agSelectOptFrec(frecs) {
  return frecs !== null
    ? frecs.map((frec) =>
      createOption(frec.id, frec.clave, frec.clave + '  ' + frec.frecuencia))
    : "";
}

export function agSelectOptServ(servs) {
  return servs !== null
    ? servs.map((serv) =>
      createOption(serv.id, serv.clave_semarnat, serv.clave_semarnat + '  ' + serv.name_semarnat)
    )
    : "";
}



export const urlCatalogo = "/suvalsa/catalogos/clientes";
