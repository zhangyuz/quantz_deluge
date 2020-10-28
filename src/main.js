import Vue from 'vue';

import Highcharts from 'highcharts';
import Stock from 'highcharts/modules/stock';
import DarkUnica from 'highcharts/themes/dark-unica';
import IndicatorsAll from 'highcharts/indicators/indicators-all';
import DragPanes from 'highcharts/modules/drag-panes';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced';
import PriceIndicators from 'highcharts/modules/price-indicator';
import FullScreen from 'highcharts/modules/full-screen';
import StockTools from 'highcharts/modules/stock-tools';

import HighchartsVue from 'highcharts-vue';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

Stock(Highcharts);
DarkUnica(Highcharts);
IndicatorsAll(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicators(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
