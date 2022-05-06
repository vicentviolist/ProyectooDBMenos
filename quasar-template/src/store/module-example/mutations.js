export function someMutation(/* state */) {}
import stateDefault from './state';
let states = {
  clientes: [],
  pagos: [],
};

export function SET_CLIENTES(state, payload) {
  state.clientes = payload;
}
export function SET_PAGOS(state, payload) {
  state.pagos = payload;
}
