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
const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
const pagination = ref({
  page: 1,
});

const formFilter = ref({
  categories: (typeof route.query?.categories === "string" ? [route.query?.categories] : route.query?.categories) || [],
  minimum_price: route.query?.minimum_price || undefined,
  maximum_price: route.query?.maximum_price || undefined,
  sorting_price: route.query?.sorting_price || "asc",
});
const temporaryPrice = reactive({
  minimum_price: route.query?.minimum_price || undefined,
  maximum_price: route.query?.maximum_price || undefined,
});

const { data: categories } = useApi("/server/api/category", {
  key: "category-list",
  transform(response) {
    return (response?.data || []).reduce((result, parent) => {
      result.push(
        ...parent.childs.map((child) => ({
          ...child,
          icon: parent.icon,
          name: `${parent.name} - ${child.name}`,
        }))
      );
      return result;
    }, []);
  },
  getCachedData() {
    return nuxtApp.payload.data?.["category-list"] || nuxtApp.static.data?.["category-list"];
  },
});

const { data, status } = useApi("/server/api/product", {
  params: computed(() => {
    return {
      search: route.query?.search,
      ...formFilter.value,
      ...pagination.value,
      categories: undefined,
      "categories[]": formFilter.value.categories,
    };
  }),
  dedupe: "defer",
});

watch(
  formFilter,
  (newFormFilter) => {
    router.push({
      query: {
        ...route.query,
        ...newFormFilter,
      },
    });
  },
  { deep: true }
);

function applyFilterPrice() {
  formFilter.value.minimum_price = temporaryPrice.minimum_price;
  formFilter.value.maximum_price = temporaryPrice.maximum_price;
}

function resetFilter() {
  formFilter.value = {
    categories: [],
    minimum_price: undefined,
    maximum_price: undefined,
    sorting_price: "asc",
  };

  temporaryPrice.minimum_price = undefined;
  temporaryPrice.maximum_price = undefined;
}

const titleMeta = computed(() =>
  route.query?.search
    ? `Sedang mencari produk ${route.query?.search}`
    : `Sedang mencari produk${route.query.categories ? ` ${route.query.categories}` : ""}`
);

useSeoMeta({
  title: titleMeta,
  ogTitle: () => `${titleMeta.value} | Syopo`,
  twitterTitle: () => `${titleMeta.value} | Syopo`,
  description: titleMeta,
  ogDescription: titleMeta,
  twitterDescription: titleMeta,
});
const page = ref(5);
</script>

<style scoped></style>
