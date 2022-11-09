import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  darDeBajaUsuario,
  obtenerUsuarioEditar,
} from "../../actions/usuariosActions";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

const AccionesUsuarios = ({ usuario }) => {
  const {
    nombre,
    apellido,
    mail,
    telefono,
    documento,
    idUsuario,
    nombreUsuario,
    fechaSalida,
    password,
  } = usuario;
  const dispatch = useDispatch();
  const confirmarEliminar = (idUsuario) => {
    console.log(idUsuario);
    Swal.fire({
      title: "Está seguro que desea dar de baja este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(idUsuario);
        dispatch(darDeBajaUsuario(idUsuario));
      }
    });
  };

  const navigate = useNavigate();

  const redireccionarEdicion = (usuario) => {
    console.log(usuario);
    dispatch(obtenerUsuarioEditar(usuario));
    navigate(`editar/${usuario.idUsuario}`);
  };

  return (
    <tr>
      <td>
        {apellido}, {nombre}
      </td>
      <td>
        <span>{nombreUsuario}</span>
      </td>
      <td>
        <span>{documento}</span>
      </td>

      <td>
        <span>{mail}</span>
      </td>
      <td>
        <span>{fechaSalida ? "NO" : "SI"}</span>
      </td>
      <td>
        <span>{telefono}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-success mr-2"
          title="Editar"
          onClick={() => redireccionarEdicion(usuario)}
        >
          <BsFillPencilFill />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          title="Dar de baja"
          onClick={() => confirmarEliminar(idUsuario)}
        >
          <BsTrashFill />
        </button>
      </td>
    </tr>
  );
};

export default AccionesUsuarios;
