import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillRecordFill, BsQuestionLg } from "react-icons/bs";
import { obtenerAllEmpleosAction } from "../actions/empleosActions";
import { Button, Modal } from "react-bootstrap";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.login.login);
  useEffect(() => {
    //consultar api

    const cargarEmpleos = () => dispatch(obtenerAllEmpleosAction());
    cargarEmpleos();
    // eslint-disable-next-line
  }, []);
  const empleos = useSelector((state) => state.empleos.empleos);
  let finalizados = 0;
  let cancelados = 0;
  let activos = 0;
  let suspendidos = 0;
  empleos.forEach((e) => {
    if (e.nombreEstado === "Finalizado") {
      finalizados++;
    }
    if (e.nombreEstado === "Cancelado") {
      cancelados++;
    }
    if (e.nombreEstado === "Suspendido") {
      suspendidos++;
    }
    if (e.nombreEstado === "Activo") {
      activos++;
    }
  });
  const emp = () => {
    navigate("/empleos");
  };
  const cand = () => {
    navigate("/candidatos");
  };
  const clien = () => {
    navigate("/clientes");
  };
  const ayuda = () => {
    navigate("/preguntasFrecuentes");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <div class="row w-100">
        <div class="col-md-8">
          <div class="card custom-card-shadow">
            <div class="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p class="title-font">
                    <span>
                      Bienvenido&nbsp;
                      {usuario.nombre} {usuario.apellido}
                    </span>
                  </p>
                  <br />
                  <form class="form-horizontal p-t-20">
                    <div class="form-group">
                      <div>
                        <p class="card-text m-t-5">
                          <i class="fa fa-circle font-10 m-r-10 text-danger m-t-10"></i>
                          <BsFillRecordFill color="#ef5350" />
                          Roles pertenecientes
                        </p>
                        <span class="label label-rounded ">{usuario.rol}</span>
                      </div>
                    </div>
                  </form>
                </div>
                <img
                  class="col-md-6"
                  src={require("../assets/logoHorizonta.png")}
                  height="240px"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card custom-card-shadow">
            <div class="card-body">
              <p class="title-font">Estado de empleos</p>
              <p class="card-body__text">
                <i class="fa fa-circle font-10 m-r-10 text-info m-t-10"></i>
                Hay
                <b> {activos} </b>
                empleos activos
              </p>
              <p class="card-body__text">
                <i class="fa fa-circle font-10 m-r-10 text-info m-t-10"></i>
                Hay
                <b> {suspendidos} </b>
                empleos suspendidos
              </p>
              <br />
              <br />
              <button class="btn btn-primary w-100" onClick={emp}>
                Revisar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100">
        <div class="col-md-4">
          <br />
          <div class="row w-100">
            <div class="col-m-12">
              <div class="card custom-card-shadow">
                <div class="card-body">
                  <p class="title-font">Candidatos</p>
                  <br />
                  <button class="btn btn-primary w-100" onClick={cand}>
                    Ver
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <br />
              <div class="card custom-card-shadow">
                <div class="card-body">
                  <p class="title-font">Clientes</p>
                  <button
                    class="btn btn-waves-effect waves-light btn-primary w-100"
                    onClick={clien}
                  >
                    <i class="mdi mdi-pencil-lock" aria-hidden="true"></i>
                    Ver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <br />
          <div class="card custom-card-shadow">
            <div class="card-body">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <BsQuestionLg size={245} color="#00655b" />
              <br />
              <br />
              <button
                class="btn btn-waves-effect waves-light btn-primary w-100"
                onClick={ayuda}
              >
                Ayuda
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <br />
          <div class="card custom-card-shadow">
            <div class="card-body">
              <img
                src={require("../assets/termino.jpg")}
                height="246px"
                width="300px"
                className="terminos"
                alt="termino"
              ></img>
              <br />
              <br />
              <button
                class="btn btn-waves-effect waves-light btn-primary w-100"
                onClick={handleShow}
              >
                Términos y condiciones
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100"></div>
      <Modal show={show} onHide={handleClose} size="lg" scrollable="true">
        <Modal.Header closeButton>
          <Modal.Title className="title-font">
            Términos y condiciones
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bienvenido a PatocchiPassera proporcionado por Facundo Moyano. Nos
            complace ofrecerle acceso al Servicio, sujeto a estos términos y
            condiciones y a la Política de Privacidad correspondiente. Al
            acceder y utilizar el Servicio, usted expresa su consentimiento,
            acuerdo y entendimiento de los Términos de Servicio y la Política de
            Privacidad. Si no está de acuerdo con los Términos de Servicio o la
            Política de Privacidad, no utilice el Servicio.
          </p>
          <h4>Operaciones habilitadas</h4>
          <p>
            Las operaciones habilitadas son aquellas que estarán disponibles
            para los clientes, quienes deberán cumplir los requisitos que se
            encuentren vigentes en su momento para operar el Servicio. Las
            mismas podrán ser ampliadas o restringidas por el proveedor,
            comunicándolo previamente con una antelación no menor a 60 días, y
            comprenden entre otras, sin que pueda entenderse taxativamente las
            que se indican a continuación:
          </p>
          <h5>Transacciones</h5>
          <p>
            En ningún caso debe entenderse que la solicitud de un producto o
            servicio implica obligación alguna para el Acceso y uso del
            Servicio. Para operar el Servicio se requerirá siempre que se trate
            de clientes de PatocchiPassera, quienes podrán acceder mediante
            cualquier dispositivo con conexión a la Red Internet. El cliente
            deberá proporcionar el número de documento de identidad y la clave
            personal, que será provista por la aplicación como requisito previo
            a la primera operación, en la forma que le sea requerida. La clave
            personal y todo o cualquier otro mecanismo adicional de
            autenticación personal provisto tiene el carácter de secreto e
            intransferible,y por lo tanto asumo las consecuencias de su
            divulgación a terceros, liberando a PatocchiPassera de toda
            responsabilidad que de ello se derive. En ningún caso
            PatocchiPassera requerirá que le suministre la totalidad de los
            datos, ni enviará mail requiriendo información personal alguna
          </p>
          <h5>Costo del Servicio</h5>
          <p>
            La empresa PatocchiPassera podrá cobrar comisiones por el
            mantenimiento y/o uso de este Servicio o los que en el futuro
            implemente, entendiéndose facultado expresamente para efectuar los
            correspondientes débitos en mis cuentas, aún en descubierto, por lo
            que presto para ello mi expresa conformidad. En caso de cualquier
            modificación a la presente previsión, lo comunicará con al menos 60
            días de antelación.
          </p>
          <h5>Vigencia</h5>
          <p>
            El Usuario podrá dejar sin efecto la relación que surja de la
            presente, en forma inmediata, sin otra responsabilidad que la
            derivada de los gastos originados hasta ese momento. Si el cliente
            incumpliera cualquiera de las obligaciones asumidas en su relación
            contractual con empresa PatocchiPassera, o de los presentes Términos
            y Condiciones, la empresa podrá decretar la caducidad del presente
            Servicio en forma inmediata, sin que ello genere derecho a
            indemnización o compensación alguna. La empresa PatocchiPassera
            podrá dejar sin efecto la relación que surja de la presente, con un
            preaviso mínimo de 60 días, sin otra responsabilidad
          </p>
          <h5>Validez de operaciones y notificaciones</h5>
          <p>
            Los registros emitidos por la app serán prueba suficiente de las
            operaciones cursadas por dicho canal. Renuncio expresamente a
            cuestionar la idoneidad o habilidad de ese medio de prueba. A los
            efectos del cumplimiento de disposiciones legales o contractuales,
            se otorga a las notificaciones por este medio el mismo alcance de
            las notificaciones mediante documento escrito.
          </p>
          <h5>Propiedad intelectual</h5>
          <p>
            El software en Argentina está protegido por la ley 11.723, que
            regula la propiedad intelectual y los derechos de autor de todos
            aquellos creadores de obras artísticas, literarias y científicas.
          </p>
          <h5>Privacidad de la información</h5>
          <p>
            Para utilizar los Servicios ofrecidos por PatocchiPassera, los
            Usuarios deberán facilitar determinados datos de carácter personal.
            Su información personal se procesa y almacena en servidores o medios
            magnéticos que mantienen altos estándares de seguridad y protección
            tanto física como tecnológica. Para mayor información sobre la
            privacidad de los Datos Personales y casos en los que será revelada
            la información personal, se pueden consultar nuestras políticas de
            privacidad.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
