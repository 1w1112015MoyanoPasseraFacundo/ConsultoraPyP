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
        <span>{telefono}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={() => redireccionarEdicion(usuario)}
        >
          <BsFillPencilFill />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idUsuario)}
        >
          <BsTrashFill />
        </button>
      </td>
    </tr>
  );
};

export default AccionesUsuarios;
