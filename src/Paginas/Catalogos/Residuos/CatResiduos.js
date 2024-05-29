import { EliminarResiduo, ObtenerResiduos } from "../../../Apis/FetchCatalogos";

export const tituloCatResiduos = "Catálogo de Residuos";
export const idTable = "tableResiduos";
export const idToastDelete = "toastResid";
export const idModalDelete = "staticBackdrop";
export const pathAltaResid = "/suvalsa/catalogos/residuos/alta";
export const pathCatResid = "/suvalsa/catalogos/residuos";
export const formatCell = (cell, value) => {
  cell.classList.add("hidden");
};

export const columnas = [
    { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
    { label: "Nombre", field: "nombre", sort: true },
    { label: "Uni", field: "uni", sort: true },
    { label: "Tipo", field: "tipo", sort: true },
    { label: "Título", field: "titulo", sort: true },
    { label: "Clasificación", field: "clasificacion", sort: true },
    { label: "Clv.INE", field: "clvine", sort: true },
    { label: "Sistema D.Final", field: "sistemadfinal", sort: true },
    { label: "Empresa D.Final", field: "empresadfinal", sort: true },
    { label: "Autorización", field: "autorizacion", sort: true },
    { label: "Código", field: "codigo", sort: true },
    { label: "", field: "id", sort: false, width: 10, format: formatCell }
];

export const opcionesTabla = { ofText: "Residuos de" };

export async function GetResiduos() {
  let rowsNew = [];
  console.log("obteniendo Datos de ws Residuos");
    const residuos = await ObtenerResiduos();
    console.log("lista de Residuos: ", residuos);

    if (residuos) {
        rowsNew = residuos.map((res) => ({
          clave: res.clave,
          nombre: res.nombre,
          uni: res.unidad,
          tipo: res.tipo,
          titulo: res.titulo,
          clasificacion: res.repine1,
          clvine: res.repine2,
          sistemadfinal: res.repine3,
          empresadfinal: res.repine4,
          autorizacion: res.repine5,
          codigo: res.codpel,
          id: res.id
        }));
      }
  return rowsNew;
}

export async function actionDelete(id) {
  console.log("actionDelete");
  await EliminarResiduo(id);
}
