<template>
  <v-layout column class="mx-3">
    <contact-form :contact="contact" show-details="true"></contact-form>
  
    <v-fab-transition>
      <v-layout justify-center>
        <v-btn secondary @click.native="discardChanges()">Discard</v-btn>
        <v-btn primary @click.native="createContact()" v-bind:disabled="disableSaving">Create</v-btn>
      </v-layout>
    </v-fab-transition>
  
  </v-layout>
</template>

<script>
import ContactForm from './ContactForm'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'contact-creator',
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        dateOfBirth: undefined,
        phoneNumber: '',
        zipCode: ''
      }
    }
  },
  computed: {
    ...mapGetters(['disableSaving'])
  },
  methods: {
    ...mapMutations(['enableEdition']),

    discardChanges() {
      this.$router.back()
    },

    createContact() {
      this.$store.dispatch('createContact', this.contact)
    }
  },
  mounted() {
    this.$store.commit('enableEdition')
  },
  components: { 'contact-form': ContactForm }
}
</script>

