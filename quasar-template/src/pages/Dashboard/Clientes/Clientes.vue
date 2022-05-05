<template>
  <q-page class="flex flex-center">
    <div class="full-width justify-center">
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
      <div class="flex justify-center items-center flex-center">
        <div>
          <div style="width: 900px">
            <q-table
              title="Clientes"
              :loading="loading"
              :columns="columns"
              :data="data"
            ></q-table>
          </div>
          <div class="flex q-mt-xl">
            <div class="q-mr-xl q-ml-xl">
              <q-btn
                label="Llenar tabla"
                color="primary"
                @click="handleRequest()"
              ></q-btn>
            </div>
            <div class="q-ml-xl">
              <q-btn label="Borrar tabla" color="secondary" @click="clear()"></q-btn>
            </div>
          </div>
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
      loading: false,
      columns: [
        {
          name: 'id',
          required: true,
          align: 'center',
          label: 'ID',
          field: 'id',
          format: val => val,
          sortable: true,
          exportable: true,
        },
        {
          name: 'nombre',
          required: true,
          align: 'center',
          label: 'Nombre',
          field: 'nombre',
          format: val => val,
          sortable: true,
          exportable: true,
        },
        {
          name: 'telefono',
          required: true,
          align: 'center',
          label: 'Telefono',
          field: 'telefono',
          format: val => val,
          sortable: true,
          exportable: true,
        },
        {
          name: 'ultimo_pago',
          required: true,
          align: 'center',
          label: 'Ultimo Pago',
          field: 'ultimo_pago',
          format: val => val,
          sortable: true,
          exportable: true,
        },
        {
          name: 'fecha_creacion',
          required: true,
          align: 'center',
          label: 'Fecha Creacion',
          field: 'fecha_creacion',
          format: val => val,
          sortable: true,
          exportable: true,
        },
      ],
      data: [],
    };
  },
  created() {
    this.handleRequest();
  },
  computed: {
    ...mapState('clientes', ['clientes']),
  },
  methods: {
    async handleRequest() {
      try {
        this.loading = true;
        let res = await this.$store.dispatch('clientes/getClientesLista');
        console.log(res.data, 'res');
        this.data = res.data;
        this.loading = false;
      } catch (error) {
        this.showMsg('error', error);
      }
    },
    clear() {
      this.data = [];
    },
    back() {
      this.$router.push({ name: 'home' }).catch(e => console.log(e));
    },
  },
};
</script>
