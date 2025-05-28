<template>
  <NuxtLink v-if="!item.children" :to="item.to">
    <div class="flex gap-2 items-center hover:text-primary">
      <UIcon v-if="item.icon" :name="item.icon" class="w-6 h-6" />
      <p class="text-sm">{{ item.label }}</p>
    </div>
  </NuxtLink>
  <template v-else>
    <UAccordion
      :items="[
        {
          label: item.label,
          children: item.children,
        },
      ]"
    ></UAccordion>
  </template>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped></style>
