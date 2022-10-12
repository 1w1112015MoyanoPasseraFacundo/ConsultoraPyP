import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { darDeBajaPago, obtenerPagoEditar } from "../../actions/pagosActions";
const AccionesPagos = ({ pago }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { montoPago, fechaPago, idCliente, nombreCliente, Estado, idPago } =
    pago;

  const confirmarEliminar = (idPago) => {
    Swal.fire({
      title: "Está seguro que desea dar de baja este pago?",
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
    console.log(pago);
    navigate(`editar/${pago.idPago}`);
  };
  return (
    <tr>
      <td>
        <span className="font-weight-bold">{nombreCliente}</span>
      </td>
      <td>
        <span className="font-weight-bold">{montoPago}</span>
      </td>
      <td>
        <span className="font-weight-bold">{fechaPago}</span>
      </td>
      <td>
        <span className="font-weight-bold">{Estado}</span>
      </td>

      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(pago)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idPago)}
        >
          Dar de baja
        </button>
      </td>
    </tr>
  );
};

export default AccionesPagos;
