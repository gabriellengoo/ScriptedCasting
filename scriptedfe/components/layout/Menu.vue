<template>
  <div class="flex-col w-full pt-2 normal-case md:hidden">
    <div class="flex">
      <span class="mobileheadsize w-29 -mr-0.5"></span> 
      <div class="flex-1">
        <div class="flex" v-for="item in contact" :key="item._key">
          <span class="block w-24 uppercase">{{ item.title }}</span>
          <span class="block">
            <a :href="item.link.link" v-if="item.link.link">{{
              item.link.title
            }}</a>
            <span v-else>{{ item.link.title }}</span>
          </span>
        </div>
        <nav
          class="flex flex-col pt-2 text-3xl leading-none uppercase  font-heading"
        >
          <NuxtLink to="/artists">Artists</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
          <NuxtLink to="/production">Production</NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['contact']),
  },
}
</script>
<style scoped>

@media (max-width: 768px) {
.mobileheadsize{
  display: none;
}

}

</style>