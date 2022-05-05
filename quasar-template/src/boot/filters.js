import Vue from 'vue';

Vue.filter('dummy', function(value) {
  if (!value) return '--';
  return value;
});
