<script setup lang="ts">
import { javascript } from "@codemirror/lang-javascript"
import { EditorView } from "@codemirror/view"
import { css } from "@codemirror/lang-css"
import { basicSetup } from "codemirror"
import { html } from "@codemirror/lang-html"
import { oneDark } from "@codemirror/theme-one-dark"
const theme = ref<"light" | "dark" | "none">("dark")
const codemirror = ref<any>()

interface Props {
  modelValue: string | undefined
  lang: "javascript" | "css" | "html"
  theme: "light" | "dark" | "none"
  readOnly?: boolean
  updateCode?: string
  placeholder?: string
  showMask?: boolean
}

interface Emits {
  (e: "update:modelValue", value: string): void
  (e: "ready", bool: boolean): void
}

const key = ref(1)
const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
  lang: "javascript",
  readOnly: false,
  placeholder: "Enter your code here..."
})
const code = ref(props.modelValue)

watch(
  () => props.updateCode,
  (val: any) => {
    code.value = val
    key.value += 1
  }
)

function refresh(nCode: string) {
  code.value = nCode
  key.value += 1
}

defineExpose({ refresh })

const extensions = computed(() => {
  switch (props.lang) {
    case "javascript":
      return [basicSetup, javascript(), oneDark, EditorView.lineWrapping]
    case "css":
      return [basicSetup, css(), oneDark, EditorView.lineWrapping]
    case "html":
      return [basicSetup, html(), oneDark, EditorView.lineWrapping]
    default:
      return [basicSetup, oneDark, EditorView.lineWrapping]
  }
})

const handleChange = (value: string) => {
  emit("update:modelValue", value)
}

onMounted(() => {
  watchEffect(() => {
    if (codemirror.value && codemirror.value.view) {
    }
  })
})
</script>

<template>
  <div class="relative h-[calc(100%-35px)] w-full overflow-scroll bg-[#212121]">
    <data class="absolute left-0 top-0 z-[999] h-full w-full bg-[#282c34]" v-if="showMask"></data>
    <NuxtCodeMirror
      :key="key"
      ref="codemirror"
      v-model="code"
      style="width: 100%; height: 100%"
      class="bg-[#282c34]"
      :extensions="extensions"
      :theme="theme"
      :placeholder="placeholder"
      :auto-focus="false"
      :foldGutter="true"
      :editable="true"
      :basic-setup="true"
      :indent-with-tab="true"
      :lineWrapping="true"
      :readOnly="readOnly"
      @on-change="handleChange"
    />
  </div>
</template>
