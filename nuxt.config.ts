// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@sidebase/nuxt-auth"],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  auth: {
    baseURL: "/api/auth",
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    appUrl: process.env.NEXTAUTH_URL,
    authSecret: process.env.AUTH_SECRET,
  },
});
