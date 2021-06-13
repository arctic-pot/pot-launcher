import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import PlatformError from './errors/Platform';
import os from 'os';

const isWindows = !!os.type().match(/Windows(_NT)?/gi);

if (isWindows) {
  if (localStorage.welcomed) {
    // shows normal page if already showed welcome page
    fetch(localStorage.strings).then(async (response) => {
      const json = await response.json();
      ReactDOM.render(React.createElement(App, { strings: json }), document.getElementById('root'));
    });
  } else {
    // shows welcome page
    ReactDOM.render(React.createElement(App, { welcome: true }), document.getElementById('root'));
  }
} else {
  ReactDOM.render(React.createElement(PlatformError), document.getElementById('root'));
}
