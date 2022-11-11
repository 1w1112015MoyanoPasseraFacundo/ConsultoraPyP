import React from "react";
import { useEffect } from "react";
import {
  BsArrowDown,
  BsArrowDownShort,
  BsChevronDown,
  BsCircle,
  BsPersonCircle,
  BsRecord,
  BsRecordFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cerrarSesion, usuarioAutenticado } from "../login/authActions";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const autenticado = useSelector((state) => state.login.autenticado);
  console.log(autenticado);
  useEffect(() => {
    dispatch(usuarioAutenticado());
  }, [autenticado]);
  const onSubmit = () => {
    try {
      dispatch(cerrarSesion);
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {}
  };
  const usuario = useSelector((state) => state.login.login);
  console.log(usuario);
  console.log(autenticado);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark justify-content-between header">
      <div className="container">
        <h1 className="titulo">Consultora PP</h1>
      </div>
      <div class="dropdown">
        <span class="dropbtn">
          <BsPersonCircle />
          &nbsp; {usuario.nombreUsuario}
          &nbsp;
          <BsChevronDown />
        </span>

        <div class="dropdown-content">
          <li href="#">
            <small>
              <i>
                <BsRecord />
              </i>
            </small>
            &nbsp; Perfil
          </li>
          <li href="#">
            <small>
              <i>
                <BsRecord />
              </i>
            </small>
            &nbsp; Cambiar contraseña
          </li>
          <li href="#">
            <a onClick={onSubmit}>
              <small>
                <i>
                  <BsRecord />
                </i>
              </small>
              &nbsp; Cerrar sesión
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Header;
