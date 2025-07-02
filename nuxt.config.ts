// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/icon", "@vueuse/nuxt", "@nuxt/image", "@pinia/nuxt"],
  css: [
    "@/app/assets/css/main.css", // atau '@/assets/css/main.css'
  ],
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      clientIdGoogleSignIn: "",
    },
  },
  routeRules: {
    "/server/**": { proxy: `${process.env.NUXT_BASE_URL || "http://127.0.0.1:8000"}/**` },
    "/registration/**": { ssr: false },
    "/cart": { ssr: false },
    "/checkout/**": { ssr: false },
  },
  image: {
    domains: ["127.0.0.1:8000"],
    provider: "ipx",
  },
});
