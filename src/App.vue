<template>
  <v-app id="example-3" standalone>
    <v-toolbar class="blue-grey darken-4" dark>
      <v-icon dark>contacts</v-icon>
      <v-toolbar-title>My Contacts</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer permanent floating light class="transparent">
      <contact-search></contact-search>
      <contact-list></contact-list>
    </v-navigation-drawer>
    <main>
      <v-container fluid>
        <!--v-router-->
      </v-container>
    </main>
  </v-app>
</template>

<script>
// Custom components
import ContactList from './components/ContactList'
import ContactSearch from './components/ContactSearch'

export default {
  data() {
    return {
      drawer: null,
      right: null
    }
  },
  components: {
    ContactList,
    ContactSearch
  }
}
</script>


<style lang="stylus">
  @import './stylus/main'

  .navigation-drawer {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    padding-bottom: 0;
  }
</style>
