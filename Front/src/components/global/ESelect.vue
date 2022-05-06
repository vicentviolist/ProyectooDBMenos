<template>
  <q-select
    class="e-input "
    :class="required ? null : 'q-pb-md'"
    ref="eselect"
    dense
    outlined
    stack-label
    color="orange-4"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    @input="value => $emit('input', value)"
    :rules="validationRules"
    reactive-rules
    :lazy-rules="'ondemand'"
  >
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    <template v-slot:selected>
      <template v-if="value">
        {{ value.label }}
      </template>
      <template v-else>
        <span style="color: inherit; opacity: .7;">
          {{ placeholder }}
        </span>
      </template>
    </template>
    <template v-if="value && !required" v-slot:append>
      <q-icon
        name="clear"
        size="xs"
        @click.stop="$emit('input', null)"
        class="cursor-pointer"
      />
    </template>
  </q-select>
</template>
<script>
export default {
  name: 'e-select',
  props: {
    value: {
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
      default: 'Please choose an option',
    },
    placeholder: {
      type: String,
      default: 'Choose an option',
    },
  },
  computed: {
    validationRules() {
      const rules = [];
      if (this.required) {
        rules.push(val => val || this.errorMsg);
      }
      return rules;
    },
  },
  methods: {
    validate(...args) {
      return this.$refs.eselect.validate(...args);
    },
  },
};
</script>
