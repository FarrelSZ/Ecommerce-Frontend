<template>
  <SellerCard title="Informasi Saldo">
    <div class="space-y-6 mt-4">
      <div class="border rounded p-4 shadow space-y-4">
        <p class="text-black/65">Saldo</p>
        <div class="flex items-center gap-4">
          <span class="text-3xl font-medium">Rp{{ formatNumber(1000) }}</span>
          <UModal v-model="openWithdraw" title="Tarik Saldo">
            <UButton label="Tarik Saldo" @click="openWithdraw = false" class="cursor-pointer" />

            <template #body>
              <UForm class="space-y-4 mt-4">
                <UFormField label="Bank">
                  <USelectMenu :items="['BNI', 'BCA', 'Mandiri', 'BRI']" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="No. Rekening">
                  <UInput size="lg" class="w-full" />
                </UFormField>
                <UFormField label="Nama Pemilik Rekening">
                  <UInput size="lg" class="w-full" />
                </UFormField>
                <UFormField label="Jumlah Penarikan">
                  <UInput type="number" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="Deskripsi">
                  <UTextarea size="lg" class="w-full" />
                </UFormField>
                <div class="flex gap-2 items-center justify-end pt-4">
                  <UButton color="white"> Tutup </UButton>
                  <UButton> Konfirmasi </UButton>
                </div>
              </UForm>
            </template>
          </UModal>
        </div>
      </div>
      <p class="text-lg font-medium">0 Transaksi</p>
      <BaseDataTable :columns="columns" :data="transaction">
        <template #Jumlah-cell="{ row }"> Rp{{ formatNumber(row.amount) }} </template>
      </BaseDataTable>
    </div>
  </SellerCard>
</template>

<script setup>
import { UFormField } from "#components";

definePageMeta({
  breadcrumb: [{ label: "Saldo Penjual" }],
});

const openWithdraw = ref(false);

const columns = [
  {
    accessorKey: "type",
    header: "Tarsaksi Tipe",
    rowClass: "capitalize",
  },
  {
    accessorKey: "amount",
    header: "Jumlah",
    rowClass: "font-bold",
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
  },
  {
    accessorKey: "time",
    header: "Waktu",
  },
];

const transaction = [
  {
    uuid: "01926761-a6c4-71f2-ba2b-71dc3c563540",
    type: "deposit",
    amount: 10000,
    description: "Penjualan produk INV-2-20241006101344",
    time: "2024-10-07 14:28:25",
  },
];
</script>

<style lang="scss" scoped></style>
