<template>
  <main-page-tpl>
    <template v-slot:title> {{ $t('gral.pages.newPassword') }}</template>
    <template v-slot:form />
  </main-page-tpl>
</template>
<script>
import MainPageTpl from './MainPageTpl';

export default {
  name: 'forgot-password',
  components: {
    MainPageTpl,
  },
};
</script>
