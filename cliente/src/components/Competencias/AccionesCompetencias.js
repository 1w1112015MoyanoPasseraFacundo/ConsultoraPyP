import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { obtenerCompetenciaEditar } from "../../actions/competenciasActions";
const AccionesCompetencias = ({ competencia }) => {
  const { idCompetencia, nombre, idRubro, nombreRubro } = competencia;
  const dispatch = useDispatch();
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
          title="Editar"
          onClick={() => redireccionarEdicion(competencia)}
        >
          <BsFillPencilFill />
        </button>
      </td>
    </tr>
  );
};

export default AccionesCompetencias;
