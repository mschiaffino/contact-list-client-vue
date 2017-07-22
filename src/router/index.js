import Vue from 'vue'
import Router from 'vue-router'

import NoContactSelected from '@/components/NoContactSelected'
import ContactDetails from '@/components/ContactDetails'

Vue.use(Router)

export default new Router({
  routes: [
    { name: 'home', path: '/', component: NoContactSelected },
    { name: 'contact', path: '/contact/:id', component: ContactDetails, props: true }
  ]
})
