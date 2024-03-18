<template>
  <div class="vertical-marquee" :style="{ height: containerHeight + 'px' }">
    <div ref="content" class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      containerHeight: 0,
      contentHeight: 0,
      animationId: null,
      reverse: false,
      speed: 5, // Change speed as required
    };
  },
  mounted() {
    this.containerHeight = this.$el.clientHeight;
    this.contentHeight = this.$refs.content.clientHeight;
    if (this.contentHeight > this.containerHeight) {
      this.startAnimation();
    }
  },
  beforeDestroy() {
    this.stopAnimation();
  },
  methods: {
    startAnimation() {
      const animate = () => {
        if (this.reverse) {
          this.$refs.content.style.transform = `translateY(${this.containerHeight}px)`;
        } else {
          this.$refs.content.style.transform = `translateY(-${this.contentHeight}px)`;
        }
        this.reverse = !this.reverse;
        this.animationId = setTimeout(animate, this.speed);
      };
      this.animationId = setTimeout(animate, this.speed);
    },
    stopAnimation() {
      clearTimeout(this.animationId);
    },
  },
};
</script>

<style scoped>
.vertical-marquee {
  overflow: hidden;
  position: relative;
}

.content {
  position: absolute;
  width: 25%;
}
</style>
