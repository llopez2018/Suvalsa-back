import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    section: {
        margin: 10,
        padding: 5,
        flexGrow: 1
    },
    text: {
        margin: 5,
        fontSize: 12,
        textAlign: 'justify'
    },
    title_table: {
        margin: 5,
        fontSize: 12,
        textAlign: 'justify'
    },
    table: {
        display: 'table',
        width: 'auto', // Ajusta al ancho del contenido o al máximo disponible
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableCol: {
        width: '50%', // Ajusta el ancho según necesites
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },
    tableColHeader: {
        width: '50%', // Ajusta el ancho según necesites
        backgroundColor: '#e4e4e4',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    }, line: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginTop: 2,
        marginBottom: 5
    }, textFinal: {

        margin: 5,
        fontSize: 8,
        textAlign: 'justify'
    }
});

function getParrafo1(fecha_inicio, fecha_fin, nombre_cliente) {

    return `
    Del Contrato Maestro de Prestación de Servicios de Manejo, Tratamiento por Incineración y Disposición Final de Residuos de fecha ${fecha_inicio}, al ${fecha_fin}, celebrado por y entre ${nombre_cliente}, y SUVALSA, S.A. DE C.V.

    CONTRAPRESTACIÓN
    Como contraprestación por los servicios mencionados en la Cláusula Primera anterior de este Contrato Maestro, “CLIENTE” cubrirá a “SUVALSA” por el primer año como de la vigencia de Contrato del  ${fecha_inicio}, al ${fecha_fin} un único honorario profesional, incluidos cualesquiera gastos en que incurra “SUVALSA” las cantidades que a continuación se detallan:
    `;
}

const getParrafo2 = `
    Más el correspondiente Impuesto al Valor Agregado.
    
    El pago de la contraprestación a que se refiere los párrafos que anteceden, lo efectuará “CLIENTE” a “SUVALSA” de Contado al
    momento de que se realice el servicio al “CLIENTE”, la factura correspondiente le será enviada vía correo, que deberá contener (i) una
    descripción detallada de los servicios que ampara y (ii) todos los requisitos fiscales que le sean aplicables conforme a la ley de la materia.
    Para los contratos con vigencia multianual por el segundo año de la vigencia del contrato a partir del 01 de enero de 2024 se actualizarán
    los montos de acuerdo al índice de la inflación anual que determine el Banco de México y se adicionará el factor del costo del combustible.
    `


const getparrafo3 = `
“SUVALSA” en este acto acepta y autoriza en forma expresa a “CLIENTE” para efecto de que el pago de la contraprestación a que se refiere el párrafo
que antecede le sea depositado, (y siempre que previamente haya entregado la factura a que se refiere el párrafo anterior), vía Transferencia Electrónica
de Fondos BANCO NACIONAL DE MÉXICO, S.A., Beneficiario SUVALSA, S.A. DE C.V. cuenta número 681 7858285, REFERENCIA 7434 CLABE
002180068178582857 (18 dígitos). Una vez efectuada la Transferencia Electrónica de Fondos a que se refiere el párrafo que antecede, “SUVALSA”
acepta expresamente que el pago de la contraprestación quedará debidamente cubierto a su entera satisfacción y libera expresamente a “CLIENTE” de
cualquier responsabilidad derivada del pago de la contraprestación a que se refiere esta cláusula.

La tasa del interés moratorio será 9% ANUAL sobre saldo insoluto vencido el plazo de pago establecido.

En vista de lo establecido anteriormente, “SUVALSA” presentará a “CLIENTE”, en sus oficinas (cuyo domicilio se menciona en la Cláusula Vigésimo
Segunda anterior de este Contrato Maestro) para su revisión y aprobación en el(los) día(s) de “Presentación de Facturas/Recibos a Revisión”
establecidos por “CLIENTE” la factura que expida “SUVALSA”, junto con el Manifiesto de Entrega Transporte y Recepción de Residuos, debidamente
liberado, independientemente del envío de la Factura de manera Electrónica.
    `
const TablaAnexxoCargoFalso = ({ precioUnitario_CSF, precioUnitario_MAC }) => {
    return (
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>CONCEPTO</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>UNIDAD</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>MONEDA</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>CANTIDAD</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>PRECIO UNITARIO</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cargo por servicio falso</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>servicio</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>M.N.</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{precioUnitario_CSF.toString()}</Text>
                </View>

            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Maniobras de acondicionamiento de carga </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Hora</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>M.N.</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{precioUnitario_MAC.toString()}</Text>
                </View>

            </View>
        </View>
    )
};



const TablaAnexo2 = ({ CONCEPTO, FRECUENCIA, KGS, MONEDA, PRECIOUNITARIOVISITA }) => {
    return (
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>CONCEPTO</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>FRECUENCIA</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>KGS POR VISITA</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>MONEDA</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>PRECIO UNITARIO VISITA</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{CONCEPTO.toString()}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{FRECUENCIA.toString()}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{KGS.toString()}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{MONEDA.toString()}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{PRECIOUNITARIOVISITA.toString()}</Text>
                </View>
            </View>
        </View>
    );
};



const TablaAnexo2inflacion = () => {
    return (
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>CONCEPTO</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>UNIDAD</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>PRECIO UNITARIO</Text>
                </View>

            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cargo factor de combustiblre a partir 2 añ0</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Porcentaje</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Resultaddo de restar el infice de la inflacion anual del INPC al valor del porcentaje acumulado del precio del combustible</Text>
                </View>

            </View>
            {/* Add more rows as needed */}
        </View>
    );
};


const TablaClienteFirmaFinal = ({ nombreCliente, RepresentanteLegalCliente }) => (
    <View>
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>CLIENTE</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>SUVALSA SA DE CV</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{nombreCliente}</Text>
                    <Text style={styles.tableCell}><br></br></Text>
                    <Text style={styles.tableCell}><br></br></Text>
                    <View style={styles.line}></View>
                    <Text style={styles.tableCell}>Por: {RepresentanteLegalCliente}</Text>
                    <Text style={styles.tableCell}>Cargo:  REPRESENTANTE LEGAL</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>SUVALSA, S.A. DE C.V.</Text>
                    <Text style={styles.tableCell}><br></br></Text>
                    <Text style={styles.tableCell}><br></br></Text>
                    <View style={styles.line}></View>
                    <Text style={styles.tableCell}>Por:  ERIC SÁNCHEZ OLDENHAGE</Text>
                    <Text style={styles.tableCell}>Cargo: REPRESENTANTE LEGAL</Text>
                </View>
            </View>
        </View>
    </View >
);

function generarContratoAnexo(datos) {
    const {// Asumiendo que esto no es necesario directamente aquí
        fecha_inicio,
        fecha_fin,
        nombre_cliente,
        precioUnitario_CSF,
        precioUnitario_MAC,
        CONCEPTO,
        FRECUENCIA,
        KGS,
        MONEDA,
        PRECIOUNITARIOVISITA
    } = datos;




    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text}>ANEXO 2</Text>
                    <Text style={styles.text}>
                        {getParrafo1(fecha_inicio, fecha_fin, nombre_cliente)}
                    </Text>
                    <TablaAnexo2
                        CONCEPTO={CONCEPTO}
                        FRECUENCIA={FRECUENCIA}
                        KGS={KGS}
                        MONEDA={MONEDA}
                        PRECIOUNITARIOVISITA={PRECIOUNITARIOVISITA}
                    />
                    <TablaAnexxoCargoFalso
                        precioUnitario_CSF={precioUnitario_CSF}
                        precioUnitario_MAC={precioUnitario_MAC}
                    />
                    <Text style={styles.text}>
                        {getParrafo2}
                    </Text>
                    <TablaAnexo2inflacion />
                    <Text style={styles.text}>
                        {getparrafo3}
                    </Text>
                    <TablaClienteFirmaFinal
                        nombreCliente={nombre_cliente}
                        RepresentanteLegalCliente="REPRESENTANTE LEGAL"
                    />
                </View>
            </Page>
        </Document>
    );
}

export default generarContratoAnexo;