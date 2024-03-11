<template>
  <client-only>
    <!-- pt-28 class="w-4/12 p-10 "-->
    <div class=" " >
      <div v-for="item in items"  :key="item._key">
        <figure class=" p-10">
          <NuxtLink
            v-if="item.reference.slug"
            :to="`/project/${item.reference.slug}`"
          >
            <span>
              <figure>
                <MediaImage
                  :src="item.image.image"
                  v-if="item.image.image"
                ></MediaImage>
                <MediaVideo
                  :id="item.video.id"
                  v-if="item.video.id"
                ></MediaVideo>
                <!-- Render YouTube Video -->
                <iframe
                  v-else-if="item.youtubeUrl"
                  :src="getYouTubeEmbedUrl(item.youtubeUrl)"
                  frameborder="0"
                  allowfullscreen
                ></iframe>

                <!-- Render Vimeo Video -->
                <iframe
                  v-else-if="item.vimeoUrl"
                  :src="getVimeoEmbedUrl(item.vimeoUrl)"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </figure>
            </span>
          </NuxtLink>
          <a v-else-if="item.link" :href="item.link" target="_blank">
            <span>
              <MediaImage
                :src="item.image.image"
                v-if="item.image.image"
              ></MediaImage>
              <MediaVideo
                :id="item.video.id"
                v-if="item.video.id"
                :thumbTime="item.video.thumbTime"
              ></MediaVideo>
              <!-- Render YouTube Video -->
              <iframe
                v-else-if="item.youtubeUrl"
                :src="getYouTubeEmbedUrl(item.youtubeUrl)"
                frameborder="0"
                allowfullscreen
              ></iframe>

              <!-- Render Vimeo Video -->
              <iframe
                v-else-if="item.vimeoUrl"
                :src="getVimeoEmbedUrl(item.vimeoUrl)"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </span>
          </a>
          <figure v-else>
            <span>
              <MediaImage
                :src="item.image.image"
                v-if="item.image.image"
              ></MediaImage>
              <MediaVideo :id="item.video.id" v-if="item.video.id"></MediaVideo>
            </span>
          </figure>
        </figure>
      </div>
    </div>
  </client-only>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["items", "size"],
  data() {
    return {
      project: false,
      containerClass: "flex flex-col w-full h-full",
      imageClass: "contain-image",
      isDesktop: false,
    };
  },
  computed: {
    ...mapState(["activeProject", "activeTalent"]),
  },
  mounted() {
    this.redraw();
    // Check if the window width is greater than a certain threshold for desktop
    this.isDesktop = window.innerWidth > 768; // Adjust the threshold as needed
    // Listen to window resize events to update the isDesktop flag
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    ...mapMutations(["SET_ACTIVE_PROJECT", "SET_ACTIVE_TALENT"]),
    redraw() {
      if (typeof this.$redrawVueMasonry === "function") {
        this.$redrawVueMasonry();
      }
    },
    getYouTubeEmbedUrl(youtubeUrl) {
      // Extract YouTube video ID from the URL
      const videoId = youtubeUrl.split("v=")[1];
      // Generate the YouTube embed URL with autoplay, mute, loop, and hide controls on hover parameters
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0`;
    },
    getVimeoEmbedUrl(vimeoUrl) {
      // Extract Vimeo video ID from the URL
      const videoId = vimeoUrl.split("/").pop();
      // Generate the Vimeo embed URL
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0`;
    },
    beforeDestroy() {
      // Remove the resize event listener when the component is destroyed
      window.removeEventListener("resize", this.handleResize);
    },
    hover(item) {
      if (item.reference.title) {
        this.SET_ACTIVE_PROJECT(item.reference);
        if (this.size == "small") {
          this.SET_ACTIVE_TALENT(item.reference);
        } else {
          this.SET_ACTIVE_TALENT(item.reference.talentId);
        }
      } else {
        this.SET_ACTIVE_PROJECT(false);
      }
    },
    leave() {
      this.SET_ACTIVE_PROJECT(false);
      this.SET_ACTIVE_TALENT(false);
    },
  },
};
</script>
<style scoped>
/* @media (min-width: 768px){
  .masonry.large .item.double {
    height: 55vh;

}
} */

.blur {
  filter: blur(5px);
}
</style>
