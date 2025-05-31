<template>
  <UPagination
    v-model="page"
    :page-count="pageCount"
    :total="total"
    :inactive-button="{
      variant: 'link',
      class: 'text-black/40 hover:text-primary px-3 py-1 cursor-pointer',
    }"
    :active-button="{
      class: 'px-3 py-1 bg-primary text-white',
    }"
    :prev-button="{
      variant: 'link',
      class: 'text-black/40 hover:text-primary px-3 py-1 cursor-pointer',
    }"
    :next-button="{
      variant: 'link',
      class: 'text-black/40 hover:text-primary px-3 py-1 cursor-pointer',
    }"
    :ui="{
      wrapper: 'flex items-center justify-center space-x-2',
      base: 'text-lg font-light',
      default: {
        prevButton: {
          icon: 'i-heroicons-chevron-left',
        },
        nextButton: {
          icon: 'i-heroicons-chevron-right',
        },
      },
    }"
  />
</template>

<script setup>
const page = defineModel({
  type: Number,
  default: 1,
});

const props = defineProps({
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  pageCount: {
    type: Number,
    default: 10, // Items per page
  },
});

// Debug log untuk melihat nilai props
console.log("Pagination props:", {
  total: props.total,
  pageCount: props.pageCount,
  currentPage: page.value,
});
</script>

<style lang="scss" scoped></style>
