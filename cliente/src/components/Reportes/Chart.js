import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { obtenerEmpleosByFechasAction } from "../../actions/empleosActions";

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
    let nombreCliente = e.nombreCliente;
    if (nombreCliente.includes(" ")) {
      nombreCliente = nombreCliente.split(" ")[0];
    }
    data.push({ name: nombreCliente, Cantidad: e.countCliente, amt: 2400 });
  });
  console.log("EMPLEO", empleos);
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
      {empleos.length !== 0 ? (
        <>
          <br />
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 50,
              left: -16,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Cantidad" fill="#8884d8" />
          </BarChart>
        </>
      ) : (
        ""
      )}
    </>
  );
};
