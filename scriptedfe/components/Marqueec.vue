<template>
  <div class="sizemark">
    <div class="marquee-containerr">
      <div class="marqueee" :class="{ reverse: reverse }" ref="marquee">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reverse: false,
    };
  },
  mounted() {
    this.startMarquee();
  },
  methods: {
    startMarquee() {
      const marquee = this.$refs.marquee;
      const containerWidth = this.$el.clientWidth;
      const contentWidth = marquee.scrollWidth;

      if (contentWidth > containerWidth) {
        const animationDuration = (contentWidth / containerWidth) * 10;
        marquee.style.animationDuration = `${animationDuration}s`;
        marquee.addEventListener(
          "animationiteration",
          this.handleAnimationIteration
        );
      }
    },
    handleAnimationIteration() {
      const marquee = this.$refs.marquee;
      // Toggle direction of animation
      this.reverse = !this.reverse;
      // Reset position
      marquee.style.transform = "translateX(0)";
    },
  },
};
</script>

<style scoped>
.sizemark {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.marquee-containerr {
  /* overflow: hidden; */
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Disable vertical scrolling */
  width: 95vw;
  /* padding-bottom: 2vh; */
}

.marqueee {
  white-space: nowrap;
  animation: marquee-scroll 10s linear infinite;
}

.reverse {
  animation-direction: reverse;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-90%);
  }
}
</style>
