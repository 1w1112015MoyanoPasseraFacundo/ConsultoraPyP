import { combineReducers } from "redux";
import authReducer from "../login/authReducer";
import candidatosReducer from "./candidatosReducer";
import clientesReducer from "./clientesReducer";
import competenciasReducer from "./competenciasReducer";
import empleosReducer from "./empleosReducer";
import pagosReducer from "./pagosReducer";
import usuariosReducer from "./usuariosReducer";

export default combineReducers({
  candidatos: candidatosReducer,
  usuarios: usuariosReducer,
  competencias: competenciasReducer,
  clientes: clientesReducer,
  empleos: empleosReducer,
  pagos: pagosReducer,
  login: authReducer,
});
