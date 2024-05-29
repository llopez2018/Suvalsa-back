import React, {useEffect} from 'react'
import CardNavigate from '../../../componentes/Cards/CardNavigate'
import IncorporacionesRecolecRutaForm from './AltaRecoleccionesRuta.Form'
// Initialization for ES Users
import {
  Ripple,
  initTE
} from "tw-elements";
import { TablaSimple } from "../../../componentes/Tables/TablaUse";
import Accordion from '../../../componentes/Accordion/Accordion';
import {
  tituloRecoleccionesEnv,
  columnas,
  opcionesTabla,
  GetManifestacionesEnv,
  idTable
} from "../RecoleccionesEnviadas";

const DatosRutasRecolecciones = () => {
  useEffect(() => {
    initTE({ Ripple });
  }, []);

  return (
    <CardNavigate title="Incorporación de Recolecciones en Ruta">
      <IncorporacionesRecolecRutaForm />
      <Accordion
          titulo={tituloRecoleccionesEnv}
          idTarget="collapseResumenManifEnv"
          expanded="true"
        >
          <div className="flex flex-col w-full gap-2">
            <TablaSimple
              id={idTable}
              invokeGetDataFunction={GetManifestacionesEnv}
              columnsData={columnas}
              options={opcionesTabla}
            />
          </div>
        </Accordion>
    </CardNavigate>
  )
}

export default DatosRutasRecolecciones
