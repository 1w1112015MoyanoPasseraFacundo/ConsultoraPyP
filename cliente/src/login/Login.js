import React from "react";
import "./login.css";
const Login = () => {
  return (
    <section id="wrapper" className="login-register login-sidebar login-bg-img">
      <div className="d-flex flex-column image-box justify-content-between align-items-center">
        <div className="text-center d-flex flex-column m-t-20">
          <img
            height="200px"
            // src={require("../assets/logo.png")}
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
        <img
          className="m-b-20 display-responsive"
          src="./src/assets/logo.png"
        />
      </div>
      <div className="login-box card px-2">
        <div className="card-body d-flex justify-content-center align-items-center flex-responsive">
          <img
            // src=" ../assets/images/logo-wf.svg"
            // alt="Home"
            className="my-2 login-box-icon"
          />
          <img
            // src="../../../assets/images/bandeja-de-documentos.png"
            className="my-4 login-box-icon bandeja-imagen-hv"
          />

          <form
            className="form-horizontal form-material w-100"
            id="loginform"
            autocomplete="off"
          >
            <div className="form-group m-t-30">
              <h3 className="box-title m-t-20 m-b-30 title-decorator">
                Iniciar sesión
              </h3>
              <div className="col-xs-12">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Usuario"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Contraseña"
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
            <div className="form-group row">
              <div className="col-md-12">
                <a> ¿No tienes una cuenta?</a>
                <a
                  id="to-recover"
                  className="text-dark pull-right link-wf"
                  href="/"
                >
                  <i className="fa fa-lock m-r-5"></i>
                  Registrarme
                </a>
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
