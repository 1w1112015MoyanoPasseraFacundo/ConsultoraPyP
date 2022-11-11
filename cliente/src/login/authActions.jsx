import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO } from "../types";

export function usuarioAutenticado() {
    const token = localStorage.getItem("token");
    console.log("LOCALLLMENTE2", localStorage.getItem("token"));
    console.log("LOCALLLMENTE1", token);

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
      console.log("RESP", resp);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: resp.data,
      });
      // Cookies.set("token", resp.data.usuario);
      localStorage.setItem("token", resp.data.usuario);
      console.log("LOCALLL", localStorage.getItem("token"));
      usuarioAutenticado();
    } catch (error) {
        console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data,
      });
      if (error.response.data!==null && error.response.data!==undefined) {
        if(error.response.data.includes("System.InvalidOperationException")){
        Swal.fire("Error de conexión", "Intenta de nuevo", "error");
        }else{
          Swal.fire(error.response.data, "Intenta de nuevo", "error");
        }
      }
    }}
  };
 
  export function cerrarSesion() {
    return  (dispatch) => {
      dispatch(cerrar());
    }
  };

  const cerrar = () => ({
    type: CERRAR_SESION,
    payload: false,
  });