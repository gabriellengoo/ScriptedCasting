<template>
  <client-only>
    <!-- class="marquee2" -->
    <div class="images_marquee_wrapper ">
      <div
        v-masonry
        column-width=".item"
        item-selector=".item"
        class="w-full images_marquee_wrapper"
        :class="size"
        horizontal-order="true"
      >
        <div
          v-masonry-tile
          class="item marquee2"
          v-for="item in items"
          :key="item._key"
        >
          <figure >
            <NuxtLink
              v-if="item.reference.slug"
              :to="`/project/${item.reference.slug}`"
            >
              <span>
                <figure>
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
                        }"
                  :src="item.image.image"
                  v-if="item.image.image"
                ></MediaImage>
                <MediaVideo
                  :id="item.video.id"
                  class="vidsize"
                  :style="{     
                          height: `100vh`,
                        }"
                  v-if="item.video.id"
                ></MediaVideo>
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
  /* justify-content: center; */
  max-width: 100%;
  height: 100vh !important;
  display: flex;
  /* overflow: hidden; */
  /* overflow: scroll; */
  -webkit-animation: 0.75s ease 0s normal forwards 1 fadein;
  animation: 0.75s ease 0s normal forwards 1 fadein;
  z-index: -1 !important;
  animation: marquee2 3000s linear infinite;
  /* animation: marquee2 10 steps(340);  */
}

@keyframes fadein{
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}

.marquee2 {
  width: 40vw;
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
  height: 100vh; 
  box-sizing: border-box;
  display: contents;
  /* Remove the following two lines */
  /* flex: 0 0 auto; */
  /* margin-right: 16px; */
}

/* .item {
  height: 100vh; 
  box-sizing: border-box;
  flex: 0 0 auto; 
  margin-right: 16px; 
} */

</style>