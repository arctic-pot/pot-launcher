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

// accounts, salt, etc. shouldn't store directly to localStorage.

const filePath = path.resolve(os.homedir(), './.pmcl-accounts');
fs.access(filePath)
  .then(() => fs.readJson(filePath))
  .then((data) => {
    window.temp.accounts = data;
  })
  .then(() => {
    document.dispatchEvent(new Event('render'));
  })
  .catch(() => {
    fs.writeJsonSync(
      filePath,
      {
        version: 1,
        accounts: [],
        salt: 'x'.repeat(48).replace(/x/g, () => {
          const CHARS = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()/*-_+<>|[]{},.;:`~'?";
          const CHARS_SPLIT = CHARS.split('');
          return CHARS_SPLIT[Math.floor(Math.random() * CHARS.length)];
        }),
        lastUpdate: Date.now(),
      },
      { spaces: 2 }
    );
    location.reload();
  });
