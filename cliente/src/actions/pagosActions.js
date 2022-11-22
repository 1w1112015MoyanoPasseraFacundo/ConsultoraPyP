import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import {
  AGREGAR_PAGO,
  AGREGAR_PAGO_ERROR,
  AGREGAR_PAGO_EXITO,
  COMENZAR_DESCARGA_PAGOS,
  COMENZAR_EDICION_PAGO,
  DESCARGA_PAGOS_ERROR,
  DESCARGA_PAGOS_EXITOS,
  OBTENER_PAGO_EDITAR,
  OBTENER_PAGO_ELIMINAR,
  PAGO_EDITADO_ERROR,
  PAGO_EDITADO_EXITO,
  PAGO_ELIMINADO_ERROR,
  PAGO_ELIMINADO_EXITO,
} from "../types";

export function obtenerPagosAction() {
  return async (dispatch) => {
    dispatch(descargarPagos());
    try {
      const respuesta = await clienteAxios.get("/Pagos");
      dispatch(descargarPagosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargarPagosError(error.response));
    }
  };
}

export function obtenerPagoReporte(fecha1, fecha2) {
  return async (dispatch) => {
    dispatch(descargarPagos());
    try {
      const respuesta = await clienteAxios.get(
        `/Pagos/GetPagosReporte?fecha1=${fecha1}&fecha2=${fecha2}`
      );
      dispatch(descargarPagosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargarPagosError(error.response));
    }
  };
}
export function obtenerPagosFilterAction(filtros) {
  return async (dispatch) => {
    dispatch(descargarPagos());
    try {
      const respuesta = await clienteAxios.get(
        `/Pagos/GetPagosFilter?idCliente=${filtros.idCliente}&estado=${filtros.estado}`
      );

      dispatch(descargarPagosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargarPagosError(error.response.data));
    }
  };
}

const descargarPagos = () => ({
  type: COMENZAR_DESCARGA_PAGOS,
  payload: true,
});

const descargarPagosExitosa = (pagos) => ({
  type: DESCARGA_PAGOS_EXITOS,
  payload: pagos,
});

const descargarPagosError = (error) => ({
  type: DESCARGA_PAGOS_ERROR,
  payload: error,
});

export function crearNuevoPagoAction(pago) {
  return async (dispatch) => {
    dispatch(agregarPago());
    try {
      //insertar en la API
      await clienteAxios.post("/Pagos", pago);
      dispatch(agregarPagoExito(pago));
    } catch (error) {
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
      dispatch(agregarPagoError(true));
    }
  };
}

const agregarPago = () => ({
  type: AGREGAR_PAGO,
  payload: true,
});

const agregarPagoExito = (pago) => ({
  type: AGREGAR_PAGO_EXITO,
  payload: pago,
});

const agregarPagoError = (estado) => ({
  type: AGREGAR_PAGO_ERROR,
  payload: estado,
});

export function obtenerPagoEditar(pago) {
  return (dispatch) => {
    return dispatch(obtenerPagoEditarAction(pago));
  };
}

const obtenerPagoEditarAction = (pago) => ({
  type: OBTENER_PAGO_EDITAR,
  payload: pago,
});

export function editarPagoAction(pago) {
  return async (dispatch) => {
    dispatch(editarPago());
    try {
      await clienteAxios.put(`/Pagos/${pago.idPago}`, pago);
      dispatch(editarPagoExito(pago));
      Swal.fire("Editado!", "El pago ha sido editado", "success");
    } catch (error) {
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
      dispatch(editarPagoError());
    }
  };
}

const editarPago = () => ({
  type: COMENZAR_EDICION_PAGO,
});

const editarPagoExito = (pago) => ({
  type: PAGO_EDITADO_EXITO,
  payload: pago,
});

const editarPagoError = () => ({
  type: PAGO_EDITADO_ERROR,
  payload: true,
});

//dar de baja Pago
export function darDeBajaPago(idPago) {
  return async (dispatch) => {
    dispatch(obtenerPagoBaja(idPago));
    try {
      await clienteAxios.delete(`/Pagos/${idPago}`);
      dispatch(eliminarPagoExito());
      Swal.fire("Eliminado!", "El pago ha sido dado de baja", "success");
      window.location.reload();
    } catch (error) {
      dispatch(eliminarPagoError());
    }
  };
}

const obtenerPagoBaja = (id) => ({
  type: OBTENER_PAGO_ELIMINAR,
  payload: id,
});

const eliminarPagoExito = () => ({
  type: PAGO_ELIMINADO_EXITO,
});

const eliminarPagoError = () => ({
  type: PAGO_ELIMINADO_ERROR,
  payload: true,
});
