<template>
  <div v-if="shouldRenderComponent"></div>
</template>

<script>
import Lenis from '@studio-freight/lenis';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      lenis: null
    };
  },
  computed: {
    ...mapGetters(['isComponentAllowed']) // Assuming you have a Vuex getter to check if the component is allowed on the current route
  },
  mounted() {
    if (this.isComponentAllowed) {
      this.lenis = new Lenis();
      this.lenis.on('scroll', (e) => {
        console.log(e);
      });

      function raf(time) {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }
};
</script>
