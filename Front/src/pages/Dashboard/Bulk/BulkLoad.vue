<template>
  <div class="q-pa-md">
    <div class="row justify-center items-center">
      <q-uploader url="http://localhost:4444/upload" style="max-width: 300px" />
    </div>
    <div class="row justify-center q-mt-md q-col-gutter-x-sm">
      <div class="col-2">
        <q-btn
          outline
          class="fit"
          no-caps
          :label="$t('gral.cancel')"
          @click="
            $router.push({
              name: 'dashboard',
            })
          "
        />
      </div>
      <div class="col-2">
        <q-btn class="fit" color="secondary" no-caps :label="$t('gral.accept')" />
      </div>
    </div>
  </div>
</template>
