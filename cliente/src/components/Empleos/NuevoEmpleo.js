import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearNuevoEmpleoAction } from "../../actions/empleosActions";
import clienteAxios from "../../config/axios";
const NuevoEmpleo = () => {
  const navigate = useNavigate();
  //state
  const [nombre, guardarNombre] = useState("");
  const [idEstado, guardarEstado] = useState(0);
  const [listaEstados, guardarEstados] = useState([]);
  const [idCliente, guardarCliente] = useState(0);
  const [listaClientes, guardarClientes] = useState([]);
  const [idRubro, guardarRubro] = useState(0);
  const [listaRubros, guardarRubros] = useState([]);
  const [modalidad, guardarModalidad] = useState("");

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
  //llama empleoAction
  const agregarEmpleo = (empleo) => dispatch(crearNuevoEmpleoAction(empleo));

  const consultarAPI = async () => {
    const resultado = await clienteAxios.get(`/rubros`);
    guardarRubros(resultado.data);
  };
  const llenarClientes = async () => {
    const resultado = await clienteAxios.get(`/Clientes`);
    guardarClientes(resultado.data);
  };

  const submitNuevoEmpleo = (e) => {
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

    agregarEmpleo({
      nombre,

      idEstado,
      idCliente,
      idRubro,
      modalidad,
      lstCompes,
    });
    navigate("/empleos");
  };
  const cancelar = () => {
    navigate("/empleos");
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
        <h3 className="title-decorator">Nuevo Empleo</h3>
        <div className="card">
          <div className="card-body">
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
            <form>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Descripción</label>
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
                  <label>Cliente</label>
                  <select
                    className="form-control"
                    name="cliente"
                    value={idCliente}
                    onClick={llenarClientes}
                    onChange={(e) => guardarCliente(e.target.value)}
                  >
                    <option>Seleccione...</option>
                    {listaClientes.map((cliente) => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Modalidad</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Modalidad"
                    name="modalidad"
                    value={modalidad}
                    onChange={(e) => guardarModalidad(e.target.value)}
                  />
                </div>
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
                    onClick={submitNuevoEmpleo}
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

export default NuevoEmpleo;
