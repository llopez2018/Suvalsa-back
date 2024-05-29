import './App.css';
import { Route, Routes } from "react-router-dom";
import InternalApp from './componentes/Templates/InternalApp';
import {
  Login, GeneracionContrato, AltaCostosServicio, ActualizacionCostosServicio, ActualizarCliente, ReporteClientes,
  Inicio, AltaCliente, AltaRutas, GastosDatos, RecoleccionesDatos, ActualizarRuta, AjustarClientesPlaneacion, GastosAutoViaticos, GastosViajesRecoleccion, ReportesGastos, ActualizarRecolecciones, DatosRutasRecolecciones, ReportesRecolecciones, GastosMtto, ReportesMtto, CatalogoProveedores, CatalogoInsumos, CatalogoPersonal, CatalogoResiduos, CatalogoVehiculos, CatalogoTrabajos, CatalogoDatosNumeros, CatalogoVisitas, CatalogoFamilias, CatalogoPlantas, CatalogoRutasPlanta, CatalogoPaqueteInsumos,
  AltaInsumos, AltaBajaProveedores, FacturasPendientes, SolicitudesProveedores, ReporteRecoleccionActiva, ProgramacionReportesAC, ReporteRutaVehiculo, EstatusFactura, EmitirCancelarFactura, ReimprimirCataPorta, EntradasAlmacen, SalidasAlmacen, ReportesAlmacen, AltaManifiestos, ActualizarManifiestos, ReportesManifiestos, SaltarNumeracion, EstadosCuenta, DepositosRealizados, RegistroPagos, ResumenSaldos, CobranzaPendienteRuta, ReportesCuentas, AltaPersonal, AltaResiduo, AltaVehiculo, AltaTrabajos, AltaDatosNumeros, AltaFrecuencia, AltaRutaPorPlanta, AltaFamilia, CatalogoClientes, ReporteRecoleccionManifiesto
}
  from './Paginas';
import CartaPorte from './Paginas/Rutas/CartaPorte/Cartaporte';
import 'leaflet/dist/leaflet.css';



function App() {
  //constante utuilizada para navegar a Login
  const navLogin = '/suvalsa/login';
  //constante para indicar si tiene permiso para navegar a un menu dependiendo el tipo de cuenta
  //redireccion = pagina de recireccion en caso de no contar con permisos de navegacion al path
  const dataProtected = { permitido: true, redireccion: navLogin }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/suvalsa' element={<Login />} />
        <Route path='/suvalsa/login' element={<Login />} />

        <Route element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/home' element={<Inicio />} />
        </Route>
        {/**Menu DATOS */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/datos/cliente/alta' element={<AltaCliente />} />
          <Route path='/suvalsa/datos/cliente/actualizar' element={<ActualizarCliente />} />
          <Route path='/suvalsa/datos/gastos' element={<GastosDatos />} />
          <Route path='/suvalsa/datos/recolecciones' element={<RecoleccionesDatos />} />
          <Route path='/suvalsa/datos/contratos' element={<GeneracionContrato />} />
          <Route path='/suvalsa/datos/clientes/reporte' element={<ReporteClientes />} />
        </Route>
        {/**Menu RUTAS */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/rutas' element={<AltaRutas />} />
          <Route path='/suvalsa/rutas/alta' element={<AltaRutas />} />
          <Route path='/suvalsa/rutas/actualizar' element={<ActualizarRuta />} />
          <Route path='/suvalsa/rutas/ajustar-planeacion-trimestral' element={<AjustarClientesPlaneacion />} />
          <Route path='/suvalsa/rutas/cartaporte' element={<CartaPorte />} />
        </Route>
        {/**Menu GASTOS */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/gastos' element={<GastosViajesRecoleccion />} />
          <Route path='/suvalsa/gastos/viajes-recoleccion' element={<GastosViajesRecoleccion />} />
          <Route path='/suvalsa/gastos/automoviles-y-viaticos' element={<GastosAutoViaticos />} />
          <Route path='/suvalsa/gastos/reportes' element={<ReportesGastos />} />
        </Route>
        {/**Menu RECOLECCIONES */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/recolecciones' element={<ActualizarRecolecciones />} />
          <Route path='/suvalsa/recolecciones/actualizar' element={<ActualizarRecolecciones />} />
          <Route path='/suvalsa/recolecciones/datos-en-rutas' element={<DatosRutasRecolecciones />} />
          <Route path='/suvalsa/recolecciones/reportes' element={<ReportesRecolecciones />} />
        </Route>
        {/**Menu MANTENIMIENTO VEHICULAR */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/mtto-vehicular' element={<GastosMtto />} />
          <Route path='/suvalsa/mtto-vehicular/gastos' element={<GastosMtto />} />
          <Route path='/suvalsa/mtto-vehicular/reportes' element={<ReportesMtto />} />
        </Route>
        {/**Menu CATALOGOS */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/catalogos' element={<CatalogoProveedores />} />
          <Route path='/suvalsa/catalogos/clientes' element={<CatalogoClientes />} />
          <Route path='/suvalsa/catalogos/proveedores' element={<CatalogoProveedores />} />
          <Route path='/suvalsa/catalogos/insumos' element={<CatalogoInsumos />} />
          <Route path='/suvalsa/catalogos/insumos/alta' element={<AltaInsumos />} />
          <Route path='/suvalsa/catalogos/personal' element={<CatalogoPersonal />} />
          <Route path='/suvalsa/catalogos/personal/alta' element={<AltaPersonal />} />
          <Route path='/suvalsa/catalogos/residuos' element={<CatalogoResiduos />} />
          <Route path='/suvalsa/catalogos/residuos/alta' element={<AltaResiduo />} />
          <Route path='/suvalsa/catalogos/vehiculos' element={<CatalogoVehiculos />} />
          <Route path='/suvalsa/catalogos/vehiculos/alta' element={<AltaVehiculo />} />
          <Route path='/suvalsa/catalogos/trabajos-realizados' element={<CatalogoTrabajos />} />
          <Route path='/suvalsa/catalogos/trabajos-realizados/alta' element={<AltaTrabajos />} />
          <Route path='/suvalsa/catalogos/datos-y-numeros-control' element={<CatalogoDatosNumeros />} />
          <Route path='/suvalsa/catalogos/datos-y-numeros-control/alta' element={<AltaDatosNumeros />} />
          <Route path='/suvalsa/catalogos/frecuencia-visitas' element={<CatalogoVisitas />} />
          <Route path='/suvalsa/catalogos/frecuencia-visitas/alta' element={<AltaFrecuencia />} />
          <Route path='/suvalsa/catalogos/familias' element={<CatalogoFamilias />} />
          <Route path='/suvalsa/catalogos/familias/alta' element={<AltaFamilia />} />
          <Route path='/suvalsa/catalogos/crear-catalogo-plantas' element={<CatalogoPlantas />} />
          <Route path='/suvalsa/catalogos/rutas-para-plantas' element={<CatalogoRutasPlanta />} />
          <Route path='/suvalsa/catalogos/rutas-para-plantas/alta' element={<AltaRutaPorPlanta />} />
          <Route path='/suvalsa/catalogos/paquete-insumos' element={<CatalogoPaqueteInsumos />} />
          <Route path='/suvalsa/catalogos/altacosto-servicio' element={<AltaCostosServicio />} />
          <Route path='/suvalsa/catalogos/actualizacionCosto-servicio' element={<ActualizacionCostosServicio />} />
        </Route>
        {/**Menu PORTAL PROVEEDORES */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/portal-proveedores' element={<AltaBajaProveedores />} />
          <Route path='/suvalsa/portal-proveedores/altas-bajas' element={<AltaBajaProveedores />} />
          <Route path='/suvalsa/portal-proveedores/facturas-pendientes' element={<FacturasPendientes />} />
          <Route path='/suvalsa/portal-proveedores/solicitudes' element={<SolicitudesProveedores />} />
        </Route>
        {/**Menu HISTORIAL DE RECOLECTOR */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/historial-recolector' element={<ReporteRecoleccionActiva />} />
          <Route path='/suvalsa/historial-recolector/reporte-recoleccion-activa' element={<ReporteRecoleccionActiva />} />
          <Route path='/suvalsa/historial-recolector/programacion-reportes-atencion' element={<ProgramacionReportesAC />} />
          <Route path='/suvalsa/historial-recolector/reporte-ruta-vehiculo' element={<ReporteRutaVehiculo />} />
        </Route>
        {/**Menu FACTURACION */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/facturacion' element={<EstatusFactura />} />
          <Route path='/suvalsa/facturacion/estatus' element={<EstatusFactura />} />
          <Route path='/suvalsa/facturacion/emitir-cancelar' element={<EmitirCancelarFactura />} />
          <Route path='/suvalsa/facturacion/reimprimir' element={<ReimprimirCataPorta />} />
        </Route>
        {/**Menu ALMACEN */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/almacen' element={<EntradasAlmacen />} />
          <Route path='/suvalsa/almacen/entradas' element={<EntradasAlmacen />} />
          <Route path='/suvalsa/almacen/salidas' element={<SalidasAlmacen />} />
          <Route path='/suvalsa/almacen/reportes' element={<ReportesAlmacen />} />
        </Route>
        {/**Menu MANIFIESTOS */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/manifiestos' element={<AltaManifiestos />} />
          <Route path='/suvalsa/manifiestos/alta' element={<AltaManifiestos />} />
          <Route path='/suvalsa/manifiestos/actualizar' element={<ActualizarManifiestos />} />
          <Route path='/suvalsa/manifiestos/reportes/analisis' element={<ReportesManifiestos />} />
          <Route path='/suvalsa/manifiestos/reportes/recoleccion' element={<ReporteRecoleccionManifiesto />} />
          <Route path='/suvalsa/manifiestos/numeracion' element={<SaltarNumeracion />} />
        </Route>
        {/**Menu CUENTAS POR COBRAR */}
        <Route props={{ dataProtected }} element={<InternalApp datosProteccion={dataProtected} />}>
          <Route path='/suvalsa/cuentas-por-cobrar' element={<EstadosCuenta />} />
          <Route path='/suvalsa/cuentas-por-cobrar/estados' element={<EstadosCuenta />} />
          <Route path='/suvalsa/cuentas-por-cobrar/depositos' element={<DepositosRealizados />} />
          <Route path='/suvalsa/cuentas-por-cobrar/registros' element={<RegistroPagos />} />
          <Route path='/suvalsa/cuentas-por-cobrar/saldos' element={<ResumenSaldos />} />
          <Route path='/suvalsa/cuentas-por-cobrar/cobranza' element={<CobranzaPendienteRuta />} />
          <Route path='/suvalsa/cuentas-por-cobrar/reportes' element={<ReportesCuentas />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
