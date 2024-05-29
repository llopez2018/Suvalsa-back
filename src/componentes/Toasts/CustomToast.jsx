import React from "react";
import { Toast, initTE } from "tw-elements";

const CustomToast = (props) => {
  initTE({ Toast });
  //bandera que indica si el tipo de mensaje es de error o no
  const tipoError = props.type === "error";
  const classDivContent =
    tipoError
      ? "fixed z-[999] inset-x-0 top-[1.875rem] pointer-events-auto mx-auto mb-4 hidden w-96 max-w-full rounded-lg bg-danger-100 bg-clip-padding text-sm text-danger-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
      : "fixed z-[999] inset-x-0 top-[1.875rem] pointer-events-auto mx-auto mb-4 hidden w-96 max-w-full rounded-lg bg-success-100 bg-clip-padding text-sm text-success-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden";
  const pColor =
    tipoError
      ? "flex items-center font-bold text-danger-700"
      : "flex items-center font-bold text-success-700";
  const classDivTitle =
    tipoError
      ? "flex items-center justify-between rounded-t-lg border-b-2 border-danger-200 bg-danger-100 bg-clip-padding px-4 pb-2 pt-2.5 text-danger-700"
      : "flex items-center justify-between rounded-t-lg border-b-2 border-success/20 bg-success-100 bg-clip-padding px-4 pb-2 pt-2.5";
  const classDivMsj =
    tipoError
      ? "break-words rounded-b-lg bg-danger-100 px-4 py-4 text-danger-700"
      : "break-words rounded-b-lg bg-success-100 px-4 py-4 text-success-700";
  const iconError = () => {
    return (
      <span className="mr-2 h-4 w-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };
  const iconInfo = () => {
    return (
      <span className="mr-2 h-4 w-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };
  return (
    <div
      className={classDivContent}
      id={props.id}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-te-autohide={props.autohide ? props.autohide : "true" }
      data-te-animation
      data-te-class-fade-in="animate-[fade-in-down_1s_ease-in-out]"
      data-te-class-fade-out="animate-[slide-out-down_3s_ease-in-out]"
      data-te-toast-init
      data-te-toast-hide
    >
      <div className={classDivTitle}>
        <p className={pColor}>
          {tipoError ? iconError() : iconInfo()}
          {props.title}
        </p>
        <div className="flex items-center">
          <button
            type="button"
            className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-toast-dismiss
            aria-label="Close"
          >
            <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className={classDivMsj}>
        <span className="p-2">{props.message}</span>
      </div>
    </div>
  );
};

export default CustomToast;
