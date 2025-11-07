import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2025-07-15",
   devtools: { enabled: true },

   components: [
      {
         path: "~/components",
         pathPrefix: false,
      },
   ],

   modules: ["@nuxt/fonts", "@nuxt/image", "@vueuse/nuxt", "lenis/nuxt"],
   css: ["./app/assets/css/main.css"],
   vite: {
      plugins: [tailwindcss()],
   },

   fonts: {
      defaults: {
         weights: [200, 300, 400, 500, 600, 700, 800],
      }
   }
})
