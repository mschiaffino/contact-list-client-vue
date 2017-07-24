import Vue from 'vue'
import Vuex from 'vuex'
import * as services from '../services'
import router from '../router/index'

const alertsDuration = 1500

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    contacts: [],
    searchValue: '',
    editionEnabled: false,
    showAlertSuccessfullyDeleted: false,
    showAlertChangesSuccessfullySaved: false
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
    },

    editionEnabled(state) {
      return state.editionEnabled
    },

    searchValue(state) {
      return state.searchValue
    },

    showAlertSuccessfullyDeleted(state) {
      return state.showAlertSuccessfullyDeleted
    },

    showAlertChangesSuccessfullySaved(state) {
      return state.showAlertChangesSuccessfullySaved
    }
  },
  mutations: {
    updateSearch(state, searchValue) {
      state.searchValue = searchValue
    },

    updateContacts(state, contacts) {
      state.contacts = contacts
    },

    enableEdition(state) {
      state.editionEnabled = true
    },

    disableEdition(state) {
      state.editionEnabled = false
    },

    showAlertSuccessfullyDeleted(state) {
      state.showAlertSuccessfullyDeleted = true
    },

    hideAlertSuccessfullyDeleted(state) {
      state.showAlertSuccessfullyDeleted = false
    },

    showAlertChangesSuccessfullySaved(state) {
      state.showAlertChangesSuccessfullySaved = true
    },

    hideAlertChangesSuccessfullySaved(state) {
      state.showAlertChangesSuccessfullySaved = false
    }
  },
  actions: {
    fetchContacts({ commit, dispatch }) {
      // Call the contacts service on the server via websocket
      services.contactsService.find({
        query: {
          $sort: {
            firstName: 1,
            lastName: 1
          }
        }
      })
        .then(contacts => {
          // Warning! if pagination is used in feathers backend, commit should receive contacts.data as parameter
          commit('updateContacts', contacts)
        })
        .catch(() => {
          // If fetching contacts fails (probably saying timeout) fetch again
          dispatch('fetchContacts')
        })
    },

    deleteContact({ dispatch }) {
      const contactId = router.currentRoute.params.id
      services.contactsService.remove(contactId)
        .then((result) => {
          router.push({ name: 'home' })
          dispatch('showAlertSuccessfullyDeleted')
          dispatch('fetchContacts')
        })
        .catch((result) => {
          console.error(result)
        })
    },

    saveContactDetailsChanges({ commit, dispatch }, contact) {
      services.contactsService.update(contact._id, contact)
        .then(() => {
          commit('disableEdition')
          dispatch('showAlertChangesSuccessfullySaved')
          dispatch('fetchContacts')
        })
    },

    showAlertSuccessfullyDeleted({ commit }) {
      commit('showAlertSuccessfullyDeleted')
      setTimeout(function () {
        commit('hideAlertSuccessfullyDeleted')
      }, alertsDuration)
    },

    showAlertChangesSuccessfullySaved({ commit }) {
      commit('showAlertChangesSuccessfullySaved')
      setTimeout(function () {
        commit('hideAlertChangesSuccessfullySaved')
      }, alertsDuration)
    }
  }
})

