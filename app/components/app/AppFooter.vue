<script setup lang="ts">
const menu = useMenu()
</script>

<template>
   <footer class="bg-black text-white">
      <div class="container pt-32 pb-8">
         <div
            class="flex flex-col justify-between gap-36 *:flex-1 lg:flex-row lg:items-center lg:gap-12"
         >
            <ul class="list-none [&_li:not(:last-child)]:mb-4">
               <li v-for="item in menu">
                  <NuxtLink :to="item.to">
                     {{ item.label }}
                  </NuxtLink>
               </li>
            </ul>
            <div class="flex flex-col items-center justify-center">
               <NuxtImg src="/img/logo.svg" />
               <p class="mt-8 text-5xl tracking-wide">Riva Almero</p>
            </div>
            <ul class="list-none [&_li]:text-end [&_li:not(:last-child)]:mb-4">
               <li v-for="item in $contacts">
                  <NuxtLink
                     v-if="item.url"
                     external
                     :href="item.url"
                     target="_blank"
                  >
                     {{ item.value }}
                  </NuxtLink>
                  <span v-else>
                     {{ item.value }}
                  </span>
               </li>
            </ul>
         </div>
         <div class="mt-48 text-center">
            <span class="text-sm">
               &copy; 2025 Riva Almero. All Rights Reserved.
            </span>
         </div>
      </div>
   </footer>
</template>
