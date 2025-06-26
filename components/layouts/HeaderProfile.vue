<template>
  <div class="header-profile bg-primary py-2 text-white">
    <UContainer class="header-profile-container flex justify-end divide-x divide-gray-50/50">
      <template v-if="!session.token">
        <UButton variant="link" :padded="false" class="px-3 text-white hover:text-white" to="/registration">
          Daftar
        </UButton>
        <UButton variant="link" :padded="false" class="px-3 text-white hover:text-white" to="/login"> Login </UButton>
      </template>
      <UDropdownMenu v-else :items="profileItems" class="cursor-pointer flex items-center gap-2">
        <div class="">
          <UAvatar
            :src="session.profile.photo_url"
            :alt="session.profile.name"
            icon="i-heroicons:user"
            img-class="object-cover"
          />
          <p>{{ session.profile.name }}</p>
          <UIcon name="i-heroicons:chevron-down-20-solid" class="w-4 h-4 transition-all" />
        </div>
      </UDropdownMenu>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const session = useSession();

const profileItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Akun Saya",
      icon: "i-heroicons:user",
      to: "/my-account/profile",
    },
    {
      label: "Switch to Seller",
      icon: "i-heroicons:arrow-path",
      to: "/seller",
    },
    {
      label: "Logout",
      icon: "i-heroicons:arrow-left-start-on-rectangle",
      onSelect: session.logout,
    },
  ],
]);
</script>

<style scoped></style>
