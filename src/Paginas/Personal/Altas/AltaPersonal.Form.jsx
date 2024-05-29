import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText, Select as SelectF } from "../../../componentes/Formik";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaAgente from './Schemas/SchemaAltaPersonal'
import CustomToast from "../../../componentes/Toasts/CustomToast";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
// Initialization for ES Users
import { Select } from "tw-elements";
import { createOption } from "../../../utils/CommonUtils";
import useAlta from "../../../Hooks/UseAltas";
import {
  idToastalta,
  initValuesAdd,
  AgregarPersonal,
  urlCatalogo,
} from "../AltaPersonal";

const AltaPersonalForm = () => {

  const location = useLocation();

  // get urlBack
  let urlBack;
  if (location.state) {
    urlBack = location.state.urlBack;
  }

  const { loading, onSubmitAlta, buttonsGroup } = useAlta({
    idToastalta,
    addData: AgregarPersonal,
    backUrl: urlBack ?? urlCatalogo
  });

  const tiposUsuarios = [
    {
      clave: "1", rol: "Administrador"
    },
    {
      clave: "2", rol: "Super Admin"
    },
    {
      clave: "3", rol: "Admin"
    },
    {
      clave: "4", rol: "Usuario Administrativo"
    },
    {
      clave: "5", rol: "Operador"
    },
    {
      clave: "6", rol: "Auxiliar"
    },
    {
      clave: "7", rol: "Capturador"
    },
  ]

  function agSelectOptTipos() {
      return (
        tiposUsuarios.map((tipo) =>
          createOption('TipoUsuario'.concat(tipo.clave), tipo.clave, tipo.rol))
      )
  }

  useEffect(() => {
    console.log("Setting Select::: ");

    const singleSelect = document.querySelector("#selectTipo");
    if (singleSelect) Select.getOrCreateInstance(singleSelect);
  },[])

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastalta}
        title="Agente Agregado"
        message="Agente agregado correctamente"
      />
      <Formik
        initialValues={initValuesAdd}
        validationSchema={schemaAltaAgente}
        onSubmit={onSubmitAlta}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Personal"
                idTarget="collapsePersonalForm"
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
                    label="Puesto"
                    name="puesto"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Tarjeta"
                    name="tarjeta"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Domicilio"
                    name="domicilio"
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
                  <InputText
                    disabled={isSubmitting}
                    label="Celular"
                    name="celular"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Licencia"
                    name="licencia"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Curp"
                    name="curp"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Imss"
                    name="imss"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Mail"
                    name="mail"
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
                </div>
              </Accordion>

              <Accordion
                titulo="Datos de Autenticación"
                idTarget="collapseDataAuthForm"
                expanded="true"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <SelectF
                    id="selectTipo"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="Tipo"
                    name="tipo"
                  >
                    <option hidden defaultValue value=""></option>
                    {agSelectOptTipos()}
                  </SelectF>
                  <InputText
                    disabled={isSubmitting}
                    label="Email"
                    name="usuario"
                    type="email"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Contraseña"
                    name="contrasena"
                    type="password"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Confirmar Contraseña"
                    name="confContrasena"
                    type="password"
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

export default AltaPersonalForm;
