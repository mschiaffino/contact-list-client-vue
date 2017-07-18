import Vue from 'vue'
import Vuex from 'vuex'
import mockedData from './mockedData.json'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    contacts: mockedData.contacts
  },
  getters: {
    contacts(state) {
      return state.contacts
    }
  }
})

