export const idSideNavMenu = "#sideNavMenu";

export const contexPath = '/suvalsa';

export const catProveedores =
{
    url: contexPath.concat("/catalogos/proveedores"),
    label: "Proveedores",
};

export const catInsumos = {
    url: contexPath.concat("/catalogos/insumos"),
    label: "Insumos",
};
export const catPersonal = {
    url: contexPath.concat("/catalogos/personal"),
    label: "Personal",
};
export const catResiduos = {
    url: contexPath.concat("/catalogos/residuos"),
    label: "Residuos",
}
export const catVehiculos = {
    url: contexPath.concat("/catalogos/vehiculos"),
    label: "Vehículos",
}
export const catTrabRealizados = {
    url: contexPath.concat("/catalogos/trabajos-realizados"),
    label: "Trabajos Realizados",
}
export const catDatosNoControl = {
    url: contexPath.concat("/catalogos/datos-y-numeros-control"),
    label: "Datos y Números de Control",
}
export const catFrecVisitas = {
    url: contexPath.concat("/catalogos/frecuencia-visitas"),
    label: "Frecuencia de Visitas",
}
export const catFamilias = {
    url: contexPath.concat("/catalogos/familias"),
    label: "Familias",
}
export const catCrearCatPlantas = {
    url: contexPath.concat("/catalogos/crear-catalogo-plantas"),
    label: "Crear Catálogo de Plantas",
};
export const catRutasPlantas = {
    url: contexPath.concat("/catalogos/rutas-para-plantas"),
    label: "Rutas para Plantas",
};
export const catPaqInsumos = {
    url: contexPath.concat("/catalogos/paquete-insumos"),
    label: "Paquete de Insumos",
};
export const catCostosServicio = {
    url: contexPath.concat("/catalogos/altacosto-servicio"),
    label: "Alta Costos de Servicio",
};
export const catActualizacionCostosServicio = {
    url: contexPath.concat("/catalogos/actualizacionCosto-servicio"),
    label: "Actualizacion Costos de Servicio",
};


export const almacenAltaEntradas =
{
    url: contexPath.concat("/cuentas-por-cobrar/estados"),
    label: "Alta Entradas",
};
export const almacenConsultaEntradas = {
    url: "",
    label: "Consulta de Entradas",
};
export const almacenReporteEntradas = {
    url: "",
    label: "Reporte Entradas",
};
export const almacenAltaSalidas = {
    url: "",
    label: "Alta Salidas",
};
export const almacenRepAnalisisSA = {
    url: "",
    label: "Reportes Análisis SA",
};
export const almacenRepExistencia = {
    url: "",
    label: "Reporte de Existencia",
};
export const almacenRepExistenciaKardexMat = {
    url: "",
    label: "Reporte Existencia Kardex por Material",
};

export const cuentasPCEstadosCuenta =
{
    url: contexPath.concat("/cuentas-por-cobrar/estados"),
    label: "Estados de Cuenta",
}
export const cuentasPCDepRealizados = {
    url: "",
    label: "Depósitos Realizados",
}
export const cuentasPCRegistrosPago = {
    url: "",
    label: "Registro Pagos",
}
export const cuentasPCResumenSaldos = {
    url: "",
    label: "Resumen Saldos",
}
export const cuentasPCCobPendRuta = {
    url: "",
    label: "Cobranza Pendiente por Ruta",
}
export const cuentasPCRepCxc = {
    url: "",
    label: "Reportes de CxC",
};

export const manifiestoAlta =
{
    url: contexPath.concat("/manifiestos/alta"),
    label: "Alta Manifiesto",
}
export const manifiectoActualizar = {
    url: contexPath.concat("/manifiestos/actualizar"),
    label: "Actualizar Manifiesto",
}
export const manifiestoRepAnalisis = {
    url: contexPath.concat("/manifiestos/reportes/analisis"),
    label: "Reporte Análisis de Manifiesto",
}
export const manifiestoRecoleccion = {
    url: contexPath.concat("//manifiestos/reportes/recoleccion"),
    label: "Recolección de Manifiestos",
}
export const manifiestoSaltarNum = {
    url: contexPath.concat("/manifiestos/numeracion"),
    label: "Saltar Numeración de Manifiestos",
};

export const mttoVehicGastos =
{
    url: contexPath.concat("/mtto-vehicular/gastos"),
    label: "Gastos Mantenimiento",
}

export const mttoVehicRep =
{
    url: contexPath.concat("/mtto-vehicular/reportes"),
    label: "Reportes",
};

export const gastosVisjesRec =
{
    url: contexPath.concat("/gastos/viajes-recoleccion"),
    label: "Viajes de Recolección",
}
export const gastosInvAut =
{
    url: contexPath.concat("/gastos/automoviles-y-viaticos"),
    label: "Inventario Automóviles",
};

export const gastosGpsAut =
{
    url: "",
    label: "GPS Automóviles",
};

export const gastosGpsTiempoR =
{
    url: "",
    label: "GPS Tiempo Real",
};

export const gastos = [

    {
        url: "",
        label: "Direcciones y Rutas de Cada Unidad",
    },
];

export const rutas = [
    {
        url: contexPath.concat("/rutas/alta"),
        label: "Alta Rutas",
    },
    {
        url: contexPath.concat("/rutas/actualizar"),
        label: "Inventario Automóviles",
    },
    {
        url: contexPath.concat("/rutas/ajustar-planeacion-trimestral"),
        label: "Ajustar Clientes en Planeación Trimestral",
    },
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
        url: contexPath.concat("/rutas/alta"),
        label: "Datos Rutas",
    },
    {
        url: "",
        label: "Manifiesto de un Periodo",
    },
    {
        url: "",
        label: "Alta Rutas",
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
        url: contexPath.concat("/datos/clientes/reporte"),
        label: "Reporte de Clientes",
    },
];