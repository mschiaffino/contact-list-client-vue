<template>
  <v-card class="ma-3 px-3 pt-1">
    <v-text-field single-line v-model="searchValue" label="Search" append-icon="search"></v-text-field>
  </v-card>
</template>

<script>
export default {
  name: 'contact-search',
  computed: {
    searchValue: {
      get() {
        return this.$store.searchValue
      },
      set(value) {
        this.$store.commit('updateSearch', value)
      }
    }
  }
}
</script>

