import React from "react";
import { useLocation } from "react-router-dom";
import AltaDatosNumerosForm from "./AltaDatosNumeros.Form";
import CardNavigate from "../../../componentes/Cards/CardNavigate";

const AltaDatosNumeros = () => {
  const tituloANoDatos = "Alta de Números y Datos de Control";
  const location = useLocation();

  // get urlBack
  let urlBack = undefined;
  if (location.state) {
    urlBack = location.state.urlBack;
  }

  return (
    <CardNavigate title={tituloANoDatos}>
      <AltaDatosNumerosForm backUrl={urlBack} />
    </CardNavigate>
  );
};

export default AltaDatosNumeros;
