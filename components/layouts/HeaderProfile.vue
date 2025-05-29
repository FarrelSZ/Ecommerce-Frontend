<template>
  <div class="header-profile bg-gradient-to-r from-primary to-[#FF7744] py-3 text-white border-b border-white/10">
    <UContainer class="header-profile-container flex justify-end items-center gap-1">
      <!-- Daftar Button -->
      <UButton
        variant="ghost"
        size="sm"
        class="px-4 py-2 hover:bg-white/10 transition-all duration-200 rounded-lg font-medium text-white"
      >
        <Icon name="i-heroicons-user-plus" class="w-4 h-4 mr-2" />
        Daftar
      </UButton>

      <!-- Divider -->
      <div class="w-px h-4 bg-white/30 mx-2"></div>

      <!-- Login Button -->
      <UButton
        variant="ghost"
        size="sm"
        class="px-4 py-2 hover:bg-white/10 transition-all duration-200 rounded-lg font-medium text-white"
      >
        <Icon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-2" />
        Login
      </UButton>
    </UContainer>
  </div>
</template>

<style scoped>
.header-profile {
  backdrop-filter: blur(5px);
}

/* Add subtle glow effect */
.header-profile::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}
</style>
