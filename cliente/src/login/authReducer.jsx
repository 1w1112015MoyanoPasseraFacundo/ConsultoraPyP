import {
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OBTENER_USUARIO,
    CERRAR_SESION,
  } from "../types/index";
  const initialState = {
    login: [],
    token: localStorage.getItem("token"),
    autenticado: false,
    mensaje: null
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOGIN_EXITOSO:
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          autenticado: true,
          mensaje: action.payload,
        };
      case OBTENER_USUARIO:
        return {
          ...state,
          login: action.payload,
          autenticado: true,
        };
  
      case LOGIN_ERROR:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          login: null,
          autenticado: false,
          mensaje: action.payload,
        };
    //   case CERRAR_SESION:
    //     localStorage.removeItem("token");
    //     return {
    //       ...state,
    //       token: null,
    //       login: null,
    //       autenticado: null,
    //       mensaje: action.payload,
    //     };
      default:
        return state;
    }
  };
  