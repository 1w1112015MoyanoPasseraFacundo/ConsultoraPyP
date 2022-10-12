import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  darDeBajaEmpleo,
  obtenerEmpleoEditar,
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
    lstCompes,
    idEmpleo,
  } = empleo;
  const confirmarEliminar = (idEmpleo) => {
    Swal.fire({
      title: "Está seguro que desea dar de baja este empleo?",
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
  const redireccionarEdicion = (empleo) => {
    dispatch(obtenerEmpleoEditar(empleo));
    console.log(empleo);
    navigate(`editar/${empleo.idEmpleo}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">{nombreCliente}</span>
      </td>
      <td>
        <span className="font-weight-bold">{nombreRubro}</span>
      </td>
      <td>
        <span className="font-weight-bold">{modalidad}</span>
      </td>
      <td>
        <span className="font-weight-bold">{idEstado}</span>
      </td>
      <td>
        <span className="font-weight-bold">{lstCompes}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={() => redireccionarEdicion(empleo)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idEmpleo)}
        >
          Dar de baja
        </button>
      </td>
    </tr>
  );
};

export default AccionesEmpleos;
