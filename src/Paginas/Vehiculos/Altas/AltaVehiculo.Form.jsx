import React from "react";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import { Form, Formik } from "formik";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText } from "../../../componentes/Formik";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaVehiculo from "./Schemas/SchemaAltaVehiculo";
import useAltaVehiculo from "./UseAltaVehiculo";

const AltaVehiculoForm = (props) => {
  const {
    loading,
    idToastaltaVehic,
    initValuesAc,
    onSubmitAltaVehiculo,
    buttonsGroup
  } = useAltaVehiculo(props);
  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastaltaVehic}
        title="Vehículo Agregado"
        message="Vehículo agregado correctamente"
      />
      <Formik
        initialValues={initValuesAc}
        validationSchema={schemaAltaVehiculo}
        onSubmit={onSubmitAltaVehiculo}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Vehículo"
                idTarget="collapseVehicForm"
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
                    label="Marca"
                    name="marca"
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
                    label="Año"
                    name="anio"
                    type="number"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Placas"
                    name="placas"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Chasis"
                    name="chasis"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Motor"
                    name="motor"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="No.INE"
                    name="noine"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Permiso SCT"
                    name="permisosct"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Sustancias"
                    name="sust"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Arrastre"
                    name="arrastre"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Carga"
                    name="carga"
                    type="number"
                    placeholder=""
                  />
                </div>
              </Accordion>
              <Accordion
                titulo="Otros Datos del Vehículo"
                idTarget="collapseOtrosVehicForm"
                expanded="false"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <InputText
                    disabled={isSubmitting}
                    label="Dim. Caja"
                    name="dimCaja"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Dim. Unidad"
                    name="dimUnidad"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Termo Marca"
                    name="terMarca"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Termo Modelo"
                    name="terModelo"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Termo Serie"
                    name="terSerie"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Rampa Marca"
                    name="rampaMarca"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Rampa Cap"
                    name="rampaCap"
                    type="number"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Rampa Serie"
                    name="rampaSerie"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Caja Marca"
                    name="cajaMarca"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Caja Tipo"
                    name="cajaTipo"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Caja Cap"
                    name="cajaCap"
                    type="number"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Caja Accesorios"
                    name="cajaAcc"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Hidrolavadora"
                    name="hidrolavadora"
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

export default AltaVehiculoForm;
