<template>
  <div class="flex h-screen w-screen flex-col bg-[#171717]">
    <div class="flex h-[50px] w-full items-center justify-between">
      <G-logo />
      <div class="flex items-center space-x-3 pr-2">
        <G-iconButton @click="updateSetting('html')" icon="material-symbols:settings" :size="20" />
        <EditorLayoutSetting />
        <v-btn prepend-icon="mdi-play-circle-outline" type="primary" @click="runCode">运行</v-btn>
        <v-btn prepend-icon="mdi-delete-alert-outline" type="primary" @click="resetEditor">清空编辑器</v-btn>
      </div>
    </div>
    <div class="h-1 flex-1">
      <EditorLayout>
        <template #html="{ size }">
          <div class="flex h-[35px] w-full items-center justify-between bg-[#18212d]">
            <div class="z-[1] flex h-full items-center rounded-t-md bg-[#282c34] text-[16px] text-white">
              <Icon name="logos:html-5" class="ml-3 h-[20px] w-[20px]"></Icon>
              <span class="ml-1 flex items-center" v-if="isShowHtmlTailWindIcon">
                +
                <Icon name="logos:tailwindcss-icon" class="ml-2 h-[20px] w-[20px]"></Icon>
              </span>
              <span class="ml-2 select-none pr-3 font-bold">{{ htmlLabel }}</span>
              <G-selectMenu
                :menu-list="htmlTypeList"
                :width="180"
                :offset="[10, 0]"
                icon="material-symbols:arrow-drop-down-circle"
                @command="menuItemClick"
              />
            </div>
            <div class="flex h-full items-center justify-center pr-2">
              <G-iconButton @click="updateSetting('html')" icon="material-symbols:settings" />
              <G-selectMenu :menu-list="htmlMenuList" icon="material-symbols:arrow-drop-down-circle" @command="menuItemClick" />
            </div>
          </div>
          <G-codemirror :showMask="size.width <= 40" v-model="html" lang="html" theme="dark" placeholder="Enter your html code here..." />
        </template>
        <template #css="{ size }">
          <div class="flex h-[35px] w-full items-center justify-between bg-[#18212d]">
            <div class="z-[2] flex h-full items-center rounded-t-md bg-[#282c34] text-[16px] text-white">
              <Icon :name="cssIcon" class="ml-3 h-[20px] w-[20px]"></Icon>
              <span class="ml-2 select-none pr-3 font-bold">{{ cssLabel }}</span>
              <G-selectMenu
                :menu-list="cssTypeList"
                :width="100"
                :offset="[10, 0]"
                icon="material-symbols:arrow-drop-down-circle"
                @command="menuItemClick"
              />
            </div>
            <div class="flex h-full items-center justify-center pr-2">
              <G-iconButton @click="updateSetting('style')" icon="material-symbols:settings" />
              <G-selectMenu :menu-list="cssMenuList" icon="material-symbols:arrow-drop-down-circle" @command="menuItemClick" />
            </div>
          </div>
          <G-codemirror :showMask="size.width <= 40" v-model="css" lang="css" theme="dark" placeholder="Enter your css code here..." />
        </template>
        <template #js="{ size }">
          <div class="flex h-[35px] w-full items-center justify-between bg-[#18212d]">
            <div class="z-[3] flex h-full items-center rounded-t-md bg-[#282c34] text-[16px] text-white">
              <Icon name="logos:javascript" class="ml-3 h-[20px] w-[20px]"></Icon>
              <span class="ml-2 select-none pr-3 font-bold">JavaScript</span>
            </div>
            <div class="flex h-full items-center justify-center pr-2">
              <G-iconButton @click="updateSetting('script')" icon="material-symbols:settings" />
              <G-selectMenu :menu-list="jsMenuList" icon="material-symbols:arrow-drop-down-circle" @command="menuItemClick" />
            </div>
          </div>
          <G-codemirror :showMask="size.width <= 40" v-model="js" lang="javascript" theme="dark" placeholder="Enter your js code here..." />
        </template>
        <template #run-iframe="{ size }">
          <RunIframe ref="runIframeRef" :options="runIframeOptions" :pre-settings="preSettings" v-if="showSettings" />
        </template>
      </EditorLayout>
    </div>
    <EditorSettingDialog ref="settingDialogRef" v-model="dialog" :pre-settings="preSettings" v-if="showSettings" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { formatCode } from "~/utils/prettier"
import { cssTypeMap, htmlTypeMap, cssTypeIconMap } from "~/constants/editor"
import type { MenuItem } from "~/components/helper"
import type { LayoutMode, PreSettings } from "./components/helper"
import EditorLayout from "./components/EditorLayout.vue"
import RunIframe from "./components/RunIframe.vue"
import EditorSettingDialog from "./components/EditorSettingDialog.vue"
import EditorLayoutSetting from "./components/EditorLayoutSetting.vue"

import { htmlMenuList, cssMenuList, jsMenuList, cssTypeList, htmlTypeList } from "~/constants/editor"

let timer: any = null
const dialog = ref(false)
const editorCodeParamsStore = useEditorCodeParams()
const html = ref(editorCodeParamsStore.runIframeOptions.html)
const css = ref(editorCodeParamsStore.runIframeOptions.css)
const js = ref(editorCodeParamsStore.runIframeOptions.js)
const preSettings = ref(editorCodeParamsStore.preSettings)
const runIframeOptions = ref(editorCodeParamsStore.runIframeOptions)
const runIframeRef = ref<any>(null)
const settingDialogRef = ref<any>(null)
const showSettings = computed(() => preSettings.value && Object.keys(preSettings.value).length > 0)

const cssLabel = computed(() => {
  const styleType = useEditorCodeParams().preSettings?.styleSettings?.styleType
  return cssTypeMap[styleType] || "CSS"
})

const cssIcon = computed(() => {
  const styleType = useEditorCodeParams().preSettings?.styleSettings?.styleType
  return cssTypeIconMap[styleType]
})

const htmlLabel = computed(() => {
  const styleType = useEditorCodeParams().preSettings?.htmlSettings?.htmlType
  return htmlTypeMap[styleType] || "Html"
})

const isShowHtmlTailWindIcon = computed(() => {
  const htmlType = useEditorCodeParams().preSettings?.htmlSettings?.htmlType
  return htmlType === "html-tailwindcss"
})

function menuItemClick(menuItem: MenuItem) {
  const { options = {} } = menuItem
  const event = options.event
  if (!event) return
  if (event === "format") {
    formatEditorCode(options)
  }
  if (event === "updateCssType") {
    updateSettingFromCssType(options)
  }
  if (event === "updateHtmlType") {
    updateSettingFromHtmlType(options)
  }
}

/* update css type */
function updateSettingFromCssType(options: any) {
  const type = options?.type || "css"
  preSettings.value.styleSettings.styleType = type
  editorCodeParamsStore.setPreSettings(preSettings.value)
}

/* update html type */
function updateSettingFromHtmlType(options: any) {
  const type = options?.type || "html"
  preSettings.value.htmlSettings.htmlType = type
  editorCodeParamsStore.setPreSettings(preSettings.value)
}

/* format edit code and auto refresh */
async function formatEditorCode(options: any) {
  const { language } = options
  if (["js", "javascript"].includes(language)) {
    try {
      const code = await formatCode(js.value, language)
      js.value = code
    } catch (error) {}
  }
  if (["css"].includes(language)) {
    try {
      const code = await formatCode(css.value, language)
      css.value = code
    } catch (error) {}
  }
  if (["html", "vue"].includes(language)) {
    try {
      const code = await formatCode(html.value, language)
      html.value = code
    } catch (error) {}
  }
}

function updateSetting(mode?: LayoutMode) {
  dialog.value = true
  settingDialogRef.value && settingDialogRef.value.changeLayoutBar(mode)
}

watch(
  () => [html.value, css.value, js.value],
  async val => {
    clearTimeout(timer)
    timer = setTimeout(() => compilerRunIframeOptions(val), 500)
  },
  { deep: true }
)
const storeSaveSettings = useDebounce((preSettings: PreSettings) => {
  editorCodeParamsStore.setPreSettings(preSettings)
}, 500)

watch(preSettings.value, val => storeSaveSettings(val))

function compilerRunIframeOptions(updateValues: any) {
  const [html, css, js] = updateValues
  runIframeOptions.value = {
    html: html,
    css: css,
    js: js
  }
  useEditorCodeParams().setRunIframeOptions(runIframeOptions.value)
}

function runCode() {
  runIframeRef.value && runIframeRef.value.run()
}

function resetEditor() {
  editorCodeParamsStore.resetEditorCodeParams()
  html.value = ""
  css.value = ""
  js.value = ""
}
</script>

<style scoped></style>
