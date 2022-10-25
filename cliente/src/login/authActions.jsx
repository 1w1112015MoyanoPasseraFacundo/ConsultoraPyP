import clienteAxios from "../config/axios";
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO } from "../types";


export function usuarioAutenticado() {
    const token = localStorage.getItem("token");
    console.log(token);
    return async (dispatch) => {
    try {
      const resp = await clienteAxios.get(`/Usuarios/login?nombreUsuario=${token}`);
      console.log(resp);
      dispatch({
        type: OBTENER_USUARIO,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: LOGIN_ERROR,
      });
    }}
  };

  export function iniciarSesion(datos) {
    console.log(datos);
    return async (dispatch) => {
    
    try {
      const resp = await clienteAxios.post("/Usuarios/login", datos);
      console.log(resp);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: resp.data,
      });
      localStorage.setItem("token", resp.data.usuario);
      usuarioAutenticado();
    } catch (error) {
        console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data,
      });
    }}
  };
 
  export function cerrarSesion() {
    localStorage.removeItem("token");
    return  (dispatch) => {
    dispatch({
      type: CERRAR_SESION,
    });
}
  };