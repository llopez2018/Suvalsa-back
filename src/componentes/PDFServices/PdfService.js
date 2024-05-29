import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

export const downloadPDF = async (document, nombreArchivo) => {
    const blob = await pdf(document).toBlob();
    saveAs(blob, nombreArchivo);
};
