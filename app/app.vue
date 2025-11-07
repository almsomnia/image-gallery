<script setup lang="ts">
import type Lenis from "lenis"
const images = $images

const lenis = useLenis((lenis) => {
   handleScroll(lenis)
})

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
</script>

<template>
   <div>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
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
                        :ref="
                           (el) =>
                              (imageTitleRefs[index] = el as HTMLDivElement)
                        "
                        class="absolute font-display text-[4.5vw] tracking-normal whitespace-nowrap transition duration-800 ease-out"
                        :style="{
                           opacity: activeIndex == index ? 1 : 0.1,
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
         <div class="container flex items-stretch justify-end">
            <div class="flex w-3/5 items-center gap-8 py-30">
               <div class="flex-1">
                  <h2 class="border-b font-display text-6xl tracking-wide">
                     <a
                        href=""
                        class="group flex items-center justify-between"
                     >
                        Office
                        <div class="relative my-4 size-10 rounded-full border">
                           <span
                              class="absolute top-1/2 left-1/2 heroicons--arrow-up-right size-5 -translate-1/2 transition-transform duration-300 ease-out group-hover:-translate-x-[35%] group-hover:-translate-y-[65%]"
                           />
                        </div>
                     </a>
                  </h2>
                  <p class="my-4 line-clamp-2 text-pretty">
                     Learn more about us, our process, and service offerings.
                  </p>
               </div>
               <div class="flex-1">
                  <h2 class="border-b font-display text-6xl tracking-wide">
                     <a
                        href=""
                        class="group flex items-center justify-between"
                     >
                        Research
                        <div class="relative my-4 size-10 rounded-full border">
                           <span
                              class="absolute top-1/2 left-1/2 heroicons--arrow-up-right size-5 -translate-1/2 transition-transform duration-300 ease-out group-hover:-translate-x-[35%] group-hover:-translate-y-[65%]"
                           />
                        </div>
                     </a>
                  </h2>
                  <p class="my-4 line-clamp-2 text-pretty">
                     Discover news, insights, and ideas that shape our work.
                  </p>
               </div>
               <div class="flex-1">
                  <h2 class="border-b font-display text-6xl tracking-wide">
                     <a
                        href=""
                        class="group flex items-center justify-between"
                     >
                        Contact
                        <div class="relative my-4 size-10 rounded-full border">
                           <span
                              class="absolute top-1/2 left-1/2 heroicons--arrow-up-right size-5 -translate-1/2 transition-transform duration-300 ease-out group-hover:-translate-x-[35%] group-hover:-translate-y-[65%]"
                           />
                        </div>
                     </a>
                  </h2>
                  <p class="my-4 line-clamp-2 text-pretty">
                     Reach out and start the conversation on your project.
                  </p>
               </div>
            </div>
         </div>
      </NuxtLayout>
   </div>
</template>
