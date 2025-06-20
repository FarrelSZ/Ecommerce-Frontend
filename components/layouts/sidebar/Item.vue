<template>
  <DefineItem v-slot="{ icon, label }">
    <div class="sidebar-item flex gap-2 items-center hover:text-primary">
      <UIcon v-if="icon" :name="icon" class="sidebar-item-icon w-6 h-6" />
      <p class="sidebar-item-label text-sm">{{ label }}</p>
    </div>
  </DefineItem>

  <!-- Jika tidak ada children, render sebagai NuxtLink -->
  <NuxtLink
    v-if="!item.children"
    :to="item.to"
    :active-class="item.exact ? 'router-link-active is-exact' : 'router-link-active'"
  >
    <ReuseItem v-bind="item" />
  </NuxtLink>

  <!-- Jika ada children, gunakan UAccordion -->
  <template v-else>
    <UAccordion
      :items="[
        {
          defaultOpen: $route.path.includes(item.children?.[0]?.to),
          ...item,
        },
      ]"
      :ui="{
        item: 'border-b-0',
        trigger: 'py-2 px-0 hover:text-primary',
        leadingIcon: 'hidden',
      }"
    >
      <!-- Custom trigger slot -->
      <template #default="{ open }">
        <div class="flex gap-2 items-center hover:text-primary cursor-pointer w-full">
          <UIcon v-if="item.icon" :name="item.icon" class="sidebar-item-icon" />
          <p class="sidebar-item-label flex-1">{{ item.label }}</p>
          <UIcon name="" class="w-4 h-4 transition-transform duration-200" :class="[open && 'rotate-180']" />
        </div>
      </template>

      <!-- Custom content slot -->
      <template #content>
        <div class="pl-8 flex flex-col gap-4 mt-4">
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
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const [DefineItem, ReuseItem] = createReusableTemplate();
const route = useRoute();

// Accordion items tanpa icon untuk menghindari duplikasi
const accordionItems = computed(() => [
  {
    label: props.item.label,
  },
]);

// Menentukan apakah accordion harus terbuka secara default
const defaultOpenValue = computed(() => {
  const hasActiveChild = props.item.children?.some(
    (child) => route.path === child.to || route.path.startsWith(child.to)
  );
  return hasActiveChild ? "0" : undefined;
});
</script>

<style scoped>
.router-link-active.is-exact.router-link-exact-active,
.router-link-active:not(.is-exact) {
  color: var(--ui-primary);
}
</style>
