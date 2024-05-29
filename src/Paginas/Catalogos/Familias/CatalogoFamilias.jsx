import CardNavigate from "../../../componentes/Cards/CardNavigate";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import CustomModal from "../../../componentes/Modals/CustomModal";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import useCatalogo from "../../../Hooks/UseCatalogos";
import {
  idToastDelete,
  tituloCatFamilias,
  columnas,
  opcionesTabla,
  GetFamilias,
  idTable,
  idModalDelete,
  pathAltaFamilia,
  pathCatFamilia,
  actionDelete
} from "./CatFamilias";

const CatalogoFamilias = () => {
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
    getData: GetFamilias,
    idTable,
    idModalDelete,
    pathNavTo: pathAltaFamilia,
    pathNavBack: pathCatFamilia,
    deleteData: actionDelete
  });

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Familia eliminada"
        message={`Familia ${dataSelected} eliminada correctamente`}
      />
      <CardNavigate title={tituloCatFamilias}>
        <div className="flex flex-col w-full gap-2">
          <TablaSeleccionable
            id="tablaFamilias"
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
            title={"Eliminar familia"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar la Familia con </span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoFamilias;
