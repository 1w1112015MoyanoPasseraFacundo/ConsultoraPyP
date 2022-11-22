import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearNuevoCandidatoAction } from "../../actions/candidatosActions";
import clienteAxios from "../../config/axios";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { Multipleselect } from "../MultipleSelect";
import { useGetCompetencia } from "../Empleos/Hooks/useGetCompetencia";
import { useEffect } from "react";
import Swal from "sweetalert2";
const NuevoCandidato = () => {
  const navigate = useNavigate();
  //state
  const [nombre, guardarNombre] = useState("");
  const [apellido, guardarApellido] = useState("");
  const [mail, guardarMail] = useState("");
  const [idTipoDocumento, guardarTipoDocumento] = useState(0);
  const [documento, guardarDocumento] = useState("");
  const [idRubro, guardarRubro] = useState(0);
  const [listaTiposDocs, guardarTiposDocs] = useState([]);
  const [listaRubros, guardarRubros] = useState([]);
  const [listaGeneros, guardarGeneros] = useState([]);
  const [seniority, guardarSeniority] = useState("");
  const [estadoCivil, guardarEstadoCivil] = useState();
  const [fechaNacimiento, guardarFecha] = useState("");
  const [linkedin, guardarLinkedin] = useState("");
  const [idGenero, guardarGenero] = useState(0);
  const [idPais, guardarPais] = useState(0);
  const [listaPaises, guardarPaises] = useState([]);
  const [telefono, guardarTelefono] = useState("");
  let [lstCompes, guardarCompetencias] = useState([]);
  const { data } = useGetCompetencia(idRubro);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.candidatos.error);
  useEffect(() => {
    if (error === false) {
      Swal.fire(
        "Correcto!",
        "El candidato se agrego correctamente!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/candidatos");
        }
      });
    }
  }, [error]);

  if (lstCompes !== null && lstCompes !== undefined) {
    lstCompes = lstCompes.map((e) => e.value);
  }

  //llama candidatoAction
  const agregarCandidato = (candidato) =>
    dispatch(crearNuevoCandidatoAction(candidato));
  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/rubros`);
      guardarRubros(resultado.data);
    };
    consultarAPI();
  }, []);
  useEffect(() => {
    const llenarTipoDoc = async () => {
      const resultado = await clienteAxios.get(`/TiposDocumentos`);
      guardarTiposDocs(resultado.data);
    };
    llenarTipoDoc();
  }, []);
  useEffect(() => {
    const llenarGenero = async () => {
      const resultado = await clienteAxios.get(`/Generos`);
      guardarGeneros(resultado.data);
    };
    llenarGenero();
  }, []);
  useEffect(() => {
    const llenarPais = async () => {
      const resultado = await clienteAxios.get(`/Paises`);
      guardarPaises(resultado.data);
    };
    llenarPais();
  }, []);
  const submitNuevoCandidato = (e) => {
    e.preventDefault();
    let fecha = fechaNacimiento.split("-")[0];
    //validar form
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      idTipoDocumento === 0 ||
      idTipoDocumento === "0" ||
      mail.trim() === "" ||
      documento.trim() === "" ||
      idRubro === "0" ||
      idRubro === 0 ||
      idGenero === "0" ||
      idGenero === 0 ||
      idPais === "0" ||
      idPais === 0 ||
      fechaNacimiento.trim() === "" ||
      lstCompes.length === 0
    ) {
      Swal.fire("Llene los campos obligatorios", "", "warning");
      return;
    } else if (documento.includes("-") || documento.includes("e")) {
      Swal.fire("Ingrese un documento correcto", "", "warning");
    } else if (documento.length != 8) {
      Swal.fire("El campo documento sólo acepta ocho números", "", "warning");
      return;
    } else if (fecha < 1900 || fecha > 2022) {
      Swal.fire("Ingrese un año válido", "", "warning");
      return;
    } else if (telefono != "") {
      if (
        telefono.length < 5 ||
        telefono.length > 20 ||
        telefono.includes("-") ||
        telefono.includes("e")
      ) {
        Swal.fire("Ingrese un télefono correcto", "", "warning");
        return;
      }
    }
    agregarCandidato({
      nombre,
      apellido,
      mail,
      idTipoDocumento,
      documento,
      telefono,
      linkedin,
      idGenero,
      idPais,
      idRubro,
      fechaNacimiento,
      seniority,
      estadoCivil,
      lstCompes,
    });
  };
  const cancelar = () => {
    navigate("/candidatos");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="title-decorator">Nuevo Candidato</h3>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => guardarNombre(e.target.value)}
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
                    onChange={(e) => guardarApellido(e.target.value)}
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
                    onChange={(e) => guardarMail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Tipo de Documento</label>
                  <select
                    className="form-control"
                    name="tipoDocumento"
                    value={idTipoDocumento}
                    // onClick={llenarTipoDoc}
                    onChange={(e) => guardarTipoDocumento(e.target.value)}
                  >
                    <option value={0}>Seleccione...</option>
                    {listaTiposDocs.map((tipoDocumento) => (
                      <option
                        key={tipoDocumento.idTipoDocumento}
                        value={tipoDocumento.idTipoDocumento}
                      >
                        {tipoDocumento.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Documento</label>
                  <input
                    type="text"
                    className="form-control"
                    min="0"
                    maxLength={8}
                    minLength={8}
                    placeholder="Documento"
                    name="documento"
                    value={documento}
                    onChange={(e) => guardarDocumento(e.target.value)}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => guardarFecha(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Rubro</label>
                  <select
                    className="form-control"
                    name="rubro"
                    value={idRubro}
                    onChange={(e) => guardarRubro(e.target.value)}
                  >
                    <option value={0}>Seleccione...</option>
                    {listaRubros.map((rubro) => (
                      <option key={rubro.idRubro} value={rubro.idRubro}>
                        {rubro.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Habilidades</label>
                  <Multipleselect
                    options={data ? data : []}
                    setState={guardarCompetencias}
                    defaultOption={"Seleccione habilidades..."}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Género</label>
                  <select
                    className="form-control"
                    name="genero"
                    // onClick={llenarGenero}
                    value={idGenero}
                    onChange={(e) => guardarGenero(e.target.value)}
                  >
                    <option value={0}>Seleccione...</option>
                    {listaGeneros.map((genero) => (
                      <option key={genero.idGenero} value={genero.idGenero}>
                        {genero.nombre}
                      </option>
                    ))}
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
                    onChange={(e) => guardarPais(e.target.value)}
                  >
                    <option>Seleccione...</option>
                    {listaPaises.map((pais) => (
                      <option key={pais.idPais} value={pais.idPais}>
                        {pais.nombre}
                      </option>
                    ))}{" "}
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
                      min="0"
                      value={telefono}
                      onChange={(e) => guardarTelefono(e.target.value)}
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
                      onChange={(e) => guardarLinkedin(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className=" row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <button
                    type="submit"
                    className="btn btn-light font-weight-bold text-uppercase"
                    onClick={cancelar}
                  >
                    <i class="mx-1 mr-2">
                      <BsReplyFill />
                    </i>
                    <span> Volver</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
                    onClick={submitNuevoCandidato}
                  >
                    <i class="mx-1 mr-2">
                      <BsCheckLg />
                    </i>
                    <span> Guardar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoCandidato;
