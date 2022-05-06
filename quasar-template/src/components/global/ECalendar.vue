<template>
  <q-input
    class="e-input"
    :class="required ? null : 'q-pb-md'"
    ref="einput"
    color="orange-4"
    v-bind="$attrs"
    readonly
    v-on="$listeners"
    dense
    outlined
    stack-label
    :value="value"
    @input="value => $emit('input', value)"
    :rules="validationRules"
    reactive-rules
    lazy-rules
  >
    <template v-slot:append>
      <q-icon name="today" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxi"
          transition-show="scale"
          transition-hide="scale"
          @show="setViewCalendar()"
        >
          <q-date
            ref="calendar"
            :value="value"
            @input="emitValue"
            @event="emitValue"
            :todaySelect="todaySelect"
            color="orange-4"
            minimal
            mask="MM-DD-YYYY"
            :options="options"
            :navigation-min-year-month="minDateAllow"
            :navigation-max-year-month="maxDateAllow"
          >
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
  </q-input>
</template>
<script>
import * as R from 'ramda';
import { date } from 'quasar';
export default {
  name: 'e-calendar',
  props: {
    value: {
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    dateRange: {
      type: Number,
      default: 30,
    },
    errorMsg: {
      type: String,
      default: 'Please select a date',
    },
    dateOptions: {
      type: String,
      default: null,
    },
    showClear: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      minDateAllow: undefined,
      maxDateAllow: undefined,
      maxGlobalAllow: undefined,
    };
  },
  computed: {
    validationRules() {
      const rules = [];

      if (this.required) {
        rules.push(val => (val && val.length > 0) || this.errorMsg);
      }
      return rules;
    },
    dataOptionsUnMask() {
      let auxDate = this.$options.filters.formatDate(
        this.dateOptions,
        'm/d/a',
        'a/m/d',
      );
      return auxDate;
    },
    isTodayAllow() {
      if (!this.maxGlobalAllow) {
        return false;
      }
      let today = Date.now();
      today = date.formatDate(today, 'YYYY/MM/DD');
      return today <= this.maxGlobalAllow;
    },
  },
  methods: {
    emitValue(value) {
      this.$emit('input', value);
      this.$refs.qDateProxi.hide();
    },
    setViewCalendar() {
      if (!!this.dateOptions) {
        let auxDateInfo = this.dateOptions.split('/');
        this.$refs.calendar.setCalendarTo(auxDateInfo[2], auxDateInfo[0]);
      }
    },
    todaySelect() {
      let today = Date.now();
      today = date.formatDate(today, 'MM/DD/YYYY');
      this.$emit('input', today);
      this.$refs.qDateProxi.hide();
    },
    options(date) {
      let today = this.formatDate(new Date());
      let year = this.year(new Date()); //Year ago
      if (this.dateOptions === null) {
        this.minDateAllow = year.substring(0, 7);
        this.maxDateAllow = today.substring(0, 7);
        this.maxGlobalAllow = today;
        return date <= today && date >= year;
      } else {
        let days = this.days(this.dateOptions);
        this.minDateAllow = this.dataOptionsUnMask.substring(0, 7);
        this.maxDateAllow = today.substring(0, 7);
        if (today < days) {
          this.maxGlobalAllow = today;
          this.maxDateAllow = today.substring(0, 7);
        } else {
          this.maxGlobalAllow = days;
          this.maxDateAllow = days.substring(0, 7);
        }
        return (
          date <= today &&
          date >= year &&
          date >= this.dataOptionsUnMask &&
          date <= days
        );
      }
    },
    formatDate(date1) {
      return date.formatDate(date1, 'YYYY/MM/DD');
    },
    year(date1) {
      return date.formatDate(
        date.subtractFromDate(date1, { year: 1 }),
        'YYYY/MM/DD',
      );
    },
    days(date1) {
      return date.formatDate(
        date.addToDate(date1, { days: this.dateRange }),
        'YYYY/MM/DD',
      );
    },
  },
};
</script>

<style lang="scss">
.material-icons .q-icon .notranslate {
  display: none;
}
.q-date__navigation {
  .col:nth-child(1n) {
    span {
      .q-anchor--skip::after {
        content: '\25BE';
        font-size: 1.25rem;
        padding-left: 4px;
      }
    }
  }
}
.q-date__navigation {
  .flex-center:nth-child(5n) {
    span {
      .q-anchor--skip::after {
        content: '\25BE';
        margin-right: 50px;
        font-size: 1.25rem;
      }
    }
  }
}
//Esta clase le quita el cabio de borde al utlizar  readonly
.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: solid;
}
.q-date__navigation div:nth-child(3n) {
  position: absolute;
  margin-left: 220px;
  z-index: 2;
}
.q-date__navigation div:nth-child(4n) {
  display: none;
}
.q-date__navigation div:nth-child(6n) {
  display: none;
}
</style>
