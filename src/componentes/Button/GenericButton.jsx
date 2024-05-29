import React from 'react'
import generarContrato from '../../componentes/PDFServices/GeneraContrato';
import { downloadPDF } from '../../componentes/PDFServices/PdfService';


const handleGenerateAndDownloadPDF = () => {
  const datosContrato = {
    nombreCliente: '',
    nombreSuvalsa: 'SUVALSA SA DE CV',
    RazonSocialCliente: 'Instituto Estatal De Cancerologia Y/o Dr. Arturo Beltran O.',
    TipoServicio: 'RESIDUOS TOXICOS',
    RepresentanteLegalCliente: 'Dr. Marco Antonio Terán Porcayo',
    RFCCliente: 'IEC-980612-FV2',
    CalleCliente: 'Av. Ruiz Cortínez No. 128-A,',
    ColoniaCliente: 'Col. Alta Progreso',
    CiudadCliente: 'Acapulco',
    EstadoCliente: 'Guerrero',
    CPliente: '39570',
    TCLIENTE: '4456517-47',
    DiaDFirma: '18 abril 2024'
  };

  const documentoPDF = generarContrato(datosContrato);
  downloadPDF(documentoPDF, 'nombreContrato.pdf'); // Asegúrate de definir 'nombreArchivo'
};


const GenericButton = (props) => {

  return (
    <button onClick={props.action}
      disabled={props.disabled}
      type={props.type}
      className={props.class}>
      {props.label}
    </button>
  )
}

export const ButtonGroup = (props) => {
  return (
    <div className=" grid md:flex md:justify-start gap-4">
      {props.buttonPrimary && (
         <button onClick={props.buttonPrimary.action} 
          data-te-modal-dismiss={props.buttonPrimary?.modalDismiss ? true : false}
          disabled={props.buttonPrimary.disabled}
          type={props.buttonPrimary.type}
          className="btn-primary">
          {props.buttonPrimary.label}
        </button>
      )}
      {props.buttonSecondary && (
        <button
          onClick={props.buttonSecondary.action}
          data-te-modal-dismiss={props.buttonSecondary.modalDismiss}
          disabled={props.buttonSecondary.disabled}
          type={props.buttonSecondary.type}
          className="btn-secondary">
          {props.buttonSecondary.label}
        </button>
      )}
      {props.buttonTertiary && (
        <button
          onClick={props.buttonTertiary.action}
          data-te-modal-dismiss={props.buttonTertiary.modalDismiss}
          disabled={props.buttonTertiary.disabled}
          type={props.buttonTertiary.type}
          className="btn-tertiary">
          {props.buttonTertiary.label}
        </button>
      )}
      {props.buttonCuatriary && (
        <button
          onClick={props.buttonCuatriary.action}
          data-te-modal-dismiss={props.buttonCuatriary.modalDismiss}
          disabled={props.buttonCuatriary.disabled}
          type={props.buttonCuatriary.type}
          className="btn-cuatriary">
          {props.buttonCuatriary.label}
        </button>
      )}
      {props.buttonQuintuary && (
        <button
          onClick={props.buttonQuintuary.action}
          data-te-modal-dismiss={props.buttonQuintuary.modalDismiss}
          disabled={props.buttonQuintuary.disabled}
          type={props.buttonQuintuary.type}
          className="btn-quintuary">
          {props.buttonQuintuary.label}
        </button>
      )}
      {props.buttonPrintContract && (
        <button
          onClick={props.buttonQuintuary.action}
          data-te-modal-dismiss={props.buttonPrintContract.modalDismiss}
          disabled={props.buttonPrintContract.disabled}
          type={props.buttonPrintContract.type}
          action={handleGenerateAndDownloadPDF}
          className="btn-contrato">
          {props.buttonPrintContract.label}
        </button>
      )}
    </div>
  );
}


export default GenericButton
