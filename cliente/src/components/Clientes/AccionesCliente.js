import React from "react";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  darDeBajaCliente,
  obtenerClienteEditar,
} from "../../actions/clientesActions";
const AccionesCliente = ({ cliente }) => {
  const { nombre, documento, idPais, mail, idCliente, nombrePais } = cliente;
  console.log(cliente);
  const dispatch = useDispatch();
  const confirmarEliminar = (idCliente) => {
    Swal.fire({
      title: "Está seguro que desea dar de baja este cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(darDeBajaCliente(cliente.idCliente));
      }
      console.log(cliente);
    });
  };

  const navigate = useNavigate();

  const redireccionarEdicion = (cliente) => {
    dispatch(obtenerClienteEditar(cliente));
    console.log(cliente);
    navigate(`editar/${cliente.idCliente}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span>{nombrePais}</span>
      </td>
      <td>
        <span>{documento}</span>
      </td>
      <td>
        <span>{mail}</span>
      </td>

      <td className="acciones">
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={() => redireccionarEdicion(cliente)}
        >
          <BsFillPencilFill />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idCliente)}
        >
          <BsTrashFill />
        </button>
      </td>
    </tr>
  );
};

export default AccionesCliente;
