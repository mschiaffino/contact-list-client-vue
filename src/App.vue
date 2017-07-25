<template>
  <v-app id="contact-list" standalone>
    <v-toolbar class="blue-grey darken-4" dark>
      <v-icon dark>contacts</v-icon>
      <v-toolbar-title>My Contacts</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer permanent floating light class="transparent">
      <contact-search></contact-search>
      <contact-list></contact-list>
      <add-contact-button></add-contact-button>
    </v-navigation-drawer>
    <main>
      <v-container fluid>
        <v-card class="pa-4 main-content-panel">
          <alerts></alerts>
          <router-view></router-view>
        </v-card>
      </v-container>
    </main>
  </v-app>
</template>

<script>
// Custom components
import ContactList from './components/ContactList'
import ContactSearch from './components/ContactSearch'
import Alerts from './components/Alerts'
import AddContactButton from './components/AddContactButton'

export default {
  data() {
    return {
      drawer: null,
      right: null
    }
  },
  components: {
    ContactList,
    ContactSearch,
    Alerts,
    AddContactButton
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

    @media (max-width: 1279px) {
      margin-left: $side-spacing-vp-width-1279;
    }

    @media (min-width: 1280px) and (max-width: 1365px) {
      margin-left: $side-spacing-vp-width-1280-1365;      
    }

    @media (min-width: 1366px) and (max-width: 1919px) {
      margin-left: $side-spacing-vp-width-1366-1919      
    }
    @media (min-width: 1920px) {
      margin-left: $side-spacing-vp-width-1920      
    }
  }

  main {
    height: calc(100vh - 64px);

     @media (max-width: 1279px) {
      margin-left: $side-spacing-vp-width-1279;
      padding-right: $side-spacing-vp-width-1279;
    }

    @media (min-width: 1280px) and (max-width: 1365px) {
      margin-left: $side-spacing-vp-width-1280-1365;
      padding-right: $side-spacing-vp-width-1280-1365;
    }

    @media (min-width: 1366px) and (max-width: 1919px) {
      margin-left: $side-spacing-vp-width-1366-1919;
      padding-right: $side-spacing-vp-width-1366-1919;
    }
    @media (min-width: 1920px) {
      margin-left: $side-spacing-vp-width-1920;
      padding-right: $side-spacing-vp-width-1920;
    }
    
    .container {
      height: 100%;

      .main-content-panel {
        max-width: 640px;
        height: 100% !important;
        overflow-y: auto;
      }
    }
  }

</style>
