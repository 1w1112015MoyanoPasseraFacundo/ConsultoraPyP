import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearNuevaCompetenciaAction } from "../../actions/competenciasActions";
const NuevaCompetencia = () => {
  const [nombre, guardarNombre] = useState("");
  const [idRubro, guardarRubro] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const agregarCompetencia = (competencia) => {
    dispatch(crearNuevaCompetenciaAction(competencia));
    navigate("/competencias");
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
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 font-weight-bold">Nueva competencia</h2>
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
            <form onSubmit={submitNuevaCompetencia}>
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
                    value={idRubro}
                    onChange={(e) => guardarRubro(e.target.value)}
                  >
                    <option>Seleccione...</option>
                    <option value="1">Tech</option>
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
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block  nuevo"
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

export default NuevaCompetencia;
