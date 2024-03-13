<template>
  <!-- pt-40 -->
  <div class="">
    <NuxtLink class="w-screen flex justify-center" :to="`/projects`">
      <div v-if="home.sections4">
        <div v-for="section in home.sections4" :key="section._key">
          <MediaImage
            :size="section.image4.size"
            :aspect="section.image4.aspect"
            :src="section.image4.image4"
            v-if="section.image4.image4"
            class="landingimg h-screen w-screen object-cover"
          ></MediaImage>
          <MediaVideo
                  :id="section.video.id"
                  v-if="section.video.id"
                  class="md:min-h-screen min-w-full w-screen object-cover "
                ></MediaVideo>
          <!-- Display YouTube Video -->
          <iframe
            v-else-if="section.youtubeUrl"
            :src="getYouTubeEmdedUrl(section.youtubeUrl)"
            frameborder="0"
            allowfullscreen
            class="md:min-h-screen min-w-full w-screen object-cover pointer-events-none"
          ></iframe>
          <!-- Display Vimeo Video width="560" height="315"-->

          <iframe
            v-else-if="section.vimeoUrl"
            :src="getVimeoEmdedUrl(section.vimeoUrl)"
            frameborder="0"
            allowfullscreen
            class="min-w-full md:min-h-screen  w-screen object-cover pointer-events-none"
          ></iframe>
        </div>
      </div>
      <!-- <Grid2 class="imagemarquee" size="small" :items="home.grid2"></Grid2> -->
    </NuxtLink>
    <div c>
      <!-- md:pb-5 sm:pb-5  -->
      <div v-if="home.sections" class="pb-0" id="about">
        <!-- about -->
        <span
          class="aboutsec text-4xl"
          v-for="section in home.sections"
          :key="section._key"
        >
          <div class=" pt-[5vw] pb-[5vw] w-screen p-10" v-if="section.title">
            <!-- text-[1.5rem] leading-[1.5rem] -->

            <p class="abouttitletexta">
                  {{ section.title }}
                  <!-- scriptedt uppercase -->
                  <span class=" ">Coralie Casting</span>
                </p>


            <div class=" md:flex pt-[5vw] md:justify-between md:flex-row-reverse">
              <div
                class="md:pt-0 md:pb-20 abouttitle flex md:justify-end text-5xl md:text-6xl"
              >
               

                <div class="contactimagemobilecont w-[40vw] flex justify-end">
                <MediaImage
                  :size="section.image.size"
                  :aspect="section.image.aspect"
                  :src="section.image.image"
                  v-if="section.image.image"
                  class="contactimagemobile"
                ></MediaImage>
              </div>
              </div>
              <!-- <p class="md:p-5 md:pt-0 pt-10 md:pb-0 pb-5 abouttitle scriptedt flex justify-end text-6xl">
              <span>Scripted</span>
            </p> -->

              <Richtext
                class="abouttextdesk md:p-5 text-[1.7rem] md:contents hidden leading-[1.7rem]"
                :blocks="section.content"
                v-if="section.content"
              ></Richtext>

              <Richtext
                class="abtextmb contents md:hidden  md:p-5  text-[1.7rem] leading-[1.7rem]"
                :blocks="section.content"
                v-if="section.content"
              ></Richtext>

              <!-- Add a button to toggle the collapsible section -->
              <button
                @click="toggleCollapsible"
                v-if="!isCollapsibleOpen"
                class="contents md:hidden  collapsible-button"
              >
                ... view more
                <!-- <i :class="arrowIconClass"></i> -->
              </button>

              <!-- <div class="flex justify-end"> -->
              <!-- about textt -->
              <div v-if="isCollapsibleOpen" class="collapsible-section">
                <Richtext
                  class="abtextmbopen md:p-5 md:w-5/6 text-[1.7rem] leading-[1.7rem]"
                  :blocks="section.content"
                  v-if="section.content"
                ></Richtext>
              </div>
            </div>
            <!-- </div> -->

            <!-- contct -->
            <!-- Display the About Image    v-if="section.image.image"-->
            <div
              v-if="home.sections2"
              id="contact"
              class="contact-section contactsecmd pt-20 flex justify-between"
            >
              <div class="contactsecall pt-28 md:pt-0 ">
                <!-- contact title text-6xl -->
                <div
                  class="contactheader text-[1.7rem] leading-[1.7rem] md:p-5 md:pl-0 pb-3"
                >
                  <div class="">
                    <span>Get in touch</span>
                  </div>
                </div>

                <!-- contact text -->
                <div class="md:flex md:pt-0">
                  <div>
                    <div>
                      <!-- leading-[1.5rem] text-[1.5rem] -->
                      <p
                        class="md:pl-5 hidden md:contents pb-0 text-[1.7rem] leading-[1.7rem] justify-start"
                      >
                        <span>Contact</span>
                      </p>
                    </div>
                  </div>

                  <div class="md:pl-10">
                    <div
                      v-for="sections2 in home.sections2"
                      :key="sections2._key"
                      class="contacttextmd"
                    >
                      <div v-if="sections2.content2" class="contactsec text-[1.7rem] leading-[1.7rem]">
                        <!-- <p v-if="sections2.title2" class="p-5 pb-0 contacttitle justify-start">
                    <span>{{ sections2.title2 }}</span>
                  </p> -->
                        <Richtext
                          class="pb-2 contactinner"
                          :blocks="sections2.content2"
                          v-if="sections2.content2"
                        ></Richtext>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <p
                        class="copyrtext md:pl-10 pt-10  uppercase w-3/6 flex md:pt-0 pb-0  md:leading-[1.25rem] text-[1.25rem] justify-center"
                      >
                        COPYRIGHT ©2024
                        Casting by Coralie Scripted
                      </p>
                    </div>
                  </div>

                  <div class="w-3/12">
                    <div>
                      <p class="p-5 pb-0 text-[1.5rem] justify-start">
                        <span><br /></span>
                      </p>
                    </div>
                  </div>
                </div>

         
            
              </div>
              
            </div>


                   <!-- press -->
                   <div
                  v-if="home.sections3"
                  class="presssecmd md:pt-40 pb-5 md:pb-0 text-[1.7rem] leading-[1.7rem] flex"
                >
                  <div
                    v-for="sections3 in home.sections3"
                    :key="sections3._key"
                    class="md:p-5  presssecinnermd"
                  >
                    <div class="presssec">
                      <p
                        v-if="sections3.title3"
                        class="presstitle md:pb-2 justify-start"
                      >
                        <span>{{ sections3.title3 }}</span>
                      </p>
                      <Richtext
                        class="presssectext"
                        :blocks="sections3.content3"
                        v-if="sections3.content3"
                      ></Richtext>
                    </div>
                    <!-- Arrow pointing down -->
                    <!-- <div class="pt-5 justify-start arrow-down">
                      <i class="fas fa-arrow-down"></i>
                    </div> -->
                  </div>
                </div>
          </div>
        </span>

        <NuxtLink :to="`/projects`">
          <h1 class="morep text-6xl w-screen p-10 pt-0 pb-0 underline">View Projects</h1>
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
      isCollapsibleOpen: false,
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
     
     grid[] {_key, spacer,youtubeUrl,vimeoUrl, "video" : 
    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
      "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
    title, photographer,year,hair,styleing, link, production, location,
      "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "team" : reference->team, "meta" : reference->meta}} } 
     
      {..., grid2[] {_key, spacer, thumdnailTime,youtubeUrl,vimeoUrl, "video" : 
    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
      "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
    title, photographer,year,imageWidth,hair,makeup,dop,set,styleing, link, production, location, listImage, draft,
      "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "team" : reference->team, "meta" : reference->meta}} } 
     
      {..., gridm[] {_key, spacer, thumdnailTime,youtubeUrl,vimeoUrl, "video" : 
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

      {...,
        sections4[]{
          title4,
          youtubeUrl,
          vimeoUrl,
          "video" : 
                    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
          "image4" : {"image4" : image4.asset._ref, "aspect" : image4.asset->metadata.dimensions.aspectRatio, "position" : position}, 

        }
      }
      
      | order(_updatedAt desc)[0]
      `;

    const home = await $sanity.fetch(homeQuery);

    // Commit meta and metaemails to the Vuex store
    store.commit("setMeta", home.meta);
    store.commit("setMetaEmails", home.metaemails);
    store.commit("setThumdnailTime", home.thumdnailTime);
    // store.commit('setYear', home.year);

    return { home };
  },

  methods: {
    ...mapActions(["setTitle"]),
    setProject(reference) {
      this.project = reference;
    },
    toggleCollapsible() {
      this.isCollapsibleOpen = !this.isCollapsibleOpen;
    },

    openGallery() {
      this.$store.commit("setGalleryState", true); // Set gallery state as open
    },
    closeGallery() {
      this.$store.commit("setGalleryState", false); // Set gallery state as closed
    },
    getYouTubeEmdedUrl(youtubeUrl) {
      // Extract YouTube video ID from the URL
      const videoId = youtubeUrl.split("v=")[1];
      // Generate the YouTube emded URL with autoplay, mute, loop, and hide controls on hover parameters
      return `https://www.youtube.com/emded/${videoId}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0`;
    },
    getVimeoEmdedUrl(vimeoUrl) {
      // Extract Vimeo video ID from the URL
      const videoId = vimeoUrl.split("/").pop();
      // Generate the Vimeo emded URL
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0`;
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
  computed: {
    arrowIconClass() {
      // fas fa-arrow-up
      return this.isCollapsibleOpen ? "" : "fas fa-arrow-down";
    },
  },
  created() {
    this.setTitle(this.home.title);
  },
};
</script>

<style scoped>
.abouttitletexta{
  text-transform: uppercase;
    font-size: 1.7rem;
    line-height: 1.7rem;
}
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
  /* font-size: 6.75rem; */
  /* line-height: 4.3rem; */
  text-transform: uppercase;
  /* font-family: "GTWalsheimdb"; */
  font-family: "GTWalsheimbb";
  padding-top: 5rem;
  text-align: center;
}
.titleText {
  z-index: 10000 !important;
  /* font-weight: bolder; */
  color: whitesmoke;
  /* color: #2a2a2a; */
  font-family: "GTWalsheimd";
  left: 50%;
  top: 50%;
  /* width: 100vw; */
  transform: translate(-50%, -50%);
  position: absolute;
}

.contactheader {
  /* font-size: 3.75rem;
    line-height: 2.5rem ; */
  /* font-family: "GTWalsheimbb"; */
  /* text-transform: uppercase; */
  display: flex;
  /* justify-content: center; */
}

.abouttitle {
  display: flex;
  /* font-family: "GTWalsheimdb"; */
  /* justify-content: right; */
  /* text-transform: uppercase; */
  /* line-height: 2.25rem;
  font-size: 3.75rem; */
  /* line-height: 2.5rem ; */
  font-family: "GTWalsheimbb";
  /* text-transform: uppercase; */
}

.scriptedt {
  font-family: "GTWalsheimb";
}

.contactsecall {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.contacttitle {
  display: flex;
  font-family: "GTWalsheimdb";
  text-transform: uppercase;
  /* line-height: 4.3rem; */
}

.contactsec {
  /* font-family: "GTWalsheiml" !important; */
  flex-direction: column;
  /* font-size: 1.5rem !important;
  line-height: 1.5rem !important; */
  display: flex;
  justify-content: space-between;
  /* text-transform: uppercase;*/
}

.presssec {
  /* font-family: "GTWalsheiml" !important; */
  /* font-size: 1.5rem !important;
  line-height: 1.5rem !important; */
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
  padding-top: 1rem;
}
.aboutsec {
  width: 100vw;
  display: flex;
  justify-content: center;
  /* font-family: 'GTWalsheimdb'; */
}

.imagemarquee {
  z-index: 10 !important;
}

.contacttextmd:nth-child(1) {
  padding-bottom: 2rem;
}

.contacttextmd:nth-child(3) {
  padding-bottom: 2rem;
}

/*  
.contacttextmd:nth-child(6) .contactsec
   display: flex;
    justify-content: space-between;
    flex-direction: row; */

@media (max-width: 768px) {
  .presssectext {
  font-family: unset;
}

  .abouttitletexta{
    font-family: "GTWalsheimbb";
    /* text-transform: uppercase; */
    font-size: 3rem;
    line-height: 3rem;
    text-align: center;
  }

  .copyrtext{
    font-size: 1rem;
    line-height: 1rem;
    width: 40%;
  }

  .landingimg {
    height: auto;
  }

  .aboutsec {
    font-size: 1.25rem /* 36px */;
    line-height: 1.5rem /* 40px */;
  }

  .abouttitle {
    /* font-size: 1.25rem; */
    line-height: 1;
  }

  .contactsecmd {
    display: contents;
  }

  .contacttextmd {
    /* width: 60vw; */
    /* width: 100vw;  */
    padding: 0%;
    /* padding-top: 1.25rem; */
  }

  .contacttextmd:nth-child(1) {
    padding-bottom: 0rem;
    padding-top: 1.25rem;
  }

  .contacttextmd:nth-child(2) {
    padding-bottom: 0rem;
    padding-top: 1.25rem;
  }

  .contacttextmd:nth-child(3) {
    padding-top: 1.25rem;
    padding-bottom: 0rem;
  }

  .contacttextmd:nth-child(4) {
    padding-top: 2rem;
  }

  .contactsec {
    font-size: 1.7rem !important;
    line-height: 1.7rem !important;
    text-transform: none;
  }

  .contactheader {
    font-family: "GTWalsheimbb";
    /* text-transform: uppercase; */
    font-size: 3rem;
}

  .presstitle {
    font-family: "GTWalsheimbb";
    text-transform: none;
    font-size: 3rem;
    line-height: 3rem;
  }

  .contactimagemobile {
    width: 83.333333%;
    width: 100%;
    float: right;
  }

  .contactimagemobilecont {
    width: 100vw;
    display: flex;
    /* justify-content: flex-end; */
    justify-content: center;
  }

  .presssecmd {
    /* justify-content: unset; */
    /* padding-top: 0; */
    /* width: 100vw; */
    display: flex;
    /* justify-content: flex-end; */
  }

  .presssecinnermd {
    /* width: 83.333333%; */
    /* padding: 0; */
    padding-top: 3rem;
    padding-left: 0;
  }

  .presssec {
    /* font-size: 1.25rem !important;
    line-height: 1.25rem !important; */
  }

  .fa-arrow-down {
    padding-top: 1.25rem;
    font-size: 12px;
  }

  .morep {
    /* font-size: 1.25rem; */
    line-height: 1;
  }

  .collapsible-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    margin-top: 10px;
    padding-top: 20px;
  }

  .collapsible-section {
    /* display: none; */
    /* padding: 10px; */
  }

  .collapsible-section.show {
    display: block;
  }
}

/* header {  
  animation: 1.5s ease-out 0s 1 slideInFromLeft;
} */

/* .item {
  width: 33.3333%;
} */
</style>
