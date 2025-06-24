<template>
    <v-container class="py-6">
      <BookList ref="bookList" />
    </v-container>
  </template>
  
  <script>
  import BookList from '../components/BookList.vue'
  
  export default {
    name: 'BookListView',
    components: { BookList }
  }
  </script>
  