import CardNavigate from "../../../componentes/Cards/CardNavigate";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CustomModal from "../../../componentes/Modals/CustomModal";
import UseCatFrecuencias from "./UseFrecuencias";

const CatalogoVisitas = () => {
  const {
    loading,
    idToast,
    tituloCatFrecuencias,
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetFrecuencias,
    confirmarEliminacion,
    buttonsGroup
  } = UseCatFrecuencias();

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Frecuencia eliminada"
        message={`Frecuencia ${dataSelected} eliminada correctamente`}
      />
      <CardNavigate title={tituloCatFrecuencias}>
        <div className="flex flex-col w-full gap-2">
          <TablaSeleccionable
            id="tablaFrecuencias"
            invokeGetDataFunction={GetFrecuencias}
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
            title={"Eliminar frecuencia"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar la frecuencia con </span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoVisitas;
