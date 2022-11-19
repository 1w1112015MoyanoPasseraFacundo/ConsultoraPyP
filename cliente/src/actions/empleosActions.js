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
  REPORTE_EMPLEOS_EXITOS,
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

export function obtenerAllEmpleosAction() {
  return async (dispatch) => {
    dispatch(descargarEmpleos());
    try {
      const respuesta = await clienteAxios.get("/Empleos/GetAllEmpleos");
      dispatch(descargarEmpleosExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error.response.data);
      dispatch(descargarEmpleosError(error.response));
    }
  };
}

export function obtenerEmpleosByMesAction(mes) {
  return async (dispatch) => {
    dispatch(descargarEmpleos());
    try {
      const respuesta = await clienteAxios.get(
        `/Empleos/GetEmpleosByMes?mes=${mes}`
      );
      dispatch(descargarEmpleosReporteExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error.response.data);
      dispatch(descargarEmpleosError(error.response));
    }
  };
}
export function obtenerEstadosEmpleosByFechasAction(fecha1, fecha2) {
  return async (dispatch) => {
    dispatch(descargarEmpleos());
    try {
      const respuesta = await clienteAxios.get(
        `/Empleos/GetEstadosEmpleosByFechas?fecha1=${fecha1}&fecha2=${fecha2}`
      );
      dispatch(descargarEmpleosExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error.response.data);
      dispatch(descargarEmpleosError(error.response));
    }
  };
}
export function obtenerEmpleosByFechasAction(fecha1, fecha2) {
  return async (dispatch) => {
    dispatch(descargarEmpleos());
    try {
      const respuesta = await clienteAxios.get(
        `/Empleos/GetEmpleosByFechas?fecha1=${fecha1}&fecha2=${fecha2}`
      );
      dispatch(descargarEmpleosReporteExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error.response.data);
      dispatch(descargarEmpleosError(error.response));
    }
  };
}

const descargarEmpleosReporteExitosa = (empleos) => ({
  type: REPORTE_EMPLEOS_EXITOS,
  payload: empleos,
});

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
    } catch (error) {
      console.log(error);
      dispatch(agregarEmpleoError(true));
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
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
  console.log("EMPLEO", empleo);
  return async (dispatch) => {
    dispatch(editarEmpleo());
    try {
      const rest = await clienteAxios.put(
        `/empleos/${empleo.idEmpleo}`,
        empleo
      );
      console.log("resp", rest);

      dispatch(editarEmpleoExito(empleo));
      Swal.fire("Editado!", "El empleo ha sido editado", "success");
    } catch (error) {
      console.log("ERROR", error);
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
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

//cancelar empleo
export function darDeBajaEmpleo(idEmpleo) {
  return async (dispatch) => {
    dispatch(obtenerEmpleoBaja(idEmpleo));
    try {
      await clienteAxios.put(`/Empleos/CancelarEmpleo?idEmpleo=${idEmpleo}`);
      dispatch(eliminarEmpleoExito());
      Swal.fire("Eliminado!", "El empleo ha sido cancelado", "success");
    } catch (error) {
      dispatch(eliminarEmpleoError());
    }
  };
}

//suspender empleo
export function suspenderEmpleo(idEmpleo) {
  return async (dispatch) => {
    dispatch(obtenerEmpleoBaja(idEmpleo));
    try {
      await clienteAxios.put(`/Empleos/SuspenderEmpleo?idEmpleo=${idEmpleo}`);
      dispatch(eliminarEmpleoExito());
      Swal.fire("Eliminado!", "El empleo ha sido suspendido", "success");
    } catch (error) {
      dispatch(eliminarEmpleoError());
    }
  };
}

//reanudar empleo
export function reanudarEmpleo(idEmpleo) {
  return async (dispatch) => {
    dispatch(obtenerEmpleoBaja(idEmpleo));
    try {
      await clienteAxios.put(`/Empleos/ReanudarEmpleo?idEmpleo=${idEmpleo}`);
      dispatch(eliminarEmpleoExito());
      Swal.fire("Eliminado!", "El empleo ha sido reanudado", "success");
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
