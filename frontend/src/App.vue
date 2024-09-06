<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>Book Review System</h1>
        <BookList ref="bookList" />
        <AddBook @book-added="reloadBooks" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BookList from './components/BookList.vue';
import AddBook from './components/AddBook.vue';

export default {
  name: 'App',
  components: {
    BookList,
    AddBook
  },
  methods: {
    reloadBooks() {
      this.$refs.bookList.fetchBooks();
    }
  }
};
</script>