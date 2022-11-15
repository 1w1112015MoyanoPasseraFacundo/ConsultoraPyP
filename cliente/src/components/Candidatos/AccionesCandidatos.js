import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  darDeBajaCandidato,
  editarEstadoCandidatoAction,
  obtenerCandidatoEditar,
} from "../../actions/candidatosActions";
import Moment from "moment";
import { BsArrowRepeat, BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useEffect } from "react";

const AccionesCandidatos = ({ candidato }) => {
  const {
    nombre,
    apellido,
    documento,
    idPais,
    observaciones,
    estado,
    telefono,
    mail,
    fechaNacimiento,
    idCandidato,
    lstCompes,
  } = candidato;
  const [candidatos, guardarCandidato] = useState({
    estado: "",
    observaciones: "",
  });
  const editar = useSelector((state) => state.candidatos.editar);
  useEffect(() => {
    guardarCandidato(editar);
  }, [editar]);

  const onChangeFormulario = (e) => {
    guardarCandidato({
      ...candidatos,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const confirmarEliminar = (idCandidato) => {
    Swal.fire({
      title: "Está seguro que desea dar de baja este candidato?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(darDeBajaCandidato(candidato.idCandidato));
      }
    });
  };
  const submitEditarCandidato = (e) => {
    e.preventDefault();
    dispatch(editarEstadoCandidatoAction(candidatos));
    // Swal.fire({
    //   title: "¿Desea enviar un correo informando el cambio de estado?",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Confirmar",
    //   cancelButtonText: "Cancelar",
    //   allowOutsideClick: false,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     //metodo para enviar mail
    //     Swal.fire("Estado actulizado!", "", "success").then((result) => {
    //       if (result.isConfirmed) {
    //         handleClose();
    //       }
    //     });
    //   } else 
    //   if (result.isDenied) {
        Swal.fire("Estado actulizado!", "Se ha enviado un e-mail al candidato", "success").then((result) => {
          if (result.isConfirmed) {
            handleClose();
          }
    //     });
    //   }
    });
  };
  const navigate = useNavigate();

  const redireccionarEdicion = (candidato) => {
    dispatch(obtenerCandidatoEditar(candidato));
    navigate(`editar/${candidato.idCandidato}`);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    dispatch(obtenerCandidatoEditar(candidato));
  };
  return (
    <>
      <tr>
        <td>
          {apellido}, {nombre}
        </td>

        <td>
          <span>{documento}</span>
        </td>
        <td>
          <span>{mail}</span>
        </td>
        <td>
          <span>{Moment(fechaNacimiento).format("DD/MM/YYYY")}</span>
        </td>
        <td>
          <span>{estado}</span>
        </td>
        <td>
          <span>{telefono}</span>
        </td>

        <td className="acciones">
          {estado == "Descartado" ? null : (
            <button
              type="button"
              className="btn btn-success mr-2"
              title="Editar"
              onClick={() => redireccionarEdicion(candidato)}
            >
              <BsFillPencilFill />
            </button>
          )}
          {estado == "Descartado" ? null : (
            <button
              type="button"
              className="btn btn-warning mr-2"
              title="Cambiar estado"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={handleShow}
            >
              <BsArrowRepeat />
            </button>
          )}
          {estado == "Descartado" ? null : (
            <button
              type="button"
              className="btn btn-danger mr-2"
              title="Descartar"
              onClick={() => confirmarEliminar(idCandidato)}
            >
              <BsTrashFill />
            </button>
          )}
        </td>
      </tr>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cambiar estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Estado</label>
            <select
              className="form-control"
              name="estado"
              defaultValue={estado}
              onChange={onChangeFormulario}
            >
              <option>Postulado</option>
              <option>Preseleccionado</option>
              <option>En proceso</option>
              <option>En base</option>
              <option>Seleccionado</option>
            </select>
            <br />
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="observaciones"
              defaultValue={observaciones}
              onChange={onChangeFormulario}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={submitEditarCandidato}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccionesCandidatos;
