<template>
  <div class="space-y-3">
    <BaseTabs
      :items="items"
      :ui="{
        list: {
          height: 'h-full',
          tab: {
            font: 'font-normal',
            height: 'h-14',
          },
        },
      }"
      :content="false"
    />
    <UInput
      leading-icon="i-heroicons:magnifying-glass"
      size="lg"
      class="w-full"
      placeholder="Kamu bisa cari berdasarkan Nama Penjual, No. Pesanan atau Nama Produk"
      :ui="{
        color: {
          white: {
            outline: 'bg-gray-200/50 ring-0 placeholder-gray-500',
          },
        },
      }"
    />
    <UCard
      v-for="i in 4"
      :key="`order-${i}`"
      :ui="{
        base: 'text-sm text-black/85',
        divide: 'divide-dashed',
        footer: {
          background: 'bg-yellow-50/30',
        },
      }"
    >
      <template #default
        ><div class="flex justify-between gap-4 items-center">
          <div class="flex gap-2 items-center">
            <span class="font-semibold">SHOP NAME</span>
            <UButton color="white" size="xs" :to="`/shop/sellerusername`"> <IconShop /> Kunjungi Toko </UButton>
          </div>
          <div class="divide-x flex">
            <div class="flex gap-2 items-center text-teal-500 pr-2">
              <UIcon name="i-heroicons:truck" class="w-4 h-4" />
              <span>Ini nanti deskripsi dari paket yang telah sampai</span>
            </div>
            <span class="text-primary pl-2">Selesai</span>
          </div>
        </div>
        <hr class="my-3" />
        <NuxtLink class="space-y-3" to="/my-account/orders/order-id">
          <FeatureProfileOrderCardProduct v-for="a in 3" :key="`product-${a}`" />
        </NuxtLink>
      </template>
      <template #footer>
        <div class="space-y-6">
          <div class="flex justify-end">
            <div class="flex gap-2 items-center">
              <img src="~/assets/images/garansi.png" class="h-4 w-4" />
              <span class="text-black/80">Total Pesanan:</span>
              <span class="text-primary text-2xl">Rp{{ formatNumber(1000) }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center gap-4">
            <div class="text-xs">
              <p class="text-black/55">Nilai produk sebelum <span class="underline">31-10-2024</span></p>
              <p class="text-primary">Nilai sekarang & dapatkan 25 Koin Syopo!</p>
            </div>
            <ModalRating class="cursor-pointer" />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  wrapper: "div",
});

const openReview = ref(false);

const formRating = reactive({
  rating: 0,
  courierRating: 0,
});

const reviewMessages = ["Sangat Buruk", "Buruk", "Biasa", "Baik", "Sangat Baik"];

const items = [
  {
    label: "Semua",
    key: "all",
  },
  {
    label: "Belum Bayar",
    key: "pending_payment",
  },
  {
    label: "Sedang Dikemas",
    key: "on_processing",
  },
  {
    label: "Dikirim",
    key: "on_delivery",
  },
  {
    label: "Selesai",
    key: "done",
  },
  {
    label: "Dibatalkan",
    key: "failed",
  },
];
</script>

<style lang="scss" scoped></style>
