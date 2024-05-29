import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  InputText,
  Select as SelectF,
  CheckBox
} from "../../../../componentes/Formik";
import schemaDatos from "./Schemas/SchemaAltaCliente";
import Accordion from "../../../../componentes/Accordion/Accordion";
import { ButtonGroup } from "../../../../componentes/Button/GenericButton";
import { ObtenerFamilias } from "../../../../Apis/FetchFamilias";
import useAlta from "../../../../Hooks/UseAltas";
import {
  idToastalta,
  initValuesAdd,
  CrearCliente,
  urlCatalogo, agSelectOptFam, agSelectOptAgent, agSelectOptFrec, agSelectOptServ,
} from "./AltaCliente";
import { useLocation } from "react-router-dom";
import CircleSpiner from "../../../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../../../componentes/Toasts/CustomToast";
import {
  ObtenerAgentes,
  ObtenerFrecuencias
} from "../../../../Apis/FetchCatalogos";
// Initialization for ES Users
import { Select } from "tw-elements";
import { ObtenerServicios } from "../../../../Apis/FetchServicios";

const AltaClienteForm = () => {
  const location = useLocation();

  // get urlBack
  let urlBack;
  if (location.state) {
    urlBack = location.state.urlBack;
  }

  const { loading, onSubmitAlta, buttonsGroup } = useAlta({
    idToastalta,
    addData: CrearCliente,
    backUrl: urlBack ?? urlCatalogo
  });

  const [gettingData, setGettingData] = useState(false)
  const [familias, setFamilias] = useState([]);
  const [agentes, setAgentes] = useState([]);
  const [servs, setServs] = useState([]);
  const [frecs, setFrecs] = useState([]);

  useEffect(() => {
    console.log("Onteniendo lista de familias::: ");
    async function listarFamilias() {
      setGettingData(true)
      const listaFam = await ObtenerFamilias();
      console.log("listaFam ", listaFam);
      setFamilias(listaFam);
      setGettingData(false)
    }

    if (familias !== null && familias.length === 0) listarFamilias();

  }, [familias]);

  useEffect(() => {
    console.log("Onteniendo lista de Agentes::: ");
    async function listarAgentes() {
      setGettingData(true)
      const listaAgent = await ObtenerAgentes();
      console.log("listaAgent ", listaAgent);
      setAgentes(listaAgent);
      setGettingData(false)
    }

    if (agentes !== null && agentes.length === 0) listarAgentes();
  }, [agentes]);

  useEffect(() => {
    console.log("Onteniendo lista de Frecuencias::: ");
    async function listarFrecs() {
      setGettingData(true)
      const listaFrec = await ObtenerFrecuencias();
      console.log("listaAFrec ", listaFrec);
      setFrecs(listaFrec);
      setGettingData(false)
    }

    if (frecs !== null && frecs.length === 0) listarFrecs();
  }, [frecs]);

  async function loadServicios() {
    return [
      {
        "id": 4,
        "clave_semarnat": "CB",
        "name_semarnat": "Completo biologico"
      },
      {
        "id": 5,
        "clave_semarnat": "TB",
        "name_semarnat": "Transporte Biologico"
      },
      {
        "id": 6,
        "clave_semarnat": "TS",
        "name_semarnat": "Transporte Urbano"
      },
      {
        "id": 7,
        "clave_semarnat": "CI",
        "name_semarnat": "Completo Industrial"
      }
      , {
        "id": 1,
        "clave_semarnat": "TI",
        "name_semarnat": "Transportista Industrial"
      }
    ]
  }
  useEffect(() => {
    console.log("Onteniendo lista de Servicios::: ");
    async function listarServicios() {
      setGettingData(true)
      const listaServ = await loadServicios()//ObtenerServicios();
      console.log("listaServ ", listaServ);
      setServs(listaServ);
      setGettingData(false)
    }

    if (servs !== null && servs.length === 0) listarServicios();
  }, [servs]);

  useEffect(() => {
    console.log("Setting Selects::: ");

    const singleSelect = document.querySelector("#selectFam");
    if (singleSelect) Select.getOrCreateInstance(singleSelect);
    const selectFrec = document.querySelector("#selectFrec");
    if (selectFrec) Select.getOrCreateInstance(selectFrec);
    const selectServ = document.querySelector("#selectServ");
    if (selectServ) Select.getOrCreateInstance(selectServ);
    const selectCobif = document.querySelector("#selectCobif");
    if (selectCobif) Select.getOrCreateInstance(selectCobif);
    const selectCobii = document.querySelector("#selectCobii");
    if (selectCobii) Select.getOrCreateInstance(selectCobii);
    const selectCobiv = document.querySelector("#selectCobiv");
    if (selectCobiv) Select.getOrCreateInstance(selectCobiv);
    const selectCom1 = document.querySelector("#selectCom1");
    if (selectCom1) Select.getOrCreateInstance(selectCom1);
    const selectCom2 = document.querySelector("#selectCom2");
    if (selectCom2) Select.getOrCreateInstance(selectCom2);
  }, []);

  return (
    <>
      {(gettingData || loading) && <CircleSpiner />}
      <CustomToast
        id={idToastalta}
        title="Cliente Agregado"
        message="Cliente agregado correctamente"
      />
      <Formik
        initialValues={initValuesAdd}
        validationSchema={schemaDatos}
        onSubmit={onSubmitAlta}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Cliente"
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
                  <SelectF
                    id="selectFam"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="Familia"
                    name="familia"
                  >
                    <option hidden defaultValue value=""></option>
                    {agSelectOptFam(familias)}
                  </SelectF>
                  <InputText
                    disabled={isSubmitting}
                    label="Unidad de negocio"
                    name="uNegocio"
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
                    label="Tipo de Sociedad"
                    name="tipoSociedad"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Régimen Fiscal"
                    name="regFiscal"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Uso de CFDI"
                    name="usoCfdi"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Correo Electrónico"
                    name="correoE"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Segundo Correo E."
                    name="correoE2"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Ruta"
                    name="ruta"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Orden"
                    name="orden"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Año Alta"
                    name="anioAlta"
                    type="text"
                    placeholder=""
                  />
                  <SelectF
                    id="selectFrec"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label="Frec."
                    name="frec"
                  >
                    <option hidden defaultValue value=""></option>
                    {agSelectOptFrec(frecs)}
                  </SelectF>
                  <InputText
                    disabled={isSubmitting}
                    label="Condición Pago"
                    name="condPago"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="RFC"
                    name="rfc"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Revisión Facturas"
                    name="revFacturas"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Pago de Facturas"
                    name="pagoFacturas"
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
                  <InputText
                    disabled={isSubmitting}
                    label="Registro INE"
                    name="regIne"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Contratos"
                    name="contratos"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Inicio"
                    name="inicio"
                    type="date"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Terminación"
                    name="terminacion"
                    type="date"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="No.Cons"
                    name="noCons"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Paq.Insm"
                    name="paqInsm"
                    type="text"
                    placeholder=""
                  />
                </div>
              </Accordion>

              <Accordion
                titulo="Dirección para Recolección"
                idTarget="collapseOne2"
                expanded="false"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <SelectF
                      id="selectServ"
                      disabled={isSubmitting}
                      className="pt-[0.1235rem]"
                      data-te-select-init
                      label="Servicio"
                      name="servicio"
                    >
                      <option hidden defaultValue value=""></option>
                      {agSelectOptServ(servs)}
                    </SelectF>
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="Ref. Bancaria"
                      name="refBancaria"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="Calle"
                      name="calle"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="Colonia"
                      name="colonia"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="Ciudad"
                      name="ciudad"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="Estado"
                      name="estado"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="CP"
                      name="cp"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="Clave Estado (INE)"
                      name="claveEstadoINE"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="Tel."
                      name="tel"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full md:w-auto col-span-1 pt-2">
                    <InputText
                      disabled={isSubmitting}
                      label="Contacto"
                      name="contacto"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>
              </Accordion>

              <Accordion
                titulo="Dirección para Facturación"
                idTarget="collapseOne3"
                expanded="false"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <InputText
                    disabled={isSubmitting}
                    label="Rep. Legal"
                    name="repLegal"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Nombre/Razón Social"
                    name="nombreFactura"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Número de cuenta"
                    name="noCuenta"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Método de pago"
                    name="metodoPago"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Calle"
                    name="calleFactura"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Colonia"
                    name="coloniaFactura"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Ciudad"
                    name="ciudadFactura"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Estado"
                    name="estadoFactura"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="CP"
                    name="cpFactura"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Entre que Calles"
                    name="entreCalles"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Tel."
                    name="telFactura"
                    type="text"
                    placeholder=""
                  />
                  <InputText
                    disabled={isSubmitting}
                    label="Contacto"
                    name="contactoFactura"
                    type="text"
                    placeholder=""
                  />
                </div>
              </Accordion>

              <Accordion
                titulo="Forma de Cobro"
                idTarget="collapseOne4"
                expanded="false"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <span />
                  <span>Familiar</span>
                  <span>Individual</span>
                  <span>Por Viaje</span>
                  <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                    Couta Fija
                  </label>
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="cfFamiliar"
                    type="number"
                    placeholder="0.00"
                  />
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="cfIndividual"
                    type="number"
                    placeholder="0.00"
                  />
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="cfPorViaje"
                    type="number"
                    placeholder="0.00"
                  />

                  <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                    Kgs. Incluidos
                  </label>
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="kgsiFamiliar"
                    type="number"
                    placeholder="0.00"
                  />
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="kgsiIndividual"
                    type="number"
                    placeholder="0.00"
                  />
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="kgsiPorViaje"
                    type="number"
                    placeholder="0.00"
                  />
                  <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                    Costo Kg Excedente
                  </label>
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="costokgeFamiliar"
                    type="number"
                    placeholder="0.00"
                  />
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="costokgeIndividual"
                    type="number"
                    placeholder="0.00"
                  />
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="costokgePorViaje"
                    type="number"
                    placeholder="0.00"
                  />
                  <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                    Cobrar Insumos?
                  </label>
                  <SelectF
                    id="selectCobif"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label=""
                    name="cobrariFamiliar"
                  >
                    <option hidden defaultValue value=""></option>
                    <option value="S">SI</option>
                    <option value="N">NO</option>
                    <option value="*">*</option>
                  </SelectF>
                  <SelectF
                    id="selectCobii"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label=""
                    name="cobrariIndividual"
                  >
                    <option hidden defaultValue value=""></option>
                    <option value="S">SI</option>
                    <option value="N">NO</option>
                    <option value="*">*</option>
                  </SelectF>
                  <SelectF
                    id="selectCobiv"
                    disabled={isSubmitting}
                    className="pt-[0.1235rem]"
                    data-te-select-init
                    label=""
                    name="cobrariPorViaje"
                  >
                    <option hidden defaultValue value=""></option>
                    <option value="S">SI</option>
                    <option value="N">NO</option>
                    <option value="*">*</option>
                  </SelectF>

                  <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                    Otros Conceptos
                  </label>
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="otroscFamiliar"
                    type="number"
                    placeholder="0.00"
                  />
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="otroscIndividual"
                    type="number"
                    placeholder="0.00"
                  />
                  <InputText
                    disabled={isSubmitting}
                    label=""
                    name="otroscPorViaje"
                    type="number"
                    placeholder="0.00"
                  />
                </div>
              </Accordion>

              <div className=" grid grid-cols-1 md:grid-cols-2 col-start-2 items-start gap-2 w-full">
                <Accordion
                  titulo="Comisiones"
                  idTarget="collapseOne5"
                  expanded="false"
                >
                  <div className=" grid grid-cols-2 md:grid-cols-3 col-start-2 items-end gap-2 w-full">
                    <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                      Agente 1
                    </label>
                    <div className="md:col-span-2">
                      <SelectF
                        id="selectCom1"
                        disabled={isSubmitting}
                        className="pt-[0.1235rem]"
                        data-te-select-init
                        label=""
                        name="agente1Comision"
                      >
                        <option hidden defaultValue value=""></option>
                        {agSelectOptAgent(agentes)}
                      </SelectF>
                    </div>
                    <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                      Cantidad
                    </label>
                    <div className="md:col-span-2">
                      <InputText
                        disabled={isSubmitting}
                        label=""
                        name="cantidad1Comision"
                        type="number"
                        placeholder="0.0"
                      />
                    </div>
                    <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                      Agente 2
                    </label>
                    <div className="md:col-span-2">
                      <SelectF
                        id="selectCom2"
                        disabled={isSubmitting}
                        className="pt-[0.1235rem]"
                        data-te-select-init
                        label=""
                        name="agente2Comision"
                      >
                        <option hidden defaultValue value=""></option>
                        {agSelectOptAgent(agentes)}
                      </SelectF>
                    </div>
                    <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                      Cantidad
                    </label>
                    <div className="md:col-span-2">
                      <InputText
                        disabled={isSubmitting}
                        label=""
                        name="cantidad2Comision"
                        type="number"
                        placeholder="0.0"
                      />
                    </div>
                  </div>
                </Accordion>
                <Accordion
                  titulo="RUPA"
                  idTarget="collapseOne6"
                  expanded="false"
                >
                  <div className=" grid grid-cols-2 md:grid-cols-3 col-start-2 items-end gap-2 w-full">
                    <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                      Horario
                    </label>
                    <div className="md:col-span-2">
                      <InputText
                        disabled={isSubmitting}
                        label=""
                        name="horarioRupa"
                        type="text"
                        placeholder=""
                      />
                    </div>

                    <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                      Clave
                    </label>
                    <div className="md:col-span-2">
                      <InputText
                        disabled={isSubmitting}
                        label=""
                        name="claveRupa"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <label className="flex h-full w-full select-none text-sm font-normal justify-end items-end pb-2">
                      Nombre
                    </label>
                    <div className="md:col-span-2">
                      <InputText
                        disabled={isSubmitting}
                        label=""
                        name="nombreRupa"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                </Accordion>
              </div>
              <div className="flex justify-end pt-2 w-full">
                <CheckBox name="niCoa">No incluir en COA</CheckBox>
              </div>

              <ButtonGroup
                buttonPrimary={buttonsGroup.buttonPrimary}
                buttonSecondary={buttonsGroup.buttonSecondary}
                buttonTertiary={buttonsGroup.buttonPrintContract}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AltaClienteForm;
