import Cookies from "js-cookie";
import {
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OBTENER_USUARIO,
    CERRAR_SESION,
  } from "../types/index";
  const initialState = {
    login: [],
    // token: Cookies.get("token"),
    token: localStorage.getItem("token"),
    autenticado: false,
    mensaje: null
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOGIN_EXITOSO:
        // Cookies.set("token", action.payload.token);
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          autenticado: true,
          login: action.payload,
          mensaje:null
        };
      case OBTENER_USUARIO:
        return {
          ...state,
          login: action.payload,
          autenticado: true,
        };
  
      case LOGIN_ERROR:
    // Cookies.remove("token");
    localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          login: null,
          autenticado: false,
          mensaje: action.payload,
        };
      case CERRAR_SESION:
    // Cookies.remove("token");
    localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          login: null,
          autenticado: false,
          mensaje: null,
        };
      default:
        return state;
    }
  };
  