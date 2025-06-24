<template>
    <v-container class="py-6">
      <AddBook />
    </v-container>
  </template>
  
  <script>
  import AddBook from '../components/AddBook.vue'
  
  export default {
    name: 'AddBookView',
    components: { AddBook }
  }
  </script>
  