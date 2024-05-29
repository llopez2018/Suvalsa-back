import React from "react";
import { useLocation } from "react-router-dom";
import AltaFrecuenciaForm from "./AltaFrecuencia.Form";
import CardNavigate from "../../../componentes/Cards/CardNavigate";

const AltaFrecuencia = () => {
  const tituloAFrec = "Alta de Frecuencia de Visitas a Clientes";
  const location = useLocation();

  // get urlBack
  let urlBack = undefined;
  if (location.state) {
    urlBack = location.state.urlBack;
  }

  return (
    <CardNavigate title={tituloAFrec}>
      <AltaFrecuenciaForm backUrl={urlBack} />
    </CardNavigate>
  );
};

export default AltaFrecuencia;
