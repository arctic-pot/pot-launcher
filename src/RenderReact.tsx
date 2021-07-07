import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'animate.css/animate.compat.css';

import enUS from 'assets/lang/en-us.json';
import zhCN from 'assets/lang/zh-cn.json';

if (localStorage.welcomed) {
  // choose the locale local
  const strings = (
    {
      'en-US': enUS,
      'zh-CN': zhCN
    } as unknown as Record<string, Record<string, string>>
  )[localStorage.locale]; // same as `switch` statement
  // render the page with strings
  ReactDOM.render(<App strings={strings} />, document.getElementById('root'));
} else {
  // shows welcome page
  ReactDOM.render(<App welcome />, document.getElementById('root'));
}
