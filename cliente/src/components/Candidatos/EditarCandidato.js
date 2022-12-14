import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editarCandidatoAction } from "../../actions/candidatosActions";
import clienteAxios from "../../config/axios";
import { useGetCompetencia } from "../Empleos/Hooks/useGetCompetencia";
import { Multipleselect } from "../MultipleSelect";
const EditarCandidato = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [candidato, guardarCandidato] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    idTipoDocumento: 0,
    documento: "",
    idRubro: 0,
    fechaNacimiento: "",
    idPais: 0,
    idGenero: 0,
    linkedin: "",
    telefono: "",
    estadoCivil: "",
    lstCompes: [],
  });
  const [listaTiposDocs, guardarTiposDocs] = useState([]);
  const [listaRubros, guardarRubros] = useState([]);
  const [listaGeneros, guardarGeneros] = useState([]);
  const [listaCompetencias, guardarCompetencias] = useState([]);
  const [listaPaises, guardarPaises] = useState([]);
  const editar = useSelector((state) => state.candidatos.editar);
  useEffect(() => {
    guardarCandidato(editar);
  }, [editar]);

  const onChangeFormulario = (e) => {
    guardarCandidato({
      ...candidato,
      [e.target.name]: e.target.value,
    });
  };

  const cancelar = () => {
    navigate("/candidatos");
  };
  const {
    nombre,
    apellido,
    mail,
    idTipoDocumento,
    documento,
    idPais,
    fechaNacimiento,
    idRubro,
    idGenero,
    linkedin,
    observaciones,
    telefono,
    estado,
    lstCompes,
  } = candidato;

  const error = useSelector((state) => state.candidatos.error);

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

  useEffect(() => {
    if (error === false) {
      navigate("/candidatos");
    }
  }, [error]);
  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/rubros`);
      guardarRubros(resultado.data);
    };
    consultarAPI();
    const llenarTipoDoc = async () => {
      const resultado = await clienteAxios.get(`/TiposDocumentos`);
      guardarTiposDocs(resultado.data);
    };
    llenarTipoDoc();
    const llenarGenero = async () => {
      const resultado = await clienteAxios.get(`/Generos`);
      guardarGeneros(resultado.data);
    };
    llenarGenero();
    const llenarCompetencias = async () => {
      const resultado = await clienteAxios.get(`/competencias`);
      guardarCompetencias(resultado.data);
    };
    llenarCompetencias();
  }, []);
  useEffect(() => {
    const llenarPais = async () => {
      const resultado = await clienteAxios.get(`/Paises`);
      guardarPaises(resultado.data);
    };
    llenarPais();
  }, []);
  const submitEditarCandidato = (e) => {
    e.preventDefault();
    let fecha = fechaNacimiento.split("-")[0];
    const doc = documento.toString();

    value = value.map((e) => e.value);
    for (let i = lstCompes.length; i > 0; i--) {
      lstCompes.pop();
    }
    for (let i = 0; value.length > i; i++) {
      lstCompes.push(value[i]);
    }
    //validar form
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      idTipoDocumento === 0 ||
      idTipoDocumento === "0" ||
      mail.trim() === "" ||
      doc === "" ||
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
    } else if (doc.includes("-") || doc.includes("e")) {
      Swal.fire("Ingrese un documento correcto", "", "warning");
    } else if (doc.length != 8) {
      Swal.fire("El campo documento s??lo acepta ocho n??meros", "", "warning");
      return;
    } else if (fecha < 1900 || fecha > 2022) {
      Swal.fire("Ingrese un a??o v??lido", "", "warning");
      return;
    } else if (telefono != "") {
      if (
        telefono.length < 5 ||
        telefono.length > 20 ||
        telefono.includes("-") ||
        telefono.includes("e")
      ) {
        Swal.fire("Ingrese un t??lefono correcto", "", "warning");
        return;
      }
    }
    dispatch(editarCandidatoAction(candidato));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="title-decorator">Editar Candidato</h3>
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
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Correo electr??nico</label>
                  <input
                    type="mail"
                    className="form-control"
                    placeholder="E-mail"
                    name="mail"
                    value={mail}
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
                  >
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
                    type="number"
                    className="form-control"
                    placeholder="Documento"
                    name="documento"
                    value={documento}
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
                  >
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
                    // setState={guardarCompetencias}
                    setState={setValue}
                    defaultOption={"Seleccione habilidades..."}
                    // values={candidato.lstCompes ? candidato.lstCompes : []}
                    value={value}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>G??nero</label>
                  <select
                    className="form-control"
                    name="idGenero"
                    value={idGenero}
                    onChange={onChangeFormulario}
                  >
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
                  <label>Pa??s</label>
                  <select
                    className="form-control"
                    name="idPais"
                    value={idPais}
                    onChange={onChangeFormulario}
                  >
                    {listaPaises.map((pais) => (
                      <option key={pais.idPais} value={pais.idPais}>
                        {pais.nombre}
                      </option>
                    ))}{" "}
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  {/* <label>Estado</label>
                  <select
                    className="form-control"
                    name="estado"
                    value={estado}
                    onChange={onChangeFormulario}
                  >
                    <option>Postulado</option>
                    <option>Preseleccionado</option>
                    <option>En proceso</option>
                    <option>En base</option>
                    <option>Seleccionado</option>
                  </select> */}
                </div>
              </div>
              <h4 className="card-subtitle font-italic">Datos opcionales</h4>
              <hr />
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Tel??fono </label>
                    <input
                      type="Number"
                      className="form-control"
                      name="telefono"
                      value={telefono}
                      onChange={onChangeFormulario}
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
                      onChange={onChangeFormulario}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label">Observaciones </label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="linkedin"
                      value={observaciones}
                      onChange={onChangeFormulario}
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
                    onClick={submitEditarCandidato}
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

export default EditarCandidato;
