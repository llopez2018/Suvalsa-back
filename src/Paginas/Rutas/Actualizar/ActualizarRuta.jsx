import React from 'react'
import ActualizarRutaForm from './ActualizarRuta.Form';
import CardNavigate from '../../../componentes/Cards/CardNavigate';

const ActualizarRuta = () => {
  const tituloARuta = "Actualización de Rutas";

  return (
    <CardNavigate title={tituloARuta}>
      <ActualizarRutaForm />
    </CardNavigate>
  )
}

export default ActualizarRuta
