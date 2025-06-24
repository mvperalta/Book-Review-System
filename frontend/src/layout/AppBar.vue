<template>
  <v-app-bar app color="primary" dark flat>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-toolbar-title>📚 The Spine Review</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Person Icon triggers sign-in -->
    <v-btn icon @click="handleAuth">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { auth, provider } from '@/firebase' // adjust path if needed
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'AppBar',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    onAuthStateChanged(auth, (currentUser) => {
      this.user = currentUser
    })
  },
  methods: {
    async handleAuth() {
      if (!this.user) {
        try {
          const result = await signInWithPopup(auth, provider)
          this.user = result.user
          console.log('Signed in as:', this.user.displayName)
        } catch (error) {
          console.error('Sign-in error:', error)
        }
      } else {
        try {
          await signOut(auth)
          this.user = null
          console.log('Signed out')
        } catch (error) {
          console.error('Sign-out error:', error)
        }
      }
    }
  }
}
</script>
