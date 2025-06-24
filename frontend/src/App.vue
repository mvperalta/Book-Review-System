<template>
  <v-app>
    <!-- Top navigation bar -->
    <AppBar @toggle-drawer="toggleDrawer" />

    <!-- Sidebar drawer -->
    <NavigationDrawer :drawer="drawer" @update:drawer="drawer = $event" />

    <v-main>
  <router-view />
</v-main>
  </v-app>
</template>

<script>
import AppBar from './layout/AppBar.vue'
import NavigationDrawer from './layout/NavigationDrawer.vue'

export default {
  name: 'App',
  components: {
    AppBar,
    NavigationDrawer
  },
  data() {
    return {
      drawer: true
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

