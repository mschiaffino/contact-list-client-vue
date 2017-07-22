<template>
  <v-fab-transition>
    <v-speed-dial v-model="fab" bottom right direction="top" hover transition="slide-y-transition" v-show="show">
      <v-btn slot="activator" class="blue darken-2" dark fab hover>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small class="green">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn fab dark small class="red">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-fab-transition>
</template>

<script>
export default {
  data: () => {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  }
}
</script>


<style>
.speed-dial {
  position: absolute;
}

.btn--floating {
  position: relative;
}
</style>
