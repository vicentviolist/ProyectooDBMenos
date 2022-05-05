<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <transition enter-active-class="animated fadeIn">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {};
  },
};
</script>
