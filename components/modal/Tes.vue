<template>
  <UModal
    title="Modal with close button"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
  >
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </UModal>
</template>

<script setup></script>

<style lang="scss" scoped></style>
