import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "./authActions";
import "./login.css";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const autenticado = useSelector((state) => state.login.autenticado);
  const mensaje = useSelector((state) => state.login.mensaje);
  useEffect(() => {
    if (autenticado) {
      navigate("/");
    }
    if (mensaje!==null) {
      Swal.fire(mensaje, "Intenta de nuevo", "error");
    }
  }, [autenticado, mensaje]);

  const [usuario, guardarUsuario] = useState({
    nombreUsuario: "",
    password: "",
  });

  const { nombreUsuario, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar campos vacios
    if (nombreUsuario.trim() === "" || password.trim() === "") {
      Swal.fire("Todos los campos son obligatorios", "Intenta de nuevo", "error");
    }

    dispatch(iniciarSesion({ nombreUsuario, password }));
  };
  return (
    <section id="wrapper" className="login-register login-sidebar login-bg-img">
      <div className="d-flex flex-column image-box justify-content-between align-items-center">
        <div className="text-center d-flex flex-column m-t-20">
          <img
            height="200px"
            alt="Home"
            className="logp my-4 display-responsive"
          />
          <img
            height="200px"
            src={require("../assets/logo.png")}
            alt="Home"
            className="logp my-4 display-responsive"
          />

          <h5 className="text-info my-4 display-responsive">v.1.0.0</h5>
        </div>

      </div>
      <div className="login-box card px-2">
        <div className="card-body d-flex justify-content-center align-items-center flex-responsive">

          <form
            className="form-horizontal form-material w-100"
            id="loginform"
            autocomplete="off"
            onSubmit={onSubmit}>
            <div className="form-group m-t-30">
              <h3 className="box-title m-t-20 m-b-30 title-decorator">
                Iniciar sesión
              </h3>
              <div className="col-xs-12">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre de Usuario"
                  id="nombreUsuario"
                  name="nombreUsuario"
                  value={nombreUsuario}
                  onChange={onChange}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
              value={password}
              onChange={onChange}
               />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-12">
                <a
                  id="to-recover"
                  className="text-dark pull-right link-wf"
                  href="/"
                >
                  <i className="fa fa-lock m-r-5"></i> ¿Olvidaste tu clave?
                </a>
              </div>
            </div>
            <div className="form-group text-center m-t-20">
              <div className="col-xs-12">
                <button
                  className="btn btn-info btn-block m-b-20 p-10 btn-block waves-effect waves-light"
                  type="submit"
                >
                  {/* {{ loading: "Iniciar sesión" }} */}
                  Iniciar sesión
                  <app-dots-animation
                    size=".9rem"
                    color="#ffffff"
                  ></app-dots-animation>
                </button>
              </div>
            </div>

          </form>
        </div>

        <img
          className="m-b-10 login-box-icon powered-mobile"
          //   src="../../../assets/images/powerby-encode.png"
        />
      </div>
    </section>
  );
};

export default Login;
