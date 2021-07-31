// import another file to load
import './RenderReact';
import './utilityClass.scss';
import 'animate.css/animate.compat.css';
import './index.scss';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

document.addEventListener('keydown', (event) => {
  if (event.key === 'F4') {
    document.querySelectorAll('style').forEach((style) => document.head.removeChild(style));
  }
  if (event.key === 'F5') {
    location.reload();
  }
});

const filePath = path.resolve(os.homedir(), './.pmcl');
fs.access(filePath).catch(() => {
  fs.writeJsonSync(filePath, {
    accounts: [],
  });
});
