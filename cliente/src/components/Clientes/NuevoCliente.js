import React, { useState } from "react";
import { useEffect } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { crearNuevoClienteAction } from "../../actions/clientesActions";
import clienteAxios from "../../config/axios";

const NuevoCliente = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [nombre, guardarNombre] = useState("");
  const [nombreFantasia, guardarNombreFantasia] = useState("");
  const [mail, guardarMail] = useState("");
  const [documento, guardarDocumento] = useState("");
  const [idRubro, guardarRubro] = useState(0);
  const [listaRubros, guardarRubros] = useState([]);
  const [direccion, guardarDireccion] = useState("");
  const [listaPaises, guardarPaises] = useState([]);
  const [idPais, guardarPais] = useState(0);
  const [telefono, guardarTelefono] = useState("");
  const error = useSelector((state) => state.clientes.error);
  useEffect(() => {
    if (error === false) {
      Swal.fire(
        "Correcto!",
        "El cliente se agrego correctamente!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/clientes");
        }
      });
    }
    // eslint-disable-next-line
  }, [error]);

  //llama clienteAction
  const agregarCliente = (cliente) => {
    console.log("CLIENTE", cliente);
    dispatch(crearNuevoClienteAction(cliente));
  };
  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/rubros`);
      guardarRubros(resultado.data);
    };
    consultarAPI();
  }, []);

  useEffect(() => {
    const llenarPais = async () => {
      const resultado = await clienteAxios.get(`/Paises`);
      guardarPaises(resultado.data);
    };
    llenarPais();
  }, []);

  const submitNuevoCliente = (e) => {
    e.preventDefault();
    //validar form
    if (
      nombre.trim() === "" ||
      nombreFantasia.trim() === "" ||
      mail.trim() === "" ||
      idPais === 0 ||
      idPais === "0" ||
      documento === "" ||
      idRubro === "0" ||
      idRubro === 0 ||
      direccion.trim() === "" ||
      telefono === ""
    ) {
      console.log(nombre);
      console.log(nombreFantasia);
      console.log(mail);
      console.log(idPais);
      console.log(documento);
      console.log(idRubro);
      console.log(direccion);
      console.log(telefono);
      Swal.fire("Llene todos los campos obligatorios", "", "warning");
      return;
    } else if (telefono.includes("-") || telefono.includes("e")) {
      Swal.fire("Ingrese un télefono correcto", "", "warning");
      return;
    } else if (documento.includes("-") || documento.includes("e")) {
      Swal.fire("Ingrese un cuit correcto", "", "warning");
    } else if (documento.length !== 11) {
      Swal.fire("El campo cuit sólo acepta once números", "", "warning");
      return;
    } else if (telefono !== "") {
      if (telefono.length < 5 || telefono.length > 20) {
        Swal.fire("Ingrese un télefono correcto", "", "warning");
        return;
      }
    }
    agregarCliente({
      nombre,
      nombreFantasia,
      mail,
      documento,
      telefono,
      idPais,
      idRubro,
      direccion,
    });
  };
  const cancelar = () => {
    navigate("/clientes");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="title-decorator">Nuevo Cliente</h3>
        <div className="card">
          <div className="card-body">
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
            <form>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => guardarNombre(e.target.value)}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Razón Social</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Razón social"
                    name="nombreFantasia"
                    value={nombreFantasia}
                    onChange={(e) => guardarNombreFantasia(e.target.value)}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Correo electrónico</label>
                  <input
                    type="mail"
                    className="form-control"
                    placeholder="E-mail"
                    name="mail"
                    value={mail}
                    onChange={(e) => guardarMail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>País</label>
                  <select
                    className="form-control"
                    name="pais"
                    value={idPais}
                    onChange={(e) => guardarPais(e.target.value)}
                  >
                    <option value={0}>Seleccione...</option>
                    {listaPaises.map((pais) => (
                      <option key={pais.idPais} value={pais.idPais}>
                        {pais.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>CUIT</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Cuit"
                    min="0"
                    minLength={11}
                    maxLength="11"
                    name="documento"
                    value={documento}
                    onChange={(e) => guardarDocumento(e.target.value)}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Rubro</label>
                  <select
                    className="form-control"
                    name="rubro"
                    value={idRubro}
                    onChange={(e) => guardarRubro(e.target.value)}
                  >
                    <option value={0}>Seleccione...</option>
                    {listaRubros.map((rubro) => (
                      <option key={rubro.idRubro} value={rubro.idRubro}>
                        {rubro.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row p-t-20">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Dirección </label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={direccion}
                      onChange={(e) => guardarDireccion(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Teléfono </label>
                    <input
                      type="Number"
                      min="0"
                      className="form-control"
                      name="telefono"
                      value={telefono}
                      onChange={(e) => guardarTelefono(e.target.value)}
                    />
                  </div>
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
                    onClick={submitNuevoCliente}
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

export default NuevoCliente;
