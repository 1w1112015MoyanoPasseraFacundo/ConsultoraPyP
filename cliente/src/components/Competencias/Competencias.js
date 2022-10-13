import React, { Fragment, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { obtenerCompetenciasAction } from "../../actions/competenciasActions";
import AccionesCompetencias from "./AccionesCompetencias";
const Competencias = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarCompetencias = () => dispatch(obtenerCompetenciasAction());
    cargarCompetencias();
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();

  const nuevo = () => {
    navigate("/competencias/nuevo");
  };
  const competencias = useSelector((state) => state.competencias.competencias);
  const error = useSelector((state) => state.competencias.error);
  return (
    <Fragment>
      <h3 className="title-decorator">Competencias</h3>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-form alert-dismissible">
            <div class="card-body card-body-custom">
              <form class="form-horizontal p-t-20">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombre"
                        placeholder="Nombre de la competencia"
                        formControlName="nombre"
                      />
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group"></div>
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
                    Rubro
                  </th>
                  <th className="colu" scope="col">
                    Acciones
                  </th>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Competencias;
