import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast, initTE } from "tw-elements";
import { AgregarFrecuencia } from "../../../Apis/FetchCatalogos";

const useAltaFrecuencia = (props) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [loading, setLoading] = useState(false);
  const [urlBack, setUrlBack] = useState("");
  const navegar = useNavigate();
  const idToastaltaFrecuencia = "toastAltaFrecuencia";

  const initValuesAc = {
    clave: "",
    frecuencia: ""
  };

  function regresarFrecuencias() {
    console.log("aqui regresa a cat Frecuencias: ", urlBack);
    navegar(
      urlBack === undefined ? "/suvalsa/catalogos/frecuencia-visitas" : urlBack
    );
  }

  function ImprimirContrato() {
    console.log("clic imprimir contrato frecuencias: ");
  }

  async function mostrarResultadoAlta() {
    console.log(document.getElementById(idToastaltaFrecuencia));
    const myToastAlta = document.getElementById(idToastaltaFrecuencia);
    console.log(Toast.getInstance(myToastAlta));
    Toast.getOrCreateInstance(myToastAlta).show();
  }

  async function onSubmitAltaFrecuencia(values, { resetForm }) {
    console.log("onsubmit....");
    setLoading(true);
    const datosFrec = {
      clave: values.clave,
      frecuencia: values.frecuencia
    };
    await sleep(5000);
    await AgregarFrecuencia(datosFrec);
    resetForm();
    setLoading(false);
    await mostrarResultadoAlta();
  }

  const buttonsGroup = {
    buttonPrimary: {
      disabled: loading,
      type: "submit",
      label: "Grabar"
    },
    buttonSecondary: {
      action: ImprimirContrato,
      disabled: loading,
      type: "button",
      label: "Imprimir Contrato"
    },
    buttonTertiary: {
      action: regresarFrecuencias,
      disabled: loading,
      type: "button",
      label: `${urlBack === undefined ? "Ver Catálogo" : "Cancelar"}`
    }
  };

  useEffect(() => {
    initTE({ Input });
    console.log("props.backUrl: ", props.backUrl);
    setUrlBack(props.backUrl);
  }, []);

  useEffect(() => {
    console.log("useEffect urlBack: ", urlBack);
    if (urlBack !== undefined && urlBack !== "") {
      const myToastEl = document.getElementById(idToastaltaFrecuencia);
      myToastEl.addEventListener("hidden.te.toast", () => {
        console.log("Accion posterior al cierre del toast");
        regresarFrecuencias()
      });
      return console.log("return useEffect ", urlBack);
    }
  }, [urlBack]);

  return {
    loading,
    idToastaltaFrecuencia,
    initValuesAc,
    onSubmitAltaFrecuencia,
    setUrlBack,
    buttonsGroup
  };
};

export default useAltaFrecuencia;
