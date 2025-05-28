<template>
  <header class="header-seller flex justify-between gap-2 bg-white px-4 py-3 shadow fixed top-0 left-0 right-0 z-50">
    <UBreadcrumb :items="items" />
    <UDropdownMenu :items="profileItems">
      <template #default="{ open }">
        <div class="flex gap-2 items-center">
          <UAvatar alt="Farrel Syach Zahran" />
          <p>Farrel</p>
          <UIcon
            name="i-heroicons:chevron-down-20-solid"
            class="w-4 h-4 transition-all"
            :class="[open && 'rotate-180']"
          />
        </div>
      </template>
    </UDropdownMenu>
  </header>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

// const route = useRoute();

// const meta = route.meta as {
//   header?: {
//     breadcrumb?: BreadcrumbItem[];
//   };
// };

// const breadcrumb = computed<BreadcrumbItem[]>(() => {
//   const defaultBreadcrumb: BreadcrumbItem[] = [
//     {
//       label: "Beranda",
//       to: "/",
//     },
//   ];

//   if (!Array.isArray(meta.header?.breadcrumb)) {
//     return defaultBreadcrumb;
//   }

//   return [...defaultBreadcrumb, ...meta.header.breadcrumb];
// });

const items = ref<BreadcrumbItem[]>([
  {
    label: "Beranda",
    to: "/",
  },
  {
    label: "Voucher",
    // icon: "i-lucide-link",
    to: "/seller/product",
  },
]);

const profileItems = [
  [
    {
      label: "Switch to Customer",
      icon: "i-heroicons:arrow-path",
    },
    {
      label: "Logout",
      icon: "i-heroicons:arrow-left-start-on-rectangle",
    },
  ],
];
</script>

<style scoped></style>
