import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

let window: BrowserWindow | null = null;

function createWindow(): void {
  if (window) return;

  window = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    window.webContents.openDevTools({
      mode: 'bottom',
    });
  }

  window.on('closed', function() {
    window = null;
  });

  window.loadFile('index.html');
}

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify().finally(() => {
    createWindow();
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (!window) {
    createWindow();
  }
});
