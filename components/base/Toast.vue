<template>
  <div class="fixed top-5 right-5 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="px-4 py-2 rounded shadow text-white"
      :class="{
        'bg-green-500': toast.color === 'green',
        'bg-red-500': toast.color === 'error',
        'bg-blue-500': toast.color === 'info',
      }"
    >
      {{ toast.title }}
    </div>
  </div>
</template>

<script setup>
const { toasts } = useToast();
</script>
