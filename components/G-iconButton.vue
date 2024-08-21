<template>
  <div class="flex items-center justify-center rounded-md transition-all" :class="hover ? 'hover:bg-[#ffffff1f]' : ''">
    <Icon :name="icon" :style="{ fontSize: `${size}px` }" class="m-1 text-white"></Icon>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  size?: number
  hover?: boolean
}
withDefaults(defineProps<Props>(), {
  size: 16,
  hover: true
})
</script>

<style lang="scss" scoped></style>
