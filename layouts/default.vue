<template>
  <div class="default-layout flex flex-col min-h-screen">
    <LayoutsHeaderOrange />
    <main class="main-layout flex-1 bg-[#F5F5F5]"><slot /></main>
    <LayoutsFooter />
  </div>
</template>

<script setup></script>

<style scoped></style>
