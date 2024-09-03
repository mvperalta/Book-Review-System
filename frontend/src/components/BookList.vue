<template>
    <div>
      <h1>Book List</h1>
      <ul>
        <li v-for="book in books" :key="book._id">{{ book.title }} by {{ book.author }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        books: []
      };
    },
    mounted() {
      axios.get('http://localhost:3000/books')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the books!', error);
        });
    }
  };
  </script>
  
  // BookList.vue (Example error handling in a method)
methods: {
    async fetchBooks() {
        try {
            const response = await axios.get('/api/books');
            this.books = response.data;
        } catch (error) {
            this.errorMessage = 'Failed to load books. Please try again later.';
        }
    }
}

<!-- BookList.vue (Add this inside your template) -->
<div v-if="errorMessage" class="error">
  {{ errorMessage }}
</div>

// AddBook.vue
methods: {
    validateForm() {
        if (!this.title || !this.author) {
            this.errorMessage = 'Title and author are required.';
            return false;
        }
        return true;
    },
    async submitForm() {
        if (this.validateForm()) {
            // Proceed with form submission
        }
    }
}

<!-- AddBook.vue (inside your form template) -->
<div v-if="errorMessage" class="error">
  {{ errorMessage }}
</div>

<!-- BookList.vue -->
<v-progress-circular v-if="loading" indeterminate></v-progress-circular>

