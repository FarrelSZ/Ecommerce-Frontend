<template>
  <UContainer v-if="statusDetail === 'pending'" as="section" class="flex flex-col gap-5 py-5">
    <UCard>
      <div class="product-briefing flex gap-8">
        <div class="product-image">
          <USkeleton class="w-[450px] h-[450px]" />
        </div>
        <div class="product-information flex-1 space-y-6">
          <USkeleton class="w-full h-6" />
          <USkeleton class="w-10/12 h-6" />
          <USkeleton class="w-8/12 h-6" />
          <USkeleton class="w-10/12 h-6" />
          <USkeleton class="w-6/12 h-6" />
        </div>
      </div>
    </UCard>
  </UContainer>
  <UContainer v-else as="section" class="flex flex-col gap-5 py-5">
    <UBreadcrumb :links="links" :ui="uiBreadcrumb" />
    <UCard>
      <div class="product-briefing flex gap-8">
        <div class="product-image">
          <FeatureProductDetailCarousel :items="sliders" />
        </div>
        <div class="product-information flex-1">
          <div class="product-title">
            <h2>{{ detailProduct.name }}</h2>
            <div class="product-summary flex gap-4 mt-2 divide-x">
              <div class="product-summary-item">
                <span class="text-primary">{{ detailProduct.rating }}</span>
                <BaseRating :model-value="detailProduct.rating" disabled />
              </div>
              <div class="product-summary-item">
                <span class="text-black/80">{{ detailProduct.rating_count }}</span>
                <span class="product-summary-item-description">Penilaian</span>
              </div>
              <div class="product-summary-item">
                <span class="text-black/80">{{ detailProduct.sale_count }}</span>
                <span class="product-summary-item-description">Terjual</span>
              </div>
            </div>
          </div>
          <div class="product-price flex gap-4 items-center my-3 bg-gray-50 p-4">
            <template v-if="detailProduct.price_sale">
              <p class="text-gray-400 line-through font-normal">Rp{{ rawPrice }}</p>
              <p class="text-primary font-normal text-3xl">Rp{{ salePrice }}</p>
              <UBadge size="xs"> {{ detailProduct.price_discount_percentage }}% OFF </UBadge>
            </template>

            <p v-else class="text-primary font-normal text-3xl">Rp{{ rawPrice }}</p>
          </div>
          <div class="product-variant">
            <div class="flex flex-col gap-6">
              <div v-for="variant in detailProduct.variations" :key="variant.name" class="flex gap-2 items-center">
                <p class="w-28 text-black/55 text-sm">{{ variant.name }}</p>
                <div class="flex flex-wrap gap-2">
                  <UButton
                    v-for="values in variant.values"
                    :key="`${variant.name}-${values}`"
                    :color="formProduct[variant.name] === values ? 'primary' : 'white'"
                    :variant="formProduct[variant.name] === values ? 'outline' : 'solid'"
                    :ui="{
                      base: 'min-w-20 justify-center',
                      padding: {
                        sm: 'px-2 py-2',
                      },
                    }"
                    @click="formProduct[variant.name] = values"
                  >
                    {{ values }}
                  </UButton>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-2 items-center mt-6">
            <p class="w-28 text-black/55 text-sm">Kuantitas</p>
            <BaseInputQuantity v-model="formProduct.quantity" :max="detailProduct.stock || 0" />
          </div>
          <UButton class="mt-6" variant="soft" :disabled="statusCart === 'pending'" @click="handleAddToCart">
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
          <UAvatar :alt="detailProduct.seller.store_name" size="3xl" img-class="object-cover" />
          <div>
            <h3>{{ detailProduct.seller.store_name }}</h3>
            <UButton color="white" size="xs" class="mt-2" :to="`/shop/${detailProduct.seller.username}`">
              <IconShop /> Kunjungi Toko
            </UButton>
          </div>
        </div>
        <div class="w-[1px] bg-slate-200" />
        <div class="grid grid-cols-2 items-center flex-1">
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Penilaian</p>
            <p class="text-primary">{{ detailProduct.rating_count }}</p>
          </div>
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Bergabung</p>
            <p class="text-primary">{{ detailProduct.join_date }}</p>
          </div>
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Produk</p>
            <p class="text-primary">{{ detailProduct.product_count }}</p>
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
                    label: detailProduct.category.parent.name,
                    to: `/search?categories=${detailProduct.category.slug}`,
                  },
                  {
                    label: detailProduct.category.name,
                    to: `/search?categories=${detailProduct.category.slug}`,
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
            <div class="text-sm font-normal">{{ detailProduct.stock }}</div>
          </div>
          <div class="product-detail-item">
            <p>Dikirim dari</p>
            <div class="text-sm font-normal">
              {{ detailProduct.seller.send_from.city.name }}
            </div>
          </div>
        </div>
        <div class="product-detail-title">
          <h3>Deskripsi Produk</h3>
        </div>
        <div class="text-sm text-black/80 whitespace-pre-line" v-text="detailProduct.description" />
      </div>
    </UCard>
    <FeatureProductDetailReview :detail="detailProduct" />
    <div v-if="detailProduct.other_product?.length" class="flex flex-col gap-4 mt-2">
      <div class="flex justify-between gap-2 items-cente">
        <h4 class="uppercase text-black/55 font-medium">Produk lain dari toko ini</h4>
        <UButton variant="link" class="font-thin" :padded="false" :to="`/shop/${detailProduct.seller.username}`">
          Lihat Semua <UIcon name="i-heroicons:chevron-right" />
        </UButton>
      </div>
      <div class="grid grid-cols-6 gap-3">
        <BaseProductCard
          v-for="product in detailProduct.other_product"
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
import useVuelidate from "@vuelidate/core";
import { maxValue, minValue, required } from "@vuelidate/validators";

const nuxtApp = useNuxtApp();
const route = useRoute();

const toast = useToast();

const formProduct = useState("form-product", () => ({
  quantity: 1,
}));

const { data: detailProduct, status: statusDetail } = useApi(
  computed(() => `/server/api/product/${route.params.slug}`),
  {
    onResponse({ response }) {
      if (response.ok) {
        response._data.data.variations.forEach((variation) => {
          formProduct.value[variation.name] = "";
        });
      }

      if (response.status === 404) {
        nuxtApp.runWithContext(() => {
          throw showError({
            statusCode: 404,
            message: "Produk tidak ditemukan",
          });
        });
      }
    },
    transform(response) {
      return response?.data || {};
    },
  }
);

const rules = computed(() => {
  const _rule = {
    quantity: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(detailProduct.value?.stock || 0),
    },
  };

  detailProduct.value?.variations?.forEach((variant) => {
    Object.assign(_rule, {
      [variant.name]: { required },
    });
  });

  return _rule;
});

const v$ = useVuelidate(rules, formProduct, {
  $autoDirty: true,
});

const sliders = computed(() => {
  return [
    { type: "video", src: detailProduct.value?.video_url },
    ...(detailProduct.value?.images || []).map((img) => ({
      type: "img",
      src: img,
    })),
  ];
});

const rawPrice = computed(() => formatNumber(detailProduct.value?.price || 0));
const salePrice = computed(() => formatNumber(detailProduct.value?.price_sale || 0));

const links = computed(() => [
  {
    label: "Fardeka",
    to: "/",
  },
  {
    label: detailProduct.value.category.parent.name,
    to: `/search?categories=${detailProduct.value.category.slug}`,
  },
  {
    label: detailProduct.value.category.name,
    to: `/search?categories=${detailProduct.value.category.slug}`,
  },
  {
    label: detailProduct.value.name,
  },
]);

const uiBreadcrumb = {
  active: "text-black/80",
  inactive: "text-[#0055AA]",
  li: "text-black/80",
  base: "font-normal",
};

const { execute: addToCart, status: statusCart } = useSubmit("/server/api/cart", {
  onResponse({ response }) {
    if (response.ok) {
      toast.add({
        color: "green",
        title: "Produk berhasil ditambahkan ke keranjang",
      });
      refreshNuxtData("cart");
    }
  },
});

async function handleAddToCart() {
  const isValid = await v$.value.$validate();
  if (!isValid)
    return toast.add({
      color: "red",
      title: v$.value.$errors?.[0]?.$message?.replace("Value", v$.value.$errors?.[0]?.$property),
    });

  const formData = new FormData();
  formData.append("product_uuid", detailProduct.value?.uuid);
  formData.append("qty", formProduct.value.quantity);

  detailProduct.value?.variations?.forEach((variant, index) => {
    formData.append(`variations[${index}][label]`, variant.name);
    formData.append(`variations[${index}][value]`, formProduct.value[variant.name]);
  });

  addToCart(formData);
}

const titleMeta = computed(
  () =>
    `Beli ${detailProduct.value?.name} Hanya Rp${detailProduct.value?.price_sale ? salePrice.value : rawPrice.value}`
);

useSeoMeta({
  title: titleMeta,
  ogTitle: () => `${titleMeta.value} | Syopo`,
  twitterTitle: () => `${titleMeta.value} | Syopo`,
  ogImage: () => detailProduct.value?.images?.[0],
  twitterImage: () => detailProduct.value?.images?.[0],
  twitterCard: "summary_large_image",
});
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
