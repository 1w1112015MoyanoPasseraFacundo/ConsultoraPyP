import React from "react";
import { BsFillPauseFill, BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { darDeBajaPago, obtenerPagoEditar } from "../../actions/pagosActions";
const AccionesPagos = ({ pago }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const confirmarEliminar = (idPago) => {
    Swal.fire({
      title: "¿Está seguro que desea dar de baja este pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(darDeBajaPago(pago.idPago));
      }
    });
  };
  const redireccionarEdicion = (pago) => {
    dispatch(obtenerPagoEditar(pago));
    navigate(`editar/${pago.idPago}`);
  };
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

      <td className="acciones">
        <button
          type="button"
          className="btn btn-success mr-2"
          title="Editar"
          onClick={() => redireccionarEdicion(pago)}
        >
          <BsFillPencilFill />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          title="Eliminar"
          onClick={() => confirmarEliminar(idPago)}
        >
          <BsTrashFill />
        </button>
      </td>
    </tr>
  );
};

export default AccionesPagos;
