<template>
    <main class="mt-1 md:pt-18">
      <Grid :items="grid.grid" size="small"></Grid> 
    </main>
  </template>
  <script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['grid', 'activeProject']),
    },
  }
  </script>
  