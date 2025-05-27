<template>
  <div>
    <UButton variant="link" :color="color" :padded="false" to="/" class="logo text-4xl !font-normal">Fardeka</UButton>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "white",
    validator: (propsValue) => ["white", "orange"].includes(propsValue),
  },
});

console.log("Color props:", props.color);
</script>

<style scoped></style>
