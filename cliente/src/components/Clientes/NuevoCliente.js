import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearNuevoClienteAction } from "../../actions/clientesActions";
import clienteAxios from "../../config/axios";

const NuevoCliente = () => {
  const navigate = useNavigate();
  //state
  const [nombre, guardarNombre] = useState("");
  const [nombreFantasia, guardarNombreFantasia] = useState("");
  const [mail, guardarMail] = useState("");
  // const [idTipoDocumento, guardarTipoDocumento] = useState(0);
  const [documento, guardarDocumento] = useState("");
  const [idRubro, guardarRubro] = useState(0);
  const [listaRubros, guardarRubros] = useState([]);
  const [direccion, guardarDireccion] = useState([]);
  const [listaPaises, guardarPaises] = useState([]);
  const [idPais, guardarPais] = useState(0);
  const [telefono, guardarTelefono] = useState("");
  const dispatch = useDispatch();

  // const alerta = useSelector((state) => state.alerta.alerta);
  //llama clienteAction
  const agregarCliente = (cliente) =>
    dispatch(crearNuevoClienteAction(cliente));

  const consultarAPI = async () => {
    const resultado = await clienteAxios.get(`/rubros`);
    guardarRubros(resultado.data);
  };
  const llenarPais = async () => {
    const resultado = await clienteAxios.get(`/Paises`);
    guardarPaises(resultado.data);
  };

  const submitNuevoCliente = (e) => {
    e.preventDefault();

    //validar form
    if (nombre.trim() === "") {
      // const alerta = {
      //   msg: "Ambos campos son obligatorios",
      //   clases: "alert alert-danger text-center text-uppercase p3",
      // };

      //   dispatch(mostrarAlerta(alerta));

      return;
    }

    // dispatch(ocultarAlertaAction());

    agregarCliente({
      nombre,
      nombreFantasia,
      mail,
      //   idTipoDocumento,
      documento,
      telefono,
      //   idGenero,
      idPais,
      idRubro,
      direccion,
    });
    navigate("/clientes");
  };
  const cancelar = () => {
    navigate("/clientes");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 font-weight-bold">Nuevo Cliente</h2>
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
                    onClick={llenarPais}
                    onChange={(e) => guardarPais(e.target.value)}
                  >
                    <option>Seleccione...</option>
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
                    type="text"
                    className="form-control"
                    placeholder="Documento"
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
                    onClick={consultarAPI}
                    onChange={(e) => guardarRubro(e.target.value)}
                  >
                    <option>Seleccione...</option>
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
                    className="btn btn-primary font-weight-bold text-uppercase"
                    onClick={cancelar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
                    onClick={submitNuevoCliente}
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

export default NuevoCliente;
