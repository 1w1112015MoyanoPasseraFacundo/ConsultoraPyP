import React, { Fragment, useEffect, useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  obtenerCompetenciasAction,
  obtenerCompetenciasFilterAction,
} from "../../actions/competenciasActions";
import clienteAxios from "../../config/axios";
import Spinner from "../../syles/Spinner";
import AccionesCompetencias from "./AccionesCompetencias";
const Competencias = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nombre, guardarNombre] = useState("");
  const [idRubro, guardarRubro] = useState("");
  const [listaRubros, guardarRubros] = useState([]);
  const competencias = useSelector((state) => state.competencias.competencias);
  const error = useSelector((state) => state.competencias.error);
  const cargando = useSelector((state) => state.competencias.loading);

  useEffect(() => {
    const cargarCompetencias = () => dispatch(obtenerCompetenciasAction());
    cargarCompetencias();
    // eslint-disable-next-line
  }, []);

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
  useEffect(() => {
    const llenarRubro = async () => {
      const resultado = await clienteAxios.get(`/rubros`);
      guardarRubros(resultado.data);
    };
    llenarRubro();
  }, []);
  const empty = "";

  //PAGINADOR
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = competencias.slice(itemOffset, endOffset);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % competencias.length;
    setItemOffset(newOffset);
  };
  const pageCount = Math.ceil(competencias.length / itemsPerPage);
  return (
    <Fragment>
      <h3 class="title-decorator">Habilidades</h3>

      {/* {cargando ? <p className="text-center">Cargando...</p> : null} */}
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-form ">
            <div class="card-body card-body-custom">
              <form class="form-horizontal p-t-20" onSubmit={filtrar}>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        value={nombre}
                        placeholder="Habilidad"
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
                  {currentItems.map((competencia) => (
                    <AccionesCompetencias
                      key={competencia.idCompetencia}
                      competencia={competencia}
                    />
                  ))}
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

export default Competencias;
