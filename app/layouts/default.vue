<script setup lang="ts">
const { y, directions } = useScroll(document)

const header = useTemplateRef("header")

watch(
   [y, () => directions.top, () => directions.bottom],
   ([yVal, scrollingUp, scrollingDown]) => {
      if (!header.value) return
      const el = header.value.$el as HTMLElement
      const className = "-translate-y-full"

      if (yVal < 100 || scrollingUp) {
         el.classList.remove(className)
      } else if (scrollingDown) {
         el.classList.add(className)
      }
   }
)
</script>

<template>
   <AppHeader
      ref="header"
      class="z-999 transition-transform duration-800 ease-in-out"
   />
   <VueLenis root>
      <main class="min-h-screen">
         <div class="pt-40">
            <slot />
         </div>
         <AppQuickLink />
      </main>
      <AppFooter />
   </VueLenis>
</template>
