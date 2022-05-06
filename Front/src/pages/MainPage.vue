<template>
  <main-page-tpl>
    <template v-slot:title> {{ $t('gral.pages.logIn') }}</template>
    <template v-slot:form>
      <q-form @submit="handleAuth">
        <e-input v-model="form.username" :label="$tc('user.label', 1)" alphaChar />
        <e-input v-model="form.password" :label="$t('user.password')" alphaChar />
        <e-btn :loading="loading" :label="$t('gral.pages.logIn')">
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </e-btn>
      </q-form>
    </template>
    <template v-slot:version>
      {{ version }}
    </template>
  </main-page-tpl>
</template>

<script>
import MainPageTpl from './MainPageTpl';

export default {
  name: 'main-page',
  components: {
    MainPageTpl,
  },
  data() {
    return {
      loading: false,
      form: {
        username: null,
        password: null,
      },
      version: process.env.VERSION,
    };
  },
  created() {
    console.log(process.env.VERSION);
  },
  methods: {
    async handleAuth() {
      const { username, password } = this.form;
      this.loading = true;
      try {
        this.user = await this.$Auth.signIn(username, password);
        if (this.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          //this.$router.push({ name: 'newPassword' });
        } else {
          this.$router.push({ name: 'dashboard' });
        }
      } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
          this.showMsg('error', this.$t('errors.amplify.registerIncomplete'));
        } else if (err.code === 'PasswordResetRequiredException') {
          this.showMsg('error', this.$t('errors.amplify.passNotLongerValid'));
        } else if (
          err.code === 'NotAuthorizedException' ||
          err.code === 'UserNotFoundException'
        ) {
          if (err.message == 'Incorrect username or password.') {
            this.showMsg('error', this.$t('errors.amplify.invalidCredentials'));
          } else {
            this.showMsg('error', this.$t('errors.amplify.disableUser'));
          }
        } else {
          this.showMsg('error', err);
          // eslint-disable-next-line no-console
          console.log(err);
        }
      } finally {
        this.loading = false;
      }
    },
    goToRestorePass() {
      this.$router.push({ name: 'forgotPassword' });
    },
  },
};
</script>
