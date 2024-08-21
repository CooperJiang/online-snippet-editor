<template>
  <div class="relative cursor-auto rounded-sm transition-all hover:bg-[#444857]">
    <svg-icon name="layout" class="text-[26px] font-bold" @click="showLayout = true" />
    <div
      v-if="showLayout"
      v-click-outside="hide"
      class="absolute left-[-80px] top-[35px] z-10 flex space-x-2 rounded-md border border-[#000] bg-[#444857] px-4 py-2"
    >
      <svg-icon
        v-for="(item, index) in layoutList"
        :key="index"
        :name="item.val === layoutMode ? `${item.name}-active` : item.name"
        @click="changeLayout(item.val)"
        class="cursor-pointer text-[28px]"
      ></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const layoutMode = computed(() => useEditorLayoutStore().layoutMode)
const layoutList = [
  { name: "layout-1", val: 1 },
  { name: "layout-2", val: 2 },
  { name: "layout-3", val: 3 },
  { name: "layout-4", val: 4 },
  { name: "layout-5", val: 5 }
]

const showLayout = ref(false)

function hide() {
  showLayout.value = false
}

function changeLayout(layout: number) {
  useEditorLayoutStore().setLayoutMode(layout)
}
</script>

<style scoped></style>
