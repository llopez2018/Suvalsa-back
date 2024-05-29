import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast,initTE } from "tw-elements";
import { AgregarProveedor } from "../../../Apis/FetchCatalogos";

const useAltaProveedor = (props) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [loading, setLoading] = useState(false);
  const [urlBack, setUrlBack] = useState('')
  const navegar = useNavigate();
  const idToastaltaProv = "toastAltaProv";

  const initValuesAc = {
    clave: "8030",
    empresa: "",
    calle: "",
    colonia: "",
    ciudad: "",
    cp: "",
    contacto: "",
    telefono: ""
  };

  function regresarProveedor() {
      console.log("aqui regresa a cat proveedor: ",urlBack);
      navegar(urlBack === undefined ? "/suvalsa/catalogos/proveedores" : urlBack);
  }

  function ImprimirContrato() {
    console.log("clic imprimir contrato proveedor: ");
  }

  async function mostrarResultadoAlta() {
    console.log(document.getElementById(idToastaltaProv));
    const myToastAlta = document.getElementById(idToastaltaProv);
    console.log(Toast.getInstance(myToastAlta));
    Toast.getOrCreateInstance(myToastAlta).show();
  }

  async function onSubmitAltaProv(values, { resetForm }) {
    console.log("onsubmit....");
    setLoading(true)
    const datosProv = {
      clave: values.clave,
      empresa: values.empresa,
      trial_calle_3: values.calle,
      colonia: values.colonia,
      ciudad: values.ciudad,
      cp: values.cp,
      telefono: values.telefono,
      fax: "",
      contacto: values.contacto,
      especial: "",
      mail: "",
      trial_web_12: ""
    };
    await AgregarProveedor(datosProv);
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
      action: regresarProveedor,
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
      const myToastEl = document.getElementById(idToastaltaProv);
      myToastEl.addEventListener("hidden.te.toast", () => {
        // do something...
        console.log("Accion posterior al cierre del toast");
        regresarProveedor()
      });
      return console.log("return useEffect ",urlBack);
    }
  }, [urlBack]);

  return { loading, 
    idToastaltaProv,
    initValuesAc,
    onSubmitAltaProv, setUrlBack,
    buttonsGroup,
  };
};

export default useAltaProveedor;
