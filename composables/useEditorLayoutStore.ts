import { ref } from 'vue'

export const useEditorLayoutStore = defineStore('editorLayout', () => {
  const containerRect = ref<{ width: number; height: number }>({
    width: 0,
    height: 0
  })
  const layoutMode = ref(2)
  const layoutParams = ref({
    layoutMode: 3,
    htmlContent: {
      width: 0,
      height: 0
    },
    cssContent: {
      width: 0,
      height: 0
    },
    jsContent: {
      width: 0,
      height: 0
    },
    runContent: {
      width: 0,
      height: 0
    }
  })

  const setLayoutMode = (mode: number) => {
    layoutMode.value = mode;
  }

  const setContentRect = (rect: { width: number; height: number }) => {
    containerRect.value = rect;
  }

  const setLayoutParams = (params: any) => {
    layoutParams.value = params;
  }

  const updateLayoutParams = <T extends keyof typeof layoutParams.value, K extends keyof typeof layoutParams.value[T]>(updateKey: T, contentKey: K, val: typeof layoutParams.value[T][K]) => {
    layoutParams.value[updateKey][contentKey] = val;
  }

  return { layoutMode, containerRect, setContentRect, layoutParams, setLayoutMode, setLayoutParams, updateLayoutParams }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
