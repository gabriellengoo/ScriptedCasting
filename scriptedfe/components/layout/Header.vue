<template>
  <!-- bg-white -->
  <header
    class="absolute top-0 left-0 z-20 w-full  text-xs leading-snug uppercase   "
  >
  <!-- justify-center -->
    <div
      class="fixed flex flex-wrap w-full  bg-white items-center gap-4 p-2 pt-8 md:pb-2 md:pt-2 md:flex-nowrap"
    >
    <div><h1 class="titleText flex justify-between items-center text-9xl align-baseline text-center uppercase">Scripted</h1></div>
      <nav class="flex-col hidden text-[1.125rem] w-1/16 md:flex">
        <NuxtLink to="/projects">Work</NuxtLink>
        <NuxtLink to="/">About</NuxtLink>
        <NuxtLink to="/">Contact</NuxtLink>
      </nav>
      <!-- <Animation></Animation> -->
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
  },
}
</script>

<style scoped>
.titleText{
  font-family: 'GTWalsheimb';
}
</style>