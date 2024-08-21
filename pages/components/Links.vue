<template>
  <div class="h-full w-full">
    <div class="flex items-center justify-between space-x-3" v-for="(item, index) in links" :key="index">
      <v-text-field variant="solo-filled" v-model="links[index]" :placeholder="placeholder"></v-text-field>
      <Icon name="mdi-close" disabled class="mb-5 cursor-pointer" @click="deleteLink(index)" />
    </div>
    <div class="flex justify-end"><v-btn variant="text" append-icon="mdi-plus" height="24" @click="plus">添加新资源</v-btn></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
interface Props {
  modelValue: string[]
  placeholder: string
}
interface Emits {
  (e: "update:modelValue", value: string[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const links = ref(props.modelValue)

function plus() {
  links.value.push("")
  emit("update:modelValue", links.value)
}

function deleteLink(index: number) {
  links.value.splice(index, 1)
  emit("update:modelValue", links.value)
}
</script>

<style scoped></style>
