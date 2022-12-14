import React, { useEffect, useState } from "react";
import { BsCheckLg, BsReplyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editarClienteAction } from "../../actions/clientesActions";
import clienteAxios from "../../config/axios";
const EditarCliente = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.clientes.error);
  const editar = useSelector((state) => state.clientes.editar);
  const [listaRubros, guardarRubros] = useState([]);
  const [listaPaises, guardarPaises] = useState([]);

  useEffect(() => {
    guardarCliente(editar);
  }, [editar]);

  useEffect(() => {
    if (error === false) {
      navigate("/clientes");
    }
  }, [error]);

  const [cliente, guardarCliente] = useState({
    nombre: "",
    nombreFantasia: "",
    mail: "",
    documento: "",
    idRubro: 0,
    idPais: 0,
    telefono: "",
    direccion: "",
  });
  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/rubros`);
      guardarRubros(resultado.data);
    };
    consultarAPI();

    const llenarPaises = async () => {
      const resultado = await clienteAxios.get(`/paises`);
      guardarPaises(resultado.data);
    };
    llenarPaises();
  }, []);

  const onChangeFormulario = (e) => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };
  const cancelar = () => {
    navigate("/clientes");
  };

  const {
    nombre,
    nombreFantasia,
    mail,
    documento,
    idPais,
    idRubro,
    telefono,
    direccion,
  } = cliente;

  const submitEditarCliente = (e) => {
    e.preventDefault();
    //validar form
    if (
      nombre.trim() === "" ||
      nombreFantasia.trim() === "" ||
      mail.trim() === "" ||
      idPais === 0 ||
      idPais === "0" ||
      documento === "" ||
      idRubro === "0" ||
      idRubro === 0 ||
      direccion.trim() === "" ||
      telefono === ""
    ) {
      Swal.fire("Llene todos los campos obligatorios", "", "warning");
      return;
    } else if (telefono.includes("-") || telefono.includes("e")) {
      Swal.fire("Ingrese un t??lefono correcto", "", "warning");
      return;
    } else if (documento.includes("-") || documento.includes("e")) {
      Swal.fire("Ingrese un cuit correcto", "", "warning");
    } else if (documento.length !== 11) {
      Swal.fire("El campo cuit s??lo acepta once n??meros", "", "warning");
      return;
    } else if (telefono !== "") {
      if (telefono.length < 5 || telefono.length > 20) {
        Swal.fire("Ingrese un t??lefono correcto", "", "warning");
        return;
      }
    }
    dispatch(editarClienteAction(cliente));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="title-decorator">Editar Cliente</h3>
        <div className="card">
          <div className="card-body">
            {/* {alerta ? <p className={alerta.clases}>{alerta.msg}</p>:null} */}
            <form>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Raz??n Social</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Raz??n social"
                    name="nombreFantasia"
                    value={nombreFantasia}
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Correo electr??nico</label>
                  <input
                    type="mail"
                    className="form-control"
                    placeholder="E-mail"
                    name="mail"
                    value={mail}
                    onChange={onChangeFormulario}
                  />
                </div>
              </div>
              <div className="row p-t-20">
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>Pa??s</label>
                  <select
                    className="form-control"
                    name="idPais"
                    value={idPais}
                    onChange={onChangeFormulario}
                  >
                    {listaPaises.map((pais) => (
                      <option key={pais.idPais} value={pais.idPais}>
                        {pais.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>CUIT</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Documento"
                    name="documento"
                    min="0"
                    minLength={11}
                    maxLength={11}
                    value={documento}
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group  col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
              </div>

              <div className="row p-t-20">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Direcci??n </label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={direccion}
                      onChange={onChangeFormulario}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="form-label"> Tel??fono </label>
                    <input
                      type="Number"
                      min="0"
                      className="form-control"
                      name="telefono"
                      value={telefono}
                      onChange={onChangeFormulario}
                    />
                  </div>
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

export default EditarCliente;
