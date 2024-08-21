<template>
  <div class="my-2 flex h-full flex-col px-[8px] py-[16px]">
    <span
      v-for="(item, index) in sidebarList"
      :key="index"
      class="flex h-[40px] w-[180px] cursor-pointer select-none items-center rounded-sm pl-6 text-[#ffffffb2] hover:bg-[#ffffff14]"
      :class="[item.key === selectKey ? 'bg-[#1e80ff33] font-bold text-[#4495ff]' : '', item.seg ? 'mb-4' : '']"
      @click="selectLabel(item.key)"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { EditorSettingSidebarProps, EditorSettingSidebarEmits } from "./helper"

const props = defineProps<EditorSettingSidebarProps>()
const emit = defineEmits<EditorSettingSidebarEmits>()
const selectKey = ref("")

watch(
  () => props.modelValue,
  val => (selectKey.value = val),
  { immediate: true }
)

const sidebarList = [
  { name: "Html", key: "html", seg: false },
  { name: "Style", key: "style", seg: false },
  { name: "Script", key: "script", seg: true },
  { name: "项目信息", key: "project", seg: false },
  { name: "存储设置", key: "save", seg: false },
  { name: "编辑器设置", key: "editor", seg: false }
]

function selectLabel(key: string) {
  selectKey.value = key
  emit("update:modelValue", key)
}
</script>
