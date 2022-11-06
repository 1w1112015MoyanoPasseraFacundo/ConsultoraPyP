import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
const Portfolio = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div class="card custom-card-shadow">
      <div class="card-body">
        <h2 className="h4 gx-mb-3">Cobros efectuados</h2>
        <div className="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label font-bold">Fecha desde</label>
              <input
                type="date"
                class="form-control"
                formControlName="fechaDesde"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label font-bold">Fecha hasta</label>
              <input
                type="date"
                class="form-control"
                formControlName="fechaHasta"
              />
            </div>
          </div>
          <div className="ant-row-flex">
            <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">
              $ 1000
            </h2>
          </div>
          <p className="gx-text-grey">Monto total de órdenes de este mes</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
