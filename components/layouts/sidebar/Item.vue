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
    >
      <template #default="{ open, item: parent }">
        <div class="flex gap-2 items-center hover:text-primary" role="button">
          <UIcon v-if="parent.icon" :name="parent.icon" class="w-6 h-6" />
          <p class="text-sm">{{ parent.label }}</p>
          <!-- <UIcon
            name="i-heroicons:chevron-down-20-solid"
            class="w-4 h-4 transition-all"
            :class="[open && 'rotate-180']"
          /> -->
        </div>
      </template>
      <template #item>
        <div class="pl-8 flex flex-col gap-2">
          <LayoutsSidebarItem
            v-for="(child, index) in item.children"
            :key="`child-${child.label}-${index}`"
            :item="child"
          />
        </div>
      </template>
    </UAccordion>
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
