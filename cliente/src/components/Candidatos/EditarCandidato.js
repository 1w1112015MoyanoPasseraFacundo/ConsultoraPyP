import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editarCandidatoAction } from "../../actions/candidatosActions";
import clienteAxios from "../../config/axios";
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
    telefono,
    estadoCivil,
    lstCompes,
  } = candidato;
  console.log(candidato);
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

  const submitEditarCandidato = (e) => {
    e.preventDefault();
    dispatch(editarCandidatoAction(candidato));
    navigate("/candidatos");
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    variant: "menu",
  };
  const useStyles = () => ({
    formControl: {
      width: 300,
    },
    indeterminateColor: {
      color: "#f50057",
    },
    selectAllText: {
      fontWeight: 500,
    },
    selectedAll: {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
      },
    },
  });
  const classes = useStyles();
  const [listaCompetencias, guardarCompetencias] = useState([]);

  const [listaCompes, setSelected] = useState([]);
  const isAllSelected =
    listaCompetencias.length > 0 &&
    listaCompes.length === listaCompetencias.length;
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(event.target);
    console.log(lstCompes);
    if (value[value.length - 1] === "all") {
      setSelected(
        lstCompes.length === listaCompetencias.length ? [] : listaCompetencias
      );
      return;
    }
    setSelected(value);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 font-weight-bold">Editar Candidato</h2>
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
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
                  <label>Correo electrónico</label>
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
                    <option>Seleccione...</option>
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
                    <option>Seleccione...</option>
                    {listaRubros.map((rubro) => (
                      <option key={rubro.idRubro} value={rubro.idRubro}>
                        {rubro.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>País</label>
                  <select
                    className="form-control"
                    name="pais"
                    value={idPais}
                    onChange={onChangeFormulario}
                  >
                    <option>Seleccione...</option>
                    <option value="1">Argentina</option>
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Género</label>
                  <select
                    className="form-control"
                    name="idGenero"
                    value={idGenero}
                    onChange={onChangeFormulario}
                  >
                    <option>Seleccione...</option>
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
                  <label>Competencias</label>
                  <Select
                    className="form-control"
                    labelId="mutiple-select-label"
                    multiple
                    value={lstCompes}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value="all">
                      <ListItemIcon>
                        <Checkbox
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllSelected}
                          indeterminate={
                            listaCompes.length > 0 &&
                            listaCompes.length < listaCompetencias.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes.selectAllText }}
                        primary={"Select All"}
                      />
                    </MenuItem>
                    {listaCompetencias.map((competencia) => (
                      <MenuItem
                        key={competencia.idCompetencia}
                        value={competencia.idCompetencia}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={
                              lstCompes.indexOf(competencia.idCompetencia) > -1
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={competencia.nombre} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <h4 className="card-subtitle font-italic">Datos opcionales</h4>
              <hr />
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Estado Civil </label>
                    <input
                      type="text"
                      className="form-control"
                      name="estadoCivil"
                      value={estadoCivil}
                      onChange={onChangeFormulario}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Teléfono </label>
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
              </div>
              <div className=" row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase"
                    onClick={cancelar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
                    onClick={submitEditarCandidato}
                  >
                    Guardar
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
