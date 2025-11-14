<script setup lang="ts">
import type Lenis from "lenis"
const images = $images

const imageRefs = ref<HTMLDivElement[]>([])
const imageTitleRefs = ref<HTMLDivElement[]>([])

const activeIndex = shallowRef(0)

const textScrollYVw = shallowRef(0)
const scrollStart = ref(0)
const scrollDuration = ref(0)

const totalTextTravelVw = computed(() => {
   if (!images || images.length === 0) return 0
   return 5.4 * (images.length - 1)
})

const updateMetrics = () => {
   if (import.meta.server) return

   const firstImg = imageRefs.value[0]
   const lastImg = imageRefs.value[images.length - 1]

   if (!firstImg || !lastImg) return

   const viewportCenter = window.innerHeight / 2

   const firstImgCenter = firstImg.offsetTop + firstImg.offsetHeight / 2
   const lastImgCenter = lastImg.offsetTop + lastImg.offsetHeight / 2

   const sStart = firstImgCenter - viewportCenter
   const sEnd = lastImgCenter - viewportCenter

   scrollStart.value = sStart
   scrollDuration.value = sEnd - sStart
}

onMounted(() => {
   nextTick(() => {
      updateMetrics()
   })
   window.addEventListener("resize", updateMetrics)
})

onUnmounted(() => {
   window.removeEventListener("resize", updateMetrics)
})

const handleScroll = (lenis: Lenis) => {
   const currentScroll = lenis.scroll
   const viewportCenter = window.innerHeight / 2

   let newActiveIndex = 0
   let minDistance = Infinity

   imageRefs.value.forEach((img, index) => {
      if (!img) return
      const rect = img.getBoundingClientRect()
      const imgCenter = rect.top + rect.height / 2
      const distance = Math.abs(imgCenter - viewportCenter)

      if (distance < minDistance) {
         minDistance = distance
         newActiveIndex = index
      }
   })
   activeIndex.value = newActiveIndex

   if (scrollDuration.value > 0) {
      const currentScrollInEffect = currentScroll - scrollStart.value
      const progress = currentScrollInEffect / scrollDuration.value
      const clampedProgress = Math.max(0, Math.min(1, progress))

      textScrollYVw.value = clampedProgress * totalTextTravelVw.value
   }
}

const lenis = useLenis((lenis) => {
   handleScroll(lenis)
})

function resolveTextOpacity(index: number) {
   const diff = Math.abs(activeIndex.value - index)
   switch (diff) {
      case 0:
         return 1
      case 1:
         return 0.25
      case 2:
         return 0.1
      default:
         return 0
   }
}
</script>

<template>
   <div class="container flex items-stretch justify-between gap-4">
      <div
         id="imgTitleContainer"
         class="w-2/5"
      >
         <div
            class="sticky top-[calc((100vh-30vw)/2)] mb-[100px] h-[30vw] transition-transform duration-800 ease-out"
            ref="textContainerRef"
            :style="{
               transform: `translateY(calc(-1 * ${textScrollYVw}vw))`,
            }"
         >
            <template v-for="(item, index) in images">
               <div
                  :ref="(el) => (imageTitleRefs[index] = el as HTMLDivElement)"
                  class="absolute font-display text-[4.5vw] tracking-normal whitespace-nowrap transition duration-800 ease-out"
                  :style="{
                     opacity: resolveTextOpacity(index),
                     top: `calc(50% + (1.2 * 4.5vw * ${index}))`,
                  }"
               >
                  {{ item.title }}
               </div>
            </template>
         </div>
      </div>
      <div
         id="imgContainer"
         class="w-3/5 [&_.x-img-container]:mb-24"
      >
         <template v-for="(image, index) in images">
            <div class="x-img-container flex flex-col gap-2">
               <div
                  class="relative overflow-hidden pb-[66%] *:h-full *:w-full"
                  :ref="(el) => (imageRefs[index] = el as HTMLDivElement)"
               >
                  <NuxtImg
                     :src="image.src"
                     :quality="25"
                     class="absolute inset-0 transition-transform duration-500 ease-in-out hover:scale-102"
                  />
               </div>
               <div class="flex items-center justify-between">
                  <span>
                     {{ image.title }}
                  </span>
                  <span>
                     {{ image.location }}
                  </span>
               </div>
            </div>
         </template>
      </div>
   </div>
</template>
