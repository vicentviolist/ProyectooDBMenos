<template>
  <HomeAllTmpl>
    <template v-slot:title
      ><div class="text-h3 m-tex-m">
        Bienvenido
      </div>
    </template>
    <template v-slot:card>
      <div class="flex flex-center row">
        <div @click="userC">
          <m-card size="30px" description="Clientes" />
        </div>

        <div @click="userJ">
          <m-card color="bg-secondary" description="Añade un cliente" />
        </div>
        <div @click="repP">
          <m-card
            color="bg-accent"
            iconFondo="img/003-seo-report.svg"
            description="Añade un pago"
          />
        </div>
      </div>
    </template>
  </HomeAllTmpl>
</template>

<script>
import HomeAllTmpl from 'src/pages/HomeAllTmpl.vue';

export default {
  name: 'main-page',
  components: {
    HomeAllTmpl,
  },
  data() {
    return {};
  },
  methods: {
    userC() {
      this.$router.push({ name: 'clientes' }).catch(e => console.log(e));
    },
    userJ() {
      this.$router.push({ name: 'AddCliente' }).catch(e => console.log(e));
    },
    repP() {
      this.$router.push({ name: 'AddPago' }).catch(e => console.log(e));
    },
  },
};
</script>
