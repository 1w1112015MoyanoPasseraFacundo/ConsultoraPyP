import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const navigate = useNavigate();

  const cand = () => {
    navigate("/candidatos");
  };
  const compe = () => {
    navigate("/competencias");
  };
  const usu = () => {
    navigate("/usuarios");
  };
  const pago = () => {
    navigate("/pagos");
  };
  const clien = () => {
    navigate("/clientes");
  };
  const emp = () => {
    navigate("/empleos");
  };
  return (
    <Menu width={"250px"} customCrossIcon={false}>
      <img src={require("../assets/logo.png")} height="100px" />
      <a className="menu-item" href="/">
        Inicio
      </a>
      <a className="menu-item" onClick={emp}>
        Empleos
      </a>
      <a className="menu-item" onClick={cand}>
        Candidatos
      </a>
      <a className="menu-item" onClick={clien}>
        Clientes
      </a>
      <a className="menu-item" onClick={pago}>
        Pagos
      </a>
      <a className="menu-item" onClick={compe}>
        Competencias
      </a>
      <a className="menu-item" onClick={usu}>
        Usuarios
      </a>
    </Menu>
  );
};

export default SideBar;
