import Vue from 'vue'
import Vuex from 'vuex'
import * as services from '../services'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    contacts: [],
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
    },
    updateContacts(state, contacts) {
      state.contacts = contacts
    }
  },
  actions: {
    fetchContacts({ commit }) {
      // Call the contacts service on the server via websocket
      services.contactsService.find({
        query: {
          $sort: {
            firstName: 1,
            lastName: 1
          }
        }
      }).then(contacts => {
        // Be careful, if pagination is used commit should receive contacts.data as parameter
        commit('updateContacts', contacts)
      })
    }
  }
})

