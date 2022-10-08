import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearNuevoCandidatoAction } from "../../actions/candidatosActions";
import clienteAxios from "../../config/axios";
import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
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
  const [telefono, guardarTelefono] = useState("");
  const dispatch = useDispatch();
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

  // const alerta = useSelector((state) => state.alerta.alerta);
  //llama candidatoAction
  const agregarCandidato = (candidato) =>
    dispatch(crearNuevoCandidatoAction(candidato));

  const consultarAPI = async () => {
    const resultado = await clienteAxios.get(`/rubros`);
    guardarRubros(resultado.data);
  };
  const llenarTipoDoc = async () => {
    const resultado = await clienteAxios.get(`/TiposDocumentos`);
    guardarTiposDocs(resultado.data);
  };
  const llenarGenero = async () => {
    const resultado = await clienteAxios.get(`/Generos`);
    guardarGeneros(resultado.data);
  };
  const submitNuevoCandidato = (e) => {
    e.preventDefault();

    //validar form
    if (nombre.trim() === "") {
      // const alerta = {
      //   msg: "Ambos campos son obligatorios",
      //   clases: "alert alert-danger text-center text-uppercase p3",
      // };

      //   dispatch(mostrarAlerta(alerta));

      return;
    }

    // dispatch(ocultarAlertaAction());

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
    navigate("/candidatos");
  };
  const cancelar = () => {
    navigate("/candidatos");
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

  const llenarCompetencias = async () => {
    const resultado = await clienteAxios.get(`/competencias`);
    console.log(resultado);
    guardarCompetencias(resultado.data);
  };

  const [lstCompes, setSelected] = useState([]);
  const isAllSelected =
    listaCompetencias.length > 0 &&
    lstCompes.length === listaCompetencias.length;
  const handleChange = (event) => {
    console.log(event);
    const value = event.target.value;
    console.log(value);
    if (value[value.length - 1] === "all") {
      setSelected(
        lstCompes.length === listaCompetencias.length ? [] : listaCompetencias
      );
      return;
    }
    setSelected(value);
  };
  console.log(lstCompes);

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 font-weight-bold">Nuevo Candidato</h2>
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
                    onClick={llenarTipoDoc}
                    onChange={(e) => guardarTipoDocumento(e.target.value)}
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
                    onClick={consultarAPI}
                    onChange={(e) => guardarRubro(e.target.value)}
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
                    onChange={(e) => guardarPais(e.target.value)}
                  >
                    <option>Seleccione...</option>
                    <option value="1">Argentina</option>
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Género</label>
                  <select
                    className="form-control"
                    name="genero"
                    onClick={llenarGenero}
                    value={idGenero}
                    onChange={(e) => guardarGenero(e.target.value)}
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
                    onClick={llenarCompetencias}
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
                            lstCompes.length > 0 &&
                            lstCompes.length < listaCompetencias.length
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
                      onChange={(e) => guardarEstadoCivil(e.target.value)}
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
                    className="btn btn-primary font-weight-bold text-uppercase"
                    onClick={cancelar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
                    onClick={submitNuevoCandidato}
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

export default NuevoCandidato;
