import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast, initTE } from "tw-elements";
import { AgregarTrabajo } from "../../../Apis/FetchCatalogos";

const useAltaTrabajo = (props) =>{
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const [loading, setLoading] = useState(false);
    const [urlBack, setUrlBack] = useState("");
    const navegar = useNavigate();
    const idToastaltaTrab = "toastAltaTrab";
  
    const initValuesAc = {
      clave: "",
      trabajo: "",
    };
  
    function regresarTrabajos() {
      console.log("aqui regresa a cat Trabajos: ", urlBack);
      navegar(urlBack === undefined ? "/suvalsa/catalogos/trabajos-realizados" : urlBack);
    }
  
    function ImprimirContrato() {
      console.log("clic imprimir contrato Trabajos: ");
    }
  
    async function mostrarResultadoAlta() {
      console.log(document.getElementById(idToastaltaTrab));
      const myToastAlta = document.getElementById(idToastaltaTrab);
      console.log(Toast.getInstance(myToastAlta));
      Toast.getOrCreateInstance(myToastAlta).show();
    }
  
    async function onSubmitAltaTrabajos(values, { resetForm }) {
      console.log("onsubmit....");
      setLoading(true);
      const datosTrab = {
        clave: values.clave,
        trabajo: values.trabajo,
      };
      await sleep(5000);
      await AgregarTrabajo(datosTrab);
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
        action: regresarTrabajos,
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
        const myToastEl = document.getElementById(idToastaltaTrab);
        myToastEl.addEventListener("hidden.te.toast", () => {
          // do something...
          console.log("Accion posterior al cierre del toast");
          regresarTrabajos();
        });
        return console.log("return useEffect ", urlBack);
      }
    }, [urlBack]);
  
    return {
      loading,
      idToastaltaTrab,
      initValuesAc,
      onSubmitAltaTrabajos,
      setUrlBack,
      buttonsGroup
    };
  };

export default useAltaTrabajo;