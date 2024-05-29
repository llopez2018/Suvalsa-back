import React from "react";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import UseCatPersonal from "./UsePersonal";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CustomModal from "../../../componentes/Modals/CustomModal";

const CatalogoPersonal = () => {
  const {
    loading,
    idToast,
    tituloCatAgentes,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetAgentes,
    confirmarEliminacion,
    buttonsGroup
  } = UseCatPersonal();

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Agente eliminado"
        message={`Agente ${dataSelected} eliminado correctamente`}
      />
      <CardNavigate title={tituloCatAgentes}>
        <div className="flex flex-col w-full gap-2">
          <TablaSeleccionable
            id="tablaAgentes"
            invokeGetDataFunction={GetAgentes}
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
            title={"Eliminar Agente"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar el Agente con </span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoPersonal;
