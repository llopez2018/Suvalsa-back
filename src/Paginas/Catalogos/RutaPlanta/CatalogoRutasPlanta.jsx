import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import CustomModal from "../../../componentes/Modals/CustomModal";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import useCatalogo from "../../../Hooks/UseCatalogos";
import {
  idToastDelete,
  tituloCatRutasPlanta,
  columnas,
  opcionesTabla,
  GetRutasPlanta,
  idTable,
  idModalDelete,
  pathAltaRutasPlanta,
  pathCatRutasPlanta,
  actionDelete
} from "./CatRutasPorPlanta";

const CatalogoRutasPlanta = () => {
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
    getData: GetRutasPlanta,
    idTable,
    idModalDelete,
    pathNavTo: pathAltaRutasPlanta,
    pathNavBack: pathCatRutasPlanta,
    deleteData: actionDelete
  });

  return (
    <>
    {loading &&
        <CircleSpiner /> }

      <CustomToast
        id={idToast}
        title="Ruta eliminada"
        message={`Ruta ${dataSelected} eliminada correctamente`}
      />
    <CardNavigate title={tituloCatRutasPlanta}>
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
          title={"Eliminar Ruta"}
          actionAccept={confirmarEliminacion}
        >
          <span>¿Deseas eliminar la ruta con la</span>
          <h1>planta {dataSelected}?</h1>
        </CustomModal>
      </div>
    </CardNavigate>
    </>
  );
};

export default CatalogoRutasPlanta;
