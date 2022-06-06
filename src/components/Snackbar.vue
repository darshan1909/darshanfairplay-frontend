<template>
  <v-snackbar
    multi-line
    v-model="$store.state.snackbar.snackbar.isVisible"
    dark
    :timeout="2000"
    :color="$store.state.snackbar.snackbar.color"
    top
    right
  >
    <v-layout align-center>
      <!-- <v-icon class="pr-3" dark large>{{ $store.state.snackbar.snackbar.icon }}</v-icon> -->
      <v-layout column>
        <div class="font-16">{{ $store.state.snackbar.snackbar.content }}</div>
      </v-layout>
    </v-layout>
<!--
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="$store.commit('closeSnackbar')">
        Close
      </v-btn>
    </template> -->
  </v-snackbar>
</template>
<script>
export default {
  name: "Snackbar",
  computed: {
  },
};
</script>