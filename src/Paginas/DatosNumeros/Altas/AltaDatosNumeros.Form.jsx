import React from "react";
import { Formik, Form } from "formik";
import { InputText } from "../../../componentes/Formik";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import Accordion from "../../../componentes/Accordion/Accordion";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaNoDatos from "../Schemas/SchemaAltaDatosNumeros";
import useAltaDatosNumeros from "./UseAltaDatosNumeros";

const AltaDatosNumerosForm = (props) => {
  const {
    initValuesAc,
    onSubmitAltaDatosNumeros,
    loading,
    idToastaltaNoDatos,
    buttonsGroup
  } = useAltaDatosNumeros(props);

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastaltaNoDatos}
        title="Número y Dato de Control Agregado"
        message="Registro agregado correctamente"
      />
      <Formik
        initialValues={initValuesAc}
        validationSchema={schemaAltaNoDatos}
        onSubmit={onSubmitAltaDatosNumeros}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Número y Dato de Control"
                idTarget="collapseDatoForm"
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
                    label="Concepto"
                    name="concepto"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Dato - Número - Código"
                    name="dato"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Status"
                    name="status"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Observaciones"
                    name="notas"
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

export default AltaDatosNumerosForm;
