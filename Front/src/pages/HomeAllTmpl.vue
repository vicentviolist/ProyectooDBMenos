<template>
  <q-page class="flex flex-center column">
    <slot name="title" class="space-pan-text">
      <div class="text-h3 m-tex-m">
        Bienvenido
      </div>
      <p class="q-mb-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. provident
        cupiditate?
      </p>
    </slot>
    <slot name="card"> </slot>
    <div class="text-caption text-secondary"><slot name="version"> </slot></div>
  </q-page>
</template>

<style lang="scss" scoped>
.m-tex-m {
  margin-top: -1vw;
}
</style>
