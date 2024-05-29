import React from "react";
import { Formik, Form } from "formik";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText } from "../../../componentes/Formik";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaProveedor from "./Schemas/SchemaAltaProv";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import useAltaProveedor from "./UseAltaProveedor";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";

const AltaProveedorForm = (props) => {
  const {
    initValuesAc,
    onSubmitAltaProv,
    loading,
    idToastaltaProv,
    buttonsGroup
  } = useAltaProveedor(props);

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastaltaProv}
        title="Proveedor Agregado"
        message="Proveedor agregado correctamente"
      />
      <Formik
        initialValues={initValuesAc}
        validationSchema={schemaAltaProveedor}
        onSubmit={onSubmitAltaProv}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Proveedor"
                idTarget="collapseOne1"
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
                    label="Empresa"
                    name="empresa"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Calle"
                    name="calle"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Colonia"
                    name="colonia"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Ciudad"
                    name="ciudad"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="CP"
                    name="cp"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Contacto"
                    name="contacto"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Teléfono"
                    name="telefono"
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

export default AltaProveedorForm;
