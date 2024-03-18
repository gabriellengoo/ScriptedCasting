<template>
  <main class="mt-1 md:pt-20 flex h-screen overflow-hidden">
    <div class="marquee-container marquee-1 w-1/4" ref="marquee1">
      <Grid class="" :items="grid.grid" size="small"></Grid>
    </div>
    <div class="marquee-container marquee-2 w-1/4" ref="marquee2">
      <Grid class="" :items="grid.gridm" size="small"></Grid>
    </div>
    <div class="marquee-container marquee-3 w-1/4" ref="marquee3">
      <Grid class="" :items="grid.gride" size="small"></Grid>
    </div>
    <div class="marquee-container marquee-4 w-1/4" ref="marquee4">
      <Grid class="" :items="grid.gridl" size="small"></Grid>
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

      tl1.to(this.$refs.marquee1, { duration: 20, y: '-90%' });
      tl2.to(this.$refs.marquee2, { duration: 15, y: '-90%' });
      tl3.to(this.$refs.marquee3, { duration: 50, y: '-90%' });
      tl4.to(this.$refs.marquee4, { duration: 15, y: '-90%' });

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
    this.$refs.marquee1.addEventListener('mouseenter', () => this.pauseMarquee(marqueesTimelines[0]));
    this.$refs.marquee1.addEventListener('mouseleave', () => this.playMarquee(marqueesTimelines[0]));
    this.$refs.marquee2.addEventListener('mouseenter', () => this.pauseMarquee(marqueesTimelines[1]));
    this.$refs.marquee2.addEventListener('mouseleave', () => this.playMarquee(marqueesTimelines[1]));
    this.$refs.marquee3.addEventListener('mouseenter', () => this.pauseMarquee(marqueesTimelines[2]));
    this.$refs.marquee3.addEventListener('mouseleave', () => this.playMarquee(marqueesTimelines[2]));
    this.$refs.marquee4.addEventListener('mouseenter', () => this.pauseMarquee(marqueesTimelines[3]));
    this.$refs.marquee4.addEventListener('mouseleave', () => this.playMarquee(marqueesTimelines[3]));
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .marquee-container {
    width: 50vw;
  }
}
</style>
