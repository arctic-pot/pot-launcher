import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import enUS from 'assets/lang/en-us.json';
import zhCN from 'assets/lang/zh-cn.json';

// choose the locale local
const strings = (
  {
    'en-US': enUS,
    'zh-CN': zhCN,
  } as unknown as Record<string, Record<string, string>>
)[localStorage.locale]; // same as `switch` statement

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
