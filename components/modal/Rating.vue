<template>
  <UModal class="flex flex-col">
    <UButton label="Nilai" class="min-w-40 justify-center" />

    <template #body>
      <p class="text-xl font-normal">Nilai Produk</p>
      <div class="space-y-5 mt-8">
        <div class="border border-yellow-500 bg-yellow-50 rounded-sm py-2 px-3 flex gap-2">
          <IconCoinSolid />
          <span class="font-medium">Beri penilaian & dapatkan 25 Koin!</span>
        </div>
        <div class="space-y-2">
          <FeatureProfileOrderCardProduct v-for="a in 3" :key="`product-${a}`" hide-price hide-description size="sm" />
        </div>
        <div class="flex gap-2 items-center">
          <span class="w-44">Kualitas Produk</span>
          <BaseRating v-model="formRating.rating" size="lg" color="yellow" />
          <span
            :class="{
              'text-yellow-500': formRating.rating > 3,
              'text-black/55': formRating.rating <= 3,
            }"
            >{{ reviewMessages[formRating.rating - 1] }}</span
          >
        </div>
        <div>
          <div class="bg-gray-100 px-6 py-3 rounded-sm space-y-3">
            <UTextarea
              placeholder="Bagikan penilaianmu tentang produk ini untuk membantu Pembeli lain."
              class="w-full"
            />
            <div class="flex gap-2">
              <UButton size="xs" variant="soft" icon="i-heroicons:camera-solid" label="Tambah Foto" />
              <UButton size="xs" variant="soft" icon="i-heroicons:video-camera-solid" label="Tambahkan video" />
            </div>
            <p class="text-right text-black/55">Tambahkan 50 karakter dengan 1 foto untuk mendapatkan 25 Koin!</p>
          </div>
        </div>
        <div class="space-y-4">
          <p class="text-base">Tentang Layanan</p>
          <div class="flex gap-2 items-center">
            <span class="w-44">Kecepatan Jasa Kirim</span>
            <BaseRating v-model="formRating.courierRating" size="lg" color="yellow" />
            <span
              :class="{
                'text-yellow-500': formRating.courierRating > 3,
                'text-black/55': formRating.courierRating <= 3,
              }"
              >{{ reviewMessages[formRating.courierRating - 1] }}</span
            >
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-6">
          <UButton class="min-w-36 justify-center" variant="link" color="gray" @click="openReview = false"
            >Nanti Saja</UButton
          >
          <UButton class="min-w-36 justify-center" @click="openReview = false">Ok</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
const formRating = reactive({
  rating: 0,
  courierRating: 0,
});

const reviewMessages = ["Sangat Buruk", "Buruk", "Biasa", "Baik", "Sangat Baik"];
</script>

<style lang="scss" scoped></style>
