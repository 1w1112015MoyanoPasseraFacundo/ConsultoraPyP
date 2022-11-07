import {
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_ERROR,
  AGREGAR_USUARIO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  USUARIO_ELIMINADO_EXITO,
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITOS,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_EDITADO_ERROR,
  USUARIO_EDITADO_EXITO,
  OBTENER_USUARIO_EDITAR,
} from "../types";

//cada reducer tiene su propio state
const initialState = {
  usuarios: [],
  error: null,
  loading: false,
  eliminar: null,
  editar: null,
  tiposDocumentos: [],
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_USUARIO:
    case USUARIO_ELIMINADO_ERROR:
    case USUARIO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case COMENZAR_DESCARGA_USUARIOS:
        return {
          ...state,
          loading: action.payload,
        };
    case AGREGAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        usuarios: [...state.usuarios, action.payload],
        error: null,
      };
    case AGREGAR_USUARIO_ERROR:
    case DESCARGA_USUARIOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_USUARIOS_EXITOS:
      return {
        ...state,
        loading: false,
        usuarios: action.payload,
        error: null,
      };
    case OBTENER_USUARIO_ELIMINAR:
      return {
        ...state,
        eliminar: action.payload,
      };
    case USUARIO_ELIMINADO_EXITO:
      return {
        ...state,
        usuarios: state.usuarios.filter(
          (USUARIO) => USUARIO.id !== state.eliminar
        ),
        eliminar: null,
      };
    case OBTENER_USUARIO_EDITAR:
      return {
        ...state,
        editar: action.payload,
      };
    case USUARIO_EDITADO_EXITO:
      return {
        ...state,
        editar: null,
        usuarios: state.usuarios.map((usuario) =>
          usuario.idUsuario === action.payload.idUsuario
            ? (usuario = action.payload)
            : usuario
        ),
      };
    default:
      return state;
  }
}
