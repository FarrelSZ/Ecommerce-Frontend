<template>
  <div class="space-y-9">
    <div class="flex items-center justify-between">
      <h3 class="text-base font-semibold leading-6 text-gray-900">Daftar Produk</h3>
      <UButton icon="i-heroicons-plus" to="/seller/voucher/add" size="sm"> Tambah Produk </UButton>
    </div>

    <div class="flex flex-col flex-1 w-full space-y-6">
      <div class="flex px-4 py-3.5 border-b border-accented">
        <UInput
          v-model="globalFilter"
          class="w-lg"
          placeholder="Cari Nama Produk, SKU Induk, Kode Variasi, ID Produk, Kategori"
        />
      </div>
      <BaseDataTable ref="table" v-model:global-filter="globalFilter" :data="products"> </BaseDataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
const table = useTemplateRef("table");
const globalFilter = ref("45");

const router = useRouter();
const columns = [
  {
    accessorKey: "uuid",
    header: "uuid",
    cell: ({ row }: { row: any }) => `#${row.getValue("uuid")}`,
  },
  {
    accessorKey: "sale_count",
    header: "Penjualan",
    cell: ({ row }: { row: any }) => {
      return new Date(row.getValue("date")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    id: "3",
    key: "price",
    label: "Harga",
  },
  {
    id: "4",
    key: "stock",
    label: "Stok",
  },
  {
    id: "5",
    key: "action",
    label: "Aksi",
  },
];
const products = [
  {
    uuid: "ebc983cc-8010-11ef-9abb-3dda8f3f8c01",
    name: "Produk 4",
    slug: "produk-4",
    price: 67377,
    price_sale: null,
    stock: 7,
    category: {
      slug: "laptop",
      name: "Laptop",
      description: null,
      parent: {
        slug: "komputer-laptop",
        name: "Komputer & Laptop",
        description: null,
      },
    },
    description: "Deskripsi produk 4. Lorem ipsum bla bla bla",
    weight: 73,
    length: 36,
    width: 88,
    height: 10,
    video_url: "http://localhost:8000/storage/attachment.mp4",
    sale_count: 0,
    images: [
      "https://picsum.photos/1920/1080?random=1",
      "http://localhost:8000/storage/attachment2.jpg",
      "http://localhost:8000/storage/attachment4.jpg",
      "http://localhost:8000/storage/attachment1.jpg",
    ],
    variations: [
      {
        name: "Warna",
        values: ["Hitam", "Kuning", "Biru"],
      },
      {
        name: "Ukuran",
        values: ["M", "L", "XL"],
      },
    ],
  },
  {
    uuid: "ebcd89cc-8010-11ef-9abb-3dda8f3f8c01",
    name: "Produk 9",
    slug: "produk-9",
    price: 33974,
    price_sale: 30000,
    stock: 84,
    category: {
      slug: "dress",
      name: "Dress",
      description: null,
      parent: {
        slug: "fashion-wanita",
        name: "Fashion Wanita",
        description: null,
      },
    },
    description: "Deskripsi produk 9. Lorem ipsum bla bla bla",
    weight: 70,
    length: 30,
    width: 12,
    height: 58,
    video_url: "http://localhost:8000/storage/attachment.mp4",
    sale_count: 0,
    images: [
      "https://picsum.photos/1920/1080?random=2",
      "http://localhost:8000/storage/attachment1.jpg",
      "http://localhost:8000/storage/attachment2.jpg",
      "http://localhost:8000/storage/attachment4.jpg",
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
  },
];

// function handleEdit() {
//   router.push({
//     path: `/seller/product/edit/${row.uuid}`,
//     state: row,
//   });
// }
</script>

<style lang="scss" scoped></style>
