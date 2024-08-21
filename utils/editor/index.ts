import less from 'less';
import postcss from 'postcss';
import discardComments from 'postcss-discard-comments';
import discardEmpty from 'postcss-discard-empty';
import discardDuplicates from 'postcss-discard-duplicates';


export function convertLessToCss(lessCode: string): Promise<string> {
  if (typeof lessCode !== 'string') {
    console.error('The LESS code is not a string:', lessCode);
    return Promise.reject(new TypeError('The LESS code must be a string'));
  }
  return new Promise((resolve, reject) => {
    less.render(lessCode, (err: any, output: any) => {
      if (err) {
        reject(err);
      } else {
        postcss([discardComments, discardEmpty, discardDuplicates])
          .process(output.css, { from: undefined })
          .then(result => {
            resolve(result.css);
          })
          .catch(postcssErr => {
            console.log('postcssErr: ', postcssErr);
            reject(postcssErr);
          });
      }
    });
  });
}


export async function convertSassToCss(scssCode: string): Promise<string> {
  if (typeof scssCode !== 'string') {
    console.error('The SCSS code is not a string:', scssCode);
    return Promise.reject(new TypeError('The SCSS code must be a string'));
  }
  return new Promise(async (resolve, reject) => {
    if (!window?.Sass) return
    window.Sass.compile(scssCode, (result: any) => {
      if (result.status !== 0) {
        reject(new Error(result.formatted));
      } else {
        postcss([discardComments, discardEmpty, discardDuplicates])
          .process(result.text, { from: undefined })
          .then(postcssResult => {
            resolve(postcssResult.css);
          })
          .catch(postcssErr => {
            console.error('postcssErr: ', postcssErr);
            reject(postcssErr);
          });
      }
    });
  });
}


declare const window: {
  Sass?: any;
};

export const parseStrFromArr = (str: any) => {
  try {
    return str.split(',');
  } catch (error) {
    return []
  }
}
