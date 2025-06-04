<template>
  <div class="default-layout flex flex-col min-h-screen">
    <LayoutsHeaderWhite />
    <main class="main-layout flex-1 bg-slate-300"><slot /></main>
    <LayoutsFooter />
  </div>
</template>

<script setup></script>

<style scoped></style>
