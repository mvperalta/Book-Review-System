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
  