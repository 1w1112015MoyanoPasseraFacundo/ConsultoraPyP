import React, { PureComponent, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  obtenerEmpleosByFechasAction,
  obtenerEmpleosByMesAction,
} from "../../actions/empleosActions";

export const Chart = () => {
  const dispatch = useDispatch();
  const [fecha1, guardarFecha1] = useState("");
  const [fecha2, guardarFecha2] = useState("");
  useEffect(() => {
    //consultar api
    const cargarEmpleos = () =>
      dispatch(obtenerEmpleosByFechasAction(fecha1, fecha2));
    cargarEmpleos();
    // eslint-disable-next-line
  }, [fecha1, fecha2]);
  const empleos = useSelector((state) => state.empleos.reporte);
  let data = [];
  empleos.forEach((e) => {
    data.push({ name: e.nombreCliente, Cantidad: e.countCliente, amt: 2400 });
  });
  return (
    <>
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
      </div>
      {/* <select class="form-control" onChange={(e) => guardarMes(e.target.value)}>
        <option value={0}>Todos</option>
        <option value={1}>Enero</option>
        <option value={2}>Febrero</option>
        <option value={3}>Marzo</option>
        <option value={4}>Abril</option>
        <option value={5}>Mayo</option>
        <option value={6}>Junio</option>
        <option value={7}>Julio</option>
        <option value={8}>Agosto</option>
        <option value={9}>Septiembre</option>
        <option value={10}>Octubre</option>
        <option value={11}>Noviembre</option>
        <option value={12}>Diciembre</option>
      </select> */}
      {empleos.length !== 0 ? (
        <>
          <br />
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Cantidad" fill="#8884d8" />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
          </BarChart>
        </>
      ) : (
        ""
      )}
    </>
  );
};
