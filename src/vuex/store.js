import Vue from 'vue'
import Vuex from 'vuex'
import * as services from '../services'
import router from '../router/index'

const contactCreatedMessage = 'The contact has been created'
const contactDeletedMessage = 'The contact has been deleted'
const contactUpdatedMessage = 'The contact has been updated'
const alertsDuration = 1500

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    contacts: [],
    searchValue: '',
    editionEnabled: false,
    fetchingContacts: false,
    showSuccessAlert: false,
    alertMessage: ''
  },
  getters: {
    contacts(state) {
      return state.contacts
    },

    contactById(state) {
      return id => state.contacts.find(contact => contact._id === id)
    },

    contactFullName(state) {
      return contact => `${contact.firstName || ''} ${contact.lastName || ''}`
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

    fetchingContacts(state) {
      return state.fetchingContacts
    },

    alertMessage(state) {
      return state.alertMessage
    },

    showSuccessAlert(state) {
      return state.showSuccessAlert
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

    startedFetchingContacts(state) {
      state.fetchingContacts = true
    },

    finishedFetchingContacts(state) {
      state.fetchingContacts = false
    },

    setAlertMessage(state, message) {
      state.alertMessage = message
    },

    showSuccessAlert(state) {
      state.showSuccessAlert = true
    },

    hideSuccessAlert(state) {
      state.showSuccessAlert = false
    }
  },
  actions: {
    fetchContacts({ commit, dispatch }) {
      commit('startedFetchingContacts')
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
          commit('finishedFetchingContacts')
        })
        .catch(() => {
          // If fetching contacts fails (probably saying timeout) fetch again after a second
          setTimeout(() => {
            dispatch('fetchContacts')
          }, 1000)
        })
    },
    createContact({ commit, dispatch }, contact) {
      services.contactsService.create(contact).then((createdContact) => {
        commit('disableEdition')
        dispatch('showSuccessAlert', contactCreatedMessage)
        router.push({ name: 'contact', params: { id: createdContact._id } })
        dispatch('fetchContacts')
      })
    },

    deleteContact({ dispatch }) {
      const contactId = router.currentRoute.params.id
      services.contactsService.remove(contactId)
        .then((result) => {
          router.push({ name: 'home' })
          dispatch('showSuccessAlert', contactDeletedMessage)
          dispatch('fetchContacts')
        })
    },

    saveContactDetailsChanges({ commit, dispatch }, contact) {
      services.contactsService.update(contact._id, contact).then(() => {
        commit('disableEdition')
        dispatch('showSuccessAlert', contactUpdatedMessage)
        dispatch('fetchContacts')
      })
    },

    showSuccessAlert({ commit, dispatch }, alertMessage) {
      commit('setAlertMessage', alertMessage)
      commit('showSuccessAlert')
      setTimeout(function () {
        commit('hideSuccessAlert')
      }, alertsDuration)
    }
  }
})

