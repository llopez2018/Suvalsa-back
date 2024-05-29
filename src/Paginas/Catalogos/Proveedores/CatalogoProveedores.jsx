import CardNavigate from "../../../componentes/Cards/CardNavigate";
import useCatProveedores from "./UseCatProveedores";

import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomTableDelete from '../../../componentes/Tables/CustomTableDelete'
import { useEffect } from "react";

const CatalogoProveedores = () => {
  const {
    loading,
    tituloCatProveedores,
    optionsTable,
    columnsData,
    data,
    setData,
    getDataFunction,
    confirmarEliminacion,propsToast, propsModal,
    buttonsGroup
  } = useCatProveedores();

  useEffect(() => {
    getDataFunction();
  }, []);

  return (
    <>
      {loading && <CircleSpiner />}
      <CardNavigate title={tituloCatProveedores}>
        <div className="flex flex-col w-full gap-2">
          <CustomTableDelete
            columnsData={columnsData}
            data={data}
            optionsTable={optionsTable}
            setData={setData}
            getData={getDataFunction}
            actionDeleteRow={confirmarEliminacion}
            buttonsGroup={buttonsGroup}
            propsModal = {propsModal}
            propsToast= {propsToast}
          />
        </div>
      </CardNavigate>
    </>
  );
};

export default CatalogoProveedores;
