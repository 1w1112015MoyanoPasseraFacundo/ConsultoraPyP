import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  // console.log(editar);
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

  const submitEditarCompetencia = (e) => {
    e.preventDefault();
    dispatch(editarCompetenciaAction(competencia));
    console.log(competencia);
    navigate("/competencias");
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
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 font-weight-bold">Editar competencia</h2>
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
                    <option>Seleccione...</option>
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
                    className="btn btn-primary font-weight-bold text-uppercase"
                    onClick={cancelar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
                    onClick={submitEditarCompetencia}
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

export default EditarCompetencia;
