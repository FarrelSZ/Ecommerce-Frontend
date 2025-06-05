<template>
  <UContainer class="py-5 flex gap-7">
    <div class="w-44 py-4">
      <div class="flex gap-3 items-center">
        <UAvatar alt="Farrel" />
        <!-- <span>{{ session.profile.name }}</span> -->
        <span>Farrel</span>
      </div>
      <hr class="border-gray-200/50 my-4" />
      <LayoutsSidebar :items="links" class="my-account-sidebar" />
    </div>
    <!-- Main Content Area -->
    <div class="flex-1">
      <UCard>
        <NuxtPage />
      </UCard>
    </div>
  </UContainer>
</template>

<script setup>
import { UCard } from "#components";

const route = useRoute();
const wrapper = computed(() => {
  return route.meta.wrapper || UCard;
});
const links = [
  {
    label: "Akun Saya",
    icon: "i-heroicons:user",
    defaultOpen: true,
    children: [
      {
        label: "Profil",
        to: "/my-account/profile",
      },
      {
        label: "Alamat",
        to: "/my-account/address",
      },
      {
        label: "Ubah Password",
        to: "/my-account/change-password",
      },
    ],
  },
  {
    label: "Pesanan Saya",
    icon: "i-heroicons:clipboard-document-list",
    to: "/my-account/orders",
  },
];
</script>

<style scoped>
.my-account-sidebar :deep(.sidebar-item-icon) {
  color: blue;
  height: calc(var(--spacing) * 5) /* 1.25rem = 20px */;
  width: calc(var(--spacing) * 5) /* 1.25rem = 20px */;
}
</style>
