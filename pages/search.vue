<template>
  <UContainer id="search-section " class="py-6 flex gap-4">
    <div class="search-filter flex flex-col gap-5 w-40">
      <div class="filter-title flex gap-2 items-center">
        <IconFilter />
        <h2 class="text-base font-bold text-black/80 uppercase">Filter</h2>
      </div>
      <div class="filter-item flex flex-col gap-5">
        <h3 class="text-sm text-black/80 font-medium">Batas Harga</h3>
        <div class="flex gap-2 items-center">
          <UInput type="number" placeholder="RP MIN" hide-controls />
          <div class="h-[1px] bg-gray-300 w-10"></div>
          <UInput type="number" placeholder="RP MAX" hide-controls />
        </div>
        <UButton block class="py-2">TERAPKAN</UButton>
      </div>
      <hr />
      <div class="filter-item flex flex-col gap-5">
        <h3 class="text-sm text-black/80 font-medium">Berdasarkan Kategori</h3>
        <div clas="flex flex-col gap-2">
          <UCheckbox label="data dr backend" />
          <UCheckbox label="data dr backend" />
          <UCheckbox label="data dr backend" />
          <UCheckbox label="data dr backend" />
        </div>
      </div>
      <hr />
      <UButton block class="py-2">HAPUS SEMUA</UButton>
    </div>
    <div class="search-result flex-1">
      <div class="search-keyword flex items-center gap-2 text-gray-600">
        <IconLamp />
        <p>Hasil pencarian untuk '<span class="text-primary">Testing keyword</span>'</p>
      </div>
      <div class="search-sort flex items-center gap-2 justify-between px-5 py-3 bg-black/5 mt-4" role="button">
        <div class="search-sort-control flex gap-3 items-center">
          <p class="text-gray-600 text-sm font-normal">Urutkan</p>
          <UButton class="px-6">Termurah</UButton>
          <UButton color="white" class="px-6">Termahal</UButton>
        </div>
        <div class="search-sort-pagination flex gap-5 items-center">
          <p class="text-sm font-normal text-black/80"><span class="text-primary">1</span>/17</p>
          <div>
            <UButton icon="i-heroicons:chevron-left-20-solid" color="gray" size="xs" disabled />
            <UButton icon="i-heroicons:chevron-right-20-solid" color="gray" size="xs" class="bg-black/5" />
          </div>
        </div>
      </div>
      <div class="search-content grid grid-cols-5 gap-3 mt-3">
        <BaseProductCard
          v-for="i in 10"
          :key="`product-${i}`"
          title="Sepatu Sandal Kasual Slingback Mules"
          price="10000"
          image="~/assets/images/test-product.png"
          sale="159"
        />
      </div>
      <div class="flex justify-center mt-8">
        <UPagination v-model:page="page" :total="100" variant="link" :ui="{}" />
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const page = ref(5);
</script>

<style scoped></style>
