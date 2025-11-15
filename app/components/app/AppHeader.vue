<script setup lang="ts">
const menu = useMenu()
const mobileMenu = defineModel<boolean>("mobileMenu", {
   required: false,
   default: false,
})
</script>

<template>
   <header class="fixed inset-x-0 top-0 h-24 w-full bg-transparent">
      <div class="container flex h-full items-center justify-between">
         <NuxtLink to="/">
            <NuxtImg
               src="/img/logo-black.svg"
               quality="50"
               width="48"
               height="48"
            />
         </NuxtLink>
         <nav class="hidden md:block">
            <ul class="flex items-center [&_li]:not-last:me-16">
               <li v-for="item in menu">
                  <NuxtLink :to="item.to">
                     {{ item.label }}
                  </NuxtLink>
               </li>
            </ul>
         </nav>
         <button
            class="block md:hidden py-2 font-medium"
            @click="mobileMenu = !mobileMenu"
         >
            Menu
         </button>
      </div>
   </header>
</template>
