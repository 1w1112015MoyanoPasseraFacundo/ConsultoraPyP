import React, { Fragment, useEffect, useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  obtenerEmpleosAction,
  obtenerEmpleosFilterAction,
} from "../../actions/empleosActions";
import clienteAxios from "../../config/axios";
import Spinner from "../../syles/Spinner";
import AccionesEmpleos from "./AccionesEmpleos";
const Empleos = () => {
  const dispatch = useDispatch();

  const [nombre, guardarNombre] = useState("");
  const [idCliente, guardarCliente] = useState("");
  const [idRubro, guardarRubro] = useState("");
  const [idEstado, guardarEstado] = useState("");
  const [listaRubros, guardarRubros] = useState([]);
  const [listaClientes, guardarClientes] = useState([]);
  const [listaEstados, guardarEstados] = useState([]);

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
  const llenarRubro = async () => {
    const resultado = await clienteAxios.get(`/rubros`);
    guardarRubros(resultado.data);
  };
  const llenarCliente = async () => {
    const resultado = await clienteAxios.get(`/clientes`);
    guardarClientes(resultado.data);
  };
  const llenarEstado = async () => {
    const resultado = await clienteAxios.get(`/estados`);
    guardarEstados(resultado.data);
  };
  const buscar = (datos) => {
    console.log(datos);
    dispatch(obtenerEmpleosFilterAction(datos));
  };
  const filtrar = (e) => {
    e.preventDefault();
    buscar({
      nombre,
      idRubro,
      idCliente,
      idEstado,
    });
  };
  const empleos = useSelector((state) => state.empleos.empleos);
  console.log(empleos);
  const error = useSelector((state) => state.empleos.error);
  const cargando = useSelector((state) => state.empleos.loading);
  const empty = "";
  return (
    <Fragment>
      <h3 className="title-decorator">Vacantes a cubrir</h3>

      <div class="card card-form custom-card-shadow">
        <div class="card-body card-body-custom ">
          <form class="form-horizontal p-t-20" onSubmit={filtrar}>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    value={nombre}
                    placeholder="Descripción del empleo"
                    name="nombre"
                    onChange={(e) => guardarNombre(e.target.value)}
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <select
                    type="text"
                    class="form-control"
                    value={idCliente}
                    name="idCliente"
                    onClick={llenarCliente}
                    onChange={(e) => guardarCliente(e.target.value)}
                  >
                    <option value={empty}>Seleccione cliente...</option>
                    {listaClientes.map((cliente) => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <select
                    type="text"
                    class="form-control"
                    value={idRubro}
                    name="idRubro"
                    onClick={llenarRubro}
                    onChange={(e) => guardarRubro(e.target.value)}
                  >
                    <option value={empty}>Seleccione rubro...</option>
                    {listaRubros.map((rubro) => (
                      <option key={rubro.idRubro} value={rubro.idRubro}>
                        {rubro.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <select
                    type="text"
                    class="form-control"
                    value={idEstado}
                    name="idEstado"
                    onClick={llenarEstado}
                    onChange={(e) => guardarEstado(e.target.value)}
                  >
                    <option value={empty}>Seleccione estado...</option>
                    {listaEstados.map((estado) => (
                      <option key={estado.idEstado} value={estado.idEstado}>
                        {estado.nombre}
                      </option>
                    ))}
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
                  <button type="button" class="btn btn-dark" onClick={nuevo}>
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

      <div class="card custom-card-shadow">
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
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {error != null
              ? "No hay empleos"
              : empleos.map((empleo) => {
                  console.log(empleo);
                  return (
                    <AccionesEmpleos key={empleo.idEmpleo} empleo={empleo} />
                  );
                })}
          </tbody>
        </table>
      </div>
      {cargando ? <Spinner /> : null}
    </Fragment>
  );
};

export default Empleos;
