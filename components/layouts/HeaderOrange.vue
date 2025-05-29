<template>
  <div>
    <header class="header-orange text-white flex flex-col shadow-lg">
      <LayoutsHeaderProfile v-if="defaultMeta.showProfile" />
      <div
        class="header-bottom bg-gradient-to-r from-primary via-[#FF7744] to-[#FF6633] flex-1 py-4 relative overflow-hidden"
      >
        <!-- Background pattern overlay -->
        <div
          class="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-50"
        ></div>

        <UContainer
          class="header-bottom-container flex justify-between h-full items-center gap-4 md:gap-8 lg:gap-12 relative z-10"
        >
          <!-- Logo with enhanced styling -->
          <div class="flex-shrink-0">
            <BaseLogo class="transition-transform duration-200 hover:scale-105" />
          </div>

          <!-- Search bar with improved styling -->
          <div v-if="defaultMeta.showSearch" class="flex-1 max-w-2xl mx-4">
            <LayoutsSearchBar class="w-full shadow-lg" />
          </div>

          <!-- Cart button with badge and animation -->
          <div v-if="defaultMeta.showCart" class="flex-shrink-0">
            <UButton
              variant="ghost"
              color="white"
              size="lg"
              class="relative p-3 hover:bg-white/10 transition-all duration-200 rounded-xl group"
            >
              <IconCart class="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
              <!-- Cart badge (optional - uncomment if needed) -->
              <!-- <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">3</span> -->
            </UButton>
          </div>
        </UContainer>
      </div>
    </header>
  </div>
</template>

<script setup>
const route = useRoute();

const defaultMeta = computed(() => {
  return {
    showProfile: route.meta?.header && "showProfile" in route.meta.header ? route.meta.header.showProfile : true,
    showSearch: route.meta?.header && "showSearch" in route.meta.header ? route.meta.header.showSearch : true,
    showCart: route.meta?.header && "showCart" in route.meta.header ? route.meta.header.showCart : true,
  };
});
</script>

<style scoped>
.header-orange {
  min-height: 120px;
  backdrop-filter: blur(10px);
}

/* Enhanced gradient animation */
.header-bottom::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-orange {
    min-height: 100px;
  }

  .header-bottom {
    padding: 1rem 0;
  }
}
</style>
