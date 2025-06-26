<template>
  <section class="bg-primary">
    <UContainer class="grid grid-cols-1 lg:grid-cols-2 h-full py-20">
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
          <h2>Daftar</h2>
          <UForm :state="registrationForm" class="mt-7 space-y-7" @submit="handleSubmit">
            <UFormField>
              <UInput v-model="registrationForm.email" placeholder="Email" size="lg" class="w-full" />
            </UFormField>
            <UButton :loading="status === 'pending'" type="submit" block class="uppercase">Berikutnya</UButton>
          </UForm>
          <table></table>
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
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

definePageMeta({
  layout: "auth",
  header: {
    title: "Daftar",
  },
});

const router = useRouter();
const { registrationForm } = storeToRefs(useSession());

const rules = {
  email: { required, email },
};

const $externalResults = ref({});

const v$ = useVuelidate(rules, registrationForm, {
  $autoDirty: true,
  $externalResults,
});

const { status, error, execute } = useSubmit("/server/api/register");

async function handleSubmit() {
  $externalResults.value = {};

  const isValid = await v$.value.$validate();
  if (!isValid) return;

  // Fetch api
  await execute({
    email: registrationForm.value.email,
  });

  if (error.value) {
    $externalResults.value = error.value.data?.meta?.validations || {};
    return;
  }

  if (status.value === "success") {
    router.push("/registration/form");
  }
}
</script>

<style lang="scss" scoped></style>
