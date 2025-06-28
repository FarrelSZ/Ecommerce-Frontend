<template>
  <div class="flex flex-col gap-6 pb-6">
    <section class="banner-section bg-white py-7">
      <UContainer>
        <BaseCarousel width="796px" height="235px" aspect-ratio="3.39/1" :items="items" class="mx-auto" />
      </UContainer>
    </section>
    <section class="category-section">
      <UContainer>
        <div class="category-section-card bg-white">
          <div class="category-section-header p-5 border-b border-black/5">
            <h2 class="text-base text-black/55 font-medium uppercase">Kategori</h2>
          </div>
          <div class="category-section-content grid grid-cols-6">
            <FeatureHomepageCategoryItem
              v-for="cat in categories"
              :key="`cat-${cat.slug}`"
              :title="cat.name"
              :image="cat.icon"
              :slug="cat.slug"
            />
          </div>
        </div>
      </UContainer>
    </section>
    <section class="product-section">
      <UContainer>
        <div class="product-section-header bg-white border-b-4 border-primary p-5">
          <h2 class="text-base text-primary text-center font-medium">Rekomendasi</h2>
        </div>
        <div class="product-section-content grid grid-cols-6 gap-3 mt-3">
          <BaseProductCard
            v-for="product in productList?.data"
            :key="`product-${product.uuid}`"
            :title="product.name"
            :price="product?.price_sale || product?.price"
            :image="product.image_url"
            :slug="product.slug"
            :discount="product?.price_discount_percentage"
          />
        </div>
      </UContainer>
    </section>

    <UContainer class="flex justify-center" role="button">
      <UButton v-if="!session.token" color="white" class="font-normal px-28" to="/login">
        Login untuk Lihat Lainnya
      </UButton>
      <UButton
        v-else-if="productList?.next_page_url"
        color="white"
        class="font-normal px-28 cursor-pointer"
        @click="loadMore"
      >
        Lihat Lainnya
      </UButton>
    </UContainer>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const session = useSession();

const pagination = ref({
  page: 1,
});

const { data: oldProductData } = useNuxtData("product-homepage");

const { data: respSlider } = useApi("/server/api/slider", {
  key: "slider-banner",

  getCachedData() {
    return nuxtApp.payload.data?.["slider-banner"] || nuxtApp.static.data?.["slider-banner"];
  },
});
const { data: categories } = useApi("/server/api/category", {
  key: "category-list",
  transform(response) {
    return (response?.data || []).reduce((result, parent) => {
      result.push(
        ...parent.childs.map((child) => ({
          ...child,
          icon: parent.icon,
          name: `${parent.name} -  ${child.name}`,
        }))
      );
      return result;
    }, []);
  },
  getCachedData() {
    return nuxtApp.payload.data?.["category-list"] || nuxtApp.static.data?.["category-list"];
  },
});

const { data: productList, execute } = useApi("/server/api/product", {
  params: pagination,
  key: "product-homepage",
  onResponse({ response }) {
    if (response.ok) {
      pagination.value.page = response._data.data?.current_page;
    }
  },
  transform(response) {
    if (pagination.value.page === 1) return response?.data;
    const newData = response?.data?.data || [];
    return {
      ...response.data,
      data: [...(oldProductData.value?.data || []), ...newData],
    };
  },
  watch: false,
});

// const items = [
//   "https://picsum.photos/1920/1080?random=1",
//   "https://picsum.photos/1920/1080?random=2",
//   "https://picsum.photos/1920/1080?random=3",
//   "https://picsum.photos/1920/1080?random=4",
//   "https://picsum.photos/1920/1080?random=5",
//   "https://picsum.photos/1920/1080?random=6",
// ];

const items = computed(() => (respSlider.value?.data || [])?.map((slider) => slider.image));

function loadMore() {
  pagination.value.page++;
  execute();
}

useSeoMeta({
  ogImage: () => items.value?.[0],
  twitterImage: () => items.value?.[0],
});
</script>

<style lang="scss" scoped></style>
