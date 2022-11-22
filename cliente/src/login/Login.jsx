import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "./authActions";
import "./login.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const autenticado = useSelector((state) => state.login.autenticado);
  const loading = useSelector((state) => state.login.loading);
  

  const mensaje = useSelector((state) => state.login.mensaje);

  useEffect(() => {
    if (token!=null) {
      navigate("/", {replace:true});
    }
  }, [token]);

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

  const recover =()=>{
    navigate("/recoverPassword");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    try{
    // validar campos vacios
    if (nombreUsuario.trim() === "" || password.trim() === "") {
      Swal.fire("Todos los campos son obligatorios", "Intenta de nuevo", "error");
    }

     dispatch(iniciarSesion({ nombreUsuario, password }));
      //  navigate("/", {replace:true});

    }catch(error){

    }
  };
  return (
    <section id="wrapper" className="login-register login-sidebar login-bg-img">
      <div className="d-flex flex-column image-box justify-content-between align-items-center">
        <div className="text-center d-flex flex-column m-t-20">
          <img
            height="200px"
            className="logp"
          />
          <img
            height="200px"
            src={require("../assets/logowhite.png")}
          
            alt="Home"
            className="my-4 display-responsive"
          />

          <h5 className="text-info my-4 display-responsive">v.1.0.0</h5>
        </div>

      </div>
      <div className="login-box card px-2">
        <div className="card-body d-flex justify-content-center align-items-center flex-responsive">

          <form
            className="form-horizontal form-material w-100"
            id="loginform">
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
                type="button"
                  id="to-recover"
                  className="text-dark pull-right"
                  onClick={recover}
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
                  onClick={onSubmit}
                >
                {loading?(
                <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
                </div>): "Iniciar sesión"}

                  
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
