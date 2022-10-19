import React, { Fragment, useEffect, useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  obtenerUsuariosAction,
  obtenerUsuariosFilterAction,
} from "../../actions/usuariosActions";
import AccionesUsuarios from "./AccionesUsuarios";
const Usuarios = () => {
  const [usuario, guardarUsuario] = useState("");
  const [cuil, guardarCuil] = useState("");
  const [estado, guardarEstado] = useState("");

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
  const error = useSelector((state) => state.usuarios.error);
  const navigate = useNavigate();

  const nuevo = () => {
    navigate("/usuarios/nuevo");
  };
  return (
    <Fragment>
      <h3 className="title-decorator">Usuarios</h3>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-form alert-dismissible">
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
                    Nombre usuario
                  </th>
                  <th className="colu" scope="col">
                    Cuil
                  </th>

                  <th className="colu" scope="col">
                    Mail
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
                {error != null
                  ? "No hay usuarios"
                  : usuarios.map((usuario) => {
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
      </div>
    </Fragment>
  );
};

export default Usuarios;
