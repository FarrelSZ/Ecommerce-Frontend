<template>
  <div>
    <h3 class="text-xl font-medium">Ganti Email</h3>
    <hr class="mt-5 mb-11 border-gray-200/60" />
    <UForm>
      <UFormField
        :ui="{
          wrapper: 'flex gap-16',
          container: 'w-96',
          label: {
            wrapper: 'pt-2',
            base: 'font-normal text-black/55 text-base',
          },
        }"
      >
        <UInput v-model="value" placeholder="" :ui="{ base: 'peer' }" class="w-xl" size="lg">
          <label
            class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
          >
            <span class="inline-flex bg-default px-1">Email address</span>
          </label>
        </UInput>
        <p class="text-sm text-red-500 mt-1"></p>
        <UButton type="submit" label="Selanjutnya" class="mt-8" />
      </UFormField>
    </UForm>
  </div>
</template>

<script setup>
// async function handleSubmit() {
//   $externalResults.value = {};
//   const isValid = await v$.value.$validate();
//   if (!isValid) return;
//   await execute({
//     email: form.value.email,
//     gender: session.profile.gender,
//     name: session.profile.name,
//     _method: "PATCH",
//   });

//   if (error.value) {
//     $externalResults.value = error.value.data?.meta?.validations || {};
//     return;
//   }

//   if (status.value === "success") {
//     session.profile.email = form.value.email;
//     router.replace("/my-account/profile");
//   }
// }
const value = ref("");
</script>

<style lang="scss" scoped></style>
