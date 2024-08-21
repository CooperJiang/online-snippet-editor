<template>
  <iframe
    ref="iframeRef"
    :key="key"
    :srcdoc="code"
    style="border: none; width: 100%; height: 100%"
    sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-scripts allow-top-navigation-by-user-activation"
    allow="accelerometer; bluetooth; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share; serial; xr-spatial-tracking"
    scrolling="auto"
    allowpaymentrequest="true"
    allowfullscreen="true"
    loading="lazy"
    class="run-iframe h-full w-full bg-[#212112] text-white"
    :class="preview ? 'pointer-events-none' : ''"
    @load="onIframeLoad"
  ></iframe>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"
import { compilerIframeCode, type RunIframeParams } from "~/utils/runIframe"
import type { PreSettings } from "./helper"
import { transformEditorParamsFromDb } from "~/utils/index"
const code = ref("")
const key = ref(0)
const iframeRef = ref<any>(null)

interface props {
  options?: {
    html?: string
    js?: string
    css?: string
  }
  preSettings?: PreSettings
  preview?: boolean
  snippetCode?: any
  previewScale?: number
}

const props = withDefaults(defineProps<props>(), {
  preview: false,
  snippetCode: {}
})

const compilerCode = useDebounce(async () => {
  if (!props?.options && !props.preSettings) return
  code.value = await compilerIframeCode(props?.options as RunIframeParams, props.preSettings as PreSettings, {
    preview: props.preview,
    previewScale: props.previewScale
  })
}, 500)

watch(
  () => [props.options, props.preSettings],
  val => {
    if (!val || !import.meta.client) return
    compilerCode()
  },
  { deep: true }
)

if (props.preview) {
  const { preSettings, runIframeOptions } = transformEditorParamsFromDb(props.snippetCode)
  code.value = await compilerIframeCode(runIframeOptions, preSettings, {
    preview: props.preview,
    previewScale: props.previewScale
  })
}
onMounted(async () => {
  compilerCode()
})

async function run() {
  key.value += 1
}

defineExpose({ run })

// window?.addEventListener("message", function (event) {
//   console.log("Received message from iframe:", event.data)
// })

function onIframeLoad() {
  if (iframeRef.value) {
    window.parent.postMessage({ status: "ready" }, "*")
  }
}
</script>
