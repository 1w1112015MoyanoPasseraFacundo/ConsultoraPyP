import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import { CARGANDO, CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO } from "../types";

export function usuarioAutenticado() {
    const token = localStorage.getItem("token");
    return async (dispatch) => {
    try {
      const resp = await clienteAxios.get(`/Usuarios/login?nombreUsuario=${token}`);
      dispatch({
        type: OBTENER_USUARIO,
        payload: resp.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }}
  };

  export function recoverPassword(email){
    return async(dispatch)=>{
      console.log("MAIL", email);

      try{
      const resp = await clienteAxios.patch(`/Usuarios/ForgotPasswordUsuario?mail=${email}`);
     Swal.fire("Correo enviado", "", "success");
     console.log("RESPUESTA", resp);
      }catch(error){
        console.log("error", error);

        Swal.fire("Ocurrió un error al enviar el correo", "Intenta de nuevo", "error");
      }
    }
  }

  export function iniciarSesion(datos) {
     
    return async (dispatch) => {    
      dispatch({
        type: CARGANDO,
      });  
    try {
      const resp = await clienteAxios.post("/Usuarios/login", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: resp.data,
      });
      // Cookies.set("token", resp.data.usuario);
      localStorage.setItem("token", resp.data.usuario);
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