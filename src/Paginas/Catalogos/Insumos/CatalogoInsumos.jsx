import React from "react";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import useCatInsumos from "./UseInsumos";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CustomModal from "../../../componentes/Modals/CustomModal";

const CatalogoInsumos = () => {
  const {
    loading,
    idToast,
    tituloCatInsumos,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetResiduos,
    confirmarEliminacion,
    buttonsGroup
  } = useCatInsumos();

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Insumo eliminado"
        message={`Insumo ${dataSelected} eliminado correctamente`}
      />

      <CardNavigate title={tituloCatInsumos}>
        <div className="flex flex-col w-full gap-2">
          <TablaSeleccionable
            id="tableInsumos"
            invokeGetDataFunction={GetResiduos}
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
            title={"Eliminar insumo"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar el Insumo con </span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoInsumos;
