import React, { useState } from "react";
import { Formik, Form } from "formik";
import Accordion from "../../../../componentes/Accordion/Accordion";
import { InputText } from "../../../../componentes/Formik";
import { BuscarClientePorClave, ActualizarCliente } from "../../../../Apis/FetchClientes";

const ActualizarClienteForm = () => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const initialValues = {
        clave: '',
        unidadnegocio: '',
        fnombre: '',
        tiposociedad: '',
        regimenfiscal: '',
        usocfdi: '',
        correoelectronico: '',
        segundocorreoelectronico: '',
        ruta: '',
        orden: '',
        aalta: '',
        condspago: '',
        rfc: '',
        revision: '',
        pago: '',
        status: '',
        registro: '',
        contratos: '',
        conts: '',
        paqinsm: '',
        replegal: '',
        nombre: '',
        numerocta: '',
        mtdopago: '',
        calle: '',
        colonia: '',
        ciudad: '',
        estado: '',
        cp: '',
        entreqcalles: '',
        telefono: '',
        contacto: ''
    };

    const handleKeyDown = async (e, setFieldValue, values) => {
        if (e.key === 'Tab' && e.target.name === "clave") {
            const clave = e.target.value;
            const response = await BuscarClientePorClave(clave);
            if (response) {
                Object.entries(response).forEach(([key, value]) => {
                    setFieldValue(key, value || '');
                });
            }
        }
    };

    return (
        <>
            {showSuccessAlert && (
                <div className="fixed top-0 inset-x-0 flex items-center justify-center px-4 py-6 pointer-events-none sm:p-6">
                    <div className="max-w-sm w-full bg-green-500 shadow-lg rounded-lg pointer-events-auto">
                        <div className="rounded-lg shadow-xs overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-center">
                                    <p className="flex-1 text-sm font-medium text-white">Cliente actualizado correctamente</p>
                                    <button
                                        type="button"
                                        className="ml-3 flex-shrink-0 bg-white rounded-md p-1.5 text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => setShowSuccessAlert(false)}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    const updatedValues = {
                        unidadnegocio: values.unidadnegocio,
                        fnombre: values.fnombre,
                        tiposociedad: values.tiposociedad,
                        regimenfiscal: values.regimenfiscal,
                        usocfdi: values.usocfdi,
                        correoelectronico: values.correoelectronico,
                        segundocorreoelectronico: values.segundocorreoelectronico,
                        ruta: values.ruta,
                        orden: values.orden,
                        aalta: values.aalta,
                        condspago: values.condspago,
                        rfc: values.rfc,
                        revision: values.revision,
                        pago: values.pago,
                        status: values.status,
                        registro: values.registro,
                        conts: values.conts ? parseInt(values.conts, 10) : null,
                        paqinsm: values.paqinsm,
                        replegal: values.replegal,
                        nombre: values.nombre,
                        numerocta: values.numerocta,
                        mtdopago: values.mtdopago,
                        calle: values.calle,
                        colonia: values.colonia,
                        ciudad: values.ciudad,
                        estado: values.estado,
                        cp: values.cp,
                        entreqcalles: values.entreqcalles,
                        telefono: values.telefono,
                        contacto: values.contacto
                    };

                    try {
                        const response = await ActualizarCliente(values.clave, updatedValues);
                        if (response.status === 200) {
                            console.log('Datos actualizados:', response);
                            setTimeout(() => setShowSuccessAlert(false), 5000); // Ocultar la alerta después de 5 segundos
                        } else {
                            console.error('Error al actualizar datos:', response);
                        }
                    } catch (error) {
                        console.error('Error al actualizar datos:', error);
                    }
                    setShowSuccessAlert(true);

                }}
            >
                {({ setFieldValue, values }) => (
                    <Form className="flex flex-col w-full p-2 gap-2">
                        <Accordion
                            titulo="Datos del Cliente"
                            idTarget="datosCliente"
                            expanded="true"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
                                <InputText
                                    label="Clave"
                                    name="clave"
                                    type="text"
                                    onKeyDown={(e) => handleKeyDown(e, setFieldValue, values)}
                                />
                                <InputText
                                    label="Unidad de Negocio"
                                    name="unidadnegocio"
                                    type="text"
                                />
                                <InputText
                                    label="Nombre del Cliente"
                                    name="fnombre"
                                    type="text"
                                />
                                <InputText
                                    label="Tipo de Sociedad"
                                    name="tiposociedad"
                                    type="text"
                                />
                                <InputText
                                    label="Regimen Fiscal"
                                    name="regimenfiscal"
                                    type="text"
                                />
                                <InputText
                                    label="Uso de CFDI"
                                    name="usocfdi"
                                    type="text"
                                />
                                <InputText
                                    label="Correo Electrónico"
                                    name="correoelectronico"
                                    type="email"
                                />
                                <InputText
                                    label="Correo Electrónico Secundario"
                                    name="segundocorreoelectronico"
                                    type="email"
                                />
                                <InputText
                                    label="Ruta"
                                    name="ruta"
                                    type="text"
                                />
                                <InputText
                                    label="Orden"
                                    name="orden"
                                    type="text"
                                />
                                <InputText
                                    label="Año de Alta"
                                    name="aalta"
                                    type="text"
                                />
                                <InputText
                                    label="Condición de Pago"
                                    name="condspago"
                                    type="text"
                                />
                                <InputText
                                    label="RFC"
                                    name="rfc"
                                    type="text"
                                />
                                <InputText
                                    label="Revisión de Facturas"
                                    name="revision"
                                    type="text"
                                />
                                <InputText
                                    label="Pago de Facturas"
                                    name="pago"
                                    type="text"
                                />
                                <InputText
                                    label="Status"
                                    name="status"
                                    type="text"
                                />
                                <InputText
                                    label="Registro INE"
                                    name="registro"
                                    type="text"
                                />
                                <InputText
                                    label="Contratos"
                                    name="contratos"
                                    type="text"
                                />
                                <InputText
                                    label="No. Cons"
                                    name="conts"
                                    type="text"
                                />
                                <InputText
                                    label="Paquete de Insumos"
                                    name="paqinsm"
                                    type="text"
                                />
                            </div>
                        </Accordion>

                        <Accordion
                            titulo="Dirección para Recolección"
                            idTarget="direccionRecoleccion"
                            expanded="false"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
                                <InputText
                                    label="Re. Legal"
                                    name="replegal"
                                    type="text"
                                />
                                <InputText
                                    label="Nombre/Razon Social"
                                    name="nombre"
                                    type="text"
                                />
                                <InputText
                                    label="No. Cuenta"
                                    name="numerocta"
                                    type="text"
                                />
                                <InputText
                                    label="Método de Pago"
                                    name="mtdopago"
                                    type="text"
                                />
                                <InputText
                                    label="Calle"
                                    name="calle"
                                    type="text"
                                />
                                <InputText
                                    label="Colonia"
                                    name="colonia"
                                    type="text"
                                />
                                <InputText
                                    label="Ciudad"
                                    name="ciudad"
                                    type="text"
                                />
                                <InputText
                                    label="Estado"
                                    name="estado"
                                    type="text"
                                />
                                <InputText
                                    label="C.P."
                                    name="cp"
                                    type="text"
                                />
                                <InputText
                                    label="Entre Calles"
                                    name="entreqcalles"
                                    type="text"
                                />
                                <InputText
                                    label="Teléfono"
                                    name="telefono"
                                    type="text"
                                />
                                <InputText
                                    label="Contacto"
                                    name="contacto"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <button
                                    className="btn-primary mt-4 w-full md:w-1/6 mx-auto md:mx-0 center md:justify-end"
                                    type="submit"
                                >
                                    Actualizar Cliente
                                </button>
                            </div>
                        </Accordion>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ActualizarClienteForm;
