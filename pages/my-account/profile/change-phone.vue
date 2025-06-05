<template>
  <div>
    <h3 class="text-xl font-medium">Ubah No. Handphone</h3>
    <hr class="mt-5 mb-11 border-gray-200/60" />
    <UForm>
      <UFormField
        label="No. Handphone Baru"
        :ui="{
          wrapper: 'flex gap-16',
          container: 'w-96',
          label: {
            wrapper: 'pt-2',
            base: 'font-normal text-black/55 text-base w-28',
          },
        }"
      >
        <UInput size="lg" class="w-xl" />
        <p class="text-sm text-red-500 mt-1"></p>
        <UButton type="submit" label="Selanjutnya" class="mt-8" />
      </UFormField>
    </UForm>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
