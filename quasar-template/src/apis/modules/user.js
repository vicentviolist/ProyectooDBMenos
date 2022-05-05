import apiFactory from '../apiFactory';
let path = '/get/';

export function getMyUserInfo(payload) {
  return apiFactory.get(path + 'me', payload);
}
