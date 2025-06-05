<template>
  <UModal>
    <UButton icon="i-heroicons:plus" label="Tambah Alamat Baru" color="black" variant="link" class="cursor-pointer" />

    <template #content>
      <UCard
        :ui="{
          rounded: 'rounded-sm',
        }"
      >
        <h3 class="text-xl font-normal">Alamat Baru</h3>
        <UForm class="grid grid-cols-2 gap-5 mt-5">
          <UFormField>
            <UInput placeholder="Nama Lengkap" size="lg" />
          </UFormField>
          <UFormField>
            <UInput placeholder="Nomer lengkap" size="lg" />
          </UFormField>
          <UFormField class="col-span-2">
            <UInput>
              <FeatureProfileAddressInputSelectCity />
            </UInput>
          </UFormField>
          <UFormField>
            <UInput placeholder="Kecamatan" size="lg" />
          </UFormField>
          <UFormField>
            <UInput placeholder="Kelurahan" size="lg" />
          </UFormField>
          <UFormField class="col-span-2">
            <UTextarea placeholder="Nama jalan, Gedung, No. rumah" size="lg" class="w-full" />
          </UFormField>
          <UFormField class="col-span-2">
            <UInput placeholder="Detail Lainnya" size="lg" class="w-full" />
          </UFormField>
          <div class="col-span-2">
            <label for="" class="text-sm font-normal text-black/80">Tandai Sebagai: </label>
            <div class="flex gap-2 justify-start my-2">
              <UButton
                size="xs"
                :ui="{
                  padding: {
                    sm: 'py-3 px-3',
                  },
                }"
                >Rumah</UButton
              >
              <UButton
                size="xs"
                :ui="{
                  padding: {
                    sm: 'py-3 px-3',
                  },
                }"
                >Kantor</UButton
              >
            </div>
            <UCheckbox label="Atur Sebagai Alamat Pribadi" />
          </div>
          <div class="flex justify-end mt-6 gap-2 col-span-2">
            <UButton label="nanti saja" class="max-w-36" color="gray" variant="link" />
            <UButton label="ok" />
          </div>
        </UForm>
      </UCard>
    </template>
  </UModal>
</template>

<script setup></script>

<style lang="scss" scoped></style>
