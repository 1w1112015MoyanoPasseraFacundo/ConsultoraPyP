import {
  AGREGAR_PAGO,
  AGREGAR_PAGO_ERROR,
  AGREGAR_PAGO_EXITO,
  COMENZAR_DESCARGA_PAGOS,
  DESCARGA_PAGOS_ERROR,
  DESCARGA_PAGOS_EXITOS,
  PAGO_EDITADO_ERROR,
  PAGO_EDITADO_EXITO,
  PAGO_ELIMINADO_ERROR,
  PAGO_ELIMINADO_EXITO,
  OBTENER_PAGO_EDITAR,
  OBTENER_PAGO_ELIMINAR,
} from "../types";

const initialState = {
  pagos: [],
  error: null,
  loading: false,
  eliminar: null,
  editar: null,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PAGO:
    case PAGO_ELIMINADO_ERROR:
    case PAGO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COMENZAR_DESCARGA_PAGOS:
      return {
        ...state,
        loading: action.payload,
      };
    case DESCARGA_PAGOS_EXITOS:
      return {
        ...state,
        loading: false,
        pagos: action.payload,
        error: null,
      };
    case AGREGAR_PAGO_ERROR:
    case DESCARGA_PAGOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AGREGAR_PAGO_EXITO:
      return {
        ...state,
        loading: false,
        pagos: [...state.pagos, action.payload],
        error: false,
      };
    case OBTENER_PAGO_EDITAR:
      return {
        ...state,
        editar: action.payload,
      };
    case PAGO_EDITADO_EXITO:
      return {
        ...state,
        editar: null,
        error: false,
        pagos: state.pagos.map((pago) =>
          pago.idPago === action.payload.idPago ? (pago = action.payload) : pago
        ),
      };
    case OBTENER_PAGO_ELIMINAR:
      return {
        ...state,
        eliminar: action.payload,
      };
    case PAGO_ELIMINADO_EXITO:
      return {
        ...state,
        pagos: state.pagos.filter((pago) => pago.id !== state.eliminar),
        eliminar: null,
      };
    default:
      return state;
  }
}
