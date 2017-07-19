<template>
  <v-app id="example-3" standalone>
    <v-toolbar class="blue-grey darken-4" dark>
      <v-icon dark>contacts</v-icon>
      <v-toolbar-title>My Contacts</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer permanent floating light class="transparent">
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
export default {
  data() {
    return {
      drawer: null,
      right: null
    }
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
