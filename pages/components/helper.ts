export type LayoutMode = "html" | "style" | "script" | "project" | "save" | "editor"

export type StyleType = "css" | "less" | "sass"

export type HtmlType = "html" | "html-tailwindcss"
export interface PreSettings {
  htmlSettings: {
    headSettings: string
    htmlClass: string
    bodyClass: string
    htmlType: HtmlType
  }
  styleSettings: {
    defaultCss: number
    links: string[],
    styleType: StyleType
  }
  scriptSettings: {
    scripts: string[]
  }
  projectInfo: {
    name: string
    description: string
  }
  saveSettings: {
    autoSave: boolean
    autoRun: boolean
    autoFormat: boolean
  }
  editorSetting: {
    layout: number
    indentSize: number
    indentType: string
  }
}

export interface EditorSettingProps {
  modelValue: boolean
  preSettings: PreSettings
}

export interface EditorSettingEmits {
  (e: "update:modelValue", val: boolean): void
  (e: "update:settings", val: PreSettings): void
}

export interface EditorSettingSidebarProps {
  modelValue: string
}

export interface EditorSettingSidebarEmits {
  (e: "update:modelValue", val: string): void

}

export function getDefaultSettings(): PreSettings {
  return {
    htmlSettings: {
      headSettings: "",
      htmlClass: "",
      bodyClass: "",
      htmlType: "html"
    },
    styleSettings: {
      defaultCss: 0,
      links: [''],
      styleType: "css"
    },
    scriptSettings: {
      scripts: ['']
    },
    projectInfo: {
      name: "",
      description: ""
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
}
