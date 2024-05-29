import React from "react";
import { Formik, Form } from "formik";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText } from "../../../componentes/Formik";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaResiduo from "./Schemas/SchemaAltaResiduo";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import useAltaResiduo from "./UseAltaResiduo";

const AltaResiduoForm = (props) => {
  const {
    initValuesAc,
    onSubmitAltaResiduo,
    loading,
    idToastaltaResi,
    buttonsGroup
  } = useAltaResiduo(props);

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastaltaResi}
        title="Residuo Agregado"
        message="Residuo agregado correctamente"
      />
      <Formik
        initialValues={initValuesAc}
        validationSchema={schemaAltaResiduo}
        onSubmit={onSubmitAltaResiduo}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Residuo"
                idTarget="collapseResiForm"
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
                    label="Unidad"
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
                    label="Título"
                    name="titulo"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Clasificación"
                    name="clasificacion"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Clv.INE"
                    name="clvine"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Sistema D.Final"
                    name="sistemadfinal"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Empresa D.Final"
                    name="empresadfinal"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Autorización"
                    name="autorizacion"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Código"
                    name="codigo"
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

export default AltaResiduoForm;
