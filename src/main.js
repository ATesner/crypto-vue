import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
Vue.config.productionTip = false
Vue.use(VueResource);
//https://docs.coinapi.io/#list-all-assets
Vue.http.options.root = 'https://api.coinmarketcap.com/v2/';
//Vue.http.headers.common['X-CoinAPI-Key'] = '67A6161D-F28A-4CAC-944D-8D392FEEC26B';
Vue.http.headers.common['Accept'] = 'application/json';

Vue.component('app-item', {
  props: ['name', 'symbol'],
  template: '<div><strong>{{name}}</strong>  ({{symbol}})</div>'
})

var vm = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
