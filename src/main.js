import Vue from 'vue';
import App from './App';
import VuePaginate from 'vue-paginate';
import BootstrapVue from 'bootstrap-vue'

Vue.use(VuePaginate);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});

