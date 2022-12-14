import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerClientesAction,
  obtenerClientesFilterAction,
} from "../../actions/clientesActions";
import AccionesCliente from "./AccionesCliente";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Spinner from "../../syles/Spinner";
import ReactPaginate from "react-paginate";

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
  const cargando = useSelector((state) => state.clientes.loading);
  const error = useSelector((state) => state.clientes.error);

  //PAGINADOR
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = clientes.slice(itemOffset, endOffset);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % clientes.length;
    setItemOffset(newOffset);
  };
  const pageCount = Math.ceil(clientes.length / itemsPerPage);
  return (
    <Fragment>
      <h3 className="title-decorator">Clientes</h3>

      <div class="card card-form ">
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
                    <option>Seleccione vigencia...</option>
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
      {error != null ? (
        <div
          role="alert"
          className="alert text-center animated fadeIn notFound"
        >
          <img src={require("../../assets/documentNotFound.gif")} alt="404" />
          <h2>No se encontraron resultados.</h2>
        </div>
      ) : (
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
                      Pa??s
                    </th>
                    <th className="colu" scope="col">
                      CUIT
                    </th>
                    <th className="colu" scope="col">
                      E-mail
                    </th>
                    <th className="colu" scope="col">
                      Vigente
                    </th>
                    <th className="colu" scope="col">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((cliente) => {
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
          <ReactPaginate
            previousLabel="Anterior"
            nextLabel="Siguiente"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      )}

      {cargando ? <Spinner /> : null}
    </Fragment>
  );
};

export default Clientes;
