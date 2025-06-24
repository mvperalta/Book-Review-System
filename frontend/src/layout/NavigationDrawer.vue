<template>
  <v-navigation-drawer
    app
    :model-value="drawer"
    @update:model-value="$emit('update:drawer', $event)"
    permanent
    color="grey-lighten-4"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item to="/books" router>
        <v-list-item-icon>
          <v-icon>mdi-book-open-page-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Books</v-list-item-title>
      </v-list-item>

      <v-list-item to="/add-book" router>
        <v-list-item-icon>
          <v-icon>mdi-plus-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Add Book</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: {
    drawer: Boolean
  },
  emits: ['update:drawer']
}
</script>


  