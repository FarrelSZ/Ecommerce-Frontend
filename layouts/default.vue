<template>
  <div class="default-layout flex flex-col min-h-screen bg-red-200">
    <header class="header-orange text-white flex-col">
      <div class="header-top bg-primary py-2">
        <UContainer class="header-top-container flex justify-end divide-x divide-gray-50/50">
          <UButton variant="link" color="white" padding="none" class="px4">Dafar</UButton>
          <UButton variant="link" color="white" padding="none" class="mr-20 px-4">Login </UButton>
        </UContainer>
      </div>
      <div class="header-bottom bg-gradient-to-b from-primary to-[#FF6633] flex-1 py-3">
        <UContainer class="header-bottom-container flex justify-between h-full items-center gap-10">
          <BaseLogo />
          <LayoutsSearchBar class="flex-1" />
          <!-- <div class="mx-10">Cart Button</div> -->
          <UButton variant="link" color="white" padding="none" class="mx-10">
            <IconCart />
          </UButton>
        </UContainer>
      </div>
    </header>
    <main class="main-layout flex flex-1 bg-slate-300"><slot /></main>
    <footer>Footer</footer>
  </div>
</template>

<script setup></script>

<style scoped>
@import "tailwindcss";

.header-orange {
  height: 120px;
}

.header-orange .header-top {
}

.header-top-container {
}
</style>
