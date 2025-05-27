<template>
  <div>
    <footer class="footer border-t-4 border-primary bg-gray-50">
      <UContainer class="footer-container flex flex-col">
        <div class="footer-top grid grid-cols-5 pt-11 pb-8 border-b">
          <div>
            <h3>Layanan Pelanggan</h3>
            <nav>
              <ul>
                <li v-for="(item, index) in LayananPengguna" :key="`${item}-${index}`">
                  <UButton variant="link" :padded="false" size="xs" class="footer-text">{{ item }}</UButton>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h3>Jelajahi Fardeka</h3>
            <nav>
              <ul>
                <li v-for="(item, index) in jelajahi" :key="`${item}-${index}`">
                  <UButton
                    variant="link"
                    :padded="false"
                    size="xs"
                    class="footer-text text-xs text-black font-normal"
                    >{{ item }}</UButton
                  >
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <div>
              <h3>Pembayaran</h3>
              <div class="flex flex-wrap gap-2">
                <div class="footer-item">
                  <img src="~/assets/images/seabank.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/bca.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/bni.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/bri.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/bsi.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/cimb.png" />
                </div>
              </div>
            </div>
            <div class="mt-6">
              <h3>Pengiriman</h3>
              <div class="flex flex-wrap gap-2">
                <div class="footer-item">
                  <img src="~/assets/images/spx.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/jnt.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/jne.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/ninja.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/sicepat.png" />
                </div>
                <div class="footer-item">
                  <img src="~/assets/images/gosend.png" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h3>Ikuti Kami</h3>
              <nav>
                <ul>
                  <li>
                    <UButton variant="link" :padded="false" size="xs" class="footer-text">
                      <template #leading>
                        <img src="~/assets/images/facebook.png" />
                      </template>
                      Facebook
                    </UButton>
                  </li>
                  <li>
                    <UButton variant="link" :padded="false" size="xs" class="footer-text">
                      <template #leading>
                        <img src="~/assets/images/instagram.png" />
                      </template>
                      Instagram
                    </UButton>
                  </li>
                  <li>
                    <UButton variant="link" :padded="false" size="xs" class="footer-text">
                      <template #leading>
                        <img src="~/assets/images/twitter.png" />
                      </template>
                      Twitter
                    </UButton>
                  </li>
                  <li>
                    <UButton variant="link" :padded="false" size="xs" class="footer-text">
                      <template #leading>
                        <img src="~/assets/images/linkedin.png" />
                      </template>
                      Linkedin
                    </UButton>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="mt-6">
              <h3>Keamanan</h3>
              <div class="footer-item size-lg">
                <img src="~/assets/images/certified.png" />
              </div>
            </div>
          </div>
          <div>
            <h3>Download Aplikasi Syopo</h3>
            <div class="flex gap-3">
              <img src="~/assets/images/qrcode.png" />
              <div class="flex flex-col gap-2">
                <img src="~/assets/images/appstore.png" />
                <img src="~/assets/images/playstore.png" />
                <img src="~/assets/images/appgalery.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-text">© Fardeka 2025. Hak Cipta Dilindungi</p>
          <div class="flex gap-1 items-center">
            <span class="footer-text">Negara:</span>
            <div class="flex divide-x divide-black/20">
              <UButton v-for="item in country" :key="item" variant="link" class="footer-text px-1.5" :padded="false">
                {{ item }}
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<script setup>
const LayananPengguna = [
  "Bantuan",
  "Metode Pembayaran",
  "FardekaPay",
  "KoinFardeka",
  "Lacak Pesanan Pembeli",
  "Lacak Pengiriman Penjual",
  "Gratis ongkir",
  "Pengembalian Barang & Dana",
  "Garansi Fardeka",
  "Hubungi Kami",
];
const jelajahi = [
  "Tentang Kami",
  "Karir",
  "Kebijakan Syopo",
  "Kebijakan Privasi",
  "Blog",
  "Syopo Mall",
  "Seller Center",
  "Flash Sale",
  "Kontak Media",
  "Syopo Affiliate",
];

const country = [
  "Singapura",
  "Indonesia",
  "Thailand",
  "Malaysia",
  "Vietnam",
  "Filipina",
  "Brazil",
  "Mexico",
  "Colombia",
  "Chile",
  "Taiwan",
];
</script>

<style scoped>
.footer-text {
  font-size: 0.75rem; /* text-xs = 12px */
  line-height: 1rem; /* sesuai line-height untuk text-xs */
  color: rgb(0 0 0 / 0.65); /* text-black */
  font-weight: 400; /* font-normal */
}
.footer h3 {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 20px;
}
.footer-item {
  width: 60px;
  height: 30px;
  background-color: white;
  border-radius: 2px; /* rounded-sm = 0.125rem = 2px */
  padding: 4px; /* p-1 = 0.25rem = 4px */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06); /* Tailwind's default shadow */
}
.footer-item img {
  width: 100%;
  height: 100%;
}
.footer-item size-lg {
  width: 112px;
  height: 52px;
}
</style>
