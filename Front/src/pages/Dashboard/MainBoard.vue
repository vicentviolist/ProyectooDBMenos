<template>
  <q-page class="flex flex-center">
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="full-width">
        <router-view />
      </div>
    </transition>
  </q-page>
</template>
<script>
export default {
  name: 'main-board',
};
</script>
