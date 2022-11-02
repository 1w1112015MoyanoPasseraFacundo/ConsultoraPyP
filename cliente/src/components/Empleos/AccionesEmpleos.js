import React, { useEffect } from "react";
import {
  BsFillPauseFill,
  BsFillPencilFill,
  BsFillPlayFill,
  BsTrashFill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  darDeBajaEmpleo,
  obtenerEmpleoEditar,
  reanudarEmpleo,
  suspenderEmpleo,
} from "../../actions/empleosActions";
const AccionesEmpleos = ({ empleo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    nombre,
    nombreCliente,
    nombreRubro,
    modalidad,
    idEstado,
    nombreEstado,
    lstCompes,
    idEmpleo,
  } = empleo;
  const confirmarEliminar = (idEmpleo) => {
    Swal.fire({
      title: "¿Está seguro que desea cancelar este empleo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(darDeBajaEmpleo(empleo.idEmpleo));
      }
    });
  };

  const confirmarSuspender = (idEmpleo) => {
    Swal.fire({
      title: "¿Está seguro que desea suspender este empleo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(suspenderEmpleo(empleo.idEmpleo));
      }
    });
  };

  const confirmarReanudar = (idEmpleo) => {
    Swal.fire({
      title: "¿Está seguro que desea reanudar este empleo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(reanudarEmpleo(empleo.idEmpleo));
      }
    });
  };
  const redireccionarEdicion = (empleo) => {
    dispatch(obtenerEmpleoEditar(empleo));
    navigate(`editar/${empleo.idEmpleo}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span>{nombreCliente}</span>
      </td>
      <td>
        <span>{nombreRubro}</span>
      </td>
      <td>
        <span>{modalidad}</span>
      </td>
      <td>
        <span>{nombreEstado}</span>
      </td>

      <td className="acciones">
        {nombreEstado != "Finalizado" ? (
          <button
            type="button"
            className="btn btn-success mr-2"
            title="Editar"
            onClick={() => redireccionarEdicion(empleo)}
          >
            <BsFillPencilFill />
          </button>
        ) : null}
        {nombreEstado == "Activo" ? (
          <button
            type="button"
            className="btn btn-warning mr-2"
            title="Suspender"
            onClick={() => confirmarSuspender(idEmpleo)}
          >
            <BsFillPauseFill />
          </button>
        ) : null}
        {nombreEstado == "Suspendido" || nombreEstado == "Cancelado" ? (
          <button
            type="button"
            className="btn btn-warning mr-2"
            title="Reanudar"
            onClick={() => confirmarReanudar(idEmpleo)}
          >
            <BsFillPlayFill />
          </button>
        ) : null}

        {nombreEstado == "Activo" ? (
          <button
            type="button"
            className="btn btn-danger"
            title="Cancelar"
            onClick={() => confirmarEliminar(idEmpleo)}
          >
            <BsTrashFill />
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default AccionesEmpleos;
