import React from "react";
import { Formik, Form } from "formik";
import { useLocation } from "react-router-dom";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText } from "../../../componentes/Formik";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import schemaAltaRutaPlanta from "../Schemas/SchemaAltaRutaPorPlanta";
import useAlta from "../../../Hooks/UseAltas";
import {
  idToastalta,
  initValuesAdd,
  AgregarRuta,
  urlCatalogo
} from "../RutaPorPlanta";

const AltaRutaPorPlantaForm = () => {
  const location = useLocation();

  // get urlBack
  let urlBack;
  if (location.state) {
    urlBack = location.state.urlBack;
  }

  const { loading, onSubmitAlta, buttonsGroup } = useAlta({
    idToastalta,
    addData: AgregarRuta,
    backUrl: urlBack ?? urlCatalogo
  });

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastalta}
        title="Ruta Agregada"
        message="Ruta por planta agregada correctamente"
      />
      <Formik
        initialValues={initValuesAdd}
        validationSchema={schemaAltaRutaPlanta}
        onSubmit={onSubmitAlta}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos de la ruta"
                idTarget="collapseRutaPForm"
                expanded="true"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <InputText
                    disabled={isSubmitting}
                    label="Planta"
                    name="planta"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Nombre"
                    name="nombre"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Ruta"
                    name="rutaplanta"
                    type="text"
                    placeholder=""
                  />
                </div>
              </Accordion>

              <ButtonGroup
                buttonPrimary={buttonsGroup.buttonPrimary}
                buttonSecondary={buttonsGroup.buttonSecondary}
                buttonTertiary={buttonsGroup.buttonTertiary}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AltaRutaPorPlantaForm;
