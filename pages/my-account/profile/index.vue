<template>
  <div>
    <h3 class="font-medium text-lg">Profil Saya</h3>
    <p class="text-sm text-black/65">Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>
    <hr class="mt-5 mb-8 border-gray-200/60" />
    <div class="flex divide-x items-start">
      <UForm :state="temporaryProfile" class="flex-1 pr-6 flex flex-col gap-8" @submit.prevent="handleSubmit">
        <MyAccountFormGroup label="Username" :error="v$.username.$errors?.[0]?.$message">
          <span v-if="profile.username" class="profile-item-text">{{ profile.username || "-" }}</span>
          <UInput v-else v-model="temporaryProfile.username" class="flex-1 w-lg" size="lg" />
        </MyAccountFormGroup>
        <MyAccountFormGroup label="Nama" :error="v$.name.$errors?.[0]?.$message">
          <UInput v-model="temporaryProfile.name" class="flex-1 w-lg" size="lg" />
        </MyAccountFormGroup>
        <div class="profile-item">
          <p class="profile-item-title">Email</p>
          <div class="flex gap-2 items-center">
            <span class="profile-item-text">{{ temporaryProfile.email || "-" }}</span>
            <UButton
              variant="link"
              color="blue"
              class="underline"
              label="Ubah"
              :padded="false"
              to="/my-account/profile/change-email"
            />
          </div>
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Nomor Telepon</p>
          <div class="flex gap-2 items-center">
            <span class="profile-item-text">{{ temporaryProfile.phone || "-" }}</span>
            <UButton
              variant="link"
              color="blue"
              class="underline"
              label="Ubah"
              :padded="false"
              to="/my-account/profile/change-phone"
            />
          </div>
        </div>
        <MyAccountFormGroup label="Nama Toko" :error="v$.store_name.$errors?.[0]?.$message">
          <UInput v-model="temporaryProfile.store_name" class="flex-1 w-lg" size="lg" />
        </MyAccountFormGroup>
        <MyAccountFormGroup
          label="Jenis Kelamin"
          :error="v$.gender.$errors?.[0]?.$message"
          :ui="{
            label: {
              wrapper: 'items-center',
            },
          }"
        >
          <URadioGroup
            v-model="temporaryProfile.gender"
            orientation="horizontal"
            :items="['Laki-Laki', 'Perempuan', 'Lainnya']"
            class="flex-1"
            size="lg"
            :ui="{
              fieldset: 'flex gap-3',
            }"
          />
        </MyAccountFormGroup>
        <MyAccountFormGroup label="Tanggal Lahir" :error="v$.birth_date.$errors?.[0]?.$message">
          <BaseDatePicker v-model="temporaryProfile.birth_date" />
        </MyAccountFormGroup>
        <div class="mt-4">
          <UButton type="submit" :loading="status === 'pending'" label="Simpan" />
        </div>
      </UForm>
      <div class="w-72 pl-6 flex flex-col items-center gap-5">
        <UAvatar
          :src="imageProfile"
          size="3xl"
          :alt="temporaryProfile.name"
          icon="i-heroicons-user"
          img-class="object-cover"
        />
        <UButton label="Pilih Gambar" color="primary" @click="handleChooseFile" class="cursor-pointer" />
        <input ref="inputFileElement" type="file" accept=".jpeg,.png" class="hidden" @change="handleUploadFile" />
        <ul class="text-sm font-normal text-black/55">
          <li>Ukuran gambar: maks. 1 MB</li>
          <li>Format gambar: .JPEG, .PNG</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { format } from "date-fns";

const session = useSession();
const { profile } = storeToRefs(session);

const temporaryProfile = ref({
  ...JSON.parse(JSON.stringify(profile.value)),
  birth_date: profile.value.birth_date ? new Date(profile.value.birth_date) : null,
});

// 1. shallow copy
// 2. deep copy
// 3. structureClone
const emit = defineEmits(["profile-image-updated"]);
const rules = {
  name: { required },
  username: { required },
  store_name: { required },
  gender: { required },
  photo_url: {},
  birth_date: { required },
};

const $externalResults = ref({});

const v$ = useVuelidate(rules, temporaryProfile, {
  $autoDirty: true,
  $externalResults,
});

const inputFileElement = ref();

const imageProfile = computed(() => {
  // Cek apakah ada file yang baru diupload
  if (temporaryProfile.value.photo_url && temporaryProfile.value.photo_url instanceof File) {
    return URL.createObjectURL(temporaryProfile.value.photo_url);
  }
  // Fallback ke photo_url yang sudah ada
  return temporaryProfile.value.photo_url || profile.value.photo_url;
});

function handleChooseFile() {
  inputFileElement.value.value = null;
  inputFileElement.value.click();
}
function handleUploadFile(event) {
  const file = event.target?.files?.[0];
  if (!file) return;
  const allowedExtension = [".jpeg", ".png", ".jpg"];
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtension.includes(`.${fileExtension}`)) {
    alert(`Format file tidak didukung. Silakan upload file ${props.accept}`);
    return;
  }

  if (file.size > 5024000) {
    alert("File size melebihi ketentuan");
    return;
  }
  const previewUrl = URL.createObjectURL(file);
  temporaryProfile.value.photo_url = file;

  // Emit ke parent (my-account.vue) untuk update avatar di sidebar
  emit("profile-image-updated", previewUrl);
}

const { execute, status, error } = useSubmit("/server/api/profile");
async function handleSubmit() {
  $externalResults.value = {};
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  const newData = {
    name: temporaryProfile.value.name,
    email: temporaryProfile.value.email,
    username: temporaryProfile.value.username,
    store_name: temporaryProfile.value.store_name,
    gender: temporaryProfile.value.gender,
    birth_date: temporaryProfile.value.birth_date ? format(temporaryProfile.value.birth_date, "y-MM-d") : undefined,
    _method: "PATCH",
    photo: temporaryProfile.value.photo_url || undefined,
  };

  const formData = new FormData();

  Object.keys(newData).forEach((key) => {
    if (key === "photo" && newData[key] && typeof newData[key] === "object") {
      formData.append(key, newData[key]);
    } else if (key !== "photo" && newData[key] !== undefined) {
      formData.append(key, newData[key]);
    }
  });

  await execute(formData);

  if (error.value) {
    $externalResults.value = error.value.data?.meta?.validations || {};
    return;
  }
  // Update profile di session dengan data temporaryProfile
  Object.assign(profile.value, temporaryProfile.value);
}

// const inputFileElement = ref();
</script>

<style scoped>
.profile-item {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 11) /* 2.75rem = 44px */;
}

.profile-item-title {
  color: color-mix(in oklab, var(--color-black) /* #000 = #000000 */ 55%, transparent);
  font-size: var(--text-sm) /* 0.875rem = 14px */;
  line-height: var(--tw-leading, var(--text-sm--line-height) /* calc(1.25 / 0.875) ≈ 1.4286 */);
  width: calc(var(--spacing) * 24) /* 6rem = 96px */;
  text-align: right;
}

.profile-item-text {
  text-align: left;
  color: color-mix(in oklab, var(--color-black) /* #000 = #000000 */ 85%, transparent);
  width: unset;
}
</style>
