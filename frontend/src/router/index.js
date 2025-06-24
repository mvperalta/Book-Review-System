import { createRouter, createWebHistory } from 'vue-router'
import BookList from '@/components/BookList.vue'
import AddBook from '@/components/AddBook.vue'

const routes = [
  { path: '/', redirect: '/books' },
  { path: '/books', component: BookList },
  { path: '/add-book', component: AddBook },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


