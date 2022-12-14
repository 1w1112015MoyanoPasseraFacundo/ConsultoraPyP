import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsFillPencilFill, BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { obtenerCandidatoEditar } from "../actions/candidatosActions";
import clienteAxios from "../config/axios";
import { useGetCompetencia } from "./Empleos/Hooks/useGetCompetencia";
import { Multipleselect } from "./MultipleSelect";
const AccionesDashboard = ({ candidato }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [listaPaises, guardarPaises] = useState([]);
  const redireccionarEdicion = (candidato) => {
    dispatch(obtenerCandidatoEditar(candidato));
    navigate(`/candidatos/editar/${candidato.idCandidato}`);
  };
  useEffect(() => {
    const llenarPais = async () => {
      const resultado = await clienteAxios.get(`/Paises`);
      guardarPaises(resultado.data);
    };
    llenarPais();
  }, []);

  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  const handleClose = () => setShow(false);
  const formattedCompetencies = useMemo(
    () =>
      lstCompes.map((e) => {
        return { value: e.idCompetencia, label: e.nombre };
      }),
    [lstCompes]
  );

  let [value, setValue] = useState(
    formattedCompetencies ? formattedCompetencies : null
  );

  if (value.length === 0) {
    value = formattedCompetencies;
  }
  const { data } = useGetCompetencia(idRubro);
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
          <span>{estado}</span>
        </td>
        <td className="acciones">
          <button
            type="button"
            className="btn btn-warning mr-2"
            title="Ver"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => redireccionarEdicion(candidato)}
          >
            <BsFillPencilFill />
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            title="Ver"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => handleShow()}
          >
            <BsSearch />
          </button>
        </td>
      </tr>

      <Modal size="lg" show={show} onHide={handleClose}>
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
              <div className="form-group  col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label>Nacimiento</label>
                <input
                  type="mail"
                  className="form-control"
                  placeholder="E-mail"
                  name="mail"
                  value={fechaNacimiento}
                  disabled="true"
                />
              </div>
              <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label>G??nero</label>
                <select
                  className="form-control"
                  name="idGenero"
                  value={idGenero}
                  disabled="true"
                >
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                </select>
              </div>
            </div>
            <div className="row p-t-20">
              <div className="form-group  col-lg-6 col-md-6  col-sm-12 col-xs-12">
                <label>Pa??s</label>
                <select
                  className="form-control"
                  name="idPais"
                  value={idPais}
                  disabled="true"
                >
                  {listaPaises.map((pais) => (
                    <option key={pais.idPais} value={pais.idPais}>
                      {pais.nombre}
                    </option>
                  ))}
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
            <div className="row p-t-20">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="form-label"> Tel??fono </label>
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
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="form-label"> Habilidades </label>
                  <Multipleselect
                    options={data ? data : []}
                    // setState={guardarCompetencias}
                    setState={setValue}
                    defaultOption={"Seleccione habilidades..."}
                    // values={candidato.lstCompes ? candidato.lstCompes : []}
                    value={value}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </form>
          <Button
            variant="primary"
            onClick={handleClose}
            size="xl"
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
