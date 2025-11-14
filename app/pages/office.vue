<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
   const image = document.getElementById(
      "officeHero"
   ) as HTMLImageElement | null
   if (!image) return

   const onReady = () => {
      const container = image.parentElement
      if (!container) return

      const imgRect = image.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const maxMove = imgRect.height - containerRect.height

      if (maxMove <= 0) return

      $gsap
         .timeline({
            scrollTrigger: {
               trigger: document.documentElement,
               start: "top top",
               end: () => {
                  return `+=${containerRect.top + containerRect.height}`
               },
               scrub: true,
            },
         })
         .to(image, {
            y: maxMove,
            ease: "none",
         })
   }

   if (image.complete) onReady()
   else image.onload = onReady
})

const offerings = [
   {
      title: "Program",
      description:
         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis tempore, natus aliquam culpa similique vero iste sapiente aliquid veritatis numquam harum odio porro? Corporis, voluptate animi! Quae, accusamus? Impedit.",
   },
   {
      title: "Training",
      description:
         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus consequatur ut porro perferendis laborum obcaecati facilis quasi! Corrupti sint maiores fugit, mollitia aspernatur cumque aliquam suscipit accusantium error repudiandae maxime?",
   },
   {
      title: "Sustainability",
      description:
         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, nemo provident? Libero iure fuga laboriosam, earum, adipisci, quo animi beatae temporibus eum nostrum voluptatibus eveniet facere. Eos voluptatum minus dolores?",
   },
   {
      title: "Integration",
      description:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas doloribus molestiae eveniet ex ullam, dolorem magni unde cumque rem ipsum suscipit dolor, aliquid quibusdam vero itaque placeat porro tempore praesentium.",
   },
   {
      title: "System",
      description:
         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae expedita dolorem iure suscipit libero veritatis error vel dolores esse. Vitae dolorum quo, mollitia earum nam veritatis facilis in perferendis consectetur.",
   },
]

const activeOfferingIndex = shallowRef<number>(0)

function resolveTextOpacity(index: number) {
   const diff = Math.abs(activeOfferingIndex.value - index)
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

const faqs = [
   {
      title: "Lorem ipsum dolor sit amet?",
      description:
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi dolor ea aspernatur alias quo quod perspiciatis commodi eaque vel nihil consectetur totam, harum nemo nesciunt ab magnam in modi.",
   },
   {
      title: "Lorem ipsum dolor sit amet?",
      description:
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi dolor ea aspernatur alias quo quod perspiciatis commodi eaque vel nihil consectetur totam, harum nemo nesciunt ab magnam in modi.",
   },
   {
      title: "Lorem ipsum dolor sit amet?",
      description:
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi dolor ea aspernatur alias quo quod perspiciatis commodi eaque vel nihil consectetur totam, harum nemo nesciunt ab magnam in modi.",
   },
   {
      title: "Lorem ipsum dolor sit amet?",
      description:
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi dolor ea aspernatur alias quo quod perspiciatis commodi eaque vel nihil consectetur totam, harum nemo nesciunt ab magnam in modi.",
   },
]
</script>

<template>
   <div class="mt-12">
      <div class="container mb-12">
         <h1
            id="title"
            class="font-display text-7xl tracking-wide"
         >
            Office
         </h1>
      </div>
      <div class="relative h-[35vw] overflow-hidden">
         <NuxtImg
            id="officeHero"
            src="/img/office.jpg"
            :quality="50"
            decoding="async"
            fit="fill"
            class="absolute inset-0 h-full w-full scale-125 overflow-clip object-cover"
         />
      </div>
   </div>
   <div class="container py-32">
      <h2 class="font-medium">About</h2>
      <p
         class="my-8 w-4/5 font-display text-4xl leading-relaxed tracking-wide text-pretty"
      >
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima illum
         nobis, libero voluptatibus optio natus assumenda vero asperiores vitae,
         recusandae officiis facere ullam quibusdam voluptate! Modi accusantium
         recusandae alias harum!
      </p>
      <div
         class="mt-48 ml-auto w-fit max-w-3/5 text-3xl leading-normal font-extralight text-pretty italic"
      >
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
         consequuntur, placeat dolorem praesentium ea sunt quam tempore sequi
         minus odio totam sit pariatur eum asperiores ab eveniet quaerat?
         Asperiores, in.
      </div>
   </div>
   <div class="container py-32">
      <div class="relative h-[33vw]">
         <div
            class="absolute top-0 left-0 flex h-full w-full items-center justify-between"
         >
            <div class="h-full w-[35%]">
               <span
                  v-for="(offering, index) in offerings"
                  class="absolute top-1/2 font-display text-[5vw] tracking-normal whitespace-nowrap transition duration-800 ease-out"
                  :style="{
                     transform: `translateY(calc(-50% + ${index} * 6vw - ${activeOfferingIndex} * 6vw))`,
                     opacity: resolveTextOpacity(index),
                  }"
                  @click="activeOfferingIndex = index"
               >
                  {{ offering.title }}
               </span>
            </div>
            <div class="relative h-full w-[40%]">
               <div class="absolute top-1/2 -translate-y-1/2">
                  <p class="my-8 text-pretty">
                     {{ offerings[activeOfferingIndex]?.description }}
                  </p>
               </div>
            </div>
            <div class="flex gap-2">
               <div
                  class="flex size-10 items-center justify-center rounded-full border transition duration-300 ease-out"
                  :class="[
                     activeOfferingIndex < 1
                        ? 'cursor-not-allowed opacity-35'
                        : 'cursor-pointer',
                  ]"
                  @click="activeOfferingIndex > 0 && activeOfferingIndex--"
               >
                  <span class="heroicons--chevron-left size-6" />
               </div>
               <div
                  class="flex size-10 items-center justify-center rounded-full border transition duration-300 ease-out"
                  :class="[
                     activeOfferingIndex >= offerings.length - 1
                        ? 'cursor-not-allowed opacity-35'
                        : 'cursor-pointer',
                  ]"
                  @click="
                     activeOfferingIndex < offerings.length - 1 &&
                     activeOfferingIndex++
                  "
               >
                  <span class="heroicons--chevron-right size-6" />
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="container py-32">
      <h2
         class="mb-8 font-display text-7xl tracking-wide"
      >
         FAQ
      </h2>
      <div class=" w-[33vw]">
         <div class="flex flex-col">
            <template v-for="faq in faqs">
               <details class="group overflow-hidden border-b">
                  <summary
                     class="cursor-pointer py-4 select-none marker:hidden marker:list-none first-of-type:list-none"
                  >
                     <div class="flex items-center justify-between">
                        <span class="text-lg">
                           {{ faq.title }}
                        </span>
                        <span
                           class="heroicons--plus transition duration-300 ease-out group-open:rotate-45"
                        />
                     </div>
                  </summary>
                  <div class="pe-8 pb-4">
                     <p class="font-light text-pretty">
                        {{ faq.description }}
                     </p>
                  </div>
               </details>
            </template>
         </div>
      </div>
   </div>
</template>

<style scoped>
details::details-content {
   height: 0;
   transition:
      height 0.5s,
      content-visibility 0.5s;
   transition-behavior: allow-discrete;
   transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}

details[open]::details-content {
   height: auto;
}
</style>
