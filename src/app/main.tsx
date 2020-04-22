import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater, UpdateCheckResult, UpdateInfo } from 'electron-updater';
import {
  RESTART_CHANNEL,
  StartUpdateCheck,
  UPDATE_CHANNEL,
  UpdateChecked,
  UpdateDownloadProgress,
  UpdateDownloadStart,
  UpdateError,
  UpdateReady,
} from './update';

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

  window.on('closed', function () {
    window = null;
  });

  window.loadFile('index.html');
}

app.on('ready', () => {
  createWindow();

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  window?.webContents.on('did-finish-load', () => {
    window?.webContents.send(UPDATE_CHANNEL, { type: 'start-update-check' } as StartUpdateCheck);

    autoUpdater
      .checkForUpdates()
      .then((result: UpdateCheckResult) => {
        window?.webContents.send(UPDATE_CHANNEL, { type: 'update-checked', result } as UpdateChecked);

        if (result && result.updateInfo.files.length > 0) {
          window?.webContents.send(UPDATE_CHANNEL, { type: 'update-download-start' } as UpdateDownloadStart);

          autoUpdater.downloadUpdate().then(() => {
            window?.webContents.send(UPDATE_CHANNEL, { type: 'update-ready' } as UpdateReady);
          });
        }
      })
      .catch((error) => {
        window?.webContents.send(UPDATE_CHANNEL, { type: 'update-error', error } as UpdateError);
      });

    autoUpdater.addListener('download-progress', ({ percent }: { percent: number }) => {
      window?.webContents.send(UPDATE_CHANNEL, {
        type: 'update-download-progress',
        progress: percent / 100,
      } as UpdateDownloadProgress);
    });

    autoUpdater.addListener('update-downloaded', (info: UpdateInfo) => {
      window?.webContents.send(UPDATE_CHANNEL, { type: 'update-ready' } as UpdateReady);
    });
  });
});

app.on('window-all-closed', function () {
  app.quit();
});

app.on('activate', function () {
  if (!window) {
    createWindow();
  }
});

ipcMain.on(RESTART_CHANNEL, () => {
  autoUpdater.quitAndInstall(false, true);
});
