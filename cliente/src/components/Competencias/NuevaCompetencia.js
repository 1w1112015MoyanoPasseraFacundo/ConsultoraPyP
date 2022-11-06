import React, { useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearNuevaCompetenciaAction } from "../../actions/competenciasActions";
import clienteAxios from "../../config/axios";
const NuevaCompetencia = () => {
  const [nombre, guardarNombre] = useState("");
  const [idRubro, guardarRubro] = useState(0);
  const [listaRubros, guardarRubros] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const agregarCompetencia = (competencia) => {
    dispatch(crearNuevaCompetenciaAction(competencia));
    navigate("/competencias");
  };

  const llenarRubro = async () => {
    const resultado = await clienteAxios.get(`/rubros`);
    guardarRubros(resultado.data);
  };
  const submitNuevaCompetencia = (e) => {
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

    agregarCompetencia({
      nombre,
      idRubro,
    });
    navigate("/competencias");
  };

  const cancelar = () => {
    navigate("/competencias");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="title-decorator">Nueva habilidad</h3>
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
                    onChange={(e) => guardarNombre(e.target.value)}
                  />
                </div>
                <div className="form-group  col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <label>Rubro</label>
                  <select
                    className="form-control"
                    name="idRubro"
                    onClick={llenarRubro}
                    value={idRubro}
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
                    onClick={submitNuevaCompetencia}
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

export default NuevaCompetencia;
