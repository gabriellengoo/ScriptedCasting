<template>
  <main class="min-h-full">
    <!-- <LenisComponent /> -->
    <TransitionComponent />
    
    <Nuxt />
    <LayoutHeader
      :class="
        $nuxt.$route.name == 'index' ||
        $nuxt.$route.name == 'index-bak' ||
        $nuxt.$route.name == 'about' ||
        $nuxt.$route.name == 'production' ||
        $nuxt.$route.name == 'artists'
          ? ''
          : ' md:hidden'
      "
    ></LayoutHeader>
    <LayoutHeaderMin
      :class="
        $nuxt.$route.name == 'index' ||
        $nuxt.$route.name == 'index-bak' ||
        $nuxt.$route.name == 'about' ||
        $nuxt.$route.name == 'production' ||
        $nuxt.$route.name == 'artists'
          ? 'hidden'
          : 'hidden md:flex'
      "
    ></LayoutHeaderMin>
 
  </main>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import TransitionComponent from '~/components/TransitionComponent.vue';
// import Lenis from '@studio-freight/lenis'; 


export default {
  methods: {
    ...mapActions(['setTitle']),
    ...mapMutations(['SET_FOOTER', 'CLOSE_MENU']),
  },
  data() {
    return {
      // lenis: null,
      // loading: true,
      // ... other data properties
    };
  },
  mounted() {
  //   this.lenis = new Lenis({
  //     // Your configuration options
  //     duration: 1,
  //     easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  //     direction: "vertical",
  //     gestureDirection: "vertical",
  //     smooth: true,
  //     smoothTouch: true,
  //     touchMultiplier: 2,
  //   });

  //   // Set up a scroll event listener
  //   this.lenis.on('scroll', (e) => {
  //     // Handle scroll events here
  //     console.log(e);
  //   });

  //   // Create a requestAnimationFrame function to keep the scroll listener active
  //   function raf(time) {
  //     this.lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //     // Start the requestAnimationFrame loop
  //     requestAnimationFrame(raf);
  },
  components: {
    TransitionComponent,
  },
  watch: {
    $route: function (value) {
      this.setTitle(false)
      this.SET_FOOTER(false)
      this.CLOSE_MENU()
    },
  },
}
</script>
