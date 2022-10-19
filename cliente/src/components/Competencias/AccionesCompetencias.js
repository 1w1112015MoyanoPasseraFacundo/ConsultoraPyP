import React, { useEffect, useState } from "react";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
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
          className="btn btn-success mr-2"
          onClick={() => redireccionarEdicion(competencia)}
        >
          <BsFillPencilFill />
        </button>
        {/* <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idCompetencia)}
        >
          <BsTrashFill />
        </button> */}
      </td>
    </tr>
  );
};

export default AccionesCompetencias;
