import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import {
  AGREGAR_CLIENTE,
  AGREGAR_CLIENTE_ERROR,
  AGREGAR_CLIENTE_EXITO,
  CLIENTE_EDITADO_ERROR,
  CLIENTE_EDITADO_EXITO,
  CLIENTE_ELIMINADO_ERROR,
  CLIENTE_ELIMINADO_EXITO,
  COMENZAR_DESCARGA_CLIENTES,
  COMENZAR_EDICION_CLIENTE,
  DESCARGA_CLIENTES_ERROR,
  DESCARGA_CLIENTES_EXITOS,
  OBTENER_CLIENTE_EDITAR,
  OBTENER_CLIENTE_ELIMINAR,
} from "../types";

export function obtenerClientesAction() {
  return async (dispatch) => {
    dispatch(descargarClientes());
    try {
      const respuesta = await clienteAxios.get("/Clientes");
      dispatch(descargarClientesExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error.response.data);
      dispatch(descargarClientesError(error.response));
    }
  };
}

export function obtenerClientesFilterAction(filtros) {
  return async (dispatch) => {
    dispatch(descargarClientes());
    console.log(filtros);
    try {
      const respuesta = await clienteAxios.get(
        `/Clientes/GetClientesFilter?nombre=${filtros.nombre}&mail=${filtros.mail}&estado=${filtros.estado}`
      );
      console.log(respuesta);

      dispatch(descargarClientesExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargarClientesError(error.response.data));
    }
  };
}

const descargarClientes = () => ({
  type: COMENZAR_DESCARGA_CLIENTES,
  payload: true,
});

const descargarClientesExitosa = (clientes) => ({
  type: DESCARGA_CLIENTES_EXITOS,
  payload: clientes,
});

const descargarClientesError = (error) => ({
  type: DESCARGA_CLIENTES_ERROR,
  payload: error,
});

export function crearNuevoClienteAction(cliente) {
  return async (dispatch) => {
    dispatch(agregarCliente());
    console.log(cliente);
    try {
      //insertar en la API
      await clienteAxios.post("/clientes", cliente);
      dispatch(agregarClienteExito(cliente));
    } catch (error) {
      console.log("ERROR", error);
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
      dispatch(agregarClienteError(true));
    }
  };
}

const agregarCliente = () => ({
  type: AGREGAR_CLIENTE,
  payload: true,
});

const agregarClienteExito = (cliente) => ({
  type: AGREGAR_CLIENTE_EXITO,
  payload: cliente,
});

const agregarClienteError = (estado) => ({
  type: AGREGAR_CLIENTE_ERROR,
  payload: estado,
});

export function obtenerClienteEditar(cliente) {
  return (dispatch) => {
    return dispatch(obtenerClienteEditarAction(cliente));
  };
}

const obtenerClienteEditarAction = (cliente) => ({
  type: OBTENER_CLIENTE_EDITAR,
  payload: cliente,
});

export function editarClienteAction(cliente) {
  return async (dispatch) => {
    dispatch(editarCliente());
    try {
      await clienteAxios.put(`/clientes/${cliente.idCliente}`, cliente);
      console.log(cliente);
      dispatch(editarClienteExito(cliente));
      Swal.fire("Editado!", "El cliente ha sido editado", "success");
    } catch (error) {
      Swal.fire(error.response.data, "Intenta de nuevo", "error");
      dispatch(editarClienteError());
    }
  };
}

const editarCliente = () => ({
  type: COMENZAR_EDICION_CLIENTE,
});

const editarClienteExito = (cliente) => ({
  type: CLIENTE_EDITADO_EXITO,
  payload: cliente,
});

const editarClienteError = () => ({
  type: CLIENTE_EDITADO_ERROR,
  payload: true,
});

//dar de baja cliente
export function darDeBajaCliente(idCliente) {
  return async (dispatch) => {
    dispatch(obtenerClienteBaja(idCliente));
    try {
      console.log(idCliente);
      await clienteAxios.delete(`/clientes/${idCliente}`);
      dispatch(eliminarClienteExito());
      Swal.fire("Eliminado!", "El cliente ha sido dado de baja", "success");
      window.location.reload();
    } catch (error) {
      dispatch(eliminarClienteError());
    }
  };
}

const obtenerClienteBaja = (id) => ({
  type: OBTENER_CLIENTE_ELIMINAR,
  payload: id,
});

const eliminarClienteExito = () => ({
  type: CLIENTE_ELIMINADO_EXITO,
});

const eliminarClienteError = () => ({
  type: CLIENTE_ELIMINADO_ERROR,
  payload: true,
});
