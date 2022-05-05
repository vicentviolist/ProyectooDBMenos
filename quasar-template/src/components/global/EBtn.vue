<template>
  <q-btn
    unelevated
    rounded
    color="orange-4"
    no-caps
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
  </q-btn>
</template>
<script>
export default {
  name: 'e-btn',
};
</script>
