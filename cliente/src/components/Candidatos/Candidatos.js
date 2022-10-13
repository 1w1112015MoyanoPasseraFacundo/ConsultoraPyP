import React, { Fragment, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const nuevo = () => {
    navigate("/candidatos/nuevo");
  };

  const candidatos = useSelector((state) => state.candidatos.candidatos);
  console.log(candidatos);
  const error = useSelector((state) => state.candidatos.error);
  return (
    <Fragment>
      <h3 className="title-decorator">Candidatos</h3>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-form alert-dismissible">
            <div class="card-body card-body-custom">
              <form class="form-horizontal p-t-20">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombre"
                        placeholder="Nombre del candidato"
                        formControlName="nombre"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="descripcion"
                        placeholder="E-mail del candidato "
                        formControlName="descripcion"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="pull-right text-right">
                      <button type="submit" class="btn btn-primary">
                        <i class="mx-1 mr-2">
                          <BsSearch />
                        </i>
                        <span> Buscar</span>
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        class="btn btn-dark"
                        onClick={nuevo}
                      >
                        <i class="mx-1 mr-2">
                          <BsPlusLg />
                        </i>
                        <span> Nuevo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="card custom-card-shadow">
        <div class="row">
          <div class="col-lg-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="colu" scope="col">
                    Nombre
                  </th>
                  <th className="colu" scope="col">
                    País
                  </th>
                  <th className="colu" scope="col">
                    Documento
                  </th>
                  <th className="colu" scope="col">
                    E-mail
                  </th>
                  <th className="colu" scope="col">
                    Fecha de nacimiento
                  </th>
                  <th className="colu" scope="col">
                    Teléfono
                  </th>
                  <th className="colu" scope="col">
                    Acciones
                  </th>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Candidatos;
