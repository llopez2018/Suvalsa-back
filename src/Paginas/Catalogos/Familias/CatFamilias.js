import { ObtenerFamilias, EliminarFamilia } from '../../../Apis/FetchFamilias';

export const tituloCatFamilias = "Catálogo de Familias de Clientes";

export const formatCell = (cell, value) => {
  cell.classList.add("hidden");
};
export const columnas = [
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Nombre", field: "nombre", sort: true },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
];

export const opcionesTabla = { ofText: "Familias de" };

export async function GetFamilias() {
  let rowsNew = [];
  console.log("obteniendo Datos de ws Familias");
  const familias = await ObtenerFamilias();
    console.log("lista de Familias: ", familias);

    if (familias) {
      rowsNew = familias.map((resp) => ({
        clave: resp.clave,
        id: resp.id,
        nombre: resp.nombre
      }));
    }
  return rowsNew;
}
export const idTable = "tablaFamilias";
export const idToastDelete = "toastFam";
export const idModalDelete = "staticBackdrop";
export const pathAltaFamilia = "/suvalsa/catalogos/familias/alta";
export const pathCatFamilia = "/suvalsa/catalogos/familias";

export async function actionDelete(id){
  console.log("actionDelete");
  await EliminarFamilia(id)
};
