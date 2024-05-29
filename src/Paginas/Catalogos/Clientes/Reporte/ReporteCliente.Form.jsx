import React from "react";
import Accordion from "../../../../componentes/Accordion/Accordion";
import { Formik, Form, Field } from "formik";
import { Select as SelectF } from "../../../../componentes/Formik";
import { CustomGenericTable } from "../../../../componentes/Tables/CustomTable";
import CardNavigate from "../../../../componentes/Cards/CardNavigate";
import useRepClientes from "./useRepClientes";
import CircleSpiner from "../../../../componentes/Spinners/CircleSpiner";

const ReporteClienteForm = () => {
    const {
        familias,
        data,
        setData,
        loading,
        getDataFunction,
        columnsData,
        optionsTable
    } = useRepClientes();

    return (
        <Formik initialValues={{ selectedOption: "" }} onSubmit={(values) => {
            console.log("Formulario enviado con valores:", values);
            getDataFunction(values.selectedOption);
        }}>
            {({ setFieldValue }) => (
                <Form>
                    <Accordion titulo="Reporte de Clientes" idTarget="collapseReporteClientes" expanded="false">
                        <div>
                            <label htmlFor="selectedOption">Selecciona una Familia:</label>
                            <Field as={SelectF} name="selectedOption" onChange={(e) => {
                                const selectedOption = e.target.value;
                                setFieldValue("selectedOption", selectedOption);
                                console.log("Opción seleccionada:", selectedOption);
                            }}>
                                <option value="">Seleccione una opción</option>
                                {familias.map((familia, index) => (
                                    <option key={index} value={familia.id}>{familia.nombre}</option>
                                ))}
                            </Field>
                        </div>
                        <button type="submit" className="btn-primary">Buscar Clientes</button>
                    </Accordion>
                    {loading && <CircleSpiner />}
                    {data.length > 0 && (
                        <Accordion>
                            <CardNavigate title="Reporte de Clientes">
                                <CustomGenericTable
                                    columnsData={columnsData}
                                    data={data}
                                    optionsTable={optionsTable}
                                    setData={setData}
                                />
                            </CardNavigate>
                        </Accordion>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default ReporteClienteForm;
