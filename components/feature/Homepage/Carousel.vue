<template>
  <UCarousel
    v-slot="{ item }"
    dots
    :items="items"
    :autoplay="{ delay: 2000 }"
    :ui="{ item: 'basis-full' }"
    class="rounded-sm overflow-hidden max-w-[796px] max-h-[235px] mx-auto aspect-[3.39/1]"
  >
    <img :src="item" class="w-full object-cover" draggable="false" />
  </UCarousel>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
