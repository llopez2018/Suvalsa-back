import React from 'react'
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import AltaPersonalForm from "./AltaPersonal.Form";
import { useLocation } from "react-router-dom";

const AltaPersonal = () => {
  const tituloAPersonal = "Alta de Personal";
  const location = useLocation();

// get urlBack
let urlBack= undefined;
if(location.state){
  urlBack = location.state.urlBack;
}

  return (
    <CardNavigate title={tituloAPersonal}>
      <AltaPersonalForm backUrl={urlBack}/>
    </CardNavigate>
  );
};
export default AltaPersonal
