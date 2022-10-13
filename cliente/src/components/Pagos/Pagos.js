import React, { Fragment, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const nuevo = () => {
    navigate("/pagos/nuevo");
  };
  const pagos = useSelector((state) => state.pagos.pagos);
  console.log(pagos);
  const error = useSelector((state) => state.pagos.error);
  return (
    <Fragment>
      <h3 className="title-decorator">Pagos</h3>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-form alert-dismissible">
            <div class="card-body card-body-custom">
              <form class="form-horizontal p-t-20">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <select
                        type="text"
                        class="form-control"
                        id="descripcion"
                        formControlName="descripcion"
                      >
                        <option>Cliente</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="descripcion"
                        placeholder="Fecha de pago"
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
                    Cliente
                  </th>
                  <th className="colu" scope="col">
                    Monto
                  </th>
                  <th className="colu" scope="col">
                    Fecha
                  </th>
                  <th className="colu" scope="col">
                    Estado
                  </th>
                  <th className="colu" scope="col">
                    Acciones
                  </th>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Pagos;
