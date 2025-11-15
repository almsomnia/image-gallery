<script setup lang="ts">
const { y, directions } = useScroll(document)

const mobileMenu = shallowRef(false)
const header = useTemplateRef("header")

watch(
   [y, () => directions.top, () => directions.bottom],
   ([yVal, scrollingUp, scrollingDown]) => {
      if (!header.value) return

      const el = header.value.$el as HTMLElement
      const className = "-translate-y-full"

      if (mobileMenu.value) {
         el.classList.remove(className)
         return
      }

      if (yVal < 100 || scrollingUp) {
         el.classList.remove(className)
      } else if (scrollingDown) {
         el.classList.add(className)
      }
   }
)

const menu = useMenu()
</script>

<template>
   <AppHeader
      ref="header"
      v-model:mobile-menu="mobileMenu"
      class="z-999 transition-transform duration-800 ease-in-out"
   />
   <Transition
      name="fade"
      mode="out-in"
   >
      <div
         v-if="mobileMenu"
         data-lenis-prevent
         class="fixed inset-0 z-99 h-full w-full bg-white"
      >
         <div class="pt-24">
            <div class="flex flex-col items-center gap-12 pt-24">
               <NuxtLink
                  v-for="item in menu"
                  :to="item.to"
                  @click.stop="mobileMenu = false"
               >
                  <span class="text-6xl font-display tracking-wide">
                     {{ item.label }}
                  </span>
               </NuxtLink>
            </div>
         </div>
      </div>
   </Transition>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}
</style>
