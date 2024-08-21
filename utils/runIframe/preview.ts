import type { PreviewSettings } from ".";

export function compilerPreviewCss(previewOpts: PreviewSettings) {
  let scale = Number(previewOpts?.previewScale) / 100
  scale < 0.1 && (scale = 0.1)
  return `
<style>
html{
  transform: scale(${scale});
  overflow: hidden;
}

body{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

</style>
`
}
