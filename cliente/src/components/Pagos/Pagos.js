import React, { Fragment, useEffect, useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  obtenerPagosAction,
  obtenerPagosFilterAction,
} from "../../actions/pagosActions";
import clienteAxios from "../../config/axios";
import Spinner from "../../syles/Spinner";
import AccionesPagos from "./AccionesPagos";
const Pagos = () => {
  const dispatch = useDispatch();
  const [idCliente, guardarCliente] = useState("");
  const [estado, guardarEstado] = useState("");
  const [listaClientes, guardarClientes] = useState([]);
  useEffect(() => {
    //consultar api

    const cargarPagos = () => dispatch(obtenerPagosAction());
    cargarPagos();
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();

  const llenarCliente = async () => {
    const resultado = await clienteAxios.get(`/clientes`);
    guardarClientes(resultado.data);
  };
  const buscar = (datos) => {
    console.log(datos);
    dispatch(obtenerPagosFilterAction(datos));
  };
  const filtrar = (e) => {
    e.preventDefault();
    buscar({
      idCliente,
      estado,
    });
  };
  const nuevo = () => {
    navigate("/pagos/nuevo");
  };
  const pagos = useSelector((state) => state.pagos.pagos);
  const error = useSelector((state) => state.pagos.error);
  const cargando = useSelector((state) => state.pagos.loading);
  const empty = "";
  return (
    <Fragment>
      <h3 className="title-decorator">Cobranzas</h3>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-form ">
            <div class="card-body card-body-custom">
              <form class="form-horizontal p-t-20" onSubmit={filtrar}>
                <div class="row">
                  <div class="col-md-4">
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
                          <option
                            key={cliente.idCliente}
                            value={cliente.idCliente}
                          >
                            {cliente.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div class="col-md-4">
                    <div class="form-group">
                      <select
                        type="text"
                        class="form-control"
                        value={estado}
                        name="estado"
                        onChange={(e) => guardarEstado(e.target.value)}
                      >
                        <option value={empty}>Seleccione estado...</option>
                        <option value={true}>Completo</option>
                        <option value={false}>Parcial</option>
                      </select>
                    </div>
                  </div> */}
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
      {error != null ? (
        <div role="alert" className="alert text-center animated fadeIn notFound">
          <img src={require("../../assets/documentNotFound.gif")} alt="404" />
          <h2  >No se encontraron resultados.</h2>
        </div>
      ) : (<div class="card custom-card-shadow">
        <div class="row">
          <div class="col-lg-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="colu" scope="col">
                    Cliente
                  </th>
                  <th className="colu" scope="col">
                    Empleo
                  </th>
                  <th className="colu" scope="col">
                    Monto
                  </th>
                  <th align="center" className="colux" scope="col">
                    Fecha
                  </th>
                  {/* <th className="colu" scope="col">
                    Estado
                  </th> */}
                  <th className="colu" scope="col">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((pago) => {
                      console.log(pago);
                      let fecha = pago.fechaPago.split("T");
                      pago.fechaPago = fecha[0];
                      return <AccionesPagos key={pago.idPago} pago={pago} />;
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>)}
{cargando ? <Spinner /> : null}
    </Fragment>
  );
};

export default Pagos;
