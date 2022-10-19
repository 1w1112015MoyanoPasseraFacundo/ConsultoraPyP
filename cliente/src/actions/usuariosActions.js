import clienteAxios from "../config/axios";
import {
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_ERROR,
  AGREGAR_USUARIO_EXITO,
  COMENZAR_DESCARGA_USUARIOS,
  COMENZAR_EDICION_USUARIO,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITOS,
  OBTENER_PRODUCTO_EDITAR,
  OBTENER_TIPOS_DOCUMENTOS,
  OBTENER_USUARIO_EDITAR,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_EDITADO_ERROR,
  USUARIO_EDITADO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  USUARIO_ELIMINADO_EXITO,
} from "../types";
import Swal from "sweetalert2";

//crear nuevos usuarios
export function crearNuevoUsuarioAction(usuario) {
  return async (dispatch) => {
    dispatch(agregarUsuario());
    console.log(usuario);
    try {
      //insertar en la API
      await clienteAxios.post("/Usuarios", usuario);
      dispatch(agregarUsuarioExito(usuario));
      Swal.fire("Correcto!", "El usuario se agrego correctamente!", "success");
    } catch (error) {
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
    } catch (error) {
      dispatch(descargarUsuariosError(error.response));
    }
  };
}

export function obtenerUsuariosFilterAction(filtros) {
  return async (dispatch) => {
    dispatch(descargarUsuarios());
    console.log(filtros);
    try {
      const respuesta = await clienteAxios.get(
        `/Usuarios/GetUsuariosFilter?nombreUsuario=${filtros.usuario}&cuil=${filtros.cuil}&estado=${filtros.estado}`
      );
      console.log(respuesta);

      dispatch(descargarUsuariosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargarUsuariosError(error.response.data));
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
      await clienteAxios.delete(`/Usuarios/${id}`);
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

export function obtenerUsuarioEditar(usuario) {
  return (dispatch) => {
    return dispatch(obtenerUsuarioEditarAction(usuario));
  };
}

const obtenerUsuarioEditarAction = (usuario) => ({
  type: OBTENER_USUARIO_EDITAR,
  payload: usuario,
});

export function editarUsuarioAction(usuario) {
  return async (dispatch) => {
    dispatch(editarUsuario());
    try {
      await clienteAxios.put(`/usuarios/${usuario.idUsuario}`, usuario);
      console.log(usuario);
      dispatch(editarUsuarioExito(usuario));
      // Swal.fire("Editado!", "El usuario ha sido editado", "success");
    } catch (error) {
      console.log(error);
      dispatch(editarUsuarioError());
    }
  };
}

const editarUsuario = () => ({
  type: COMENZAR_EDICION_USUARIO,
});

const editarUsuarioExito = (usuario) => ({
  type: USUARIO_EDITADO_EXITO,
  payload: usuario,
});

const editarUsuarioError = () => ({
  type: USUARIO_EDITADO_ERROR,
  payload: true,
});
