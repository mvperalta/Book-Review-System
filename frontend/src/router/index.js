import { createRouter, createWebHistory } from 'vue-router'
import BookList from '@/components/BookList.vue'
import AddBook from '@/components/AddBook.vue'
import Login from '@/views/LoginPage.vue'// ✅ Import the Login component

const routes = [
  { path: '/', redirect: '/books' },
  { path: '/books', component: BookList },
  { path: '/add-book', component: AddBook },
  { path: '/login', component: Login } // ✅ Add Login route
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



