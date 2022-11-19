import React from "react";
import { useEffect } from "react";
import { BsChevronDown, BsPersonCircle, BsRecord } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUsuarioById,
  obtenerUsuarioEditar,
} from "../actions/usuariosActions";
import { cerrarSesion, usuarioAutenticado } from "../login/authActions";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const autenticado = useSelector((state) => state.login.autenticado);
  const usuario = useSelector((state) => state.login.login);

  useEffect(() => {
    dispatch(getUsuarioById(usuario.idUsuario));
    dispatch(usuarioAutenticado());
  }, [autenticado]);

  const onSubmit = () => {
    try {
      dispatch(cerrarSesion);
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {}
  };

  const usuAEdit = useSelector((state) => state.usuarios.editar);
  const onEdit = () => {
    let fecha = usuAEdit[0].fechaNacimiento.split("T");
    usuAEdit[0].fechaNacimiento = fecha[0];
    dispatch(obtenerUsuarioEditar(usuAEdit[0]));
    navigate(`/usuarios/editar/${usuario.idUsuario}`);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark justify-content-between header">
        <div className="contei">
          <img
            src={require("../assets/logowhite.png")}
            height="70px"
            alt="400"
          />
        </div>
        <div class="dropdown">
          <span class="dropbtn">
            <BsPersonCircle />
            &nbsp; {usuario.nombreUsuario}
            &nbsp;
            <BsChevronDown />
          </span>

          <div class="dropdown-content">
            <li className="sesionOut" onClick={onEdit}>
              <small>
                <i>
                  <BsRecord />
                </i>
              </small>
              &nbsp; Perfil
            </li>
            <li className="rolle">
              <small>
                <i>
                  <BsRecord />
                </i>
              </small>
              &nbsp; Rol: {usuario.rol}
            </li>
            <li onClick={onSubmit} className="sesionOut">
              <small>
                <i>
                  <BsRecord />
                </i>
              </small>
              &nbsp; Cerrar sesión
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
