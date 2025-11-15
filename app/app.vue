<script setup lang="ts">
useHead({
   titleTemplate: (chunk) => {
      const title = "Dummy Architecture Gallery"
      return (chunk && `${chunk} | ${title}`) || `${title}`
   },
})
</script>

<template>
   <div>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
         <NuxtPage />
      </NuxtLayout>
   </div>
</template>
