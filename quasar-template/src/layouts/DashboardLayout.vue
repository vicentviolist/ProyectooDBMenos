<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class=" bg-main text-white q-px-lg q-py-sm">
      <div class="row items-center">
        <div>
          <q-img contain :src="'/logo.png'" style="height: 60px; width:60px;" />
        </div>
        <q-space />
        <div class="text-body2 text-primary q-mr-sm">Usuario Test</div>
        <e-avatar size="60px" />
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EAvatar from 'src/components/local/EAvatar';
export default {
  components: {
    EAvatar,
  },
  data() {
    return {};
  },
};
</script>
