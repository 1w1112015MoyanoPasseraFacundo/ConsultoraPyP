import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  darDeBajaUsuario,
  obtenerUsuariosAction,
} from "../../actions/usuariosActions";

const AccionesUsuarios = ({ usuario }) => {
  const { nombre, apellido, cuil, idUsuario } = usuario;
  const dispatch = useDispatch();
  const confirmarEliminar = (idUsuario) => {
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
        dispatch(darDeBajaUsuario(idUsuario));
      }
    });
  };

  const navigate = useNavigate();

  const redireccionarEdicion = (usuario) => {
    dispatch(obtenerUsuariosAction(usuario));
    navigate(`usuario/editar/${usuario.idUsuario}`);
  };

  return (
    <tr>
      <td>
        {apellido}, {nombre}
      </td>
      <td>
        <span className="font-weight-bold">{cuil}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(usuario)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idUsuario)}
        >
          Dar de baja
        </button>
      </td>
    </tr>
  );
};

export default AccionesUsuarios;
