<template>
    <div class="login-container">
      <v-btn @click="loginWithGoogle">Sign In with Google</v-btn>
      <v-btn v-if="user" @click="logout">Logout</v-btn>
      <div v-if="user">
        <p>Welcome, {{ user.displayName }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { auth, provider, signInWithPopup, signOut } from '../firebase'
  import { onAuthStateChanged } from 'firebase/auth'
  
  export default {
    setup() {
      const user = ref(null)
  
      const loginWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, provider)
          user.value = result.user
        } catch (error) {
          console.error('Login failed', error)
        }
      }
  
      const logout = async () => {
        await signOut(auth)
        user.value = null
      }
  
      onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
          user.value = currentUser
        })
      })
  
      return { loginWithGoogle, logout, user }
    }
  }
  </script>
  