import Rcabinettree from './src/rcabinettree.vue';

/* istanbul ignore next */
Rcabinettree.install = function(Vue) {
  Vue.component('rcabinettree', Rcabinettree);
};

export default Rcabinettree;
