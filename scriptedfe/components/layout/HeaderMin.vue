<template>
  <!-- bg-white -->
  <header
    class="  top-0 left-0 z-20 flex w-full gap-2 p-2 pb-5 text-xs leading-snug uppercase "
    :class="
      $nuxt.$route.name == 'project-slug' || $nuxt.$route.name == 'slug'
        ? 'fixed'
        // : 'sticky' 
        : 'fixed' 
    "
  >
  <div><NuxtLink to="/" class="titleText flex justify-between items-center text-7xl text-center uppercase">Scripted</NuxtLink></div>
    <nav class="flex flex-col text-[1.125rem] w-1/16">
      <NuxtLink to="/projects">Work</NuxtLink>
        <NuxtLink to="/">About</NuxtLink>
        <NuxtLink to="/">Contact</NuxtLink>
    </nav>

    <!-- <div class="w-1/16 text-[1.125rem]">
      <NuxtLink to="/">Scripted</NuxtLink>
    </div> -->
    <div
      v-show="title"
      class="flex-1 -mt-1 text-4xl leading-none md:text-5xl font-heading"
    >
      {{ title }}
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['title']),
  },
}
</script>