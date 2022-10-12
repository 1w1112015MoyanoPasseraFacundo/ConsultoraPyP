import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  return (
    <Fragment>
      <h3 className="title-decorator">Usuarios</h3>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th className="colu" scope="col">Nombre</th>
            <th className="colu" scope="col">Cuil</th>
            <th className="colu" scope="col">Mail</th>
            <th className="colu" scope="col">Teléfono</th>
            <th className="colu" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0
            ? "No hay usuarios"
            : usuarios.map((usuario) => {
                let fecha = usuario.fechaNacimiento.split("T");
                usuario.fechaNacimiento = fecha[0];
                return (
                  <AccionesUsuarios key={usuario.idUsuario} usuario={usuario} />
                );
              })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Usuarios;
