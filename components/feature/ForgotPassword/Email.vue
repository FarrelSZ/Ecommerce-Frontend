<template>
  <div class="flex gap-7 items-center">
    <UButton icon="i-heroicons:arrow-left" variant="link" @click="emit('back')" />
    <h3 class="text-xl font-normal">Reset Password</h3>
  </div>
  <div class="px-16 pb-16 pt-9">
    <UForm class="space-y-6">
      <UFormGroup>
        <UInput placeholder="Email" size="lg" />
      </UFormGroup>
      <UButton block class="uppercase" @click="emit('next')">Berikutnya</UButton>
    </UForm>
  </div>
</template>

<script setup>
import { UForm } from "#components";

const emit = defineEmits(["next", "back"]);
</script>

<style lang="scss" scoped></style>
