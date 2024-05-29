import React, { useState } from "react";
import Logistica from "../../imagenes/alacenamiento-logistico.jpg";
import Preview from "../../imagenes/preview-login.jpg"
import { getUsersByEmail } from "../../Apis/FetchUsers";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../utils/LocalStorage";
import CircleSpiner from "../../componentes/Spinners/CircleSpiner";
import CustomToast from "../../componentes/Toasts/CustomToast";
import { Toast } from "tw-elements";
import { InputText } from "../../componentes/Formik";
import { Formik, Form } from "formik";
import schemaCredenciales from "./SchemaLogin";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado para la carga
  const [msjLogin, setMsjLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para la visibilidad de la contraseña

  const idToastLogin = "toastLogin";

  const initValuesAdd = {
    username: "",
    password: ""
  };

  async function onSubmitLogin(values) {
    console.log("action Submit login");
    const credenciales = {
      username: values.username,
      password: values.password
    };

    setLoading(true); // Aquí se establece el estado `loading` a true

    const { dataEmail } = await getUsersByEmail(credenciales.username);
    console.log("dataEmail: ", dataEmail);
    setLoading(false); // Aquí se establece el estado `loading` a false
    //si existe el usuario
    if (dataEmail !== null && dataEmail.length > 0) {
      const email = dataEmail[0].email;
      const pw = dataEmail[0].password;
      console.log(email, "  - ", pw);
      if (
        credenciales.username.toLowerCase() === email.toLowerCase() &&
        credenciales.password === pw
      ) {
        setItem("user", dataEmail[0]);
        setItem("userName", dataEmail[0].name ?? '');
        navigate("/suvalsa/home");
      } else {
        await mostrarMsjLogin(
          "Credenciales incorrectas. Por Favor, Valida tu contraseña y usuario"
        );
      }
    } else {
      await mostrarMsjLogin(
        "Credenciales incorrectas. Por Favor, Valida tu nombre de usuario"
      );
    }
  }

  async function mostrarMsjLogin(msj) {
    setMsjLogin(msj);
    console.log(document.getElementById(idToastLogin));
    const myToastLogin = document.getElementById(idToastLogin);
    console.log(Toast.getInstance(myToastLogin));
    Toast.getOrCreateInstance(myToastLogin).show();
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-screen">
      {loading && <CircleSpiner />} {/* Spinner de carga */}
      <div className="flex justify-center lg:justify-between items-center h-full lg:px-8">
        <div className="hidden lg:flex lg:w-1/2 h-full justify-center items-center px-4 lg:pl-8">
          <img
            className="object-cover lg:max-w-4xl"
            src={Preview} // Sustituye con la ruta de tu imagen
            alt="Logistica Suvalsa"
          />
        </div>

        <div className="w-full max-w-md p-8">
          <CustomToast
            id={idToastLogin}
            title="Error de Autenticación"
            message={msjLogin}
            type="error"
          />
          <Formik
            initialValues={initValuesAdd}
            validationSchema={schemaCredenciales}
            onSubmit={onSubmitLogin}
          >

            {(props) => {
              const { isSubmitting } = props;
              //Segundo contendor
              return (
                <Form className="flex flex-col max-w-md bg-white p-6 rounded shadow-md gap-6">

                  <h2 className="text-2x1 m-2 font-bold">LOGIN SUVALSA</h2>
                  <div className="bg-indigo-300">
                    <img
                      className="object-cover h-48 w-96"
                      src={Logistica}
                      alt="Suvalsa"
                    ></img>
                  </div>
                  <div className="flex flex-col gap-4">
                    <InputText
                      disabled={isSubmitting}
                      label="Nombre de Usuario"
                      name="username"
                      type="email"
                      placeholder=""
                    />
                    <div className="relative">
                      <InputText
                        disabled={isSubmitting}
                        label="Contraseña"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-start gap-4">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn-primary w-full"
                    >
                      Iniciar Sesion
                    </button>
                  </div>

                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div >
  );
};

export default Login;
