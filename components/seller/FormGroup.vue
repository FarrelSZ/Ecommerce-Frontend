<template>
  <UFormField :ui="customUi">
    <template v-for="slotName in Object.keys($slots)" #[slotName]="slotScope" :key="slotName">
      <slot :name="slotName" v-bind="slotScope" />
    </template>
  </UFormField>
</template>

<script setup>
import defu from "defu";
const props = defineProps({
  ui: {
    type: Object,
    default: () => ({}),
  },
});
const defaultUi = {
  wrapper: "flex items-start gap-4",
  container: "flex-1",
  label: {
    wrapper: "pt-3",
    base: "font-normal text-black/80 text-sm w-36 text-right",
  },
  help: "text-black/55",
};

const customUi = computed(() => defu(props.ui, defaultUi));
</script>

<style lang="scss" scoped></style>
