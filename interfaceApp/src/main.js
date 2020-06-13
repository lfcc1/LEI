import Vue from 'vue'
import  './components'
import App from './App.vue'
import router from './router'
import store from './auth/store'
import vuetify from './plugins/vuetify';
import Simplert from 'vue2-simplert-plugin'
require('vue2-simplert-plugin/dist/vue2-simplert-plugin.css')



Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
Vue.use(Chat)
Vue.use(Simplert)
