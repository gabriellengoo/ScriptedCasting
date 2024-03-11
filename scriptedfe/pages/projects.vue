<template>
  <main class="mt-1 md:pt-20 flex h-screen overflow-hidden">
    <div class="marquee-container marquee-1 w-1/4">
      <Grid class="" :items="grid.grid" size="small"></Grid>
    </div>
    <div class="marquee-container marquee-2 w-1/4">
      <div>
        <Grid class="" :items="grid.gridm" size="small"></Grid>
      </div>
    </div>
    <div class="marquee-container marquee-3 w-1/4">
      <div>
        <Grid class="" :items="grid.gride" size="small"></Grid>
      </div>
    </div>
    <div class="marquee-container marquee-4 w-1/4">
      <div>
        <Grid class="" :items="grid.gridl" size="small"></Grid>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import gsap from 'gsap';

export default {
  computed: {
    ...mapState(['grid', 'activeProject']),
  },
  methods: {
    animateVerticalMarquees() {
      const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
      const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
      const tl3 = gsap.timeline({ repeat: -1, yoyo: true });
      const tl4 = gsap.timeline({ repeat: -1, yoyo: true });

      tl1.to('.marquee-1', { duration: 50, y: '-100%' });
      tl2.to('.marquee-2 > div', { duration: 200, y: '-100%' });
      tl3.to('.marquee-3 > div', { duration: 150, y: '-100%' });
      tl4.to('.marquee-4 > div', { duration: 200, y: '-100%' });

      return [tl1, tl2, tl3, tl4];
    },
  },
  mounted() {
    const marqueesTimelines = this.animateVerticalMarquees();
    // You can access individual timelines if needed, e.g., marqueesTimelines[0], marqueesTimelines[1], etc.
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .marquee-container{
    width: 50vw;
  }
}
</style>
