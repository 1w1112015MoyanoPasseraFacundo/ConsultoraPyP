import { combineReducers } from "redux";
import candidatosReducer from "./candidatosReducer";
import usuariosReducer from "./usuariosReducer";

export default combineReducers({
  candidatos: candidatosReducer,
  usuarios: usuariosReducer,
});
