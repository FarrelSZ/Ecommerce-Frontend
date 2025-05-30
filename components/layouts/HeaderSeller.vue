<template>
  <header class="header-seller bg-white px-4 py-3 shadow fixed top-0 left-0 right-0 z-50 flex justify-between gap-2">
    <!-- Debug: Tampilkan breadcrumb data -->
    <div class="flex flex-col">
      <UBreadcrumb :links="breadcrumb" :ui="ui" />
      <!-- Temporary debug info -->
      <small class="text-xs text-gray-500 mt-1"> Debug: {{ JSON.stringify(breadcrumb) }} </small>
      <small class="text-xs text-gray-400"> Route: {{ route.path }} | Meta: {{ JSON.stringify(route.meta) }} </small>
    </div>

    <!-- Manual dropdown approach -->
    <div class="relative">
      <div class="flex gap-2 items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded" @click="toggleDropdown">
        <UAvatar alt="Irsyaad Budi" />
        <p class="text-sm font-medium">Irsyaad</p>
        <UIcon
          name="i-heroicons:chevron-down-20-solid"
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': isDropdownOpen }"
        />
      </div>

      <!-- Dropdown menu -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="isDropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <div class="py-1">
            <button
              @click="switchToCustomer"
              class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <UIcon name="i-heroicons:arrow-path" class="w-4 h-4 mr-3" />
              Switch to Customer
            </button>
            <button @click="logout" class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <UIcon name="i-heroicons:arrow-left-start-on-rectangle" class="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
const route = useRoute();

// State untuk dropdown
const isDropdownOpen = ref(false);

const breadcrumb = computed(() => {
  console.log("Route meta:", route.meta); // Debug log
  console.log("Route path:", route.path); // Debug log

  const defaultBreadcrumb = [{ label: "Beranda", to: "/seller" }]; // Tambah 'to'

  if (!route.meta?.breadcrumb || !Array.isArray(route.meta.breadcrumb)) {
    return defaultBreadcrumb;
  }
  return [...defaultBreadcrumb, ...route.meta.breadcrumb];
});

const ui = {
  active: "text-slate-800",
  inactive: "text-black/50",
  base: "font-normal text-lg",
  li: "text-black/50",
};

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const switchToCustomer = () => {
  console.log("Switch to customer");
  isDropdownOpen.value = false;
  // Implementasi logic switch to customer
};

const logout = () => {
  console.log("Logout");
  isDropdownOpen.value = false;
  // Implementasi logic logout
};

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) {
      isDropdownOpen.value = false;
    }
  });
});
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
