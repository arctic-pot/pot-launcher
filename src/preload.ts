// noinspection ES6UnusedImports
import { ipcRenderer, remote } from 'electron'; // eslint-disable-line @typescript-eslint/no-unused-vars

window.ipcRenderer = ipcRenderer;
window.remote = remote;

window.temp = {};
window.public = {};
