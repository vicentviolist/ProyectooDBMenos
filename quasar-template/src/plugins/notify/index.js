import { i18n } from 'src/boot/i18n';
import * as R from 'ramda';

let catalog = {
  '403': i18n.t('errors.server.forbidden'),
  '401': i18n.t('errors.server.unauthorizedUser'),
  '404': i18n.t('errors.server.notFound'),
  default: i18n.t('errors.server.internalError'),
  system: i18n.t('errors.server.system'),
};

function getCodeResponse(error) {
  if (R.is(Object, error)) {
    error = error.response ? error.response.status : -1;
  } else {
    error = -1;
  }
  return error;
}

export function manageErrors(error) {
  console.log('El error es:', error);
  if (R.is(Object, error)) {
    if (getCodeResponse(R.clone(error)) === 400) {
      error = error.response.data.messages ? error.response.data.messages : [];
      error = error[0] ? error[0] : catalog['system'];
      error = { message: error };
    } else {
      error = error.response
        ? catalog[error.response.status]
          ? error.response.status
          : 'default'
        : 'default';
      error = { message: catalog[error] };
    }
  } else {
    error = { message: error };
  }
  return {
    group: error.message,
    message: error.message,
    color: 'negative',
    icon: 'error_outline',
    position: 'top',
  };
}

export default {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        showMsg(type, content) {
          if (content === false && type === 'error') {
            return;
          }
          let auxCode = null;
          let optionsNotify = {
            group: content,
            position: 'top',
            message: content,
          };
          switch (type) {
            case 'ok':
              optionsNotify['icon'] = 'check_circle';
              optionsNotify['color'] = 'positive';
              break;
            case 'error':
              auxCode = getCodeResponse(R.clone(content));
              optionsNotify = manageErrors(content);
              break;
            case 'info':
              optionsNotify['icon'] = 'info';
              optionsNotify['color'] = 'info';
              break;
          }
          this.$q.notify(optionsNotify);

          if (auxCode === 401) {
            let nameRoute = this.$route.name;
            nameRoute !== 'login' ? this.$router.push({ name: 'login' }) : false;
          }
        },
      },
    });
  },
};
