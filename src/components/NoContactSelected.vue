<template>
  <v-layout column justify-space-between class="full-height">
    <v-flex class="text-xs-center content">
      <img src="../assets/contact.png" class="contact-image">
      <h2 class="blue-grey--text text--lighten-2">No contact selected</h2 class="blue-grey lighten-3">
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['disableEdition'])
  },
  mounted() {
    this.disableEdition()
  }
}
</script>


<style lang="stylus">
  .content{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .contact-image{
        max-width: 50%;
        max-height: 50%;
      }
  }
</style>

