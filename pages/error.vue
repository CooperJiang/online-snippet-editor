<template>
  <div>
    <span>nuxt 内置错误</span>
    <span>{{ JSON.stringify(error) }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object
})

clearError({ redirect: "/home" })
</script>

<style scoped></style>
