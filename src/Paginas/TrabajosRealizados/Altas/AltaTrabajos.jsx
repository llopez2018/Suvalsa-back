import React from "react";
import { useLocation } from "react-router-dom";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import AltaTrabajoForm from "./AltaTrabajos.Form";

const AltaTrabajos = () => {
  const tituloATrabajo = "Alta de Trabajo Realizado";
  const location = useLocation();

  // get urlBack
  let urlBack = undefined;
  if (location.state) {
    urlBack = location.state.urlBack;
  }
  return (
    <CardNavigate title={tituloATrabajo}>
      <AltaTrabajoForm backUrl={urlBack} />
    </CardNavigate>
  );
};

export default AltaTrabajos;
