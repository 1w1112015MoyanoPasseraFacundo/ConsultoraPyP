import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BsDownload, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { obtenerPagoReporte } from "../../actions/pagosActions";
import AccionesReporte from "./AccionesReporte";
const Reportes = () => {
  const dispatch = useDispatch();

  const pagos = useSelector((state) => state.pagos.pagos);
  const error = useSelector((state) => state.pagos.error);

  const [fecha1, guardarFecha1] = useState("");
  const [fecha2, guardarFecha2] = useState("");

  useEffect(() => {
    //consultar api

    const cargarPagos = () => dispatch(obtenerPagoReporte(fecha1, fecha2));
    cargarPagos();
    // eslint-disable-next-line
  }, [fecha1, fecha2]);
  let monto = 0;
  for (let index = 0; index < pagos.length; index++) {
    monto += pagos[index].montoPago;
  }
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Empleos abonados entre ${fecha1} y ${fecha2}`;
    const headers = [["Cliente", "Empleo", "Monto", "Fecha"]];

    const data = pagos.map((elt) => [
      elt.nombreCliente,
      elt.nombreEmpleo,
      "$" + elt.montoPago,
      elt.fechaPago,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("EmpleosPorFecha.pdf");
  };

  return (
    <div class="card custom-card-shadow">
      <div class="card-body">
        <h2 className="h4 gx-mb-3">Cobros efectuados</h2>
        <div className="row p-t-20">
          <div class="col-md-5">
            <div class="form-group">
              <label class="control-label font-bold">Fecha desde</label>
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
              <label class="control-label font-bold">Fecha hasta</label>
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
          <div class="col-md-2">
            <div class="pull-right text-right form-group">
              <label class="control-label font-bold">&nbsp;</label>
              <button type="submit" class="btn btn-primary form-control">
                <i class="mx-1 mr-2">
                  <BsSearch />
                </i>
                <span> Buscar</span>
              </button>
            </div>
          </div>
        </div>
        {error !== null ? // <div
        //   role="alert"
        //   className="alert text-center animated fadeIn notFound"
        // >
        //   <img src={require("../../assets/documentNotFound.gif")} alt="404" />
        //   <h2>No se encontraron resultados.</h2>
        // </div>
        null : (
          <div class="row">
            <div class="col-lg-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="colu" scope="col">
                      Cliente
                    </th>
                    <th className="colu" scope="col">
                      Empleo
                    </th>
                    <th className="colu" scope="col">
                      Monto
                    </th>
                    <th align="center" className="colux" scope="col">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago) => {
                    console.log(pago);
                    let fecha = pago.fechaPago.split("T");
                    pago.fechaPago = fecha[0];
                    return <AccionesReporte key={pago.idPago} pago={pago} />;
                  })}
                </tbody>
                <br />
                <tfoot>
                  <div class="row">
                    <div className="col-md-8">
                      <button
                        type="submit"
                        class="btn btn-success"
                        onClick={exportPDF}
                      >
                        {/* <i class="mx-1 mr-2"> */}
                        <BsDownload />
                        {/* </i> */}
                        <span> Descargar</span>
                      </button>
                    </div>
                    <div className="col-md-4 pull-right">
                      <h2 className=" gx-font-weight-medium">$ {monto}</h2>
                      <p className="gx-text-grey">Monto total</p>
                    </div>
                  </div>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reportes;
<h1>Reportes</h1>;
