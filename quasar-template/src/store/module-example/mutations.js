export function someMutation(/* state */) {}
import stateDefault from './state';
let states = {
  clientes: [],
};

export function SET_CLIENTES(state, payload) {
  state.clientes = payload;
}
