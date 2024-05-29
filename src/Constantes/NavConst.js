import {
    catProveedores, catInsumos, catPersonal, catResiduos, catVehiculos, catTrabRealizados, catDatosNoControl,
    catFrecVisitas, catFamilias, catCrearCatPlantas, catRutasPlantas, catPaqInsumos,
    almacenAltaEntradas, almacenConsultaEntradas, almacenReporteEntradas, almacenAltaSalidas, almacenRepAnalisisSA, almacenRepExistencia, almacenRepExistenciaKardexMat,
    cuentasPCEstadosCuenta, cuentasPCDepRealizados, cuentasPCRegistrosPago, cuentasPCResumenSaldos, cuentasPCCobPendRuta, cuentasPCRepCxc,
    manifiestoAlta, manifiectoActualizar, manifiestoRepAnalisis, manifiestoRecoleccion, manifiestoSaltarNum,
    mttoVehicGastos, mttoVehicRep, catCostosServicio, catActualizacionCostosServicio

} from "./MenusConst";

export const contexPath = '/suvalsa';
export const idSideNavMenu = "#sideNavMenu";

export const catalogos = [
    {
        ...catProveedores
    },
    {
        ...catInsumos
    },
    {
        ...catPersonal
    },
    {
        ...catResiduos
    },
    {
        ...catVehiculos
    },
    {
        ...catTrabRealizados
    },
    {
        ...catDatosNoControl
    },
    {
        ...catFrecVisitas
    },
    {
        ...catFamilias
    },
    {
        ...catCrearCatPlantas
    },
    {
        ...catRutasPlantas
    },
    {
        ...catPaqInsumos
    },
    {
        ...catCostosServicio
    },
    {
        ...catActualizacionCostosServicio
    },
];

export const almacen = [
    {
        ...almacenAltaEntradas
    },
    {
        ...almacenConsultaEntradas
    },
    {
        ...almacenReporteEntradas
    },
    {
        ...almacenAltaSalidas
    },
    {
        ...almacenRepAnalisisSA
    },
    {
        ...almacenRepExistencia
    },
    {
        ...almacenRepExistenciaKardexMat
    },
];

export const cuentasPorCobrar = [
    {
        ...cuentasPCEstadosCuenta
    },
    {
        ...cuentasPCDepRealizados
    },
    {
        ...cuentasPCRegistrosPago
    },
    {
        ...cuentasPCResumenSaldos
    },
    {
        ...cuentasPCCobPendRuta
    },
    {
        ...cuentasPCRepCxc
    },
];

export const manifiesto = [
    {
        ...manifiestoAlta
    },
    {
        ...manifiectoActualizar
    },
    {
        ...manifiestoRepAnalisis
    },
    {
        ...manifiestoRecoleccion
    },
    {
        ...manifiestoSaltarNum
    },
];

export const mttoVehic = [
    {
        ...mttoVehicGastos
    },
    {
        ...mttoVehicRep
    },
];

export const gastos = [
    {
        url: contexPath.concat("/gastos/viajes-recoleccion"),
        label: "Viajes de Recolección",
    },
    {
        url: contexPath.concat("/gastos/automoviles-y-viaticos"),
        label: "Inventario Automóviles",
    },
    {
        url: "",
        label: "GPS Automóviles",
    },
    {
        url: "",
        label: "GPS Tiempo Real",
    },
    {
        url: "",
        label: "Direcciones y Rutas de Cada Unidad",
    },
];

export const rutas = [
    {
        url: contexPath.concat("/rutas/alta"),
        label: "Alta de Rutas",
    },
    {
        url: contexPath.concat("/rutas/actualizar"),
        label: "Actualización de Rutas",
    },
    {
        url: contexPath.concat("/rutas/ajustar-planeacion-trimestral"),
        label: "Ajustar Clientes en Planeación Trimestral",
    },
    {
        url: contexPath.concat("/rutas/cartaporte"),
        label: "CartaPorte"
    }
];

export const recolecciones = [
    {
        url: contexPath.concat("/recolecciones/actualizar"),
        label: "Actualiza Recolección",
    },
    {
        url: contexPath.concat("/recolecciones/datos-en-rutas"),
        label: "Datos en Ruta",
    },
    {
        url: contexPath.concat("/recolecciones/reportes"),
        label: "Reporte Análisis de Recolecciones",
    },
    {
        url: "",
        label: "Reporte Concilacion con MEDAM",
    },
    {
        url: "",
        label: "Resumen por Cliente y Residuo",
    },
    {
        url: "",
        label: "Reporte INE RS-2",
    },
];

export const datos = [
    {
        url: contexPath.concat("/datos/cliente/alta"),
        label: "Alta Clientes",
    },
    {
        url: contexPath.concat("/datos/cliente/actualizar"),
        label: "Actualización de Clientes",
    },
    {
        url: "",
        label: "Manifiesto de un Periodo",
    },
    {
        url: contexPath.concat("/datos/gastos"),
        label: "Gastos",
    },
    {
        url: contexPath.concat("/datos/recolecciones"),
        label: "Recolecciones",
    },
    {
        url: "",
        label: "Reporte Catálogos",
    },
    {
        url: "",
        label: "Reporte Vencimiento de Contrato",
    },
    {
        url: contexPath.concat("/datos/contratos"),
        label: "Generación de Contrato",
    },
    {
        url: contexPath.concat("/datos/clientes/reporte"),
        label: "Reporte de Clientes",
    },


];