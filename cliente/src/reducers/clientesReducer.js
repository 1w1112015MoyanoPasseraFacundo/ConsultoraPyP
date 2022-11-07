import {
  AGREGAR_CLIENTE,
  AGREGAR_CLIENTE_ERROR,
  AGREGAR_CLIENTE_EXITO,
  CLIENTE_EDITADO_ERROR,
  CLIENTE_EDITADO_EXITO,
  CLIENTE_ELIMINADO_ERROR,
  CLIENTE_ELIMINADO_EXITO,
  COMENZAR_DESCARGA_CLIENTES,
  DESCARGA_CLIENTES_ERROR,
  DESCARGA_CLIENTES_EXITOS,
  OBTENER_CLIENTE_EDITAR,
  OBTENER_CLIENTE_ELIMINAR,
} from "../types";

const initialState = {
  clientes: [],
  error: null,
  loading: false,
  eliminar: null,
  editar: null,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_CLIENTE:
    case CLIENTE_ELIMINADO_ERROR:
    case CLIENTE_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AGREGAR_CLIENTE_EXITO:
      return {
        ...state,
        loading: false,
        clientes: [...state.clientes, action.payload],
        error: null,
      };
    case DESCARGA_CLIENTES_EXITOS:
      return {
        ...state,
        loading: false,
        clientes: action.payload,
        error: null,
      };
    case DESCARGA_CLIENTES_ERROR:
    case AGREGAR_CLIENTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OBTENER_CLIENTE_EDITAR:
      return {
        ...state,
        editar: action.payload,
      };
    case CLIENTE_EDITADO_EXITO:
      return {
        ...state,
        editar: null,
        clientes: state.clientes.map((cliente) =>
          cliente.idCliente === action.payload.idCliente
            ? (cliente = action.payload)
            : cliente
        ),
      };
    case OBTENER_CLIENTE_ELIMINAR:
      return {
        ...state,
        eliminar: action.payload,
      };
    case CLIENTE_ELIMINADO_EXITO:
      return {
        ...state,
        clientes: state.clientes.filter(
          (cliente) => cliente.id !== state.eliminar
        ),
        eliminar: null,
      };
      case COMENZAR_DESCARGA_CLIENTES:
        return {
          ...state,
          loading: action.payload,
        };
    default:
      return state;
  }
}
