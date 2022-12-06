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
  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }
  return (
    <tr>
      <td>
        <span>{nombreCliente}</span>
      </td>
      <td>
        <span>{nombreEmpleo}</span>
      </td>
      <td width="40px">
        <span className="monto">${formatNumber(montoPago)}</span>
      </td>
      <td align="center">
        <span>{fechaPago}</span>
      </td>
    </tr>
  );
};

export default AccionesReporte;
