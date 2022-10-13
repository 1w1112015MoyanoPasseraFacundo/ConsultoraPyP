import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerClientesAction } from "../../actions/clientesActions";
import AccionesCliente from "./AccionesCliente";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nuevo = () => {
    navigate("/clientes/nuevo");
  };

  useEffect(() => {
    //consultar api

    const cargarClientes = () => dispatch(obtenerClientesAction());
    cargarClientes();
    // eslint-disable-next-line
  }, []);

  const clientes = useSelector((state) => state.clientes.clientes);
  console.log(clientes);
  return (
    <Fragment>
      <h3 className="title-decorator">Clientes</h3>
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
                        placeholder="Nombre del cliente"
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
                        placeholder="E-mail del cliente "
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
                {clientes.length === 0
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
