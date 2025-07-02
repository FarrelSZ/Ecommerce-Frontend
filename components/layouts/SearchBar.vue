<template>
  <UForm
    state="search"
    :class="[
      'searchbar bg-white flex items-center rounded-sm text-black',
      {
        'no-padded': !padded,
      },
    ]"
    @submit.prevent="handleSearch"
  >
    <UInput v-model="searchInput" placeholder="CEK: Flash Sale Rp17 Lokal!" class="outline-none pl-3 flex-1" />
    <UButton type="submit" icon="i-heroicons:magnifying-glass" class="px-6" v-bind="attribute" />
  </UForm>
</template>

<script setup>
const props = defineProps({
  padded: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
const route = useRoute();

const searchInput = ref(route.query?.search || "");

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

watch(
  () => route.query.search,
  (newSearch) => {
    searchInput.value = newSearch;
  }
);

function handleSearch() {
  router.push({
    path: "/search",
    query: {
      ...route.query,
      search: searchInput.value,
    },
  });
}
</script>

<style scoped>
.searchbar:not(.no-padded) {
  padding: calc(var(--spacing) * 1) /* 0.25rem = 4px */;
}

.searchbar.no-padded {
  border-style: var(--tw-border-style);
  border-width: 2px;
  border-color: var(--ui-primary);
  @property --tw-border-style {
    syntax: "*";
    inherits: false;
    initial-value: solid;
  }
}
</style>
