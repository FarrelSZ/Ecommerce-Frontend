<template>
  <div class="seller-layout flex flex-col min-h-screen relative text-slate-800">
    <LayoutsHeaderSeller />
    <aside class="seller-sidebar bg-white p-4 fixed left-0 bottom-0">
      <LayoutsSidebar :items="sidebarItems" />
    </aside>
    <main class="main-content flex-1 bg-black/10">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Interface yang sesuai dengan kebutuhan sidebar
interface SidebarItem {
  label: string;
  icon?: string;
  to?: string;
  children?: SidebarItem[];
}

const sidebarItems = ref<SidebarItem[]>([
  {
    label: "Pesanan",
    icon: "i-heroicons:clipboard-document-list",
    to: "/seller/order",
  },
  {
    label: "Produk",
    icon: "i-heroicons:inbox-stack", // Perbaiki icon yang duplikat
    children: [
      {
        label: "Produk Saya",
        to: "/seller/product",
      },
      {
        label: "Tambah Produk Baru",
        to: "/seller/product/add",
      },
    ],
  },
  {
    label: "Voucher",
    icon: "i-heroicons:receipt-percent",
    to: "/seller/voucher",
  },
  {
    label: "Keuangan",
    icon: "i-heroicons:banknotes",
    children: [
      {
        label: "Saldo Saya",
        to: "/seller/balance",
      },
    ],
  },
]);
</script>

<style scoped>
.seller-sidebar {
  top: 56px;
  width: 240px;
}
</style>
