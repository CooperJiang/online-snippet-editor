<template>
  <v-snackbar
    v-for="(snackbar, index) in snackbarQueue"
    class="transition-all"
    :key="snackbar.key"
    :timeout="snackbar.timeout"
    @update:modelValue="update(snackbar)"
    location="end top"
    auto-height
    v-model="snackbar.visible"
    :color="snackbar?.color"
    :style="{ top: `${index * 60 + 16}px` }"
  >
    {{ snackbar.text }}
    <template v-slot:actions>
      <v-btn v-if="snackbar.showCloseIcon" icon @click="close(snackbar.key)" :color="messageColor">
        <v-icon size="18">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import type { MessageTips } from "~/store/helper"
import { useGlobalStore } from "~/store/useGlobal"

const store = useGlobalStore()
const snackbarQueue = computed(() => store.snackbarQueue)
const messageColor = computed(() => store.messageColor)

function close(key: string) {
  store.closeSnackbar(key)
}

function update(snackbar: MessageTips) {
  const { key } = snackbar
  store.closeSnackbar(key)
}
</script>

<style scoped></style>
