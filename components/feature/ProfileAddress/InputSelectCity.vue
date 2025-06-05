<template>
  <UPopover
    :popper="{ placement: 'bottom-start', strategy: 'absolute' }"
    :ui="{ width: 'w-full', rounded: 'rounded-sm' }"
  >
    <!-- <UInput class="w-full" placeholder="Provinsi, Kota" size="lg" /> -->
    <UButton label="Provinsi, Kota" />
    <template #content>
      <div class="">
        <UTabs
          :items="items"
          :ui="{
            list: {
              background: 'bg-white border-b',
              padding: 'p-0',
              rounded: 'rounded-none',
              marker: {
                wrapper: '!top-[0px] left-0 !h-[100%] border-b-2 border-primary',
                rounded: 'rounded-none',
                shadow: 'shadow-none',
              },
              tab: {
                active: 'text-primary',
                inactive: 'text-black/80',
                rounded: 'rounded-none',
              },
            },
          }"
        >
          <template #item="{ item }">
            <UButton
              v-for="child in options[item.key]"
              :key="child.uuid"
              variant="ghost"
              block
              :color="form[item.key]?.uuid === child.uuid ? 'primary' : 'gray'"
              class="justify-start"
              :label="child.name"
              @click="handleSelect(child, item.key, close)"
            />
          </template>
        </UTabs>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
// defineProps({
//   placeholder: {
//     type: String,
//     default: "Provinsi, Kota",
//   },
// });
// const nuxtApp = useNuxtApp();

// const modelCity = defineModel("city", {
//   type: Object,
//   default: () => ({
//     uuid: null,
//     name: null,
//   }),
// });

// const modelProvince = defineModel("province", {
//   type: Object,
//   default: () => ({
//     uuid: null,
//     name: null,
//   }),
// });

// const tabActive = ref(0);
// const form = reactive({
//   province: null,
//   city: null,
// });

// watch(
//   modelCity,
//   (newCity) => {
//     form.city = {
//       uuid: newCity?.uuid,
//       name: newCity?.name,
//     };
//   },
//   { immediate: true }
// );

// watch(
//   modelProvince,
//   (newProvince) => {
//     form.province = {
//       uuid: newProvince?.uuid,
//       name: newProvince?.name,
//     };
//   },
//   { immediate: true }
// );

const showSelected = computed(() => `${form.province?.name || ""}${form.city ? `, ${form.city.name}` : ""}`);

const items = computed(() => [
  {
    label: "Provinsi",
    key: "province",
  },
  {
    label: "Kota",
    key: "city",
    disabled: !form.province?.uuid,
  },
]);

const options = computed(() => ({
  city: cities.value,
  province: provinces.value,
}));

// const { data: responseProvince, status: statusProvince } = useApi("/server/api/province", {
//   key: "province-list",
//   getCachedData() {
//     return nuxtApp.payload.data?.["province-list"] || nuxtApp.static.data?.["province-list"];
//   },
// });

// const { data: responseCities, status: statusCities } = useApi("/server/api/city", {
//   immediate: false,
//   params: computed(() => ({
//     province_uuid: form.province?.uuid,
//   })),
// });

const provinces = computed(() => responseProvince.value?.data || []);

const cities = computed(() => responseCities.value?.data || []);

async function handleSelect(value, type, close) {
  form[type] = value;

  await nextTick();
  if (type === "province") {
    form.city = null;
    tabActive.value = 1;
  } else {
    modelCity.value = {
      uuid: form.city.uuid,
      name: form.city.name,
    };
    modelProvince.value = {
      uuid: form.province.uuid,
      name: form.province.name,
    };
    tabActive.value = 0;
    close();
  }
}

function handleCheckSelected(isOpen) {
  if (!isOpen) {
    tabActive.value = 0;
    if (!form.city) {
      form.province = null;
    }
  }
}
</script>

<style lang="scss" scoped></style>
