import type { PreSettings } from "~/pages/components/helper";
import { convertLessToCss, convertSassToCss } from "~/utils/editor/index"
import { resetCss } from "./reset"
import { normalizeCss } from "./normalize"
import { compilerPreviewCss } from './preview'
import { proxyConsoleScript } from './console'

export interface RunIframeParams {
  html?: string;
  css?: string;
  js?: string;
}

export interface PreviewSettings {
  preview: boolean
  previewScale: number | undefined
}

let cacheSuccessfulCss = ""; // 如果本次编译有问题就使用上次的css等待本次css编写完成

export async function compilerIframeCode(options: RunIframeParams, preSettings: PreSettings, previewOpts: PreviewSettings) {
  try {
    const { html = '', css = '', js = "" } = options;
    const {
      htmlSettings: { headSettings = '', htmlClass = '', bodyClass = '', htmlType = 'html' },
      styleSettings: { links: preLinks = [], styleType = "css", defaultCss = 0 },
      scriptSettings: { scripts: preScripts = [] },
    } = preSettings;

    let preCss = `<style></style>`;
    let preViewCss = `<style></style>`;

    if (defaultCss === 1) {
      preCss = normalizeCss
    }
    if (defaultCss === 2) {
      preCss = resetCss
    }

    if (previewOpts.preview) {
      preViewCss = compilerPreviewCss(previewOpts)
    }

    // 过滤掉空字符串的链接和脚本
    const filteredScripts = preScripts.filter(src => src.trim() !== '');
    const filteredLinks = preLinks.filter(href => href.trim() !== '');

    /* 对于tailwindcss 类型的 注入脚本 */
    if (htmlType === 'html-tailwindcss') {
      filteredScripts.push('https://cdn.tailwindcss.com')
    }

    /* 对于特殊类型的css进行一次解析 普通css也可以通过less解析 */
    let formatCss = css
    if (['less', 'css'].includes(styleType)) {
      try {
        formatCss = await convertLessToCss(css)
        cacheSuccessfulCss = formatCss
      } catch (error) {
        formatCss = cacheSuccessfulCss
      }
    }

    if (['sass'].includes(styleType)) {
      try {
        formatCss = await convertSassToCss(css)
        cacheSuccessfulCss = formatCss
      } catch (error) {
        formatCss = cacheSuccessfulCss
      }
    }

    // 将scripts数组转换成多个script标签，移除async属性
    const scriptsTags = filteredScripts
      .map(src => `<script src="${src}"></script>`)
      .join('\n');

    // 将links数组转换成多个link标签
    const linksTags = filteredLinks
      .map(href => `<link rel="stylesheet" href="${href}">`)
      .join('\n');

    /* 将import type=module语句单独提取放入顶层 */
    const importStatements: any[] = [];
    const otherJsStatements = js.split('\n').filter(line => {
      if (line.startsWith('import ')) {
        importStatements.push(line);
        return false;
      }
      return true;
    }).join('\n');


    const code = `
    <html class="${htmlClass}" style="height:100%">
      <head>
        <script>console.warn = () => {};</script>
        ${headSettings}
        ${`${defaultCss !== 0 ? preCss : ''}`}
        ${`${previewOpts.preview ? preViewCss : ''}`}
        <style> ${css} </style>
        ${linksTags}
        ${scriptsTags}
        ${proxyConsoleScript}
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('a[href="#"]').forEach(function(anchor) {
                    anchor.addEventListener('click', function(event) {
                        event.preventDefault();
                    });
                });
            });
        </script>
      </head>
      <body class="${bodyClass}">
        ${html}
        <script type="module">
          ${importStatements.join('\n')}
        </script>
       <script>
         try {
            ${otherJsStatements}
          } catch (error) {
            document.body.innerHTML += '<pre style="color: red;">' + error.toString() + '</pre>';
          }
       </script>
      </body>
    </html>
  `;
    return code;
  } catch (error) {
    console.log('compilerIframeCode error: ', error);
    return ""
  }
}
