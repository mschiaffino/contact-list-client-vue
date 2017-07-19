// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

import { store } from './store'

// Custom components
import ContactList from './components/ContactList'
import ContactSearch from './components/ContactSearch'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('contact-list', ContactList)
Vue.component('contact-search', ContactSearch)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
