import * as Yup from "yup";

const MSJ_DATO_REQ = "Dato requerido";

const getCharacterValidationError = (str) => {
  return `Tu contraseña debe tener al menos ${str}`;
};

const schemaCredenciales = Yup.object({
  username: Yup.string().required(MSJ_DATO_REQ),
  password: Yup.string()
    .required(MSJ_DATO_REQ)
    // check minimum characters
    .min(8, "Tu contraseña debe tener al menos 8 caracteres")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("un digito"))
    .matches(/[a-z]/, getCharacterValidationError("una letra minúscula"))
    .matches(/[A-Z]/, getCharacterValidationError("una letra mayúscula"))
    .matches(
      "^(?=.*?[#?!@$%^&*-]).{8,}$",
      getCharacterValidationError("un caracter especial")
    )
});

export default schemaCredenciales;
