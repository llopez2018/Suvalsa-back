import React from "react";
import { useLocation } from "react-router-dom";
import AltaInsumosForm from "./AltaInsumos.Form";
import CardNavigate from "../../../componentes/Cards/CardNavigate";

const AltaInsumos = () => {
  const tituloAInsumo = "Alta de Insumos";
  const location = useLocation();

  // get urlBack
  let urlBack = undefined;
  if (location.state) {
    urlBack = location.state.urlBack;
  }

  return (
    <CardNavigate title={tituloAInsumo}>
      <AltaInsumosForm backUrl={urlBack} />
    </CardNavigate>
  );
};

export default AltaInsumos;
