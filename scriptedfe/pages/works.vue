<template>
  <!-- md:pt-20 -->
  <main class="mt-1  flex h-screen overflow-hidden">
   
    <div class="gridset w-1/4" >
      <!-- <LenisComponent /> -->
    <div class="marquee-container marquee-1" ref="marquee1">
      <Grid class="" :items="grid.grid" size="small"></Grid>
    </div>
  </div>

    <div class="gridset w-1/4" >
    <div class="marquee-container marquee-2 " ref="marquee2">
      <Grid class="" :items="grid.gridm" size="small"></Grid>
    </div>
  </div>

    <div class="gridset w-1/4" >
    <div class="marquee-container marquee-3 " ref="marquee3">
      <Grid class="" :items="grid.gride" size="small"></Grid>
    </div>
  </div>

    <div class="gridset w-1/4" >
      <div class="marquee-container marquee-4 " ref="marquee4">
      <Grid class="" :items="grid.gridl" size="small"></Grid>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import gsap from 'gsap';
// import LenisComponent from '~/components/LenisComponent.vue';

export default {
  computed: {
    ...mapState(['grid', 'activeProject']),
  },
  data() {
    return {
      lenis: null,
      // loading: true,
      // ... other data properties
    };
  },
  methods: {
    animateVerticalMarquees() {
      const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
      const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
      const tl3 = gsap.timeline({ repeat: -1, yoyo: true });
      const tl4 = gsap.timeline({ repeat: -1, yoyo: true });

      tl1.to(this.$refs.marquee1, { duration: 40, y: '-60%' });
      tl2.to(this.$refs.marquee2, { duration: 35, y: '-60%' });
      tl3.to(this.$refs.marquee3, { duration: 60, y: '-60%' });
      tl4.to(this.$refs.marquee4, { duration: 35, y: '-60%' });

      return [tl1, tl2, tl3, tl4];
    },
    pauseMarquee(timeline) {
      timeline.pause();
    },
    playMarquee(timeline) {
      timeline.play();
    },
  },
  mounted() {
    const marqueesTimelines = this.animateVerticalMarquees();
    this.marqueesTimelines = marqueesTimelines;
    // this.$refs.marquee1.addEventListener('mouseenter', () => this.pauseMarquee(marqueesTimelines[0]));
    // this.$refs.marquee1.addEventListener('mouseleave', () => this.playMarquee(marqueesTimelines[0]));
    // this.$refs.marquee2.addEventListener('mouseenter', () => this.pauseMarquee(marqueesTimelines[1]));
    // this.$refs.marquee2.addEventListener('mouseleave', () => this.playMarquee(marqueesTimelines[1]));
    // this.$refs.marquee3.addEventListener('mouseenter', () => this.pauseMarquee(marqueesTimelines[2]));
    // this.$refs.marquee3.addEventListener('mouseleave', () => this.playMarquee(marqueesTimelines[2]));
    // this.$refs.marquee4.addEventListener('mouseenter', () => this.pauseMarquee(marqueesTimelines[3]));
    // this.$refs.marquee4.addEventListener('mouseleave', () => this.playMarquee(marqueesTimelines[3]));
  },
};
</script>

<style scoped>
.gridset{
  top: 0;
  height: 100vh !important;
  position: relative;
  overflow-y: scroll;
}
@media (max-width: 768px) {
  .framesz{
    width: 50vw !important;
  }

  .gridset {
    width: unset !important;
  }

  .marquee-1{
    width: unset !important;
  }

  .marquee-2{
    width: unset !important;
  }
}
</style>
