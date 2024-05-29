import React, { useEffect } from "react";
// Initialization for ES Users
import { Ripple, initTE } from "tw-elements";
import CardNavigate from "../../../componentes/Cards/CardNavigate";
import AltaManifiestosYDocsViajeForm from "./AltaManifiestos.Form";
import AltaManifiestosV2 from "./AltaManifiestosV2.Form";

const AltaManifiestos = () => {
  useEffect(() => {
    initTE({ Ripple });
  }, []);

  return (
    <>
      <CardNavigate title="Elaboración de Manifiestos y Documentación de Viaje">
        <AltaManifiestosV2 />
      </CardNavigate>
    </>
  );
};

export default AltaManifiestos;
