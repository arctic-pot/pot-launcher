import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import PlatformError from './errors/Platform';
import os from 'os';

const isWindows = os.type().match(/Windows(_NT)?/gi);

ReactDOM.render(React.createElement(isWindows ? App : PlatformError), document.getElementById('root'));
