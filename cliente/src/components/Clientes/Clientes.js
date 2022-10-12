import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerClientesAction } from "../../actions/clientesActions";
import AccionesCliente from "./AccionesCliente";

const Clientes = () => {
  const dispatch = useDispatch();
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
      <table className="table table-striped">
        <thead className="bg-primary table-light">
          <tr>
            <th className="colu" scope="col">Nombre</th>
            <th className="colu" scope="col">País</th>
            <th className="colu" scope="col">CUIT</th>
            <th className="colu" scope="col">E-mail</th>
            <th className="colu" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0
            ? "No hay candidatos"
            : clientes.map((cliente) => {
                return (
                  <AccionesCliente key={cliente.idCliente} cliente={cliente} />
                );
              })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Clientes;
