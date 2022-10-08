import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearNuevoUsuarioAction } from "../../actions/usuariosActions";
import clienteAxios from "../../config/axios";
const NuevoUsuario = () => {
  //state

  const [nombre, guardarNombre] = useState("");
  const [apellido, guardarApellido] = useState("");
  const [mail, guardarMail] = useState("");
  const [idTipoDocumento, guardarTipoDocumento] = useState(0);
  const [listaTiposDocs, guardarTiposDocs] = useState([]);
  const [listaGeneros, guardarGeneros] = useState([]);
  const [documento, guardarDocumento] = useState("");
  const [cuil, guardarCuil] = useState("");
  const [fechaNacimiento, guardarFecha] = useState("");
  const [nombreUsuario, guardarNombreUsuario] = useState("");
  const [idGenero, guardarGenero] = useState(0);
  const [direccion, guardarDireccion] = useState("");
  const [telefono, guardarTelefono] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //llama UsuarioAction
  const agregarUsuario = (usuario) =>
    dispatch(crearNuevoUsuarioAction(usuario));

  const consultarAPI = async () => {
    const resultado = await clienteAxios.get(`/TiposDocumentos`);
    console.log(resultado);
    guardarTiposDocs(resultado.data);
  };
  const llenarGenero = async () => {
    const resultado = await clienteAxios.get(`/Generos`);
    guardarGeneros(resultado.data);
  };

  // const alerta = useSelector(state => state.alerta.alerta);

  const submitNuevoUsuario = (e) => {
    e.preventDefault();
    console.log(fechaNacimiento);
    //validar form
    if (nombre.trim() === "" || apellido.trim() === "") {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        clases: "alert alert-danger text-center text-uppercase p3",
      };

      //   dispatch(mostrarAlerta(alerta));

      return;
    }

    // dispatch(ocultarAlertaAction());

    agregarUsuario({
      nombre,
      apellido,
      mail,
      idTipoDocumento,
      documento,
      cuil,
      fechaNacimiento,
      nombreUsuario,
      idGenero,
      direccion,
      telefono,
    });
    navigate("/usuarios");
  };
  const cancelar = () => {
    navigate("/candidatos");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 font-weight-bold">Nuevo Usuario</h2>
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
                  <label>Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    name="apellido"
                    value={apellido}
                    onChange={(e) => guardarApellido(e.target.value)}
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
                  <label>Tipo de Documento</label>
                  <select
                    className="form-control"
                    name="tipoDocumento"
                    onClick={consultarAPI}
                    value={idTipoDocumento}
                    onChange={(e) => guardarTipoDocumento(e.target.value)}
                  >
                    <option value="">Seleccione...</option>

                    {listaTiposDocs.map((tipoDocumento) => (
                      <option
                        key={tipoDocumento.idTipoDocumento}
                        value={tipoDocumento.idTipoDocumento}
                      >
                        {tipoDocumento.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Documento</label>
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
                  <label>Cuil</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cuil"
                    name="Cuil"
                    value={cuil}
                    onChange={(e) => guardarCuil(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => guardarFecha(e.target.value)}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Nombre de usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    name="nombreUsuario"
                    value={nombreUsuario}
                    onChange={(e) => guardarNombreUsuario(e.target.value)}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Género</label>
                  <select
                    className="form-control"
                    name="genero"
                    value={idGenero}
                    onClick={llenarGenero}
                    onChange={(e) => guardarGenero(e.target.value)}
                  >
                    <option>Seleccione...</option>
                    {listaGeneros.map((genero) => (
                      <option key={genero.idGenero} value={genero.idGenero}>
                        {genero.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <h4 className="card-subtitle font-italic">Datos opcionales</h4>
              <hr />
              <div className="row">
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
                    onClick={submitNuevoUsuario}
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

export default NuevoUsuario;
