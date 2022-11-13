import React from "react";
import { slide as Menu } from "react-burger-menu";
import {
  BsCoin,
  BsCurrencyDollar,
  BsFillCalendarWeekFill,
  BsFillFilePersonFill,
  BsFillPersonFill,
  BsFillPersonLinesFill,
  BsFillPieChartFill,
  BsFolder,
  BsFolderFill,
  BsFunnelFill,
  BsGearFill,
  BsHouse,
  BsHouseDoorFill,
  BsHouseFill,
  BsPeopleFill,
  BsSearch,
  BsShieldFillCheck,
  BsTools,
  BsWrench,
} from "react-icons/bs";
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
  const rep = () => {
    navigate("/reporte1");
  };
  const bus = () => {
    navigate("/busqueda");
  };
  return (
    <Menu width={"284px"} customCrossIcon={false}>
      <a className="menu-item" href="/">
        <BsHouseDoorFill />
        &nbsp; Inicio
      </a>
      <a className="menu-item" onClick={emp}>
        <BsFolderFill />
        &nbsp; Empleos
      </a>
      <a className="menu-item" onClick={cand}>
        <BsPeopleFill />
        &nbsp; Candidatos
      </a>
      <a className="menu-item" onClick={clien}>
        <BsFillPersonLinesFill />
        &nbsp; Clientes
      </a>
      {usuario.rol == "Admin" ? (
        <a className="menu-item" onClick={pago}>
          <BsCurrencyDollar />
          &nbsp; Cobranzas
        </a>
      ) : null}
      <a className="menu-item pull-center text-center" onClick={compe}>
        <BsWrench />
        &nbsp; Habilidades
      </a>
      <a className="menu-item" onClick={usu}>
        <BsGearFill />
        &nbsp; Usuarios
      </a>
      <a className="menu-item" onClick={repo}>
        <BsFillCalendarWeekFill />
        &nbsp; Reportes
      </a>
      <a className="menu-item" onClick={rep}>
        <BsFillPieChartFill />
        &nbsp; Gráficos
      </a>
      <a className="menu-item" onClick={bus}>
        <BsSearch />
        &nbsp; Búsqueda
      </a>
    </Menu>
  );
};

export default SideBar;
