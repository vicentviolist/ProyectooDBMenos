<template>
  <q-input
    class="e-input"
    :class="required ? null : 'q-pb-md'"
    ref="einput"
    color="orange-4"
    v-bind="$attrs"
    v-on="$listeners"
    dense
    outlined
    stack-label
    :value="valaux ? finalValue : finalValue"
    @input="replaceChars"
    @focus="isFocused = true"
    @blur="isFocused = false"
    :maxlength="card ? 16 : maxlength"
    :rules="validationRules"
    reactive-rules
    :prefix="amount ? '$' : ''"
    lazy-rules
  >
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
  </q-input>
</template>
<script>
export default {
  name: 'e-input',
  model: {
    prop: 'value',
    event: 'onInputText',
  },
  data() {
    return {
      regex: {
        alphanumeric: '[^A-Za-z\u00f1\u00d1áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ0-9]',
        alphabetic: '[^A-Za-z\u00f1\u00d1áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ]',
        numeric: '[^0-9]',
        card: '[^0-9*]',
        alphanumericEn: '[^A-Za-z0-9]',
        alphaChar:
          '[^A-Za-z\u00f1\u00d1áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ0-9\´\'\¨\*\(\)\\-\_\#\.\,\@"\ ]',
        amount: '[^0-9,.]',
      },
      valaux: null,
      cardMaskValue: null,
      cardValue: null,
      isFocused: false,
    };
  },
  props: {
    value: {
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    /*   globalMasks: {
      type: Array,
      default: () => [],
    }, */
    errorMsg: {
      type: String,
      default: 'Please type something',
    },
    amount: {
      type: Boolean,
      default: false,
    },
    alphanumeric: {
      type: Boolean,
      default: false,
    },
    alphabetic: {
      type: Boolean,
      default: false,
    },
    alphanumericEn: {
      type: Boolean,
      default: false,
    },
    alphaChar: {
      type: Boolean,
      default: false,
    },
    numeric: {
      type: Boolean,
      default: false,
    },
    card: {
      type: Boolean,
      default: false,
    },
    regexSpec: {
      type: String,
      default: null,
    },
    specialCharRegex: {
      type: String,
      default: null,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    ownRules: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    validationRules() {
      let rules = [];

      if (this.required) {
        rules.push(val => (val && val.length > 0) || this.errorMsg);
      }
      rules = rules.concat(this.ownRules);
      return rules;
    },
    finalValue() {
      return !this.isFocused && this.card
        ? this.cardMaskValue
        : this.card && this.isFocused
        ? this.cardValue
        : this.value;
    },
  },
  created() {
    if (!!this.value) {
      this.replaceChars(this.value);
    }
  },
  methods: {
    validate(...args) {
      return this.$refs.einput.validate(...args);
    },
    replaceChars(val) {
      let regex = this.getRegex();
      if (!!regex) {
        regex = regex.toString();
        regex = regex.replace(
          '[^',
          `[^${!!this.specialCharRegex ? this.specialCharRegex : ''}`,
        );
        // regex = `${regex}|${this.specialCharRegex}`;
        regex = new RegExp(regex, 'g');
      }
      val = !!regex ? val.replace(regex, '') : val;

      //mask card number
      if (this.card) {
        this.cardValue = val;
        this.cardMaskValue = val
          .split('')
          .map((letter, ind) => (ind > 5 && ind < 12 ? '*' : letter))
          .join('');
      }

      //mask amount
      if (this.amount) {
        //limpiando comas
        let w = val
          .split('')
          .reverse()
          .join('');
        w = w
          .split('')
          .map((letter, index) => (index === 1 ? letter + '.' : letter))
          .join('');
        w = w
          .split('')
          .reverse()
          .join('');
        let decimal = w
          .split('')
          .slice(w.length - 3, w.length)
          .join('');
        let integ = w
          .split('')
          .slice(0, w.length - 3)
          .join('');
        integ = integ
          .split('')
          .reverse()
          .join('');
        integ = integ
          .split('')
          .map((letter, index) => (index % 3 === 0 ? ',' + letter : letter))
          .join('');
        integ = integ
          .split('')
          .reverse()
          .join('');
        integ = integ.slice(0, integ.length - 1);
        val = integ + decimal;
      }

      this.$emit('onInputText', val);
      this.valaux = null;
      this.valaux = val;
    },
    getRegex() {
      if (this.regexSpec !== null) {
        return this.regexSpec;
      }
      if (this.alphanumeric) {
        return this.regex.alphanumeric;
      }
      if (this.alphabetic) {
        return this.regex.alphabetic;
      }
      if (this.numeric) {
        return this.regex.numeric;
      }
      if (this.card) {
        return this.regex.card;
      }
      if (this.amount) {
        return this.regex.amount;
      }
      if (this.alphanumericEn) {
        return this.regex.alphanumericEn;
      }
      if (this.alphaChar) {
        return this.regex.alphaChar;
      }
      return null;
    },
  },
  watch: {
    value(val) {
      if (this.card && !val) {
        this.cardMaskValue = null;
        this.cardValue = null;
      }
    },
  },
};
</script>
