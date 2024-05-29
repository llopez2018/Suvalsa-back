// Initialization for ES Users
import { Sidenav, initTE } from "tw-elements";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Estilos/Menu/Menu.css";
import { deleteItem } from "../../utils/LocalStorage";
import GenericButton from "../Button/GenericButton";
import Menu from "./Menu";
import { listaMenus } from './Navegacion'

const SideNavTe = ({ hiddenMenu, setMenuExpanded }) => {
  const navigate = useNavigate();

  initTE({ Sidenav });
  useEffect(() => {
    const sidenavElem = document.querySelector("#sideNavMenu");
    if (sidenavElem) Sidenav.getOrCreateInstance(sidenavElem);
  }, []);

  function navegar(pathStr) {
    navigate(pathStr);
  }

  return (
    <>
      <div
        className={`${hiddenMenu
          ? "realtive flex  bg-transparent p-4 h-12 top-2 z-auto"
          : "absolute md:relative md:flex col-span-1 bg-white p-1 h-screen top-0"
          }`}
      >
        <nav
          id="sideNavMenu"
          className="fixed left-0 top-0 z-[1035] h-screen w-1/5 min-w-[90vw] md:min-w-[25vw] bg-white -translate-x-full
          shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)]
          data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800 overflow-auto"
          data-te-sidenav-init
          data-te-sidenav-hidden="false"
          data-te-sidenav-mode="side"
          data-te-sidenav-content="#content"
          data-te-sidenav-slim="true"
        >
          <ul
            className="relative m-0 list-none px-[0.2rem] text-left"
            data-te-sidenav-menu-ref
          >
            <li className="relative">
              <button
                onClick={() => navegar("/suvalsa/home")}
                className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
              >
                <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 2.75A.75.75 0 013.75 2h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 2.75zm16.25 9a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75h-3.5v1a.75.75 0 01-.75.75h-10a.75.75 0 01-.75-.75v-1h-3.5a.75.75 0 01-.75-.75v-5.5a.75.75 0 01.75-.75h16.5zM3.75 13.5v4h15v-4h-15zM10.5 18.5h3v1h-3v-1zm6.25-11h-9.5a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5zm-9.5-4a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z"
                    />
                  </svg>
                </span>
                <span className="font-bold hover:underline">Suvalsa</span>
              </button>
            </li>

            {/* Menu Datos * */}
            <Menu
              tituloMenu="Datos"
              svgPathD='M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4-3.58 4-8 4-8-1.79-8-4m8.08 11H12c-4.42 0-8-1.79-8-4v3c0 2.21 3.58 4 8 4h.29a7.38 7.38 0 01-.29-2c0-.34.03-.67.08-1M20 12.08V9c0 2.21-3.58 4-8 4s-8-1.79-8-4v3c0 2.21 3.58 4 8 4h.69c1.13-2.37 3.53-4 6.31-4 .34 0 .67.03 1 .08m3.8 8.32c.1 0 .1.1 0 .2l-1 1.7c-.1.1-.2.1-.3.1l-1.2-.4c-.3.2-.5.3-.8.5l-.2 1.3c0 .1-.1.2-.2.2h-2c-.1 0-.2-.1-.3-.2l-.2-1.3c-.3-.1-.6-.3-.8-.5l-1.2.5c-.1 0-.2 0-.3-.1l-1-1.7c-.1-.1 0-.2.1-.3l1.1-.8v-1l-1.1-.8c-.1-.1-.1-.2-.1-.3l1-1.7c.1-.1.2-.1.3-.1l1.2.5c.3-.2.5-.3.8-.5l.2-1.3c0-.1.1-.2.3-.2h2c.1 0 .2.1.2.2l.2 1.3c.3.1.6.3.9.5l1.2-.5c.1 0 .3 0 .3.1l1 1.7c.1.1 0 .2-.1.3l-1.1.8v1l1.1.8M20.5 19c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5z'
              submenuItems={listaMenus.menuDatos}
            />
            {/* Menu Recolecciones  */}
            <Menu
              tituloMenu="Recolecciones"
              svgPathD='M20 8l-6-6H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z'
              submenuItems={listaMenus.menuRecolecciones}
            />
            {/* Menu Rutas */}
            <Menu
              tituloMenu="Rutas"
              svgPathD='M11 10H5L3 8l2-2h6V3l1-1 1 1v1h6l2 2-2 2h-6v2h6l2 2-2 2h-6v6a2 2 0 012 2H9a2 2 0 012-2V10z'
              submenuItems={listaMenus.menuRutas}
            />
            {/* Menu Gastos  */}
            <Menu
              tituloMenu="Gastos"
              svgPathD='M9.5 10.5H12a1 1 0 000-2h-1V8a1 1 0 00-2 0v.55a2.5 2.5 0 00.5 4.95h1a.5.5 0 010 1H8a1 1 0 000 2h1v.5a1 1 0 002 0v-.55a2.5 2.5 0 00-.5-4.95h-1a.5.5 0 010-1zM21 12h-3V3a1 1 0 00-.5-.87 1 1 0 00-1 0l-3 1.72-3-1.72a1 1 0 00-1 0l-3 1.72-3-1.72a1 1 0 00-1 0A1 1 0 002 3v16a3 3 0 003 3h14a3 3 0 003-3v-6a1 1 0 00-1-1zM5 20a1 1 0 01-1-1V4.73l2 1.14a1.08 1.08 0 001 0l3-1.72 3 1.72a1.08 1.08 0 001 0l2-1.14V19a3 3 0 00.18 1zm15-1a1 1 0 01-2 0v-5h2z'
              submenuItems={listaMenus.menuGastos}
            />
            {/* Menu Mantenimiento Vehicular  */}
            <Menu
              tituloMenu="Mantenimiento Vehuicular"
              svgPathD='M0 48C0 21.5 21.5 0 48 0h320c26.5 0 48 21.5 48 48v48h50.7c17 0 33.3 6.7 45.3 18.7l77.3 77.3c12 12 18.7 28.3 18.7 45.3V352c17.7 0 32 14.3 32 32s-14.3 32-32 32h-32c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H48c-26.5 0-48-21.5-48-48V48zm416 208h128v-18.7L466.7 160H416v96zM160 464c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48zm368-48c0-26.5-21.5-48-48-48s-48 21.5-48 48 21.5 48 48 48 48-21.5 48-48zM257 95c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H96c-13.3 0-24 10.7-24 24s10.7 24 24 24h166.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9L257 95z'
              submenuItems={listaMenus.menuMttoVehicular}
            />
            {/* Menu Manifiestos */}
            <Menu
              tituloMenu="Manifiesto"
              svgPathD='M20 8l-6-6H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z'
              submenuItems={listaMenus.menuManifiesto}
            />
            {/* Menu Cuentas por cobrar  */}
            <Menu
              tituloMenu="Cuentas por Cobrar"
              svgPathD='M20 22H4a1 1 0 01-1-1V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1zM8 9v2h8V9H8zm0 4v2h8v-2H8z'
              submenuItems={listaMenus.menuCuentasPcobrar}
            />
            {/* Menu Almacen  */}
            <Menu
              tituloMenu="Almacen"
              svgPathD='M20 9v11h-2v-9H2v9H0V9l10-4 10 4m-3 3H3v2h14v-2m0 3H3v2h14v-2m5 0v-5h2v5h-2m0 4v-2h2v2h-2z'
              submenuItems={listaMenus.menuAlmacen}
            />

            {/* Menu Catalogo */}
            <Menu
              tituloMenu="Catálogo"
              svgPathD='M11.986 23.972C5.411 23.972 0 18.561 0 11.986 0 5.411 5.411 0 11.986 0c6.575 0 11.986 5.411 11.986 11.986a11.9 11.9 0 01-2.492 7.281l2.062 2.062c.293.293.458.691.458 1.106 0 .859-.706 1.565-1.565 1.565-.415 0-.813-.165-1.106-.458l-2.062-2.062a11.9 11.9 0 01-7.281 2.492zm6.664-6.001a8.936 8.936 0 002.31-5.985c0-4.923-4.051-8.974-8.974-8.974-2.702 0-5.141 1.22-6.792 3.135h5.255v2.458H3.681a8.851 8.851 0 00-.536 1.844H9.22v2.459H3.06c.087.845.297 1.673.621 2.459h4.31v2.458H5.194c1.651 1.915 4.09 3.135 6.792 3.135 2.29 0 4.392-.877 5.985-2.31a1.59 1.59 0 01.679-.679zm-9.43-.146h7.376v-2.458H9.22v2.458zm6.147-4.917h4.917v-2.459h-4.917v2.459zm-4.918 0h3.074v-2.459h-3.074v2.459zm1.844-4.303h4.918V6.147h-4.918v2.458z'
              submenuItems={listaMenus.menuCatalogo}
            />
          </ul>
          <div className="relative pt-3">
            <GenericButton
              type="button"
              action={() => {
                deleteItem("user");
                navigate("/suvalsa/login");
              }}
              class={"btn-tertiary"}
              label={"Cerrar Sesión"}
            />
          </div>
        </nav>
        <div
          className="z-[1036] p-5 text-center flex relative top-[-55px] h-max  !pl-[290px] xl:pl-8 2xl:pl-28"
          id="content"
        >
          <button
            className="mt-10 rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-500 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            data-te-sidenav-toggle-ref
            data-te-target="#sideNavMenu"
            aria-controls="#sideNavMenu"
            aria-haspopup="true"
            onClick={(e) => {
              e.preventDefault()
              setMenuExpanded(hiddenMenu)
            }}
          >
            <span className="block [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

    </>
  );
};

export default SideNavTe;
