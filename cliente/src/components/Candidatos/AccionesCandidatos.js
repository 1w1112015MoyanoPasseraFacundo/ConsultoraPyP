import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  darDeBajaCandidato,
  obtenerCandidatoEditar,
  obtenerCandidatosAction,
} from "../../actions/candidatosActions";
import Moment from "moment";

const AccionesCandidatos = ({ candidato }) => {
  const {
    nombre,
    apellido,
    documento,
    idPais,
    telefono,
    mail,
    fechaNacimiento,
    idCandidato,
  } = candidato;
  const dispatch = useDispatch();
  const confirmarEliminar = (idCandidato) => {
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
        dispatch(darDeBajaCandidato(candidato.idCandidato));
      }
    });
  };

  const navigate = useNavigate();

  const redireccionarEdicion = (candidato) => {
    dispatch(obtenerCandidatoEditar(candidato));
    navigate(`editar/${candidato.idCandidato}`);
  };
  return (
    <tr>
      <td>
        {apellido}, {nombre}
      </td>
      <td>
        <span className="font-weight-bold">{idPais}</span>
      </td>
      <td>
        <span className="font-weight-bold">{documento}</span>
      </td>
      <td>
        <span className="font-weight-bold">{mail}</span>
      </td>
      <td>
        <span className="font-weight-bold">
          {Moment(fechaNacimiento).format("DD/MM/YYYY")}
        </span>
      </td>
      <td>
        <span className="font-weight-bold">{telefono}</span>
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
          onClick={() => confirmarEliminar(idCandidato)}
        >
          Dar de baja
        </button>
      </td>
    </tr>
  );
};

export default AccionesCandidatos;
