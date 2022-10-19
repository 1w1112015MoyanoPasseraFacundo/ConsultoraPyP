import React, { Fragment } from "react";
import "./dashboard.css";
import { ReactComponent as YourSvg } from "../assets/dashboard-ppl.svg";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  const cand = () => {
    navigate("/candidatos");
  };
  const compe = () => {
    navigate("/competencias");
  };
  const usu = () => {
    navigate("/usuarios");
  };
  const pago = () => {
    navigate("/pagos");
  };
  const clien = () => {
    navigate("/clientes");
  };
  const emp = () => {
    navigate("/empleos");
  };
  return (
    <Fragment>
      <div class="card custom-card-shadow">
        <div class="card-body">
          {/* <p class="title-font">
              <span>Bienvenido Usuario</span>
            </p> */}
          <div class="row">
            <div class="col-md-8">
              <br></br>
              <br></br>
              <br></br>

              <p class="title-font">
                <span>Bienvenido Usuario</span>
              </p>
              {/* <div>
                  <p class="card-body__text">
                    <i class="fa fa-circle font-10 m-r-10 text-info m-t-10"></i>
                    Áreas pertenecientes
                  </p>
                  <span class="label bg-light-info text-info label-rounded m-r-5">
                    Area
                  </span>
                </div> */}
            </div>
            <div class="col-md-4">
              <YourSvg height="230px" />
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div class="grid-col-3">
        <div class="btn-area" onClick={emp}>
          <span class="p-t-30">5</span> Empleos
        </div>
        <div class="btn-area" onClick={cand}>
          <span class="p-t-30">COUNT</span> Candidatos
        </div>
        <div class="btn-area" onClick={clien}>
          <span class="p-t-30">COUNT</span>
          Clientes
        </div>
        <div class="btn-area" onClick={pago}>
          <span class="p-t-30">COUNT</span> Pagos
        </div>
        <div class="btn-area" onClick={compe}>
          <span class="p-t-30">COUNT</span>
          Competencias
        </div>
        <div class="btn-area" onClick={usu}>
          <span class="p-t-30">COUNT</span>
          Usuarios
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
