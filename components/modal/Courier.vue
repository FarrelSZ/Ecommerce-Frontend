<template>
  <UModal
    v-model="isOpen"
    :ui="{
      width: 'sm:max-w-2xl',
    }"
  >
    <UButton label="Open" color="neutral" variant="link" />
    <template #body>
      <div class="grid grid-cols-1 divide-y w-full">
        <label
          v-for="option in addressList"
          :key="option.value"
          class="flex flex-col gap-2 py-4 cursor-pointer"
          :class="{ 'bg-primary/5 ring-2 ring-primary/30': addressSelected === option.value }"
        >
          <input type="radio" class="hidden" :value="option.value" v-model="addressSelected" />
          <div class="flex justify-between items-start">
            <div class="flex divide-x">
              <p class="font-medium text-black/85 pr-2">{{ option.label }}</p>
              <p class="font-normal text-black/55 pl-2">{{ option.no_hp }}</p>
            </div>
          </div>
          <div>
            <p class="text-sm text-black/55 font-normal">
              {{ option.description }}
            </p>
            <UBadge
              v-if="option.status"
              :color="option.status === 'default' ? 'primary' : 'gray'"
              variant="outline"
              class="mt-2"
            >
              {{ option.status === "default" ? "Utama" : "Alamat Toko" }}
            </UBadge>
          </div>
        </label>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton color="white" @click="isOpen = false">Nanti Saja</UButton>
        <UButton :disabled="!courierSelected" @click="handleConfirmCourier">Konfirmasi</UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup>
const isOpen = defineModel("open", {
  type: Boolean,
  default: false,
});
const model = defineModel({
  type: Object,
});
const courierSelected = ref();

const items = computed(() => [
  {
    label: "Regular",
    price: "1000",
    value: "REG",
    etd: 7,
  },
  {
    label: "Premium",
    price: "1000",
    value: "PRE",
    etd: 7,
  },
]);

function handleConfirmCourier() {
  isOpen.value = false;
  model.value = items.value.find((item) => item.value === courierSelected.value);
}
</script>

<style lang="scss" scoped></style>
