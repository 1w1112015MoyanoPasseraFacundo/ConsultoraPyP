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
} from "../types";

//cada reducer tiene su propio state
const initialState = {
  usuarios: [],
  error: null,
  loading: false,
  eliminar: null,
  editar: null,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_USUARIO:
    case COMENZAR_DESCARGA_USUARIOS:
    case USUARIO_ELIMINADO_ERROR:
      //   case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AGREGAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        usuarios: [...state.productos, action.payload],
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
    // case OBTENER_PRODUCTO_EDITAR:
    //   return {
    //     ...state,
    //     editar: action.payload,
    //   };
    // case PRODUCTO_EDITADO_EXITO:
    //   return {
    //     ...state,
    //     editar: null,
    //     productos: state.productos.map((producto) =>
    //       producto.id === action.payload.id
    //         ? (producto = action.payload)
    //         : producto
    //     ),
    //   };
    default:
      return state;
  }
}
