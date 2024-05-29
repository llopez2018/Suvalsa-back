
export const tituloRecoleccionesEnv = "Resumen de las Recolecciones Enviadas";

export const formatCell = (cell, value) => {
  cell.classList.add("hidden");
};
 
export const columnas = [
  { label: "Manifiesto", field: "manifiesto", sort: true, width: 50, fixed: true },
  { label: "Cliente", field: "cliente", sort: true, width: 50, fixed: true },
  { label: "Nombre", field: "nombre", sort: true },
  { label: "Fecha Visita", field: "fVisita", sort: true },
  { label: "Cantidad", field: "cantidad", sort: true },
  { label: "", field: "id", sort: false, width: 10, format: formatCell }
];

export const opcionesTabla = { ofText: "Recolecciones de" };

export async function GetManifestacionesEnv() {
  let rowsNew = [];
  console.log("obteniendo Datos de ws MAnifestaciones");
  const manif = [];//await ObtenerManifestaciones();
  console.log("lista de MAnifestaciones: ", manif);

  if (manif) {
    rowsNew = manif.map((res) => ({
        manifiesto : res.manifiesto,
        id: res.id,
        cliente : res.cliente,
        nombre: res.nombre,
        fVisita: res.fVisita,
        cantidad: res.cantidad,
    }));
  }
  return rowsNew;
}
export const idTable = "tablaManifEnv";
