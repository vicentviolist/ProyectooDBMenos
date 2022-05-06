<template>
  <div class="row">
    <q-btn
      v-bind="quasarProps"
      no-caps
      class="col"
      unelevated
      color="secondary"
      :label="labelButton"
      @click="handleExport"
    />
    <div hidden>
      <q-table
        id="myTableToExport"
        :data="[]"
        :columns="columnsExportables"
        row-key="index"
        :pagination="{
          rowsPerPage: data.length,
        }"
      />
    </div>
  </div>
</template>
<script>
import * as R from 'ramda';
import TableExport from 'tableexport';
export default {
  name: 'export-file',
  props: {
    quasarProps: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    fileName: {
      type: String,
      default: 'Information',
    },
    fileSheetName: {
      type: String,
      default: 'List',
    },
    labelButton: {
      type: String,
    },
    directExport: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    columnsExportables() {
      return this.columns.filter(col => col.exportable);
    },
    dataToExport() {
      let dataAux = R.clone(this.data);
      let finalData = dataAux.map(info => {
        return this.columnsExportables.map(col => {
          return {
            v: `${col.format(R.is(String, col.field) ? info[col.field] : info)}`,
            t: 'String',
          };
        });
      });
      finalData.unshift(this.columnsHeadersToExport);
      return finalData;
    },
    columnsHeadersToExport() {
      let finalData = this.columnsExportables.map(col => {
        return {
          t: 'String',
          v: col.label,
        };
      });
      return finalData;
    },
  },
  methods: {
    handleExport() {
      if (this.columns.length < 1) {
        this.showMessage('error', this.$t('errors.exportFile.nocolums'));
        return;
      }
      if (this.directExport) {
        this.downloadFile();
        this.$emit('click');
      } else {
        this.$emit('click');
      }
    },
    downloadFile() {
      this.$nextTick(() => {
        if (this.data.length < 1) {
          this.showMsg('error', this.$t('errors.exportFile.nodata'));
          return;
        }
        let table = new TableExport(
          document.getElementById('myTableToExport').children[0].firstChild,
        );
        table.export2file(
          this.dataToExport,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          this.fileName,
          '.xlsx',
          [],
          false,
          this.fileSheetName,
        );
      });
    },
  },
};
</script>
