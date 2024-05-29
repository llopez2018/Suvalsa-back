import React from 'react'
import { Field, useField } from 'formik';

const InputText = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);


  return (
    <div className="w-full md:w-auto pt-2">
      <div className="relative h-14 md:h-10 w-full min-w-[100px]">

        <input className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-base md:text-sm font-normal text-blue-gray gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 ${label ? 'focus:border-t-transparent' : ''} focus:outline-0 disabled:border-0 disabled:bg-gray-100 disabled:text-gray-600`}
          {...field} {...props} />

        {
          label ?
            <label className="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-base md:text-sm text-gray-400 font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-red peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {label}
            </label> : ''
        }
      </div>
      <div className="text-red-600 text-left">
        {(meta.validateOnChange || meta.touched) && meta.error ? (
          <span className='text-xs'>{meta.error}</span>
        ) : null}
      </div>
    </div>
  );
};

// Just to make informed-like Field with `validateOnChange`
// Never mind
export function InputField(props) {
  const { label, className, name, validateOnChange = false, onChangeAction, ...rest } = props;

  // validateField
  return (
    <Field
      name={name}
      {...rest}
      render={({ field, form: { touched, errors, validateField } }) => {
        const error =
          (validateOnChange || touched[name]) &&
            typeof errors[name] === "string"
            ? errors[name]
            : null;

        const onChange = validateOnChange
          ? e => {
            if (validateOnChange) {
              validateField(field.name);
              if (onChangeAction)
                onChangeAction();
            }
            return field.onChange(e);
          }
          : field.onChange;

        return (
          <div className="w-full md:w-auto pt-2">
            <div className="relative h-14 md:h-10 w-full min-w-[100px]">

              <input className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-base md:text-sm font-normal text-blue-gray gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 ${label ? 'focus:border-t-transparent' : ''} focus:outline-0 disabled:border-0 disabled:bg-gray-100 disabled:text-gray-600`}
                {...field} {...props} onChange={onChange} />

              {
                label ?
                  <label className="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-base md:text-sm text-gray-400 font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-red peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    {label}
                  </label> : ''
              }
            </div>
            <div className="text-red-600 text-left">
              {error && <span className='text-xs'>{error}</span>
              }
            </div>
          </div>
        );
      }}
    />
  );
}

export function InputFieldV2(props) {
  const { label, className, name, validateOnChange = false, onChangeAction, ...rest } = props;

  // validateField
  return (
    <Field
      name={name}
      {...rest}
      render={({ field, form: { touched, errors, validateField } }) => {
        const error =
          (validateOnChange || touched[name]) &&
            typeof errors[name] === "string"
            ? errors[name]
            : null;

        return (
          <div className="w-full md:w-auto pt-2">
            <div className="relative h-14 md:h-10 w-full min-w-[100px]">

              <input className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-base md:text-sm font-normal text-blue-gray gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 ${label ? 'focus:border-t-transparent' : ''} focus:outline-0 disabled:border-0 disabled:bg-gray-100 disabled:text-gray-600`}
                {...field} {...props} />

              {
                label ?
                  <label className="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-base md:text-sm text-gray-400 font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-red peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    {label}
                  </label> : ''
              }
            </div>
            <div className="text-red-600 text-left">
              {error && <span className='text-xs'>{error}</span>
              }
            </div>
          </div>
        );
      }}
    />
  );
}

export default InputText
