import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerPagosAction } from "../../actions/pagosActions";
import AccionesPagos from "./AccionesPagos";
const Pagos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //consultar api

    const cargarPagos = () => dispatch(obtenerPagosAction());
    cargarPagos();
    // eslint-disable-next-line
  }, []);

  const pagos = useSelector((state) => state.pagos.pagos);
  console.log(pagos);
  const error = useSelector((state) => state.pagos.error);
  return (
    <Fragment>
      <h3 className="title-decorator">Pagos</h3>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th className="colu" scope="col">Cliente</th>
            <th className="colu" scope="col">Monto</th>
            <th className="colu" scope="col">Fecha</th>
            <th className="colu" scope="col">Estado</th>
            <th className="colu" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.length === 0
            ? "No hay pagos"
            : pagos.map((pago) => {
                let fecha = pago.fechaPago.split("T");
                pago.fechaPago = fecha[0];
                return <AccionesPagos key={pago.idPago} pago={pago} />;
              })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Pagos;
