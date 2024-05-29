import React from "react";
import { useField, Field } from "formik";

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full md:w-auto col-span-1 pt-2">
      <div className="relative h-14 md:h-10 w-full min-w-[100px]">
        <select {...field} {...props} />

        {label ? <label data-te-select-label-ref>{label}</label> : null}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-600 text-left">
          <span className="text-xs">{meta.error}</span>
        </div>
      ) : null}
    </div>
  );
};

export const SelectFile = (props) => {
  const { label, name, validateOnChange = false, onChangeAction } = props;
  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors, validateField } }) => {
        const error =
          (validateOnChange || touched[name]) &&
          typeof errors[name] === "string"
            ? errors[name]
            : null;

        const onChange = validateOnChange
          ? (e) => {
              if (validateOnChange) {
                validateField(field.name);
                if (onChangeAction) onChangeAction();
              }
              return field.onChange(e);
            }
          : field.onChange;

        return (
          <div className="w-full md:w-auto pt-2">
            <div className="relative h-14 md:h-10 w-full min-w-[100px]">
              <select className="h-14 md:h-10 text-base md:text-sm" {...field} {...props} onChange={onChange} />
              {label ? <label data-te-select-label-ref className="text-base md:text-sm">{label}</label> : null}
            </div>
            <div className="text-red-600 text-left">
              {error && <span className="text-xs">{error}</span>}
            </div>
          </div>
        );
      }}
    />
  );
};

export default Select;
