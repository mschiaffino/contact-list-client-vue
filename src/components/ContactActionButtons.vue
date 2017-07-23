<template>
  <div>
    <v-fab-transition>
      <v-speed-dial v-model="speedDial" bottom right direction="top" hover transition="slide-y-transition" v-show="show">
        <v-btn slot="activator" class="blue-grey darken-2" dark fab hover>
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn fab dark small class="green" @click.native="enableEdition()">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab dark small class="red" @click.native.stop="confirmDeletion()">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-fab-transition>
  
    <v-dialog v-model="showingDeleteConfirmation">
      <v-card>
        <v-card-title class="headline">Delete contact?</v-card-title>
        <v-card-text>The contact won't be available anymore.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue-grey--text darken-1" flat="flat" @click.native="deletionCanceled()">Cancel</v-btn>
          <v-btn class="red--text darken-1" flat="flat" @click.native="deletionConfirmed()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      speedDial: false,
      show: false,
      showingDeleteConfirmation: false
    }
  },
  methods: {
    ...mapActions(['deleteContact']),

    ...mapMutations(['enableEdition']),

    confirmDeletion() {
      this.showingDeleteConfirmation = true
    },

    deletionCanceled() {
      this.showingDeleteConfirmation = false
    },

    deletionConfirmed() {
      this.showingDeleteConfirmation = false
      this.deleteContact()
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
