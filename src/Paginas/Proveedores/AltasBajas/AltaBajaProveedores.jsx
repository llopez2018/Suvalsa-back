import React from "react";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import AltaProveedorForm from "./AltaProveedor.Form";
import { useLocation } from "react-router-dom";

const AltaBajaProveedores = () => {
  const tituloAProveedor = "Alta de Proveedores";
  const location = useLocation();

// get urlBack
let urlBack= undefined;
if(location.state){
  urlBack = location.state.urlBack;
}

console.log(location.state)
  return (
    <CardNavigate title={tituloAProveedor}>
      <AltaProveedorForm backUrl={urlBack}/>
    </CardNavigate>
  );
};

export default AltaBajaProveedores;
