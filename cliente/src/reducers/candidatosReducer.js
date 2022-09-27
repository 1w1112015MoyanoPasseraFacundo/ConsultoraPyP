import {
  AGREGAR_CANDIDATO,
  AGREGAR_CANDIDATO_ERROR,
  AGREGAR_CANDIDATO_EXITO,
  CANDIDATO_ELIMINADO_ERROR,
  CANDIDATO_ELIMINADO_EXITO,
  COMENZAR_DESCARGA_CANDIDATOS,
  DESCARGA_CANDIDATOS_ERROR,
  DESCARGA_CANDIDATOS_EXITOS,
  OBTENER_CANDIDATO_ELIMINAR,
} from "../types";

//cada reducer tiene su propio state
const initialState = {
  candidatos: [],
  error: null,
  loading: false,
  eliminar: null,
  editar: null,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_CANDIDATO:
    case COMENZAR_DESCARGA_CANDIDATOS:
    case CANDIDATO_ELIMINADO_ERROR:
      //   case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AGREGAR_CANDIDATO_EXITO:
      return {
        ...state,
        loading: false,
        candidatos: [...state.productos, action.payload],
        error: null,
      };
    case AGREGAR_CANDIDATO_ERROR:
    case DESCARGA_CANDIDATOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_CANDIDATOS_EXITOS:
      return {
        ...state,
        loading: false,
        candidatos: action.payload,
        error: null,
      };
    case OBTENER_CANDIDATO_ELIMINAR:
      return {
        ...state,
        eliminar: action.payload,
      };
    case CANDIDATO_ELIMINADO_EXITO:
      return {
        ...state,
        candidatos: state.candidatos.filter(
          (candidato) => candidato.id !== state.eliminar
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
