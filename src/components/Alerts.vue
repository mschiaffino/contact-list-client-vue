<template>
  <div class="alert-component">
    <v-alert v-model="showAlertSuccessfullyDeleted" success transition="fade-transition">
      Contact successfully deleted
    </v-alert>

    <v-alert v-model="showAlertChangesSuccessfullySaved" success transition="fade-transition">
      Changes successfully saved
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['showAlertSuccessfullyDeleted', 'showAlertChangesSuccessfullySaved'])
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
