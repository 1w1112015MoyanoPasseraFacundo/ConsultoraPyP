import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  darDeBajaCompetencia,
  getRubro,
  obtenerCompetenciaEditar,
} from "../../actions/competenciasActions";
import clienteAxios from "../../config/axios";
const AccionesCompetencias = ({ competencia }) => {
  const { idCompetencia, nombre, idRubro, nombreRubro } = competencia;
  const dispatch = useDispatch();

  const confirmarEliminar = (idCompetencia) => {
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
        dispatch(darDeBajaCompetencia(competencia.idCompetencia));
      }
    });
  };

  const navigate = useNavigate();

  const redireccionarEdicion = (competencia) => {
    dispatch(obtenerCompetenciaEditar(competencia));
    navigate(`editar/${competencia.idCompetencia}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>{nombreRubro}</td>

      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(competencia)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idCompetencia)}
        >
          Dar de baja
        </button>
      </td>
    </tr>
  );
};

export default AccionesCompetencias;
