<template>
  <NuxtLayout>
    <v-app>
      <v-theme-provider :theme="theme">
        <G-message />
        <NuxtPage :style="{ backgroundColor: bgColor, height: '100vh' }" />
      </v-theme-provider>
    </v-app>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { computed } from "vue"
const theme = computed(() => useThemeStore().theme)

const bgColor = computed(() => {
  return theme.value === "dark" ? "#171717" : "#fff"
})

const updateCSSVariables = () => {
  document.documentElement.style.setProperty('--bg-color', bgColor.value)
}

if(import.meta.client){
  watch(theme, updateCSSVariables, { immediate: true })
}

useHead({
  script: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js" // 在线编译sass
    }
  ]
})
</script>

<style>

:root {
  --bg-color: #171717;
}
body{
  background-color: var(--bg-color);
}
</style>