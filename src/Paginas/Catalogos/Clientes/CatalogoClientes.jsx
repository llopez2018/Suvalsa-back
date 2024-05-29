import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import CustomModal from "../../../componentes/Modals/CustomModal";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import useCatalogo from "../../../Hooks/UseCatalogos";
import {
  idToastDelete,
  tituloCatClientes,
  columnas,
  opcionesTabla,
  GetClientes,
  idTable,
  idModalDelete,
  pathAltaCliente,
  pathCatClientes,
  actionDelete
} from "./CatClientes";

const CatalogoClientes = () => {
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
    getData: GetClientes,
    idTable,
    idModalDelete,
    pathNavTo: pathAltaCliente,
    pathNavBack: pathCatClientes,
    deleteData: actionDelete
  });

  return (
    <>
      {loading && <CircleSpiner />}

      <CustomToast
        id={idToast}
        title="Cliente eliminado"
        message={`Cliente ${dataSelected} eliminado correctamente`}
      />
      <CardNavigate title={tituloCatClientes}>
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
            title={"Eliminar Cliente"}
            actionAccept={confirmarEliminacion}
          >
            <span>¿Deseas eliminar el cliente con la</span>
            <h1>clave {dataSelected}?</h1>
          </CustomModal>
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoClientes;
