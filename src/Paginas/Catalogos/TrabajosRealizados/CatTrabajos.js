import { EliminarTrabajo, ObtenerTrabajos } from "../../../Apis/FetchCatalogos";

export const tituloCatTrabajos = "Catálogo de Trabajos Realizados en Vehículos";
export const idTable = "tableTrabajos";
export const idToastDelete = "toastTrab";
export const idModalDelete = "staticBackdrop";
export const pathAltaTrab = "/suvalsa/catalogos/trabajos-realizados/alta";
export const pathCatTrab = "/suvalsa/catalogos/trabajos-realizados";

export const formatCell = (cell, value) => {
  cell.classList.add("hidden");
};

export const columnas = [
  { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
  { label: "Trabajo", field: "trabajo", sort: true },
  { label: "", field: "id", sort: false, width: 10, format: formatCell }
];

export const opcionesTabla = { ofText: "Trabajos de" };

export async function GetTrabajos() {
  let rowsNew = [];
  console.log("obteniendo Datos de ws Trabajos");
  const trabajos = await ObtenerTrabajos();
  console.log("lista de Trabajos: ", trabajos);

  if (trabajos) {
    rowsNew = trabajos.map((res) => ({
      clave: res.clave,
      id: res.id,
      trabajo: res.trabajo
    }));
  }
  return rowsNew;
}

export async function actionDelete(id) {
  console.log("actionDelete");
  await EliminarTrabajo(id);
}
