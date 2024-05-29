import React, {useState} from 'react'
import CircleSpiner from '../../../componentes/Spinners/CircleSpiner';
import CustomToast from '../../../componentes/Toasts/CustomToast';
import { Form, Formik } from 'formik';
import Accordion from '../../../componentes/Accordion/Accordion';
import { InputText } from '../../../componentes/Formik';
import { ButtonGroup } from '../../../componentes/Button/GenericButton';
import {
    idToastalta,
    initValuesAdd,
    AgregarRecRuta,
    agregarSelectAg,
    agregarSelectNoEco
  } from "../InspeccionesRecRuta";
import useAlta from '../../../Hooks/UseAltas';
import schemaAltaRecRuta from '../Schemas/SchemaAltaRecRuta'

const IncorporacionesRecolecRutaForm = () => {
    const [agentes, setAgentes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [operador, setOperador] = useState("");
  const [auxiliar, setAuxiliar] = useState("");
  const [vehic, setVehic] = useState("");

  function resetStates() {
    console.log("reseting useStates");
    setOperador("");
    setAuxiliar("");
    setVehic("");
  }
  const { loading, onSubmitAlta, buttonsGroup } = useAlta({
    idToastalta,
    addData: AgregarRecRuta,
    backUrl: null,
    actiosOK: resetStates
  });
  
  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastalta}
        title="Recolección Enviada"
        message="Datos de Recolección agregados correctamente"
      />
      <Formik
        initialValues={initValuesAdd}
        validationSchema={schemaAltaRecRuta}
        onSubmit={onSubmitAlta}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos de la recolección"
                idTarget="collapseRecRutaForm"
                expanded="true"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <InputText
                    disabled={isSubmitting}
                    label="Ruta"
                    name="ruta"
                    type="text"
                    placeholder=""
                  />
                  <InputText disabled={true}
                    readOnly
                    label="Nombre"
                    name="nombre"
                    type="text"
                    placeholder=""
                  />
                  <InputText 
                    disabled={isSubmitting}
                    label="Fecha Inicio"
                    name="fInicio"
                    type="date"
                    placeholder="Fecha Inicio"
                  />
                   <InputText disabled={true}
                    label="Días"
                    name="dias"
                    type="number"
                    placeholder=""
                  />
                  <InputText disabled={true}
                    value={operador}
                    label="Operador"
                    name="operador"
                    type="text"
                    placeholder=""
                  />
                   <InputText disabled={true}
                    value={auxiliar}
                    label="Auxiliar"
                    name="auxiliar"
                    type="text"
                    placeholder=""
                  />
                  <InputText disabled={true}
                    value={vehic}
                    label="Vehículo"
                    name="vehiculo"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Fecha Envío"
                    name="fEnvio"
                    type="date"
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
  )
}

export default IncorporacionesRecolecRutaForm
