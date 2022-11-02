import React, { Fragment } from "react";
import "./dashboard.css";
import { ReactComponent as YourSvg } from "../assets/dashboard-ppl.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Multipleselect } from "./MultipleSelect";
const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.login.login);
  const cand = () => {
    navigate("/candidatos");
  };
  const compe = () => {
    navigate("/competencias");
  };
  const usu = () => {
    navigate("/usuarios");
  };
  const pago = () => {
    navigate("/pagos");
  };
  const clien = () => {
    navigate("/clientes");
  };
  const emp = () => {
    navigate("/empleos");
  };
  // const { data } = useGetCompetencia(idRubro);

  return (
    <Fragment>
      <div class="card custom-card-shadow">
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <br></br>
              <br></br>
              <br></br>
              <p class="title-font">
                <span>
                  Bienvenido {usuario.nombre} {usuario.apellido}
                </span>
              </p>
            </div>
            <div class="col-md-4">
              <img
                src={require("../assets/logoHorizonta.png")}
                height="250px"
              />
              {/* <YourSvg height="230px" /> */}
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div class="card custom-card-shadow">
        <div>
          <h3 className="title-decorator">Búsqueda avanzada</h3>

          <form class="form-horizontal p-t-20">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <select
                    className="form-control"
                    name="empleo"
                    // value={idEmpleo}
                    // onChange={(e) => guardarEmpleo(e.target.value)}
                  >
                    <option>Seleccione empleo...</option>
                    {/* <option value={0}>Seleccione...</option>
                    {listaEmpleos.map((empleo) => (
                      <option key={empleo.idEmpleo} value={empleo.idEmpleo}>
                        {empleo.nombre}
                      </option>
                    ))} */}
                  </select>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  {/* <Multipleselect
                    options={data ? data : []}
                    setState={guardarCompetencias}
                    defaultOption={"Seleccione Competencias"}
                  /> */}
                </div>
              </div>
              <div class="col-md-3">
                <div class="pull-right text-right">
                  <button type="submit" class="btn btn-primary">
                    <i class="mx-1 mr-2">{/* <BsSearch /> */}</i>
                    <span> Buscar</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="colu" scope="col">
                    Candidato
                  </th>
                  <th className="colu" scope="col">
                    E-mail
                  </th>
                  <th className="colu" scope="col">
                    Edad
                  </th>
                  <th className="colu" scope="col">
                    Teléfono
                  </th>

                  <th className="colu" scope="col">
                    Linkedin
                  </th>
                  <th className="colu" scope="col">
                    Estado
                  </th>
                  <th className="colu" scope="col">
                    Ver
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {error != null
                  ? "No hay candidatos"
                  : candidatos.map((candidato) => {
                      let fecha = candidato.fechaNacimiento.split("T");
                      candidato.fechaNacimiento = fecha[0];
                      console.log(candidato);
                      return (
                        <AccionesCandidatos
                          key={candidato.idCandidato}
                          candidato={candidato}
                        />
                      );
                    })} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div class="grid-col-3">
        <div class="btn-area" onClick={emp}>
          <span class="p-t-30">5</span> Empleos
        </div>
        <div class="btn-area" onClick={cand}>
          <span class="p-t-30">COUNT</span> Candidatos
        </div>
        <div class="btn-area" onClick={clien}>
          <span class="p-t-30">COUNT</span>
          Clientes
        </div>
        <div class="btn-area" onClick={pago}>
          <span class="p-t-30">COUNT</span> Pagos
        </div>
        <div class="btn-area" onClick={compe}>
          <span class="p-t-30">COUNT</span>
          Competencias
        </div>
        <div class="btn-area" onClick={usu}>
          <span class="p-t-30">COUNT</span>
          Usuarios
        </div>
      </div> */}
    </Fragment>
  );
};

export default Dashboard;
