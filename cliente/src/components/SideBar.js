import React from "react";
import { slide as Menu } from "react-burger-menu";
const SideBar = () => {
  return (
    <Menu width={"250px"} customCrossIcon={false}>
      <a className="menu-item" href="/">
        Inicio
      </a>
      <a className="menu-item" href="/empleos">
        Empleos
      </a>
      <a className="menu-item" href="/candidatos">
        Candidatos
      </a>
      <a className="menu-item" href="/clientes">
        Clientes
      </a>
      <a className="menu-item" href="/pagos">
        Pagos
      </a>
      <a className="menu-item" href="/competencias">
        Competencias
      </a>
      <a className="menu-item" href="/usuarios">
        Usuarios
      </a>
    </Menu>
  );
};

export default SideBar;
