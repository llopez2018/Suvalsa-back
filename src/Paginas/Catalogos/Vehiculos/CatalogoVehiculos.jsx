import React from "react";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CustomModal from "../../../componentes/Modals/CustomModal";
import useCatalogo from "../../../Hooks/UseCatalogos";
import {
  idToastDelete,
  tituloCatVehiculos,
  columnas,
  opcionesTabla,
  GetVehiculos,
  idTable,
  idModalDelete,
  pathAltaVehic,
  pathCatVehic,
  actionDelete
} from "./CatVehiculos";

const CatalogoVehiculos = () => {
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
    getData: GetVehiculos,
    idTable,
    idModalDelete,
    pathNavTo: pathAltaVehic,
    pathNavBack: pathCatVehic,
    deleteData: actionDelete
  });

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Vehículo eliminado"
        message={`Vehículo ${dataSelected} eliminado correctamente`}
      />
      <CardNavigate title={tituloCatVehiculos}>
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
            title={"Eliminar vehículo"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar el Vehículo con </span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoVehiculos;
