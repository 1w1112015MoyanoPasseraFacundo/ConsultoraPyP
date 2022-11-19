import React, { Fragment, useEffect, useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  obtenerCandidatosAction,
  obtenerCandidatosFilterAction,
} from "../../actions/candidatosActions";
import Spinner from "../../syles/Spinner";
import AccionesCandidatos from "./AccionesCandidatos";
const Candidatos = () => {
  const dispatch = useDispatch();
  const [nombre, guardarNombre] = useState("");
  const [apellido, guardarApellido] = useState("");
  const [estado, guardarEstado] = useState("");
  const cargando = useSelector((state) => state.candidatos.loading);
  const candidatos = useSelector((state) => state.candidatos.candidatos);
  const error = useSelector((state) => state.candidatos.error);

  const filtrar = (e) => {
    e.preventDefault();
    buscar({
      nombre,
      apellido,
      estado,
    });
  };
  const buscar = (datos) => {
    dispatch(obtenerCandidatosFilterAction(datos));
  };

  useEffect(() => {
    //consultar api
    const cargarCandidatos = () => dispatch(obtenerCandidatosAction());
    cargarCandidatos();
    // eslint-disable-next-line
  }, [candidatos.estado]);
  const navigate = useNavigate();

  const nuevo = () => {
    navigate("/candidatos/nuevo");
  };

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = candidatos.slice(itemOffset, endOffset);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % candidatos.length;
    setItemOffset(newOffset);
  };
  const pageCount = Math.ceil(candidatos.length / itemsPerPage);
  return (
    <Fragment>
      <h3 className="title-decorator">Candidatos</h3>

      <div class="card card-form-cand">
        <div class="card-body card-body-custom">
          <form class="form-horizontal p-t-20" onSubmit={filtrar}>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id={nombre}
                    placeholder="Nombre del candidato"
                    name="nombre"
                    onChange={(e) => guardarNombre(e.target.value)}
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id={apellido}
                    placeholder="Apellido del candidato"
                    name="apellido"
                    onChange={(e) => guardarApellido(e.target.value)}
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
                    <option>Seleccione estado...</option>
                    <option>Postulado</option>
                    <option>Preseleccionado</option>
                    <option>En proceso</option>
                    <option>En base</option>
                    <option>Seleccionado</option>
                    <option>Descartado</option>
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
        <div class="card custom-card-shadow-cand">
          <div class="row">
            <div class="col-lg-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="colu" scope="col">
                      Nombre
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
                      Estado
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
                  {currentItems.map((candidato) => {
                    let fecha = candidato.fechaNacimiento.split("T");
                    candidato.fechaNacimiento = fecha[0];
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

export default Candidatos;
