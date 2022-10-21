import React from "react";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { darDeBajaPago, obtenerPagoEditar } from "../../actions/pagosActions";
const AccionesPagos = ({ pago }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { montoPago, fechaPago, idCliente, nombreCliente, estado, idPago } =
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
        <span>{nombreCliente}</span>
      </td>
      <td>
        <span>{montoPago}</span>
      </td>
      <td>
        <span>{fechaPago}</span>
      </td>
      <td>
        <span>{estado ? "Completo" : "Parcial"}</span>
      </td>

      <td className="acciones">
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={() => redireccionarEdicion(pago)}
        >
          <BsFillPencilFill />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idPago)}
        >
          <BsTrashFill />
        </button>
      </td>
    </tr>
  );
};

export default AccionesPagos;
