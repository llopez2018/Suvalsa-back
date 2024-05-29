// AccordionMap.jsx
import React from "react";

const AccordionMap = ({ titulo, idTarget, expanded, onClick, children }) => {
    return (
        <div id={idTarget}>
            <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="mb-0" id={`heading-${idTarget}`}>
                    <button
                        className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white"
                        type="button"
                        onClick={onClick}
                        aria-expanded={expanded}
                        aria-controls={idTarget}
                    >
                        {titulo}
                        <span className={`-mr-1 ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out ${expanded ? "rotate-[-180deg] fill-[#336dec]" : "rotate-0 fill-[#212529]"}`}>
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
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </span>
                    </button>
                </h2>
                <div
                    id={idTarget}
                    className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${expanded ? "max-h-screen" : "max-h-0"}`}
                    aria-labelledby={`heading-${idTarget}`}
                >
                    <div className="px-5 py-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AccordionMap;
