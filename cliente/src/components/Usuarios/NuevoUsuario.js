import React, { useEffect, useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { crearNuevoUsuarioAction } from "../../actions/usuariosActions";
import clienteAxios from "../../config/axios";
const NuevoUsuario = () => {
  //state

  const [nombre, guardarNombre] = useState("");
  const [apellido, guardarApellido] = useState("");
  const [mail, guardarMail] = useState("");
  const [idTipoDocumento, guardarTipoDocumento] = useState(0);
  const [listaTiposDocs, guardarTiposDocs] = useState([]);
  const [documento, guardarDocumento] = useState("");
  const [password, guardarContraseña] = useState("");
  const [fechaNacimiento, guardarFecha] = useState("");
  const [nombreUsuario, guardarNombreUsuario] = useState("");
  const [direccion, guardarDireccion] = useState("");
  const [telefono, guardarTelefono] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.usuarios.error);
  useEffect(() => {
    if (error === false) {
      Swal.fire(
        "Correcto!",
        "El usuario se agrego correctamente!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/usuarios");
        }
      });
    }
    // eslint-disable-next-line
  }, [error]);

  //llama UsuarioAction
  const agregarUsuario = (usuario) => {
    try {
      dispatch(crearNuevoUsuarioAction(usuario));
    } catch (error) {}
  };
  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/TiposDocumentos`);
      guardarTiposDocs(resultado.data);
    };
    consultarAPI();
  }, []);

  const login = useSelector((state) => state.login.login);

  const submitNuevoUsuario = (e) => {
    e.preventDefault();
    let fecha = fechaNacimiento.split("-")[0];
    //validar form
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      idTipoDocumento === 0 ||
      mail.trim() === "" ||
      documento.trim() === "" ||
      nombreUsuario.trim() === "" ||
      password.trim() === "" ||
      fechaNacimiento.trim() === "" ||
      documento.includes("-") ||
      telefono.includes("-")
    ) {
      Swal.fire("Llene los campos obligatorios", "", "warning");
      return;
    } else if (documento.length !== 8) {
      Swal.fire("El campo documento sólo acepta ocho números", "", "warning");
      return;
    } else if (fecha < 1900 || fecha > 2022) {
      Swal.fire("Ingrese un año válido", "", "warning");
      return;
    } else if (telefono !== "") {
      if (telefono.length < 7 || telefono.length > 20) {
        Swal.fire("Ingrese un télefono correcto", "", "warning");
        return;
      }
    }

    //harcorde some data
    const idGenero = 1;
    const cuil = documento;
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
      password,
      direccion,
      telefono,
    });
  };
  const cancelar = () => {
    navigate("/usuarios");
  };

  return (
    <>
      {login.rol === "Admin" ? (
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h3 className="title-decorator">Nuevo Usuario</h3>
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
                        value={idTipoDocumento}
                        onChange={(e) => guardarTipoDocumento(e.target.value)}
                      >
                        <option>Seleccione...</option>

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
                        type="number"
                        className="form-control"
                        placeholder="Documento"
                        name="documento"
                        min="0"
                        minLength={8}
                        maxLength={8}
                        value={documento}
                        onChange={(e) => guardarDocumento(e.target.value)}
                      />
                    </div>
                    <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <label>Fecha de nacimiento</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaNacimiento"
                        value={fechaNacimiento}
                        onChange={(e) => guardarFecha(e.target.value)}
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
                        onChange={(e) => guardarNombreUsuario(e.target.value)}
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
                        onChange={(e) => guardarContraseña(e.target.value)}
                      />
                    </div>
                    <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
                  </div>
                  <h4 className="card-subtitle font-italic">
                    Datos opcionales
                  </h4>
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
                          min="0"
                          minLength={8}
                          maxLength={8}
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
                        onClick={submitNuevoUsuario}
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

export default NuevoUsuario;
