import React from "react";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
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
    nombreEstado,
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
    console.log("DESDE EMPLEO:", empleo);
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
        <button
          type="button"
          className="btn btn-success mr-2"
          onClick={() => redireccionarEdicion(empleo)}
        >
          <BsFillPencilFill />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(idEmpleo)}
        >
          <BsTrashFill />
        </button>
      </td>
    </tr>
  );
};

export default AccionesEmpleos;
