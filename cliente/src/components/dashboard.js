import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillRecordFill } from "react-icons/bs";
import { obtenerAllEmpleosAction } from "../actions/empleosActions";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.login.login);
  useEffect(() => {
    //consultar api

    const cargarEmpleos = () => dispatch(obtenerAllEmpleosAction());
    cargarEmpleos();
    // eslint-disable-next-line
  }, []);
  const empleos = useSelector((state) => state.empleos.empleos);
  let finalizados = 0;
  let cancelados = 0;
  let activos = 0;
  let suspendidos = 0;
  empleos.forEach((e) => {
    if (e.nombreEstado === "Finalizado") {
      finalizados++;
    }
    if (e.nombreEstado === "Cancelado") {
      cancelados++;
    }
    if (e.nombreEstado === "Suspendido") {
      suspendidos++;
    }
    if (e.nombreEstado === "Activo") {
      activos++;
    }
    // if (e.nombreRubro === "Tech") {
    //   tech = e.nombreRubro;
    //   contTech++;
    // }
    // if (e.nombreRubro === "Obras") {
    //   obras = e.nombreRubro;
    //   contObras++;
    // }
  });
  const emp = () => {
    navigate("/empleos");
  };
  const cand = () => {
    navigate("/candidatos");
  };
  const clien = () => {
    navigate("/clientes");
  };
  return (
    <>
      <div class="row w-100">
        <div class="col-md-8">
          <div class="card custom-card-shadow">
            <div class="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p class="title-font">
                    <span>
                      Bienvenido&nbsp;
                      {usuario.nombre} {usuario.apellido}
                    </span>
                  </p>
                  <br />
                  <form class="form-horizontal p-t-20">
                    <div class="form-group">
                      <div>
                        <p class="card-text m-t-5">
                          <i class="fa fa-circle font-10 m-r-10 text-danger m-t-10"></i>
                          <BsFillRecordFill color="#ef5350" />
                          Roles pertenecientes
                        </p>
                        <span class="label label-rounded ">{usuario.rol}</span>
                      </div>
                    </div>
                  </form>
                </div>
                <img
                  class="col-md-6"
                  src={require("../assets/logoHorizonta.png")}
                  height="240px"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card custom-card-shadow">
            <div class="card-body">
              <p class="title-font">Estado de empleos</p>
              <p class="card-body__text">
                <i class="fa fa-circle font-10 m-r-10 text-info m-t-10"></i>
                Hay
                <b> {activos} </b>
                empleos activos
              </p>
              <p class="card-body__text">
                <i class="fa fa-circle font-10 m-r-10 text-info m-t-10"></i>
                Hay
                <b> {suspendidos} </b>
                empleos suspendidos
              </p>
              <br />
              <br />
              <button class="btn btn-primary w-100" onClick={emp}>
                Revisar
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <br />

          <div class="card custom-card-shadow">
            <div class="card-body">
              <p class="title-font">
                Candidatos
                <i class="fa fa-bell mx-2 heartbit"></i>
                <i class="fa fa-bell-o mx-2"></i>
              </p>
              <button class="btn btn-primary w-100" onClick={cand}>
                Ver
              </button>
            </div>
          </div>
          <br />
          <div class="card custom-card-shadow">
            <div class="card-body">
              <p class="title-font">Clientes</p>
              <button
                class="btn btn-waves-effect waves-light btn-primary w-100"
                onClick={clien}
              >
                <i class="mdi mdi-pencil-lock" aria-hidden="true"></i>
                Ver
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
