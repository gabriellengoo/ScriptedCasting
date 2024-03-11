<template>
  <!-- bg-white -->
  <header
    class="absolute top-0 left-0 z-20 w-full   text-xs leading-snug uppercase   "
  >
  <!-- justify-center -->
    <div
      class="fixed mobilemenu flex flex-wrap w-full  bg-white items-center gap-4 p-2 pt-8 md:pb-2 md:pt-2 md:flex-nowrap"
    >
    <!-- <Animation></Animation> -->
    <!-- <div><h1 class="titleText flex justify-between items-center text-9xl align-baseline text-center uppercase">Scripted</h1></div> -->
    <div><NuxtLink to="/" class="titleText flex justify-between items-center text-9xl align-baseline text-center uppercase">Scripted</NuxtLink></div>
    <nav class="flex-col linktextmb text-[1.525rem] w-1/16 flex">
        <!-- hidden -->
        <NuxtLink to="/projects">Work</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#about' }" >About</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#contact' }" class="header-link">Contact</NuxtLink>
      </nav>
   
      <div class="flex-col hidden normal-case md:flex">
        <div class="flex" v-for="item in contact" :key="item._key">
          <span class="block w-24 uppercase">{{ item.title }}</span>
          <span class="block">
            <a :href="item.link.link" v-if="item.link.link">{{
              item.link.title
            }}</a>
            <span v-else>{{ item.link.title }}</span>
          </span>
        </div>
      </div>
      <button
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
      </button>
    </div>
    <LayoutMenu v-if="menu"></LayoutMenu>
  </header>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['contact', 'menu']),
  },
  methods: {
    ...mapMutations(['TOGGLE_MENU']),
    scrollToContact() {
      this.$emit('scroll-to-contact');
    },
  },
}
</script>

<style scoped>
@media (max-width: 768px) {
.titleText{
  font-size: 5rem;
}

.mobilemenu{
  justify-content: space-between;
}

.linktextmb{
  text-align: end;
}
}
.titleText{
  font-family: 'GTWalsheimb';
}
</style>