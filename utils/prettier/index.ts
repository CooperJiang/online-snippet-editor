import prettier from 'prettier/standalone';
import * as htmlParser from 'prettier/plugins/html.js';
import * as babelParser from 'prettier/plugins/babel.js'; // 用于解析 JavaScript
import * as cssParser from 'prettier/plugins/postcss.js'; // 用于解析 CSS
import * as esTreeParser from 'prettier/plugins/estree.js'; // 用于解析 TypeScript
import * as postcssParser from 'prettier/plugins/postcss.js'; // 用于解析 CSS

// https://prettier.io/docs/en/options

export async function formatCode(code: string, language: string) {
  let parser = '';
  switch (language) {
    case 'html':
      parser = 'html';
      break;
    case 'js':
    case 'javascript':
      parser = 'babel';
      break;
    case 'css':
    case 'vue':
      parser = 'css';
      break;
    default:
      throw new Error('Unsupported language');
  }

  const data = await prettier.format(code, {
    parser: parser,
    plugins: [htmlParser, babelParser, esTreeParser, cssParser, postcssParser],
    tabWidth: 2,
    htmlWhitespaceSensitivity: "ignore"
  });
  return data;
}
