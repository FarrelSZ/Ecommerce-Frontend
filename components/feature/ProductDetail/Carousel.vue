<script setup lang="ts">
const items = [
  "https://picsum.photos/640/640?random=1",
  "https://picsum.photos/640/640?random=2",
  "https://picsum.photos/640/640?random=3",
  "https://picsum.photos/640/640?random=4",
  "https://picsum.photos/640/640?random=5",
  "https://picsum.photos/640/640?random=6",
  "https://picsum.photos/640/640?random=4",
  "https://picsum.photos/640/640?random=5",
  "https://picsum.photos/640/640?random=6",
  "https://picsum.photos/640/640?random=4",
  "https://picsum.photos/640/640?random=5",
  "https://picsum.photos/640/640?random=6",
  "https://picsum.photos/640/640?random=4",
  "https://picsum.photos/640/640?random=5",
  "https://picsum.photos/640/640?random=6",
];

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);

function onClickPrev() {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  }
}

function onClickNext() {
  if (activeIndex.value < items.length - 1) {
    activeIndex.value++;
  }
}

function onSelect(index: number) {
  activeIndex.value = index;
}

function select(index: number) {
  activeIndex.value = index;
  carousel.value?.emblaApi?.scrollTo(index);
}
</script>

<template>
  <div class="w-full space-y-4">
    <!-- Main Carousel (tanpa arrow) -->
    <div class="w-full max-w-md mx-auto">
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :arrows="false"
        :items="items"
        class="w-full aspect-square"
        @select="onSelect"
      >
        <img :src="item" width="320" height="320" class="w-full h-full object-cover rounded-lg" alt="Product image" />
      </UCarousel>
    </div>

    <!-- Thumbnail Navigation dengan Scrolling -->
    <div class="w-full max-w-md mx-auto">
      <div
        ref="thumbnailContainer"
        class="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
        style="scrollbar-width: none; -ms-overflow-style: none"
      >
        <button
          v-for="(item, index) in items"
          :key="index"
          class="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 border-2"
          :class="{
            'border-primary opacity-100 ring-2 ring-primary/30': activeIndex === index,
            'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300': activeIndex !== index,
          }"
          @click="select(index)"
        >
          <img
            :src="item"
            width="48"
            height="48"
            class="w-full h-full object-cover"
            :alt="`Product thumbnail ${index + 1}`"
          />
        </button>
      </div>
    </div>

    <!-- Arrow Controls di bawah thumbnail -->
    <div class="flex justify-center items-center gap-4">
      <button
        class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="activeIndex === 0"
        @click="onClickPrev"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <span class="text-sm text-gray-500 min-w-[60px] text-center"> {{ activeIndex + 1 }} / {{ items.length }} </span>

      <button
        class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="activeIndex === items.length - 1"
        @click="onClickNext"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar tapi tetap bisa scroll */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
