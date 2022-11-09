import React, { useEffect, useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
    password: "",
    fechaNacimiento: "",
    nombreUsuario: "",
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
    password,
    fechaNacimiento,
    nombreUsuario,
    direccion,
    telefono,
  } = usuario;

  const submitEditarUsuario = (e) => {
    e.preventDefault();
    //validar form
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      idTipoDocumento === 0 ||
      mail.trim() === "" ||
      documento === "" ||
      nombreUsuario.trim() === "" ||
      password.trim() === "" ||
      fechaNacimiento.trim() === ""
    ) {
      Swal.fire("Llene los campos obligatorios", "", "warning");
      return;
    }

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
        <h3 className="title-decorator">Editar Usuario</h3>
        <div className="card">
          <div className="card-body">
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
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={onChangeFormulario}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
                  <label>Contraseña</label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
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
                    onClick={submitEditarUsuario}
                  >
                    <i class="mx-1 mr-2">
                      <BsCheckLg />
                    </i>
                    <span> Guardar</span>
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
