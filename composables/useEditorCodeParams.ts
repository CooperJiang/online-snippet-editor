import { ref } from 'vue'
import { getDefaultSettings, type PreSettings } from '~/pages/components/helper'

export const useEditorCodeParams = defineStore('editorCodeParams', () => {

  const runIframeOptions = ref<any>({})
  const preSettings = ref<PreSettings>(getDefaultSettings())


  const setRunIframeOptions = (params: any) => {
    runIframeOptions.value = params;
  }

  const setPreSettings = (params: PreSettings) => {
    preSettings.value = params;
  }

  const resetEditorCodeParams = () => {
    runIframeOptions.value = {}
    preSettings.value = getDefaultSettings()
  }


  return { runIframeOptions, preSettings, setRunIframeOptions, setPreSettings, resetEditorCodeParams }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
