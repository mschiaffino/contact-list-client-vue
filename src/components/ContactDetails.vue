<template>
  <v-layout column class="mx-3">
  
    <contact-form :contact="contact" :show-details="showDetails"></contact-form>
  
    <v-fab-transition>
      <v-layout v-show="editionEnabled" justify-center>
        <v-btn secondary @click.native="discardChanges()">Discard</v-btn>
        <v-btn primary @click.native="saveChanges()" v-bind:disabled="disableSaving">Save</v-btn>
      </v-layout>
    </v-fab-transition>
  
    <v-layout justify-end>
      <contact-action-buttons></contact-action-buttons>
    </v-layout>
  </v-layout>
</template>

<script>
import cloneDeep from 'clone-deep'
import ContactForm from './ContactForm'
import ContactActionButtons from './ContactActionButtons'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'contact-details',
  props: ['id'],
  data: () => ({
    showDetails: false,
    menu: false,
    contact: {}
  }),
  computed: {
    ...mapGetters(['contactById', 'contactFullName', 'editionEnabled', 'disableSaving', 'fetchingContacts'])
  },
  methods: {
    ...mapMutations(['disableEdition']),

    saveChanges() {
      this.$store.dispatch('saveContactDetailsChanges', this.contact)
    },

    discardChanges() {
      this.disableEdition()
      Object.assign(this.contact, this.contactById(this.id))
    },

    loadContact() {
      this.contact = cloneDeep(this.contactById(this.id))
      if (this.contact) {
        this.showDetails = true
      }
    }
  },
  mounted() {
    this.loadContact()
  },
  watch: {
    fetchingContacts: function () {
      if (!this.contact && !this.fetchingContacts) {
        // Loads the contact after all contacts have been fetched
        this.loadContact()
      }
    },
    id: function () {
      // Reloads when another contact is selected
      this.loadContact()
    }
  },
  components: {
    'contact-form': ContactForm,
    'contact-action-buttons': ContactActionButtons
  }

}
</script>

<style lang="stylus" scoped>
.full-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
