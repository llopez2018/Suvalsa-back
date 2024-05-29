import {
  ObtenerVehiculos,
  EliminarVehiculo
} from "../../../Apis/FetchCatalogos";

export const tituloCatVehiculos = "Catálogo de Vehículos";
export const idTable = "tableVehiculos";
export const idToastDelete = "toastVehic";
export const idModalDelete = "staticBackdrop";
export const pathAltaVehic = "/suvalsa/catalogos/vehiculos/alta";
export const pathCatVehic = "/suvalsa/catalogos/vehiculos";

export const formatCell = (cell, value) => {
  cell.classList.add("hidden");
};

export const columnas = [
  { label: "Clave", field: "clave", sort: true, width: 50, fixed: true },
  { label: "Marca", field: "marca", sort: true },
  { label: "Modelo", field: "modelo", sort: true },
  { label: "Año", field: "anio", sort: true },
  { label: "Placas", field: "placas", sort: true },
  { label: "Chasis", field: "chasis", sort: true },
  { label: "Motor", field: "motor", sort: true },
  { label: "No.INE", field: "noine", sort: true },
  { label: "Permiso SCT", field: "permisosct", sort: true },
  { label: "Sustancias", field: "sust", sort: true, fixed: true, width: 200  },
  { label: "Arrastre", field: "arrastre", sort: true },
  { label: "Carga", field: "carga", sort: true },
  { label: "Dim. Caja", field: "dimCaja", sort: true },
  { label: "Dim. Unidad", field: "dimUnidad", sort: true },
  { label: "Termo Marca", field: "terMarca", sort: true },
  { label: "Termo Modelo", field: "terModelo", sort: true },
  { label: "Termo Serie", field: "terSerie", sort: true },
  { label: "Rampa Marca", field: "rampaMarca", sort: true },
  { label: "Rampa Cap", field: "rampaCap", sort: true },
  { label: "Rampa Serie", field: "rampaSerie", sort: true },
  { label: "Caja Marca", field: "cajaMarca", sort: true },
  { label: "Caja Tipo", field: "cajaTipo", sort: true },
  { label: "Caja Cap", field: "cajaCap", sort: true },
  { label: "Caja Accesorios", field: "cajaAcc", sort: true },
  { label: "Hidrolavadora", field: "hidrolavadora", sort: true },
  { label: "", field: "id", sort: false, width: 10, format: formatCell }
];

export const opcionesTabla = { ofText: "Vehículos de" };

export async function GetVehiculos() {
  let rowsNew = [];
  console.log("obteniendo Datos de ws Vehiculos");
  const vehiculos = await ObtenerVehiculos();
  console.log("lista de Vehiculos: ", vehiculos);

  if (vehiculos) {
    rowsNew = vehiculos.map((res) => ({
      clave: res.CLAVE,
      id: res.id,
      marca: res.MARCA,
      modelo: res.MODELO,
      anio: res.AÑO,
      placas: res.PLACAS,
      chasis: res.CHASIS,
      motor: res.MOTOR,
      noine: res.NOINE,
      permisosct: res.SCT,
      sust: res.SUSTANCIAS,
      arrastre : res.ARRASTRE,
      carga : res.CARGA,
      dimCaja : res.DIMCAJA,
      dimUnidad : res.DIMUNIDAD,
      terMarca : res.TERMOMARCA,
      terModelo : res.TERMOMOD,
      terSerie : res.TERMOSERIE,
      rampaMarca : res.RAMPAMARCA,
      rampaCap : res.RAMPACAP,
      rampaSerie : res.RAMPASERIE,
      cajaMarca : res.CAJAMARCA,
      cajaTipo : res.CAJATIPO,
      cajaCap : res.CAJACAP,
      cajaAcc : res.CAJAACC,
      hidrolavadora : res.HIDROLAV,
    }));
  }
  return rowsNew;
}

export async function actionDelete(id) {
  console.log("actionDelete");
  await EliminarVehiculo(id);
}
