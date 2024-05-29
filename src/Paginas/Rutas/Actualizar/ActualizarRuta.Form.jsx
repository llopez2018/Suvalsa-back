import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Select, Datatable } from "tw-elements";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../componentes/Toasts/CustomToast";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText, InputField, SelectFile } from "../../../componentes/Formik";
import GenericButton, { ButtonGroup } from "../../../componentes/Button/GenericButton";
import useActualizarRuta from "./UseActualizarRuta";
import schemaActualizaRuta from "../Schemas/SchemaActualizarRuta";
import TablaSeleccionable from "../../../componentes/Tables/TablaUse";
import CustomModal from "../../../componentes/Modals/CustomModal";
import useActualizar from "../../../Hooks/UseActualizacion";
import {useCatalogoSelect} from "../../../Hooks/UseCatalogos";
import {
  GetClientes,
} from "../../Catalogos/Clientes/CatClientes";

const ActualizarRutaForm = () => {
  const { dataFounded,
    loading, loadingData, loadClientesRuta, AddData, rutaData, BuscarRuta, setClientesRuta,
    idTableClientesRuta, idTableClientes,
    opcionesTabla, opcionesTablaClientes,
    columnas, colsClientes,
    GetClientesRuta, clientesRuta,
    initValuesAc,
    onSubmitActualizaRuta,
    idToastactualizaRuta,
    idToastDelete,
    idModalClientes,
    idModalRetirarCliente,
    agregarSelectAg,
    agregarSelectNoEco,
    noEco,
    noEco2,
    aux,
    oper
  } = useActualizarRuta();

  const {
    columnsData,
    optionsTable,
    SelectRowAction,
    dataSelected,
    GetRowsData,
    confirmarEliminacion, reloadTable,
    buttonsGroup
  } = useActualizar({
    idToastDelete,
    columnsData: columnas,
    optionsTable: opcionesTabla,
    getData: GetClientesRuta,
    idTable: idTableClientesRuta,
    editTable: true,
    idModalAgregar: idModalClientes,
    idModalDelete: idModalRetirarCliente
  });

    const {
      loading: loadingClientes,
      columnsData: columnsDataClientes,
      optionsTable: OptionsTableAllClientes,
      SelectRowAction: SelectRowActionClientes,
      GetRowsData: GetRowsDataClientes,
      buttonsGroup: ButtonsGroupClientes
    } = useCatalogoSelect({
      columnsData: colsClientes,
      optionsTable: opcionesTablaClientes,
      getData: GetClientes,
      idModal: idModalClientes,
      callBackAction :AddData,
    });

  useEffect(() => {
    const selectOper = document.querySelector("#selectOper");
    if (selectOper) Select.getOrCreateInstance(selectOper);
    const selectAux = document.querySelector("#selectAux");
    if (selectAux) Select.getOrCreateInstance(selectAux);
    const selectVehic1 = document.querySelector("#selectVehic1");
    if (selectVehic1) Select.getOrCreateInstance(selectVehic1);
    const selectVehic2 = document.querySelector("#selectVehic2");
    if (selectVehic2) Select.getOrCreateInstance(selectVehic2);

    
    const myDatatableEl = document.getElementById(idTableClientes);
    const instance = Datatable.getOrCreateInstance(myDatatableEl)
      const search = async(value) => {
        try {
          const [phrase] = value.split(" in:").map((str) => str.trim());
          await instance.search(phrase, "nombre");
        } catch (error) {
          console.error("e:", error);
        }
      };

    document.getElementById("advanced-search-input")
    .addEventListener("input", (e) => {
      search(e.target.value);
    });
  }, []);
  
  useEffect( () => {
    console.log('<<<<< clientesRuta UseEffect >>>>>', clientesRuta)
    if(clientesRuta){
      reloadTable();
    }
  },[clientesRuta])

  const onChangeClave = async(values, setFieldValue)=>{
    console.log("onchange Clave: ", values)
    const data = await BuscarRuta(values.clave)
    console.log('data::::',data)
    setFieldValue('nombre', data.nombre)
    setFieldValue('duracion', data.duracion)
    setFieldValue('oper', data.oper)
    setFieldValue('aux', data.aux)
    setFieldValue('noEco1', data.vehiculo1)
  }

  return (
    <>
      { (loading || loadingData) && <CircleSpiner />}
      <CustomToast
        id={idToastactualizaRuta}
        title="Ruta Actualizada"
        message="Datos de la Ruta y Clientes agregados correctamente"
      />
      <CustomToast
        id={idToastDelete}
        title="Cliente retirado"
        message={`Cliente ${dataSelected} fue retirado de la lista correctamente`}
      />
      <Formik
        initialValues={initValuesAc}
        validationSchema={schemaActualizaRuta}
        onSubmit={onSubmitActualizaRuta}
        validateOnChange={true}
        enableReinitialize
      >
        {(props) => {
          const { isSubmitting, values, handleChange, setFieldTouched, setTouched, setFieldValue} = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos de la ruta"
                idTarget="collapseRutaDForm"
                expanded="true"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <InputField
                    disabled={isSubmitting || loadingData}
                    label="Clave"
                    name="clave"
                    type="text"
                    placeholder=""
                    onChange={e => {
                      handleChange(e)
                      console.log('handleChange(e)')
                    }}
                    onKeyDown={(e)=>{
                      console.log(e.keyCode)
                      //presiona enter o tab
                      if(e.keyCode === 13 || e.keyCode === 9){
                        onChangeClave(values, setFieldValue);
                      }
                    }
                    }
                    onBlur={ ()=>{
                      console.log('test lost focus')
                    }}
                  />
                  <div className="md:hidden w-auto col-span-1 pt-2">
                    <GenericButton
                      action= {async() => {
                        const data = await BuscarRuta(values.clave)
                        console.log('data::::',data)
                        setFieldValue('nombre', data.nombre)
                        setFieldValue('duracion', data.duracion)
                        setFieldValue('oper', data.oper)
                        setFieldValue('aux', data.aux)
                        setFieldValue('noEco1', data.vehiculo1)
                      }}
                      class="md:hidden flex btn-secondary w-full justify-center"
                      disabled={isSubmitting || loadingData }
                      type= "button"
                      label= "Buscar ruta"
                    />
                  </div>
                  <InputText
                    disabled={isSubmitting || loadingData || !dataFounded}
                    label="Nombre"
                    name="nombre"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting || loadingData || !dataFounded}
                    label="Duración"
                    name="duracion"
                    type="number"
                    placeholder=""
                  />
                  <div className="hidden md:block w-auto col-span-1 pt-2">

                  </div>
                  <SelectFile
                    id="selectOper"
                    disabled={isSubmitting || loadingData || !dataFounded}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="Operador"
                    name="oper"
                  >
                    <option hidden defaultValue value=""></option>
                    {agregarSelectAg("OPE", rutaData?.oper)}
                  </SelectFile>

                  <InputText
                    value={oper}
                    disabled={true}
                    label="Operador"
                    name="operador"
                    type="text"
                    placeholder=""
                  />
                  <SelectFile
                    id="selectAux"
                    disabled={isSubmitting || loadingData || !dataFounded}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="Auxiliar"
                    name="aux"
                  >
                    <option hidden defaultValue value=""></option>
                    {agregarSelectAg("AUX", rutaData?.aux)}
                  </SelectFile>
                  <InputText
                    value={aux}
                    disabled={true}
                    label="Auxiliar"
                    name="auxiliar"
                    type="text"
                    placeholder=""
                  />
                  <SelectFile
                    id="selectVehic1"
                    disabled={isSubmitting || loadingData || !dataFounded}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="No.Eco. 1"
                    name="noEco1"
                  >
                    <option hidden defaultValue value=""></option>
                    {agregarSelectNoEco()}
                  </SelectFile>
                  <InputText
                    value={noEco}
                    disabled={true}
                    label="Vehículo 1"
                    name="vehiculo1"
                    type="text"
                    placeholder=""
                  />
                  <SelectFile
                    id="selectVehic2"
                    disabled={isSubmitting || loadingData || !dataFounded}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="No.Eco. 2"
                    name="noEco2"
                  >
                    <option hidden defaultValue value=""></option>
                    {agregarSelectNoEco()}
                  </SelectFile>
                  <InputText
                    value={noEco2}
                    disabled={true}
                    label="Vehículo 2"
                    name="vehiculo2"
                    type="text"
                    placeholder=""
                  />
                </div>
              </Accordion>
              <Accordion
                titulo={`Clientes en la Ruta ${rutaData?.clave ?? ''}`}
                idTarget="collapseClientesRutaDForm"
                expanded="true"
              >
                <div className="flex flex-col w-full gap-2">
                  <TablaSeleccionable
                    id={idTableClientesRuta}
                    invokeGetDataFunction={GetRowsData}
                    columnsData={columnsData}
                    options={optionsTable}
                    selectActionLsnr={SelectRowAction}
                    editable={true}
                  />
                </div>
                <CustomModal
                  id={idModalClientes}
                  title={"Agregar Cliente"}
                  buttonsGroup={ButtonsGroupClientes}
                >
                  <span className="w-full flex text-left">Seleciona un cliente de la lista y posteriormente da clic en en botón AGREGAR para enviarlo a la lista de clientes por ruta.</span>
                  <InputText
                    id="advanced-search-input"
                    label="Buscar por Nombre"
                    name="itBuscar"
                    type="Search"
                    placeholder=""
                  />
                  <div className="flex flex-col w-full gap-2">
                    <TablaSeleccionable
                      id={idTableClientes}
                      invokeGetDataFunction={GetRowsDataClientes}
                      columnsData={columnsDataClientes}
                      options={OptionsTableAllClientes}
                      selectActionLsnr={SelectRowActionClientes}
                    />
                  </div>
                </CustomModal>
                <CustomModal
                  id={idModalRetirarCliente}
                  title={"Retirar Cliente de la Ruta"}
                  actionAccept= {confirmarEliminacion}
                >
                  <span>¿Deseas retirar el cliente con la</span>
                  <h1>
                    clave {dataSelected} de la ruta {values.clave}?
                  </h1>
                </CustomModal>
              </Accordion>
              <ButtonGroup
                buttonPrimary={buttonsGroup.buttonPrimary}
                buttonSecondary={buttonsGroup.buttonSecondary}
                buttonTertiary={buttonsGroup.buttonTertiary}
                buttonCuatriary={buttonsGroup.buttonCuatriary}
                buttonQuintuary={buttonsGroup.buttonQuintuary}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ActualizarRutaForm;
