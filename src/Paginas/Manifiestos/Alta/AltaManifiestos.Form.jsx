import React, { useState, useEffect, useRef } from "react";
import { useAltaTableSelected, mostrarResultadoAlta } from "../../../Hooks/UseAltas";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import { Form, Formik } from "formik";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputField, InputText } from "../../../componentes/Formik";
import { ButtonGroup } from "../../../componentes/Button/GenericButton";
import schemaAltaManifiestosYdocsVi from "../Schemas/SchemaAltaManifiestos";
import useAltaManifiestos from "./useAltaManfiestos";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import CustomModal from "../../../componentes/Modals/CustomModal";
import AgregarInsumoForm from "./AgregarInsumo.Form";

const AltaManifiestosYDocsViajeForm = () => {
  let fechaInicio = useRef("");
  const [dias, setDias] = useState("");
  const [loadingPage, setLoadingPage] = useState(false);
  const [genManifiestos, setGenManifiestos] = useState(false);

  const idToastAgregar = "toastAgregarInsumo";

  const resetStates= ()=>{
    fechaInicio.current =""
    setDias("")
    setGenManifiestos(false)
  }
  const {
    onSubmitAltaManifestos, respuestaAlta,
    idTableClientesManif,
    colsClientesManif,
    opcionesTabla,
    idModalClientesManif, initValuesAdd, idToastalta,
    loadingData,
    BuscarRuta,
    GetClientesManif, reloadClientesManif,
    clientesManif,
    rutaData,
  } = useAltaManifiestos({fechaInicio : fechaInicio, diasManifiesto: dias, actionReset: resetStates});

  const {
    onSubmitAlta,
    columnsData,
    optionsTable,
    SelectRowAction, idxSelected,dataSelected,
    GetRowsData,
    reloadTable,
    loading,
    buttonsGroup
  } = useAltaTableSelected({
    idToastalta,
    addData: onSubmitAltaManifestos,
    columnsData: colsClientesManif,
    optionsTable: opcionesTabla,
    getData: GetClientesManif,
    idTable: idTableClientesManif,
    editTable: true,
    idModalAgregar: idModalClientesManif
  });

  const onChangeClave = async (values, setFieldValue) => {
    console.log("onchange Clave: ", values);
    setLoadingPage(true);
    const data = await BuscarRuta(values.clave);
    console.log("data::::", data);
    setFieldValue("nombre", data.nombre);
    setFieldValue("dias", data.duracion);
    setDias(data.duracion)
    setFieldValue("oper", data.oper);
    setFieldValue("operador", data.operador);
    setFieldValue("aux", data.aux);
    setFieldValue("auxiliar", data.auxiliar);
    setFieldValue("noEco", data.noEco);
    setFieldValue("vehiculo", data.vehiculo);
    setLoadingPage(false);
  };

  function agregarSalida(idxManif, noSalida) {
    console.log('se agregara la salida ', noSalida, ' al indice ', idxManif)
    setTimeout(function() {
      const tabla = document.getElementById(idTableClientesManif)
      console.log('table: ', tabla)
      const tbody = tabla.getElementsByTagName("tbody")
      console.log("tbody:", tbody)
      const rowManif = tbody[0].children[idxManif]
      if(rowManif){
        const cells = rowManif.getElementsByTagName("td")
        let c = 0
        for( c; c < cells.length ; c++){
            const dataField = cells[c].getAttribute("data-te-field")
            if(dataField && dataField === "salida"){
              cells[c].insnerText = noSalida
              cells[c].innerHTML = noSalida
              clientesManif[idxManif].salida = noSalida
              break;
            }
        }
        mostrarResultadoAlta(idToastAgregar)
      }
  }, 100);
  }
  useEffect(() => {
    if (clientesManif) {
      reloadTable();
    }
  }, [clientesManif]);

  return (
    <>
      {(loadingData || loading || loadingPage) && <CircleSpiner />}
      <CustomToast type={respuestaAlta.tipo}
        id={idToastalta}
        title="Manifiesto Agregado"
        message={respuestaAlta.mensaje}
      />
      <CustomToast
        id={idToastAgregar}
        title="Salida de Insumo Agregada"
        message="Salida de Insumo agregados correctamente en el viaje"
      />
      <Formik
        initialValues={initValuesAdd}
        validationSchema={schemaAltaManifiestosYdocsVi}
        onSubmit={onSubmitAlta}
      >
        {(props) => {
          const { isSubmitting, handleChange, setFieldValue, values } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Viaje"
                idTarget="collapseManifDocsVForm"
                expanded="true"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <InputField
                    disabled={isSubmitting || loadingData}
                    label="Clave"
                    name="clave"
                    type="text"
                    placeholder=""
                    onKeyDown={async (e) => {
                      if (fechaInicio.current !== "") {
                        //presiona enter o tab
                        if (e.keyCode === 13 || e.keyCode === 9) {
                          await onChangeClave(values, setFieldValue);
                        }
                      }
                    }}
                  />

                  <InputText
                    disabled
                    label="Nombre"
                    name="nombre"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled
                    label="Días"
                    name="dias"
                    type="number"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Fecha de Inicio"
                    type="date"
                    placeholder=""
                    name="fInicio"
                    onChange={(e) => {
                      console.log(e.target.value)
                      handleChange(e);
                      fechaInicio.current = e.target.value;
                      //si ya se encuentran cargados los manifiestos, se recargan los valores para actualizar las fechas de visita
                      if(genManifiestos)
                        reloadClientesManif()
                    }}
                  />

                  <InputText
                    disabled={true}
                    label="Operador"
                    name="oper"
                    type="text"
                    placeholder=""
                  />

                  <InputText
                    disabled={true}
                    label=""
                    name="operador"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={true}
                    label="Auxiliar"
                    name="aux"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={true}
                    label=""
                    name="auxiliar"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={true}
                    label="No.Eco."
                    name="noEco"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={true}
                    label="Vehículo"
                    name="vehiculo"
                    type="text"
                    placeholder=""
                  />
                  <button
                    disabled={isSubmitting || fechaInicio.current === ""}
                    type="button"
                    className="btn-secondary m-3"
                    onClick={async () => {
                      await onChangeClave(values, setFieldValue);
                      setGenManifiestos(true);
                    }}
                  >
                    Generar Manifiestos
                  </button>
                </div>
              </Accordion>
              <Accordion
                titulo={`Manifiestos en la Ruta ${
                  rutaData?.clave ?? ""
                }`}
                idTarget="collapseClientesManifForm"
                expanded={!genManifiestos ? "false" : "true"}
                disabled={!genManifiestos}
              >
                <div className="flex flex-col w-full gap-2">
                  <TablaSeleccionable
                    id={idTableClientesManif}
                    invokeGetDataFunction={GetRowsData}
                    columnsData={columnsData}
                    options={optionsTable}
                    selectActionLsnr={SelectRowAction}
                    editable={true}
                  />
                </div>
              </Accordion>
              <ButtonGroup
                buttonPrimary={buttonsGroup.buttonPrimary}
                buttonTertiary={buttonsGroup.buttonTertiary}
              />
            </Form>
          );
        }}
      </Formik>
      <CustomModal
        id={idModalClientesManif}
        title={"Elaborar Manifiesto"}
        withForm
      >
        <AgregarInsumoForm idxManifiesto={idxSelected} 
          ruta={rutaData?.clave} 
          familia={dataSelected?.familia} 
          cliente={dataSelected?.clave} 
          noManifiesto={dataSelected?.manifiesto} actionUpdateTable={agregarSalida}/>
      </CustomModal>
    </>
  );
};

export default AltaManifiestosYDocsViajeForm;
