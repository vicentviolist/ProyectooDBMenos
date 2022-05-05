import apiFactory from '../apiFactory';
let path = '/api/clientes';

export function getClientes(payload) {
  return apiFactory.get(path, payload);
}
