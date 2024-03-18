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
          : ' md:flex'
      "
    ></LayoutHeader>
    <!-- <LayoutHeaderMin
      :class="
        $nuxt.$route.name == 'index' ||
        $nuxt.$route.name == 'index-bak' ||
        $nuxt.$route.name == 'about' ||
        $nuxt.$route.name == 'production' ||
        $nuxt.$route.name == 'artists'
          ? 'hidden'
          : 'hidden md:flex'
      "
    ></LayoutHeaderMin> -->
 
  </main>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import TransitionComponent from '~/components/TransitionComponent.vue';
import LenisComponent from '~/components/LenisComponent.vue';
import Lenis from '@studio-freight/lenis';



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
    const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
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
