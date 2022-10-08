import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerCompetenciasAction } from "../../actions/competenciasActions";
import AccionesCompetencias from "./AccionesCompetencias";
const Competencias = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarCompetencias = () => dispatch(obtenerCompetenciasAction());
    cargarCompetencias();
    // eslint-disable-next-line
  }, []);

  const competencias = useSelector((state) => state.competencias.competencias);
  const error = useSelector((state) => state.competencias.error);
  return (
    <Fragment>
      <h1>Competencias</h1>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Rubro</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {competencias.length === 0
            ? "No hay Competencias"
            : competencias.map((competencia) => (
                <AccionesCompetencias
                  key={competencia.idCompetencia}
                  competencia={competencia}
                />
              ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Competencias;
