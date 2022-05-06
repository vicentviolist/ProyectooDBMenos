<template>
  <q-table
    ref="etable"
    v-bind="$attrs"
    v-on="$listeners"
    :pagination.sync="paginationLocal"
    @request="onRequest"
  >
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props.row" />
    </template>
    <template v-slot:loading>
      <q-inner-loading showing>
        <q-spinner-tail size="50px" color="orange-4" />
      </q-inner-loading>
    </template>
    <template v-slot:bottom="scope">
      <div class="row items-center full-width justify-start">
        <q-btn
          icon="skip_previous"
          color="dark"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="mdi-menu-left"
          color="dark"
          size="lg"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />
        <div class="text-body2 q-mr-sm">{{ $t('eTable.pagination.page') }}</div>
        <q-select
          dense
          hide-dropdown-icon
          class="q-pr-sm"
          popup-content-class="e-hover-options"
          outlined
          v-model="paginationLocal.page"
          :options="pagesSelect"
          @input="triggerOnRequest"
          borderless
          color="dark"
        />
        <div class="text-body2 q-mr-sm">
          {{ $t('eTable.pagination.of', { pagesNumber: pagesNumber }) }}
        </div>
        <q-btn
          icon="mdi-menu-right"
          color="dark"
          size="lg"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          icon="skip_next"
          color="dark"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
        <div>
          {{
            $t('eTable.pagination.displaying', {
              firstRowNumber: firstRowNumber,
              endRowNumber: endRowNumber,
              totalRowNumber: totalRowNumber,
            })
          }}
        </div>
      </div>
    </template>
    <template v-slot:no-data>
      <div class="row justify-center fit">
        <div class="col text-center">
          {{ $t('gral.noData') }}
        </div>
      </div>
    </template>
  </q-table>
</template>
<script>
export default {
  name: 'e-table-2',
  props: {
    serverSide: {
      type: Boolean,
      description:
        'NECESARIO EN MODO SERVER-SIDE. Indicador de que la carga de tipo server side',
      default: false,
      required: false,
    },
    totalRowNumber: {
      type: Number,
      description: 'Total de registros obtenidos de la consulta al servidor.',
      default: () => 0,
    },
  },
  data() {
    return {
      paginationLocal: {},
    };
  },
  beforeMount() {
    if (this.serverSide) {
      this.paginationLocal = {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: this.rowsPerPageOptions[0],
        rowsNumber: this.totalRowNumber,
      };
    } else {
      this.paginationLocal = {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: this.rowsPerPageOptions[0],
      };
    }
  },
  computed: {
    // indica las páginas totales de la tabla
    pagesNumber() {
      let pagsNumber = 0;
      if (this.serverSide) {
        pagsNumber =
          this.paginationLocal.rowsNumber / this.paginationLocal.rowsPerPage;
      } else {
        pagsNumber = this.$attrs.data.length / this.paginationLocal.rowsPerPage;
      }
      return Math.ceil(pagsNumber);
    },
    // listado de opciones que indican cuantos registros se mostrarán por página
    rowsPerPageOptions() {
      return [10];
    },
    // Utiliza el q-select para elegir la pagina
    pagesSelect() {
      let arrayPages = [];
      for (let i = 0; i < this.pagesNumber; i++) {
        arrayPages.push(i + 1);
      }
      return arrayPages;
    },
    firstRowNumber() {
      let firstRowNumber =
        (this.paginationLocal.page - 1) * this.paginationLocal.rowsPerPage + 1;
      return firstRowNumber;
    },
    endRowNumber() {
      let endRowNumber =
        this.paginationLocal.page * this.paginationLocal.rowsPerPage;
      if (endRowNumber > this.totalRowNumber) {
        endRowNumber = this.totalRowNumber;
      }
      return endRowNumber;
    },
  },
  methods: {
    triggerOnRequest() {
      this.$refs.etable.requestServerInteraction();
    },
    resetPage() {
      this.$refs.etable.firstPage();
    },
    onRequest(props) {
      // actualizar los props de pagination
      this.paginationLocal = { ...props.pagination };
    },
  },
  watch: {
    totalRowNumber(newValue) {
      this.paginationLocal['rowsNumber'] = newValue;
    },
    /*   pagination: {
      handler(newValue) {
        this.paginationLocal = { ...newValue };
      },
      deep: true,
    }, */
  },
};
</script>
