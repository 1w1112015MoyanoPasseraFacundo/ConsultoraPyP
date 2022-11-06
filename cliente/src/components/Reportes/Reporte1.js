import React from "react";
const Reporte1 = () => {
  return (
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-24">
      <div className="gx-site-dash">
        <h5 className="gx-mb-3">Órdenes de compra por estado</h5>
        <ul className="gx-line-indicator gx-fs-sm gx-pb-1 gx-pb-sm-0">
          <li>
            <p>Activos</p>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
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
                style={{ width: "10%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                title="10%"
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
                style={{ width: "100%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
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
                style={{ width: "95%" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Reporte1;
