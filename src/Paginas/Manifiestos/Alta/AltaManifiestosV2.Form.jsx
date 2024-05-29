import React, { useMemo, useRef, useState } from "react";
import useManifiestos, { reloadClientesManif } from "./useManifiestos";
import AltaManifiestosTable from "./AltaManifiestos.table";
import Accordion from "../../../componentes/Accordion/Accordion";
import { InputText } from "../../../componentes/Formik";
import { Form, Formik } from "formik";
import schemaAltaManifiestosYdocsVi from "../Schemas/SchemaAltaManifiestos";
import CircleSpiner from "../../../componentes/Spinners/CircleSpiner";

const AltaManifiestosV2 = () => {
  const [loadingPage, setLoadingPage] = useState(false);
  const {
    getDataFunction,
    BuscarRuta,
    loadingData,
    data,
    setData,
    addSalida,
    onSubmitAltaManifestos
  } = useManifiestos();

  const [clave, setClave] = useState();
  let fInicio = useRef("");

  const initValuesAdd = {
    ruta: "",
    nombre: "",
    dias: "",
    fInicio: "",
    oper: "",
    aux: "",
    noEco: "",
    operador: "",
    auxiliar: "",
    vehiculo: ""
  };

  // const resetStates = () => {
  //   setFInicio("");
  //   setDias("");
  //   setGenManifiestos(false)
  // };

  // const columnMinSize = 50;
  // const columnMaxSize = 450;
  const columnSize = 250;

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableColumnFilter: false
        //footer: props => props.column.id,
        //sortDescFirst: false, //sort by order in ascending order first (default is descending for number columns)
      },
      {
        accessorKey: "clave",
        header: "Clave",
        enableColumnFilter: true,
        filterFn: "includesString", //note: normal non-fuzzy filter column - case insensitive
        //filterFn: 'customFilter', //using our custom function filter
        //filterFn: "fuseFilterFn"
        //footer: props => props.column.id,
        size: 50, //set column size for this column
        enableSorting: true
      },
      {
        accessorKey: "ciudad",
        header: "Ciudad",
        enableColumnFilter: false,
        enableSorting: false,
        //footer: props => props.column.id,
        size: 100 //set column size for this column
      },
      {
        accessorKey: "familia",
        header: "Familia",
        enableColumnFilter: false,
        enableSorting: false
        //footer: props => props.column.id,
      },
      {
        accessorKey: "nombre",
        header: "Nombre",
        enableColumnFilter: false,
        size: columnSize, //set column size for this column
        enableSorting: false
        //footer: props => props.column.id,
      },
      {
        accessorKey: "ruta",
        header: "Ruta",
        enableColumnFilter: false,
        enableSorting: false,
        size: 100 //set column size for this column
        //footer: props => props.column.id,
      },
      {
        accessorKey: "orden",
        header: "Orden",
        enableColumnFilter: false,
        //footer: props => props.column.id,
        enableSorting: false,
        size: 100 //set column size for this column
      },
      {
        accessorKey: "servicio",
        header: "Servicio",
        enableColumnFilter: false,
        enableSorting: false,
        size: 100 //set column size for this column
        //footer: props => props.column.id,
      },
      {
        accessorKey: "dias",
        header: "Dias",
        enableColumnFilter: false,
        enableSorting: false,
        //footer: props => props.column.id,
        size: 50 //set column size for this column
      },
      {
        accessorKey: "fvisita",
        header: "Fecha visita",
        enableColumnFilter: false,
        enableSorting: false,
        //footer: props => props.column.id,
        size: 100 //set column size for this column
      },
      {
        accessorKey: "salida",
        header: "Salida",
        enableColumnFilter: false,
        enableSorting: false,
        //footer: props => props.column.id,
        size: 100 //set column size for this column
      },
      {
        accessorKey: "manifiesto",
        header: "Manifiesto",
        enableColumnFilter: false,
        enableSorting: false,
        //footer: props => props.column.id,
        size: 100 //set column size for this column
      },
      {
        accessorKey: "planta",
        header: "Planta",
        enableColumnFilter: false,
        enableSorting: false,
        //footer: props => props.column.id,
        size: 100 //set column size for this column
      },
      {
        accessorKey: "rutaplanta",
        header: "Rutaplanta",
        enableColumnFilter: false,
        enableSorting: false
        //footer: props => props.column.id,
      }
    ],
    []
  );

  const onChangeClave = async (clave, values, setFieldValue) => {
    console.log("onchange Clave: ", values);
    setLoadingPage(true);
    if (clave && clave !== "") {
      const data = await BuscarRuta(clave);
      console.log("data::::", data);
      setFieldValue("nombre", data.nombre);
      setFieldValue("dias", data.duracion);
      //setDias(data.duracion);
      setFieldValue("oper", data.oper);
      setFieldValue("operador", data.operador);
      setFieldValue("aux", data.aux);
      setFieldValue("auxiliar", data.auxiliar);
      setFieldValue("noEco", data.noEco);
      setFieldValue("vehiculo", data.vehiculo);

      if (fInicio.current !== "") getDataFunction(clave);
      else {
        setData([]);
      }
    } else {
      setData([]);
    }

    setClave(clave);
    setLoadingPage(false);
  };

  return (
    <>
      {(loadingData || loadingPage) && <CircleSpiner />}
      {/* <input
        type="text"
        placeholder="Buscar por clave"
        aria-label="clave"
        name="clave"
        onChange={async (e) => {
          setColumnFilters([
            {
              id: "clave",
              value: e.target.value
            }
          ]);
        }}
      /> */}
      <Formik
        initialValues={initValuesAdd}
        validationSchema={schemaAltaManifiestosYdocsVi}
        onSubmit={onSubmitAltaManifestos}
      >
        {(props) => {
          const { isSubmitting, values, setFieldValue, handleChange } = props;
          return (
            <Form className="flex flex-col w-full p-2 gap-2">
              <Accordion
                titulo="Datos del Viaje"
                idTarget="collapseManifDocsVForm"
                expanded="true"
              >
                <div className=" grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                  <InputText
                    disabled={loadingData || isSubmitting}
                    label="Clave"
                    name="clave"
                    type="text"
                    placeholder=""
                    onChange={async (e) => {
                      handleChange(e);
                      await onChangeClave(
                        e.target.value,
                        values,
                        setFieldValue
                      );
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
                    disabled={loadingData}
                    label="Fecha de Inicio"
                    type="date"
                    placeholder=""
                    name="fInicio"
                    onChange={async (e) => {
                      fInicio.current = e.target.value;
                      handleChange(e);
                      if (data.length > 0) {
                        const newData = await reloadClientesManif(
                          data,
                          e.target.value
                        );
                        setData(newData);
                      } else if (clave && clave !== "")
                        await getDataFunction(clave);
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
                </div>
              </Accordion>
              <Accordion
                titulo={`Manifiestos en la Ruta ${clave ?? ""}`}
                idTarget="collapseClientesManifForm"
                expanded={data.length > 0 ? "true" : "false"}
                disabled={data.length <= 0}
              >
                <div className="flex flex-col w-full gap-2">
                  <AltaManifiestosTable
                    clave={clave}
                    fInicio={fInicio}
                    columnsData={columns}
                    data={data}
                    setData={setData}
                    getData={getDataFunction}
                    actionEditRow={addSalida}
                  />
                </div>
              </Accordion>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AltaManifiestosV2;
