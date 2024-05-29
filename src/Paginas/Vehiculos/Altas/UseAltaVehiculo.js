import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Toast, initTE } from "tw-elements";
import { AgregarVehiculo } from "../../../Apis/FetchCatalogos";

const useAltaVehiculo = (props) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [loading, setLoading] = useState(false);
  const [urlBack, setUrlBack] = useState("");
  const navegar = useNavigate();
  const idToastaltaVehic = "toastAltaVehic";

  const initValuesAc = {
    clave: "",
    marca: "",
    modelo: "",
    anio: "",
    placas: "",
    chasis: "",
    motor: "",
    noine: "",
    permisosct: "",
    sust: "",
    arrastre: "",
    carga: "",
    dimCaja: "",
    dimUnidad: "",
    terMarca: "",
    terModelo: "",
    terSerie: "",
    rampaMarca: "",
    rampaCap: "",
    rampaSerie: "",
    cajaMarca: "",
    cajaTipo: "",
    cajaCap: "",
    cajaAcc: "",
    hidrolavadora: ""
  };

  function regresarVehiculos() {
    console.log("aqui regresa a cat Vehiculos: ", urlBack);
    navegar(urlBack === undefined ? "/suvalsa/catalogos/vehiculos" : urlBack);
  }

  function ImprimirContrato() {
    console.log("clic imprimir contrato vehiculo: ");
  }

  async function mostrarResultadoAlta() {
    console.log(document.getElementById(idToastaltaVehic));
    const myToastAlta = document.getElementById(idToastaltaVehic);
    console.log(Toast.getInstance(myToastAlta));
    Toast.getOrCreateInstance(myToastAlta).show();
  }

  async function onSubmitAltaVehiculo(values, { resetForm }) {
    console.log("onsubmit....");
    setLoading(true);
    const datosVehic = {
      CLAVE: values.clave,
      MARCA: values.marca,
      MODELO: values.modelo,
      AÑO: values.anio,
      PLACAS: values.placas,
      CHASIS: values.chasis,
      MOTOR: values.motor,
      NOINE: values.noine,
      SCT: values.permisosct,
      SUSTANCIAS: values.sust,
      ARRASTRE: values.arrastre,
      CARGA: values.carga,
      DIMCAJA: values.dimCaja,
      DIMUNIDAD: values.dimUnidad,
      TERMOMARCA: values.terMarca,
      TERMOMOD: values.terModelo,
      TERMOSERIE: values.terSerie,
      RAMPAMARCA: values.rampaMarca,
      RAMPACAP: values.rampaCap,
      RAMPASERIE: values.rampaSerie,
      CAJAMARCA: values.cajaMarca,
      CAJATIPO: values.cajaTipo,
      CAJACAP: values.cajaCap,
      CAJAACC: values.cajaAcc,
      HIDROLAV: values.hidrolavadora
    };
    await sleep(5000);
    await AgregarVehiculo(datosVehic);
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
      action: regresarVehiculos,
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
      const myToastEl = document.getElementById(idToastaltaVehic);
      myToastEl.addEventListener("hidden.te.toast", () => {
        // do something...
        console.log("Accion posterior al cierre del toast");
        regresarVehiculos();
      });
      return console.log("return useEffect ", urlBack);
    }
  }, [urlBack]);

  return {
    loading,
    idToastaltaVehic,
    initValuesAc,
    onSubmitAltaVehiculo,
    setUrlBack,
    buttonsGroup
  };
};

export default useAltaVehiculo;
