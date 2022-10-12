import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEmpleosAction } from "../../actions/empleosActions";
import AccionesEmpleos from "./AccionesEmpleos";
const Empleos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //consultar api

    const cargarEmpleos = () => dispatch(obtenerEmpleosAction());
    cargarEmpleos();
    // eslint-disable-next-line
  }, []);

  const empleos = useSelector((state) => state.empleos.empleos);
  console.log(empleos);
  const error = useSelector((state) => state.empleos.error);
  return (
    <Fragment>
      <h3 className="title-decorator">Empleos</h3>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th className="colu" scope="col">Descripción</th>
            <th className="colu" scope="col">Cliente</th>
            <th className="colu" scope="col">Rubro</th>
            <th className="colu" scope="col">Modalidad</th>
            <th className="colu" scope="col">Estado</th>
            <th className="colu" scope="col">Competencias</th>
            <th className="colu" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleos.length === 0
            ? "No hay empleos"
            : empleos.map((empleo) => {
                console.log(empleo);
                return (
                  <AccionesEmpleos key={empleo.idEmpleo} empleo={empleo} />
                );
              })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Empleos;
