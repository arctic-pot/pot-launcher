import * as electron from 'electron';
import { app, BrowserWindow, ipcMain } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any; //eslint-disable-line @typescript-eslint/no-explicit-any

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    height: 540,
    width: 960,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then();

  if (process.env.NODE_ENV === 'development') {
    // Open the DevTools
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on('minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.on('close', () => {
    mainWindow.close();
  });

  ipcMain.on('destroy', () => {
    mainWindow.minimize();
    mainWindow.close();
  });

  ipcMain.on('devtool', () => {
    mainWindow.webContents.openDevTools();
  });

  ipcMain.handle('choose-dir', async () => {
    return await electron.dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory', 'dontAddToRecent'],
    });
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
