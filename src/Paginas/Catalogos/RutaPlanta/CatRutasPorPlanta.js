import { ObtenerRutasPorPlanta, EliminarRutasPorPlanta } from '../../../Apis/FetchCatalogos'

export const tituloCatRutasPlanta = "Catálogo de Rutas por Planta";

export const formatCell = (cell, value) => {
  cell.classList.add("hidden");
};
export const columnas = [
  { label: "Planta", field: "clave", sort: true, width: 50, fixed: true },
  { label: "Nombre", field: "nombre", sort: true },
  { label: "Ruta", field: "ruta", sort: true },
  { label: "", field: "id", sort: false, width: 10, format: formatCell }
];

export const opcionesTabla = { ofText: "Rutas por Planta de" };

export async function GetRutasPlanta() {
  let rowsNew = [];
  console.log("obteniendo Datos de ws Rutas por Planta");
  const rutasPlanta = await ObtenerRutasPorPlanta();
  console.log("lista de Rutas por Planta: ", rutasPlanta);

  if (rutasPlanta) {
    rowsNew = rutasPlanta.map((res) => ({
      clave: res.planta,
      id: res.id,
      nombre: res.nombre,
      ruta: res.rutaplanta
    }));
  }
  return rowsNew;
}
export const idTable = "tablaRutasPlantas";
export const idToastDelete = "toastRutasP";
export const idModalDelete = "staticBackdrop";
export const pathAltaRutasPlanta = "/suvalsa/catalogos/rutas-para-plantas/alta";
export const pathCatRutasPlanta = "/suvalsa/catalogos/rutas-para-plantas";

export async function actionDelete(id){
  console.log("actionDelete");
  await EliminarRutasPorPlanta(id)
};
