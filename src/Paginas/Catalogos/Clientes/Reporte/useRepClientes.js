import { useState, useEffect } from "react";
import { ObtenerFamilias } from "../../../../Apis/FetchFamilias";
import { BuscarClientePorFamilia } from "../../../../Apis/FetchClientes";

const useRepClientes = () => {
    const [familias, setFamilias] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const listarFamilias = async () => {
            console.log("Obteniendo familias...");
            const listaFam = await ObtenerFamilias();
            console.log("Familias obtenidas:", listaFam);
            setFamilias(listaFam);
        };
        listarFamilias();
    }, []);

    const getDataFunction = async (selectedFamiliaId) => {
        try {
            setLoading(true);
            console.log("Buscando clientes para la familia ID:", selectedFamiliaId);
            const selectedFamilia = familias.find(familia => familia.id === parseInt(selectedFamiliaId));
            if (!selectedFamilia) {
                throw new Error("Familia no encontrada");
            }
            console.log("Familia seleccionada:", selectedFamilia);
            const response = await BuscarClientePorFamilia(selectedFamilia.clave);
            console.log("Clientes obtenidos:", response);
            const rowsNew = response.map(cliente => ({
                id: cliente.id,
                correoelectronico: cliente.correoelectronico,
                segundocorreoelectronico: cliente.segundocorreoelectronico,
                fam: cliente.fam,
                pago: cliente.pago,
                comision: cliente.comision,
                cp: cliente.cp,
                ftelefono: cliente.ftelefono,
                frec: cliente.frec,
                registro: cliente.registro,
                contacto: cliente.contacto,
                revision: cliente.revision,
                agente: cliente.agente,
                fin: cliente.fin,
                fcontacto: cliente.fcontacto,
                fcuota: cliente.fcuota,
                fcalle: cliente.fcalle,
                fcolonia: cliente.fcolonia,
                telefono: cliente.telefono,
                festado: cliente.festado,
                ciudad: cliente.ciudad,
                fcp: cliente.fcp,
                colonia: cliente.colonia,
                estado: cliente.estado,
                inicio: cliente.inicio,
                fnombre: cliente.fnombre,
                calle: cliente.calle,
                fciudad: cliente.fciudad,
                condspago: cliente.condspago,
                ruta: cliente.ruta,
                orden: cliente.orden,
                replegal: cliente.replegal,
                rutak: cliente.rutak,
                rfc: cliente.rfc,
                nombre: cliente.nombre,
                fkginc: cliente.fkginc,
                fctokg: cliente.fctokg,
                serv: cliente.serv,
                ictokg: cliente.ictokg,
                comision2: cliente.comision2,
                vcobins: cliente.vcobins,
                planta: cliente.planta,
                iotrafac: cliente.iotrafac,
                fotros: cliente.fotros,
                horario: cliente.horario,
                votros: cliente.votros,
                vctokg: cliente.vctokg,
                icuota: cliente.icuota,
                iotros: cliente.iotros,
                edo: cliente.edo,
                fotrafac: cliente.fotrafac,
                votrafac: cliente.votrafac,
                agente2: cliente.agente2,
                vcuota: cliente.vcuota,
                ikginc: cliente.ikginc,
                icobins: cliente.icobins,
                refbanco: cliente.refbanco,
                fcobins: cliente.fcobins,
                aalta: cliente.aalta,
                dia: cliente.dia,
                conts: cliente.conts,
                status: cliente.status,
                nombrerupa: cliente.nombrerupa,
                rupa: cliente.rupa,
                vkginc: cliente.vkginc,
                txtotros: cliente.txtotros,
                usom: cliente.usom,
                unidadnegocio: cliente.unidadnegocio,
                pdei: cliente.pdei,
                rutaplanta: cliente.rutaplanta,
                numerocta: cliente.numerocta,
                mtdopago: cliente.mtdopago,
                coa: cliente.coa,
                regimenfiscal: cliente.regimenfiscal,
                tiposociedad: cliente.tiposociedad,
                usocfdi: cliente.usocfdi,
                paqinsm: cliente.paqinsm,
                clave: cliente.clave,
                entreqcalles: cliente.entreqcalles,
                cons: cliente.cons,
                nicoa: cliente.nicoa,
                cbest: cliente.cbest
            }));
            setData(rowsNew);
            console.log("Data set to state successfully", rowsNew);
            setLoading(false);
        } catch (error) {
            console.log("Error: ", error.message);
            setLoading(false);
        }
    };

    const columnsData = [
        { accessorKey: "id", header: "Id" },
        { accessorKey: "correoelectronico", header: "Correo Electrónico" },
        { accessorKey: "segundocorreoelectronico", header: "Segundo Correo Electrónico" },
        { accessorKey: "fam", header: "Familia" },
        { accessorKey: "pago", header: "Pago" },
        { accessorKey: "comision", header: "Comisión" },
        { accessorKey: "cp", header: "CP" },
        { accessorKey: "ftelefono", header: "F. Teléfono" },
        { accessorKey: "frec", header: "F. Rec" },
        { accessorKey: "registro", header: "Registro" },
        { accessorKey: "contacto", header: "Contacto" },
        { accessorKey: "revision", header: "Revisión" },
        { accessorKey: "agente", header: "Agente" },
        { accessorKey: "fin", header: "Fin" },
        { accessorKey: "fcontacto", header: "F. Contacto" },
        { accessorKey: "fcuota", header: "F. Cuota" },
        { accessorKey: "fcalle", header: "F. Calle" },
        { accessorKey: "fcolonia", header: "F. Colonia" },
        { accessorKey: "telefono", header: "Teléfono" },
        { accessorKey: "festado", header: "F. Estado" },
        { accessorKey: "ciudad", header: "Ciudad" },
        { accessorKey: "fcp", header: "F. CP" },
        { accessorKey: "colonia", header: "Colonia" },
        { accessorKey: "estado", header: "Estado" },
        { accessorKey: "inicio", header: "Inicio" },
        { accessorKey: "fnombre", header: "F. Nombre" },
        { accessorKey: "calle", header: "Calle" },
        { accessorKey: "fciudad", header: "F. Ciudad" },
        { accessorKey: "condspago", header: "Conds Pago" },
        { accessorKey: "ruta", header: "Ruta" },
        { accessorKey: "orden", header: "Orden" },
        { accessorKey: "replegal", header: "Rep Legal" },
        { accessorKey: "rutak", header: "Ruta K" },
        { accessorKey: "rfc", header: "RFC" },
        { accessorKey: "nombre", header: "Nombre" },
        { accessorKey: "fkginc", header: "F. Kg Inc" },
        { accessorKey: "fctokg", header: "F. Cto Kg" },
        { accessorKey: "serv", header: "Serv" },
        { accessorKey: "ictokg", header: "I Cto Kg" },
        { accessorKey: "comision2", header: "Comisión 2" },
        { accessorKey: "vcobins", header: "V Cob Ins" },
        { accessorKey: "planta", header: "Planta" },
        { accessorKey: "iotrafac", header: "I Otra Fac" },
        { accessorKey: "fotros", header: "F. Otros" },
        { accessorKey: "horario", header: "Horario" },
        { accessorKey: "votros", header: "V. Otros" },
        { accessorKey: "vctokg", header: "V Cto Kg" },
        { accessorKey: "icuota", header: "I Cuota" },
        { accessorKey: "iotros", header: "I Otros" },
        { accessorKey: "edo", header: "Edo" },
        { accessorKey: "fotrafac", header: "F Otra Fac" },
        { accessorKey: "votrafac", header: "V Otra Fac" },
        { accessorKey: "agente2", header: "Agente 2" },
        { accessorKey: "vcuota", header: "V Cuota" },
        { accessorKey: "ikginc", header: "I Kg Inc" },
        { accessorKey: "icobins", header: "I Cob Ins" },
        { accessorKey: "refbanco", header: "Ref Banco" },
        { accessorKey: "fcobins", header: "F Cob Ins" },
        { accessorKey: "aalta", header: "A Alta" },
        { accessorKey: "dia", header: "Día" },
        { accessorKey: "conts", header: "Conts" },
        { accessorKey: "status", header: "Status" },
        { accessorKey: "nombrerupa", header: "Nombre RUPA" },
        { accessorKey: "rupa", header: "RUPA" },
        { accessorKey: "vkginc", header: "V Kg Inc" },
        { accessorKey: "txtotros", header: "Txt Otros" },
        { accessorKey: "usom", header: "Uso M" },
        { accessorKey: "unidadnegocio", header: "Unidad Negocio" },
        { accessorKey: "pdei", header: "PDEI" },
        { accessorKey: "rutaplanta", header: "Ruta Planta" },
        { accessorKey: "numerocta", header: "Número Cta" },
        { accessorKey: "mtdopago", header: "Mtdo Pago" },
        { accessorKey: "coa", header: "COA" },
        { accessorKey: "regimenfiscal", header: "Regimen Fiscal" },
        { accessorKey: "tiposociedad", header: "Tipo Sociedad" },
        { accessorKey: "usocfdi", header: "Uso CFDI" },
        { accessorKey: "paqinsm", header: "Paq Ins M" },
        { accessorKey: "clave", header: "Clave" },
        { accessorKey: "entreqcalles", header: "Entre Q Calles" },
        { accessorKey: "cons", header: "Cons" },
        { accessorKey: "nicoa", header: "NI COA" },
        { accessorKey: "cbest", header: "CBEST" }
    ];

    const optionsTable = {
        ofText: "Clientes de"
    };

    return {
        familias,
        data,
        setData,
        loading,
        getDataFunction,
        columnsData,
        optionsTable
    };
};

export default useRepClientes;
