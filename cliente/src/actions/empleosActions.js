import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import {
  AGREGAR_EMPLEO,
  AGREGAR_EMPLEO_ERROR,
  AGREGAR_EMPLEO_EXITO,
  COMENZAR_DESCARGA_EMPLEOS,
  COMENZAR_EDICION_EMPLEO,
  DESCARGA_EMPLEOS_ERROR,
  DESCARGA_EMPLEOS_EXITOS,
  EMPLEO_EDITADO_ERROR,
  EMPLEO_EDITADO_EXITO,
  EMPLEO_ELIMINADO_ERROR,
  EMPLEO_ELIMINADO_EXITO,
  OBTENER_EMPLEO_EDITAR,
  OBTENER_EMPLEO_ELIMINAR,
} from "../types";

export function obtenerEmpleosAction() {
  return async (dispatch) => {
    dispatch(descargarEmpleos());
    try {
      const respuesta = await clienteAxios.get("/Empleos");
      dispatch(descargarEmpleosExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error.response.data);
      dispatch(descargarEmpleosError(error.response));
    }
  };
}

export function obtenerEmpleosFilterAction(filtros) {
  return async (dispatch) => {
    console.log(filtros);
    dispatch(descargarEmpleos());
    try {
      const respuesta = await clienteAxios.get(
        `/Empleos/GetEmpleosFilter?nombre=${filtros.nombre}&idRubro=${filtros.idRubro}&idCliente=${filtros.idCliente}&idEstado=${filtros.idEstado}`
      );
      console.log(respuesta);

      dispatch(descargarEmpleosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargarEmpleosError(error.response.data));
    }
  };
}

const descargarEmpleos = () => ({
  type: COMENZAR_DESCARGA_EMPLEOS,
  payload: true,
});

const descargarEmpleosExitosa = (empleos) => ({
  type: DESCARGA_EMPLEOS_EXITOS,
  payload: empleos,
});

const descargarEmpleosError = (error) => ({
  type: DESCARGA_EMPLEOS_ERROR,
  payload: error,
});

export function crearNuevoEmpleoAction(empleo) {
  return async (dispatch) => {
    dispatch(agregarEmpleo());
    console.log(empleo);
    try {
      //insertar en la API
      await clienteAxios.post("/empleos", empleo);
      dispatch(agregarEmpleoExito(empleo));
      Swal.fire("Correcto!", "El empleo se agrego correctamente!", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarEmpleoError(true));
      Swal.fire("Hubo un error!", "Intenta de nuevo", "error");
    }
  };
}

const agregarEmpleo = () => ({
  type: AGREGAR_EMPLEO,
  payload: true,
});

const agregarEmpleoExito = (empleo) => ({
  type: AGREGAR_EMPLEO_EXITO,
  payload: empleo,
});

const agregarEmpleoError = (estado) => ({
  type: AGREGAR_EMPLEO_ERROR,
  payload: estado,
});

export function obtenerEmpleoEditar(empleo) {
  return (dispatch) => {
    return dispatch(obtenerEmpleoEditarAction(empleo));
  };
}

const obtenerEmpleoEditarAction = (empleo) => ({
  type: OBTENER_EMPLEO_EDITAR,
  payload: empleo,
});

export function editarEmpleoAction(empleo) {
  return async (dispatch) => {
    dispatch(editarEmpleo());
    try {
      await clienteAxios.put(`/empleos/${empleo.idEmpleo}`, empleo);
      console.log(empleo);
      dispatch(editarEmpleoExito(empleo));
      Swal.fire("Editado!", "El empleo ha sido editado", "success");
    } catch (error) {
      console.log(error);
      dispatch(editarEmpleoError());
    }
  };
}

const editarEmpleo = () => ({
  type: COMENZAR_EDICION_EMPLEO,
});

const editarEmpleoExito = (empleo) => ({
  type: EMPLEO_EDITADO_EXITO,
  payload: empleo,
});

const editarEmpleoError = () => ({
  type: EMPLEO_EDITADO_ERROR,
  payload: true,
});

//dar de baja empleo
export function darDeBajaEmpleo(idEmpleo) {
  return async (dispatch) => {
    dispatch(obtenerEmpleoBaja(idEmpleo));
    try {
      await clienteAxios.delete(`/Empleos/${idEmpleo}`);
      dispatch(eliminarEmpleoExito());
      Swal.fire("Eliminado!", "El empleo ha sido dado de baja", "success");
    } catch (error) {
      dispatch(eliminarEmpleoError());
    }
  };
}

const obtenerEmpleoBaja = (id) => ({
  type: OBTENER_EMPLEO_ELIMINAR,
  payload: id,
});

const eliminarEmpleoExito = () => ({
  type: EMPLEO_ELIMINADO_EXITO,
});

const eliminarEmpleoError = () => ({
  type: EMPLEO_ELIMINADO_ERROR,
  payload: true,
});
