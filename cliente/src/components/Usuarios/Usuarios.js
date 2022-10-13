import React, { Fragment, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { obtenerUsuariosAction } from "../../actions/usuariosActions";
import AccionesUsuarios from "./AccionesUsuarios";
const Usuarios = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //consultar api
    const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
    cargarUsuarios();
    // eslint-disable-next-line
  }, []);

  const usuarios = useSelector((state) => state.usuarios.usuarios);
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
              <form class="form-horizontal p-t-20">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombre"
                        placeholder="Nombre del usuario"
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
                        placeholder="E-mail del usuario "
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
                {usuarios.length === 0
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
