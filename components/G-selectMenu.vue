<template>
  <v-menu :offset="offset" :location="location">
    <template v-slot:activator="activatorProps">
      <slot name="activator" v-bind="activatorProps">
        <G-iconButton :icon="icon" v-bind="activatorProps.props" />
      </slot>
    </template>
    <div class="flex flex-col border-[#000] bg-[#212121] py-1">
      <span
        class="select-menu-item"
        :style="{ width: `${width}px` }"
        v-for="(item, index) in menuList"
        :key="item.key"
        @click="handleClick(item, index)"
      >
        {{ item.name }}
      </span>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
import type { MenuItem, SelectMenuProps } from "./helper"

interface Emits {
  (e: "command", menuItem: MenuItem): void
}

const props = withDefaults(defineProps<SelectMenuProps>(), {
  icon: "more",
  width: 180,
  offset: [10, 155],
  location: "bottom"
})
const emit = defineEmits<Emits>()

function handleClick(menuItem: MenuItem, index: number) {
  emit("command", menuItem)
}
</script>

<style scoped>
.select-menu-item {
  @apply cursor-pointer select-none items-center rounded-sm py-1 pl-6 text-[14px] font-bold text-[#ffffffb2] text-white hover:bg-[#ffffff14];
}
</style>
