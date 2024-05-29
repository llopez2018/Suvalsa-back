import React from "react";
import { useLocation } from "react-router-dom";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import { Form, Formik } from "formik";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText } from "../../../componentes/Formik";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaFamilia from "../Schemas/SchemaAltaFamilia";
import useAlta from "../../../Hooks/UseAltas";
import {
  idToastalta,
  initValuesAdd,
  AgregarFamilia,
  urlCatalogo
} from "../Familias";

const AltaFamiliaForm = () => {
  const location = useLocation();

  // get urlBack
  let urlBack;
  if (location.state) {
    urlBack = location.state.urlBack;
  }

  const { loading, onSubmitAlta, buttonsGroup } = useAlta({
    idToastalta,
    addData: AgregarFamilia,
    backUrl: urlBack ?? urlCatalogo
  });

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastalta}
        title="Familia Agregada"
        message="Familia agregada correctamente"
      />
      <Formik
        initialValues={initValuesAdd}
        validationSchema={schemaAltaFamilia}
        onSubmit={onSubmitAlta}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos de la familia"
                idTarget="collapseFamForm"
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

export default AltaFamiliaForm;
