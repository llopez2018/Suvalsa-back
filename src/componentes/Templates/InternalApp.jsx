import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/LocalStorage";
import SideNavTe from "../Componente-menu/SideNavTe";
import InternalHeader from "../Header/InternalHeader";

const InternalApp = ({ datosProteccion }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getItem("user"));

  const [menuExpanded, setMenuExpanded] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  console.log("datosProteccion:: ", datosProteccion);

  const actionExpandedMenu = (flag) => {
    setMenuExpanded(flag);
    setIsHidden(!flag);
  };
  useEffect(() => {
    console.log(menuExpanded);
    console.log(isHidden);
  }, [menuExpanded, isHidden]);

  useEffect(() => {
    if (!user) {
      console.log("User NOT found");
      navigate("/suvalsa/login");
    }
  }, [user]);

  //se valida si esta permitido el acceso hacia la url solo se guarda el path LS para futuros usos, si no se redirige a la pagina por defecto (inicio)
  if (!datosProteccion.permitido) {
    console.log("You are NOT allowed to navigate at this page...");
    return <Navigate to={datosProteccion.redireccion} />;
  } else {
    console.log("You are allowed to navigate at this page...");
  }

  return (
    <div
      className={`grid grid-cols-1  ${
        menuExpanded ? "lg:grid-cols-4" : "lg:grid-cols-3"
      } md:grid-cols-3 gap-2 items-center justify-center`}
    >
      {user && (
        <>
          <SideNavTe
            hiddenMenu={isHidden}
            setMenuExpanded={actionExpandedMenu}
          />

          <div className="col-span-1 lg:col-span-3  md:col-span-2 h-screen p-1">
            <div className="flex justify-end items-center bg-white h-[9vh] md:h-20 w-full text-black p-2 gap-2 shadow-lg m-1">
              {
                <InternalHeader
                  hiddenMenu={isHidden}
                />
              }
            </div>
            <div className="flex flex-col items-start bg-slate-100 min-h-[90vh] md:min-h-[85vh] w-full md:px-2">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InternalApp;
