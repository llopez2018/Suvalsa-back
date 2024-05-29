import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { InputText } from "../../../../componentes/Formik";
import Accordion from "../../../../componentes/Accordion/Accordion";
import CustomToast from "../../../../componentes/Toasts/CustomToast";
import { downloadPDF } from "../../../../componentes/PDFServices/PdfService";
import generarContrato from "../../../../componentes/PDFServices/GeneraContrato";
import { BuscarClientePorClave } from "../../../../Apis/FetchClientes";
import { ObtenerRutas } from "../../../../Apis/FetchRutas";
import { ObtenerFamilias } from "../../../../Apis/FetchFamilias";
import { ObtenerCostoServicioRutaFamilia } from "../../../../Apis/FetchCatalogos";
import generarAnexo from '../../../../componentes/PDFServices/GeneraAnexo';


const GeneracionContratoForm = () => {
    const [formData, setFormData] = useState({
        clave: '',
        regFiscal: '',
        usoCfdi: '',
        correoE: '',
        correoE2: '',
        ruta: '',
        orden: '',
        anioAlta: '',
        condPago: '',
        rfc: '',
        revFacturas: '',
        pagoFacturas: '',
        status: '',
        regIne: '',
        contratos: '',
        inicio: '',
        terminacion: '',
        noCons: '',
        paqInsm: '',
        refBancaria: '',
        calle: '',
        colonia: '',
        ciudad: '',
        estado: '',
        cp: '',
        claveEstadoINE: '',
        tel: '',
        contacto: '',
        repLegal: '',
        nombreFactura: '',
        noCuenta: '',
        metodoPago: '',
        calleFactura: '',
        coloniaFactura: '',
        ciudadFactura: '',
        estadoFactura: '',
        cpFactura: '',
        entreCalles: '',
        telFactura: '',
        contactoFactura: '',
        nombreCliente: '',
        nombreArchivo: '',
    });




    const [isSpecialContractEnabled, setIsSpecialContractEnabled] = useState(false);
    const [clienteClave, setClienteClave] = useState("");
    const [TipoServicio, setTipoServicio] = useState("");
    const [RazonSocialCliente, setRazonSocialCliente] = useState("");
    const [RepresentanteLegalCliente, setRepresentanteLegalCliente] = useState("");
    const [RFCCliente, setRFCCliente] = useState("");
    const [CalleCliente, setCalleCliente] = useState("");
    const [ColoniaCliente, setColoniaCliente] = useState("");
    const [CiudadCliente, setCiudadCliente] = useState("");
    const [EstadoCliente, setEstadoCliente] = useState("");
    const [CPliente, setCPCliente] = useState("");
    const [DiaDFirma, setDiaDFirma] = useState("");
    const [DiaFin, setDiaFin] = useState("");
    const [TCLIENTE, setTCLIENTE] = useState("");
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [rutas, setRutas] = useState([]);
    const [familias, setFamilias] = useState([]);
    const [rutaSeleccionada, setRutaSeleccionada] = useState('');
    const [familiaSeleccionada, setFamiliaSeleccionada] = useState('');
    const [nombreArchivoAnexo, setNombreArchivoAnexo] = useState('');

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

    const handleToggleSpecialContract = () => {
        setIsSpecialContractEnabled(prevState => !prevState);
    };





    const handleKeyDown = async (e, setValues) => {
        if (e.key === 'Tab' && e.target.name === 'clave') {
            e.preventDefault();
            const clave = e.target.value;
            if (!clave) {
                console.error('No hay clave proporcionada');
                return;
            }


            try {
                const data = await BuscarClientePorClave(clave);
                if (data) {
                    setClienteClave(data.nombre); // Asigna el nombre del cliente a clienteClave
                    setTipoServicio(data.serv);
                    setRazonSocialCliente(data.fnombre);
                    setRepresentanteLegalCliente(data.replegal);
                    setRFCCliente(data.rfc);
                    setCPCliente(data.cp);
                    setDiaDFirma(data.inicio);
                    setTCLIENTE(data.ftelefono);
                    setCalleCliente(data.calle);
                    setColoniaCliente(data.colonia);
                    setCiudadCliente(data.ciudad);
                    setEstadoCliente(data.estado);
                    setNombreArchivo(`contrato_${data.nombre}`);
                    setDiaFin(data.fin);
                    setNombreArchivoAnexo(`contrato_${data.nombre}_anexo`);

                    // Actualiza
                    const updatedFormData = {
                        ...formData,
                        ...data,
                        nombreCliente: data.nombre,
                        regFiscal: data.nombre ? data.nombre : '',
                        correoE: data.correoelectronico ? data.correoelectronico : '',
                        correoE2: data.segundocorreoelectronico ? data.segundocorreoelectronico : '',
                        ruta: data.ruta ? data.ruta : '',
                        orden: data.orden ? data.orden : '',
                        anioAlta: data.aalta ? data.aalta : '',
                        condPago: data.condspago ? data.condspago : '',
                        rfc: data.rfc ? data.rfc : '',
                        revFacturas: data.revision ? data.revision : '',
                        status: data.status ? data.status : '',
                        regIne: data.registro ? data.registro : '',
                        contratos: data.conts ? data.conts : '',
                        paqInsm: data.paqinsm ? data.paqinsm : '',
                        colonia: data.colonia ? data.colonia : '',
                        ciudad: data.ciudad ? data.ciudad : '',
                        cp: data.cp ? data.cp : '',
                        tel: data.telefono ? data.telefono : '',
                        repLegal: data.replegal ? data.replegal : '',
                        nombreFactura: data.fnombre ? data.fnombre : '',
                        noCuenta: data.numerocta ? data.numerocta : '',
                        metodoPago: data.mtdopago ? data.mtdopago : '',
                        calleFactura: data.fcalle ? data.fcalle : '',
                        coloniaFactura: data.fcolonia ? data.fcolonia : '',
                        ciudadFactura: data.fciudad ? data.fciudad : '',
                        estadoFactura: data.festado ? data.festado : '',
                        cpFactura: data.fcp ? data.fcp : '',
                        entreCalles: data.entreqcalles ? data.entreqcalles : '',
                        telFactura: data.ftelefono ? data.ftelefono : '',
                        contactoFactura: data.fcontacto ? data.fcontacto : '',
                        inicio: data.inicio ? data.inicio.split('T')[0] : '',
                        terminacion: data.fin ? data.fin.split('T')[0] : '',
                        nombreArchivo: data.nombre ? data.nombre : '',

                    };
                    setValues(updatedFormData);
                    setFormData(updatedFormData);
                    // Asegúrate de actualizar el estado de formData aquí
                } else {
                    console.log('No se encontraron datos para la clave proporcionada');
                }
            } catch (error) {
                console.error('Error al llamar al API:', error);
                CustomToast("Error", "Error al obtener datos del cliente");
            }

            console.log('Datos del formulario:', formData);
        }
    };









    const handleGenerateAndDownloadPDFAnexo = async () => {
        if (rutaSeleccionada && familiaSeleccionada) {
            try {
                const dataCostosServicio = await ObtenerCostoServicioRutaFamilia(rutaSeleccionada, familiaSeleccionada);
                if (dataCostosServicio.length > 0) {
                    const conceptoObtenido = dataCostosServicio[0].concepto;  // Uso directo del valor obtenido
                    const frecuenciaObtenido = dataCostosServicio[0].frecuencia;  // Uso directo del valor obtenido
                    const monedaObtenido = dataCostosServicio[0].moneda;  // Uso directo del valor obtenido
                    const precioUnitarioObtenido = dataCostosServicio[0].rpV;  // Uso directo del valor obtenido
                    const PrecioUnitariovisita = ` C.- $${dataCostosServicio[0].precioKGC}.00 \n 
                    R. - $${dataCostosServicio[0].precioKGR}.00 \n 
                    E. - $${dataCostosServicio[0].precioKGE}.00 \n 
                    T. - $${dataCostosServicio[0].precioKGT}.00 \n 
                    Te.- $${dataCostosServicio[0].precioKGTe}.00 \n 
                    Th.- $${dataCostosServicio[0].precioKGTh}.00 \n 
                    Tt.- $${dataCostosServicio[0].precioKGTt}.00 \n 
                    l. - $${dataCostosServicio[0].precioKGl}.00 \n`;
                    const precioUnitario_CSF = dataCostosServicio[0].precioUnitario_CSF;
                    const precioUnitario_MAC = dataCostosServicio[0].precioUnitario_MAC;
                    // Aquí puedes seguir utilizando 'conceptoObtenido' directamente para generar tu anexo

                    const datosAnexo = {
                        fecha_inicio: DiaDFirma,
                        fecha_fin: DiaFin,
                        nombre_cliente: clienteClave,
                        CONCEPTO: conceptoObtenido,
                        FRECUENCIA: frecuenciaObtenido,
                        KGS: precioUnitarioObtenido,
                        MONEDA: monedaObtenido,
                        precioUnitario_CSF: precioUnitario_CSF,
                        precioUnitario_MAC: precioUnitario_MAC,
                        PRECIOUNITARIOVISITA: PrecioUnitariovisita,
                    };

                    const documentoPDF = generarAnexo(datosAnexo);
                    downloadPDF(documentoPDF, nombreArchivoAnexo);

                } else {
                    console.warn("No se encontraron costos para los parámetros dados");
                }
            } catch (error) {
                console.error("Error al obtener costos:", error);
            }
        } else {
            console.warn("Selecciona una ruta y una familia para buscar costos");
        }
    };





    const handleGenerateAndDownloadPDF = () => {
        const datoscontrato = {
            TipoServicio,
            RazonSocialCliente,
            RepresentanteLegalCliente,
            RFCCliente,
            CalleCliente,
            ColoniaCliente,
            CiudadCliente,
            EstadoCliente,
            CPliente,
            DiaDFirma,
            TCLIENTE,
        };
        const documentoPDF = generarContrato(datoscontrato);
        downloadPDF(documentoPDF, nombreArchivo);
    };




    return (
        <>
            <CustomToast
                title="Cliente Agregado"
                message="Cliente agregado correctamente"
            />
            <Formik
                initialValues={formData}
                onSubmit={(values) => console.log("Submit", values)}
            >
                {({ setValues, isSubmitting }) => (
                    <Form className="flex flex-col w-full p-2 gap-2">
                        <Accordion
                            titulo="Consulta de Cliente"
                            idTarget="collapseOne1"
                            expanded="true"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 col-start-2 items-start gap-2 w-full">
                                <InputText
                                    disabled={isSubmitting}
                                    label="Clave"
                                    name="clave"
                                    type="text"
                                    placeholder=""
                                    onKeyDown={(e) => handleKeyDown(e, setValues)}
                                />
                                {/* Repite este patrón para los demás campos */}
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


                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isSpecialContractEnabled}
                                    onChange={handleToggleSpecialContract}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2 text-sm text-gray-600">Habilitar Anexo-2</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">

                                <button
                                    className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                                    onClick={handleGenerateAndDownloadPDF}
                                >
                                    Generar contrato
                                </button>
                            </div>
                        </Accordion>


                        {isSpecialContractEnabled && (
                            <Accordion
                                titulo="Contrato de Servicio Especializado"
                                idTarget="collapseOne4"
                                expanded={isSpecialContractEnabled}
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
                                <div className="flex items-center justify-center">

                                    <button
                                        className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleGenerateAndDownloadPDFAnexo}
                                    >
                                        Generar Anexo
                                    </button>
                                </div>
                            </Accordion>
                        )}

                        {/* Más acordeones y campos si es necesario */}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default GeneracionContratoForm;
