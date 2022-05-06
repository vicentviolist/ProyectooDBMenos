import apiFactory from '../apiFactory';
let path = '/api/clientes';

export function getClientes(payload) {
  return apiFactory.get(path, payload);
}

export function getClientesID(payload) {
  let { id } = payload;
  return apiFactory.get(path + id, payload);
}
export function getPagos(payload) {
  return apiFactory.get('/api/pagos', payload);
}
export function postCliente(payload) {
  return apiFactory.post(path, payload);
}
export function postPago(payload) {
  return apiFactory.post('/api/pagos', payload);
}
