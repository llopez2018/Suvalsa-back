import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast,initTE } from "tw-elements";
import { AgregarInsumo } from "../../../Apis/FetchCatalogos";

const useAltaInsumo = (props) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [loading, setLoading] = useState(false);
  const [urlBack, setUrlBack] = useState('')
  const navegar = useNavigate();
  const idToastaltaInsu = "toastAltaInsu";

  const initValuesAc = {
    clave: "8030",
    nombre: "",
    modelo: "",
    uni: "",
    tipo: "",
    precio: "",
    minimo: "",
    maximo: ""
  };

  function regresarInsumos() {
      console.log("aqui regresa a cat insumo: ",urlBack);
      navegar(urlBack === undefined ? "/suvalsa/catalogos/insumos" : urlBack);
  }

  function ImprimirContrato() {
    console.log("clic imprimir contrato insumos: ");
  }

  async function mostrarResultadoAlta() {
    console.log(document.getElementById(idToastaltaInsu));
    const myToastAlta = document.getElementById(idToastaltaInsu);
    console.log(Toast.getInstance(myToastAlta));
    Toast.getOrCreateInstance(myToastAlta).show();
  }

  async function onSubmitAltaInsu(values, { resetForm }) {
    console.log("onsubmit....");
    setLoading(true)
    const datosInsu = {
      clave: values.clave,
      nombre: values.nombre,
      modelo: values.modelo,
      uni: values.uni,
      tipo: values.tipo,
      precio: values.precio,
      minimo: values.minimo,
      maximo: values.maximo,
    };
    await sleep(5000);
    await AgregarInsumo(datosInsu);
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
      action: regresarInsumos,
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
      const myToastEl = document.getElementById(idToastaltaInsu);
      myToastEl.addEventListener("hidden.te.toast", () => {
        // do something...
        console.log("Accion posterior al cierre del toast");
        regresarInsumos()
      });
      return console.log("return useEffect ",urlBack);
    }
  }, [urlBack]);

  return { loading, 
    idToastaltaInsu,
    initValuesAc,
    onSubmitAltaInsu, setUrlBack,
    buttonsGroup,
  };
};

export default useAltaInsumo;
