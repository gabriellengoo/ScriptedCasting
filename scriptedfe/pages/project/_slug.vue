<template>
  <!-- md:h-screen -->
  <div class="relative md:min-h-fit md:overflow-hidden">
    <!-- <Headerproject /> -->

    <div class="mobileslugtitle hidden w-screen fixed md:flex justify-end text-[1.525rem]">
      <button class="  z-50 px-4 py-8" @click="goBack">
      Back
    </button>
    </div>

   

    <section>
      <!-- <div class="h-screen fixed z-[10]"     v-if="isGalleryExpanded"   @keydown="handleKeyDown" >
              <button v-if="isGalleryExpanded"
                            tabindex="0"
                            class=" backbtn top-0 left-0 z-30 w-1/2 h-full text-black back text-4xl previous"
                            @click="prev"
                            autofocus
                            aria-label="Previous"
                          >
                          &lt; </button>
              <button v-if="isGalleryExpanded"
                        tabindex="0"
                        class="nextbtn z-[100000] pointer-events-auto w-1/2 h-full text-black next text-4xl"
                        @click="next"
                        aria-label="Next"
                      >
                        >
                      </button>
              </div> -->
      <!-- pt-28 -->
      <div class="bottom-div p-2 xl:pt-[18rem] 2xl:pt-[14rem]">
        <div
          v-if="project"
          class="ml-auto text-lg uppercase lg:text-xl md:text-xl font-heading w-full flex justify-center"
        >
        <!-- fixed -->
          <div
            class="titles mobiletitle  z-[10] justify-between w-full flex items-end"
          >
      
            <!-- text-[14.21px] -->
            <!-- <About/> md:w-4/6-->
            <div
              class="projectetxt inner-div pl-[1.5rem] textppad pb-5 top-[0vh]  w-screen projecttextmb"
              id="titleInnerDiv"
            >
            <div class="mobileslugtitle md:hidden flex ">
      <button class="  z-50  pb-8 pt-0" @click="goBack">
      Back
    </button>
    </div>

              <div class="pb-5 mobileslugtitle">{{ project.title }}</div>
                <!-- flex justify-between -->
            <div class="">
              <div
                v-if="project.related"
                :class="{ 'projecttextarea': true, 'pt-5': meta.title }"
                class=" projecttextarea  justify-between md:justify-normal  flex  normal-case"
                v-for="meta in project.meta"
              >
              <!-- v-if="meta.title" uppercase -->
                <div class="projecttextareati md:w-1/6 ">
                  {{ meta.title }} 
                  <!-- <span v-if="meta.title"> : </span> -->
                </div>
               <!-- brake -->
               <!-- <br> pt-5-->
                <div class="pb-1 mobileprotext">
                  {{ meta.content }}
                </div>
              </div>
            </div>
              <div v-if="project.location" class="pt-3">
                <div class="flex flex-col normal-case">
                  {{ project.location }}
                </div>
              </div>

              <button
                v-if="isGalleryExpanded"
                @click="closeImageModal"
                class="block close-button leading-5"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <!-- non scroll copy -->
        <!-- pt-48 -->
        <div
          class="md:pr-6 md:w-7/16 scroll-container resize-animation"
          ref="scrollContainer"
        >
          <!-- md:p-5             :style="{ width: `calc(${slide.imageWidth}vw - 20px)` }"
-->

          <div
            v-for="(slide, index) in project.slider"
            :key="slide._key"
            class="gallmobile insidescrollcont"
          >
            <figure
              v-for="image in slide.images"
              :key="image._key"
              @click="openImageModal(index)"
              style="cursor: pointer"


            >
              <MediaImage
                ref="scrollContainer resize-animation"
                :src="image.image.asset._ref"
                v-if="image.image"
                class="scrollcost"
                :style="{ width: `30vw`,  height: `25vh`, }"
              >
              </MediaImage>
              <MediaVideo
                :id="image.video.id"
                :active="realIndex == index ? true : false"
                v-else-if="image.video.id"
                :style="{ width: `30vw`,  height: `25vh`, }"
                :poster="`https://image.mux.com/${
                  image.video.id
                }/thumbnail.jpg?time=${image.thumbnailTime || 0}`"
                class="scrollcost resize-animation object-contain object-top w-auto h-full"
              ></MediaVideo>
              <!-- Display YouTube Video -->
              <iframe
                v-else-if="image.youtubeUrl"
                :src="getYouTubeEmbedUrl(image.youtubeUrl)"
                frameborder="0"
                allowfullscreen
                :style="{ width: `30vw`,  height: `25vh`, }"
                class="scrollcost youtube resize-animation object-contain object-top w-auto h-full"
              ></iframe>
              <!-- Display Vimeo Video -->
              <iframe
                v-else-if="image.vimeoUrl"
                :src="getVimeoEmbedUrl(image.vimeoUrl)"
                frameborder="0"
                allowfullscreen
                :style="{ width: `30vw`,  height: `25vh`, }"
                class="scrollcost youtube resize-animation object-contain object-top w-auto h-full"
              ></iframe>
            </figure>
          </div>
        </div>
      </div>

      <!-- Image Overlay Gallery -->
      <div class="block">
        <div
          v-if="isGalleryExpanded"
          class="overlay-gallery"
          ref="overlayGallery"
          @mouseenter="showGalleryOnHover"
          @mouseleave="hideGalleryOnLeave"
        >
          <div class="gallery-content">
            <div class="gallery-images">
              <section
                class="top-0 left-0 hidden w-full md:block cursor-grab slider"
                v-swiper:mySwiper="swiperOptions"
                @slideChange="onSlideChange"
                ref="slider"
              >
                <div class="relative z-40 w-full h-full swiper-wrapper">
                  <div
                    v-for="(slide, index) in project.slider"
                    :key="slide._key"
                    class="flex justify-center w-full h-full transition-opacity duration-300 swiper-slide"
                    :class="realIndex == 0 ? '' : ''"
                  >
                    <div class="overlaycont flex h-full p-2 pb-0 w-13/16">
                      <figure
                        v-for="image in slide.images"
                        :key="image._key"
                     
                        class="overlaydiv flex flex-col flex-1 w-full h-full"
                        :class="
                          image.padding
                            ? image.padding == 'medium'
                              ? 'p-12 pr-10'
                              : image.padding == 'large'
                              ? 'p-20 pr-18'
                              : 'p-8 pr-6'
                            : ''
                        "
                      >
                        <MediaImage
                          :src="image.image.asset._ref"
                          v-if="image.image"
                          class="gallery-image w-auto h-full"
                          :class="
                            image.padding
                              ? 'object-contain'
                              : 'object-contain max-w-full'
                          "
                          :style="{
                            pointerEvents: 'auto',
                            width: `30vw`,
                              height: `25vh`,
                          }"
                         
                          :sizes="'sm:200vw md:150vw lg:200vw'"
                        ></MediaImage>
                        <MediaVideo
                          :id="image.video.id"
                          :active="realIndex == index ? true : false"
                          v-else-if="image.video.id"
                          :poster="`https://image.mux.com/${
                            image.video.id
                          }/thumbnail.jpg?time=${image.thumbnailTime || 0}`"
                          :style="{
                            pointerEvents: 'auto',
                            width: `30vw`,
                              height: `25vh`,
                          }"
                          @click="handleVideoClick(image.video.id)"
                          class="gallery-image relative object-cover object-center z-[10000000] w-full h-auto p-4 my-auto"
                        ></MediaVideo>
                        <!-- Display YouTube Video -->
                        <iframe
                          v-else-if="image.youtubeUrl"
                          :src="getYouTubeEmbedUrl(image.youtubeUrl)"
                          frameborder="0"
                          :style="{
                               width: `30vw`,
                                 height: `25vh`,
                               
                          }"
                          allowfullscreen
                          class="gallery-image relative object-cover object-center z-[10000000] w-full h-auto p-4 my-auto"
                        ></iframe>
                        <!-- Display Vimeo Video -->
                        <iframe
                          v-else-if="image.vimeoUrl"
                          :src="getVimeoEmbedUrl(image.vimeoUrl)"
                          frameborder="0"
                          allowfullscreen
                          :style="{
                               width: `30vw`,
                                 height: `25vh`,
                              
                          }"
                          class="gallery-image relative object-cover object-center z-[10000000] w-full h-auto p-4 my-auto"
                        ></iframe>
                      </figure>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
import { mapMutations, mapState } from "vuex";
// import Header from "~/components/layout/Header.vue";
// import About from "~/components/Aboutpage.vue";
// import Lenis from '@studio-freight/lenis';
// import Headerproject from "~/components/layout/Headerproject.vue";

export default {
  components: {
    // Headerproject,
  },
  async asyncData({ params, $sanity, store }) {
    const query = groq`*[_type == "project" && slug.current == "${params.slug}" ] {
      ..., "archiveSlug": archive->slug.current,
      slider[] {
        fullWidth, imageWidth, overlayimageWidth,thumbnailTime, youtubeUrl,vimeoUrl, images[] {
          ..., "video" : {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio, "thumbTime" : video.asset->thumbTime}
        }
      }, 
      
      "talent" : talent->title, "talentSlug" : talent->slug.current,
      "footer" : footer,
      "talentBio" : talent->shortBio,
      "nextProject" : nextProject->slug.current,
      "related": *[_type=='project' && references(^.talent._ref) && _id != ^._id]{
        _id, title, location, production, meta, metadis, "slug" : slug.current
      }{_id, title, production, meta, metadis, metaemails, "slug" : slug.current},
      "homeMeta": *[_type == "home"] { meta[], metaemails[], sections[], year},
    }
     | order(_updatedAt desc)[0]`;

    const project = await $sanity.fetch(query);

    //    // Debugging: Log the fetched data
    //    console.log('Fetched meta:', project.meta);
    // console.log('Fetched metaemails:', project.metaemails);

    // // Commit meta and metaemails to the Vuex store
    // store.commit('setMeta', project.meta);
    // store.commit('setMetaEmails', project.metaemails);

    return { project };
  },
  data() {
    return {
      index: 1,
      realIndex: 0,
      step: 0,
      imageNumberPosition: { top: 0, left: 0 }, // Initialize position
      isImageModalOpen: false,
      isGalleryExpanded: false,
      isBlueBoxActive: false,
      clickedImageIndex: null, // Initially set to null
      swiperOptions: {
        slidesPerView: "auto",
        keyboard: {
          enabled: true,
        },
      },
      imageOpacity: 1, // Add this property
      scrolled: false,
      back: false,
    };
  },
  computed: {
    ...mapState(["meta", "metaemails"]), // Map Vuex state to local computed properties
  },
  created() {
    if (
      this.$nuxt.context.from &&
      this.$nuxt.context.from.name == "project-slug"
    ) {
      this.back = true;
    }
  },

  mounted() {
    // // Set initial focus on the first button
    // this.$refs.prev.focus();

    // Get a reference to the title's inner div
    // const titleInnerDiv = document.getElementById("titleInnerDiv");

    // Check if the titleInnerDiv exists
    // if (titleInnerDiv) {
      // Get the height of the title's inner div
      // const titleInnerDivHeight = titleInnerDiv.offsetHeight;

      // const isMobile = window.innerWidth <= 768;

      // const scrollContainer = this.$refs.scrollContainer; 

    //   if (isMobile) {
    //     scrollContainer.style.paddingTop = 0 + "px";
    //   } else {
    //     // For non-mobile screens, you can use different padding
    //     scrollContainer.style.paddingTop = titleInnerDivHeight + 10 + "px";
    //   }
    // }

    // const overlay = document.querySelector(".overlay-gallery");
  },
  methods: {
    goBack() {
      // Implement your logic to navigate back
      // For example:
      this.$router.go(-1); // This navigates back in the browser history
    },
    openGallery() {
      this.$store.commit("setGalleryState", true); // Set gallery state as open
    },
    closeGallery() {
      this.$store.commit("setGalleryState", false); // Set gallery state as closed
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
    onSlideChange(swiper) {
      this.index = swiper.activeIndex + 1;
      this.realIndex = swiper.activeIndex;
      const gsap = this.$gsap;
      if (swiper.activeIndex == 0 && !this.back) {
        this.$refs["prev"].classList.add("disabled");
      } else {
        this.$refs["prev"].classList.remove("disabled");
      }
      if (this.index > 1) {
        gsap.to(this.$refs["skew"], { x: "-150%" });
      } else {
        gsap.to(this.$refs["skew"], { x: "0%" });
      }
    },
    handleVideoClick(videoId) {
      // Call the playVideo() method of your MediaVideoPlay component
      this.$refs.mediaVideoPlay.playVideo(videoId);
    },

    showGalleryOnHover() {
      this.$refs.overlayGallery.classList.add("active");
    },

    hideGalleryOnLeave() {
      this.$refs.overlayGallery.classList.add("active");
    },

    openImageModal(index) {
      this.clickedImageIndex = index;
      this.swiperOptions = { ...this.swiperOptions, initialSlide: index };
      this.isGalleryExpanded = true;
    },

    closeImageModal() {
      this.isGalleryExpanded = false;
      this.clickedImageIndex = null;
    },

    updateImageNumberPosition(event) {
      this.imageNumberPosition = {
        top: event.clientY + "px",
        left: event.clientX + "px",
      };
    },
    generateThumbnailURL(imageURL) {
      return imageURL; // Just return the original imageURL for simplicity.
    },
    toggleGallery() {
      this.isGalleryExpanded = !this.isGalleryExpanded;
    },
    onSlideChange(swiper) {},
    scroll() {},
    toggleBlueBox() {
      // Toggle the blue box visibility
      this.isBlueBoxActive = !this.isBlueBoxActive;

      // Update the content container position
      this.updateContentContainerPosition();

      if (this.isBlueBoxActive) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    updateContentContainerPosition() {
      const isMobile = window.innerWidth <= 768;
      // Calculate the offset based on blue box height
      const offset = isMobile
        ? this.isBlueBoxActive
          ? "100vh"
          : "0"
        : this.isBlueBoxActive
        ? "365px"
        : "0";

      // Calculate the offset based on whether it's a mobile screen or not

      // Set the content container position
      this.contentContainerStyle = {
        transform: `translateY(${offset})`,
      };
    },
    handleKeyDown(event) {
      if (event.key === "ArrowLeft" && this.mySwiper.slidePrev()) {
        this.prev();
      } else if (event.key === "ArrowRight") {
        this.next();
      }
    },

    next() {
      if (this.mySwiper.isEnd) {
        if (this.project.nextProject) {
          this.mySwiper.slideTo(0);
        }
      } else {
        this.mySwiper.slideNext();
      }
    },
    prev() {
      if (this.mySwiper.isBeginning && this.back) {
        this.$router.go(-1);
      } else {
        this.mySwiper.slidePrev();
      }
    },

    ...mapMutations(["SET_FOOTER"]),
  },
};
</script>

<style scoped>
.youtube {
  height: 40vh;
  height: 20vh;
}

.mobileslugtitle {
  font-size: 4.25rem /* 36px */;
  line-height: 2.5rem /* 40px */;
  font-family: "GTWalsheimbb";
  z-index: 100000;
}



@media only screen and (min-width: 2560px) {
  .mobileslugtitle {
    font-size: 6.25rem !important;
    line-height: 3.5rem !important;
  }
}
/* header {  
  animation: 1.5s ease-out 0s 1 slideInFromLeft;
} */
.item {
  width: 33.3333%;
}

.date {
  display: flex;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif !important;
}

.content-container {
  width: 100vw !important;
}

.resize-animation {
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out !important;
}

.headposition {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw !important;
  justify-content: center;
  /* padding-top: 1vh; */
  position: fixed;
  position: absolute;
}

.navele {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 98vw !important;
  /* width: 100vw !important; */
  justify-content: space-between;
}

.button {
  /* border-left: .8px solid #000; */
  padding: 0.5vw;
  font-size: 1.25rem;
  /* border-width: 3.9px;
    border-right: black;
    border-left: black; */
}

.buttonlogo {
  padding: 0.5vw;
  padding-left: 0;
  /* border-right: .8px solid #000; */
  /* border-width: 0.9px;
    border-color: rgba(28, 25, 23, var(--tw-border-opacity));
    padding: 10.899999999999999px; */
}

.content-container {
  justify-content: center;
  /* display: flex;
    justify-content: center; */
  /* background: #f7f7f7; */
}

button .circle:hover {
  transform: translate3d(0, -50%, 0) scale(1.5);
}

.circle {
  /* position: absolute; */
  top: 50%;
  right: 15px;
  -webkit-transform: translate3d(0, -50%, 0) scale(0.5);
  transform: translate3d(0, -50%, 0) scale(0.5);
  width: 16px;
  height: 16px;
  line-height: 30px;
  border-radius: 50%;
  background-color: #000;
  transition: -webkit-transform 200ms cubic-bezier(0.54, 0.57, 0, 0.96);
  transition: transform 200ms cubic-bezier(0.54, 0.57, 0, 0.96);
  transition: transform 200ms cubic-bezier(0.54, 0.57, 0, 0.96),
    -webkit-transform 200ms cubic-bezier(0.54, 0.57, 0, 0.96);

  position: relative;
  top: 50%;
  right: 0%;
  transform: translate3d(0, -50%, 0) scale(0.5);
  width: 16px;
  height: 16px;
  /* line-height: 30px; */
  border-radius: 50%;
  background-color: #000;
  transition: transform 200ms cubic-bezier(0.54, 0.57, 0, 0.96);
}

@keyframes slideInFromLeft {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 10.5s;
  transition: height 1s ease, opacity 0.5s ease; /* Add smooth transitions */
}
.fade-enter,
.fade-leave-to {
  opacity: 0 10s;
  transition: height 1s ease, opacity 0.5s ease; /* Add smooth transitions */
}

/* .icon {
    display: inline-flex;
    align-self: center;
}

.icon svg, .icon img {
  height: 7em;
    width: 7em;
    fill: currentColor;
}

.icon.baseline svg, .icon img {
    top: .125em;
    top: 0.9rem;
    top: 2.9000000000000004rem;
    position: relative;
} */

.icon {
  display: inline-flex;
  align-self: center;
  top: 1vh;
  position: relative;
}

/* @media only screen and (min-width: 768px) and (max-width: 1024px) {
  .icon {
    display: inline-flex;
    align-self: center;
    top: 1.5vh;
    position: relative;
}
} */

@media only screen and (min-width: 2560px) {
  .icon {
    display: inline-flex;
    align-self: center;
    top: 0.5vh !important;
    position: relative;
  }

  .lgscpad {
    padding-top: 2vh !important;
  }
}

.lgscpad {
  padding-top: unset;
}

.icon svg,
.icon img {
  height: 2em;
  width: 5em;
  fill: currentColor;
}

.icon.baseline svg,
.icon img {
  top: 0.125em;
  top: 0.9rem;
  top: 2.9000000000000004rem;
  top: -0.9em;
  /* top: 2.9000000000000004rem; */
  /* top: 0; */
  position: relative;
}
/* header{
  background-color: #ffffff00;
  pointer-events: none;
} */
/* Add styles for the blue box */
.blue-box {
  position: relative;
  /* top: 0;
  left: 0;
  width: 100%;
  height: 0; */
  top: -2vh;
  /* left: -2vw; */
  width: 110%;
  height: 0;
  /* background-color: #212121; */
  background-color: #d2d2d2;
  /* border: 0.5px solid #212121; */
  /* #d2d2d2; */
  /* border: 1.5px solid #11ff00; */
  /* background-color: rgb(14, 14, 53);  */
  /* opacity: 0; */
  transition: height 1s ease, opacity 0.5s ease; /* Add smooth transitions */
  pointer-events: none; /* Disable pointer events when hidden */
  /* z-index: 100; */
  z-index: 100002;
  overflow: hidden;
}

.blue-box div {
  position: relative;
  transition: height 1s ease, opacity 0.5s ease; /* Add smooth transitions */
  /* font-size: 1.125rem; */
  z-index: 100002;
  /* line-height: 1.375rem; */
  /* height: 365px; */
  will-change: auto;
  padding-bottom: 0.5vh;
  /* min-height: 365px; */
  /* height: fit-content; */
}

.text {
  /* color:  #f7f7f7; */
  color: #212121;
  font-size: 1.125rem;
  line-height: 1.375rem;
  transition: height 1s ease, opacity 0.5s ease; /* Add smooth transitions */
}
.white-box {
  position: fixed;
  /* position: relative; */
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  width: 100vw;
  height: 200vh !important;
  max-height: 200vh;
  /* height: 0; */
  opacity: 0;
  pointer-events: none;
  /* background: rgba(255, 255, 255, 0.357); */
  background: rgba(255, 255, 255, 0.82);
  /* -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px); */
  transition: opacity 1s ease; /* Add smooth transitions */
  z-index: -10;
}

/* .blue-box.active::after {
  content: 'hhhhh ';
  transition: height 1s ease, opacity 0.5s ease;
} */

.textppad {
  /* font-family: "GTWalsheimbb"; */
  /* font-size: 2rem;
  line-height: 2rem; */
  font-size: 1.5rem;
  line-height: 1.5rem;
}
/* Add styles for the active blue box */
.blue-box.active {
  height: 365px;
  /* height: fit-content; */
  min-height: fit-content;
  /* height: fit-content; */
  /* opacity: 1; */
  background-color: #d2d2d2;
  /* background-color: blue; */
  /* border-bottom: 0.5px solid #212121; */
  z-index: 100002;
  pointer-events: auto; /* Enable pointer events when visible */
  /* display: flex;
    align-items: center;
    justify-content: center; */
  font-size: 1.1vw;
  will-change: auto;
  overflow: hidden;
  /* min-height: 365px; */
  width: 100vw;
  max-width: 100vw;
}

.mobile {
  display: none;
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  /* Your tablet-specific styles here */
  svg {
    width: 16vw !important;
  }
  .icon svg,
  .icon img {
    height: 2em;
    width: 8vw !important;
    fill: currentColor;
  }
}

@media (max-width: 768px) {
  .projecttextarea{
  font-size: 1.7rem ;
  line-height: 1.7rem ;
}

  .text {
    padding: 10px;
  }
  .textppad {
    padding-left: 1rem;
  }

  .textbpad {
    padding-left: 0rem;
  }

  .mobile {
    display: contents;
  }

  .content-container {
    position: fixed;
    width: 100vw !important;
    background-color: #f7f7f7;
    border-bottom: 0.8px solid #000;
    /* border-top: 1px solid #11ff00; */
  }
  .blue-box.active {
    height: fit-content;
    height: 100vh;
    height: 103vh;
  }

  .blue-box {
    position: relative;
    top: 0 !important;
    left: 0 !important;
    width: 110%;
    height: 0;
    /* background-color: #212121; */
  }

  svg {
    width: 26vw;
  }

  .white-box {
    position: fixed;
  }
  .headposition {
    padding-top: 0vh;
  }

  .blue-box {
    top: 0vh;
    /* left: -2vw; */
    width: 110%;
    height: 0;
    /* transition: none; */
    /* background-color: #212121; */
  }

  .blue-box div {
    /* height:100vh; */
    /* padding: 10px; */
    /* padding-top: 0vh; */
  }

  .navelemb {
    /* padding: 1vw; */
    padding: 1.25rem;
    width: 100vw;
  }

  .mobilemenu {
    padding: 1.25rem;
    border-bottom: 0.8px solid #000;
  }

  header {
    position: fixed;
    width: 100vw;
    background-color: #f7f7f7;
  }
}

@media screen and (max-width: 1023px) {
  /* Your CSS styles for screens smaller than 1024px go here */
  /* For example, you can change the font size or layout */
  .textppad {
    padding-left: 1rem;
  }

  /* .textbpad{
  padding-left: .05vw;
} */
  .blue-box.active {
    height: 100vh;
  }

  /* svg{
  width: 18vw;
} */
  .blue-box {
    top: 0;
  }
  .mobile {
    display: contents;
  }

  .headposition {
    display: none;
  }

  .mobilemenu {
    border-bottom-width: 0.95px;
    border-color: rgba(28, 25, 23);
    padding-left: 1.5vw;
    padding-right: 1.5vw;
  }

  .mobilemenupad {
    padding: 0.5vw;
    font-size: 1.25rem;
  }
}

.white-box.active {
  height: 100vh; /* Adjust the height as needed */
  width: 100vw;
  opacity: 1;
  pointer-events: auto; /* Enable pointer events when visible */
}

/* Add styles for the content container */
.content-container {
  transition: transform 1s ease; /* Add smooth transition for content movement */
  /* font-size: 1.125rem !important; */
}

/* Add this style to your CSS */
.underline {
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.underline:after {
  content: "";
  position: absolute;
  left: 0.55rem;
  bottom: 0px; /* Adjust the distance from the text as needed */
  width: 0;
  height: 1.5px; /* Adjust the underline thickness as needed */
  background-color: rgb(0, 0, 0); /* Adjust the underline color as needed */
  transition: width 0.3s ease-in-out; /* You can adjust the duration and timing function as needed */
}

.underline:hover:after,
.underline:focus:after {
  width: 90%;
}

/* end heeader  */
.overlaydiv {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.overlaycont {
  width: 100vw;
  height: 100vh;
}
.scroll-container {
  /* width: 98vw;
  width: 100vw; */
  /* width: 98vw !important; */
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  /*  justify-content: space-between; */
}

.insidescrollcont {
  padding-bottom: 20px !important;
  padding: 0.2rem;
}

@keyframes src-components-animation-2PZg {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
.scroll-container {
  padding: 1vw;
}

.scroll-container > * {
  display: inline-block;
}

.scrollcost {
  /* height: 55vh; */
  /* height: calc(30.33vw - -4px); */
  /* height: calc(27.33vw - -4px);   */
  /* height: calc(37.33vw - -4px); */
  /* width: calc(37.33vw - -4px); */
  width: calc(32.3vw - 4px);
}

.masonry .flex-item {
  margin-right: 200px !important;
  min-width: 350px !important;
}
.masonry .flex-item img {
  max-height: 30vw;
}

.overlay-gallery {
  opacity: 0; /* Initially hidden */
  transition: opacity 0.5s ease;
}

.overlay-gallery.active {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.image-number {
  background: none;
  border: none;
  color: rgb(0, 0, 0);
  font-size: 1.2rem;
  position: absolute;
  /* position: fixed;  */
  right: 0;
  top: 0;
  padding: 20px;
  text-transform: uppercase;
  bottom: 0vh;
  /* left: 97vw; */
  color: rgb(18, 18, 18);
}

.swiper-wrapper {
  /* transition-property: none; */
}

.swiper-container {
  /* cursor: url('https://pngimg.com/uploads/dot/dot_PNG3.png'), auto  !important; */
}

.swiper-wrapper {
  align-items: center;
}

.arrow {
  top: inherit;
  left: 95vw;
}

.overlay-gallery {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255);
  /* background-color: rgb(255 255 255 / 45%); */
  /* backdrop-filter: blur(10px);  */
  transition: backdrop-filter 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  /* z-index: 100; */
  cursor: crosshair;
}

.backbtn {
  left: 37vw;
}

.gallery-content {
  text-align: center;
  color: white;
}

.close-button {
  background: none;
  border: none;
  color: rgb(0, 0, 0);
  font-size: 1.2rem;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 99999;
  padding-left: 0vw !important;
  height: inherit !important;
  /* font-size: 14.21px !important; */
  padding-top: 4vh;
  /* letter-spacing: -1px; */
  /* position: inherit;
    bottom: 0vh;
    padding-bottom: 14vh; */
}

button {
  /* cursor: url('data:image/svg+xml;utf8,<svg height="15" width="15" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>') 15 15,alias; */
  /* cursor: crosshair;
  padding-left: 55vw;
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  height: 80vh;
  width: fit-content; */
}

.nextbtn {
  /* cursor: crosshair;
  padding-left: 55vw;
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  height: inherit;
  width: fit-content; */

  cursor: crosshair;
  padding-left: 15vw;
  /* position: relative; */
  margin-top: auto;
  margin-bottom: auto;
  height: inherit;
  width: -moz-fit-content;
  width: fit-content;

  position: absolute;
  left: 65vw;
}

.backbtn {
  /* cursor: crosshair;
  padding-left: 55vw;
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  height: inherit;
  width: fit-content; */

  cursor: crosshair;
  padding-right: 15vw;
  /* position: relative; */
  margin-top: auto;
  margin-bottom: auto;
  height: inherit;
  width: -moz-fit-content;
  width: fit-content;
  position: relative;
  left: 18vw;
}

.gallery-images {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.gallery-image {
  /* max-width: 45vw;
    max-height: calc(42.33vw - 20px);
    width: 45vw;
    width: calc(34.33vw - 20px);
    margin: 0px; */
  cursor: grab !important;

  padding-top: 20vh;
  padding-bottom: 20vh;
  max-width: 100vw;
  width: calc(55.33vw - 20px);
  align-items: center;
}

@media (min-width: 2560px) {
  .bottom-div {
    padding-top: 21rem !important;
  }

  .textppad {
    padding-left: 3rem;
  }

  .textbpad {
    padding-left: 2.5rem;
  }
}

@media only screen and (min-width: 1440px) and (max-width: 1600px) {
  .textppad {
    padding-left: 2rem;
  }

  .textbpad {
    padding-left: 1.5rem;
  }
}
.scroll-container div img {
  object-fit: cover;
  /* height: 55vh; */
  /* height: auto; */
  object-position: center center;
  /* Add default styles for the image here */
  /* transition: border-radius 0s ease, filter 0s ease; */
  transition: transform 0.35s ease; /* Add the transition property for transform */
}
.scroll-container div img:hover {
  /* transition: opacity .35s ease; */
  /* transition: border-radius 0.5s ease, filter 2s ease; */
  transform: scale(1.01);
  overflow: hidden;
}

/* img{
  object-fit: cover;
} */
.list-layout {
  /* opacity: 1;  */
  margin-top: 2px;
  transition: margin 0.3s ease; /* Add a smooth transition effect */
}

.list-layout img:hover {
  /* opacity: 0.3;  */
  margin-top: 20px; /* Adjust margin as needed for spacing */
  transition: margin 0.3s ease; /* Add a smooth transition effect */
}

.slider {
  height: calc(80% - 0.5rem);
}

.bottom-div {
  padding-top: 14rem;
  transition: padding-top 0.3s ease-in-out, height 0.3s ease-in-out !important;
}

/* section{
  overflow-x: hidden;
  max-width: 100vw !important;
} */

@media screen and (max-width: 1023px) {
  /* Your CSS styles for screens smaller than 1024px go here */
  /* For example, you can change the font size or layout */
  .bottom-div {
    padding-top: 5rem;
    transition: padding-top 0.3s ease-in-out, height 0.3s ease-in-out !important;
  }
}

/* ipad and tablet */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  /* Add your styles here */
  .bottom-div {
    padding-top: 12rem !important;
    transition: padding-top 0.3s ease-in-out, height 0.3s ease-in-out !important;
  }

  /* Other styles for tablets */
}

@media (max-width: 768px) {
  .scrollcost {
  width: 100vw;
}

  .overlay-gallery {
    z-index: 0;
  }

  .bottom-div {
    padding-top: 10rem;
    transition: padding-top 0.3s ease-in-out, height 0.3s ease-in-out !important;
  }
  /*   display: block;
    position: absolute; */

  .scroll-container div img:hover {
    /* transition: opacity .35s ease; */
    /* transition: border-radius 0.5s ease, filter 2s ease; */
    transform: 0;
    overflow: hidden;
  }

  .bottomtextprmb {
    width: 100vw;
    /* display: flex; */
    padding: 0rem !important;
    justify-content: center;
  }

  .bottomtextprmbinn {
    width: 92vw;
    padding-bottom: 1vh;
    padding-left: 3.5vw;
  }

  /* font-size: 1.25rem; */
  .mobileslugtitle {
    padding-bottom: 0.25rem;
    font-size: 2.25rem /* 36px */;
    line-height: 2.5rem /* 40px */;
  }

  .projecttextmb {
    width: fit-content;
    /* font-family: "GTWalsheimb"; */
    /* padding-top: 7rem; */
    padding-left: 1vw;
    font-size: 11.84px;
  }

  .scroll-container div img {
    padding: 0vw;
    width: 92vw !important;
    padding-right: 0vw;
    height: 56vh;
    height: auto;
    overflow-x: hidden;
    align-content: center;
  }

  .scroll-container div img {
    /* display: block; */
    /* position: absolute; */
    /* z-index: 2; */
  }

  figure {
    /* width: 100vw; */
    display: flex;
    padding-right: 0vw;
    /* height: 56vh; */
    overflow-x: hidden;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  .block {
    display: none;
  }

  .gallmobile {
    flex-direction: column;
  }

  .bottom-div {
    position: unset;
    position: relative;
    bottom: auto;
    left: auto;
    width: 100%;
    /* padding: 0px; */
    /* padding-top: 6rem; */
  }

  .scroll-container {
    padding-top: 3vh;
    padding: 0;
  }
  .list-layout {
    /* opacity: 1;  */
    margin-top: 0px;
    transition: margin 0.3s ease; /* Add a smooth transition effect */
  }

  .mobiletitle {
    position: relative;
    /* top: 17vw; */
    background: 0;
    height: fit-content;
    z-index: 1;
    padding: 3vw;
    /* padding-top: 20vh; */
    border-bottom: 0px;
  }

  .mobiletitle {
    /* position: relative !important; */
  }
  .scroll-container {
    /* width: 100%; */
    /* width: 100vw; */
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-x: hidden;
  }

  .scroll-container div img {
    width: 100vw;
    padding-right: 0vw;
    overflow-x: hidden;
  }
}
</style>
