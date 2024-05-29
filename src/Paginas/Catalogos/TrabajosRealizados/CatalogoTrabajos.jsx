import React from "react";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CustomModal from "../../../componentes/Modals/CustomModal";
import useCatalogo from "../../../Hooks/UseCatalogos";
import {
  idToastDelete,
  tituloCatTrabajos,
  columnas,
  opcionesTabla,
  GetTrabajos,
  idTable,
  idModalDelete,
  pathAltaTrab,
  pathCatTrab,
  actionDelete
} from './CatTrabajos'

const CatalogoTrabajos = () => {
  const {
    loading,
    idToast,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetRowsData,
    confirmarEliminacion,
    buttonsGroup
  } = useCatalogo({
    idToast: idToastDelete,
    columnsData: columnas,
    optionsTable: opcionesTabla,
    getData: GetTrabajos,
    idTable,
    idModalDelete,
    pathNavTo: pathAltaTrab,
    pathNavBack: pathCatTrab,
    deleteData: actionDelete
  });

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Trabajo eliminado"
        message={`Trabajo ${dataSelected} eliminado correctamente`}
      />
      <CardNavigate title={tituloCatTrabajos}>
        <div className="flex flex-col w-full gap-2">
          <TablaSeleccionable
            id={idTable}
            invokeGetDataFunction={GetRowsData}
            columnsData={columnsData}
            options={optionsTable}
            selectActionLsnr={SelectRowAction}
          />
          <ButtonGroup
            buttonPrimary={buttonsGroup.buttonPrimary}
            buttonSecondary={buttonsGroup.buttonSecondary}
            buttonTertiary={buttonsGroup.buttonTertiary}
          />
          <CustomModal
            title={"Eliminar Trabajo"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar el Trabajo con </span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoTrabajos;
