import clienteAxios from "../config/axios";
import {
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_ERROR,
  AGREGAR_USUARIO_EXITO,
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITOS,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_ELIMINADO_ERROR,
  USUARIO_ELIMINADO_EXITO,
} from "../types";
import Swal from "sweetalert2";

//crear nuevos usuarios
export function crearNuevoUsuarioAction(usuario) {
  console.log(usuario);
  return async (dispatch) => {
    dispatch(agregarUsuario());

    try {
      //insertar en la API
      await clienteAxios.post("/Usuarios", usuario);
      dispatch(agregarUsuarioExito(usuario));
      Swal.fire("Correcto!", "El usuario se agrego correctamente!", "success");
    } catch (error) {
      console.log(error.config.data);
      dispatch(agregarUsuarioError(true));
      Swal.fire("Hubo un error!", "Intenta de nuevo", "error");
    }
  };
}

const agregarUsuario = () => ({
  type: AGREGAR_USUARIO,
  payload: true,
});

const agregarUsuarioExito = (usuario) => ({
  type: AGREGAR_USUARIO_EXITO,
  payload: usuario,
});

const agregarUsuarioError = (estado) => ({
  type: AGREGAR_USUARIO_ERROR,
  payload: estado,
});

export function obtenerUsuariosAction() {
  return async (dispatch) => {
    dispatch(descargarUsuarios());
    try {
      const respuesta = await clienteAxios.get("/Usuarios");
      dispatch(descargarUsuariosExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error.response);
      dispatch(descargarUsuariosError(error.response));
      console.log(error.response);
    }
  };
}

const descargarUsuarios = () => ({
  type: COMENZAR_DESCARGA_USUARIOS,
  payload: true,
});

const descargarUsuariosExitosa = (usuarios) => ({
  type: DESCARGA_USUARIOS_EXITOS,
  payload: usuarios,
});

const descargarUsuariosError = (error) => ({
  type: DESCARGA_USUARIOS_ERROR,
  payload: error,
});

//dar de baja Usuario
export function darDeBajaUsuario(id) {
  return async (dispatch) => {
    dispatch(obtenerUsuarioBaja(id));
    try {
      await clienteAxios.put(`/Usuarios/${id}`);
      dispatch(eliminarUsuarioExito());
      Swal.fire("Eliminado!", "El usuario ha sido dado de baja", "success");
    } catch (error) {
      dispatch(eliminarUsuarioError());
    }
  };
}

const obtenerUsuarioBaja = (id) => ({
  type: OBTENER_USUARIO_ELIMINAR,
  payload: id,
});

const eliminarUsuarioExito = () => ({
  type: USUARIO_ELIMINADO_EXITO,
});

const eliminarUsuarioError = () => ({
  type: USUARIO_ELIMINADO_ERROR,
  payload: true,
});
