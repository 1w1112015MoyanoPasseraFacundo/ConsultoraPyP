import {
  AGREGAR_COMPETENCIA,
  AGREGAR_COMPETENCIA_ERROR,
  AGREGAR_COMPETENCIA_EXITO,
  COMENZAR_DESCARGA_COMPETENCIAS,
  COMPETENCIA_EDITADO_ERROR,
  COMPETENCIA_EDITADO_EXITO,
  COMPETENCIA_ELIMINADO_ERROR,
  COMPETENCIA_ELIMINADO_EXITO,
  DESCARGA_COMPETENCIAS_ERROR,
  DESCARGA_COMPETENCIAS_EXITOS,
  OBTENER_COMPETENCIA_EDITAR,
  OBTENER_COMPETENCIA_ELIMINAR,
  OBTENER_RUBRO,
} from "../types";

const initialState = {
  competencias: [],
  error: null,
  loading: false,
  eliminar: null,
  editar: null,
  rubro: null,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_COMPETENCIA:
    case COMPETENCIA_ELIMINADO_ERROR:
    case COMPETENCIA_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AGREGAR_COMPETENCIA_EXITO:
      return {
        ...state,
        loading: false,
        competencias: [...state.competencias, action.payload],
        error: null,
      };
    case AGREGAR_COMPETENCIA_ERROR:
    case DESCARGA_COMPETENCIAS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_COMPETENCIAS_EXITOS:
      return {
        ...state,
        loading: false,
        competencias: action.payload,
        error: null,
      };
    case OBTENER_COMPETENCIA_ELIMINAR:
      return {
        ...state,
        eliminar: action.payload,
      };
    case COMPETENCIA_ELIMINADO_EXITO:
      return {
        ...state,
        competencias: state.competencias.filter(
          (competencia) => competencia.idCompetencia !== state.eliminar
        ),
        eliminar: null,
      };
    case OBTENER_COMPETENCIA_EDITAR:
      return {
        ...state,
        editar: action.payload,
      };
    case COMPETENCIA_EDITADO_EXITO:
      return {
        ...state,
        editar: null,
        competencias: state.competencias.map((competencia) =>
          competencia.idCompetencia === action.payload.idCompetencia
            ? (competencia = action.payload)
            : competencia
        ),
      };
      case COMENZAR_DESCARGA_COMPETENCIAS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
