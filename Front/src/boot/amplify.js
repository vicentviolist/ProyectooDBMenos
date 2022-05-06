import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue';
import AwsConfig from '../aws_config';
Amplify.configure(AwsConfig);

export default async ({ router, Vue }) => {
  Vue.use(AmplifyPlugin, AmplifyModules);
  Vue.prototype.$Amplify = Amplify;
  Vue.prototype.$AmplifyEventBus = AmplifyEventBus;
  Vue.prototype.$Auth = AmplifyModules.Auth;

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // eslint-disable-next-line no-unused-vars
      let user;
      Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
        .then(data => {
          if (data && data.signInUserSession) {
            user = data;
          }
          next();
        })
        .catch(() => {
          next({
            path: '/',
          });
        });
    }
    next();
  });
};
