import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import {
  AGREGAR_COMPETENCIA,
  AGREGAR_COMPETENCIA_ERROR,
  COMENZAR_DESCARGA_COMPETENCIAS,
  DESCARGA_COMPETENCIAS_ERROR,
  DESCARGA_COMPETENCIAS_EXITOS,
  AGREGAR_COMPETENCIA_EXITO,
  COMPETENCIA_EDITADO_ERROR,
  COMPETENCIA_EDITADO_EXITO,
  COMENZAR_EDICION_COMPETENCIA,
  OBTENER_COMPETENCIA_EDITAR,
  OBTENER_COMPETENCIA_ELIMINAR,
  COMPETENCIA_ELIMINADO_EXITO,
  COMPETENCIA_ELIMINADO_ERROR,
} from "../types";

export function obtenerCompetenciasAction() {
  return async (dispatch) => {
    dispatch(descargarCompetencias());
    try {
      const respuesta = await clienteAxios.get("/Competencias");
      console.log(respuesta);
      dispatch(descargarCompetenciasExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargarCompetenciasError(error.response));
    }
  };
}

const descargarCompetencias = () => ({
  type: COMENZAR_DESCARGA_COMPETENCIAS,
  payload: true,
});

const descargarCompetenciasExitosa = (competencias) => ({
  type: DESCARGA_COMPETENCIAS_EXITOS,
  payload: competencias,
});

const descargarCompetenciasError = (error) => ({
  type: DESCARGA_COMPETENCIAS_ERROR,
  payload: error,
});

export function crearNuevaCompetenciaAction(competencia) {
  return async (dispatch) => {
    dispatch(agregarCompetencia());
    console.log(competencia);
    try {
      //insertar en la API
      await clienteAxios.post("/competencias", competencia);
      dispatch(agregarCompetenciaExito(competencia));
      Swal.fire(
        "Correcto!",
        "La competencia se agrego correctamente!",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(agregarCompetenciaError(true));
      Swal.fire("Hubo un error!", "Intenta de nuevo", "error");
    }
  };
}

const agregarCompetencia = () => ({
  type: AGREGAR_COMPETENCIA,
  payload: true,
});

const agregarCompetenciaExito = (competencia) => ({
  type: AGREGAR_COMPETENCIA_EXITO,
  payload: competencia,
});

const agregarCompetenciaError = (estado) => ({
  type: AGREGAR_COMPETENCIA_ERROR,
  payload: estado,
});

export function obtenerCompetenciaEditar(competencia) {
  return (dispatch) => {
    return dispatch(obtenerCompetenciaEditarAction(competencia));
  };
}

const obtenerCompetenciaEditarAction = (competencia) => ({
  type: OBTENER_COMPETENCIA_EDITAR,
  payload: competencia,
});

export function editarCompetenciaAction(competencia) {
  return async (dispatch) => {
    dispatch(editarCompetencia());
    try {
      await clienteAxios.put(
        `/Competencias/${competencia.idCompetencia}`,
        competencia
      );
      console.log(competencia);
      dispatch(editarCompetenciaExito(competencia));
      // Swal.fire("Editado!", "El competencia ha sido editado", "success");
    } catch (error) {
      console.log(error);
      dispatch(editarCompetenciaError());
    }
  };
}

const editarCompetencia = () => ({
  type: COMENZAR_EDICION_COMPETENCIA,
});

const editarCompetenciaExito = (competencia) => ({
  type: COMPETENCIA_EDITADO_EXITO,
  payload: competencia,
});

const editarCompetenciaError = () => ({
  type: COMPETENCIA_EDITADO_ERROR,
  payload: true,
});

//dar de baja competencia
export function darDeBajaCompetencia(idCompetencia) {
  return async (dispatch) => {
    dispatch(obtenerCompetenciaBaja(idCompetencia));
    try {
      await clienteAxios.delete(`/competencias/${idCompetencia}`);
      dispatch(eliminarCompetenciaExito());
      Swal.fire("Eliminado!", "La competencia ha sido dado de baja", "success");
    } catch (error) {
      dispatch(eliminarCompetenciaError());
    }
  };
}

const obtenerCompetenciaBaja = (id) => ({
  type: OBTENER_COMPETENCIA_ELIMINAR,
  payload: id,
});

const eliminarCompetenciaExito = () => ({
  type: COMPETENCIA_ELIMINADO_EXITO,
});

const eliminarCompetenciaError = () => ({
  type: COMPETENCIA_ELIMINADO_ERROR,
  payload: true,
});
