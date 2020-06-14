import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  './components'
import store from './auth/store'
import vuetify from './plugins/vuetify';
import  './components'


Vue.config.productionTip = false
 


new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
