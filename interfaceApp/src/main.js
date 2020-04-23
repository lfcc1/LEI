import Vue from 'vue'
import  './components'
import App from './App.vue'
import router from './router'
import Chat from 'vue-beautiful-chat'

import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
Vue.use(Chat)
