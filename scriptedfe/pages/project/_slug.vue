<template>
  <div class="secheight relative min-h-screen md:h-screen overflow-y-hidden md:overflow-hidden" ref="secheight">
    <section
      class="
        absolute
        top-0
        z-10
        hidden
        w-full
        h-full
        md:block md:relative md:overflow-hidden
       overflow-y-hidden
      "
      ref="container"
    >
      <div
        class="
          relative
          top-0
          left-0
          z-50
          flex flex-col
          items-start
          justify-end
          h-full
          p-2
          pointer-events-none
        "
      >
        <header class="absolute top-0 right-0 hidden p-2 text-xs md:block">
          <span v-if="project.slider"
            >{{ String(index).padStart(2, '0') }}/{{
              String(project.slider.length).padStart(2, '0')
            }}</span
          >
        </header>
        <div ref="skew">
          <ProjectSkew
            class="hidden md:flex"
            :meta="project.meta"
            :title="project.title"
            :talent="project.talent"
          ></ProjectSkew>
        </div>
      </div>
      <footer
        class="absolute bottom-0 left-0 z-50 hidden w-full text-xs md:flex"
      >
        <div class="p-2 normal-case min-w-1/16" v-if="project.talent">
          {{ project.talent }}
        </div>
        <NuxtLink
          v-if="project.talent"
          class="hidden p-2 uppercase md:block"
          :to="`/artists/${project.talentSlug}`"
          >Bio</NuxtLink
        >
        <NuxtLink
          v-if="project.talent"
          class="hidden p-2 uppercase md:block"
          :to="`/overview/${project.talentSlug}`"
          >Overview</NuxtLink
        >
        <!-- <button
          class="p-2 uppercase"
          @click="scroll"
          v-if="project.related.length"
        >
          <span v-if="scrolled">Close</span
          ><span v-else>
            <span class="md:hidden">See more</span>
            <span class="hidden md:block">Overview</span>
          </span>
        </button> -->
      </footer>
      <section
        class="absolute top-0 left-0 hidden w-full bg-white md:block slider"
        v-swiper:mySwiper="swiperOptions"
        @slideChange="onSlideChange"
        ref="slider"
      >
        <button
          class="absolute top-0 left-0 z-30 w-1/2 h-full previous"
          :class="back ? '' : 'disabled'"
          @click="prev"
          ref="prev"
          aria-label="Previous"
        ></button>
        <button
          class="absolute top-0 right-0 z-30 w-1/2 h-full next"
          @click="next"
          aria-label="Next"
        ></button>

        <div
          class="relative z-40 w-full h-full pointer-events-none swiper-wrapper"
        >
          <div
            v-for="(slide, index) in project.slider"
            :key="slide._key"
            class="
              flex
              justify-end
              w-full
              h-full
              transition-opacity
              duration-300
              swiper-slide
            "
            :class="realIndex == 0 ? 'opacity-95' : ''"
          >
            <div class="flex justify-end float-right h-full p-2 pb-0 w-13/16">
              <figure
                v-for="image in slide.images"
                :key="image._key"
                class="flex flex-col flex-1 w-full h-full"
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
                  class="w-auto h-full"
                  :class="
                    image.padding
                      ? 'object-contain'
                      : 'object-contain max-w-full'
                  "
                  :sizes="'sm:200vw md:150vw lg:200vw'"
                ></MediaImage>
                <MediaVideoPlay
                  :id="image.video.id"
                  :active="realIndex == index ? true : false"
                  v-else-if="image.video.id"
                  :thumbTime="image.video.thumbTime" 
                  class="
                    relative
                    object-cover object-center
                    w-full
                    h-auto
                    p-4
                    my-auto
                   max-h-[90vh] 
                  "
                ></MediaVideoPlay>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </section>
    <MobileImages
      :images="project.slider"
      class="min-h-screen md:hidden"
      :project="project"
    ></MobileImages>

 
    <div
      class="
        sticky
        bottom-0
        z-10
        w-full
        p-2
        pt-0
        transition-transform
        duration-300
        transform
        bg-white
        md:hidden
      "
      
    >
      <footer
        class="
          absolute
          top-0
          left-0
          flex
          items-start
          w-full
          mt-px
          text-sm
          leading-none
          transform
          -translate-y-full
          bg-white
          md:text-xs
        "
      >
        <div class="p-2 normal-case w-4/16" v-if="project.talent">
          {{ project.talent }}
        </div>

        <NuxtLink
          v-if="project.talent"
          :to="`/artists/${project.talentSlug}`"
          class="p-2 pl-1 pr-12 -mt-2 md:pr-2 md:mt-0 md:hidden"
          @click="scroll"
        >
          <span
            class="text-4xl md:uppercase font-heading md:text-xs md:font-body"
            >Bio</span
          >
        </NuxtLink>
        <NuxtLink
          v-if="project.talent"
          class="text-4xl md:uppercase font-heading md:text-xs md:font-body"
          :to="`/overview/${project.talentSlug}`"
          >Overview</NuxtLink
        >
  
      </footer>
     
    </div>
  </div>
</template>
<script>
import { groq } from '@nuxtjs/sanity'
import { mapMutations } from 'vuex'
export default {
  async asyncData({ params, $sanity }) {
    const query = groq`*[_type == "project" && slug.current == "${params.slug}" ] {..., slider[] {fullWidth, images[] {..., "video" : {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio, "thumbTime" : video.asset->thumbTime}}}, "talent" : talent->title, "talentSlug" : talent->slug.current, "footer" : footer, "talentBio" : talent->shortBio, "nextProject" : nextProject->slug.current,
    "related": *[_type=='project' && references(^.talent._ref) && _id != ^._id]{ _id, title, meta, "slug" : slug.current }
     } | order(_updatedAt desc)[0]`
    const project = await $sanity.fetch(query)
    return { project }
  },
  data() {
    return {
      index: 1,
      realIndex: 0,
      step: 0,
      swiperOptions: {
        slidesPerView: 'auto',
        keyboard: {
          enabled: true,
        },
      },

      // scrolled: false,
      back: false,
    }
  },
  created() {
    if (
      this.$nuxt.context.from &&
      this.$nuxt.context.from.name == 'project-slug'
    ) {
      this.back = true
    }
  },
  mounted() {
   // Set footer using SET_FOOTER mutation
   this.SET_FOOTER(this.project.footer);

  },
  methods: {
    onSlideChange(swiper) {
      this.index = swiper.activeIndex + 1
      this.realIndex = swiper.activeIndex
      const gsap = this.$gsap
      if (swiper.activeIndex == 0 && !this.back) {
        this.$refs['prev'].classList.add('disabled')
      } else {
        this.$refs['prev'].classList.remove('disabled')
      }
      if (this.index > 1) {
        gsap.to(this.$refs['skew'], { x: '-150%' })
      } else {
        gsap.to(this.$refs['skew'], { x: '0%' })
      }
    },
    // scroll() {
    //   if (this.project.slider) {
    //     this.scrolled = !this.scrolled
    //     const gsap = this.$gsap
    //     let height = this.$refs['footer'].offsetHeight
    //     if (this.scrolled) {
    //       gsap.to(this.$refs['container'], { y: -height })
    //     } else {
    //       gsap.to(this.$refs['container'], { y: 0 })
    //     }
    //   }
    // },
    next() {
      if (this.mySwiper.isEnd) {
        if (this.project.nextProject) {
          this.$router.push(`/project/${this.project.nextProject}`)
        } else {
          this.mySwiper.slideTo(0)
        }
      } else {
        this.mySwiper.slideNext()
      }
    },
    prev() {
      if (this.mySwiper.isBeginning && this.back) {
        this.$router.go(-1)
      } else {
        this.mySwiper.slidePrev()
      }
    },

  
    ...mapMutations(['SET_FOOTER']),
  },
}
</script>
<style scoped>
.swiper-wrapper {
  z-index: 40 !important;
}
.next {
  cursor: e-resize;
  mix-blend-mode: difference;
}
.previous {
  cursor: w-resize;
  mix-blend-mode: difference;
  &.disabled {
    @apply pointer-events-none;
  }
}
.slider {
  height: calc(100% - 0.5rem);
}

canvas {
    display: none !important;
}
</style>
