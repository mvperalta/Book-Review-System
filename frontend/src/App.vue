<template>
  <v-app>
    <!-- Top navigation bar -->
    <AppBar @toggle-drawer="toggleDrawer" />

    <!-- Sidebar drawer -->
    <NavigationDrawer :drawer="drawer" @update:drawer="drawer = $event" />

    <v-main>
      <v-container class="py-6">
        <BookList ref="bookList" />
        <AddBook @book-added="reloadBooks" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './layout/AppBar.vue'
import NavigationDrawer from './layout/NavigationDrawer.vue'
import BookList from './components/BookList.vue'
import AddBook from './components/AddBook.vue'

export default {
  name: 'App',
  components: {
    AppBar,
    NavigationDrawer,
    BookList,
    AddBook
  },
  data() {
    return {
      drawer: true
    }
  },
  methods: {
    reloadBooks() {
      this.$refs.bookList.fetchLocalBooks()
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
