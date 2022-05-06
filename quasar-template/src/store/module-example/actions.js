import {
  getClientes,
  getPagos,
  postCliente,
  postPago,
  getClientesID,
} from 'src/apis/modules/clientes';

export async function getClientesLista(context, payload) {
  try {
    let res = await getClientes(payload);
    context.commit('SET_CLIENTES', res.data.data);
    return res;
  } catch (error) {
    throw error;
  }
}
export async function getClientesListaID(context, payload) {
  try {
    let res = await getClientesID(payload);
    context.commit('SET_CLIENTES', res.data.data);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getPagosLista(context, payload) {
  try {
    let res = await getPagos(payload);
    context.commit('SET_PAGOS', res.data.data);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function postClientePadre(context, payload) {
  try {
    let res = await postCliente(payload);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function postPagoPadre(context, payload) {
  try {
    let res = await postPago(payload);
    return res;
  } catch (error) {
    throw error;
  }
}
