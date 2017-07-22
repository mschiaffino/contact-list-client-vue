import Vue from 'vue'
import Vuex from 'vuex'
import * as services from '../services'
import router from '../router/index'

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

    contactById(state) {
      return id => state.contacts.find(contact => contact._id === id)
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
        // Warning! if pagination is used commit should receive contacts.data as parameter
        commit('updateContacts', contacts)
        // commit('updateContacts', contacts.data)
      })
    },
    deleteContact({ dispatch }) {
      const contactId = router.currentRoute.params.id
      services.contactsService.remove(contactId)
        .then((result) => {
          router.push({ name: 'home' })
          dispatch('fetchContacts')
        })
        .catch((result) => {
          console.error(result)
        })
    }
  }
})

