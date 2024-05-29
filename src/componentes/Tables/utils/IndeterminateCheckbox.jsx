import { useEffect, useRef } from "react";

function IndeterminateCheckbox(props) {
    const { indeterminate, className = "", ...rest } = { ...props };
  
    const ref = useRef();
  
    useEffect(() => {
      if (typeof indeterminate === "boolean") {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }, [ref, indeterminate]);
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + " cursor-pointer"}
        {...rest}
      />
    );
  }

  export default IndeterminateCheckbox