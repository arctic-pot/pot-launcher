import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'animate.css/animate.compat.css';

import en_us from 'assets/lang/en-us.json';

if (localStorage.welcomed) {
  // choose the locale local
  const strings = (
    {
      'en-US': en_us,
    } as unknown as Record<string, Record<string, string>>
  )[localStorage.locale]; // for avoid TypeScript errors // same as `switch` statement
  // render the page with strings
  ReactDOM.render(React.createElement(App, { strings: strings }), document.getElementById('root'));
} else {
  // shows welcome page
  ReactDOM.render(React.createElement(App, { welcome: true }), document.getElementById('root'));
}
