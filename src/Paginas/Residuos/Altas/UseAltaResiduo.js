import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast, initTE } from "tw-elements";
import { AgregarResiduo } from "../../../Apis/FetchCatalogos";

const useAltaResiduo = (props) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [loading, setLoading] = useState(false);
  const [urlBack, setUrlBack] = useState("");
  const navegar = useNavigate();
  const idToastaltaResi = "toastAltaResi";

  const initValuesAc = {
    clave: "",
    nombre: "",
    uni: "",
    tipo: "",
    titulo: "",
    clasificacion: "",
    clvine: "",
    sistemadfinal: "",
    empresadfinal: "",
    autorizacion: "",
    codigo: ""
  };

  function regresarResiduos() {
    console.log("aqui regresa a cat Residuos: ", urlBack);
    navegar(urlBack === undefined ? "/suvalsa/catalogos/residuos" : urlBack);
  }

  function ImprimirContrato() {
    console.log("clic imprimir contrato Residuos: ");
  }

  async function mostrarResultadoAlta() {
    console.log(document.getElementById(idToastaltaResi));
    const myToastAlta = document.getElementById(idToastaltaResi);
    console.log(Toast.getInstance(myToastAlta));
    Toast.getOrCreateInstance(myToastAlta).show();
  }

  async function onSubmitAltaResiduo(values, { resetForm }) {
    console.log("onsubmit....");
    setLoading(true);
    const datosResi = {
      clave: values.clave,
      nombre: values.nombre,
      unidad: values.uni,
      tipo: values.tipo,
      titulo: values.titulo,
      repine1: values.clasificacion,
      repine2: values.clvine,
      repine3: values.sistemadfinal,
      repine4: values.empresadfinal,
      repine5: values.autorizacion,
      codpel: values.codigo
    };
    await sleep(5000);
    await AgregarResiduo(datosResi);
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
      action: regresarResiduos,
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
      const myToastEl = document.getElementById(idToastaltaResi);
      myToastEl.addEventListener("hidden.te.toast", () => {
        // do something...
        console.log("Accion posterior al cierre del toast");
        regresarResiduos();
      });
      return console.log("return useEffect ", urlBack);
    }
  }, [urlBack]);

  return {
    loading,
    idToastaltaResi,
    initValuesAc,
    onSubmitAltaResiduo,
    setUrlBack,
    buttonsGroup
  };
};

export default useAltaResiduo;
