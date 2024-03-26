<!-- components/SearchBar.vue -->

<template>
  <div>
    <input class="text-6xl" type="text" v-model="query" @input="search">
    <ul>
      <li v-for="result in results" :key="result._id">{{ result.title }}</li>
      <li>test</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      results: []
    };
  },
  methods: {
    async search() {
      // Perform a search using the query and update results
      try {
        const response = await this.$axios.$get(
          `https://03lhip23.api.sanity.io/v1/graphql/production/default?q=${this.query}`
        );
        this.results = response.data; // Adjust based on your Sanity schema
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  }
};
</script>