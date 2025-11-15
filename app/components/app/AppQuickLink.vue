<script setup lang="ts">
const menu = computed(() => {
   const _menu = useMenu()
   return _menu.value.filter((item) => item.to !== "/")
})
</script>

<template>
   <div class="container flex items-stretch justify-end">
      <div class="flex flex-col md:flex-row w-full xl:w-3/5 items-center gap-8 py-40">
         <div v-for="item in menu" class="flex-1">
            <h2 class="border-b font-display text-5xl tracking-wide">
               <NuxtLink
                  :to="item.to"
                  class="group flex items-center justify-between"
               >
                  {{ item.label }}
                  <div class="relative my-4 size-10 rounded-full border">
                     <span
                        class="absolute top-1/2 left-1/2 heroicons--arrow-up-right size-5 -translate-1/2 transition-transform duration-300 ease-out group-hover:-translate-x-[35%] group-hover:-translate-y-[65%]"
                     />
                  </div>
               </NuxtLink>
            </h2>
            <p class="my-4 line-clamp-2 text-pretty">
               {{ item.description }}
            </p>
         </div>
      </div>
   </div>
</template>
