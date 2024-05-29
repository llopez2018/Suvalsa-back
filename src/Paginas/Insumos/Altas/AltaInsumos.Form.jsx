import React from "react";
import { Formik, Form } from "formik";
import { InputText } from "../../../componentes/Formik";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import Accordion from "../../../componentes/Accordion/Accordion";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaInsumos from "../Schemas/SchemaAltaInsumo";
import useAltaInsumo from "./UseAltaInsumos";

const AltaInsumosForm = (props) => {
  const {
    initValuesAc,
    onSubmitAltaInsu,
    loading,
    idToastaltaInsu,
    buttonsGroup
  } = useAltaInsumo(props);

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastaltaInsu}
        title="Insumo Agregado"
        message="Insumo agregado correctamente"
      />
      <Formik
        initialValues={initValuesAc}
        validationSchema={schemaAltaInsumos}
        onSubmit={onSubmitAltaInsu}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Insumo"
                idTarget="collapseForm"
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
                    label="Nombre"
                    name="nombre"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Modelo"
                    name="modelo"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Uni"
                    name="uni"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Tipo"
                    name="tipo"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Precio"
                    name="precio"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Mínimo"
                    name="minimo"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Máximo"
                    name="maximo"
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

export default AltaInsumosForm;
