<template>
  <v-dialog
    max-width="740"
    v-model="dialog"
    @afterLeave="afterLeave"
    :opacity="0.1"
  >
    <v-card class="overflow-hidden">
      <v-card-title>
        <div class="flex h-[40px] items-center justify-between">
          <div class="flex select-none items-center space-x-1 text-[16px]">
            <Icon name="mdi-cog" class="text-[20px]" />
            <span>编辑器设置</span>
          </div>
          <G-iconButton icon="mdi-close" @click="afterLeave" />
        </div>
      </v-card-title>
      <div class="h-[600px] border-t">
        <div class="flex h-full w-full justify-between">
          <div class="pl-4">
            <EditorSettingSidebar v-model="labelMode" />
          </div>
          <div
            class="flex-1 overflow-y-scroll border-l border-[#ffffff12] py-[24px] pl-[16px] pr-[24px]"
          >
            <div class="h-full w-full" v-if="labelMode === 'html'">
              <div class="label">head标签内容</div>
              <v-textarea
                variant="solo-filled"
                v-model="cacheSettings.htmlSettings.headSettings"
                placeholder="可插入Head标签体的内容标签"
              ></v-textarea>
              <div class="label">html class设置</div>
              <v-text-field
                variant="solo-filled"
                v-model="cacheSettings.htmlSettings.htmlClass"
                placeholder="可填写html的class标签"
              ></v-text-field>
              <div class="label">body class设置</div>
              <v-text-field
                variant="solo-filled"
                v-model="cacheSettings.htmlSettings.bodyClass"
                placeholder="可填写body的class标签"
              ></v-text-field>
            </div>

            <div class="h-full w-full" v-if="labelMode === 'style'">
              <div class="label">基础样式</div>
              <v-radio-group v-model="cacheSettings.styleSettings.defaultCss">
                <v-radio label="reset.css" :value="2"></v-radio>
                <v-radio label="normalize.css" :value="1"></v-radio>
                <v-radio label="不需要" :value="0"></v-radio>
              </v-radio-group>
              <div class="label">Css文件类型</div>
              <v-radio-group v-model="cacheSettings.styleSettings.styleType">
                <v-radio label="Css" value="css"></v-radio>
                <v-radio label="Less" value="less"></v-radio>
                <v-radio label="Sass" value="sass"></v-radio>
              </v-radio-group>
              <div class="label">添加依赖资源</div>
              <Links
                v-model="cacheSettings.styleSettings.links"
                placeholder="请填写CSS资源地址 https:// "
              />
            </div>

            <div class="h-full w-full" v-if="labelMode === 'script'">
              <div class="label">添加依赖资源</div>
              <Links
                v-model="cacheSettings.scriptSettings.scripts"
                placeholder="请填写JS资源地址 https:// "
              />
            </div>

            <div class="h-full w-full" v-if="labelMode === 'project'">
              <div class="label">项目名称</div>
              <v-text-field
                variant="solo-filled"
                v-model="cacheSettings.projectInfo.name"
                placeholder="请输入项目名称"
              ></v-text-field>
              <div class="label">项目描述</div>
              <v-textarea
                variant="solo-filled"
                v-model="cacheSettings.projectInfo.description"
                placeholder="请填写项目描述"
              ></v-textarea>
            </div>

            <div class="h-full w-full" v-if="labelMode === 'save'">
              <div class="label">自动保存</div>
              <v-switch
                v-model="cacheSettings.saveSettings.autoSave"
                label="开启后，代码会自动保存"
              ></v-switch>

              <div class="label">自动运行</div>
              <v-switch
                v-model="cacheSettings.saveSettings.autoRun"
                label="开启后，编写代码会实时运行"
              ></v-switch>

              <div class="label">自动格式化</div>
              <v-switch
                v-model="cacheSettings.saveSettings.autoFormat"
                label="开启后，运行代码会自动格式化"
              ></v-switch>
            </div>

            <div class="h-full w-full" v-if="labelMode === 'editor'">
              <div class="label">代码缩进</div>
              <v-radio-group
                v-model="cacheSettings.editorSetting.indentType"
                inline
              >
                <v-radio label="Tabs" value="tab"></v-radio>
                <v-radio label="Spaces" value="space"></v-radio>
              </v-radio-group>

              <div class="label">代码缩进尺寸</div>
              <v-slider
                v-model="cacheSettings.editorSetting.indentSize"
                class="w-[280px]"
                :max="5"
                :min="1"
                :step="1"
                thumb-label
              ></v-slider>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type {
  LayoutMode,
  EditorSettingProps,
  EditorSettingEmits,
  PreSettings,
} from "./helper";
import { ref, watch } from "vue";
import EditorSettingSidebar from "./EditorSettingSidebar.vue";
import Links from "./Links.vue";

const emit = defineEmits<EditorSettingEmits>();
const props = defineProps<EditorSettingProps>();
const dialog = ref(false);
const cacheSettings = ref<PreSettings>(props.preSettings);
const labelMode = ref<LayoutMode>("html");

function afterLeave() {
  emit("update:modelValue", false);
}

watch(
  () => props.modelValue,
  (val) => (dialog.value = val),
  { immediate: true }
);

function changeLayoutBar(mode: LayoutMode) {
  labelMode.value = mode;
}

defineExpose({ changeLayoutBar });
</script>

<style scoped>
.label {
  @apply mb-3 select-none text-white;
}
</style>
