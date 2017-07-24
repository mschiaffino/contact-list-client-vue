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
  
      <v-list-tile v-for="contact in filteredContacts" :key="contact._id" v-on:click.native="showContact(contact)">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title> {{ contactFullName(contact) }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'contact-list',
  methods: {
    ...mapActions(['fetchContacts']),

    ...mapMutations(['selectContact', 'disableEdition']),

    showContact: function (contact) {
      this.disableEdition()
      this.$router.push({ name: 'contact', params: { id: contact._id } })
    }
  },
  computed: {
    ...mapGetters(['contacts', 'filteredContacts', 'contactFullName', 'searchValue', 'fetchingContacts']),

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

  // .loading-contacts-spinner {
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   top: 0;
  // }
}
</style>
