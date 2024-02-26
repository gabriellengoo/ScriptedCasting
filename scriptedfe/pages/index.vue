<template>
   <div class=" ">
    <div><h1 class="titleText flex w-screen justify-between items-center text-[12rem] text-center uppercase">Scripted<p class="text-5xl p-3">Casting by Coralie</p></h1></div>

<!-- <div class="md:pr-6" :class="home.meta ? 'md:w-7/16' : 'w-full'"> -->
  <Grid2 class="imagemarquee" size="small" :items="home.grid2"></Grid2>
<!-- </div> -->

</div> 
</template>


<script>
import { groq } from '@nuxtjs/sanity'
import { mapState, mapActions } from 'vuex'
// import AboutPage from '~/components/AboutPage.vue'

export default {

  name: 'IndexPage',
  data() {
    return {
      project: false,
      abouts: [],
      index: 1,
      realIndex: 0,
      step: 0,
      isBlueBoxActive: false,
      contentContainerStyle: {},
      scrolled: false,
      back: false,
      abouts: [],
      activeStyle: { textDecoration: "none" },
    }
  },

  scroll() {
    if (this.project.slider) {
      this.scrolled = !this.scrolled;
      const gsap = this.$gsap;
      let height = this.$refs["footer"].offsetHeight;
      if (this.scrolled) {
        gsap.to(this.$refs["container"], { y: -height });
      } else {
        gsap.to(this.$refs["container"], { y: 0 });
      }
    }
  },

  async asyncData({ $sanity, store }) {
    const homeQuery = groq`*[_type == "home" ]  {..., listImage,} {..., 
     
     grid[] {_key, spacer, "video" : 
    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
      "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
    title, photographer,year,hair,styleing, link, production, location,
      "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "team" : reference->team, "meta" : reference->meta}} } 
     
      {..., grid2[] {_key, spacer, thumbnailTime, "video" : 
    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
      "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
    title, photographer,year,imageWidth,hair,makeup,dop,set,styleing, link, production, location, listImage, draft,
      "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "team" : reference->team, "meta" : reference->meta}} } 
     
    {...,meta[]{
      title,
      content,
    }}

    {...,metaemails[]{
      title,
      content,
      link,
     
    }}


      {...,
        sections[]{
          title,
          subtitle,
          content,
        }
      }
      
      | order(_updatedAt desc)[0]
      `;

      const home = await $sanity.fetch(homeQuery);

      // Commit meta and metaemails to the Vuex store
      store.commit('setMeta', home.meta);
      store.commit('setMetaEmails', home.metaemails);
      store.commit('setThumbnailTime', home.thumbnailTime);
      // store.commit('setYear', home.year);

      return { home };
  },



 

  methods: {
    ...mapActions(['setTitle']),
    setProject(reference) {
      this.project = reference
    },

    openGallery() {
      this.$store.commit('setGalleryState', true); // Set gallery state as open
    },
    closeGallery() {
      this.$store.commit('setGalleryState', false); // Set gallery state as closed
    },
    toggleBlueBox() {
      // Toggle the blue box visibility
      this.isBlueBoxActive = !this.isBlueBoxActive;

      // Update the content container position
      this.updateContentContainerPosition();

      if (this.isBlueBoxActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    updateContentContainerPosition() {
      const isMobile = window.innerWidth <= 768;
      // Calculate the offset based on blue box height
      const offset = isMobile ? (this.isBlueBoxActive ? "100vh" : "0") : (this.isBlueBoxActive ? "365px" : "0");

      // Calculate the offset based on whether it's a mobile screen or not

      // Set the content container position
      this.contentContainerStyle = {
        transform: `translateY(${offset})`,
      };
    },

  },
  created() {
    this.setTitle(this.home.title)
  },
}
</script>




<style scoped>
.titleText{
  z-index: 10000 !important;
  font-weight: bolder;
  color: whitesmoke;
  /* color: #2a2a2a; */
  left: 50%;
    top: 50%;
    /* width: 100vw; */
    transform: translate(-50%, -50%);
    position: absolute;
}

.imagemarquee{
  z-index: 10 !important;
}
/* header {  
  animation: 1.5s ease-out 0s 1 slideInFromLeft;
} */

/* .item {
  width: 33.3333%;
} */

</style>
