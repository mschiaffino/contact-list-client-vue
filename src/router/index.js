import Vue from 'vue'
import Router from 'vue-router'

import NoContactSelected from '../components/NoContactSelected.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: NoContactSelected }
  ]
})
