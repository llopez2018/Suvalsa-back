import { useState } from "react"

const useCatPlantas= () => {
    const [rowSelected, setRowSelected] = useState(false);

    const tituloCatResiduos = "Catálogo de Plantas";
    const columnsData = [
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
      { label: "Código", field: "codigo", sort: true }
    ];
  
    async function crearPlantas() {
      return [
        {
          clave: 1,
          nombre: "Sangre RPNE",
          uni: "Kg",
          tipo: "B",
          titulo: "Sangre",
          clasificacion: "RPNE 1.2/01",
          clvine: "BI5",
          sistemadfinal: "Esterilizacion",
          empresadfinal: "Corp Techno",
          autorizacion: "15-V-62-08",
          codigo: ""
        },
        {
          clave: 2,
          nombre: "Cultivos y Cepas",
          uni: "Kg",
          tipo: "B",
          titulo: "Cult+Cep",
          clasificacion: "RPNE 1.2/02",
          clvine: "BI1",
          sistemadfinal: "Esterilizacion",
          empresadfinal: "Corp Techno",
          autorizacion: "15-V-62-08",
          codigo: ""
        },
        {
          clave: 3,
          nombre: "Patológico",
          uni: "Kg",
          tipo: "B",
          titulo: "Patologi",
          clasificacion: "RPNE 1.2/03",
          clvine: "BI3",
          sistemadfinal: "Incineracion(TT1)",
          empresadfinal: "Corp Techno",
          autorizacion: "15-V-66-09",
          codigo: ""
        },
        {
          clave: 4,
          nombre: "No. Anatómico",
          uni: "Kg",
          tipo: "B",
          titulo: "No Anat",
          clasificacion: "RPNE 1.2/04",
          clvine: "BI4",
          sistemadfinal: "Esterilizacion",
          empresadfinal: "Corp Techno",
          autorizacion: "15-V-62-08",
          codigo: ""
        }
      ];
    }
  
    async function GetPlantas() {
      let rowsNew = [];
      console.log("obteniendo Datos de ws Residuos");
      const residuos = await crearPlantas();
      //await ObtenerFrecuencias();
      console.log("lista de Residuos: ", residuos);
  
      if (residuos) {
        rowsNew = residuos.map((res) => ({
          clave: res.clave,
          nombre: res.nombre,
          uni: res.uni,
          tipo: res.tipo,
          titulo: res.titulo,
          clasificacion: res.clasificacion,
          clvine: res.clvine,
          sistemadfinal: res.sistemadfinal,
          empresadfinal: res.empresadfinal,
          autorizacion: res.autorizacion,
          codigo: res.codigo
        }));
      }
      return rowsNew;
    }
  
    const SelectRowAction = (e) => {
      console.log(e.selectedRows, e.selectedIndexes, e.allSelected);
        if(e.selectedRows.length >= 1){
            setRowSelected(true);
        }else{
          setRowSelected(false);
        }
    };
  
    const optionsTable = { ofText: "Plantas de" };
    //const optionsTable= { noFoundMessage: 'Datos no encontrados', ofText: 'Visitas de', loadingMessage: 'Cargando resultados', }
  
    function AltaPlantas() {
      console.log("action click alta Plantas");
    }
    function ReportePlantas() {
      console.log("action click Reporte Plantas");
    }
    function EliminarPlantas() {
      console.log("action click Eliminar Plantas");
    }
  
    const buttonsGroup = {
      buttonPrimary: {
        action: AltaPlantas,
        disabled: false,
        type: "submit",
        label: "Alta"
      },
      buttonSecondary: {
        action: ReportePlantas,
        disabled: !rowSelected,
        type: "button",
        label: "Reporte"
      },
      buttonTertiary: {
        action: EliminarPlantas,
        disabled: !rowSelected,
        type: "button",
        label: "Eliminar"
      }
    };
  
    return {
      tituloCatResiduos,
      columnsData,
      optionsTable,
      SelectRowAction,
      GetPlantas,
      buttonsGroup
    };
}

export default useCatPlantas