<template>
  <v-layout column class="mx-3" v-if="showDetails">
  
    <span v-text="contactFullName(contact)" class="full-name my-5 display-2 text-xs-center blue-grey--text"></span>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editionEnabled" v-model.trim="contact.firstName" name="firstName" label="First name" :rules="[rules.firstName]"></v-text-field>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editionEnabled" v-model.trim="contact.lastName" name="lastName" label="Last name" :rules="[rules.lastName]"></v-text-field>
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
      <v-text-field :disabled="!editionEnabled" v-model.trim="contact.phone" name="phone" label="Phone number"></v-text-field>
    </v-flex>
  
    <v-flex xs8 offset-xs2>
      <v-text-field :disabled="!editionEnabled" v-model.trim="contact.zipCode" name="zipCode" label="Zip code"></v-text-field>
    </v-flex>
  
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const requiredMessage = 'Required'

export default {
  name: 'contact-form',
  props: ['showDetails', 'contact'],
  data() {
    return {
      menu: false,
      rules: {
        firstName: (value) => {
          this.hasFirstName = !!value
          this.updateFormIsValid()
          return this.hasFirstName || requiredMessage
        },
        lastName: (value) => {
          this.hasLastName = !!value
          this.updateFormIsValid()
          return this.hasLastName || requiredMessage
        }
      },
      hasFirstName: !this.firstName,
      hasLastName: !this.lastName
    }
  },
  computed: {
    ...mapGetters(['contactFullName', 'editionEnabled'])
  },
  methods: {
    ...mapMutations(['setContactFormIsValid']),

    updateFormIsValid() {
      this.setContactFormIsValid(this.hasFirstName && this.hasLastName)
    }
  }
}
</script>

<style lang="stylus" scoped>
.full-name{
    min-height: 48px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
