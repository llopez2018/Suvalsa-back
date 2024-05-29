import React from "react";
import { useLocation } from "react-router-dom";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import AltaVehiculoForm from "./AltaVehiculo.Form";

const AltaVehiculo = () => {
  const tituloAVehiculo = "Alta de Vehículo";
  const location = useLocation();

  // get urlBack
  let urlBack = undefined;
  if (location.state) {
    urlBack = location.state.urlBack;
  }
  return (
    <CardNavigate title={tituloAVehiculo}>
      <AltaVehiculoForm backUrl={urlBack} />
    </CardNavigate>
  );
};

export default AltaVehiculo;
