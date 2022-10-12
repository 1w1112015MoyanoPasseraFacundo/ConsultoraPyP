import {
  AGREGAR_EMPLEO,
  AGREGAR_EMPLEO_ERROR,
  AGREGAR_EMPLEO_EXITO,
  COMENZAR_DESCARGA_EMPLEOS,
  DESCARGA_EMPLEOS_ERROR,
  DESCARGA_EMPLEOS_EXITOS,
  EMPLEO_EDITADO_ERROR,
  EMPLEO_EDITADO_EXITO,
  EMPLEO_ELIMINADO_ERROR,
  EMPLEO_ELIMINADO_EXITO,
  OBTENER_EMPLEO_EDITAR,
  OBTENER_EMPLEO_ELIMINAR,
} from "../types";

const initialState = {
  empleos: [],
  error: null,
  loading: false,
  eliminar: null,
  editar: null,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_EMPLEO:
    case COMENZAR_DESCARGA_EMPLEOS:
    case EMPLEO_ELIMINADO_ERROR:
    case EMPLEO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_EMPLEOS_EXITOS:
      return {
        ...state,
        loading: false,
        empleos: action.payload,
        error: null,
      };
    case AGREGAR_EMPLEO_ERROR:
    case DESCARGA_EMPLEOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AGREGAR_EMPLEO_EXITO:
      return {
        ...state,
        loading: false,
        empleos: [...state.empleos, action.payload],
        error: null,
      };
    case OBTENER_EMPLEO_EDITAR:
      return {
        ...state,
        editar: action.payload,
      };
    case EMPLEO_EDITADO_EXITO:
      return {
        ...state,
        editar: null,
        empleos: state.empleos.map((empleo) =>
          empleo.idEmpleo === action.payload.idEmpleo
            ? (empleo = action.payload)
            : empleo
        ),
      };
    case OBTENER_EMPLEO_ELIMINAR:
      return {
        ...state,
        eliminar: action.payload,
      };
    case EMPLEO_ELIMINADO_EXITO:
      return {
        ...state,
        empleos: state.empleos.filter((empleo) => empleo.id !== state.eliminar),
        eliminar: null,
      };
    default:
      return state;
  }
}
