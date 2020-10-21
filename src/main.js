import Vue from 'vue';

import Highcharts from 'highcharts';
import Stock from 'highcharts/modules/stock';
import HighchartsVue from 'highcharts-vue';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

Stock(Highcharts);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
