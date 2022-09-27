import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  darDeBajaCandidato,
  obtenerCandidatosAction,
} from "../../actions/candidatosActions";

const AccionesCandidatos = ({ candidato }) => {
  const { nombre, apellido, fechaNacimiento, idUsuario } = candidato;
  const dispatch = useDispatch();
  const confirmarEliminar = (idUsuario) => {
    Swal.fire({
      title: "Está seguro que desea dar de baja este candidato?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(darDeBajaCandidato(idUsuario));
      }
    });
  };

  const navigate = useNavigate();

  const redireccionarEdicion = (candidato) => {
    dispatch(obtenerCandidatosAction(candidato));
    navigate(`candidato/editar/${candidato.idUsuario}`);
  };
  return (
    <tr>
      <td>
        {apellido}, {nombre}
      </td>
      <td>
        <span className="font-weight-bold">{fechaNacimiento}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(candidato)}
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

export default AccionesCandidatos;
