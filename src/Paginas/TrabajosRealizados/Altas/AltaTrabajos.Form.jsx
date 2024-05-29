import React from "react";
import { Formik, Form } from "formik";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText } from "../../../componentes/Formik";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaTrabajo from "./Schemas/SchemaAltaTrabajos";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import useAltaTrabajo from "./UseAltaTrabajos";

const AltaTrabajoForm = (props) => {
  const {
    initValuesAc,
    onSubmitAltaTrabajos,
    loading,
    idToastaltaTrab,
    buttonsGroup
  } = useAltaTrabajo(props);

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastaltaTrab}
        title="Trabajo Agregado"
        message="Trabajo agregado correctamente"
      />
      <Formik
        initialValues={initValuesAc}
        validationSchema={schemaAltaTrabajo}
        onSubmit={onSubmitAltaTrabajos}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Trabajo Realizado"
                idTarget="collapseTrabForm"
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
                    label="Trabajo"
                    name="trabajo"
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

export default AltaTrabajoForm;
