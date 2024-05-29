import {
  idSideNavMenu, catalogos, almacen, cuentasPorCobrar,
  manifiesto, mttoVehic, rutas, recolecciones, datos, gastos
} from "../../Constantes";
//const idSideNavMenu = "#sideNavMenu";
export const CrearListaSubmenu = (menu) => {
  const listaSubs = [];

  menu.forEach((cat) => {
    listaSubs.push({
      idSideNav: idSideNavMenu,
      url: cat.url,
      label: cat.label
    });
  });
  console.log(listaSubs.length);
  return listaSubs;
};

const submenusDatos = CrearListaSubmenu(datos);
const submenusRecolecciones = CrearListaSubmenu(recolecciones);
const submenusRutas = CrearListaSubmenu(rutas);
const submenusGastos = CrearListaSubmenu(gastos);
const submenusMttoVehic = CrearListaSubmenu(mttoVehic);
const submenusManifiesto = CrearListaSubmenu(manifiesto);
const submenusCuentasPcobrar = CrearListaSubmenu(cuentasPorCobrar);
const submenusAlmacen = CrearListaSubmenu(almacen);
const submenusCatalogos = CrearListaSubmenu(catalogos);

export const listaMenus = {
  menuCatalogo: submenusCatalogos,
  menuAlmacen: submenusAlmacen,
  menuCuentasPcobrar: submenusCuentasPcobrar,
  menuManifiesto: submenusManifiesto,
  menuMttoVehicular: submenusMttoVehic,
  menuGastos: submenusGastos,
  menuRutas: submenusRutas,
  menuRecolecciones: submenusRecolecciones,
  menuDatos: submenusDatos
};
