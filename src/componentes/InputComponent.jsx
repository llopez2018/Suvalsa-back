import React from 'react';

const InputComponent = (props) => {
  return(
    <div className='flex select-none items-left pl-3 text-gray-500 sm:text-sm'>
      <label htmlFor={props.id}>{props.label}</label>
      <input
      type={props.type}
      id={props.id}
      className={props.classNameInput}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      />
    </div>
  );
};

export default InputComponent;