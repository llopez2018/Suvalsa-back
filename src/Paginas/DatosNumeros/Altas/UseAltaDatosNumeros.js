import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast,initTE } from "tw-elements";
import { AgregarNumerosDatosCtrl } from "../../../Apis/FetchCatalogos";

const useAltaDatosNumeros = (props) => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const [loading, setLoading] = useState(false);
    const [urlBack, setUrlBack] = useState('')
    const navegar = useNavigate();
    const idToastaltaNoDatos = "toastAltaNoDatos";
    
    const initValuesAc = {
      clave: "8030",
      status: "",
      notas: "",
      dato: "",
      concepto: "",
    };
  
    function regresarDatosNumeros() {
        console.log("aqui regresa a cat Datos y numeros: ",urlBack);
        navegar(urlBack === undefined ? "/suvalsa/catalogos/datos-y-numeros-control" : urlBack);
    }
  
    function ImprimirContrato() {
      console.log("clic imprimir contrato datos y numeros: ");
    }
  
    async function mostrarResultadoAlta() {
      console.log(document.getElementById(idToastaltaNoDatos));
      const myToastAlta = document.getElementById(idToastaltaNoDatos);
      console.log(Toast.getInstance(myToastAlta));
      Toast.getOrCreateInstance(myToastAlta).show();
    }
  
    async function onSubmitAltaDatosNumeros(values, { resetForm }) {
      console.log("onsubmit....");
      setLoading(true)
      const datosNoDatos = {
        clave: values.clave,
        status: values.status,
        notas: values.notas,
        dato: values.dato,
        concepto: values.concepto,
      };
      await sleep(5000);
      await AgregarNumerosDatosCtrl(datosNoDatos);
      resetForm();
      setLoading(false)
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
        action: regresarDatosNumeros,
        disabled: loading,
        type: "button",
        label: `${urlBack === undefined ? 'Ver Catálogo' : 'Cancelar'}`
      }
    };
  
    useEffect(() => {
      initTE({ Input });
      console.log("props.backUrl: ", props.backUrl);
      setUrlBack(props.backUrl);
    }, []);
  
    useEffect(() => {
      console.log('useEffect urlBack: ',urlBack)
      if(urlBack !== undefined && urlBack !== '') {
        const myToastEl = document.getElementById(idToastaltaNoDatos);
        myToastEl.addEventListener("hidden.te.toast", () => {
          // do something...
          console.log("Accion posterior al cierre del toast");
          regresarDatosNumeros()
        });
        return console.log("return useEffect ",urlBack);
      }
    }, [urlBack]);
  
    return { loading, 
      idToastaltaNoDatos,
      initValuesAc,
      onSubmitAltaDatosNumeros, setUrlBack,
      buttonsGroup,
    };
}

export default useAltaDatosNumeros;