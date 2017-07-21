<template>
  <v-card class="mx-3 mb-3 contact-list-card">
    <v-list dense class="py-0">
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
    showContact: function (contact) {
      this.$router.push({ name: 'contact', params: { id: contact._id } })
    }
  },
  computed: {
    ...mapGetters(['filteredContacts', 'contactFullName']),
    ...mapMutations(['selectContact'])
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
