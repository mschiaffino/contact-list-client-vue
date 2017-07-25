<template>
  <v-card class="mx-3 mb-3 contact-list-card full-height">
  
    <v-list dense class="py-0">
      <v-list-tile v-if="fetchingContacts">
        <v-progress-circular indeterminate v-bind:size="40" class="primary--text loading-contacts-spinner"></v-progress-circular>
        <v-list-tile-content>
          <v-list-tile-title class="text-xs-center">Loading contacts</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
  
      <v-list-tile v-show="noMatchingContact">
        <v-list-tile-content>
          <v-list-tile-title class="text-xs-center">No matching contacts found</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
  
      <v-list-tile v-show="emptyContactList">
        <v-list-tile-content>
          <v-list-tile-title class="text-xs-center">There are no contacts</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
  
      <v-list-tile v-for="contact in filteredContacts" :key="contact._id" v-on:click.native.stop="selectContact(contact)">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title> {{ contactFullName(contact) }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  
    <v-dialog v-model="showConfirmationDialog">
      <v-card>
        <v-card-title class="headline">Leave edition?</v-card-title>
        <v-card-text>All changes will be lost</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue-grey--text darken-1" flat="flat" @click.native="selectionCanceled()">Cancel</v-btn>
          <v-btn class="red--text darken-1" flat="flat" @click.native="contactSelectionConfirmed()">Leave</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'contact-list',
  data() {
    return {
      showConfirmationDialog: false,
      clickedContact: undefined
    }
  },
  methods: {
    ...mapActions(['fetchContacts']),

    ...mapMutations(['selectContact', 'disableEdition']),

    selectContact(contact) {
      this.clickedContact = contact
      if (!this.editionEnabled) {
        this.contactSelectionConfirmed()
      } else {
        this.showConfirmationDialog = true
      }
    },

    contactSelectionConfirmed() {
      this.disableEdition()
      this.showConfirmationDialog = false
      this.$router.push({ name: 'contact', params: { id: this.clickedContact._id } })
    },

    selectionCanceled() {
      this.showConfirmationDialog = false
    }
  },
  computed: {
    ...mapGetters(['contacts', 'filteredContacts', 'contactFullName', 'searchValue', 'fetchingContacts', 'editionEnabled']),

    emptyContactList() {
      return !this.contacts.length && !this.fetchingContacts
    },

    noMatchingContact() {
      return this.searchValue && !this.fetchingContacts && this.contacts.length && !this.filteredContacts.length
    }
  },

  created() {
    this.fetchContacts()
  }
}
</script>

<style lang="stylus">
.contact-list-card {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
