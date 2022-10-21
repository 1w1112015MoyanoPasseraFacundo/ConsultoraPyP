import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerClientesAction,
  obtenerClientesFilterAction,
} from "../../actions/clientesActions";
import AccionesCliente from "./AccionesCliente";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nombre, guardarNombre] = useState("");
  const [mail, guardarMail] = useState("");
  const [estado, guardarEstado] = useState("");

  const nuevo = () => {
    navigate("/clientes/nuevo");
  };
  const filtrar = (e) => {
    e.preventDefault();
    buscar({
      nombre,
      mail,
      estado,
    });
  };
  const buscar = (datos) => {
    dispatch(obtenerClientesFilterAction(datos));
  };
  useEffect(() => {
    //consultar api

    const cargarClientes = () => dispatch(obtenerClientesAction());
    cargarClientes();
    // eslint-disable-next-line
  }, []);

  const clientes = useSelector((state) => state.clientes.clientes);
  const error = useSelector((state) => state.clientes.error);
  console.log(error);
  console.log(clientes);
  return (
    <Fragment>
      <h3 className="title-decorator">Clientes</h3>

      <div class="card card-form alert-dismissible">
        <div class="card-body card-body-custom">
          <form class="form-horizontal p-t-20" onSubmit={filtrar}>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="nombre"
                    placeholder="Nombre del cliente"
                    value={nombre}
                    onChange={(e) => guardarNombre(e.target.value)}
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="mail"
                    placeholder="E-mail del cliente "
                    value={mail}
                    onChange={(e) => guardarMail(e.target.value)}
                  />
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <select
                    type="text"
                    class="form-control"
                    name="estado"
                    value={estado}
                    onChange={(e) => guardarEstado(e.target.value)}
                  >
                    <option hidden value="" disabled selected>
                      VIGENCIA
                    </option>
                    <option>TODOS</option>
                    <option>SI</option>
                    <option>NO</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
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
                    CUIT
                  </th>
                  <th className="colu" scope="col">
                    E-mail
                  </th>
                  <th className="colu" scope="col">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {error != null
                  ? "No hay candidatos"
                  : clientes.map((cliente) => {
                      return (
                        <AccionesCliente
                          key={cliente.idCliente}
                          cliente={cliente}
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

export default Clientes;
