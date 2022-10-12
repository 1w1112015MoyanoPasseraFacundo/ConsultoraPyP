import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerCandidatosAction } from "../../actions/candidatosActions";
import { obtenerEmpleosAction } from "../../actions/empleosActions";
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
  console.log(candidatos);
  const error = useSelector((state) => state.candidatos.error);
  return (
    <Fragment>
      <h3 className="title-decorator">Candidatos</h3>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th className="colu" scope="col">Nombre</th>
            <th className="colu" scope="col">País</th>
            <th className="colu" scope="col">Documento</th>
            <th className="colu" scope="col">E-mail</th>
            <th className="colu" scope="col">Fecha de nacimiento</th>
            <th className="colu" scope="col">Teléfono</th>
            <th className="colu" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.length === 0
            ? "No hay candidatos"
            : candidatos.map((candidato) => {
                let fecha = candidato.fechaNacimiento.split("T");
                candidato.fechaNacimiento = fecha[0];
                console.log(candidato);
                return (
                  <AccionesCandidatos
                    key={candidato.idCandidato}
                    candidato={candidato}
                  />
                );
              })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Candidatos;
