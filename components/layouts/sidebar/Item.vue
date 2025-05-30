<template>
  <DefineItem v-slot="{ icon, label }">
    <div class="flex gap-2 items-center hover:text-primary">
      <UIcon v-if="icon" :name="icon" class="w-6 h-6" />
      <p class="text-sm">{{ label }}</p>
    </div>
  </DefineItem>

  <!-- Jika tidak ada children, render sebagai NuxtLink biasa -->
  <NuxtLink v-if="!item.children?.length" :to="item.to" class="block">
    <ReuseItem v-bind="item" />
  </NuxtLink>

  <!-- Jika ada children, gunakan approach manual -->
  <div v-else>
    <!-- Parent item trigger -->
    <div class="flex gap-2 items-center hover:text-primary cursor-pointer py-1" @click="toggleOpen">
      <UIcon v-if="item.icon" :name="item.icon" class="w-6 h-6" />
      <p class="text-sm flex-1">{{ item.label }}</p>
      <UIcon
        name="i-heroicons:chevron-down-20-solid"
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>

    <!-- Children items dengan transisi -->
    <div v-show="isOpen" class="pl-8 flex flex-col gap-1 mt-1 transition-all duration-200">
      <div v-for="(child, index) in item.children" :key="`child-${child.label}-${index}`">
        <NuxtLink :to="child.to" class="block py-1 px-2 rounded hover:bg-gray-100 transition-colors">
          <div class="flex gap-2 items-center hover:text-primary">
            <UIcon v-if="child.icon" :name="child.icon" class="w-4 h-4" />
            <p class="text-sm">{{ child.label }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const [DefineItem, ReuseItem] = createReusableTemplate();

// State untuk dropdown
const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

// Auto open jika route aktif ada di children
const route = useRoute();
onMounted(() => {
  if (props.item.children?.some((child) => route.path === child.to)) {
    isOpen.value = true;
  }
});
</script>

<style scoped>
/* Additional styling untuk active state */
.router-link-active {
  color: var(--ui-primary);
  background-color: color-mix(in oklab, var(--ui-primary) 10%, transparent);
}
</style>
