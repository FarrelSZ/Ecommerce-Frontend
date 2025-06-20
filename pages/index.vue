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
          <div class="category-section-content grid grid-cols-10">
            <FeatureHomepageCategoryItem
              v-for="i in 20"
              :key="`cat-${i}`"
              title="Elektronik"
              src="~/assets/images/tv.png"
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
            v-for="i in 36"
            :key="`product-${i}`"
            title="Kawabata Sepatu Sandal Kasual Slingback Mules"
            price="10000"
            sale="50"
            discount="30"
            image="https://s3-alpha-sig.figma.com/img/48e9/7de7/d13128b9ad75dda5a6e64cd6c03b5de2?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I946mKhtIxrdSXQGZyOTw~qDLDwCmvBgsJnHd9w1kUtRnQwjUglcgZ89Y0UnWaLhdDPqeVUYTzntmRAfiLF0aXnwV7R~5LP2dsSq4pFz6aDJmfqAhzk3mrP9g2sp0W-Wm9FvUydrqE0PukRb8wlelWWinew6gPV0cMsYrjCJgXoiFWE3BY1xc7tN6ze~1eyag0Ig4mdG27FgS527RrU03778yo3ttMfHFAfk9UggrWHuFWAYp2XiLgFqr~3~6uboaVVhBTqpus61V0-0SYoR-5JPWF9BCG9c-1qfk494trUMNyfm3xUVgNoc1Mws4WS5Bo~0bhcAbjGZmVlq3Ntc9Q__"
            :slug="`product-${i}`"
          />
        </div>
      </UContainer>
    </section>

    <UContainer class="flex justify-center" role="button">
      <UButton class="font-normal px-28">Login untuk lihat lainnya</UButton>
    </UContainer>
  </div>
</template>

<script setup>
const items = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
  "https://picsum.photos/1920/1080?random=4",
  "https://picsum.photos/1920/1080?random=5",
  "https://picsum.photos/1920/1080?random=6",
];
</script>

<style lang="scss" scoped></style>
