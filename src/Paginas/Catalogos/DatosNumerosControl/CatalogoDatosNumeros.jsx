import React from "react";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CustomModal from "../../../componentes/Modals/CustomModal";
import useCatDatosNumeros from "./UseDatosNumeros";

const CatalogoDatosNumeros = () => {
  const {
    loading,
    idToast,
    tituloCatNumerosDatosControl,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetDatosNumeros,
    confirmarEliminacion,
    buttonsGroup
  } = useCatDatosNumeros();

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Número y dato de control eliminado"
        message={`Registro ${dataSelected} eliminado correctamente`}
      />
      <CardNavigate title={tituloCatNumerosDatosControl}>
        <div className="flex flex-col w-full gap-2">
          <TablaSeleccionable
            id="tableDatosNumerosControl"
            invokeGetDataFunction={GetDatosNumeros}
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
            title={"Eliminar Número y Dato de Control"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar el Registro con </span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoDatosNumeros;
