import React, { Fragment, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const nuevo = () => {
    navigate("/empleos/nuevo");
  };
  const empleos = useSelector((state) => state.empleos.empleos);
  console.log(empleos);
  const error = useSelector((state) => state.empleos.error);
  return (
    <Fragment>
      <h3 className="title-decorator">Empleos</h3>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-form alert-dismissible">
            <div class="card-body card-body-custom">
              <form class="form-horizontal p-t-20">
                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombre"
                        placeholder="Descripción del empleo"
                        formControlName="nombre"
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <select
                        type="text"
                        class="form-control"
                        id="descripcion"
                        placeholder="Cliente"
                        formControlName="descripcion"
                      >
                        <option placeholder="Cliente">Cliente</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <select
                        type="text"
                        class="form-control"
                        id="descripcion"
                        placeholder="Cliente"
                        formControlName="descripcion"
                      >
                        <option placeholder="Rubro"></option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <select
                        type="text"
                        class="form-control"
                        id="descripcion"
                        placeholder="Cliente"
                        formControlName="descripcion"
                      >
                        <option placeholder="Modalidad"></option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-12">
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
                    Descripción
                  </th>
                  <th className="colu" scope="col">
                    Cliente
                  </th>
                  <th className="colu" scope="col">
                    Rubro
                  </th>
                  <th className="colu" scope="col">
                    Modalidad
                  </th>
                  <th className="colu" scope="col">
                    Estado
                  </th>
                  <th className="colu" scope="col">
                    Competencias
                  </th>
                  <th className="colu" scope="col">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {empleos.length === 0
                  ? "No hay empleos"
                  : empleos.map((empleo) => {
                      console.log(empleo);
                      return (
                        <AccionesEmpleos
                          key={empleo.idEmpleo}
                          empleo={empleo}
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

export default Empleos;
