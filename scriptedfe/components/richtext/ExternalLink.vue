<template functional>
  <a class="bg-yellow" :href="props.href" target="_blank" rel="noopener">
    <slot />
  </a>
</template>

<script>
export default {}
</script>

<style scoped>

a{
  /* font-family: 'GTWalsheimbb'; */
  /* text-indent: 10vw; */
}
</style>
