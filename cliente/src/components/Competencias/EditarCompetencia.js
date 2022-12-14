import React, { useEffect, useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editarCompetenciaAction } from "../../actions/competenciasActions";
import clienteAxios from "../../config/axios";
const EditarCompetencia = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [competencia, guardarCompetencia] = useState({
    nombre: "",
    idRubro: 0,
  });
  const editar = useSelector((state) => state.competencias.editar);
  const error = useSelector((state) => state.competencias.error);

  useEffect(() => {
    if (error === false) {
      navigate("/competencias");
    }
    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    guardarCompetencia(editar);
  }, [editar]);

  const onChangeFormulario = (e) => {
    guardarCompetencia({
      ...competencia,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, idRubro } = competencia;
  //SETIAR A 0 IDEMPLEO CUANDO CAMBIA CLIENTE
  useEffect(() => {
    if (idRubro === 0) {
      competencia.nombreRubro = "";
    }
    // eslint-disable-next-line
  }, [idRubro, competencia.nombreRubro]);
  const submitEditarCompetencia = (e) => {
    e.preventDefault();

    //validar form
    if (nombre.trim() === "" || idRubro === 0 || idRubro === "0") {
      Swal.fire("Llene los campos obligatorios", "", "warning");
      return;
    }
    dispatch(editarCompetenciaAction(competencia));
  };
  const [listaRubros, guardarRubros] = useState([]);
  useEffect(() => {
    const llenarRubro = async () => {
      const resultado = await clienteAxios.get(`/rubros`);
      guardarRubros(resultado.data);
    };
    llenarRubro();
  }, []);

  const cancelar = () => {
    navigate("/competencias");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="title-decorator">Editar hablidad</h3>
        <div className="card">
          <div className="card-body">
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
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
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
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
                    onClick={submitEditarCompetencia}
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

export default EditarCompetencia;
