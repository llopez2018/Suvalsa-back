import React from 'react'
import CardNavigate from '../../../../componentes/Cards/CardNavigate';
import AltaClienteForm from './AltaCliente.Form';

const AltaCliente = () => {

  return (
    <CardNavigate title='Alta de clientes' >
          <AltaClienteForm />
    </CardNavigate>
  ) 
}

export default AltaCliente
