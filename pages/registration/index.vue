<template>
  <section class="bg-primary">
    <UContainer class="grid grid-cols-2 h-full py-20">
      <div class="flex justify-center items-center">
        <div class="flex flex-col gap-14 text-white text-center">
          <h1 class="text-8xl">Syopo</h1>
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
          <h2>Daftar</h2>
          <UForm class="mt-7 space-y-7" @submit.prevent="handleSubmit">
            <UFormField vierror="Please enter a valid email address.">
              <UInput placeholder="Email" size="lg" class="w-full" />
            </UFormField>
            <UButton type="submit" block class="uppercase">Berikutnya</UButton>
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
            Punya akun?
            <NuxtLink to="/login" class="text-primary">Log in</NuxtLink>
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
    title: "Daftar",
  },
});

const value = ref("");

const router = useRouter();

function handleSubmit() {
  router.push("/registration/form");
}
</script>

<style lang="scss" scoped></style>
