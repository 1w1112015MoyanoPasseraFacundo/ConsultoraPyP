import React from "react";
const AccionesReporte = ({ pago }) => {
  const {
    montoPago,
    fechaPago,
    idCliente,
    nombreCliente,
    estado,
    idPago,
    nombreEmpleo,
  } = pago;
  return (
    <tr>
      <td>
        <span>{nombreCliente}</span>
      </td>
      <td>
        <span>{nombreEmpleo}</span>
      </td>
      <td width="40px">
        <span className="monto">${montoPago}</span>
      </td>
      <td align="center">
        <span>{fechaPago}</span>
      </td>
    </tr>
  );
};

export default AccionesReporte;
