import React, { Fragment, useEffect, useState } from "react";
import "./dashboard.css";
import { ReactComponent as YourSvg } from "../assets/dashboard-ppl.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Multipleselect } from "./MultipleSelect";
import { GetCompetenciasByEmpleo } from "../actions/dashboardActions";
import clienteAxios from "../config/axios";
import { obtenerCandidatosByCompes } from "../actions/candidatosActions";
import AccionesDashboard from "./AccionesDashboard";
import { BsSearch } from "react-icons/bs";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.login.login);
  const [lstCompes, guardarCompetencias] = useState([]);
  const [idCandidato, guardarCandidato] = useState(0);
  const [idEmpleo, guardarEmpleo] = useState(0);
  const [listaCandidatos, guardarCandidatos] = useState([]);
  const [listaEmpleo, guardarEmpleos] = useState([]);
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
  const candidatos = useSelector((state) => state.candidatos.candidatos);
  const error = useSelector((state) => state.candidatos.error);

  useEffect(() => {
    const cargarCandidatos = () =>
      dispatch(obtenerCandidatosByCompes(lstCompes[0]));
    cargarCandidatos();
    const getEmpleos = async () => {
      const resultado = await clienteAxios.get(`/empleos`);
      guardarEmpleos(resultado.data);
    };
    getEmpleos();
  }, [guardarEmpleos, lstCompes]);
  console.log(lstCompes);
  const { data } = GetCompetenciasByEmpleo(idEmpleo);

  return (
    <Fragment>
      <div class="card custom-card-shadow-dash">
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <p class="title-font">
                <span>
                  Bienvenido {usuario.nombre} {usuario.apellido}
                </span>
              </p>
            </div>
            {/* <div class="col-md-4">
              <img
                src={require("../assets/logoHorizonta.png")}
                height="90px"
                // width="300px"
              />
              <YourSvg height="230px" />
            </div> */}
          </div>
        </div>
      </div>
      <br></br>
      <div class="card custom-card-shadow">
        <div class="card-body">
          <div className="row">
            <div className="col-md-6">
              <h3 className="title-decorator">Búsqueda avanzada</h3>
              <br />
              <br />
              <form class="form-horizontal p-t-20">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <select
                        className="form-control"
                        name="empleo"
                        value={idEmpleo}
                        // onClick={getEmpleos}
                        onChange={(e) => guardarEmpleo(e.target.value)}
                      >
                        <option value={0}>Seleccione empleo...</option>
                        {listaEmpleo.map((empleo) => (
                          <option key={empleo.idEmpleo} value={empleo.idEmpleo}>
                            {empleo.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <Multipleselect
                        options={data ? data : []}
                        setState={guardarCompetencias}
                        defaultOption={"Seleccione Competencias"}
                      />
                    </div>
                  </div>
                  {/* <div class="col-md-3">
                  <div class="pull-right text-right">
                    <button type="submit" class="btn btn-primary">
                      <i class="mx-1 mr-2">
                        <BsSearch />
                      </i>
                      <span> Buscar</span>
                    </button>
                  </div>
                </div> */}
                </div>
              </form>
            </div>
            <img
              class="col-md-6"
              src={require("../assets/logoHorizonta.png")}
              height="250px"
            />
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
                  {error != null
                    ? "No hay candidatos"
                    : candidatos.map((candidato) => {
                        return (
                          <AccionesDashboard
                            key={candidato.idCandidato}
                            candidato={candidato}
                          />
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
