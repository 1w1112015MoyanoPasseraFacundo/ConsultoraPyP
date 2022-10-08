import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editarUsuarioAction } from "../../actions/usuariosActions";
import clienteAxios from "../../config/axios";
const EditarUsuario = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [listaTiposDocs, guardarTiposDocs] = useState([]);
  const [listaGeneros, guardarGeneros] = useState([]);

  const [usuario, guardarUsuario] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    idTipoDocumento: 0,
    documento: "",
    cuil: "",
    fechaNacimiento: "",
    nombreUsuario: "",
    idGenero: 0,
    direccion: "",
    telefono: "",
  });

  const editar = useSelector((state) => state.usuarios.editar);
  // console.log(editar);
  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/TiposDocumentos`);
      guardarTiposDocs(resultado.data);
    };
    consultarAPI();
    const llenarGenero = async () => {
      const resultado = await clienteAxios.get(`/Generos`);
      guardarGeneros(resultado.data);
    };
    llenarGenero();
    guardarUsuario(editar);
  }, [editar]);

  const onChangeFormulario = (e) => {
    console.log(e.target);
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    console.log(usuario);
  };

  const {
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
  } = usuario;

  const submitEditarUsuario = (e) => {
    e.preventDefault();
    dispatch(editarUsuarioAction(usuario));
    console.log(usuario);
    navigate("/usuarios");
  };
  const cancelar = () => {
    navigate("/usuarios");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 font-weight-bold">Nuevo Usuario</h2>
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}

            {/* <LocalizationProvider> */}
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
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Tipo de Documento</label>

                  <select
                    className="form-control"
                    name="idTipoDocumento"
                    value={idTipoDocumento}
                    onChange={onChangeFormulario}
                  >
                    <option>Seleccione...</option>
                    {listaTiposDocs.map(
                      (tipoDocumento) => (
                        console.log(tipoDocumento),
                        (
                          <option
                            key={tipoDocumento.idTipoDocumento}
                            value={tipoDocumento.idTipoDocumento}
                          >
                            {tipoDocumento.nombre}
                          </option>
                        )
                      )
                    )}
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
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Género</label>
                  <select
                    className="form-control"
                    name="idGenero"
                    value={idGenero}
                    onChange={onChangeFormulario}
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
                      onChange={onChangeFormulario}
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
                      onChange={onChangeFormulario}
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
                    onClick={submitEditarUsuario}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
            {/* </LocalizationProvider> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
