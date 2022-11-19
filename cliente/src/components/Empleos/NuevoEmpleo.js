import React, { useState, useEffect } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { crearNuevoEmpleoAction } from "../../actions/empleosActions";
import clienteAxios from "../../config/axios";
import { Multipleselect } from "../MultipleSelect";
import { useGetCompetencia } from "./Hooks/useGetCompetencia";
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
  const [lstCompes, guardarCompetencias] = useState([]);
  const dispatch = useDispatch();

  const error = useSelector((state) => state.empleos.error);
  useEffect(() => {
    if (error === false) {
      Swal.fire(
        "Correcto!",
        "El empleo se agrego correctamente!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/empleos");
        }
      });
    }
  }, [error]); //llama empleoAction
  const agregarEmpleo = (empleo) => dispatch(crearNuevoEmpleoAction(empleo));

  useEffect(() => {
    const llenarRubro = async () => {
      const resultado = await clienteAxios.get(`/rubros`);
      guardarRubros(resultado.data);
    };
    llenarRubro();
  }, []);

  useEffect(() => {
    const llenarCliente = async () => {
      const resultado = await clienteAxios.get(`/clientes`);
      guardarClientes(resultado.data);
    };
    llenarCliente();
  }, []);

  const submitNuevoEmpleo = (e) => {
    e.preventDefault();

    //validar form
    if (
      nombre === "" ||
      idCliente === 0 ||
      idCliente === "0" ||
      modalidad === "" ||
      idRubro === 0 ||
      idRubro === "0" ||
      lstCompes.length === 0
    ) {
      Swal.fire("Llene todos los campos obligatorios", "", "warning");
      return;
    }

    agregarEmpleo({
      nombre,

      idEstado,
      idCliente,
      idRubro,
      modalidad,
      lstCompes,
    });
  };
  const cancelar = () => {
    navigate("/empleos");
  };
  const { data } = useGetCompetencia(idRubro);

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
                    onChange={(e) => guardarCliente(e.target.value)}
                  >
                    <option value={0}>Seleccione...</option>
                    {listaClientes.map((cliente) => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Habilidades</label>
                  <Multipleselect
                    options={data ? data : []}
                    setState={guardarCompetencias}
                    defaultOption={"Seleccione habilidades..."}
                  />
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
