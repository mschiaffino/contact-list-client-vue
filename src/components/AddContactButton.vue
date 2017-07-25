<template>
  <v-btn @click.native="addContact()" class="add-contact-button" primary dark small absolute bottom right fab>
    <v-icon>add</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'add-contact-button',
  methods: {
    addContact() {
      this.$router.push({ name: 'add-contact' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-contact-button {
  bottom: 30px !important;
  right: 40px;
}
</style>
