<template>
  <UContainer as="section" class="flex flex-col gap-5 py-5">
    <UBreadcrumb :links="links" :ui="uiBreadcrumb" />
    <UCard>
      <div class="product-briefing flex gap-8">
        <div class="product-image">
          <FeatureProductDetailCarousel :items="items" />
        </div>
        <div class="product-information flex-1">
          <div class="product-title">
            <h2>{{ dataDummy.name }}</h2>
            <div class="product-summary flex gap-4 mt-2 divide-x">
              <div class="product-summary-item">
                <span class="text-primary">{{ dataDummy.rating }}</span>
                <BaseRating :model-value="dataDummy.rating" disabled />
              </div>
              <div class="product-summary-item">
                <span class="text-black/80">{{ dataDummy.rating_count }}</span>
                <span class="product-summary-item-description">Penilaian</span>
              </div>
              <div class="product-summary-item">
                <span class="text-black/80">{{ dataDummy.sale_count }}</span>
                <span class="product-summary-item-description">Terjual</span>
              </div>
            </div>
          </div>
          <div class="product-price flex gap-4 items-center my-3 bg-gray-50 p-4">
            <p class="text-gray-400 line-through font-normal">Rp{{ formatNumber(249000) }}</p>
            <p class="text-primary font-normal text-3xl">Rp{{ formatNumber(125000) }}</p>
            <UBadge size="xs">50% OFF</UBadge>
          </div>
          <div class="product-variant">
            <div class="flex flex-col gap-6">
              <div v-for="variant in dataDummy.variations" :key="variant.name" class="flex gap-2 items-center">
                <p class="w-28 text-black/55 text-sm">{{ variant.name }}</p>
                <div class="flex flex-wrap gap-2">
                  <UButton
                    v-for="values in variant.values"
                    :key="`${variant.name}-${values}`"
                    :color="isVariantSelected(variant.name, values) ? 'primary' : 'white'"
                    :variant="isVariantSelected(variant.name, values) ? 'solid' : 'outline'"
                    @click="selectVariant(variant.name, values)"
                    :ui="{
                      base: 'min-w-20 justify-center cursor-pointer',
                      padding: {
                        sm: 'px-2 py-2',
                      },
                    }"
                  >
                    {{ values }}
                  </UButton>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-2 items-center mt-6">
            <p class="w-28 text-black/55 text-sm">Kuantitas</p>
            <BaseInputQuantity v-model="quantity" />
          </div>

          <!-- Display selected variants -->
          <div v-if="Object.keys(selectedVariants).length > 0" class="mt-4 p-3 bg-blue-50 rounded">
            <p class="text-sm font-medium mb-2">Pilihan Anda:</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(value, key) in selectedVariants"
                :key="key"
                class="text-xs bg-primary text-white px-2 py-1 rounded"
              >
                {{ key }}: {{ value }}
              </span>
            </div>
          </div>

          <UButton class="mt-6" variant="soft" @click="addToCart">
            <IconCartPlus />
            Masukkan Keranjang
          </UButton>
          <hr class="my-5" />
          <div class="flex gap-5">
            <div class="flex gap-2">
              <img src="~/assets/images/garansi.png" />
              <p class="text-black/80 text-sm">Garansi Fardeka</p>
            </div>
            <p class="text-black/55 text-sm">Dapatkan barang pesananmu atau uang kembali.</p>
          </div>
        </div>
      </div>
    </UCard>
    <UCard>
      <div class="product-seller flex gap-6 items-stretch">
        <div class="flex gap-6 items-center w-96">
          <UAvatar :alt="dataDummy.seller.store_name" size="3xl" />
          <div>
            <h3>{{ dataDummy.seller.store_name }}</h3>
            <UButton color="white" size="xs" class="mt-2" :to="`/shop/${dataDummy.seller.username}`">
              <IconShop /> Kunjungi Toko
            </UButton>
          </div>
        </div>
        <div class="w-[1px] bg-slate-200" />
        <div class="grid grid-cols-2 items-center flex-1">
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Penilaian</p>
            <p class="text-primary">{{ dataDummy.seller.rating_count }}</p>
          </div>
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Bergabung</p>
            <p class="text-primary">{{ dataDummy.seller.join_date }}</p>
          </div>
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Produk</p>
            <p class="text-primary">{{ dataDummy.seller.product_count }}</p>
          </div>
        </div>
      </div>
    </UCard>
    <UCard>
      <div class="product-detail flex flex-col gap-6">
        <div class="product-detail-title bg-gray-50 p-3">
          <h3>Spesifikasi Produk</h3>
        </div>
        <div class="flex flex-col gap-4">
          <div class="product-detail-item">
            <p>Kategori</p>
            <div>
              <UBreadcrumb
                :links="[
                  {
                    label: dataDummy.category.parent.name,
                    to: `/`,
                  },
                  {
                    label: dataDummy.category.name,
                    to: `/categories/${dataDummy.category.parent.slug}/${dataDummy.category.slug}`,
                  },
                ]"
                :ui="{
                  ...uiBreadcrumb,
                  active: 'text-[#0055AA]',
                }"
              />
            </div>
          </div>
          <div class="product-detail-item">
            <p>Stok</p>
            <div class="text-sm font-normal">{{ dataDummy.stock }}</div>
          </div>
          <div class="product-detail-item">
            <p>Dikirim dari</p>
            <div class="text-sm font-normal">
              {{ dataDummy.seller.send_from.city.name }}
            </div>
          </div>
        </div>
        <div class="product-detail-title">
          <h3>Deskripsi Produk</h3>
        </div>
        <div class="text-sm text-black/80 whitespace-pre-line" v-text="dataDummy.description" />
      </div>
    </UCard>
    <UCard>
      <h3 class="text-lg font-normal text-black/85">Penilaian Produk</h3>
      <div class="mt-3 border border-primary-100/80 bg-primary-50/30 rounded-sm p-8 flex gap-8 items-center">
        <div class="flex flex-col items-center">
          <p class="text-primary text-lg">
            <span class="text-3xl">{{ dataDummy.rating }}</span> dari 5
          </p>
          <BaseRating :model-value="dataDummy.rating" disabled size="lg" class="mt-2" />
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <UButton
            :variant="isReviewFilterSelected('all') ? 'solid' : 'outline'"
            :color="isReviewFilterSelected('all') ? 'primary' : 'gray'"
            size="xs"
            class="min-w-24 text-sm justify-center cursor-pointer"
            @click="filterReviews('all')"
          >
            Semua
          </UButton>
          <div class="flex flex-row-reverse gap-2">
            <UButton
              v-for="(i, index) in 5"
              :key="`rating-${i}`"
              :variant="isReviewFilterSelected(`${i}-star`) ? 'solid' : 'outline'"
              :color="isReviewFilterSelected(`${i}-star`) ? 'primary' : 'gray'"
              size="xs"
              class="min-w-24 text-sm justify-center cursor-pointer"
              @click="filterReviews(`${i}-star`)"
            >
              {{ i }} Bintang ({{ dataDummy.review_summary[i] || 0 }})
            </UButton>
          </div>
          <UButton
            :variant="isReviewFilterSelected('with-comment') ? 'solid' : 'outline'"
            :color="isReviewFilterSelected('with-comment') ? 'primary' : 'gray'"
            size="xs"
            class="min-w-24 text-sm justify-center cursor-pointer"
            @click="filterReviews('with-comment')"
          >
            Dengan Komentar ({{ dataDummy.review_summary.with_description }})
          </UButton>
          <UButton
            :variant="isReviewFilterSelected('with-media') ? 'solid' : 'outline'"
            :color="isReviewFilterSelected('with-media') ? 'primary' : 'gray'"
            size="xs"
            class="min-w-24 text-sm justify-center cursor-pointer"
            @click="filterReviews('with-media')"
          >
            Dengan Media ({{ dataDummy.review_summary.with_attachment }})
          </UButton>
        </div>
      </div>

      <!-- Show current filter -->
      <div v-if="selectedReviewFilter !== 'all'" class="mt-4 p-3 bg-blue-50 rounded">
        <p class="text-sm">
          Filter aktif: <span class="font-medium">{{ getFilterLabel(selectedReviewFilter) }}</span>
        </p>
      </div>

      <div class="flex flex-col mt-4 divide-y">
        <div v-for="(review, index) in filteredReviews" :key="`review-${index}`" class="flex gap-3 py-4">
          <UAvatar alt="Irsyaad" size="lg" />
          <div class="flex-1">
            <p>Irsyaad</p>
            <BaseRating :model-value="review.rating" disabled class="mt-1" />
            <div class="flex gap-1 mt-0.5 text-black/55 text-xs">
              <p>2024-04-10 05:27</p>
              |
              <p>Variasi: Vermont Camel, L</p>
            </div>
            <p v-if="review.comment" class="mt-2 text-sm text-black/80">{{ review.comment }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-end pt-5">
        <BasePagination v-model="page" :total="filteredReviews.length" />
      </div>
    </UCard>
    <div class="flex flex-col gap-4 mt-2">
      <div class="flex justify-between gap-2 items-center">
        <h4 class="uppercase text-black/55 font-medium">Produk lain dari toko ini</h4>
        <UButton variant="link" class="font-thin" :padded="false" :to="`/shop/${dataDummy.seller.username}`">
          Lihat Semua <UIcon name="i-heroicons:chevron-right" />
        </UButton>
      </div>
      <div class="grid grid-cols-6 gap-3">
        <BaseProductCard
          v-for="product in dataDummy.other_product"
          :key="`product-${product.uuid}`"
          :title="product.name"
          :price="product.price"
          :image="product.image_url"
          :slug="product.slug"
          :sale="product.sale_count"
          :discount="product.price_discount_percentage"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const page = ref(1);
const quantity = ref(1);

// Add reactive state for selected variants
const selectedVariants = ref({});

// Add reactive state for review filter
const selectedReviewFilter = ref("all");

// Sample reviews data
const allReviews = ref([
  { id: 1, rating: 5, comment: "Produk sangat bagus, sesuai dengan deskripsi!", hasMedia: true },
  { id: 2, rating: 4, comment: "Kualitas oke, pengiriman cepat", hasMedia: false },
  { id: 3, rating: 5, comment: "", hasMedia: true },
  { id: 4, rating: 3, comment: "Lumayan, tapi agak kecil", hasMedia: false },
  { id: 5, rating: 4, comment: "Bagus, recommend!", hasMedia: true },
]);

// Function to select variant
const selectVariant = (variantName, value) => {
  selectedVariants.value[variantName] = value;
  console.log("Selected variants:", selectedVariants.value);
};

// Function to check if variant is selected
const isVariantSelected = (variantName, value) => {
  return selectedVariants.value[variantName] === value;
};

// Function to add to cart
const addToCart = () => {
  // Check if all required variants are selected
  const requiredVariants = dataDummy.value.variations.map((v) => v.name);
  const selectedVariantNames = Object.keys(selectedVariants.value);

  const missingVariants = requiredVariants.filter((variant) => !selectedVariantNames.includes(variant));

  if (missingVariants.length > 0) {
    alert(`Pilih ${missingVariants.join(", ")} terlebih dahulu`);
    return;
  }

  console.log("Adding to cart:", {
    product: dataDummy.value.name,
    variants: selectedVariants.value,
    quantity: quantity.value,
  });

  // Add your cart logic here
  alert("Produk berhasil ditambahkan ke keranjang!");
};

// Function to filter reviews
const filterReviews = (filterType) => {
  selectedReviewFilter.value = filterType;
  console.log("Filter reviews by:", filterType);
};

// Function to check if review filter is selected
const isReviewFilterSelected = (filterType) => {
  return selectedReviewFilter.value === filterType;
};

// Function to get filter label
const getFilterLabel = (filterType) => {
  const labels = {
    all: "Semua",
    "5-star": "5 Bintang",
    "4-star": "4 Bintang",
    "3-star": "3 Bintang",
    "2-star": "2 Bintang",
    "1-star": "1 Bintang",
    "with-comment": "Dengan Komentar",
    "with-media": "Dengan Media",
  };
  return labels[filterType] || filterType;
};

// Computed property for filtered reviews
const filteredReviews = computed(() => {
  if (selectedReviewFilter.value === "all") {
    return allReviews.value;
  }

  if (selectedReviewFilter.value.includes("-star")) {
    const rating = parseInt(selectedReviewFilter.value.split("-")[0]);
    return allReviews.value.filter((review) => review.rating === rating);
  }

  if (selectedReviewFilter.value === "with-comment") {
    return allReviews.value.filter((review) => review.comment && review.comment.length > 0);
  }

  if (selectedReviewFilter.value === "with-media") {
    return allReviews.value.filter((review) => review.hasMedia);
  }

  return allReviews.value;
});

const dataDummy = computed(() => {
  return {
    uuid: "ebfbf3ac-8010-11ef-9abb-3dda8f3f8c01",
    name: "Produk 100",
    slug: "produk-100",
    price: 100000,
    price_sale: 80000,
    rating: 4,
    rating_count: 2,
    sale_count: 0,
    price_discount_percentage: 20,
    stock: 68,
    category: {
      slug: "makanan",
      name: "Makanan",
      description: null,
      parent: {
        slug: "makanan-minuman",
        name: "Makanan & Minuman",
        description: null,
      },
    },
    description: "Deskripsi produk 100. Lorem ipsum bla\n bla bla",
    weight: 9,
    length: 34,
    width: 34,
    height: 97,
    video_url: "http://localhost:8000/storage/attachment.mp4",
    seller: {
      username: "azizah",
      store_name: "Azizah Store",
      photo_url: "http://localhost:8000/storage/user-photo/iAdzpaTT8wNzF58ZQ67Ys4YwTzF3tLFY3msm.jpg",
      product_count: 33,
      rating_count: 66,
      join_date: "2 weeks ago",
      send_from: {
        uuid: "8c438746-79c5-11ef-b707-97a05ceb87e2",
        is_default: true,
        receiver_name: "Azis Hapidin",
        receiver_phone: "08888",
        city: {
          uuid: "ee8eb26c-78fe-11ef-bd77-9e4478916c69",
          province: {
            uuid: "ee8d857c-78fe-11ef-bd77-9e4478916c69",
            name: "Bali",
          },
          external_id: 128,
          name: "Kabupaten Gianyar",
        },
        district: "Bojong",
        postal_code: "43222",
        detail_address: "Jl. ABC No. 123",
        address_note: "Dekat tugu pahlawan",
        type: "home",
      },
    },
    images: [
      "http://localhost:8000/storage/attachment2.jpg",
      "http://localhost:8000/storage/attachment4.jpg",
      "http://localhost:8000/storage/attachment1.jpg",
      "http://localhost:8000/storage/attachment3.jpg",
    ],
    variations: [
      {
        name: "Ukuran",
        values: ["M", "L", "XL"],
      },
      {
        name: "Warna",
        values: ["Hitam", "Kuning", "Biru"],
      },
    ],
    review_summary: {
      1: 0,
      2: 1,
      3: 1,
      4: 2,
      5: 2,
      with_attachment: 3,
      with_description: 4,
    },
    other_product: [
      {
        uuid: "ebd71974-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 26",
        slug: "produk-26",
        price: 86971,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment1.jpg",
        stock: 66,
      },
      {
        uuid: "ebd984de-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 31",
        slug: "produk-31",
        price: 95979,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment1.jpg",
        stock: 79,
      },
      {
        uuid: "ebe6e782-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 58",
        slug: "produk-58",
        price: 51470,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment4.jpg",
        stock: 59,
      },
      {
        uuid: "ebec2e90-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 68",
        slug: "produk-68",
        price: 37069,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment3.jpg",
        stock: 75,
      },
      {
        uuid: "ebf0821a-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 77",
        slug: "produk-77",
        price: 92435,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment1.jpg",
        stock: 95,
      },
      {
        uuid: "ebf563c0-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 87",
        slug: "produk-87",
        price: 65521,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment2.jpg",
        stock: 12,
      },
    ],
  };
});

const links = computed(() => [
  {
    label: "Fardeka",
    to: "/",
  },
  {
    label: dataDummy.value.category.parent.name,
    to: `/`,
  },
  {
    label: dataDummy.value.category.name,
    to: `/categories/${dataDummy.value.category.parent.slug}/${dataDummy.value.category.slug}`,
  },
  {
    label: dataDummy.value.name,
  },
]);

const uiBreadcrumb = {
  active: "text-black/80",
  inactive: "text-[#0055AA]",
  li: "text-black/80",
  base: "font-normal",
};

// ini buat produk lainnya
const items = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
  "https://picsum.photos/1920/1080?random=4",
  "https://picsum.photos/1920/1080?random=5",
  "https://picsum.photos/1920/1080?random=6",
];
</script>

<style scoped>
.product-summary > div:not(:first-child) {
  padding-left: 16px;
}

.product-summary-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.product-summary-item span {
  text-decoration-line: underline;
  text-underline-offset: 4px;
}

span.product-summary-item-description {
  text-decoration-line: none;
  color: color-mix(in oklab, var(--color-black) 50%, transparent);
  font-size: var(--text-sm);
  line-height: var(--tw-leading, var(--text-sm--line-height));
}

.product-detail-title h3 {
  font-size: var(--text-lg);
  line-height: var(--tw-leading, var(--text-lg--line-height));
  font: normal;
  color: color-mix(in oklab, var(--color-black) 85%, transparent);
}

.product-detail-item {
  display: flex;
  gap: 8px;
}

.product-detail-item > p {
  color: color-mix(in oklab, var(--color-black) 40%, transparent);
  font-size: var(--text-sm);
  line-height: var(--tw-leading, var(--text-sm--line-height));
  width: calc(var(--spacing) * 40);
}
</style>
