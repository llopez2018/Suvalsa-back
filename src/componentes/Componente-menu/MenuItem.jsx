import React from "react";

const MenuItem = (props) => {
  return (
    <li className="relative">
      {props.md === true ? (
        <a
          onClick={props.callToAction}
          className="Text-Menu"
          data-te-sidenav-link-ref
        >
          {props.subMenuLabel}
        </a>
      ) : (
        <a
          onClick={props.callToAction}
          className="Text-Menu"
          data-te-sidenav-link-ref
          data-te-sidenav-toggle-ref
          data-te-target={props.idSideNav}
          aria-controls={props.idSideNav}
          aria-haspopup="true"
        >
          {props.subMenuLabel}
        </a>
      )}
    </li>
  );
};

export default MenuItem;
