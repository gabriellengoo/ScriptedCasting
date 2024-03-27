<template>
  <div>
    <!-- Search input -->
    <div class="input-container">
      <input type="text" v-model="searchQuery" @input="search" class="search-input" :placeholder="placeholderText">
      <!-- Close icon -->
      <span v-if="searchQuery" class="close-icon" @click="clearSearch">x</span>
    </div>
    
    <!-- Full-screen overlay -->
    <div v-if="showOverlay" class="overlay">
      <ul v-if="searchResults.length" class="search-results">
        <li  class="p-1 "  v-for="result in searchResults" :key="result._id">
          <a class=" hover:underline" :href="`/work/${result.slug.current}`">{{ result.title }}</a>
        </li>
      </ul>
      <div v-else class="no-results flex flex-col">
        <p class="no-resultstext justify-center text-center">No results found.</p>
        <p class="pt-5 capitalize">Suggested Searches</p>
        <p>Film - Production - Short Film</p>
      </div>
    </div>
  </div>
</template>

<script>
import sanityClient from '@sanity/client'

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      showOverlay: false, // Flag to control overlay visibility
      isMobile: false // Flag to track if the device is mobile
    }
  },
  computed: {
    placeholderText() {
      return this.isMobile ? '⌕' : 'Search';
    }
  },
  methods: {
    async search() {
      if (!this.searchQuery.trim()) {
        this.searchResults = []
        this.showOverlay = false // Hide overlay when search query is empty
        return
      }

      const client = sanityClient({
        projectId: '03lhip23',
        dataset: 'production',
        // token: 'your_token', // Optional token if your dataset is private
        useCdn: false // Set this to true if you want to use the CDN instead of the API
      })

      const query = `*[title match "${this.searchQuery}"]`

      try {
        const results = await client.fetch(query)
        this.searchResults = results
        this.showOverlay = true // Show overlay when there are search results
      } catch (error) {
        console.error('Error fetching search results:', error.message)
      }
    },
    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
      this.showOverlay = false;
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  },
  mounted() {
    // Listen for resize event to determine if the device is mobile
    window.addEventListener('resize', this.updateIsMobile);
    // Call the updateIsMobile method initially to set the isMobile flag
    this.updateIsMobile();
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('resize', this.updateIsMobile);
  },
}
</script>

<style scoped>
/* Styles for the overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white; 
  backdrop-filter: blur(5px); /* Apply blur effect to the background */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto; /* Change to auto to only show scrollbar when needed */
  z-index: 9999; /* Ensure overlay appears above other content */
}

/* Styles for the search input */
.input-container {
  position: relative;
  width: 300px;
}

.search-input {
  position: relative;
  z-index: 10000;
  font-size: 18px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  font-size: 4.25rem;
  line-height: 2.5rem;
  font-family: "GTWalsheimbb";
  text-transform: uppercase;
}

/* Placeholder color for the search input */
.search-input::placeholder {
  color: #000000; /* Change placeholder color as needed */
}

/* Close icon */
.close-icon {
  position: absolute;
  /* position: relative; */
  font-size: 4.25rem;
  z-index: 10000;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;
}

/* Styles for the search results */
.search-results {
  list-style: none;
  padding-left: 5rem;
  margin: 0;
  font-size: 2rem;
  color: black;
  width: 100%;
  position: relative;
  /* font-family: "GTWalsheimbb"; */
  overflow-y: auto; /* Change to auto to only show scrollbar when needed */
}

/* Styles for the "No results found" message */
.no-results {
  color: black;
  font-size: 18px;
}

.no-resultstext{
  font-size: 20px;
  font-family: "GTWalsheimbb";
}

/* Mobile styles using media query */
@media (max-width: 768px) {
  .search-input{
    font-size: 2.525rem;
    /* max-width: 100px; */
    padding: 0;
  }

  .input-container{
    max-width: 30px;
  }


  .close-icon{
    font-size: 2.525rem;
    left: 100px;
  }

  .search-results {
    list-style: none;
    padding-left: .5rem;
    margin: 0;
    font-size: 5vw;
    color: black;
    width: 90%;
    position: relative;
    text-transform: capitalize;
    /* font-family: "GTWalsheimbb"; */
    overflow-y: auto;
}

.search-results li{
  padding-bottom: .5rem;
}

.search-input::placeholder {
  font-size: 4rem;
  line-height: .5rem;
}

}
</style>
