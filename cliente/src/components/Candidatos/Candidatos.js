import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerCandidatosAction } from "../../actions/candidatosActions";
import AccionesCandidatos from "./AccionesCandidatos";
const Candidatos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //consultar api
    const cargarCandidatos = () => dispatch(obtenerCandidatosAction());
    cargarCandidatos();
    // eslint-disable-next-line
  }, []);

  const candidatos = useSelector((state) => state.candidatos.candidatos);
  return (
    <Fragment>
      <h1>Candidatos</h1>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.length === 0
            ? "No hay candidatos"
            : candidatos.map((candidato) => (
                <AccionesCandidatos
                  key={candidato.idUsuario}
                  candidato={candidato}
                />
              ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Candidatos;
