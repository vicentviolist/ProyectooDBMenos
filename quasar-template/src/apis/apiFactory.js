import { transformToParamsString, emitOnlyValues } from '../utils/api.helpers';
import { api } from 'src/boot/axios';
import * as AmplifyModules from 'aws-amplify';
export default {
  async get(path, payload, configAux) {
    try {
      let token = '';
      if (
        process.env.USE_SAML === 'false' ||
        typeof process.env.USE_SAML === 'undefined'
      ) {
        let userAuth = await AmplifyModules.Auth.currentAuthenticatedUser();
        token = userAuth.signInUserSession.accessToken.jwtToken;
      }

      let localConfig;

      if (path === '/get/me' || process.env.DEV) {
        localConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      } else {
        localConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }

      let config = { ...localConfig, ...configAux };

      let query = '';

      if (payload) {
        query = transformToParamsString(emitOnlyValues(payload.query));
      }
      return new Promise((resolve, reject) => {
        api
          .get(path + query, config)
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
      let token = '';
      if (
        process.env.USE_SAML === 'false' ||
        typeof process.env.USE_SAML === 'undefined'
      ) {
        let userAuth = await AmplifyModules.Auth.currentAuthenticatedUser();
        token = userAuth.signInUserSession.accessToken.jwtToken;
      }
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let query = '';
      if (payload) {
        query = transformToParamsString(payload.query);
      }
      return new Promise((resolve, reject) => {
        api
          .post(path + query, payload, config)
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
        let userAuth = await AmplifyModules.Auth.currentAuthenticatedUser();
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
