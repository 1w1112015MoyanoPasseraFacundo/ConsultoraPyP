import React from "react";
import {
  BsCheckCircleFill,
  BsFillPencilFill,
  BsFillReplyAllFill,
  BsRecycle,
  BsTrashFill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  darDeBajaCliente,
  obtenerClienteEditar,
} from "../../actions/clientesActions";
const AccionesCliente = ({ cliente }) => {
  const { nombre, documento, idPais, mail, idCliente, nombrePais, idEstado } =
    cliente;
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
      <td>
        <span>{idEstado == 1 ? "Si" : "No"}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          title="Editar"
          className="btn btn-success mr-2"
          onClick={() => redireccionarEdicion(cliente)}
        >
          <BsFillPencilFill />
        </button>

        {idEstado == 1 ? (
          <button
            type="button"
            title="Dar de baja"
            className="btn btn-danger"
            onClick={() => confirmarEliminar(idCliente)}
          >
            <BsTrashFill />
          </button>
        ) : (
          <button
            type="button"
            title="Dar de alta"
            className="btn btn-warning"
            onClick={() => confirmarEliminar(idCliente)}
          >
            <BsRecycle />
          </button>
        )}
      </td>
    </tr>
  );
};

export default AccionesCliente;
