import { parseStrFromArr } from "./editor"

export function transformEditorParamsFromDb(snippetCode: any) {
  const {
    htmlCode,
    cssCode,
    jsCode,
    headSettings,
    htmlClass,
    bodyClass,
    htmlType,
    defaultCss,
    links,
    styleType,
    scripts,
    projectName,
    projectDescription
  } = snippetCode
  const preSettings = {
    htmlSettings: {
      headSettings,
      htmlClass,
      bodyClass,
      htmlType
    },
    styleSettings: {
      defaultCss,
      links: parseStrFromArr(links),
      styleType
    },
    scriptSettings: {
      scripts: parseStrFromArr(scripts)
    },
    projectInfo: {
      name: projectName,
      description: projectDescription
    },
    saveSettings: {
      autoSave: true,
      autoRun: true,
      autoFormat: true
    },
    editorSetting: {
      layout: 1,
      indentSize: 2,
      indentType: "tab"
    }
  }
  const runIframeOptions = {
    html: htmlCode,
    css: cssCode,
    js: jsCode,
  }

  return {
    preSettings,
    runIframeOptions
  }

}
