import React from "react";

const CircleSpiner = () => {
  return (
    <>
      <div className="fixed z-50 p-0 m-0 top-0 left-0 w-full h-full">
        <div
          className="inline-block h-8 w-8 fixed z-50 top-1/2 left-1/2 -ml-[3.125rem] animate-[spinner-grow_0.7s_linear_infinite] bg-current rounded-full align-[-0.125em] motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-primary"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div
          className="inline-block h-8 w-8 fixed z-50 top-1/2 left-1/2 -ml-[1rem] animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-primary"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div
          className="inline-block h-8 w-8 top-1/2 left-1/2 fixed z-50 ml-[1rem] animate-[spinner-grow_0.8s_linear_infinite] bg-current rounded-full align-[-0.125em] motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-primary"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
};

export default CircleSpiner;
