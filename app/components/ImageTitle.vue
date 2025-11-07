<script setup lang="ts">
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { HTMLAttributes } from "vue"
const props = defineProps<{
   index: number
   text: string
   style?: HTMLAttributes["style"]
}>()

const { $gsap } = useNuxtApp()

const textRef = useTemplateRef("textRef")
</script>

<template>
   <div
      ref="textRef"
      class="absolute top-1/2 font-display text-[4.5vw] font-light whitespace-nowrap"
      :style="props.style"
   >
      {{ props.text }}
   </div>
</template>
