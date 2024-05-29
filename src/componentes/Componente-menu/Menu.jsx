import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

const Menu = (props) => {
  const navigate = useNavigate();
  const [mdMovil, setMdMovil] = useState(false);

  function navegar(pathStr) {
    navigate(pathStr);
  }

  function setIsMovil() {
    console.log("validando si es movil");
    let navegador = navigator.userAgent;
    console.log(navegador);
    if (window.innerWidth <= 767) {
      console.log("Es un móvil");
      setMdMovil(true);
    } else {
      setMdMovil(false);
    }
  }

  useEffect(() => {
    setIsMovil();
  }, []);

  return (
    <li className="relative">
      <a
        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none
         active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref
      >
        <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="blue"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d={props.svgPathD}
              clipRule="evenodd"
            />
          </svg>
        </span>

        <span>{props.tituloMenu}</span>
        <span
          className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
          data-te-sidenav-rotate-icon-ref
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </a>
      {props.submenuItems ? (
        <ul
          className="!visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
          data-te-sidenav-collapse-ref
        >
          {props.submenuItems.map((submenu) => (
            <MenuItem
              idSideNav={submenu.idSideNav}
              callToAction={() => {
                navegar(submenu.url);
              }}
              subMenuLabel={submenu.label}
              md={!mdMovil}
            />
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default Menu;
