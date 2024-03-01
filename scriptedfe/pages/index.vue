<template>
  <div class=" ">
    <NuxtLink :to="`/projects`">
      <Grid2 class="imagemarquee" size="small" :items="home.grid2"></Grid2>
    </NuxtLink>
    <div>
      <!-- md:pb-5 sm:pb-5  -->
      <div v-if="home.sections" class="pb-0">
<!-- about -->
        <span
          class="aboutsec text-6xl"
          v-for="section in home.sections"
          :key="section._key"
        >
          <div class="pt-[2vw] p-10" v-if="section.title">
            <p class="abouttitle text-6xl">
              <span>{{ section.title }}</span>
            </p>

            <!-- Display other content -->
            <Richtext
              :blocks="section.content"
              v-if="section.content"
            ></Richtext>
<!-- contct -->
            <!-- Display the About Image    v-if="section.image.image"-->
            <div v-if="home.sections2" class="pt-20 flex justify-between">
              <div
                v-for="sections2 in home.sections2"
                :key="sections2._key"
                class="p-5 w-5/12"
              >
                <div class="contactsec">
                  <p v-if="sections2.title2" class="contacttitle justify-start">
                    <span>{{ sections2.title2 }}</span>
                  </p>
                  <Richtext
                    :blocks="sections2.content2"
                    v-if="sections2.content2"
                  ></Richtext>
                </div>
              </div>
              <MediaImage
                :size="section.image.size"
                :aspect="section.image.aspect"
                :src="section.image.image"
                v-if="section.image.image"
                class="h-auto w-7/12"
                :sizes="size == 'sm' ? 'sm:60vw md:15vw' : 'sm:150vw md:150vw'"
              ></MediaImage>
            </div>
<!-- press -->
            <div v-if="home.sections3" class="pt-20 flex justify-end">
              <div
                v-for="sections3 in home.sections3"
                :key="sections3._key"
                class="p-5 w-7/12"
              >
                <div class="presssec">
                  <p v-if="sections3.title3" class="presstitle pb-10 justify-start">
                    <span>{{ sections3.title3 }}</span>
                  </p>
                  <Richtext
                    class="presssectext"
                    :blocks="sections3.content3"
                    v-if="sections3.content3"
                  ></Richtext>
                </div>
                       <!-- Arrow pointing down -->
                       <div class="justify-start arrow-down">
          <i class="fas fa-arrow-down"></i>
        </div>
              </div>
            </div>
          </div>
        </span>
         

        <NuxtLink :to="`/projects`">
          <h1 class="morep w-screen p-10 pt-0 pb-0">View Projects</h1>
        </NuxtLink>

        <Grid3 class="imagemarquee" size="double" :items="home.grid2"></Grid3>
        <!-- <Grid size="small" :items="home.grid2"></Grid> -->
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
import { mapState, mapActions } from "vuex";
import "@fortawesome/fontawesome-free/css/all.css"; 
// import AboutPage from '~/components/AboutPage.vue'

export default {
  name: "IndexPage",
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
    };
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
          "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
        }
      }


      {...,
        sections2[]{
          title2,
          content2,
        }
      }

      {...,
        sections3[]{
          title3,
          content3,
        }
      }
      
      | order(_updatedAt desc)[0]
      `;

    const home = await $sanity.fetch(homeQuery);

    // Commit meta and metaemails to the Vuex store
    store.commit("setMeta", home.meta);
    store.commit("setMetaEmails", home.metaemails);
    store.commit("setThumbnailTime", home.thumbnailTime);
    // store.commit('setYear', home.year);

    return { home };
  },

  methods: {
    ...mapActions(["setTitle"]),
    setProject(reference) {
      this.project = reference;
    },

    openGallery() {
      this.$store.commit("setGalleryState", true); // Set gallery state as open
    },
    closeGallery() {
      this.$store.commit("setGalleryState", false); // Set gallery state as closed
    },
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
  },
  created() {
    this.setTitle(this.home.title);
  },
};
</script>

<style scoped>
/* Arrow down styles */
.arrow-down {
  /* text-align: center; */
  margin-bottom: 20px;
}

.fa-arrow-down {
  font-size: 24px;
  color: #000; /* Change the color as needed */
}
.morep {
  font-size: 6.75rem;
  /* line-height: 4.3rem; */
  text-transform: uppercase;
  font-family: "GTWalsheimbb";
  text-align: center;
}
.titleText {
  z-index: 10000 !important;
  /* font-weight: bolder; */
  color: whitesmoke;
  /* color: #2a2a2a; */
  font-family: "GTWalsheimb";
  left: 50%;
  top: 50%;
  /* width: 100vw; */
  transform: translate(-50%, -50%);
  position: absolute;
}

.abouttitle {
  display: flex;
  font-family: "GTWalsheimbb";
  justify-content: right;
  text-transform: uppercase;
  line-height: 4.3rem;
}

.contacttitle {
  display: flex;
  font-family: "GTWalsheimbb";
  text-transform: uppercase;
  /* line-height: 4.3rem; */
}

.contactsec {
  /* font-family: "GTWalsheiml" !important; */
  font-size: 3rem !important;
  line-height: 3rem !important;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
}

.presssec {
  /* font-family: "GTWalsheiml" !important; */
  font-size: 3rem !important;
  line-height: 3rem !important;
  /* display: flex;
  justify-content: space-between !important; */
}

.presstitle {
  text-transform: uppercase;
}

.presssectext {
  font-family: "GTWalsheiml";
  text-transform: none !important;
  display: flex;
  justify-content: space-between !important;
}
.aboutsec {
  width: 100vw;
  display: flex;
  justify-content: center;
  font-family: 'GTWalsheimbb';
}

.imagemarquee {
  z-index: 10 !important;
}
/* header {  
  animation: 1.5s ease-out 0s 1 slideInFromLeft;
} */

/* .item {
  width: 33.3333%;
} */
</style>
