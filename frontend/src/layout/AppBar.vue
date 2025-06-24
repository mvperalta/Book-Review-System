<template>
    <v-app-bar app color="primary" dark flat>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
      <v-toolbar-title>📚 The Spine Review</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'AppBar'
  }
  </script>