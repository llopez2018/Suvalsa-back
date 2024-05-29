import React from "react";
import { Form, Formik } from "formik";
import { InputText, Select as SelectOpt } from "../../../componentes/Formik";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import Accordion from "../../../componentes/Accordion/Accordion";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaDatosRuta from "../Schemas/SchemaAltaRutasDatos";
import useAltaRutas from "./UseAltaRutas";
import useAlta from "../../../Hooks/UseAltas";

const AltaRutaDatosForm = () => {

  const {idToastalta,
    initValuesAdd,
    gettingData,
    AgregarDatosRuta,
    agregarSelectAg,
    agregarSelectNoEco,
    oper,
    aux,
    noEco,
    agentes,
    vehiculos,
    resetStates} = useAltaRutas();

  const { loading, onSubmitAlta, buttonsGroup } = useAlta({
    idToastalta,
    addData: AgregarDatosRuta,
    backUrl: null,
    actiosOK: resetStates
  });

  return (
    <>
      {(gettingData || loading) && <CircleSpiner />}
      <CustomToast
        id={idToastalta}
        title="Ruta Agregada"
        message="Datos de Ruta agregados correctamente"
      />
      <Formik
        initialValues={initValuesAdd}
        validationSchema={schemaAltaDatosRuta}
        onSubmit={onSubmitAlta}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos de la ruta"
                idTarget="collapseRutaDForm"
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
                    label="Duración"
                    name="duracion"
                    type="number"
                    placeholder=""
                  />
                  <span />

                  <SelectOpt
                    id="selectOper"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="Operador"
                    name="oper"
                  >
                    <option hidden defaultValue value=""></option>
                    {agregarSelectAg(agentes, "OPE")}
                  </SelectOpt>

                  <InputText
                    value={oper}
                    disabled={true}
                    label="operador"
                    name="operador"
                    type="text"
                    placeholder=""
                  />
                  <SelectOpt
                    id="selectAux"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="Auxiliar"
                    name="aux"
                  >
                    <option hidden defaultValue value=""></option>
                    {agregarSelectAg(agentes, "AUX")}
                  </SelectOpt>
                  <InputText
                    value={aux}
                    disabled={true}
                    label=""
                    name="auxiliar"
                    type="text"
                    placeholder=""
                  />
                  <SelectOpt
                    id="selectVehic"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="No.Eco."
                    name="noEco"
                  >
                    <option hidden defaultValue value=""></option>
                    {agregarSelectNoEco(vehiculos)}
                  </SelectOpt>
                  <InputText
                    value={noEco}
                    disabled={true}
                    label="Vehículo"
                    name="vehiculo"
                    type="text"
                    placeholder=""
                  />
                </div>
              </Accordion>

              <ButtonGroup buttonPrimary={buttonsGroup.buttonPrimary} />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AltaRutaDatosForm;
