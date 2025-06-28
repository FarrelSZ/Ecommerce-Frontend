<template>
  <NuxtLink
    class="category-item p-2 border-b border-r border-black/5 hover:shadow hover:border-black/15"
    :to="{
      path: '/search',
      query: {
        categories: slug,
      },
    }"
  >
    <NuxtImg :src="image" format="webp" />
    <p class="text-sm text-center text-black/80">{{ title }}</p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.category-item img {
  aspect-ratio: 1/1;
  width: 100%;
}
</style>
