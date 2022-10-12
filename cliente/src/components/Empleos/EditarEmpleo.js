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
import { editarEmpleoAction } from "../../actions/empleosActions";
import clienteAxios from "../../config/axios";
const EditarEmpleo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [empleo, guardarEmpleo] = useState({
    nombre: "",
    idCliente: 0,
    idEstado: 0,
    idRubro: 0,
    modalidad: "",
    lstCompes: [],
  });
  const [listaClientes, guardarClientes] = useState([]);
  const [listaRubros, guardarRubros] = useState([]);
  const editar = useSelector((state) => state.empleos.editar);
  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/rubros`);
      guardarRubros(resultado.data);
    };
    consultarAPI();
    const llenarClientes = async () => {
      const resultado = await clienteAxios.get(`/Clientes`);
      guardarClientes(resultado.data);
    };
    llenarClientes();
    const llenarCompetencias = async () => {
      const resultado = await clienteAxios.get(`/competencias`);
      guardarCompetencias(resultado.data);
    };
    llenarCompetencias();
    guardarEmpleo(editar);
  }, [editar]);

  const onChangeFormulario = (e) => {
    guardarEmpleo({
      ...empleo,
      [e.target.name]: e.target.value,
    });
  };
  const cancelar = () => {
    navigate("/empleos");
  };
  const { nombre, idCliente, idEstado, idRubro, modalidad, lstCompes } = empleo;
  console.log(empleo);
  const submitEditarCliente = (e) => {
    e.preventDefault();
    dispatch(editarEmpleoAction(empleo));
    navigate("/empleos");
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
            <h2 className="mb-4 font-weight-bold">Editar Empleo</h2>
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
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Cliente</label>
                  <select
                    className="form-control"
                    name="idCliente"
                    value={idCliente}
                    onChange={onChangeFormulario}
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
                    onChange={onChangeFormulario}
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
                    className="btn btn-primary font-weight-bold text-uppercase"
                    onClick={cancelar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
                    onClick={submitEditarCliente}
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

export default EditarEmpleo;
