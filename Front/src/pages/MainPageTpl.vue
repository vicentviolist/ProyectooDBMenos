<template>
  <q-page class="flex flex-center column bg-main">
    <q-card class="q-px-sm q-mb-md rounded-borders flex flex-center e-card-login">
      <div style="width:80%;" class="q-px-xl-lg">
        <div class="text-h6 text-grey-8 text-center q-pb-md q-pb-xl-xl">
          <slot name="title"> </slot>
        </div>
        <slot name="form"> </slot>
      </div>
    </q-card>
    <div class="text-caption text-secondary"><slot name="version"> </slot></div>
  </q-page>
</template>

<style lang="scss" scoped>
.e-card-login {
  min-width: 330px;
  width: 18%;
  min-height: 336px;
  height: 35vh;
}
</style>
