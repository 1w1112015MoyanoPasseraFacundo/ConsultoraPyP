import React, { useEffect, useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { crearNuevoPagoAction } from "../../actions/pagosActions";
import clienteAxios from "../../config/axios";
import PaginaError from "../PaginaError";
const NuevoPago = () => {
  const navigate = useNavigate();
  //state
  const [montoPago, guardarMonto] = useState("");
  const [Estado, guardarEstado] = useState(Boolean);
  const [idCliente, guardarCliente] = useState(0);
  const [listaEmpleos, guardarEmpleos] = useState([]);
  const [idEmpleo, guardarEmpleo] = useState(0);
  const [listaClientes, guardarClientes] = useState([]);
  const [fechaPago, guardarFechaPago] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.pagos.error);
  useEffect(() => {
    if (error === false) {
      Swal.fire(
        "Correcto!",
        "El pago se agrego correctamente!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/pagos");
        }
      });
    }
  }, [error]);

  //llama PagoAction
  const agregarPago = (pago) => dispatch(crearNuevoPagoAction(pago));

  useEffect(() => {
    const llenarClientes = async () => {
      const resultado = await clienteAxios.get(`/Clientes`);
      guardarClientes(resultado.data);
    };
    llenarClientes();
  }, [idCliente]);

  useEffect(() => {
    const llenarEmpleos = async () => {
      const resultado = await clienteAxios.get(
        `/Empleos/GetEmpleosByIdCliente?idCliente=${idCliente}`
      );
      guardarEmpleos(resultado.data);
    };
    llenarEmpleos();
  }, [idCliente]);

  //SETIAR A 0 IDEMPLEO CUANDO CAMBIA CLIENTE
  useEffect(() => {
    if (listaEmpleos.length === 0) {
      guardarEmpleo(0);
    }
  }, [listaEmpleos, idCliente, idEmpleo]);

  const submitNuevoPago = (e) => {
    e.preventDefault();
    let fecha = fechaPago.split("-")[0];
    console.log(idEmpleo);
    //validar form
    if (
      montoPago === "" ||
      idCliente === 0 ||
      idEmpleo === 0 ||
      idEmpleo === "0" ||
      fechaPago === "" ||
      montoPago.includes("-")
    ) {
      Swal.fire("Llene todos los campos obligatorios", "", "warning");
      return;
    } else if (fecha < 1900 || fecha > 2022) {
      Swal.fire("Ingrese un año válido", "", "warning");
      return;
    }
    agregarPago({
      montoPago,
      Estado,
      idCliente,
      fechaPago,
      idEmpleo,
    });
  };
  const cancelar = () => {
    navigate("/pagos");
  };
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10).toString();
  const login = useSelector((state) => state.login.login);

  return (
    <>
      {login.rol == "Admin" ? (
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h3 className="title-decorator">Nuevo cobro</h3>
            <div className="card">
              <div className="card-body">
                {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
                <form>
                  <div className="row p-t-20">
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <label>Cliente</label>
                      <select
                        className="form-control"
                        name="cliente"
                        value={idCliente}
                        onChange={(e) => guardarCliente(e.target.value)}
                      >
                        <option value={0}>Seleccione...</option>
                        {listaClientes.map((cliente) => (
                          <option
                            key={cliente.idCliente}
                            value={cliente.idCliente}
                          >
                            {cliente.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <label>Empleo</label>
                      <select
                        className="form-control"
                        name="empleo"
                        value={idEmpleo}
                        onChange={(e) => guardarEmpleo(e.target.value)}
                      >
                        <option value={0}>Seleccione...</option>
                        {listaEmpleos.map((empleo) => (
                          <option key={empleo.idEmpleo} value={empleo.idEmpleo}>
                            {empleo.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row p-t-20">
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <label>Monto</label>
                      <input
                        type="number"
                        prefix="$"
                        className="form-control"
                        placeholder="$"
                        min="0"
                        name="montoPago"
                        value={montoPago}
                        onChange={(e) => guardarMonto(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <label>Fecha de cobro</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaPago"
                        value={fechaPago}
                        onChange={(e) => guardarFechaPago(e.target.value)}
                        defaultValue={date}
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
                        onClick={submitNuevoPago}
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
      ) : null}
    </>
  );
};

export default NuevoPago;
