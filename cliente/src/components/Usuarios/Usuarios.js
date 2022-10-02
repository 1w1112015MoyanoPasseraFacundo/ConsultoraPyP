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
      <h1>Usuarios</h1>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Cuil</th>
            <th scope="col">Mail</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0
            ? "No hay usuarios"
            : usuarios.map((usuario) => (
                <AccionesUsuarios key={usuario.idUsuario} usuario={usuario} />
              ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Usuarios;
