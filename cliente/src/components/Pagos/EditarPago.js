import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editarPagoAction } from "../../actions/pagosActions";
import clienteAxios from "../../config/axios";
const EditarPago = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pago, guardarPago] = useState({
    montoPago: 0,
    idCliente: 0,
    Estado: 0,
    fechaPago: Date,
  });
  const [listaClientes, guardarClientes] = useState([]);
  const editar = useSelector((state) => state.pagos.editar);
  useEffect(() => {
    const llenarClientes = async () => {
      const resultado = await clienteAxios.get(`/Clientes`);
      guardarClientes(resultado.data);
    };
    llenarClientes();
    guardarPago(editar);
  }, [editar]);

  const onChangeFormulario = (e) => {
    guardarPago({
      ...pago,
      [e.target.name]: e.target.value,
    });
  };
  const cancelar = () => {
    navigate("/pagos");
  };
  const { montoPago, idCliente, Estado, fechaPago } = pago;
  console.log(pago);
  const submitEditarPago = (e) => {
    e.preventDefault();
    dispatch(editarPagoAction(pago));
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
                    name="idCliente"
                    value={idCliente}
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Fecha de pago</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaPago"
                    value={fechaPago}
                    onChange={onChangeFormulario}
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
                    onClick={submitEditarPago}
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

export default EditarPago;
