import React, { useEffect, useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  obtenerUsuariosAction,
  obtenerUsuariosFilterAction,
} from "../../actions/usuariosActions";
import Spinner from "../../syles/Spinner";
import AccionesUsuarios from "./AccionesUsuarios";
const Usuarios = () => {
  const [usuario, guardarUsuario] = useState("");
  const [cuil, guardarCuil] = useState("");
  const [estado, guardarEstado] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    //consultar api
    const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
    cargarUsuarios();
    // eslint-disable-next-line
  }, []);
  const filtrar = (e) => {
    e.preventDefault();
    buscar({
      usuario,
      cuil,
      estado,
    });
  };
  const buscar = (datos) => {
    dispatch(obtenerUsuariosFilterAction(datos));
  };
  const usuarios = useSelector((state) => state.usuarios.usuarios);
  const login = useSelector((state) => state.login.login);

  const cargando = useSelector((state) => state.usuarios.loading);
  const error = useSelector((state) => state.usuarios.error);

  const nuevo = () => {
    navigate("/usuarios/nuevo");
  };

  //PAGINADOR
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = usuarios.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % usuarios.length;
    setItemOffset(newOffset);
  };
  const pageCount = Math.ceil(usuarios.length / itemsPerPage);

  return (
    <>
      {login.rol === "Admin" ? (
        <>
          <h3 className="title-decorator">Usuarios</h3>
          <div class="row">
            <div class="col-lg-12">
              <div class="card card-form ">
                <div class="card-body card-body-custom">
                  <form class="form-horizontal p-t-20" onSubmit={filtrar}>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            name="usuario"
                            placeholder="Nombre de usuario"
                            value={usuario}
                            onChange={(e) => guardarUsuario(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <input
                            type="number"
                            class="form-control"
                            name="cuil"
                            placeholder="Cuil del usuario"
                            value={cuil}
                            onChange={(e) => guardarCuil(e.target.value)}
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
            <div
              role="alert"
              className="alert text-center animated fadeIn notFound"
            >
              <img
                src={require("../../assets/documentNotFound.gif")}
                alt="404"
              />
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
                          Nombre usuario
                        </th>
                        <th className="colu" scope="col">
                          Documento
                        </th>

                        <th className="colu" scope="col">
                          Mail
                        </th>
                        <th className="colu" scope="col">
                          Tel??fono
                        </th>
                        <th className="colu" scope="col">
                          Vigencia
                        </th>
                        <th className="colu" scope="col">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((usuario) => {
                        let fecha = usuario.fechaNacimiento.split("T");
                        usuario.fechaNacimiento = fecha[0];
                        return (
                          <AccionesUsuarios
                            key={usuario.idUsuario}
                            usuario={usuario}
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
        </>
      ) : null}
    </>
  );
};

export default Usuarios;
