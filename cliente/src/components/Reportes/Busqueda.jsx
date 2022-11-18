import React, { Fragment, useEffect, useState } from "react";
import "../dashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Multipleselect } from "../MultipleSelect";
import AccionesDashboard from "../AccionesDashboard";
import clienteAxios from "../../config/axios";
import { obtenerCandidatoEditar, obtenerCandidatosByCompes } from "../../actions/candidatosActions";
import { GetCompetenciasByEmpleo } from "../../actions/dashboardActions";
import { BsDownload, BsFillExclamationCircleFill } from "react-icons/bs";
import jsPDF from "jspdf";

const Busqueda = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.login.login);
  const [lstCompes, guardarCompetencias] = useState([]);
  const [idCandidato, guardarCandidato] = useState(0);
  const [idEmpleo, guardarEmpleo] = useState(0);
  const [listaCandidatos, guardarCandidatos] = useState([]);
  const [listaEmpleo, guardarEmpleos] = useState([]);
  const candidatos = useSelector((state) => state.candidatos.candidatos);
  const error = useSelector((state) => state.candidatos.error);
  const empleo = useSelector((state) => state.empleos.empleos);
  console.log("EMPLEO", empleo);
  // console.log("LSTEMPLEO", guardarEmpleo());
  useEffect(() => {
    const cargarCandidatos = () =>
      dispatch(obtenerCandidatosByCompes(lstCompes));
    cargarCandidatos();
    const getEmpleos = async () => {
      const resultado = await clienteAxios.get(`/empleos`);
      guardarEmpleos(resultado.data);
    };
    getEmpleos();
  }, [guardarEmpleos, lstCompes]);
  console.log("CAND", candidatos);
  const { data } = GetCompetenciasByEmpleo(idEmpleo);

  //PDF
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Candidatos para el empleo ${idEmpleo}`;
    const headers = [["Candidato", "E-mail", "Documento", "Telefono", "Linkedin", "Estado"]];

    const data = candidatos.map((elt) => [
      elt.nombre +" "+  elt.apellido,
      elt.mail,
      elt.documento,
      elt.telefono,
      elt.linkedin,
      elt.estado,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    let finalY = doc.lastAutoTable.finalY;
    doc.save("EmpleosPorFecha.pdf");
  };

  return (
    <>
      <h3 className="title-decorator">Búsqueda avanzada</h3>
      <div class="card custom-card-shadow">
        <div class="card-body">
          <div className="row">
            <div className="col-md-6">
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
                        defaultOption={"Seleccione habilidades"}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {error != null ? null : candidatos.length === 0 ? (
            <div
              role="alert"
              className="alert text-center animated fadeIn notFound"
            >
              <h2>
                No hay candidatos con esas habilidades{" "}
                <BsFillExclamationCircleFill color="#ef5350" />
              </h2>{" "}
            </div>
          ) : (
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
                        Estado
                      </th>
                      <th className="colu" scope="col">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatos.map((candidato) => {
                    let fecha = candidato.fechaNacimiento.split("T");
                    candidato.fechaNacimiento = fecha[0];
                      return (
                        <AccionesDashboard
                          key={candidato.idCandidato}
                          candidato={candidato}
                        />
                      );
                    })}
                  </tbody>
                </table>
                    <div>

                          <button
                            type="submit"
                            class="btn btn-success"
                            onClick={exportPDF}
                          >
                            {/* <i class="mx-1 mr-2"> */}
                            <BsDownload />
                            {/* </i> */}
                            <span> Descargar</span>
                          </button>

                    </div>
              </div>
            </div>
          )}
        </div>
      </div>

     

    </>
  );
};

export default Busqueda;
