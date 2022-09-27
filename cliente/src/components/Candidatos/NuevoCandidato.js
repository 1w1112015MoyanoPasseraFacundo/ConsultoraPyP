import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoCandidatoAction } from "../../actions/candidatosActions";
const NuevoCandidato = () => {
  //state
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);
  const dispatch = useDispatch();
  const alerta = useSelector((state) => state.alerta.alerta);
  //llama candidatoAction
  const agregarCandidato = (candidato) =>
    dispatch(crearNuevoCandidatoAction(candidato));

  const submitNuevoCandidato = (e) => {
    e.preventDefault();

    //validar form
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        clases: "alert alert-danger text-center text-uppercase p3",
      };

      //   dispatch(mostrarAlerta(alerta));

      return;
    }

    // dispatch(ocultarAlertaAction());

    agregarCandidato({
      nombre,
      precio,
    });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Candidato
            </h2>
            {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoCandidato}>
              <div className="form-group">
                <label>Nombre Candidato</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Candidato"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoCandidato;
