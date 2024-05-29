import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast, initTE } from "tw-elements";
import { AgregarAgente } from "../../../Apis/FetchCatalogos";
import { AgregarUsuario } from "../../../Apis/FetchUsers";

const useAltaAgente = (props) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [loading, setLoading] = useState(false);
  const [urlBack, setUrlBack] = useState("");
  const navegar = useNavigate();
  const idToastaltaAgen = "toastAltaAgen";

  const initValuesAc = {
    clave: "",
      nombre: "",
      puesto: "",
      tarjeta: "",
      domicilio: "",
      telefono: "",
      celular: "",
      licencia: "",
      curp: "",
      imss: "",
      mail: "",
      status: "",
      tipo: "",
      usuario: "",
      contrasena: "",
      confContrasena: "",
  };

  function regresarAgentes() {
    console.log("aqui regresa a cat Agente: ", urlBack);
    navegar(urlBack === undefined ? "/suvalsa/catalogos/personal" : urlBack);
  }

  function ImprimirContrato() {
    console.log("clic imprimir contrato agente: ");
  }

  async function mostrarResultadoAlta() {
    console.log(document.getElementById(idToastaltaAgen));
    const myToastAlta = document.getElementById(idToastaltaAgen);
    console.log(Toast.getInstance(myToastAlta));
    Toast.getOrCreateInstance(myToastAlta).show();
  }

  async function onSubmitAltaAgente(values, { resetForm }) {
    console.log("onsubmit....");
    setLoading(true);
    const datosProv = {
      clave: values.clave,
      nombre: values.nombre,
      puesto: values.puesto,
      tarjeta: values.tarjeta,
      domicilio: values.domicilio,
      telefono: values.telefono,
      celular: values.celular,
      licencia: values.licencia,
      curp: values.curp,
      imss: values.imss,
      mail: values.mail,
      status: values.status,
    };
    await sleep(5000);
    await AgregarAgente(datosProv);

    console.log('agregando usuario')
    const dataAuth = {
      name : values.nombre,
      user_name : values.nombre.split(' ')[0] ?? '',
      email : values.usuario,
      password : values.contrasena,
      type: values.tipo,
    }
    //se realiza el update /usuariosLogin/crear
    await AgregarUsuario(dataAuth);

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
      action: regresarAgentes,
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
      const myToastEl = document.getElementById(idToastaltaAgen);
      myToastEl.addEventListener("hidden.te.toast", () => {
        // do something...
        console.log("Accion posterior al cierre del toast");
        regresarAgentes();
      });
      return console.log("return useEffect ", urlBack);
    }
  }, [urlBack]);

  return {
    loading,
    idToastaltaAgen,
    initValuesAc,
    onSubmitAltaAgente,
    setUrlBack,
    buttonsGroup
  };
};

export default useAltaAgente;
