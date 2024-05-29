import React from "react";
import { useLocation } from "react-router-dom";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import AltaResiduoForm from "./AltaResiduo.Form";

const AltaResiduo = () => {
  const tituloAResiduo = "Alta de Residuo";
  const location = useLocation();

  // get urlBack
  let urlBack = undefined;
  if (location.state) {
    urlBack = location.state.urlBack;
  }

  console.log(location.state);
  return (
    <CardNavigate title={tituloAResiduo}>
      <AltaResiduoForm backUrl={urlBack} />
    </CardNavigate>
  );
};

export default AltaResiduo;
