import React, { Fragment, useEffect, useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  obtenerCompetenciasAction,
  obtenerCompetenciasFilterAction,
} from "../../actions/competenciasActions";
import clienteAxios from "../../config/axios";
import AccionesCompetencias from "./AccionesCompetencias";
const Competencias = () => {
  const dispatch = useDispatch();
  const [nombre, guardarNombre] = useState("");
  const [idRubro, guardarRubro] = useState("");
  const [listaRubros, guardarRubros] = useState([]);

  useEffect(() => {
    const cargarCompetencias = () => dispatch(obtenerCompetenciasAction());
    cargarCompetencias();
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();
  const buscar = (datos) => {
    console.log(datos);
    dispatch(obtenerCompetenciasFilterAction(datos));
  };
  const filtrar = (e) => {
    e.preventDefault();
    buscar({
      nombre,
      idRubro,
    });
  };
  const nuevo = () => {
    navigate("/competencias/nuevo");
  };
  const llenarRubro = async () => {
    const resultado = await clienteAxios.get(`/rubros`);
    guardarRubros(resultado.data);
  };
  const competencias = useSelector((state) => state.competencias.competencias);
  console.log(competencias);
  const error = useSelector((state) => state.competencias.error);
  console.log(error);
  // const cargando = useSelector((state) => state.competencias.loading);
  const empty = "";
  return (
    <Fragment>
      <h3 class="title-decorator">Competencias</h3>

      {/* {cargando ? <p className="text-center">Cargando...</p> : null} */}
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-form alert-dismissible">
            <div class="card-body card-body-custom">
              <form class="form-horizontal p-t-20" onSubmit={filtrar}>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        value={nombre}
                        placeholder="Nombre de la competencia"
                        name="nombre"
                        onChange={(e) => guardarNombre(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <select
                        type="text"
                        class="form-control"
                        value={idRubro}
                        placeholder="Rubro"
                        name="idRubro"
                        onClick={llenarRubro}
                        onChange={(e) => guardarRubro(e.target.value)}
                      >
                        <option value={empty}>Seleccione...</option>
                        {listaRubros.map((rubro) => (
                          <option key={rubro.idRubro} value={rubro.idRubro}>
                            {rubro.nombre}
                          </option>
                        ))}
                      </select>
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
            <table class="table table-hover">
              <thead>
                <tr>
                  <th class="colu" scope="col">
                    Nombre
                  </th>
                  <th class="colu" scope="col">
                    Rubro
                  </th>
                  <th class="colu" scope="col">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {error != null
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
