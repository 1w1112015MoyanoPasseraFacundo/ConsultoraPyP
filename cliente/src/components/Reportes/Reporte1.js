import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import {
  obtenerAllEmpleosAction,
  obtenerEstadosEmpleosByFechasAction,
} from "../../actions/empleosActions";
import { Chart } from "./Chart";
const Reporte1 = () => {
  const dispatch = useDispatch();
  const [fecha1, guardarFecha1] = useState("");
  const [fecha2, guardarFecha2] = useState("");
  useEffect(() => {
    //consultar api

    const cargarEmpleos = () =>
      dispatch(obtenerEstadosEmpleosByFechasAction(fecha1, fecha2));
    cargarEmpleos();
    // eslint-disable-next-line
  }, [fecha1, fecha2]);

  const empleos = useSelector((state) => state.empleos.empleos);
  console.log("Empleos", empleos);
  // let finalizados = 0;
  // let cancelados = 0;
  // let activos = 0;
  // let suspendidos = 0;
  // let tech = "";
  // let obras = "";
  // let contTech = 0;
  // let contObras = 0;
  // empleos.forEach((e) => {
  //   if (e.nombreEstado === "Finalizado") {
  //     finalizados++;
  //   }
  //   if (e.nombreEstado === "Cancelado") {
  //     cancelados++;
  //   }
  //   if (e.nombreEstado === "Suspendido") {
  //     suspendidos++;
  //   }
  //   if (e.nombreEstado === "Activo") {
  //     activos++;
  //   }
  //   if (e.nombreRubro === "Tech") {
  //     tech = e.nombreRubro;
  //     contTech++;
  //   }
  //   if (e.nombreRubro === "Obras") {
  //     obras = e.nombreRubro;
  //     contObras++;
  //   }
  // });

  // let finalizado = Math.round((finalizados / empleos.length) * 100);
  // let cancelado = Math.round((cancelados / empleos.length) * 100);
  // let suspendido = Math.round((suspendidos / empleos.length) * 100);
  // let activo = Math.round((activos / empleos.length) * 100);
  // let obra = Math.round((contObras / empleos.length) * 100);
  // let tec = Math.round((contTech / empleos.length) * 100);

  let data = [];
  empleos.forEach((e) => {
    data.push({ name: e.nombreEstado, value: e.countEstado });
  });
  console.log("DATA", data);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) + 6;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) - 20;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="row">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-24">
        <h5 className="gx-mb-3">Vacantes finalizadas</h5>
        <br />
        <Chart />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-24">
        <div className="gx-site-dash">
          <h5 className="gx-mb-3"> Estado de vacantes</h5>
          <br />
          <div className="row p-t-20">
            <div class="col-md-5">
              <div class="form-group">
                <label class="control-label font-bold">Desde</label>
                <input
                  type="date"
                  class="form-control"
                  formControlName="fechaDesde"
                  name="fecha1"
                  value={fecha1}
                  onChange={(e) => guardarFecha1(e.target.value)}
                />
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group">
                <label class="control-label font-bold">Hasta</label>
                <input
                  type="date"
                  class="form-control"
                  formControlName="fechaHasta"
                  name="fecha2"
                  value={fecha2}
                  onChange={(e) => guardarFecha2(e.target.value)}
                />
              </div>
            </div>
          </div>{" "}
          <br />
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="55%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={136}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip isAnimationActive={false} />
          </PieChart>
        </div>
      </div>
      {/* <div className="gx-site-dash">
        <h5 className="gx-mb-3">Empleos por estado</h5>
        <ul className="gx-line-indicator gx-fs-sm gx-pb-1 gx-pb-sm-0">
          <li>
            <p>Activos</p>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: `${activo}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
                title={activo + "%"}
              ></div>
            </div>
          </li>
          <br />
          <li>
            <p>Finalizados</p>
            <div class="progress">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${finalizado}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
                title={finalizado + "%"}
              ></div>
            </div>
          </li>
          <br />
          <li>
            <p>Suspendidos</p>
            <div class="progress">
              <div
                class="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${suspendido}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
                title={suspendido + "%"}
              ></div>
            </div>
          </li>
          <br />
          <li>
            <p>Cancelados</p>
            <div class="progress">
              <div
                class="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${cancelado}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
                title={cancelado + "%"}
              ></div>
            </div>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Reporte1;
