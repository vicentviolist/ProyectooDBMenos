<template>
  <q-page class="flex flex-center">
    <div class="full-width justify-center">
      <h4 class="text-center">Añade Un Pago!</h4>
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
              ><template v-slot:body-cell-id="props">
                <q-td :props="props">
                  <div
                    class="cursor-pointer flex flex-center"
                    @click="openModal(props.row.id)"
                  >
                    {{ props.row.id }}
                  </div>
                </q-td>
              </template></q-table
            >
          </div>
          <div style="width: 900px; margin-top:100px;">
            <q-table
              title="Pagos Clientes"
              :loading="loading"
              :columns="columnsPagos"
              :data="dataPagos"
            ></q-table>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="flex flex-center justify-between  q-mx-lg">
            <div class="text-h6">Añade un pago</div>

            <q-btn
              flat
              @click="alert = false"
              class="q-ml-xl"
              rounded
              color="primary"
              label="x"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-lg flex flex-center">
          <div class="" style="width:70%">
            <q-input
              filled
              class="q-mb-lg"
              v-model="nombre"
              disable
              label="Nombre cliente"
            >
            </q-input>
            <q-input filled class="q-mb-lg" v-model="filterData.monto" label="Monto">
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-mb-xl">
          <q-btn
            rounded
            label="Añadir Monto"
            @click="addPago()"
            class="q-mr-xl"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'main-board',
  data() {
    return {
      loading: false,
      alert: false,
      filterData: {
        monto: null,
      },
      indexToEdit: null,
      nombre: null,
      columns: [
        {
          name: 'id',
          required: true,
          align: 'center',
          headerStyle: 'color: red',
          style: 'background: #F8F8F8; cursor: pointer;',
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
      columnsPagos: [
        {
          name: 'id',
          required: true,
          align: 'center',
          style: 'background: #F8F8F8;',
          label: 'ID CLIENTE',
          field: 'id',
          format: val => val,
          sortable: true,
          exportable: true,
        },
        {
          name: 'Monto',
          required: true,
          align: 'center',
          label: 'Monto',
          field: 'Monto',
          format: val => val,
          sortable: true,
          exportable: true,
        },
        {
          name: 'Fecha_De_Pago',
          required: true,
          align: 'center',
          label: 'Fecha De Pago',
          field: 'Fecha_De_Pago',
          format: val => val,
          sortable: true,
          exportable: true,
        },
      ],
      data: [],
      dataPagos: [],
    };
  },
  created() {
    this.handleRequest();
    this.handlePagos();
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
    async addPago() {
      try {
        this.loading = true;
        let payload = { query: { ...this.filterData } };
        let res = await this.$store.dispatch('clientes/postPagoPadre', payload);
        this.showMsg('ok', 'Pago creado con exito');
        this.data = res.data;
        this.loading = false;
        this.clear();
        this.alert = false;
      } catch (error) {}
      this.loading = true;
      this.handleRequest();
      this.handlePagos();
      this.loading = false;
      this.alert = false;
    },
    async handlePagos() {
      try {
        this.loading = true;
        let res = await this.$store.dispatch('clientes/getPagosLista');
        console.log(res.data, 'res');
        this.dataPagos = res.data;
        this.loading = false;
      } catch (error) {
        this.showMsg('error', error);
      }
    },
    back() {
      this.$router.push({ name: 'home' }).catch(e => console.log(e));
    },
    openModal(id) {
      console.log(id);
      this.alert = true;
      //--> se tiene qu llamar el action que consulte por id
      this.indexToEdit = this.data.findIndex(user => user.id == id);
      //<-- aqui termina la consulta al back
      this.nombre = this.data[this.indexToEdit].nombre;
      this.filterData.monto = this.data[this.indexToEdit].monto;
      this.filterData.id = this.data[this.indexToEdit].id;
    },
  },
};
</script>
