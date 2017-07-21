<template>
  <v-layout column class="contact-details" mx-3>
    <span v-text="contactFullName(contactById(id))" class="my-5 display-2 text-xs-center"></span>
  
    <v-layout column mt-5>
      <v-layout my-4 row>
        <v-flex xs4>
          <label class="title">First name</label>
        </v-flex>
        <v-flex xs4>
          <span v-text="contact.firstName"></span>
        </v-flex>
      </v-layout>
  
      <v-layout my-4 row>
        <v-flex xs4>
          <label class="title">Last name</label>
        </v-flex>
        <v-flex xs4>
          <span v-text="contact.lastName"></span>
        </v-flex>
      </v-layout>
  
      <v-layout my-4 row>
        <v-flex xs4>
          <label class="title">Date of birth</label>
        </v-flex>
        <v-flex xs4>
          <span v-text="contact.dateOfBirth"></span>
        </v-flex>
      </v-layout>
  
      <v-layout my-4 row>
        <v-flex xs4>
          <label class="title">Phone number</label>
        </v-flex>
        <v-flex xs4>
          <span v-text="contact.phone"></span>
        </v-flex>
      </v-layout>
  
      <v-layout my-4 row>
        <v-flex xs4>
          <label class="title">Zip code</label>
        </v-flex>
        <v-flex xs4>
          <span v-text="contact.zipCode"></span>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'contact-details',
  props: ['id'],
  computed: {
    ...mapGetters(['contactById', 'contactFullName']),

    contact() {
      return this.contactById(this.id)
    }
  }
}
</script>

<style lang="stylus">
.contact-details{
  
}
</style>
