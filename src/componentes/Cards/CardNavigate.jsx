import React, { useEffect } from "react";
// Initialization for ES Users
import { Ripple, initTE } from "tw-elements";
import EtiquetaPagina from "../Funcionales/EtiquetaPagina";

const CardNavigate = (props) => {
  useEffect(() => {
    initTE({ Ripple });
  }, []);
  return (
    <>
      <div className="block w-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mt-2">
        <EtiquetaPagina texto={props.title}/>
        <div className="px-2 pb-2">
            { props.subtitle ? <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {props.subtitle}
              </h5> : ''
            }
            {
                props.description ? 
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {props.description}
                </p>
                : ''
            }
            {
                props.children ? (
                <>  { props.children}
                </>
                ) : ''
            }
          {
           props.callback && props.callback.action ? 
                <button onClick={props.callback.action}
                type="button"
                href="#"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                >
                    {props.callback.text}
                </button> : ''
          }
          
        </div>
      </div>
    </>
  );
};

export default CardNavigate;
