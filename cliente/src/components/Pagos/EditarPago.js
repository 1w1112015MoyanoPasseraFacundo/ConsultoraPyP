import React, { useEffect, useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editarPagoAction } from "../../actions/pagosActions";
import clienteAxios from "../../config/axios";
const EditarPago = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listaEmpleos, guardarEmpleos] = useState([]);

  const [pago, guardarPago] = useState({
    montoPago: 0,
    idCliente: 0,
    idEmpleo: 0,
    Estado: 0,
    fechaPago: Date,
  });
  const [listaClientes, guardarClientes] = useState([]);
  const editar = useSelector((state) => state.pagos.editar);
  const error = useSelector((state) => state.pagos.error);

  useEffect(() => {
    if (error === false) {
      navigate("/pagos");
    }
  }, [error]);
  useEffect(() => {
    const llenarClientes = async () => {
      const resultado = await clienteAxios.get(`/Clientes`);
      guardarClientes(resultado.data);
    };
    llenarClientes();
    guardarPago(editar);
  }, [editar]);

  useEffect(() => {
    const llenarEmpleo = async () => {
      const resultado = await clienteAxios.get(
        `/Empleos/GetEmpleosByIdCliente?idCliente=${idCliente}`
      );
      guardarEmpleos(resultado.data);
    };
    llenarEmpleo();
  }, []);

  const onChangeFormulario = (e) => {
    guardarPago({
      ...pago,
      [e.target.name]: e.target.value,
    });
  };
  const cancelar = () => {
    navigate("/pagos");
  };
  const { montoPago, idCliente, Estado, fechaPago, idEmpleo, nombreEmpleo } =
    pago;
  const submitEditarPago = (e) => {
    e.preventDefault();
    let fecha = fechaPago.split("-")[0];
    let monto = montoPago.toString();
    //validar form
    if (
      monto.trim() === "" ||
      idCliente === 0 ||
      idEmpleo === 0 ||
      idEmpleo === "0" ||
      fechaPago.trim() === ""
    ) {
      Swal.fire("Llene los campos obligatorios", "", "warning");
      return;
    } else if (
      montoPago.includes("-") ||
      montoPago.includes("e") ||
      montoPago.length > 10
    ) {
      Swal.fire("Ingrese un monto correcto", "", "warning");
      return;
    } else if (fecha < 1900 || fecha > 2022) {
      Swal.fire("Ingrese un año válido", "", "warning");
      return;
    }
    dispatch(editarPagoAction(pago));
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="title-decorator">Editar Cobro</h3>
        <div className="card">
          <div className="card-body">
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
            <form>
              <div className="row p-t-20">
                <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <label>Cliente</label>
                  <select
                    disabled="true"
                    className="form-control"
                    name="idCliente"
                    value={idCliente}
                    onChange={onChangeFormulario}
                  >
                    {listaClientes.map((cliente) => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group  col-lg-6 col-md-6col-sm-12 col-xs-12">
                  <label>Empleo</label>
                  <input
                    disabled="true"
                    type="text"
                    className="form-control"
                    placeholder="Empleo"
                    name="nombreEmpleo"
                    value={nombreEmpleo}
                    onChange={onChangeFormulario}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group  col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <label>Monto</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Monto"
                    min="0"
                    name="montoPago"
                    value={montoPago}
                    onChange={onChangeFormulario}
                  />
                </div>

                <div className="form-group  col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                    className="btn btn-light font-weight-bold text-uppercase"
                    onClick={cancelar}
                  >
                    <i class="mx-1 mr-2">
                      <BsReplyFill />
                    </i>
                    <span> Volver</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
                    onClick={submitEditarPago}
                  >
                    <i class="mx-1 mr-2">
                      <BsCheckLg />
                    </i>
                    <span> Guardar</span>
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
