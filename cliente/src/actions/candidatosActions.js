import clienteAxios from "../config/axios";
import {
  AGREGAR_CANDIDATO,
  AGREGAR_CANDIDATO_ERROR,
  AGREGAR_CANDIDATO_EXITO,
  CANDIDATO_EDITADO_ERROR,
  CANDIDATO_EDITADO_EXITO,
  CANDIDATO_ELIMINADO_ERROR,
  CANDIDATO_ELIMINADO_EXITO,
  COMENZAR_DESCARGA_CANDIDATOS,
  COMENZAR_EDICION_CANDIDATO,
  DESCARGA_CANDIDATOS_ERROR,
  DESCARGA_CANDIDATOS_EXITOS,
  OBTENER_CANDIDATO_EDITAR,
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
    } catch (error) {
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
      dispatch(agregarCandidatoError(true));
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

export function obtenerCandidatoEditar(candidato) {
  return (dispatch) => {
    return dispatch(obtenerCandidatoEditarAction(candidato));
  };
}

const obtenerCandidatoEditarAction = (candidato) => ({
  type: OBTENER_CANDIDATO_EDITAR,
  payload: candidato,
});

export function editarCandidatoAction(candidato) {
  return async (dispatch) => {
    dispatch(editarCandidato());
    try {
      await clienteAxios.put(`/candidatos/${candidato.idCandidato}`, candidato);
      dispatch(editarCandidatoExito(candidato));
      Swal.fire("Editado!", "El candidato ha sido editado", "success");
    } catch (error) {
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
      dispatch(editarCandidatoError());
    }
  };
}

export function editarEstadoCandidatoAction(candidato) {
  return async (dispatch) => {
    dispatch(editarCandidato());
    try {
      await clienteAxios.put(
        `/candidatos/UpdateEstadoCandidato/${candidato.idCandidato}`,
        candidato
      );
    } catch (error) {
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
      dispatch(editarCandidatoError());
    }
  };
}

const editarCandidato = () => ({
  type: COMENZAR_EDICION_CANDIDATO,
});

const editarCandidatoExito = (candidato) => ({
  type: CANDIDATO_EDITADO_EXITO,
  payload: candidato,
});

const editarCandidatoError = () => ({
  type: CANDIDATO_EDITADO_ERROR,
  payload: true,
});

export function obtenerCandidatosAction() {
  return async (dispatch) => {
    dispatch(descargarCandidatos());
    try {
      const respuesta = await clienteAxios.get("/Candidatos");
      dispatch(descargarCandidatosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargarCandidatosError(error.response));
    }
  };
}

export function obtenerCandidatosFilterAction(filtros) {
  return async (dispatch) => {
    dispatch(descargarCandidatos());
    try {
      const respuesta = await clienteAxios.get(
        `/Candidatos/GetCandidatosFilter?nombre=${filtros.nombre}&apellido=${filtros.apellido}&estado=${filtros.estado}`
      );

      dispatch(descargarCandidatosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargarCandidatosError(error.response.data));
    }
  };
}

export function obtenerCandidatosByCompes(idsCompes) {
  return async (dispatch) => {
    dispatch(descargarCandidatos());
    try {
      const respuesta = await clienteAxios.get(
        `/Candidatos/GetCandidatosByCompes?idsCompes=${idsCompes}`
      );

      dispatch(descargarCandidatosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargarCandidatosError(error.response.data));
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

const descargarCandidatosError = (error) => ({
  type: DESCARGA_CANDIDATOS_ERROR,
  payload: error,
});

//dar de baja candidato
export function darDeBajaCandidato(idCandidato) {
  return async (dispatch) => {
    dispatch(obtenerCandidatoBaja(idCandidato));
    try {
      await clienteAxios.delete(`/candidatos/${idCandidato}`);
      dispatch(eliminarCandidatoExito());
      Swal.fire("Descartado!", "El candidato ha sido dado de baja", "success");
      window.location.reload();
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
