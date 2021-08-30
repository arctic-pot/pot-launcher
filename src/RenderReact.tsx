import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';
import enUS from 'assets/lang/en-us.json';
import zhCN from 'assets/lang/zh-cn.json';
import { fixString } from './base/localization/string-tools';
import { Directory } from './typings/common';

// choose the locale local
const strings = fixString(
  (
    {
      'en-US': enUS,
      'zh-CN': zhCN,
    } as unknown as Directory<Directory>
  )[localStorage.locale || 'en-US']
); // same as `switch` statement

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
