<script setup lang="ts">
const menu = useMenu()
</script>

<template>
   <footer class="bg-black text-white">
      <div class="container pt-32 pb-8">
         <div class="flex items-center gap-12 justify-between *:flex-1">
            <ul class="list-none [&_li:not(:last-child)]:mb-4">
               <li v-for="item in menu">
                  <NuxtLink :to="item.to">
                     {{ item.label }}
                  </NuxtLink>
               </li>
            </ul>
            <div class="flex items-center justify-center flex-col">
               <NuxtImg
                  src="/img/logo.svg"
               />
               <p class="mt-8 text-5xl tracking-wide">
                  Riva Almero
               </p>
            </div>
            <ul class="list-none [&_li]:text-end [&_li:not(:last-child)]:mb-4">
               <li>
                  +62 895 401 998 82
               </li>
               <li>
                  rivaalms@proton.me
               </li>
               <li>
                  Cikutra St. Sukasari II Ave. No. 30/2A
                  <br>
                  Kota Bandung, West Java 40124
               </li>
               <li>
                  @almsomnia
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
