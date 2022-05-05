import { getClientes } from 'src/apis/modules/clientes';

export async function getClientesLista(context, payload) {
  try {
    let res = await getClientes(payload);
    context.commit('SET_CLIENTES', res.data.data);
    return res;
  } catch (error) {
    throw error;
  }
}
