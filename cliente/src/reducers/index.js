import { combineReducers } from "redux";

import candidatosReducer from "./candidatosReducer";
export default combineReducers({
  candidatos: candidatosReducer,
});
