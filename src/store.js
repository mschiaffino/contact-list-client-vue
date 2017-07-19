import Vue from 'vue'
import Vuex from 'vuex'
import mockedData from './mockedData.json'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    contacts: mockedData.contacts,
    searchValue: ''
  },
  getters: {
    contacts(state) {
      return state.contacts
    },
    contactFullName(state) {
      return contact => `${contact.firstName} ${contact.lastName}`
    },
    filteredContacts(state, getters) {
      return state.contacts.filter((contact) => getters.contactFullName(contact).toLowerCase().includes(state.searchValue.toLowerCase()))
    }
  },
  mutations: {
    updateSearch(state, searchValue) {
      state.searchValue = searchValue
    }
  }
})

