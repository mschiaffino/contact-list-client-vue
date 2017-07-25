<template>
  <div class="alert-component">
    <v-alert v-model="showSuccessAlert" success transition="fade-transition">
      <span v-text="alertMessage"></span>
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['showSuccessAlert', 'alertMessage'])
  }
}
</script>

<style lang="stylus" scoped>
.alert-component {
  position: absolute;
  left: 30px;
  right: 30px;
}
</style>
