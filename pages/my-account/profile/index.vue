<template>
  <div>
    <h3 class="text-lg font-medium">Profile Saya</h3>
    <p class="text-sm text-black/65">Kelola informasiprofil Anda untuk mengontrol, melindungi, dan mengamankan akun</p>
    <hr class="mt-5 mb-8 border-gray-200/60" />
    <div class="flex divide-x items-start">
      <div class="flex flex-1 pr-6 flex-col gap-8">
        <div class="profile-item">
          <p class="profile-item-title">Username</p>
          <span class="profile-item-text">Farrel</span>
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Nama</p>
          <UInput class="flex-1" size="lg" />
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Email</p>
          <span class="profile-item-text">farel.it12@gmail.com</span>
          <UButton
            label="Ubah"
            variant="link"
            color="blue"
            class="hover:underline"
            :padded="false"
            to="/my-account/profile/change-email"
          />
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Nomor Telepon</p>
          <span class="profile-item-text">085155288954</span>
          <UButton
            label="Ubah"
            variant="link"
            color="blue"
            class="hover:underline"
            :padded="false"
            to="/my-account/profile/change-phone"
          />
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Nama Toko</p>
          <UInput class="flex-1" size="lg" />
        </div>

        <div class="profile-item">
          <p class="profile-item-title">Jenis Kelamin</p>
          <URadioGroup
            :items="['laki-laki', 'perempuan', 'lainnya']"
            orientation="horizontal"
            size="lg"
            :ui="{
              fieldset: 'flex gap-3',
            }"
          />
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Jenis Kelamin</p>
          <BaseDatePicker />
        </div>
        <div><UButton label="simpan" /></div>
      </div>
      <div class="w-72 pl-6 flex flex-col items-center gap-5">
        <UAvatar size="3xl" alt="Farrel" />
        <!-- <UButton label="pilih gambar" color="white" @click="inputFileElement.click()" /> -->
        <UInput type="file" />
        <ul class="text-sm font-normal text-black/55">
          <li>Ukuran Gambar: maks. 2MB</li>
          <li>Format Gambar: JPEG, .PNG</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
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
