<template>
  <div>
    <h1>Book List</h1>
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular> <!-- Loading spinner -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div> <!-- Error message -->
    <ul v-if="!loading && !errorMessage"> <!-- Conditionally render book list -->
      <li v-for="book in books" :key="book._id">{{ book.title }} by {{ book.author }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      errorMessage: '',
      loading: true, // Add loading state
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        this.books = response.data;
        this.loading = false;
      } catch (error) {
        this.errorMessage = 'Failed to load books. Please try again later.';
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style>
/* Basic error message styling */
.error {
  color: red;
}
</style>
