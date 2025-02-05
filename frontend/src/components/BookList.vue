<template>
  <div>
    <h1>Book List</h1>

    <!-- Dropdown to select the book source -->
    <v-select
      v-model="bookSource"
      :items="['Local Books', 'NY Times Best Sellers']"
      label="Select Book Source"
    ></v-select>

    <!-- Search bar to filter books -->
    <v-text-field
      v-model="searchQuery"
      label="Search for a book"
      placeholder="Type to search..."
      clearable
    ></v-text-field>

    <!-- Loading spinner -->
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>

    <!-- Error message -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- Local Books -->
    <ul v-if="!loading && !errorMessage && bookSource === 'Local Books'">
      <li v-for="book in paginatedLocalBooks" :key="book._id">{{ book.title }} by {{ book.author }} - {{ book.review }}</li>
    </ul>


  <!-- Pagination Controls for Local Books -->
<div v-if="bookSource === 'Local Books' && totalPagesLocal > 1" class="pagination">
  <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
  <span>Page {{ currentPage }} of {{ totalPagesLocal }}</span>
  <button @click="currentPage++" :disabled="currentPage >= totalPagesLocal">Next</button>
</div>




    <!-- NY Times Best Sellers -->
    <ul v-if="!loading && !errorMessage && bookSource === 'NY Times Best Sellers'">
      <li v-for="book in paginatedBestSellers" :key="book.title">
        <h3>{{ book.title }} by {{ book.author }}</h3>
        <p>Rank: {{ book.rank }}</p>
        <p>Description: {{ book.description }}</p>


        <!-- Only show 'Reviews' section if reviews exist -->
        <p v-if="book.reviews && book.reviews.length > 0">Reviews:</p>
        <ul v-if="book.reviews && book.reviews.length > 0">
          <li v-for="review in book.reviews" :key="review.url">
            <a :href="review.url" target="_blank">{{ review.summary }}</a>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Pagination Controls for NY Times Best Sellers -->
<div v-if="bookSource === 'NY Times Best Sellers' && totalPagesBestSellers > 1" class="pagination">
  <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
  <span>Page {{ currentPage }} of {{ totalPagesBestSellers }}</span>
  <button @click="currentPage++" :disabled="currentPage >= totalPagesBestSellers">Next</button>
</div>




  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],          // Local books
      bestSellers: [],    // Best sellers list
      errorMessage: '',   // Error message for API failures
      loading: false,     // Loading state
      bookSource: 'Local Books', // Default to local books
      searchQuery: '', // Search input

      // Pagination state
      currentPage: 1,
      pageSize: 5, // Books per page
    };
  },

  computed: {
    // Filter local books based on search input
    filteredLocalBooks() {
      if (!this.searchQuery) return this.books; // If search is empty, return all books
      return this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) // Include author in search
      );
    },

  // Filter NY Times best sellers based on search input
  filteredBestSellers() {
    if (!this.searchQuery) return this.bestSellers; // Show all if no query

    return this.bestSellers.filter(book =>
      book.title.toLowerCase().trim().includes(this.searchQuery.toLowerCase().trim()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) // Include author in search
    );
  },





  //Paginated local books
  paginatedLocalBooks() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredLocalBooks.slice(start, start + this.pageSize);

  },

  // Paginated NYT books
  paginatedBestSellers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredBestSellers.slice(start, start + this.pageSize);
  },

  // Calculate total pages for local books
  totalPagesLocal() {
  return Math.ceil(this.filteredLocalBooks.length / this.pageSize);
},

  // Calculate total pages for NYT books
  totalPagesBestSellers() {
  return Math.ceil(this.filteredBestSellers.length / this.pageSize);
}
},






  // Watch the bookSource and fetch the appropriate books when changed
  watch: {
    searchQuery() {
    this.currentPage = 1; // Reset to first page when searching
  },
  bookSource(newSource) {
    if (newSource === 'Local Books') {
      this.fetchLocalBooks();
    } else if (newSource === 'NY Times Best Sellers') {
      this.fetchBestSellers();
    }
    this.currentPage = 1; // Reset to first page when switching sources
  }
    },

  methods: {
    // Fetch local books from your backend API
    async fetchLocalBooks() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/books'); // Your local API
        this.books = response.data;
        this.loading = false;
      } catch (error) {
        this.errorMessage = 'Failed to load local books. Please try again later.';
        this.loading = false;
      }
    },
    // Fetch NY Times best sellers
    async fetchBestSellers() {
      this.loading = true;
      const apiKey = 'i2yMn1ZSnGxsGxNFZq5PNdY6naVYP6v7'; // Replace with your NY Times API key
      const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
      try {
        const response = await axios.get(url);
        console.log('API Response:', response); // Log the API response

        // Map the response to bestSellers array with title, author, rank, and description
        this.bestSellers = response.data.results.books.map(book => ({
          title: book.title,
          author: book.author,
          rank: book.rank,
          description: book.description,
          reviews: [], // Placeholder for reviews
        }));

        // Fetch reviews for each book
        await this.fetchReviewsForBestSellers();
        this.loading = false;
      } catch (error) {
        console.error('Failed to fetch best sellers:', error); // Log the error
        this.errorMessage = 'Failed to load best sellers from NY Times. Please try again later.';
        this.loading = false;
      }
    },
    // Fetch reviews for each best seller book from NY Times
    async fetchReviewsForBestSellers() {
      const apiKey = 'i2yMn1ZSnGxsGxNFZq5PNdY6naVYP6v7'; // Replace with your NY Times API key
      for (let book of this.bestSellers) {
        try {
          const url = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${encodeURIComponent(book.title)}&api-key=${apiKey}`;
          const response = await axios.get(url);

          // If there are reviews, map them to the book object
          if (response.data.results && response.data.results.length > 0) {
            book.reviews = response.data.results.map(review => ({
              summary: review.summary,
              url: review.url,
            }));
          }
        } catch (error) {
          console.error(`Failed to fetch reviews for ${book.title}`, error); // Log the error
        }
      }
    },
  },
  mounted() {
    this.fetchLocalBooks(); // Fetch local books on component mount
  },
};
</script>

<style>

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Adds spacing between elements */
  margin-top: 10px;
}


.error {
  color: red;
}
</style>
