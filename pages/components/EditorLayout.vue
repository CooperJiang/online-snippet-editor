<template>
  <div class="h-full w-full" ref="containerRef">
    <div v-if="loadSuccess" class="h-full w-full">
      <div v-if="[1, 4, 5].includes(layoutMode)" class="flex h-full w-full flex-col" :style="gridStyle">
        <div :style="{}" class="flex w-full">
          <div class="html relative" :style="generateStyleObj(layoutParams.htmlContent)">
            <slot name="html" class="px-5" :size="layoutParams.htmlContent"></slot>
            <div class="verticalRDivider" @mousedown="startDrag($event, 'htmlRightDivider')"></div>
          </div>
          <div class="css relative" :style="generateStyleObj(layoutParams.cssContent)">
            <slot name="css" :size="layoutParams.cssContent"></slot>
            <div class="verticalRDivider" @mousedown="startDrag($event, 'cssRightDivider')"></div>
          </div>
          <div class="js" :style="generateStyleObj(layoutParams.jsContent)">
            <slot name="js" :size="layoutParams.jsContent"></slot>
          </div>
        </div>
        <div class="run-iframe relative" :style="generateStyleObj(layoutParams.runContent)">
          <slot name="run-iframe" :size="layoutParams.runContent"></slot>
          <div class="horizontalTDivider" @mousedown="startDrag($event, 'runTopDivider')"></div>
        </div>
      </div>

      <div v-if="layoutMode === 2" class="flex h-full w-full" :style="gridStyle">
        <div :style="{}" class="flex h-full flex-col">
          <div class="html relative" :style="generateStyleObj(layoutParams.htmlContent)">
            <slot name="html" :size="layoutParams.htmlContent"></slot>
            <div class="horizontalBDivider" @mousedown="startDrag($event, 'htmlRightDivider')"></div>
          </div>
          <div class="css relative" :style="generateStyleObj(layoutParams.cssContent)">
            <slot name="css" :size="layoutParams.cssContent"></slot>
            <div class="horizontalBDivider" @mousedown="startDrag($event, 'cssRightDivider')"></div>
          </div>
          <div class="js" :style="generateStyleObj(layoutParams.jsContent)">
            <slot name="js" :size="layoutParams.jsContent"></slot>
          </div>
        </div>
        <div class="run-iframe relative" :style="generateStyleObj(layoutParams.runContent)">
          <slot name="run-iframe" :size="layoutParams.runContent"></slot>
          <div class="verticalLDivider" @mousedown="startDrag($event, 'runTopDivider')"></div>
        </div>
      </div>

      <div v-if="layoutMode === 3" class="flex h-full w-full" :style="gridStyle">
        <div class="run-iframe relative" :style="generateStyleObj(layoutParams.runContent)">
          <slot name="run-iframe" :size="layoutParams.runContent"></slot>
          <div class="verticalRDivider" @mousedown="startDrag($event, 'runTopDivider')"></div>
        </div>
        <div :style="{}" class="flex h-full flex-col">
          <div class="html relative" :style="generateStyleObj(layoutParams.htmlContent)">
            <slot name="html" :size="layoutParams.htmlContent"></slot>
            <div class="horizontalBDivider" @mousedown="startDrag($event, 'htmlRightDivider')"></div>
          </div>
          <div class="css relative" :style="generateStyleObj(layoutParams.cssContent)">
            <slot name="css" :size="layoutParams.cssContent"></slot>
            <div class="horizontalBDivider" @mousedown="startDrag($event, 'cssRightDivider')"></div>
          </div>
          <div class="js" :style="generateStyleObj(layoutParams.jsContent)">
            <slot name="js" :size="layoutParams.jsContent"></slot>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loadSuccess" class="flex h-full w-full items-center justify-center bg-[#282c34]">
      <G-loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"

const editorLayoutStore = useEditorLayoutStore()
const layoutMode = computed(() => editorLayoutStore.layoutMode)
const cacheContentParams = ref<any>({})
const loadSuccess = ref(false)
const containerRect = ref<{ width: number; height: number }>({
  width: 0,
  height: 0
})

const startPoint = ref({
  startX: 0,
  startY: 0
})

const layoutParams = ref<any>({
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

watch(
  layoutParams,
  val => {
    useEditorLayoutStore().setLayoutParams(val)
  },
  {
    deep: true
  }
)

watch(layoutMode, val => {
  calcSize()
})

function generateStyleObj(contentSize: { width: number; height: number }) {
  return {
    width: `${contentSize.width}px`,
    height: `${contentSize.height}px`
  }
}

const activeDivider = ref("")

function startDrag(event: any, divName: string) {
  const mask = document.createElement("div")

  activeDivider.value = divName
  startPoint.value = {
    startX: event.clientX,
    startY: event.clientY
  }
  cacheContentParams.value = JSON.parse(JSON.stringify(layoutParams.value))
  mask.style.cssText = "position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 9999;"
  mask.setAttribute("id", "mousemoveMask")
  document.body.append(mask)
  mask.addEventListener("mousemove", onDrag)
  mask.addEventListener("mouseup", stopDrag)
  // document.addEventListener("mousemove", onDrag)
  // document.addEventListener("mouseup", stopDrag)
}

const onDrag = (event: any) => {
  const { startX, startY } = startPoint.value
  const diffX = event.clientX - startX
  const diffY = event.clientY - startY

  if ([1, 4, 5].includes(layoutMode.value)) {
    if (activeDivider.value === "htmlRightDivider") {
      let htmlBoxW = cacheContentParams.value.htmlContent.width + diffX

      if (htmlBoxW < 40) {
        layoutParams.value.htmlContent.width = 40
        layoutParams.value.cssContent.width = cacheContentParams.value.htmlContent.width + cacheContentParams.value.cssContent.width - 40
        return
      }
      let cssBoxW = cacheContentParams.value.cssContent.width - diffX

      if (cssBoxW < 40) cssBoxW = 40

      // 可能拖入到第三个格子会改变他的宽度
      const exceedDiffW =
        Math.round(htmlBoxW + cssBoxW) - Math.round(cacheContentParams.value.htmlContent.width + cacheContentParams.value.cssContent.width)

      let jsBoxW = cacheContentParams.value.jsContent.width

      if (exceedDiffW > 0) {
        jsBoxW = cacheContentParams.value.jsContent.width - exceedDiffW
        if (jsBoxW < 40) jsBoxW = 40
      }
      // 如果总宽比之前大了就暂停 不能再移动了
      const oldTotalWidth = containerRect.value.width
      const newTotalWidth = htmlBoxW + cssBoxW + jsBoxW

      if (Math.abs(oldTotalWidth - newTotalWidth) > 3) {
        layoutParams.value.htmlContent.width = oldTotalWidth - 80
        layoutParams.value.cssContent.width = 40
        layoutParams.value.jsContent.width = 40
        return
      }

      layoutParams.value.htmlContent.width = htmlBoxW
      layoutParams.value.cssContent.width = cssBoxW
      layoutParams.value.jsContent.width = jsBoxW
    }

    if (activeDivider.value === "cssRightDivider") {
      let cssBoxW = cacheContentParams.value.cssContent.width + diffX
      if (cssBoxW < 40) cssBoxW = 40
      let jsBoxW = cacheContentParams.value.jsContent.width - diffX
      if (jsBoxW < 40) {
        layoutParams.value.cssContent.width = cacheContentParams.value.cssContent.width + cacheContentParams.value.jsContent.width - 40
        layoutParams.value.jsContent.width = 40
        return
      }
      // 可能拖入到第三个格子会改变他的宽度
      const exceedDiffW =
        Math.round(cssBoxW + jsBoxW) - Math.round(cacheContentParams.value.cssContent.width + cacheContentParams.value.jsContent.width)
      let htmlBoxW = cacheContentParams.value.htmlContent.width
      if (exceedDiffW > 0) {
        htmlBoxW = cacheContentParams.value.htmlContent.width - exceedDiffW
        if (htmlBoxW < 40) htmlBoxW = 40
      }
      // 如果总宽比之前大了就暂停 不能再移动了
      const oldTotalWidth = containerRect.value.width
      const newTotalWidth = htmlBoxW + cssBoxW + jsBoxW
      if (Math.abs(oldTotalWidth - newTotalWidth) > 3) {
        layoutParams.value.htmlContent.width = 40
        layoutParams.value.cssContent.width = 40
        layoutParams.value.jsContent.width = oldTotalWidth - 80
        return
      }
      layoutParams.value.htmlContent.width = htmlBoxW
      layoutParams.value.cssContent.width = cssBoxW
      layoutParams.value.jsContent.width = jsBoxW
    }

    if (activeDivider.value === "runTopDivider") {
      let runBoxH = cacheContentParams.value.runContent.height - diffY
      let topH = cacheContentParams.value.htmlContent.height + diffY
      if (runBoxH < 40) {
        runBoxH = 40
        topH = containerRect.value.height - 40
      }
      if (topH < 40) {
        topH = 40
        runBoxH = containerRect.value.height - 40
      }
      layoutParams.value.htmlContent.height = topH
      layoutParams.value.cssContent.height = topH
      layoutParams.value.jsContent.height = topH
      layoutParams.value.runContent.height = runBoxH
    }
  }

  if (layoutMode.value === 2) {
    if (activeDivider.value === "htmlRightDivider") {
      let htmlBoxH = cacheContentParams.value.htmlContent.height + diffY
      if (htmlBoxH < 40) {
        layoutParams.value.htmlContent.height = 40
        layoutParams.value.cssContent.height = cacheContentParams.value.htmlContent.height + cacheContentParams.value.cssContent.height - 40
        return
      }
      let cssBoxH = cacheContentParams.value.cssContent.height - diffY
      if (cssBoxH < 40) cssBoxH = 40
      // 可能拖入到第三个格子会改变他的宽度
      const exceedDiffH =
        Math.round(htmlBoxH + cssBoxH) -
        Math.round(cacheContentParams.value.htmlContent.height + cacheContentParams.value.cssContent.height)

      let jsBoxH = cacheContentParams.value.jsContent.height
      if (exceedDiffH > 0) {
        jsBoxH = cacheContentParams.value.jsContent.height - exceedDiffH
        if (jsBoxH < 40) jsBoxH = 40
      }
      // 如果总宽比之前大了就暂停 不能再移动了
      const oldTotalHeight = containerRect.value.height
      const newTotalHeight = htmlBoxH + cssBoxH + jsBoxH
      if (Math.abs(oldTotalHeight - newTotalHeight) > 3) {
        layoutParams.value.htmlContent.height = oldTotalHeight - 80
        layoutParams.value.cssContent.height = 40
        layoutParams.value.jsContent.height = 40
        return
      }
      layoutParams.value.htmlContent.height = htmlBoxH
      layoutParams.value.cssContent.height = cssBoxH
      layoutParams.value.jsContent.height = jsBoxH
    }
    if (activeDivider.value === "cssRightDivider") {
      let cssBoxH = cacheContentParams.value.cssContent.height + diffY
      if (cssBoxH < 40) cssBoxH = 40
      let jsBoxH = cacheContentParams.value.jsContent.height - diffY
      if (jsBoxH < 40) {
        layoutParams.value.cssContent.height = cacheContentParams.value.cssContent.height + cacheContentParams.value.jsContent.height - 40
        layoutParams.value.jsContent.height = 40
        return
      }
      // 可能拖入到第三个格子会改变他的宽度
      const exceedDiffW =
        Math.round(cssBoxH + jsBoxH) - Math.round(cacheContentParams.value.cssContent.height + cacheContentParams.value.jsContent.height)
      let htmlBoxH = cacheContentParams.value.htmlContent.height
      if (exceedDiffW > 0) {
        htmlBoxH = cacheContentParams.value.htmlContent.height - exceedDiffW
        if (htmlBoxH < 40) htmlBoxH = 40
      }
      // 如果总宽比之前大了就暂停 不能再移动了
      const oldTotalHeight = containerRect.value.height
      const newTotalHeight = htmlBoxH + cssBoxH + jsBoxH
      if (Math.abs(oldTotalHeight - newTotalHeight) > 3) {
        layoutParams.value.htmlContent.height = 40
        layoutParams.value.cssContent.height = 40
        layoutParams.value.jsContent.height = oldTotalHeight - 80
        return
      }
      layoutParams.value.htmlContent.height = htmlBoxH
      layoutParams.value.cssContent.height = cssBoxH
      layoutParams.value.jsContent.height = jsBoxH
    }
    if (activeDivider.value === "runTopDivider") {
      let runBoxW = cacheContentParams.value.runContent.width - diffX
      let topH = cacheContentParams.value.htmlContent.width + diffX
      if (runBoxW < 40) {
        runBoxW = 40
        topH = containerRect.value.width - 40
      }
      if (topH < 40) {
        topH = 40
        runBoxW = containerRect.value.width - 40
      }
      layoutParams.value.htmlContent.width = topH
      layoutParams.value.cssContent.width = topH
      layoutParams.value.jsContent.width = topH
      layoutParams.value.runContent.width = runBoxW
    }
  }

  if (layoutMode.value === 3) {
    if (activeDivider.value === "htmlRightDivider") {
      let htmlBoxH = cacheContentParams.value.htmlContent.height + diffY
      if (htmlBoxH < 40) {
        layoutParams.value.htmlContent.height = 40
        layoutParams.value.cssContent.height = cacheContentParams.value.htmlContent.height + cacheContentParams.value.cssContent.height - 40
        return
      }
      let cssBoxH = cacheContentParams.value.cssContent.height - diffY
      if (cssBoxH < 40) cssBoxH = 40
      // 可能拖入到第三个格子会改变他的宽度
      const exceedDiffH =
        Math.round(htmlBoxH + cssBoxH) -
        Math.round(cacheContentParams.value.htmlContent.height + cacheContentParams.value.cssContent.height)

      let jsBoxH = cacheContentParams.value.jsContent.height
      if (exceedDiffH > 0) {
        jsBoxH = cacheContentParams.value.jsContent.height - exceedDiffH
        if (jsBoxH < 40) jsBoxH = 40
      }
      // 如果总宽比之前大了就暂停 不能再移动了
      const oldTotalHeight = containerRect.value.height
      const newTotalHeight = htmlBoxH + cssBoxH + jsBoxH
      if (Math.abs(oldTotalHeight - newTotalHeight) > 3) {
        layoutParams.value.htmlContent.height = oldTotalHeight - 80
        layoutParams.value.cssContent.height = 40
        layoutParams.value.jsContent.height = 40
        return
      }
      layoutParams.value.htmlContent.height = htmlBoxH
      layoutParams.value.cssContent.height = cssBoxH
      layoutParams.value.jsContent.height = jsBoxH
    }
    if (activeDivider.value === "cssRightDivider") {
      let cssBoxH = cacheContentParams.value.cssContent.height + diffY
      if (cssBoxH < 40) cssBoxH = 40
      let jsBoxH = cacheContentParams.value.jsContent.height - diffY
      if (jsBoxH < 40) {
        layoutParams.value.cssContent.height = cacheContentParams.value.cssContent.height + cacheContentParams.value.jsContent.height - 40
        layoutParams.value.jsContent.height = 40
        return
      }
      // 可能拖入到第三个格子会改变他的宽度
      const exceedDiffW =
        Math.round(cssBoxH + jsBoxH) - Math.round(cacheContentParams.value.cssContent.height + cacheContentParams.value.jsContent.height)
      let htmlBoxH = cacheContentParams.value.htmlContent.height
      if (exceedDiffW > 0) {
        htmlBoxH = cacheContentParams.value.htmlContent.height - exceedDiffW
        if (htmlBoxH < 40) htmlBoxH = 40
      }
      // 如果总宽比之前大了就暂停 不能再移动了
      const oldTotalHeight = containerRect.value.height
      const newTotalHeight = htmlBoxH + cssBoxH + jsBoxH
      if (Math.abs(oldTotalHeight - newTotalHeight) > 3) {
        layoutParams.value.htmlContent.height = 40
        layoutParams.value.cssContent.height = 40
        layoutParams.value.jsContent.height = oldTotalHeight - 80
        return
      }
      layoutParams.value.htmlContent.height = htmlBoxH
      layoutParams.value.cssContent.height = cssBoxH
      layoutParams.value.jsContent.height = jsBoxH
    }
    if (activeDivider.value === "runTopDivider") {
      let runBoxW = cacheContentParams.value.runContent.width + diffX
      let topH = cacheContentParams.value.htmlContent.width - diffX
      if (runBoxW < 40) {
        runBoxW = 40
        topH = containerRect.value.width - 40
      }
      if (topH < 40) {
        topH = 40
        runBoxW = containerRect.value.width - 40
      }
      layoutParams.value.htmlContent.width = topH
      layoutParams.value.cssContent.width = topH
      layoutParams.value.jsContent.width = topH
      layoutParams.value.runContent.width = runBoxW
    }
  }
}

const stopDrag = () => {
  // document.removeEventListener("mousemove", onDrag)
  // document.removeEventListener("mouseup", stopDrag)
  const mask = document.getElementById("mousemoveMask")
  mask && mask.removeEventListener("mousemove", onDrag)
  mask && mask.removeEventListener("mouseup", stopDrag)
  mask && mask.remove()
  activeDivider.value = ""
  cacheContentParams.value = {}
}

const containerRef = ref(null)

useResizeObserver(containerRef, entries => {
  const { contentRect } = entries[0]
  const cacheRect = useEditorLayoutStore().containerRect
  const { width: olW, height: olH } = cacheRect
  const { width: nW, height: nH } = contentRect
  containerRect.value = contentRect // 记录容器尺寸
  if (olW === nW && olH === nH) {
    layoutParams.value = useEditorLayoutStore().layoutParams
    loadSuccess.value = true
    return
  }
  calcSize()
  useEditorLayoutStore().setContentRect(contentRect)
})

function calcSize() {
  const { width, height } = containerRect.value
  const mode = layoutMode.value
  const sizes: any = {
    1: {
      html: { width: width / 3, height: height * 0.4 },
      css: { width: width / 3, height: height * 0.4 },
      js: { width: width / 3, height: height * 0.4 },
      run: { width: width, height: height * 0.6 }
    },
    2: {
      html: { width: width * 0.4, height: height / 3 },
      css: { width: width * 0.4, height: height / 3 },
      js: { width: width * 0.4, height: height / 3 },
      run: { width: width * 0.6, height: height }
    },
    3: {
      html: { width: width * 0.4, height: height / 3 },
      css: { width: width * 0.4, height: height / 3 },
      js: { width: width * 0.4, height: height / 3 },
      run: { width: width * 0.6, height: height }
    },
    4: {
      html: { width: width / 3, height: height },
      css: { width: width / 3, height: height },
      js: { width: width / 3, height: height },
      run: { width: 0, height: 0 }
    },
    5: {
      html: { width: width / 3, height: 35 },
      css: { width: width / 3, height: 35 },
      js: { width: width / 3, height: 35 },
      run: { width: width, height: height - 35 }
    }
  }

  layoutParams.value = {
    ...layoutParams.value,
    htmlContent: sizes[mode].html,
    cssContent: sizes[mode].css,
    jsContent: sizes[mode].js,
    runContent: sizes[mode].run
  }
  loadSuccess.value = true
}

const gridStyle = computed(() => {
  return {}
})
</script>

<style scoped>
.verticalRDivider {
  @apply absolute right-0 top-0 h-full w-[3px] cursor-col-resize bg-[#060606];
}

.verticalRDivider::after {
  content: "";
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  min-width: 12px;
  transform: translateX(-50%);
  z-index: 9;
}

.verticalLDivider {
  @apply absolute left-0 top-0 h-full w-[3px] cursor-col-resize bg-[#060606];
}

.verticalLDivider::after {
  content: "";
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  min-width: 12px;
  transform: translateX(-50%);
  z-index: 9;
}

.horizontalTDivider {
  @apply absolute left-0 top-0 h-[1px] w-full cursor-row-resize bg-[#060606];
}

.horizontalTDivider::after {
  content: "";
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 12px;
  transform: translateY(-50%);
  z-index: 9;
}

.horizontalBDivider {
  @apply absolute bottom-0 left-0 h-[3px] w-full cursor-row-resize bg-[#060606];
}

.horizontalBDivider::after {
  content: "";
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 12px;
  transform: translateY(-50%);
  z-index: 9;
}
</style>
