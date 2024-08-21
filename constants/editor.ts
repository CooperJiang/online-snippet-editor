export const cssTypeMap = {
  css: "CSS",
  less: "LESS",
  sass: "SASS"
}

export const htmlTypeMap = {
  "html": "Html",
  "html-tailwindcss": "Html+Tailwindcss",
}

export const cssTypeIconMap = {
  css: "logos:css-3",
  less: "logos:less",
  sass: "logos:sass"
}

export const htmlMenuList = [
  {
    name: "Html格式化",
    key: 1,
    options: { language: "html", event: "format" },
  },
];

export const cssMenuList = [
  { name: "css格式化", key: 1, options: { language: "css", event: "format" } },
];
export const jsMenuList = [
  { name: "js格式化", key: 1, options: { language: "js", event: "format" } },
];
export const cssTypeList = [
  { name: "Css", key: 1, options: { event: "updateCssType", type: "css" } },
  { name: "Less", key: 2, options: { event: "updateCssType", type: "less" } },
  { name: "Sass", key: 3, options: { event: "updateCssType", type: "sass" } },
];

export const htmlTypeList = [
  { name: "Html", key: 1, options: { event: "updateHtmlType", type: "html" } },
  {
    name: "Html+Tailwindcss",
    key: 2,
    options: { event: "updateHtmlType", type: "html-tailwindcss" },
  },
];
