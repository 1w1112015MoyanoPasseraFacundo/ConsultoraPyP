import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
const AccionesDashboard = ({ candidato }) => {
  const {
    nombre,
    apellido,
    linkedin,
    estado,
    telefono,
    mail,
    documento,
    fechaNacimiento,
    idRubro,
    idTipoDocumento,
    idGenero,
    idPais,
    idCandidato,
    lstCompes,
  } = candidato;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <tr>
        <td>
          {apellido}, {nombre}
        </td>

        <td>
          <span>{mail}</span>
        </td>
        <td>
          <span>{telefono}</span>
        </td>
        <td>
          <span>{linkedin}</span>
        </td>
        <td>
          <span>{estado}</span>
        </td>

        <td className="acciones">
          <button
            type="button"
            className="btn btn-success mr-2"
            title="Ver"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={handleShow}
          >
            <BsSearch />
          </button>
        </td>
      </tr>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Candidato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form>
            <div className="row p-t-20">
              <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  disabled="true"
                />
              </div>
              <div className="form-group  col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  name="apellido"
                  value={apellido}
                  disabled="true"
                />
              </div>
            </div>
            <div className="row p-t-20">
              <div className="form-group  col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label>E-mail</label>
                <input
                  type="mail"
                  className="form-control"
                  placeholder="E-mail"
                  name="mail"
                  value={mail}
                  disabled="true"
                />
              </div>
              <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label>Documento</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Documento"
                  name="documento"
                  value={documento}
                  disabled="true"
                />
              </div>
            </div>
            <div className="row p-t-20">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="form-label"> Teléfono </label>
                  <input
                    type="Number"
                    className="form-control"
                    name="telefono"
                    value={telefono}
                    disabled="true"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="form-label"> Linkedin </label>
                  <input
                    type="text"
                    className="form-control"
                    name="linkedin"
                    value={linkedin}
                    disabled="true"
                  />
                </div>
              </div>
            </div>
            <div className="row p-t-20">
              <div className="form-group  col-lg-6 col-md-6  col-sm-12 col-xs-12">
                <label>País</label>
                <select
                  className="form-control"
                  name="pais"
                  value={idPais}
                  disabled="true"
                >
                  <option>Seleccione...</option>
                  <option value="1">Argentina</option>
                </select>
              </div>
              <div className="form-group col-lg-6 col-md-6  col-sm-12 col-xs-12">
                <label>Estado</label>
                <select
                  className="form-control"
                  name="estado"
                  value={estado}
                  disabled="true"
                >
                  <option>Postulado</option>
                  <option>Preseleccionado</option>
                  <option>En proceso</option>
                  <option>En base</option>
                  <option>Seleccionado</option>
                </select>
              </div>
            </div>
          </form>
          <Button
            variant="primary"
            onClick={handleClose}
            size="lg"
            className="float-right"
          >
            Aceptar
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AccionesDashboard;
