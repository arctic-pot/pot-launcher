import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import langKeys from 'assets/lang/keys.json';
import enUS from 'assets/lang/en-us.json';
import zhCN from 'assets/lang/zh-cn.json';

export const fixString = (strings: Record<string, string>): Record<string, string> => {
  // for minify pack size, we mangled language key names
  // but terser does not understand the key names will use for intl
  // so we have to fix it
  // like from `{a: 'String'}` to {'key.name': 'String'}
  if (
    Object.keys(strings)
      .map((key) => !!key.match(/^.+(\..+)+$/))
      .filter((value) => value === true)
  ) {
    const _strings = {};
    Object.keys(strings).forEach((string) => {
      Object.assign(_strings, { [(langKeys as Record<string, string>)[string]]: strings[string] });
    });
    return _strings;
  }
};

// choose the locale local
const strings = fixString((
  {
    'en-US': enUS,
    'zh-CN': zhCN,
  } as unknown as Record<string, Record<string, string>>
)[localStorage.locale || 'en-US']); // same as `switch` statement

const rootElement = document.getElementById('root');

document.addEventListener('render', () => {
  if (!localStorage.welcomed) {
    // shows welcome page
    ReactDOM.render(<App welcome />, rootElement);
  } else if (sessionStorage.tokenDecryptKey) {
    // render the page with strings
    ReactDOM.render(<App strings={strings} />, rootElement);
  } else {
    ReactDOM.render(<App strings={strings} opening />, rootElement);
  }
});
