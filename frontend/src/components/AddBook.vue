<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <h2>Add a Book</h2>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="title" label="Title" required></v-text-field>
          <v-text-field v-model="author" label="Author" required></v-text-field>
          <v-textarea v-model="review" label="Review"></v-textarea>
          <v-btn type="submit" color="primary">Add Book</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      author: '',
      review: '',
    }
  },
  methods: {
    async submitForm() {
      console.log('Form submitted', { title: this.title, author: this.author, review: this.review });
      try {
        const response = await fetch('http://localhost:3000/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: this.title,
            author: this.author,
            review: this.review,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to add book');
        }
        const result = await response.json();
        console.log('Book added:', result);
        this.$emit('book-added');
        this.clearForm();
      } catch (error) {
        console.error('Error adding book:', error);
        // Handle error (e.g., show error message to user)
      }
    },
    clearForm() {
      this.title = '';
      this.author = '';
      this.review = '';
    }
  }
}
</script>