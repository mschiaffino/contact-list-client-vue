<template>
  <v-card class="ma-3 contact-list-card">
    <v-list dense class="py-0">
      <v-list-tile v-for="contact in filteredContacts" :key="contact._id">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'contact-list',
  methods: {
    ...mapActions(['fetchContacts'])
  },
  computed: {
    ...mapGetters(['filteredContacts', 'contactFullName'])
  },
  mounted() {
    this.fetchContacts()
  }
}
</script>

<style lang="stylus">
.contact-list-card {
  overflow-y: scroll;
}
</style>
