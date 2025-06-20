<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Daftar Voucher</h3>
        <UButton icon="i-heroicons-plus" to="/seller/voucher/add" size="sm"> Tambah Voucher </UButton>
      </div>
    </template>

    <div class="space-y-6">
      <!-- Tabs -->
      <UTabs
        :items="status"
        :ui="{
          list: {
            base: 'border-b border-gray-200',
            background: '',
            rounded: '',
            shadow: '',
            padding: '',
            height: 'h-10',
            width: 'w-full',
            marker: {
              wrapper: 'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
              base: 'w-full h-full',
              background: 'bg-white',
              rounded: 'rounded-md',
              shadow: 'shadow-sm',
            },
            tab: {
              base: 'relative inline-flex items-center justify-center flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 ui-not-focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out',
              background: '',
              active: 'text-gray-900',
              inactive: 'text-gray-500 hover:text-gray-700',
              height: 'h-8',
              padding: 'px-3',
              size: 'text-sm',
              font: 'font-medium',
              rounded: 'rounded-md',
              shadow: '',
            },
          },
        }"
        class="w-full"
      />

      <!-- Search Form -->
      <form class="flex gap-3 items-center text-sm">
        <span class="text-gray-700">Cari</span>
        <UInput placeholder="Input" class="w-80" size="sm" />
        <UButton variant="outline" size="sm"> Cari </UButton>
      </form>

      <!-- Data Table -->
      <UTable
        :data="items"
        :columns="columns"
        :ui="{
          wrapper: 'relative overflow-x-auto',
          base: 'min-w-full table-fixed',
          divide: 'divide-y divide-gray-300',
          thead: 'bg-gray-50',
          tbody: 'bg-white divide-y divide-gray-200',
          tr: {
            base: '',
            selected: 'bg-gray-50',
            active: 'hover:bg-gray-50',
          },
          th: {
            base: 'text-left rtl:text-right',
            padding: 'px-4 py-3.5',
            color: 'text-gray-900',
            font: 'font-semibold',
            size: 'text-sm',
          },
          td: {
            base: 'whitespace-nowrap',
            padding: 'px-4 py-4',
            color: 'text-gray-500',
            font: '',
            size: 'text-sm',
          },
        }"
      >
        <template #name-cell="{ row }">
          <div class="flex gap-3">
            <img
              class="w-14 h-14 object-cover rounded-md"
              :src="row.voucher_type === 'discount' ? image[row.discount_cashback_type] : image['coin']"
              :alt="`${row.name} voucher`"
            />
            <div class="flex flex-col items-start gap-1">
              <UBadge label="Telah Berakhir" color="gray" variant="soft" size="sm" />
              <span class="text-sm font-medium text-gray-900">
                {{ row.name }}
              </span>
              <span class="text-xs text-gray-500">KODE: {{ row.code }}</span>
            </div>
          </div>
        </template>

        <template #diskon-cell="{ row }">
          <div class="space-y-1">
            <p class="text-sm font-medium text-gray-900">
              {{ row.discount_cashback_type === "fixed" ? "Rp" : "" }}{{ formatNumber(row.discount_cashback_value)
              }}{{ row.discount_cashback_type === "percentage" ? "%" : "" }}
            </p>
            <div v-if="row.voucher_type === 'cashback'" class="flex gap-2 items-center text-xs text-gray-500">
              <UIcon name="i-heroicons-currency-dollar" class="w-3 h-3" />
              Cashback Koin
            </div>
          </div>
        </template>

        <template #BatasPemakaian-cell="{ row }">
          <span class="text-sm text-gray-900">
            {{ formatNumber(row.discount_cashback_max) }}
          </span>
        </template>

        <template #Digunakan-cell="{ row }">
          <span class="text-sm text-gray-900">
            {{ formatNumber(row.used_count) }}
          </span>
        </template>

        <template #action-cell="{ row }">
          <div class="flex flex-col gap-1">
            <UButton label="Ubah" variant="ghost" color="primary" size="xs" @click="handleEdit(row)" />
            <UButton label="Hapus" variant="ghost" color="red" size="xs" @click="handleDelete(row)" />
          </div>
        </template>
      </UTable>
    </div>
  </UCard>
</template>

<script setup>
import VoucherCoin from "~/assets/images/voucher-cashback-coin.png";
import VoucherPercentage from "~/assets/images/voucher-percentage.png";
import VoucherFixed from "~/assets/images/voucher-fixed.png";
const router = useRouter();

// Gunakan path langsung ke public folder atau composable untuk import assets
const image = {
  coin: VoucherCoin,
  percentage: VoucherPercentage,
  fixed: VoucherFixed,
};

// Atau jika ingin menggunakan composable Nuxt untuk assets:
// const { $img } = useNuxtApp()
// const image = {
//   coin: $img("/assets/images/voucher-cashback-coin.png"),
//   percentage: $img("/assets/images/voucher-percentage.png"),
//   fixed: $img("/assets/images/voucher-fixed.png"),
// };

const status = [
  {
    key: "all",
    label: "Semua",
  },
  {
    key: "ongoing",
    label: "Berjalan",
  },
  {
    key: "coming_soon",
    label: "Akan Datang",
  },
  {
    key: "expired",
    label: "Expired",
  },
];

const columns = [
  {
    accessorKey: "name",
    header: "Nama Voucher | Kode",
    enableSorting: false,
  },
  {
    accessorKey: "discount_cashback_value",
    id: "discount",
    header: "Diskon",
    enableSorting: false,
  },
  {
    accessorKey: "discount_cashback_max",
    id: "discount_cashback_max",
    header: "Batas Pemakaian",
    enableSorting: true,
  },
  {
    accessorKey: "used_count",
    id: "used_count",
    header: "Digunakan",
    enableSorting: true,
  },
  {
    id: "action",
  },
];

const items = [
  {
    uuid: "9875b0fc-82df-11ef-bdf6-b1d00190d36e",
    code: "DISCOUNT10000",
    name: "Discount 10000",
    used_count: 0,
    is_public: true,
    voucher_type: "discount",
    discount_cashback_type: "fixed",
    discount_cashback_value: 10000,
    discount_cashback_max: 100,
    start_date: "2024-10-05 06:03:51",
    end_date: "2024-10-12 06:03:51",
  },
  {
    uuid: "9875b0fc-82df-11ef-bdf6-b1d00190d36e",
    code: "DISCOUNT20PERCENT",
    name: "Discount 20%",
    used_count: 5,
    is_public: true,
    voucher_type: "discount",
    discount_cashback_type: "percentage",
    discount_cashback_value: 20,
    discount_cashback_max: 100,
    start_date: "2024-10-05 06:03:51",
    end_date: "2024-10-12 06:03:51",
  },
  {
    uuid: "9875b0fc-82df-11ef-bdf6-b1d00190d36e",
    code: "CASHBACK5000",
    name: "Cashback 5000",
    used_count: 12,
    is_public: true,
    voucher_type: "cashback",
    discount_cashback_type: "fixed",
    discount_cashback_value: 5000,
    discount_cashback_max: 50,
    start_date: "2024-10-05 06:03:51",
    end_date: "2024-10-12 06:03:51",
  },
  {
    uuid: "9875b0fc-82df-11ef-bdf6-b1d00190d36e",
    code: "CASHBACK15PERCENT",
    name: "Cashback 15%",
    used_count: 8,
    is_public: true,
    voucher_type: "cashback",
    discount_cashback_type: "percentage",
    discount_cashback_value: 15,
    discount_cashback_max: 75,
    start_date: "2024-10-05 06:03:51",
    end_date: "2024-10-12 06:03:51",
  },
];

// Format number utility
function formatNumber(value) {
  if (!value) return "0";
  return new Intl.NumberFormat("id-ID").format(value);
}

function handleEdit(row) {
  router.push({
    path: `/seller/voucher/edit/${row.uuid}`,
    state: row,
  });
}

function handleDelete(row) {
  // Add delete logic here
  console.log("Delete voucher:", row.uuid);
}
</script>

<style lang="scss" scoped></style>
