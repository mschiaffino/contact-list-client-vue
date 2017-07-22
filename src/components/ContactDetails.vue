<template>
  <v-layout column class="mx-3">
    <span v-text="contactFullName(contactById(id))" class="my-5 display-2 text-xs-center"></span>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editing" v-model="contact.firstName" name="firstName" label="First name"></v-text-field>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editing" v-model="contact.lastName" name="lastName" label="Last name"></v-text-field>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-menu :disabled="!editing" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
        <v-text-field slot="activator" label="Date of birth" :disabled="!editing" v-model="contact.dateOfBirth" append-icon="event" readonly></v-text-field>
        <v-date-picker :disabled="!editing" v-model="contact.dateOfBirth" scrollable>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
              <v-btn flat primary @click.native="save()">Save</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editing" v-model="contact.phone" name="phone" label="Phone number"></v-text-field>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editing" v-model="contact.zipCode" name="zipCode" label="Zip code"></v-text-field>
    </v-flex>
  
    <v-layout justify-end>
      <contact-action-buttons></contact-action-buttons>
    </v-layout>
  </v-layout>
</template>

<script>
import ContactActionButtons from './ContactActionButtons'
import { mapGetters } from 'vuex'

export default {
  name: 'contact-details',
  props: ['id'],
  computed: {
    ...mapGetters(['contactById', 'contactFullName']),

    contact() {
      return this.contactById(this.id)
    },
    editing() { return false }
  },
  components: {
    'contact-action-buttons': ContactActionButtons
  }
}
</script>
