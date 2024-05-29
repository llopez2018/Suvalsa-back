import React, { useEffect, useState } from "react";
import { Input, Toast, Modal, initTE, Select } from "tw-elements";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import { Form, Formik } from "formik";
import { InputField, InputText } from "../../../componentes/Formik";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import { schemaEditaManifiestosYdocsVi } from "../Schemas/SchemaAltaManifiestos";
import { ObtenerInsumos } from "../../../Apis/FetchInsumos";

const EditarManifiestoForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [servicioTB, setServicioTB] = useState(false);

  const { idModal } = props;
  const idToastEditar = "toastEditarManifiestos";

  initTE({ Modal, Toast });

  const closeModal = () => {
    const closeBtn = document.getElementById("closeFormEditManif");
    if (closeBtn) {
      console.log("closing");
      setTimeout(() => {
        closeBtn.click();
        const myToastEdit = document.getElementById(idToastEditar);
        console.log(Toast.getInstance(myToastEdit));
        Toast.getOrCreateInstance(myToastEdit).hide();
      }, 2000);
    }
  };
  async function onSubmitEditarManifesto(values) {
    console.log("onsubmit....", document.getElementById("closeFormEditManif"));

    //props.callBackAction()
    props.onSubmit(values);
    mostrarResultadoAlta().then(closeModal());
  }

  const [initValuesEdit, setInitValuesEdit] = useState({
    id: props.id,
    clave: props.clave,
    servManif: props.servicio,
    diasManif: props.dias,
    fVisitaManif: props.fVisita,
    insumo: props.salidaInsumo,
    noManif: props.manifiesto,
    plantaManif: props.planta,
    rutaPlantaManif: props.rutaPlanta,
    fInicioManif: props.fechaInicio
  });

  async function mostrarResultadoAlta() {
    console.log(document.getElementById(idToastEditar));
    const myToastEdit = document.getElementById(idToastEditar);
    console.log(Toast.getInstance(myToastEdit));
    Toast.getOrCreateInstance(myToastEdit).show();
  }

  const onChangeDays = async (values, setFieldValue) => {
    console.log("onchange dias: ", values);
    const dias = values.diasManif !== "" ? Number(values.diasManif) : 0;
    if (dias >= 0) {
      console.log(values.fInicioManif);
      const fechaVisita = new Date(values.fInicioManif); //yyyy-MM-dd
      console.log(fechaVisita);
      const moment = require("moment");

      const startdate = moment(fechaVisita).format("yyyy-MM-DD");
      var new_date = moment(startdate, "yyyy-MM-DD").add(dias, "days");
      console.log(new_date);
      setFieldValue("fVisitaManif", moment(new_date).format("yyyy-MM-DD"));
    } else setFieldValue("fVisitaManif", "");
  };

  useEffect(() => {
    console.log(props);
    let manif = props.manifiesto;

    if (props.servicio === "TB") {
      setServicioTB(true);
      manif = props.manifiesto;
    } else {
      setServicioTB(false);
    }
    console.log(props.fechaInicio);
    setInitValuesEdit({
      id: props.id,
      clave: props.clave,
      servManif: props.servicio,
      diasManif: props.dias,
      fVisitaManif: props.fVisita,
      insumo: props.salidaInsumo,
      noManif: manif,
      plantaManif: props.planta,
      rutaPlantaManif: props.rutaPlanta,
      fInicioManif: props.fechaInicio
    });
  }, [props.servicio, props.manifiesto, props.id]);


  useEffect( () =>{
    const insumos = ObtenerInsumos()
  },[])

  return (
    <>
      {loading && <CircleSpiner />}
      <CustomToast
        id={idToastEditar}
        title="Manifiesto Actualizado"
        message="Datos de Viaje actualizados correctamente"
        autohide={"false"}
      />
      <Formik
        initialValues={initValuesEdit}
        validationSchema={schemaEditaManifiestosYdocsVi}
        onSubmit={onSubmitEditarManifesto}
        enableReinitialize
      >
        {(props) => {
          const { isSubmitting, values, setFieldValue } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2" id="formEditManif">
              <div className="flex flex-col w-full gap-2">
                <div className=" grid grid-cols-1 md:grid-cols-3 col-start-2 items-start gap-2 w-full">
                  <InputText
                    label="Clave"
                    name="clave"
                    type="text"
                    placeholder=""
                    disabled
                  />
                  <InputText
                    label="Servicio"
                    name="servManif"
                    type="text"
                    placeholder=""
                    disabled
                  />
                  <InputField
                    label="Dias"
                    name="diasManif"
                    type="number"
                    placeholder=""
                    onKeyDown={(e) => {
                      console.log(e.keyCode);
                      //presiona enter o tab
                      if (e.keyCode === 13 || e.keyCode === 9) {
                        onChangeDays(values, setFieldValue);
                      }
                    }}
                  />
                  <button
                    disabled={isSubmitting}
                    type="button"
                    className="btn-secondary md:hidden m-3"
                    onClick={() => onChangeDays(values, setFieldValue)}
                  >
                    Generar Fecha
                  </button>
                  <InputText
                    label="Fecha de Inicio"
                    name="fInicioManif"
                    type="date"
                    placeholder=""
                    disabled
                  />
                  <InputText
                    label="Fecha Visita"
                    name="fVisitaManif"
                    type="date"
                    placeholder=""
                    disabled
                  />
                  <InputText
                    label="Salida"
                    name="insumo"
                    type="number"
                    placeholder=""
                    disabled
                  />
                  <InputText
                    label="Planta"
                    name="plantaManif"
                    type="number"
                    placeholder=""
                    disabled
                  />
                  <InputText
                    label="Ruta Planta"
                    name="rutaPlantaManif"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    label="Número de Manifiesto"
                    name="noManif"
                    type="number"
                    placeholder=""
                    disabled={!servicioTB}
                  />
                </div>
              </div>
              {/*Modal footer*/}
              <div className="flex flex-shrink-0 flex-wrap items-center justify-end gap-2 rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <div className="w-full grid flex-row md:flex md:flex-row-reverse md:justify-start gap-4">
                  <button
                    id="closeFormEditManif"
                    data-te-modal-dismiss
                    data-te-target={`${idModal ?? "staticBackdrop"}`}
                    disabled={isSubmitting}
                    type="button"
                    className="btn-tertiary"
                  >
                    Agregar Insumo
                  </button>
                  <button
                    id="closeFormEditManif"
                    data-te-modal-dismiss
                    data-te-target={`${idModal ?? "staticBackdrop"}`}
                    disabled={isSubmitting}
                    type="button"
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn-primary"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditarManifiestoForm;
