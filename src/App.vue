<template>
  <v-app id="example-3" standalone>
    <v-toolbar class="blue-grey darken-4" dark>
      <v-icon dark>contacts</v-icon>
      <v-toolbar-title>My Contacts</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer permanent floating light class="transparent">
      <v-card class="ma-3">
        <v-list dense class="py-0">
          <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
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
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null
    }
  }
}
</script>


<style lang="stylus">
  @import './stylus/main'
</style>
