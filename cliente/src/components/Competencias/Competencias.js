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
      <h3 className="title-decorator">Competencias</h3>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th className="colu" scope="col">Nombre</th>
            <th className="colu" scope="col">Rubro</th>
            <th className="colu" scope="col">Acciones</th>
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
