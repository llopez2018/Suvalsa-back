import Login from './Login/Login';
import Inicio from './Home/Inicio';
import AltaCliente from './Datos/Cliente/Alta/AltaDeCliente';
import ActualizarCliente from './Datos/Cliente/Actualizar/ActualizarCliente';
import GastosDatos from './Datos/Gastos/GastosDatos'
import RecoleccionesDatos from './Datos/Recolecciones/RecoleccionesDatos';
import AltaRutas from './Rutas/Alta/AltaRutas';
import ActualizarRuta from './Rutas/Actualizar/ActualizarRuta'
import AjustarClientesPlaneacion from './Rutas/AjustarCliente/AjustarClientesPlaneacion';
import GastosViajesRecoleccion from './Gastos/Viajes/GastosViajesRecoleccion'
import GastosAutoViaticos from './Gastos/AutoViaticos/GastosAutoViaticos'
import ReportesGastos from './Gastos/Reportes/ReportesGastos';
import ActualizarRecolecciones from './Recolecciones/Actualizar/ActualizarRecolecciones'
import DatosRutasRecolecciones from './Recolecciones/DatosRutas/DatosRutasRecolecciones'
import ReportesRecolecciones from './Recolecciones/Reportes/ReportesRecolecciones';
import GastosMtto from './MantenimientoVehicular/GastosMantenimiento/GastosMtto'
import ReportesMtto from './MantenimientoVehicular/Reportes/ReportesMtto';
import CatalogoClientes from './Catalogos/Clientes/CatalogoClientes'
import CatalogoProveedores from './Catalogos/Proveedores/CatalogoProveedores'
import CatalogoInsumos from './Catalogos/Insumos/CatalogoInsumos'
import AltaInsumos from './Insumos/Altas/AltaInsumos'
import CatalogoPersonal from './Catalogos/Personal/CatalogoPersonal'
import AltaPersonal from './Personal/Altas/AltaPersonal'
import CatalogoResiduos from './Catalogos/Residuos/CatalogoResiduos'
import AltaResiduo from './Residuos/Altas/AltaResiduo'
import CatalogoVehiculos from './Catalogos/Vehiculos/CatalogoVehiculos'
import AltaVehiculo from './Vehiculos/Altas/AltaVehiculo'
import CatalogoTrabajos from './Catalogos/TrabajosRealizados/CatalogoTrabajos'
import AltaTrabajos from './TrabajosRealizados/Altas/AltaTrabajos'
import CatalogoDatosNumeros from './Catalogos/DatosNumerosControl/CatalogoDatosNumeros'
import AltaDatosNumeros from './DatosNumeros/Altas/AltaDatosNumeros'
import CatalogoVisitas from './Catalogos/FrecuenciaVisitas/CatalogoVisitas'
import AltaFrecuencia from './Frecuencias/Altas/AltaFrecuencia'
import CatalogoFamilias from './Catalogos/Familias/CatalogoFamilias'
import AltaFamilia from './Familias/Altas/AltaFamilia'
import CatalogoPlantas from './Catalogos/Plantas/CatalogoPlantas'
import CatalogoRutasPlanta from './Catalogos/RutaPlanta/CatalogoRutasPlanta'
import AltaRutaPorPlanta from './RutaPorPlantas/Altas/AltaRutaPorPlanta'
import CatalogoPaqueteInsumos from './Catalogos/PaqueteInsumos/CatalogoPaqueteInsumos';
import AltaBajaProveedores from './Proveedores/AltasBajas/AltaBajaProveedores'
import FacturasPendientes from './Proveedores/Facturas/FacturasPendientes'
import SolicitudesProveedores from './Proveedores/Solicitudes/SolicitudesProveedores';
import ReporteRecoleccionActiva from './HistorialRecolector/RecoleccionActiva/ReporteRecoleccionActiva'
import ProgramacionReportesAC from './HistorialRecolector/AtencionCliente/ProgramacionReportesAC'
import ReporteRutaVehiculo from './HistorialRecolector/RutaVehiculo/ReporteRutaVehiculo';
import EstatusFactura from './Facturacion/Estatus/EstatusFactura'
import EmitirCancelarFactura from './Facturacion/EmitirCancelar/EmitirCancelarFactura'
import ReimprimirCataPorta from './Facturacion/ReimprimirCarta/ReimprimirCataPorta';
import EntradasAlmacen from './Almacen/Entradas/EntradasAlmacen'
import SalidasAlmacen from './Almacen/Salidas/SalidasAlmacen'
import ReportesAlmacen from './Almacen/Reportes/ReportesAlmacen';
import AltaManifiestos from './Manifiestos/Alta/AltaManifiestos'
import ActualizarManifiestos from './Manifiestos/Actualizar/ActualizarManifiestos'
import ReportesManifiestos from './Manifiestos/Reportes/ReportesManifiestos'
import ReporteRecoleccionManifiesto from './Manifiestos/Reportes/Recoleccion/ReporteRecoleccionManifiesto'
import SaltarNumeracion from './Manifiestos/Numeracion/SaltarNumeracion';
import EstadosCuenta from './CuentasPorCobrar/Estados/EstadosCuenta'
import DepositosRealizados from './CuentasPorCobrar/Depositos/DepositosRealizados'
import RegistroPagos from './CuentasPorCobrar/Registros/RegistroPagos'
import ResumenSaldos from './CuentasPorCobrar/Saldos/ResumenSaldos'
import CobranzaPendienteRuta from './CuentasPorCobrar/Cobranza/CobranzaPendienteRuta'
import ReportesCuentas from './CuentasPorCobrar/Reportes/ReportesCuentas';
import GeneracionContrato from './Datos/Contratos/Alta/GeneracionContrato';
import AltaCostosServicio from './Catalogos/CostosServicio/Alta/AltaCostoServicio';
import ActualizacionCostosServicio from './Catalogos/CostosServicio/Actualizacion/ActualizaiconCostoServicio';
import ReporteClientes from './Catalogos/Clientes/Reporte/ReporteClientes';

export {
    Login, Inicio, ActualizacionCostosServicio, ReporteClientes,
    AltaCliente, ActualizarCliente,
    AltaRutas, GastosDatos, RecoleccionesDatos,
    ActualizarRuta, AjustarClientesPlaneacion,
    GastosViajesRecoleccion, GastosAutoViaticos, ReportesGastos,
    ActualizarRecolecciones, DatosRutasRecolecciones, ReportesRecolecciones,
    GastosMtto, ReportesMtto,
    CatalogoClientes, CatalogoProveedores, CatalogoInsumos, CatalogoPersonal, CatalogoResiduos, CatalogoVehiculos, CatalogoTrabajos, CatalogoDatosNumeros, CatalogoVisitas, CatalogoFamilias, CatalogoPlantas, CatalogoRutasPlanta, CatalogoPaqueteInsumos,
    AltaInsumos, AltaPersonal, AltaResiduo, AltaVehiculo, AltaTrabajos, AltaDatosNumeros, AltaFrecuencia, AltaRutaPorPlanta, AltaFamilia,
    AltaBajaProveedores, FacturasPendientes, SolicitudesProveedores,
    ReporteRecoleccionActiva, ProgramacionReportesAC, ReporteRutaVehiculo,
    EstatusFactura, EmitirCancelarFactura, ReimprimirCataPorta,
    EntradasAlmacen, SalidasAlmacen, ReportesAlmacen,
    AltaManifiestos, ActualizarManifiestos, ReportesManifiestos, ReporteRecoleccionManifiesto, SaltarNumeracion,
    EstadosCuenta, DepositosRealizados, RegistroPagos, ResumenSaldos, CobranzaPendienteRuta, ReportesCuentas, GeneracionContrato, AltaCostosServicio
}