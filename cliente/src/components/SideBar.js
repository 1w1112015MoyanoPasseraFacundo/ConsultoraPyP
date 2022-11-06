import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.login.login);

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
  const repo = () => {
    navigate("/reportes");
  };
  return (
    <Menu width={"250px"} customCrossIcon={false}>
      <img src={require("../assets/logowhite.png")} height="100px" />
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
      {usuario.rol == "Admin" ? (
        <a className="menu-item" onClick={pago}>
          Cobranzas
        </a>
      ) : null}

      <a className="menu-item" onClick={compe}>
        Habilidades
      </a>
      <a className="menu-item" onClick={usu}>
        Usuarios
      </a>
      <a className="menu-item" onClick={repo}>
        Reportes
      </a>
    </Menu>
  );
};

export default SideBar;
