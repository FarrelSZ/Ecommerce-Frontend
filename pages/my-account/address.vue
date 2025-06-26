<template>
  <div>
    <div class="flex justify-between gap-4 items-center">
      <h3 class="text-lg font-medium">Alamat Saya</h3>
      <UButton
        icon="i-heroicons:plus"
        label="Tambah Alamat Baru"
        color="neutral"
        variant="ghost"
        class="cursor-pointer hover:text-primary"
        @click="openEditor = true"
      >
      </UButton>
    </div>
    <hr class="mt-5 mb-3 border-gray-200/60" />
    <h4 class="text-lg font-normal">Alamat</h4>
    <div class="divide-y">
      <div v-if="status === 'pending'" class="space-y-2 mt-4">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
      <template v-else>
        <FeatureProfileAddressCardItem
          v-for="address in addressList?.data"
          :key="address.uuid"
          :item="address"
          @change="handleChange"
        />
      </template>
    </div>
    <FeatureProfileAddressModalMutation ref="modalMutationElement" v-model:open="openEditor" />
  </div>
</template>

<script setup>
const openEditor = ref(false);
const modalMutationElement = ref();

const { data: addressList, status } = useApi("/server/api/address", {
  key: "address-list",
});
function handleChange(address) {
  modalMutationElement.value.setDefaultValue({
    uuid: address.uuid,
    is_default: address.is_default ? true : false,
    receiver_name: address.receiver_name,
    receiver_phone: address.receiver_phone,
    district: address.district,
    postal_code: address.postal_code,
    detail_address: address.detail_address,
    address_note: address.address_note,
    type: address.type,

    city: {
      uuid: address.city.uuid,
      name: address.city.name,
    },
    province: {
      uuid: address.city.province.uuid,
      name: address.city.province.name,
    },
  });
  openEditor.value = true;
}
</script>

<style lang="scss" scoped></style>
