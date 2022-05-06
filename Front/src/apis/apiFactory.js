import { transformToParamsString, emitOnlyValues } from '../utils/api.helpers';
import { api } from 'src/boot/axios';
export default {
  async get(path, payload) {
    try {
      let query = '';

      if (payload) {
        query = transformToParamsString(emitOnlyValues(payload.query));
      }
      return new Promise((resolve, reject) => {
        api
          .get(path + query)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    } catch (error) {
      throw error;
    }
  },

  async post(path, payload) {
    try {
      let query = '';
      if (payload) {
        query = transformToParamsString(payload.query);
      }
      return new Promise((resolve, reject) => {
        api
          .post(path + query, payload)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    } catch (error) {
      throw error;
    }
  },
  async postFile(path, payload, configAux) {
    try {
      let token = '';
      if (
        process.env.USE_SAML === 'false' ||
        typeof process.env.USE_SAML === 'undefined'
      ) {
        token = userAuth.signInUserSession.accessToken.jwtToken;
      }
      let localConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      let config = { ...localConfig, ...configAux };

      let { file, query } = payload;

      let formData = new FormData();
      if (Array.isArray(file)) {
        file.forEach((value, index) => {
          formData.append(`file${index + 1}`, value);
        });
      } else {
        formData.append('document', file);
        if (payload) {
          query = transformToParamsString(emitOnlyValues(query));
        }
      }

      if (typeof query === 'undefined') {
        query = '';
      }

      return new Promise((resolve, reject) => {
        api
          .post(path + query, formData, config)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    } catch (error) {
      throw error;
    }
  },
};
