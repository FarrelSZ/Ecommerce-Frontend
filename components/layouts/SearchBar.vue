<template>
  <div
    class="bg-white p-1 flex items-center rounded-sm text-black"
    :class="[
      'searchbar',
      {
        'no-padded': !padded,
      },
    ]"
  >
    <input placeholder="CEK: Flash Sale Rp17 Lokal!" class="outline-none pl-3 flex-1" />
    <UButton icon="i-heroicons:magnifying-glass" class="px-6" v-bind="attribute" />
  </div>
</template>

<script setup>
const props = defineProps({
  padded: {
    type: Boolean,
    default: true,
  },
});

const attribute = computed(() => {
  if (!props.padded) {
    return {
      ui: {
        rounded: "rounded-none",
      },
    };
  }
  return {};
});
</script>

<style scoped>
.searchbar:not(.no-padded) {
  padding: 4px;
}

.searchbar.no-padded {
  border-style: solid;
  border-width: 2px;
  border-color: #ee4d2d;
}
</style>
