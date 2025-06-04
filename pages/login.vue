<template>
  <section class="bg-primary">
    <UContainer class="grid grid-cols-2 h-full py-20">
      <div class="flex justify-center items-center">
        <div class="flex flex-col gap-14 text-white text-center">
          <h1 class="text-8xl">Fardeka</h1>
          <p>Tempat Belanja Online No. 1<br />di Asia Tengara dan Taiwan</p>
        </div>
      </div>
      <div>
        <UCard
          class="w-96"
          :ui="{
            rounded: 'rounded-sm',
          }"
        >
          <h2>Login</h2>
          <UForm class="mt-7 space-y-7">
            <UFormField label="Email" vierror="Please enter a valid email address.">
              <UInput placeholder="Enter your email" class="w-full" size="lg" />
            </UFormField>
            <UFormField label="Password">
              <BaseInputPassword />
            </UFormField>
            <div>
              <UButton block>Log in</UButton>
              <UButton variant="link" color="blue" :padded="false" class="mt-2" to="/forgot-password">
                Lupa password
              </UButton>
            </div>
          </UForm>
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white px-3 text-gray-300 font-normal">ATAU</span>
            </div>
          </div>
          <UButton block color="white">
            <img src="~/assets/images/google.png" class="w-6 h-6" />
            Google
          </UButton>
          <p class="text-sm font-normal text-black/25 text-center mt-8">
            Baru di Fardeka?
            <NuxtLink to="/registration" class="text-primary">Daftar</NuxtLink>
          </p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  header: {
    title: "Log in",
  },
});
</script>

<style lang="scss" scoped></style>
