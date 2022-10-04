import { combineReducers } from "redux";
import candidatosReducer from "./candidatosReducer";
import competenciasReducer from "./competenciasReducer";
import usuariosReducer from "./usuariosReducer";

export default combineReducers({
  candidatos: candidatosReducer,
  usuarios: usuariosReducer,
  competencias: competenciasReducer,
});
