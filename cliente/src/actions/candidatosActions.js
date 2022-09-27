import clienteAxios from "../config/axios";
import {
  AGREGAR_CANDIDATO,
  AGREGAR_CANDIDATO_ERROR,
  AGREGAR_CANDIDATO_EXITO,
  CANDIDATO_ELIMINADO_ERROR,
  CANDIDATO_ELIMINADO_EXITO,
  COMENZAR_DESCARGA_CANDIDATOS,
  DESCARGA_CANDIDATOS_ERROR,
  DESCARGA_CANDIDATOS_EXITOS,
  OBTENER_CANDIDATO_ELIMINAR,
} from "../types";
import Swal from "sweetalert2";
//crear nuevos candidatos
export function crearNuevoCandidatoAction(candidato) {
  return async (dispatch) => {
    dispatch(agregarCandidato());

    try {
      //insertar en la API
      await clienteAxios.post("/candidatos", candidato);
      dispatch(agregarCandidatoExito(candidato));
      Swal.fire(
        "Correcto!",
        "El candidato se agrego correctamente!",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(agregarCandidatoError(true));
      Swal.fire("Hubo un error!", "Intenta de nuevo", "error");
    }
  };
}

const agregarCandidato = () => ({
  type: AGREGAR_CANDIDATO,
  payload: true,
});

const agregarCandidatoExito = (candidato) => ({
  type: AGREGAR_CANDIDATO_EXITO,
  payload: candidato,
});

const agregarCandidatoError = (estado) => ({
  type: AGREGAR_CANDIDATO_ERROR,
  payload: estado,
});

export function obtenerCandidatosAction() {
  return async (dispatch) => {
    dispatch(descargarCandidatos());
    try {
      const respuesta = await clienteAxios.get("/Usuarios");
      console.log(respuesta);
      dispatch(descargarCandidatosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargarCandidatosError());
    }
  };
}

const descargarCandidatos = () => ({
  type: COMENZAR_DESCARGA_CANDIDATOS,
  payload: true,
});

const descargarCandidatosExitosa = (candidatos) => ({
  type: DESCARGA_CANDIDATOS_EXITOS,
  payload: candidatos,
});

const descargarCandidatosError = () => ({
  type: DESCARGA_CANDIDATOS_ERROR,
  payload: true,
});

//dar de baja candidato
export function darDeBajaCandidato(id) {
  return async (dispatch) => {
    dispatch(obtenerCandidatoBaja(id));
    try {
      await clienteAxios.put(`/candidatos/${id}`);
      dispatch(eliminarCandidatoExito());
      Swal.fire("Eliminado!", "El candidato ha sido dado de baja", "success");
    } catch (error) {
      dispatch(eliminarCandidatoError());
    }
  };
}

const obtenerCandidatoBaja = (id) => ({
  type: OBTENER_CANDIDATO_ELIMINAR,
  payload: id,
});

const eliminarCandidatoExito = () => ({
  type: CANDIDATO_ELIMINADO_EXITO,
});

const eliminarCandidatoError = () => ({
  type: CANDIDATO_ELIMINADO_ERROR,
  payload: true,
});
