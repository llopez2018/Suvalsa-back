// Initialization for ES Users
import { Collapse, Ripple, initTE } from "tw-elements";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteItem, getItem } from "../../utils/LocalStorage";

export default function InternalHeader({ hiddenMenu }) {
  const [userName] = useState(getItem("userName"));
  const navegar = useNavigate();

  function LogOut() {
    console.log("Click cerrandoSesion....");
    deleteItem("user");
    deleteItem("userName");
    navegar("/suvalsa/login");
  }

  useEffect(() => {
    initTE({ Collapse, Ripple });
  }, []);

  return (
    <header className="flex flex-col md:flex-row justify-between w-full gap-2">
      <div className="flex  justify-center items-baseline gap-1">
        {hiddenMenu &&
          <div
            className="md:w-24"
          >
          </div>
        }

        <span className="font-normal text-lg">Bienvenido a Suvalsa, </span>
        <span className="font-bold text-2xl"> {userName}</span>
        <span className="font-normal text-lg"></span>
      </div>

      <nav
        className="relative flex justify-end bg-transparent text-neutral-600 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
        data-te-navbar-ref
      >
        <div className="flex md:w-full flex-wrap items-center justify-between">
          <div
            className="!visible grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContentY"
            data-te-collapse-item
          >
            <ul
              className="mr-auto flex flex-row gap-4 items-center"
              data-te-navbar-nav-ref
            >
              <li className="mb-2 lg:mb-0" data-te-nav-item-ref>
                <button
                  onClick={() => navegar("/suvalsa/home")}
                  className="block transition duration-150 ease-in-out hover:text-primary-600 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white  [&.active]:text-black/90 cursor-pointer"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Dashboard Principal
                </button>
              </li>

              <li className="mb-2 lg:mb-0 pr-2" data-te-nav-item-ref>
                <button
                  onClick={() => LogOut()}
                  className="block transition duration-150 ease-in-out hover:text-primary-600 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white  [&.active]:text-black/90 cursor-pointer"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
