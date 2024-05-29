import React from 'react';
import CardNavigate from '../../../../componentes/Cards/CardNavigate';
import ReporteClientesForm from './ReporteCliente.Form';

const ReporteClientes = () => {
    return (
        <CardNavigate title='Reporte de Clientes'>
            <ReporteClientesForm />
        </CardNavigate>
    );
}

export default ReporteClientes;