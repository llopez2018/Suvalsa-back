import React, { useEffect } from 'react'
import CardNavigate from '../../../componentes/Cards/CardNavigate'
import AltaRutaDatosForm from './AltaRuta.Form'
// Initialization for ES Users
import {
  Ripple,
  initTE
} from "tw-elements";

const AltaRutas = () => {

  useEffect(() => {
    initTE({ Ripple });
  }, []);

  return (
    <CardNavigate title="Alta de Rutas">
      <AltaRutaDatosForm />
    </CardNavigate>
  )
}

export default AltaRutas
