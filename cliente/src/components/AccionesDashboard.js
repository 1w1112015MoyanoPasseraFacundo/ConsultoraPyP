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


  // const [candidato, guardarCandidato] = useState({
  //   nombre: "",
  //   apellido: "",
  //   mail: "",
  //   idTipoDocumento: 0,
  //   documento: "",
  //   idRubro: 0,
  //   fechaNacimiento: "",
  //   idPais: 0,
  //   idGenero: 0,
  //   linkedin: "",
  //   telefono: "",
  //   estadoCivil: "",
  //   lstCompes: [],
  // });




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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Candidato</Modal.Title>
        </Modal.Header>
        <Modal.Body>            <form>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    name="apellido"
                    value={apellido}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Correo electrónico</label>
                  <input
                    type="mail"
                    className="form-control"
                    placeholder="E-mail"
                    name="mail"
                    value={mail}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Tipo de Documento</label>
                  <select
                    className="form-control"
                    name="idTipoDocumento"
                    value={idTipoDocumento}
                  >
                    <option>Seleccione...</option>
                    {/* {listaTiposDocs.map((tipoDocumento) => (
                      <option
                        key={tipoDocumento.idTipoDocumento}
                        value={tipoDocumento.idTipoDocumento}
                      >
                        {tipoDocumento.nombre}
                      </option>
                    ))} */}
                  </select>
                </div>
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Documento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Documento"
                    name="documento"
                    value={documento}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Rubro</label>
                  <select
                    className="form-control"
                    name="idRubro"
                    value={idRubro}
                  >
                    <option>Seleccione...</option>
                    {/* {listaRubros.map((rubro) => (
                      <option key={rubro.idRubro} value={rubro.idRubro}>
                        {rubro.nombre}
                      </option>
                    ))} */}
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Habilidades</label>
                  {/* <Multipleselect
                    options={data ? data : []}
                    setState={guardarCompetencias}
                    defaultOption={"Seleccione habilidades..."}
                  /> */}
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Género</label>
                  <select
                    className="form-control"
                    name="idGenero"
                    value={idGenero}
                  >
                    <option>Seleccione...</option>
                    {/* {listaGeneros.map((genero) => (
                      <option key={genero.idGenero} value={genero.idGenero}>
                        {genero.nombre}
                      </option>
                    ))} */}
                  </select>
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>País</label>
                  <select
                    className="form-control"
                    name="pais"
                    value={idPais}
                  >
                    <option>Seleccione...</option>
                    <option value="1">Argentina</option>
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Estado</label>
                  <select
                    className="form-control"
                    name="estado"
                    value={estado}
                  >
                    <option>Postulado</option>
                    <option>Preseleccionado</option>
                    <option>En proceso</option>
                    <option>En base</option>
                    <option>Seleccionado</option>
                  </select>
                </div>
              </div>
              <h4 className="card-subtitle font-italic">Datos opcionales</h4>
              <hr />
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Teléfono </label>
                    <input
                      type="Number"
                      className="form-control"
                      name="telefono"
                      value={telefono}
                      />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Linkedin </label>
                    <input
                      type="text"
                      className="form-control"
                      name="linkedin"
                      value={linkedin}
                      />
                  </div>
                </div>
              </div>
            </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccionesDashboard;
