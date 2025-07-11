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
          <UForm :state="form" class="mt-7 space-y-7" @submit="handleSubmit">
            <UFormField :error="v$.phone_email.$errors?.[0]?.$message" label="Email">
              <UInput v-model="form.phone_email" placeholder="Enter your email" class="w-full" size="lg" />
            </UFormField>
            <UFormField :error="v$.password.$errors?.[0]?.$message" label="Password">
              <BaseInputPassword v-model="form.password" placeholder="Enter your password" />
            </UFormField>
            <div>
              <UButton type="submit" block :loading="status === 'pending' || statusProfile === 'pending'"
                >Log in</UButton
              >
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
          <BaseButtonGoogleSignIn />
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
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";

definePageMeta({
  layout: "auth",
  header: {
    title: "Log in",
  },
  middleware: ["must-not-auth"],
});

const toast = useToast();
const session = useSession();
const { profile, token: tokenSession } = storeToRefs(session);
const token = useCookie("access_token");

const nuxtApp = useNuxtApp();

const form = ref({
  phone_email: "",
  password: "",
});

const rules = {
  phone_email: {
    required,
    isValidUsername: helpers.withMessage("Value is not valid", (value) => {
      if (value) {
        if (/^\d{4}/.test(value)) {
          // checking phone number
          return /^\d+$/.test(value);
        }

        // chekcing email
        return email.$validator(value);
      }
      return true;
    }),
  },
  password: { required, minLength: minLength(8) },
};

const $externalResults = ref({});

const v$ = useVuelidate(rules, form, {
  $autoDirty: true,
  $externalResults,
});

const { status, execute, error, data } = useSubmit("/server/api/login");

const { execute: getProfile, status: statusProfile } = useApi("/server/api/profile", {
  immediate: false,
  onResponse({ response }) {
    if (response.ok) {
      profile.value = response._data?.data;

      nuxtApp.runWithContext(() => {
        navigateTo("/");
      });
    }
  },
});

async function handleSubmit() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  // Fetch api
  await execute(form.value);

  if (error.value) {
    $externalResults.value = error.value.data?.meta?.validations || {};
    return;
  }

  if (status.value === "success" && data.value?.data?.token) {
    tokenSession.value = data.value?.data?.token;
    token.value = data.value?.data?.token;
    getProfile();
  }
  toast.add({
    title: "Login success",
    description: "Selamat Berbelanja di Fardeka",
    color: "success",
  });
}
</script>

<style lang="scss" scoped></style>
