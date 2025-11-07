<script setup lang="ts"></script>

<template>
   <header class="fixed top-0 inset-x-0 w-full bg-transparent h-24">
      <div class="flex items-center container h-full justify-between">
         <NuxtImg
            src="/img/logo-black.svg"
            quality="50"
            width="48"
            height="48"
         />
         <!-- <span class="font-display text-xl uppercase tracking-widest">
         </span> -->
         <nav>
            <ul class="flex items-center [&_li]:not-last:me-16">
               <li>Portfolio</li>
               <li>Office</li>
               <li>Research</li>
               <li>Contact</li>
            </ul>
         </nav>
      </div>
   </header>
</template>
