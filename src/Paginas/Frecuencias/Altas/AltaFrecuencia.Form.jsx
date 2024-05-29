import React from "react";
import { Formik, Form } from "formik";
import { InputText } from "../../../componentes/Formik";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import Accordion from "../../../componentes/Accordion/Accordion";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaFrecuencias from "../Schemas/SchemaAltaFrecuencia";
import useAltaFrecuencia from "./UseAltaFrecuencia";

const AltaFrecuenciaForm = (props) => {
  const {
    initValuesAc,
    onSubmitAltaFrecuencia,
    loading,
    idToastaltaFrecuencia,
    buttonsGroup
  } = useAltaFrecuencia(props);

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastaltaFrecuencia}
        title="Frecuencia Agregada"
        message="Frecuencia agregada correctamente"
      />
      <Formik
        initialValues={initValuesAc}
        validationSchema={schemaAltaFrecuencias}
        onSubmit={onSubmitAltaFrecuencia}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos de la Frecuencia"
                idTarget="collapseFrecForm"
                expanded="true"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <InputText
                    disabled={isSubmitting}
                    label="Clave"
                    name="clave"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Frecuencia"
                    name="frecuencia"
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

export default AltaFrecuenciaForm;
