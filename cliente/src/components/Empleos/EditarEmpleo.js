import React, { useEffect, useMemo, useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editarEmpleoAction } from "../../actions/empleosActions";
import clienteAxios from "../../config/axios";
import { Multipleselect } from "../MultipleSelect";
import { useGetCompetencia } from "./Hooks/useGetCompetencia";
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
    value: [],
  });

  const [listaClientes, guardarClientes] = useState([]);
  const [listaRubros, guardarRubros] = useState([]);
  const editar = useSelector((state) => state.empleos.editar);
  const error = useSelector((state) => state.empleos.error);

  useEffect(() => {
    if (error === false) {
      navigate("/empleos");
    }
  }, [error]);
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

  const submitEditarCliente = (e) => {
    e.preventDefault();

    value = value.map((e) => e.value);
    for (let i = lstCompes.length; i > 0; i--) {
      lstCompes.pop();
    }
    for (let i = 0; value.length > i; i++) {
      lstCompes.push(value[i]);
    }

    //validar form
    if (
      nombre === "" ||
      idCliente === 0 ||
      idCliente === "0" ||
      modalidad === "" ||
      idRubro === 0 ||
      idRubro === "0"
    ) {
      Swal.fire("Llene todos los campos obligatorios", "", "warning");
      return;
    }
    dispatch(editarEmpleoAction(empleo));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="title-decorator">Editar vacante</h3>
        <div className="card">
          <div className="card-body">
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
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Habilidades</label>
                  <Multipleselect
                    options={data ? data : []}
                    // setState={guardarCompetencias}
                    setState={setValue}
                    defaultOption={"Seleccione habilidades..."}
                    value={value}
                    // values={lstCompes}
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
                    onClick={submitEditarCliente}
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

export default EditarEmpleo;
