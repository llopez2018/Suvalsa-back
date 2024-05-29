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
  tituloCatResiduos,
  columnas,
  opcionesTabla,
  GetResiduos,
  idTable,
  idModalDelete,
  pathAltaResid,
  pathCatResid,
  actionDelete
} from "./CatResiduos";

const CatalogoResiduos = () => {
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
    getData: GetResiduos,
    idTable,
    idModalDelete,
    pathNavTo: pathAltaResid,
    pathNavBack: pathCatResid,
    deleteData: actionDelete
  });

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Residuo eliminado"
        message={`Residuo ${dataSelected} eliminado correctamente`}
      />
      <CardNavigate title={tituloCatResiduos}>
        <div className="flex flex-col w-full gap-2">
          <TablaSeleccionable
            id="tableResiduos"
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
            title={"Eliminar residuo"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar el Residuo con </span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoResiduos;
