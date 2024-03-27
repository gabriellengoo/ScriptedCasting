<template>
  <!-- bg-white -->
  <header
    class=" absolute top-0 left-0 w-full   text-xs leading-snug uppercase   "
  >
  <!-- justify-center border-b-2 border-black pt-8 -->
    <div
      class="fixed mobilemenu flex flex-wrap w-full items-center gap-4 p-2  md:pb-2 md:pt-2 md:flex-nowrap"
    >
    <!-- <Animation></Animation> -->
    <!-- <div><h1 class="titleText flex justify-between items-center text-9xl align-baseline text-center uppercase">Scripted</h1></div> -->
    <NuxtLink
          to="/"
          class="headtop titleText flex justify-between items-center text-9xl align-baseline text-center uppercase"
          @touchstart="startAnimation"
          @touchend="endAnimation"
        >
          <span class="animate-hover" :class="{ 'touch-hover': touchHover }">Script</span
          ><span class="hover-move" :class="{ 'touch-move': touchMove }">ed</span>
        </NuxtLink>
  

        <SearchBar />


  <nav class="headtoplinks flex-col linktextmb text-[1.525rem] w-1/16 flex">
        <!-- hidden -->
        <NuxtLink to="/works">Work</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#about' }" >About</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#contact' }" class="header-link">Contact</NuxtLink>
      </nav>

   

      <!-- <SearchBar /> -->


      <!-- <div class="flex-col hidden normal-case md:flex">
        <div class="flex" v-for="item in contact" :key="item._key">
          <span class="block w-24 uppercase">{{ item.title }}</span>
          <span class="block">
            <a :href="item.link.link" v-if="item.link.link">{{
              item.link.title
            }}</a>
            <span v-else>{{ item.link.title }}</span>
          </span>
        </div>
      </div> -->
      <!-- <button
        class="absolute bottom-0 right-0 w-6 h-4 md:hidden"
        @click="TOGGLE_MENU()"
      >
        <span
          class="absolute top-0 left-0 w-full transform bg-black h-2px"
          :class="menu ? 'rotate-45 mt-1.5 ' : ''"
        ></span>
        <span
          class="absolute top-0 left-0 w-full mt-1.5 bg-black h-2px"
          :class="menu ? 'opacity-0' : ''"
        ></span>
        <span
          class="absolute left-0 w-full mb-0.5 bg-black h-2px transform"
          :class="menu ? '-rotate-45 mt-1.5 top-0' : 'bottom-0'"
        ></span>
      </button> -->
    </div>
    <!-- <div class="fixed top-0 left-[60vw] w-1/6 z-20">
      <SearchBar />
    </div> -->

    <LayoutMenu v-if="menu"></LayoutMenu>
  </header>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import SearchBar from '~/components/SearchBar.vue'

export default {
  components: {
    // Header,
    SearchBar
  },
  data() {
    return {
      touchHover: false,
      touchMove: false,
    };
  },
  computed: {
    ...mapState(['contact', 'menu']),
  },
  methods: {
    ...mapMutations(['TOGGLE_MENU']),
    startAnimation() {
      this.touchHover = true;
      this.touchMove = true;
    },
    endAnimation() {
      // Add a short delay to see the tap-based animation
      setTimeout(() => {
        this.touchHover = false;
        this.touchMove = false;
      }, 300);
    },
    // scrollToContact() {
    //   this.$emit('scroll-to-contact');
    // },
    scrollToContact() {
      this.scrollToSection('#contact');
    },
    scrollToAbout() {
      this.scrollToSection('#about');
    },
    scrollToSection(selector) {
  const section = document.querySelector(selector);
  if (section) {
    const offset = section.offsetTop;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
    },
  },
};
</script>

<style scoped>


.titleText {
  font-family: 'GTWalsheimb';
}

.animate-hover {
  transition: color 0.3s ease-in-out;
}

.titleText:hover .animate-hover,
.titleText.touch-hover .animate-hover {
  color: black; /* Change to the desired tap hover color */
}

.hover-move {
  transition: transform 0.3s ease-in-out, margin-right 0.3s ease-in-out;
}

.titleText:hover .hover-move,
.titleText.touch-move .hover-move {
  transform: translateX(30px); /* Adjust the value based on your preference */
  margin-right: 30px; /* Adjust the value based on your preference */
}

/* Mobile styles using media query */
@media (max-width: 768px) {
  .titleText {
    font-size: 13vw;
  }

  .mobilemenu {
    justify-content: space-between;
  }

  .linktextmb {
    text-align: end;
    font-size: 4vw;
  }
}
</style>