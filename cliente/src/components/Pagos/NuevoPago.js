import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearNuevoPagoAction } from "../../actions/pagosActions";
import clienteAxios from "../../config/axios";
const NuevoPago = () => {
  const navigate = useNavigate();
  //state
  const [montoPago, guardarMonto] = useState(0);
  const [Estado, guardarEstado] = useState(Boolean);
  const [idCliente, guardarCliente] = useState(0);
  const [listaClientes, guardarClientes] = useState([]);
  const [fechaPago, guardarFechaPago] = useState(Date);

  const dispatch = useDispatch();

  // const alerta = useSelector((state) => state.alerta.alerta);
  //llama PagoAction
  const agregarPago = (pago) => dispatch(crearNuevoPagoAction(pago));

  const llenarClientes = async () => {
    const resultado = await clienteAxios.get(`/Clientes`);
    guardarClientes(resultado.data);
  };

  const submitNuevoPago = (e) => {
    e.preventDefault();

    //validar form
    if (montoPago.trim() === "") {
      // const alerta = {
      //   msg: "Ambos campos son obligatorios",
      //   clases: "alert alert-danger text-center text-uppercase p3",
      // };

      //   dispatch(mostrarAlerta(alerta));

      return;
    }

    // dispatch(ocultarAlertaAction());

    agregarPago({
      montoPago,
      Estado,
      idCliente,
      fechaPago,
    });
    navigate("/pagos");
  };
  const cancelar = () => {
    navigate("/pagos");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 font-weight-bold">Nuevo Pago</h2>
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
            <form>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Cliente</label>
                  <select
                    className="form-control"
                    name="cliente"
                    value={idCliente}
                    onClick={llenarClientes}
                    onChange={(e) => guardarCliente(e.target.value)}
                  >
                    <option>Seleccione...</option>
                    {listaClientes.map((cliente) => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Monto</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Monto"
                    name="montoPago"
                    value={montoPago}
                    onChange={(e) => guardarMonto(e.target.value)}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Fecha de pago</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaPago"
                    value={fechaPago}
                    onChange={(e) => guardarFechaPago(e.target.value)}
                  />
                </div>
              </div>

              <div className=" row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase"
                    onClick={cancelar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
                    onClick={submitNuevoPago}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoPago;
