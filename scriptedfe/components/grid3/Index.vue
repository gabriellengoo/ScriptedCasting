<template>
  <client-only>
    <!-- class="marquee2" -->
    <Marqueec>
    <div class="images_marquee_wrapper ">
      <div
        v-masonry
        column-width=".item"
        item-selector=".item"
        class="w-full marquee2"
        :class="size"
        horizontal-order="true"
      >
      
        <div
          v-masonry-tile
          class="item marquee2"
          v-for="item in items"
          :key="item._key"
        >
        
          <figure class="md:p-20 p-10">
            <NuxtLink
              v-if="item.reference.slug"
              :to="`/work/${item.reference.slug}`"
            >
              <span>
                <figure                     :style="{
   height: `80vh`,
 }">
                  <MediaImage
                    :size="item.image.size"
                    :aspect="item.image.aspect"
                    :style="{
   
   height: `inherit`,
 }"
                    :src="item.image.image"
                    v-if="item.image.image"
                  ></MediaImage>
                  <MediaVideo
                  class="vidsize"
                    :id="item.video.id"
                    :style="{
   
   height: `inherit`,
 }"
                    v-if="item.video.id"
                  ></MediaVideo>
                               <!-- Render YouTube Video -->
        <iframe
          v-else-if="item.youtubeUrl"
          :src="getYouTubeEmbedUrl(item.youtubeUrl)"
          frameborder="0"
          :style="{
   
   height: `inherit`,
 }"
          allowfullscreen
          class="vidsize"
        ></iframe>

        <!-- Render Vimeo Video -->
        <iframe
          v-else-if="item.vimeoUrl"
          :src="getVimeoEmbedUrl(item.vimeoUrl)"
          frameborder="0"
          :style="{
   
   height: `inherit`,
 }"
          allowfullscreen
          class="vidsize"
        ></iframe>
                </figure>
                <!-- <figcaption v-if="size == 'small'">
                  <span v-if="item.title">{{ item.title }}</span>
                  <span v-else>{{ item.reference.title }}</span>
                </figcaption> -->
              </span>
            </NuxtLink>
            <a v-else-if="item.link" :href="item.link" target="_blank">
              <span>
                <MediaImage
                  :size="item.image.size"
                  :aspect="item.image.aspect"
                  :style="{     
                          height: `100vh`,
                        }"
                  :src="item.image.image"
                  v-if="item.image.image"
                ></MediaImage>
                <MediaVideo
                class="vidsize"
                  :id="item.video.id"
                  :style="{     
                          height: `100vh`,
                        }"
                  v-if="item.video.id"
                ></MediaVideo>
                             <!-- Render YouTube Video -->
        <iframe
          v-else-if="item.youtubeUrl"
          :src="getYouTubeEmbedUrl(item.youtubeUrl)"
          frameborder="0"
          allowfullscreen
          class="dubvid object-contain object-top w-auto h-full"
        ></iframe>

        <!-- Render Vimeo Video -->
        <iframe
          v-else-if="item.vimeoUrl"
          :src="getVimeoEmbedUrl(item.vimeoUrl)"
          frameborder="0"
          allowfullscreen
          class="dubvid object-contain object-top w-auto h-full"
        ></iframe>
                <!-- :style="`aspect-ratio: ${item.video.aspect.replace(':', '/')}`" -->
                <!-- <figcaption v-if="size == 'small'">
                  <span v-if="item.title">{{ item.title }}</span>
                  <span v-else>{{ item.reference.title }}</span>
                </figcaption> -->
              </span>
            </a>
            <figure v-else >
              <span>
                <MediaImage
                  :size="item.image.size"
                  :aspect="item.image.aspect"
                  :style="{     
                          height: `100vh`,
                          padding: `5vw !important`,
                        }"
                  :src="item.image.image"
                  v-if="item.image.image"
                ></MediaImage>
                <MediaVideo
                  :id="item.video.id"
                  class="vidsize"
                  :style="{     
                          height: `100vh`,
                          padding: `5vw !important`,
                        }"
                  v-if="item.video.id"
                ></MediaVideo>
                             <!-- Render YouTube Video -->
        <iframe
          v-else-if="item.youtubeUrl"
          :src="getYouTubeEmbedUrl(item.youtubeUrl)"
          frameborder="0"
          allowfullscreen
          class="dubvid object-contain object-top w-auto h-full"
        ></iframe>

        <!-- Render Vimeo Video -->
        <iframe
          v-else-if="item.vimeoUrl"
          :src="getVimeoEmbedUrl(item.vimeoUrl)"
          frameborder="0"
          allowfullscreen
          class="dubvid object-contain object-top w-auto h-full"
        ></iframe>
                <!-- <figcaption v-if="size == 'small'">
                  <span v-if="item.title">{{ item.title }}</span>
                  <span v-else>{{ item.reference.title }}</span>
                </figcaption> -->
              </span>
            </figure>
          </figure>
        
        </div>
    
      </div>
    </div>
  </Marqueec>
  </client-only>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  props: ['items', 'size'],
  data() {
    return {
      project: false,
      isDesktop: false,
    };
  },
  computed: {
    ...mapState(['activeProject', 'activeTalent']),
  },
  mounted() {
    this.isDesktop = window.innerWidth > 768;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    ...mapMutations(['SET_ACTIVE_PROJECT', 'SET_ACTIVE_TALENT']),
    handleResize() {
      this.isDesktop = window.innerWidth > 768;
    },
    redraw() {
      if (typeof this.$redrawVueMasonry === 'function') {
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
      const videoId = vimeoUrl.split('/').pop();
      // Generate the Vimeo embed URL
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0`;
    },
    hover(item) {
      if (item.reference.title) {
        this.SET_ACTIVE_PROJECT(item.reference);
        if (this.size == 'small') {
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

.img{
  padding: 5vw !important;
}
/* @media (min-width: 768px){
  .masonry.large .item.double {
    height: 55vh;

}
}

.marquee-container {
  white-space: nowrap;
  animation: marquee 20s linear infinite; 
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
} */



.masonry {
  height: 100vw;
    display: flex;
    flex-direction: row;
}
 
.images_marquee_wrapper {
  height: 90vh;
    padding-bottom: 5vh;
  /* justify-content: center; */
  max-width: 100%;
  /* height: 100vh ; */
  display: flex;
  /* -webkit-animation: 0.75s ease 0s normal forwards 1 fadein;
  animation: 0.75s ease 0s normal forwards 1 fadein; */
  /* z-index: -1 !important; */
  /* animation: marquee2 3000s linear infinite;
  animation: marquee2 10 steps(340);  */
}

@keyframes fadein{
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}

.marquee2 {
  /* width: 40vw; */
  display: flex;
  gap: 0;
  /* animation: marquee2 500s linear infinite; */
}

.marquee2.paused {
  animation-play-state: paused;
}

@keyframes marquee2 {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-3400%, 0, 0);
  }
}

.vidsize{
  max-width: fit-content !important;
}

.item {
  /* height: 100vh;  */
  box-sizing: border-box;
  display: contents;
  /* Remove the following two lines */
  /* flex: 0 0 auto; */
  /* margin-right: 16px; */
}

@media (max-width: 768px) {
img{
  height: 29vh !important;
  width: auto;
}


.images_marquee_wrapper{
  /* height: auto !important; */

  height: 40vh;
  /* height: 29vh !important; */
  /* animation: none !important; */
}
}
/* .item {
  height: 100vh; 
  box-sizing: border-box;
  flex: 0 0 auto; 
  margin-right: 16px; 
} */

</style>