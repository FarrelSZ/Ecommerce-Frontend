<template>
  <div>
    <header class="header-orange text-white flex flex-col">
      <LayoutsHeaderProfile v-if="defaultMeta.showProfile" />
      <div class="header-bottom bg-gradient-to-b from-primary to-[#FF6633] flex-1 py-1">
        <UContainer class="header-bottom-container flex justify-between h-full items-center gap-12">
          <BaseLogo />
          <LayoutsSearchBar v-if="defaultMeta.showSearch" class="flex-1" />
          <!-- <div class="mx-10">Cart Button</div> -->
          <UButton v-if="defaultMeta.showCart" variant="link" color="white" :padded="false" class="mx-10">
            <IconCart />
          </UButton>
        </UContainer>
      </div>
    </header>
  </div>
</template>

<script setup>
const route = useRoute();

const defaultMeta = computed(() => {
  return {
    showProfile: route.meta?.header && "showProfile" in route.meta.header ? route.meta.header.showProfile : true,
    showSearch: route.meta?.header && "showSearch" in route.meta.header ? route.meta.header.showSearch : true,
    showCart: route.meta?.header && "showCart" in route.meta.header ? route.meta.header.showCart : true,
  };
});
</script>

<style scoped>
.header-orange {
  height: 120px;
}
</style>
