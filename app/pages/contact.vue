<script setup lang="ts">
const contacts = $contacts
</script>

<template>
   <div class="mt-12">
      <div class="container mb-12">
         <h1
            id="title"
            class="font-display text-5xl tracking-wide md:text-7xl"
         >
            Get in Touch
         </h1>
      </div>
      <div class="container py-32">
         <ul
            class="list-none [&_li]:text-lg [&_li]:hover:underline [&_li]:md:text-xl [&_li]:lg:text-3xl [&_li:not(:last-child)]:mb-6 [&_li:not(:last-child)]:lg:mb-12"
         >
            <li v-for="item in contacts">
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
   </div>
</template>
