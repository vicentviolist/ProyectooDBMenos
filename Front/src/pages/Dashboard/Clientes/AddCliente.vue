<template>
  <q-page class="flex flex-center">
    <div class="full-width justify-center">
      <div class="flex justify-center items-center flex-center">
        <div>
          <div class="flex justify-start  absolute-top full-width">
            <q-btn
              flat
              @click="back()"
              no-caps
              label="Regresar"
              icon="arrow_back_ios"
              class="q-ml-sm text-weight-light"
            />
          </div>
          <h4>Agrega un nuevo Cliente!</h4>
          <q-form @submit="handleSearch" @reset="clear">
            <div class="row q-col-gutter-lg q-mt-lg">
              <div class="col-xl-3 col-lg-3 col-md-4 col-12">
                <q-input
                  label="Nombre"
                  v-model="filterData.nombre"
                  rounded
                  outlined
                  required
                />
              </div>
              <div class="col-xl-3 col-lg-3 col-md-4 col-12">
                <q-input
                  label="Telefono"
                  v-model="filterData.telefono"
                  numeric
                  mask="##########"
                  rounded
                  outlined
                  required
                />
              </div>
              <div class="col-xl-2 col-lg-3 col-md-4 col-12">
                <e-calendar
                  placeholder="Ultimo Pago"
                  label="Ultimo pago"
                  v-model="filterData.ultimo_pago"
                  required
                />
              </div>
              <div class="col-md-2 col-lg-2 col-12 offset-md-4  offset-lg-8">
                <q-btn
                  class="full-width"
                  label="Crear"
                  color="primary"
                  rounded
                  type="submit"
                />
              </div>
              <div class="col-md-2 col-lg-2 col-12">
                <q-btn
                  outline
                  class="full-width"
                  rounded
                  type="reset"
                  label="Borrar"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'main-board',
  data() {
    return {
      filterData: {
        nombre: null,
        telefono: null,
        ultimo_pago: null,
        fecha_creacion: null,
      },
    };
  },
  computed: {
    ...mapState('clientes', ['clientes']),
  },
  methods: {
    async handleSearch() {
      try {
        this.loading = true;
        let payload = { query: { ...this.filterData } };
        let res = await this.$store.dispatch('clientes/postClientePadre', payload);
        this.showMsg('ok', 'Cliente creado con exito');
        this.data = res.data;
        this.loading = false;
        this.clear();
      } catch (error) {
        this.showMsg('error', error);
      }
    },
    clear() {
      this.filterData.nombre = null;
      this.filterData.telefono = null;
      this.filterData.ultimo_pago = null;
      this.filterData.fecha_creacion = null;
    },
    back() {
      this.$router.push({ name: 'home' }).catch(e => console.log(e));
    },
  },
};
</script>
