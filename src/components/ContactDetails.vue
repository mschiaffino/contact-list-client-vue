<template>
  <v-layout column class="mx-3" v-if="showDetails">
    <span v-text="contactFullName(contact)" class="my-5 display-2 text-xs-center blue-grey--text"></span>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editionEnabled" v-model="contact.firstName" name="firstName" label="First name"></v-text-field>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editionEnabled" v-model="contact.lastName" name="lastName" label="Last name"></v-text-field>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-menu :disabled="!editionEnabled" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
        <v-text-field slot="activator" label="Date of birth" :disabled="!editionEnabled" v-model="contact.dateOfBirth" append-icon="event" readonly></v-text-field>
        <v-date-picker :disabled="!editionEnabled" v-model="contact.dateOfBirth" scrollable>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
              <v-btn flat primary @click.native="save()">Accept</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editionEnabled" v-model="contact.phone" name="phone" label="Phone number"></v-text-field>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editionEnabled" v-model="contact.zipCode" name="zipCode" label="Zip code"></v-text-field>
    </v-flex>
  
    <v-fab-transition>
      <v-layout v-show="editionEnabled" justify-center>
        <v-btn secondary @click.native="discardChanges()">Discard</v-btn>
        <v-btn primary @click.native="saveChanges()">Save</v-btn>
      </v-layout>
    </v-fab-transition>
  
    <v-layout justify-end>
      <contact-action-buttons></contact-action-buttons>
    </v-layout>
  </v-layout>
</template>

<script>
import cloneDeep from 'clone-deep'
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
    ...mapGetters(['contactById', 'contactFullName', 'editionEnabled'])
  },
  methods: {
    ...mapMutations(['disableEdition']),

    saveChanges() {
      this.$store.dispatch('saveContactDetailsChanges', this.contact)
    },

    discardChanges() {
      this.disableEdition()
      Object.assign(this.contact, this.contactById(this.id))
    }
  },
  components: {
    'contact-action-buttons': ContactActionButtons
  },
  mounted() {
    this.contact = cloneDeep(this.contactById(this.id))
    this.showDetails = true
  },
  watch: {
    id: function () {
      this.contact = cloneDeep(this.contactById(this.id))
    }
  }

}
</script>
