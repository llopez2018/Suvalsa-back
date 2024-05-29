import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Accordion from "../../../../componentes/Accordion/Accordion";
import { ObtenerRutas } from "../../../../Apis/FetchRutas";
import { ObtenerFamilias } from "../../../../Apis/FetchFamilias";
import { AgregarCostoServicio, ObtenerCostoServicioRutaFamilia, ActualizarCostoServicioRutaFamilia } from "../../../../Apis/FetchCatalogos";

const ActualizacionCostoServicioForm = () => {
    const [formData, setFormData] = useState({
        clave: '',
        familia: '',
        ruta: '',
        precios: {}, // Para los precios de la tabla
        precioUnitario_CSF: '', // Asegúrate de agregar estos si son necesarios
        precioUnitario_MAC: ''
    });
    const [rutas, setRutas] = useState([]);
    const [familias, setFamilias] = useState([]);
    const [rutaSeleccionada, setRutaSeleccionada] = useState('');
    const [familiaSeleccionada, setFamiliaSeleccionada] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        const cargarRutas = async () => {
            const rutasObtenidas = await ObtenerRutas();
            setRutas(rutasObtenidas || []);
        };

        const cargarFamilias = async () => {
            const familiasObtenidas = await ObtenerFamilias();
            setFamilias(familiasObtenidas || []);
        };

        cargarRutas();
        cargarFamilias();
    }, []);


    const obtenerFechaActual = () => {
        const fecha = new Date();
        return fecha.toISOString().slice(0, 10);
    };

    const handleSubmit = async (values) => {
        const precios = {};
        const preciosJson = {
            precioKGC: 90.00,
            precioKGR: 85.00,
            precioKGE: 120.00,
            precioKGT: 50.00,
            precioKGTe: 120.00,
            precioKGTh: 120.00,
            precioKGTt: 120.00,
            precioKGl: 90.00,
            precioUnitario_CSF: 1000.00,
            precioUnitario_MAC: 1000.00
        };

        for (let i = 0; i < 8; i++) {
            const precioKey = `precio-${i}`;
            const precioValue = parseFloat(values[precioKey]);
            const precioJsonKey = Object.keys(preciosJson)[i];
            precios[precioJsonKey] = precioValue;
        }

        const dataToSend = {
            concepto: "Recolección Externa, Transporte, Tratamiento y Disposición Final de Residuos Peligrosos C-R-E-T-Te-Th-Tt-I...",
            frecuencia: "Por Visita Solicitada",
            rpV: 0.00,
            moneda: "M.N.",
            precioUnitario: 1000.00,
            fechaActualizacion: obtenerFechaActual(),
            fechaAlta: obtenerFechaActual(),
            cxSF: 1000.00,
            mac: 1000.00,
            ...values,
            precios: undefined,
            ...precios,
            ruta: values.ruta,
            familia: values.familia,
        };

        try {
            const response = await AgregarCostoServicio(dataToSend);
            console.log(response);
            setShowSuccessAlert(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleBuscarCostos = async () => {
        if (rutaSeleccionada && familiaSeleccionada) {
            try {
                const data = await ObtenerCostoServicioRutaFamilia(rutaSeleccionada, familiaSeleccionada);
                console.log("Costos obtenidos:", data);
                if (data && data.length > 0) {
                    const preciosRespuesta = data[0];
                    setFormData(prevState => ({
                        ...prevState,
                        precios: preciosRespuesta,
                        precioUnitario_CSF: preciosRespuesta.precioUnitario_CSF.toFixed(2),
                        precioUnitario_MAC: preciosRespuesta.precioUnitario_MAC.toFixed(2)
                    }));
                } else {
                    console.warn("No se encontraron costos para la ruta y la familia seleccionadas");
                }
            } catch (error) {
                console.error("Error al obtener costos:", error);
            }
        } else {
            console.warn("Selecciona una ruta y una familia para buscar costos");
        }
    };

    const handleActualizarCostos = async () => {
        const dataToSend = {
            ...formData,
            ruta: rutaSeleccionada,
            familia: familiaSeleccionada,
            fechaActualizacion: obtenerFechaActual()
        };
        console.log("Data a actualizar:", dataToSend);
        try {
            const response = await ActualizarCostoServicioRutaFamilia(dataToSend);
            console.log("Respuesta del servidor al actualizar:", response);
            setShowSuccessAlert(true);
        } catch (error) {
            console.error("Error al actualizar los costos:", error);
        }
    };

    return (
        <>
            {showSuccessAlert && (
                <div className="fixed inset-0 flex items-center justify-center px-4 py-6 pointer-events-none sm:p-6">
                    <div className="max-w-sm w-full bg-green-500 shadow-lg rounded-lg pointer-events-auto">
                        <div className="rounded-lg shadow-xs overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-center">
                                    <p className="flex-1 text-sm font-medium text-white">Costo de Servicio Actualizado exitosamente</p>
                                    <button type="button" className="ml-3 flex-shrink-0 bg-white rounded-md p-1.5 text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setShowSuccessAlert(false)}>
                                        <span className="sr-only">Cerrar</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Formik
                initialValues={formData}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values }) => (
                    <Form className="flex flex-col w-full p-2 gap-2">
                        <Accordion
                            titulo="Actualizacion de Costos Por Servicio"
                            idTarget="collapseCostosPorServicio"
                            expanded="false"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                <div className="w-full">
                                    <label htmlFor="ruta" className="block text-sm font-medium text-gray-700">Ruta</label>
                                    <Field
                                        as="select"
                                        name="ruta"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        onChange={(e) => {
                                            const selectedRuta = e.target.value;
                                            setRutaSeleccionada(selectedRuta);
                                            setFormData(prevState => ({ ...prevState, precios: {} })); // Limpiar precios antiguos al cambiar la selección
                                            console.log("Ruta seleccionada:", selectedRuta);
                                        }}
                                        value={rutaSeleccionada}
                                    >
                                        <option value="">Seleccione una ruta</option>
                                        {rutas.map((ruta, index) => (
                                            <option key={index} value={ruta.clave}>
                                                {`${ruta.clave} | ${ruta.nombre}`}
                                            </option>
                                        ))}
                                    </Field>

                                </div>
                                <div className="w-full">
                                    <label htmlFor="familia" className="block text-sm font-medium text-gray-700">Familia</label>
                                    <Field
                                        as="select"
                                        name="familia"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        onChange={(e) => {
                                            const selectedFamilia = e.target.value;
                                            setFamiliaSeleccionada(selectedFamilia);
                                            console.log("Familia seleccionada:", selectedFamilia);
                                        }}
                                        value={familiaSeleccionada}
                                    >
                                        <option value="">Seleccione una familia</option>
                                        {familias.map((familia, index) => (
                                            <option key={index} value={familia.clave}>
                                                {`${familia.clave} | ${familia.nombre}`}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div>
                                <button type="button" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBuscarCostos}>
                                    Buscar Costos
                                </button>

                            </div>
                            <div>
                                <table className="min-w-full leading-normal mt-4">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Clave
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Residuos Peligrosos
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Precio
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { clave: 'C', residuo: 'Corrosividad', precioKey: 'precioKGC' },
                                            { clave: 'R', residuo: 'Reactividad', precioKey: 'precioKGR' },
                                            { clave: 'E', residuo: 'Explosividad', precioKey: 'precioKGE' },
                                            { clave: 'T', residuo: 'Toxicidad', precioKey: 'precioKGT' },
                                            { clave: 'Te', residuo: 'Toxicidad ambiental', precioKey: 'precioKGTe' },
                                            { clave: 'Th', residuo: 'Toxicidad aguda', precioKey: 'precioKGTh' },
                                            { clave: 'Tt', residuo: 'Toxicidad crónica', precioKey: 'precioKGTt' },
                                            { clave: 'I', residuo: 'Inflamabilidad', precioKey: 'precioKGl' }
                                        ].map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    {item.clave}
                                                </td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    {item.residuo}
                                                </td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <Field type="text" name={item.precioKey} className="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Ingrese precio" value={formData.precios[item.precioKey] || ''} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                                <table className="min-w-full leading-normal mt-4">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                CONCEPTO
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                UNIDAD
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                MONEDA
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                CANTIDAD
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                PRECIO UNITARIO
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { concepto: 'Cargo por servicio falso', unidad: 'Servicio', moneda: 'M.N.', cantidad: '1', name: 'precioUnitario_CSF' },
                                            { concepto: 'Maniobras de acondicionamiento carga', unidad: 'Hora', moneda: 'M.N.', cantidad: '1', name: 'precioUnitario_MAC' },
                                        ].map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{item.concepto}</td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{item.unidad}</td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{item.moneda}</td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{item.cantidad}</td>
                                                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                    <Field type="text" name={item.name} className="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Ingrese precio" value={formData[item.name] || ''} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                            <button type="button" onClick={handleActualizarCostos} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Actualizar Costos
                            </button>
                        </Accordion>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ActualizacionCostoServicioForm;
