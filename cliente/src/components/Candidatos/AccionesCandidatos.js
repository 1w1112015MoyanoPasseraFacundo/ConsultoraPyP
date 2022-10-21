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
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

const AccionesCandidatos = ({ candidato }) => {
  const {
    nombre,
    apellido,
    documento,
    idPais,
    nombrePais,
    estado,
    telefono,
    mail,
    fechaNacimiento,
    idCandidato,
    lstCompes,
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
    console.log(candidato);
    navigate(`editar/${candidato.idCandidato}`);
  };
  return (
    <tr>
      <td>
        {apellido}, {nombre}
      </td>

      <td>
        <span>{documento}</span>
      </td>
      <td>
        <span>{mail}</span>
      </td>
      <td>
        <span>{Moment(fechaNacimiento).format("DD/MM/YYYY")}</span>
      </td>
      <td>
        <span>{estado}</span>
      </td>
      <td>
        <span>{telefono}</span>
      </td>

      <td className="acciones">
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={() => redireccionarEdicion(candidato)}
        >
          <BsFillPencilFill />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idCandidato)}
        >
          <BsTrashFill />
        </button>
      </td>
    </tr>
  );
};

export default AccionesCandidatos;
